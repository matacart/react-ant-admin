import { getFileList, getGroupAdd, getGroupList } from "@/services/y2/api"
import fileData from "@/store/fileData"
import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Card, Input, message, Modal, Popover, Select, Spin, Tabs, TabsProps, Tag, Upload, UploadProps } from "antd"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"


const { Dragger } = Upload;

function FileModal({groupId,groupList}:{groupId:string,groupList:any}) {


    const [loading, setLoading] = useState(false);

    const [isFileModalOpen, setIsFileModalOpen] = useState(false);

    const [optionList,setOptionList] = useState([]);

    const [optionId,setOptionId] = useState("0");

    useEffect(()=>{
        let options = [{
            value:"0",
            label:"所有文件"
        }];
        groupList.forEach(element => {
            options.push(
                {
                    value:element.groupId,
                    label:element.groupName
                }
            )
        });
        setOptionList(options);
    },[groupList])

    useEffect(()=>{
        setOptionId(groupId)
    },[groupId])

    const handleChange = (info)=>{
        setLoading(true);
        let formData = new FormData()
        formData.append("file", info)
        formData.append("groupId",optionId)
        // 上传
        axios.post('/api/ApiResource/uploadFile',formData).then((res: any) => {
            // console.log(res);
            if(res.data.code === 0){
                // fileData.setData({a:1})
                fileData.setData(res.data.data)
                setLoading(false);
            }else{
                console.log(res.data);
                message.error("上传失败", 1)
                setLoading(false);
            }
            setIsFileModalOpen(false)
        })
        // }

        
    }

    const props: UploadProps = {
        // onChange(info) {
        //   const { status } = info.file;
        //   if (status !== 'uploading') {
        //     // console.log(info.file, info.fileList);
        //   }
        //   if (status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        //   } else if (status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        // },
        // listType:"picture-card",
        showUploadList:false,
        beforeUpload(info) {
            // 手动上传
            handleChange(info);
            return false;
        },
        // onDrop(e) {
        //   console.log('Dropped files', e.dataTransfer.files);
        // },
    };

    return (
        <Scoped>
            <Button onClick={()=>{setIsFileModalOpen(true)}} style={{height:"36px"}} type="primary">上传文件</Button>
            {/* 上传文件 */}
            <Modal width={800} open={isFileModalOpen} centered footer={null} title="上传文件" onOk={()=>{}} onCancel={()=>{
                setOptionId(groupId)
                setIsFileModalOpen(false)}
            }>
                <Spin spinning={loading}>
                <Scoped>
                    <div className="item_select_box">
                        <div className="item_select_box_title">选择文件分组位置</div>
                        <Select style={{width:"75%"}} value={optionId} options={optionList} onChange={(value)=>{setOptionId(value)}}></Select>
                    </div>
                    {/*  */}
                    <div className="item_upload_box">
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text" style={{fontSize:"14px"}}>添加文件（或把文件拖到框内）</p>
                                {/* <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                    banned files.
                                </p> */}
                            </Dragger>
                    </div>
                    {/*  */}
                    <div className="item_format_box">
                        <div>视频：支持.mp4格式，最大限制20MB</div>
                        <div>图片：支持.gif、.pjp、.jpg、.pipeg、.jpeg、.jfif、.png、.bmp、.webp、.svg、.ico格式，最大限制10MB</div>
                        <div>文件：支持.pdf、.xlsx、.csv、.docx格式，最大限制20MB</div>
                    </div>
                    <div className="item_info_box">
                        <span><ExclamationCircleFilled /></span>禁止上传涉及侵权、淫秽、暴力、恐怖主义、政治的内容，一经发现MataCart有权从服务器中删除
                    </div>
                </Scoped>
                </Spin>
            </Modal>
        </Scoped>
    )
}

export default FileModal

const Scoped = styled.div`
    .item_select_box{
        margin-bottom: 12px;
        .item_select_box_title{
            margin-bottom: 8px;
        }
    }
    .item_upload_box{
        color: #474F5E;
        height: 300px;
        margin-bottom: 10px;
    }
    .item_format_box{
        div{
            color: #7A8499;
            margin: 4px 0;
        }
    }
    .item_info_box{
        color: #242833;
        margin-top: 10px;
        padding: 8px 16px;
        background-color: #ffedc9;
        span{
            font-size: 14px;
            margin-right: 4px;
            color: #fe9e0f;
        }
    }
`

{/* <div>
<div>
    <div>选择文件分组位置</div>
    <Select style={{width:"75%"}} options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
    ]}></Select>
</div>
<div>
<Spin spinning={loading}>
    <div>
    {...props}
    {imageUrl == ""?<Dragger 
        listType="picture-card"
        beforeUpload={(info)=>{
            // 手动上传
            handleChange(info)
            return false
        }}
        className="avatar-uploader"
        showUploadList={false}
    >
        <div style={{padding:"60px 0"}}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text"><span style={{fontSize:"14px"}}>添加图片(或把图片拖到框内)</span></p>
            <p className="ant-upload-hint">支持上传jpg、png、webp、GIF格式的图片；最大限制4M；</p>
        </div>
    </Dragger>:
    <div style={{position:"relative",width:"732px",height:"500px"}}
        onMouseOver={() => {
            let newIsHovering = [...isHovering]
            newIsHovering[0] = true
            setIsHovering(newIsHovering)
        }} onMouseOut={() => {
            let newIsHovering = [...isHovering]
            newIsHovering[0] = false
            setIsHovering(newIsHovering)
        }}
        onClick={()=>{
            setImageUrl("")
        }}
    >
        <img style={{width:"100%",height:"100%", objectFit:"contain"}} src={imageUrl} />
        <div className="overlay" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isHovering[selectImgIndex] ? 1 : 0,
                transition: 'opacity 0.3s ease',
                cursor:"pointer"
            }}
        >
        <span style={{color:"#fff"}}>
            <DeleteOutlined />
        </span>
        </div>
    </div>
    }
</div>
</Spin>
</div>
</div> */}