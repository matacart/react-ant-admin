import MyButton from "@/components/Button/MyButton";
import { AddIcon, SearchSecondIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import { getFileList, uploadPic } from "@/services/y2/api";
import { CheckCircleFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { Col, Drawer, Flex, App, Row, Spin, Upload } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

interface DataType{
    id:string,
    url:string,
}

interface imageType{
    id:string,
    url:string,
}

function ImagePicker({item,data,setData}:{item:string,data:DataType,setData:(item:string,value:DataType)=>void}){
    
    const { message } = App.useApp();

    const intl = useIntl();

    const [loading,setLoading] = useState(false);

    const mRef = useRef(null);

    const [open,setOpen] = useState(false);

    // 检测屏幕宽度并决定Drawer的位置
    const [isSmallScreen, setIsSmallScreen] = useState("right");
    // 图片列表
    const [imgList,setImgList] = useState<imageType[]>([]);
    // 选中图片
    const [imgData,setImgData] = useState<DataType>(data);
    // 删除图片
    const delImage = () => {
        setData(item,{
            ...data,
            id:"",
            url:""
        });
    }

    // 上传图片到文件库
    const beforeUpload = (file:any) => {
        let formData = new FormData()
        formData.append("file", file)
        setLoading(true);
        uploadPic(formData).then((res: any) => {
            if(res.code == 0){
                fetchImgList();
            }else{
                message.error("上传失败", 1)
            }
        }).catch((err: any) => {
        }).finally(() => {
            setLoading(false);
        })
        return false;
    };

    // 取消
    const cancel = ()=>{
        setImgData(data);
        setOpen(false);
    }
    // 完成
    const submit = ()=>{
        setData(item,{
            ...data,
            id:imgData.id,
            url:imgData.url,
        });
        setOpen(false);
    }

    useMemo(()=>{
        setImgData(data);
    },[data])

    const fetchImgList = ()=>{
        setLoading(true);
        getFileList({
            groupId:'0',
            extType:1,
            pageNum:1,
            pageSize:10,
        }).then(res=>{
            if(res.code == 0){
                const newList = res.data.list.map((item:any)=>{
                    return {
                        id:item.id,
                        url:item.url,
                        type:item.nameSuffix
                    }
                })
                setImgList(newList);
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(() => {
        const updatePlacement = () => {
            setIsSmallScreen(window.innerWidth < 1600 ? 'left' : 'right');
        };
        // 初始化
        updatePlacement();
        // 监听窗口大小变化
        window.addEventListener('resize', updatePlacement);
        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', updatePlacement);
        };
    }, []);

    return (
        <Scoped ref={mRef}>
            <Spin spinning={loading}>
            {imgData?.url ?
                <div className="preview">
                    <Flex justify="center" className="image-box">
                        <img className="img" src={imgData.url} />
                    </Flex>
                    <Flex className="button-box" gap={12}>
                        <div style={{width:"100%"}}>
                            <MyButton style={{width:"100%",height:"36px"}} text={intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.replaceImage"})} onClick={()=>{
                                fetchImgList();
                                setOpen(true);
                            }} />
                        </div>
                        <div style={{width:"100%"}}>
                            <MyButton style={{width:"100%",height:"36px"}} text={intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.deleteImage"})} onClick={delImage} />
                        </div>
                    </Flex>
                </div>
            : <Flex className="menu-picker cursor-pointer" vertical justify="center" align="center" gap={6} onClick={()=>{
                fetchImgList();
                setOpen(true);
            }}>
                <AddIcon className="font-24 icon" />
                <div className="text">{intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.addImage"})}</div>
            </Flex>
            }
            </Spin>
            {/* 文件库 */}
            <Drawer
                getContainer={()=>mRef.current!}
                width={300}
                placement={isSmallScreen as 'left' | 'right'}
                closeIcon={null}
                title={<div>{intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.selectFromLibrary"})}</div>}
                mask={false}
                open={open}
                className="menu-picker-drawer"
                classNames={{
                    body: 'menu-box'
                }}
                onClose={cancel}
                footer={
                    <Flex justify="end">
                        <Flex gap={8}>
                            <MyButton text={intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.cancel"})} onClick={cancel}/>
                            <MyButton color="primary" variant="solid" text={intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.submit"})} onClick={submit}/>
                        </Flex>
                    </Flex>
                }
            >
                <>
                    <Flex style={{padding: '12px'}}>
                        <MyInput placeholder={intl.formatMessage({id: "settings.settle.checkoutEditor.ImagePicker.search"})} suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    <Spin spinning={loading}>
                        <Row style={{padding: '0 12px'}} gutter={[12,16]}>
                            <Col span={12}>
                                <Upload
                                    name="file"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                >
                                    <button className="upload_btn" type="button">
                                        {loading ? <LoadingOutlined className="font-20" /> : <PlusOutlined className="font-20" />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Col>
                            {/*  */}
                            {imgList.map((img:any)=>{
                                return (
                                    <Col span={12} key={img.id}>
                                        <Flex className={img.id == imgData?.id ?"item_box checked":"item_box"} align="center" justify="center" onClick={()=>{
                                            setImgData({
                                                id:img.id,
                                                url:img.url,
                                            });
                                        }}>
                                            <img className="item" src={img.url} />
                                            <CheckCircleFilled className="icon_checked" />
                                            <span className="type_checked">{img.type}</span>
                                        </Flex>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Spin>
                </>
            </Drawer>
        </Scoped>
    )
}

export default ImagePicker;


const Scoped = styled.div`

.menu-picker{
    border: 1px dashed #d7dbe7;
    border-radius: 6px;
    height: 100px;
    background-color: #f7f8fb
}

.ant-drawer-content-wrapper{
    top: 61px;
    box-shadow:none;
}


.menu-picker-drawer{
    position: relative;
    left: 50px;
}

.menu-box{
    padding: 0;
    .upload_btn{
        width: 128px;
        height: 128px;
        background: #FAFAFA;
        border-radius: 6px;
        border: 1px dashed #d7dbe7;
        cursor: pointer;
        &:hover{
            border-color: #5e91ff;
            color: #356dff;
        }
    }

    .item_box{
        position: relative;
        width: 128px;
        height: 128px;
        background-color: #eaedf1;
        border-radius: 6px;
        border: 2px solid #eaedf1;
        cursor: pointer;
        &:hover{
            border-color: #5e91ff;
        }
        .item{
            height: auto;
            width: auto;
            margin: auto;
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
        }
        .icon_checked{
            display: none;
        }
        .type_checked{
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 2px 6px;
            font-size: 12px;
            color: #fff;
            border-radius: 6px 0 4px 0;
            background-color: #00000080;
        }
    }
    .checked{
        border: 2px solid #5e91ff;
        .icon_checked{
            display: block;
            position: absolute;
            right: 6px;
            top: 6px;
            color: #356DFF;
            font-size: 16px;
        }
        .type_checked{
            display: block;
            font-size: 12px;
            position: absolute;
            padding: 2px 6px;
            right: 0;
            bottom: 0;
            color: #fff;
            background: #00000080;
            border-radius: 10px 0 4px 0;
        }
    }
}

@media only screen and (min-width: 1600px) {
    .menu-picker-drawer{
        position: relative;
        left: 0;
    }
}

.preview{
    padding: 16px;
    background: #f7f8fb;
    border-radius: 4px;
    .image-box{
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        img{
            object-fit: contain;
            height: 100px;
        }
    }
    .button-box{
        margin-top: 12px;
        /* .ant-upload-wrapper{
            width: 100%;
        } */
    }
}
`