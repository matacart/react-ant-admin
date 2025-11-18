import { getFileList } from "@/services/y2/api"
import newStore from "@/store/newStore"
// import newStore from "@/store/newStore"
import { PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Col, Image, GetProp, Input, Row, Select, Upload, UploadFile, UploadProps, Tooltip, Modal, Spin, message, Pagination, PaginationProps, InputRef } from "antd"
import axios from "axios"
import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { set } from 'lodash';


// 在组件顶部定义接口
interface GroupItem{
    groupId:string,
    groupName:string
}
interface FileListStatus {
    [key: string]: boolean;
}


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

function FileListCard({groupId}:{groupId:string}) {

    const [fileImgList,setFileImgList] = useState<any>([]);

    // 所有文件的状态
    const [fileListStatus,setFileListStatus] = useState<FileListStatus>({});

    const [loading,setLoading] = useState(false);

    const [count,setCount] = useState(0);

    const [currentPage,setCurrentPage] = useState(1);
    // 分页
    const [pageSize,setPageSize] = useState(100);
    // 搜索框
    const inputRef = useRef<InputRef>(null);
    const [searchText,setSearchText] = useState('');

    const onChange: PaginationProps['onChange'] = (page,pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        setLoading(true)
        getFileList({
            groupId:groupId,
            extType:1,
            pageNum:page,
            pageSize:pageSize,
            title:searchText,
        }).then(res=>{
            console.log(res)
            if(res.code == 0){
                setFileImgList(res.data.list??=[])
                setCount(res.data.total)
                setLoading(false)

                // 状态重置 --- 存状态
                res.data.list.forEach((item:any)=>{
                    fileListStatus[item.id]??=false
                })
            }else{
                console.log("请求失败")
            }
        })
    };

    // 搜索
    const handleSearch = (value: string) => {
        setSearchText(value);
        setLoading(true)
        getFileList({
            groupId:groupId,
            extType:1,
            pageNum:currentPage,
            pageSize:pageSize,
            title:value,  
        }).then(res=>{
            if(res.code == 0){
                setLoading(false)
                setCurrentPage(res.data.pageNum);
                setPageSize(pageSize);
                setCount(res.data.total)
                setFileImgList(res.data.list??=[])
            }
        })
    };


    useEffect(()=>{
        setLoading(true)
        getFileList({
            groupId:groupId,
            extType:2,
            pageNum:currentPage,
            pageSize:pageSize,
        }).then(res=>{
            if(res.code == 0){
                setFileImgList(res.data.list??=[])
                setCount(res.data.total)
                // 存状态
                res.data.list.forEach((item:any)=>{
                    fileListStatus[item.id]??=false
                })
                setLoading(false)
            }else{
                console.log("请求失败")
            }
        })
    },[groupId])


    const [previewOpen, setPreviewOpen] = useState(false);

    const [previewImage, setPreviewImage] = useState('');

    const props: UploadProps = {

        // 手动上传
        beforeUpload(file) {
            console.log(file);
            setLoading(true)
            let formData = new FormData()
            formData.append("file", file as FileType)
            formData.append("groupId",groupId)
            axios.post('/api/ApiResource/uploadFile',formData).then((res: any) => {
                if(res.data.code == 0){
                    // uid --- src  
                    message.success("上传成功", 1)
                    console.log(res.data.data)

                    let newFileImgList = [...fileImgList]
                    // 由于格式不一样
                    newFileImgList.unshift({
                        id:res.data.data.id,
                        name:res.data.data.basename,
                        createTime:res.data.data.create_time,
                        extensions:res.data.data.ext,
                        nameSuffix:res.data.data.ext,
                        url:res.data.data.savepath,
                    })
                    setFileImgList(newFileImgList)

                    console.log(fileImgList)

                    let newFileListStatus = {...fileListStatus}
                    newFileListStatus[res.data.data.id]=false
                    setFileListStatus(newFileListStatus)
                    setLoading(false)
                }else{
                    message.error("上传失败", 1)
                    setLoading(false)
                }
            })


            return false;
        }
    };


    // 选择图片 --- 增减
    const handSelectImg = (imgObj,index:number)=>{
        let newFileListStatus = {...fileListStatus}
        let newIndex = newStore.fileUpload.selectFileIndex
        let newSelectFileList = [...newStore.fileUpload.selectFileList]
        if(newFileListStatus[imgObj.id]){
            // 取消
            newFileListStatus[imgObj.id] = false
            delete(newIndex[imgObj.id])
            // 重新排序
            let i = 1;
            for(let key in newIndex){
                newIndex[key] = i++;
            }
            newStore.fileUpload.setSelectFileIndex(newIndex)
            newSelectFileList = newSelectFileList.filter(item=>item.id !== imgObj.id)
        }else{
            // 添加
            newFileListStatus[imgObj.id] = true
            newStore.fileUpload.selectFileIndex[imgObj.id] = Object.keys(newStore.fileUpload.selectFileIndex).length+1
            newSelectFileList.push(imgObj)
        }
        setFileListStatus(newFileListStatus)
        newStore.fileUpload.setSelectFileList(newSelectFileList)
    }

    

    // 编辑分组--保存
    return (
        // {groupItem && }
        <Scoped>
            {/* 预览 */}
            <Modal width={550} open={previewOpen} centered onCancel={()=>{
                setPreviewOpen(false)
                
            }}
            cancelText="关闭"
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                </>
            )}>
                <div style={{maxWidth:"500px",maxHeight:"500px",marginTop:"20px",overflow:"auto"}}>
                    <img style={{width:"auto",height:"auto"}} src={previewImage}></img>
                </div>
            </Modal>
            <Spin spinning={loading}>
                <div className="cardControls">
                    <Input ref={inputRef} onBlur={(e)=>handleSearch(e.target.value)} onKeyDown={(e)=>{
                        if(e.key == "Enter"){
                            // 阻止表单的默认提交行为（如果输入框在表单内）
                            e.preventDefault()
                            if(inputRef.current){
                                inputRef.current.blur()
                            }
                    }}} style={{width:"300px",marginRight:"10px"}} prefix={<SearchOutlined />} placeholder="搜索文件名/文件格式" />
                    <Select
                        labelRender={()=><div>文件类型</div>}
                        style={{ width: 160 }}
                        defaultValue="-1"
                        options={[
                            { value: '1', label: '图片' }
                        ]}
                    />
                </div>
                <div className="cardContent">
                    <Row gutter={[8,8]}>
                        <Col className="gutter-row" span={6}>
                            <div className="item_card_box_upload">
                                <Upload style={{width:"100%",height:"100%"}} {...props}>
                                    <div>
                                        <div><PlusOutlined /></div>
                                        <div>上传文件</div>
                                    </div>
                                </Upload>
                            </div>
                        </Col>
                        {fileImgList.map((item:any,index:number)=>(
                            <Col className="gutter-row" span={6}>
                                <div className="item_card_box" onClick={()=>{handSelectImg(item,index)}}>
                                    {fileListStatus[item.id] && <div className="item_card_box_status">{newStore.fileUpload.selectFileIndex[item.id]}</div>}
                                    <div className="item_img_box" style={{border:`${fileListStatus[item.id]?"2px solid #356dff":""}`}}>
                                        <img className="item_img" src={item.url}/>
                                        {/* <div className="overlay">
                                            <div onClick={(e)=>{
                                                setPreviewImage(item.url)
                                                setPreviewOpen(true)
                                                e.stopPropagation()

                                            }} style={{pointerEvents:"auto",zIndex:"99",alignItems:"center",width:"40px",height:"40px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.5)",cursor:"pointer"}}>
                                                <img style={{width:"20px",marginTop:"9px"}} src="/icons/Preview.svg"></img>
                                            </div>
                                        </div> */}
                                        <div className="item_nameSuffix">{item.nameSuffix}</div>
                                    </div>
                                    <div className="item_title">{item.name}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {/* {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )} */}
                </div>
                {/* 分页 */}
                <div className="footer">
                    <Pagination current={currentPage} pageSize={pageSize} total={count} onChange={onChange} />
                </div>
                {/* <Pagination current={current} onChange={onChange} defaultPageSize={1} total={10} /> */}
            </Spin>
            
        </Scoped>
    )
}

export default FileListCard

const Scoped = styled.div`
    .cardControls {
        display: flex;
        /* justify-content: space-between; */
        /* align-items: center; */
        margin-bottom: 10px;
    }
    .cardContent{
        overflow-y: auto;
        overflow-x:hidden;
        height: 620px;
        .item_card_box_upload{
            height: 160px;
            border: 2px dashed rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            .ant-upload-wrapper{
                width: 100%;
                height: 100%;
            }
            .ant-upload{
                background: #f7f8fb;
                cursor: pointer;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction:column;
                text-align: center;
                justify-content: center;
            }
        }
        .item_card_box_upload:hover{
            border: 2px dashed #356dff;
        }

        

        .item_card_box{
            height: 160px;
            text-align: center;
            .item_card_box_status{
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                background-color: #356dff;
                color: #FFF;
                position: absolute;
                top: 4px;
                right: 8px;
                z-index: 9;
            }
            /* align-items: center; */
            .item_title{
                width: 100%;
                font-size: 12px;
                margin-top: 6px;
                text-align: center;
                color: #474F5E;
                overflow: hidden; // 溢出隐藏
                white-space: nowrap; // 强制一行
                text-overflow: ellipsis; // 文字溢出显示省略号
            }
            .item_img_box:hover{
                border: 2px solid #356dff;
            }
            .item_img_box{
                /* 盒模型设置 不生效，box-sizing: border-box; */
                border: 2px solid #FFF;
                width: 100%;
                height: 135px;
                border-radius: 6px;
                background: #eaedf1;
                position: relative;
                cursor: pointer;
                .item_nameSuffix{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    padding: 4px 6px;
                    font-size: 12px;
                    color: #fff;
                    border-radius: 6px 0 10px 0;
                    background-color: #00000080;
                }
                .item_img{
                    height: 100%;
                    width: 100%;
                    object-fit:contain;
                }
                /* 遮罩层的样式 */
                .overlay {
                    position: absolute; /* 绝对定位 */
                    top: 0;
                    left: 0;
                    width: 100%; /* 覆盖整个容器的宽度 */
                    height: 100%; /* 覆盖整个容器的高度 */
                    background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
                    opacity: 0; /* 初始时隐藏遮罩层 */
                    transition: opacity 0.3s ease; /* 添加过渡效果 */
                    pointer-events: none; /* 可选，防止遮罩层干扰鼠标事件（如点击） */
                    border-radius: 6px;
                    z-index: 9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: none;
                }
            }
            .item_img_box:hover .overlay{
                opacity: 1; /* 显示遮罩层 */
            }
            
            .item_card_box_upload{
                width:"100%";
                height:"100%";
                display:flex;
                height: 150px;
                flex-direction: column;
                /* text-align: center; */
                justify-content: center;
                align-items: center;
            }
        }
        
    }
    .footer{
        margin: 10px 0;
        display: flex;
        justify-content: flex-end;
    }

`