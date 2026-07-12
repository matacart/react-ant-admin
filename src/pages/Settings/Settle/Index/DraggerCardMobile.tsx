import { uploadPic } from "@/services/y2/api";
import settingsInfo from "@/store/settings/settle/settingsInfo";
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { App, GetProp, Spin, Upload, UploadProps } from "antd";
import { useState } from "react";
import styled from "styled-components";

const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const DraggerCardMobile = () => {

    const { message } = App.useApp();

    const [loading,setLoading] = useState(false);

    const [isMaskVisible, setIsMaskVisible] = useState(false);

    // 图片上传
    const beforeUpload = (file:FileType) => {
        // 1. 类型校验（只允许图片）
        if (!file.type.startsWith('image/')) {
            message.error('请上传图片格式的文件');
            return false;
        }
        // 2. 大小校验（最大10MB）
        if (file.size > 10 * 1024 * 1024) {
            message.error('图片大小不能超过10MB');
            return false;
        }
        // 3. 上传图片到服务器
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        uploadPic(formData).then((res:any)=>{
            if(res.code == 0){
                settingsInfo.setPaymentSecurity({
                    ...settingsInfo.paymentSecurity,
                    paymentSecurityMobileImages: [res.data.src],
                })
            }
        }).catch(()=>{
            console.log('err');
        }).finally(()=>{
            setLoading(false);
        })
        return false;
    }

    return (
        <Scoped>
            {settingsInfo.paymentSecurity.paymentSecurityMobileImages?.[0] ?<div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                <img src={settingsInfo.paymentSecurity.paymentSecurityMobileImages[0] ? `${settingsInfo.paymentSecurity.paymentSecurityMobileImages[0]}?x-oss-process=image/resize,w_1200` : ""} style={{width:"100%"}}/>
                {isMaskVisible && (
                    <div className="mask">
                        <div className="delete-icon" onClick={(e)=>{
                            e.stopPropagation()
                            settingsInfo.setPaymentSecurity({
                                ...settingsInfo.paymentSecurity,
                                paymentSecurityMobileImages: [],
                            })
                        }}>
                            <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                        </div>
                    </div>
                )}
            </div>:<Dragger
                name="avatar"
                maxCount={1}
                listType="picture-card"
                style={{padding:"4px 0"}}
                showUploadList={false}
                beforeUpload={beforeUpload}
            >
                <div style={{marginBottom:"4px"}}><PlusOutlined className="font-28 color-474F5E" /></div>
                <div className="font-14" style={{marginBottom:"4px"}}>添加用于移动端端的图片(或把图片拖到框内)</div>
                <div className="font-12 color-888888">建议宽度320px，将按照图片比例缩放显示</div>
                {loading && <div style={{
                    position: 'absolute', 
                    inset: 0,
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '8px', 
                    zIndex: 10,
                }}>
                    <Spin size="large" indicator={<LoadingOutlined />} />
                </div>}
            </Dragger>}
        </Scoped>
    )
}

export default DraggerCardMobile;

const Scoped = styled.div`
    .image-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eef1f6;
        border-radius: 4px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
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
            cursor:default;
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
