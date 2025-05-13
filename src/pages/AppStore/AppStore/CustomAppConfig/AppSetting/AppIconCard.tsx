import DefaultButton from "@/components/Button/DefaultButton";
import SimpleCard from "@/components/Card/SimpleCard";
import DefaultTag from "@/components/Tag/DefaultTag";
import baseInfoStore from "@/store/set-up/baseInfoStore";
import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleOutlined, LoadingOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, GetProp, Input, message, Radio, Tooltip, Upload, UploadProps } from "antd";
import modal from "antd/es/modal";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function AppIconCard(){

    const [storeLogo,setStoreLogo] = useState("");

    const [isMaskVisible, setIsMaskVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>添加图片</div>
        </button>
    );

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
          return false;
        }
        let formData = new FormData()
        formData.append("1", file)

        setLoading(true)
        axios.post('/api/ApiAppstore/doUploadPic',formData).then((req: any) => {
          if(req.data.code == 0){
            // setImageUrl(req.data.data.src)
            setStoreLogo(req.data.data.src)
            setLoading(false)
          }else{
            message.error("上传失败", 1)
            setLoading(false)
          }
        })
        // 图片大小无限制
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   message.error('Image must smaller than 2MB!');
        // }
        // return isJpgOrPng && isLt2M;
        return false;
    };

    const content = (
        <>
            <div style={{marginBottom:"8px"}}>应用logo<span className="color-000000-A45">（可选）</span></div>
            <div style={{marginBottom:"4px"}} className="logo-container">
            {(storeLogo == null || storeLogo == "") ? <Upload
                    style={{width:"90px",height:"90px"}}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                >
                    {uploadButton}
                </Upload> : <div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                    <img src={storeLogo} style={{width:"100%"}}/>
                    {isMaskVisible && (
                        <div className="mask">
                            <div className="delete-icon" onClick={(e)=>{
                                e.stopPropagation()
                                modal.confirm({
                                    title: '确定删除商店Logo吗？',
                                    icon: <ExclamationCircleOutlined />,
                                    // content: '删除后，客户将无法浏览该语言版本店铺。',
                                    centered:true,
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk:()=>{
                                        setStoreLogo("")
                                    }
                                });
                            }}>
                                <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                            </div>
                        </div>
                    )}
                </div>}
            </div>
            <div className="color-000000-A45">支持120x120px的jpg、jpeg、png的图片，不能超过2M，此logo不对外展示，仅用于内部管理和开发商店测试</div>
        </>
    )
    return(
        <Scoped>
            <SimpleCard title={<div className="font-w-500">应用图标</div>} content={content} />
        </Scoped>
    )
}

export default AppIconCard;

const Scoped = styled.div`
    
    .logo-container{
        .image-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 90px;
            border: 1px solid #eef1f6;
            border-radius: 4px;
        }
        
        .mask{
            position: absolute;
            z-index: 99;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            /* opacity: 0; */
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease;
        }

        .image-container:hover.mask {
            opacity: 1;
        }

        .delete-icon {
            color: white;
            font-size: 16px;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            /* opacity: 0.8; */
            display: flex;
            justify-content: center;
            align-items:center;
            cursor: pointer;
        }
    }
`