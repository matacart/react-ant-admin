import MyAlert from "@/components/Alert/MyAlert";
import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import DefaultInput from "@/components/Input/DefaultInput";
import { sendServiceVerifyEmail, uploadPic } from "@/services/y2/api";
import baseInfoStore from "@/store/setUp/baseInfoStore";
import { DeleteOutlined, ExclamationCircleFilled, ExportOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Card, Flex, Form, GetProp, Upload, UploadProps } from "antd";
import modal from "antd/es/modal";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


function BaseInfoCard() {
    
    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    // 验证邮件倒计时定时器
    const timerRef = useRef<number | null>(null);

    // 发送验证邮件loading
    const [sendVerifyLoading, setSendVerifyLoading] = useState(false);
    // 是否发送验证邮件
    const [isSendVerify, setIsSendVerify] = useState(false);
    // 验证邮件倒计时
    const [count, setCount] = useState(60);

    const [isMaskVisible, setIsMaskVisible] = useState(false);

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
        let formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        uploadPic(formData).then((res: any) => {
            if(res.code == 0){
              baseInfoStore.setStoreInfo({
                ...baseInfoStore.storeInfo,
                store_logo:res.data.src
              })
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

    // 发送验证邮件
    const sendVerifyEmail = async ()=>{

        const lang = cookie.load("shop_lang") || '2'

        setSendVerifyLoading(true);
        // 发送验证邮件
        sendServiceVerifyEmail({
            languages_id:lang,
            email:baseInfoStore.storeInfo.service_email,
        }).then(res => {
            if(res.code == 200){
                setCount(60);
                timerRef.current = window.setInterval(()=>{
                    setCount(prevCount => {
                        const newCount = prevCount - 1;
                        if(newCount <= 0){
                            if (timerRef.current) {
                                clearInterval(timerRef.current);
                                timerRef.current = null;
                            }
                            setIsSendVerify(false);
                            return 0;
                        }
                        return newCount;
                    });
                }, 1000);
            }
        }).catch(err => {
            console.log(err)
        }).catch((err) => {
            message.error("验证邮件发送失败", 1)
        }).finally(() => {
            setSendVerifyLoading(false);
            setIsSendVerify(true);
        })
    }

    // 组件卸载时清除定时器
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    return (
        <Scoped>
            <Card>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="商店Logo"
                        >
                        <div style={{marginBottom:"12px"}}>该Logo展示在您的店铺管理页面上。详见 <a className="font-w-500">此链接</a> 展示Logo的位置。图片最大限制 10MB。</div>
                        {/* <Spin spinning={loading}> */}
                            {(baseInfoStore.storeInfo.store_logo == null || baseInfoStore.storeInfo.store_logo == "") ? <Upload
                                style={{width:"90px",height:"90px"}}
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                            >
                                {uploadButton}
                            </Upload> : <div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                                <img src={baseInfoStore.storeInfo.store_logo} style={{width:"100%"}}/>
                                {isMaskVisible && (
                                    <div className="mask">
                                        <div className="delete-icon" onClick={(e)=>{
                                            e.stopPropagation();
                                            const newModal = modal.confirm({
                                                title: '确定删除商店Logo吗？',
                                                icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
                                                centered: true,
                                                okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
                                                footer:()=>(
                                                    <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                                                        <DefaultButton text={`取消`} autoInsertSpace={false} onClick={()=>newModal.destroy()} />
                                                        <DangerButton text={`确认`} loading={loading} autoInsertSpace={false} onClick={async ()=>{
                                                            baseInfoStore.setStoreInfo({
                                                                ...baseInfoStore.storeInfo,
                                                                store_logo:""
                                                            })
                                                            newModal.destroy();
                                                        }} />
                                                    </Flex>
                                                )
                                            });
                                        }}>
                                            <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                                        </div>
                                    </div>
                                )}
                            </div>}
                        {/* </Spin> */}
                    </Form.Item>
                    <Form.Item
                        label="商店名称"
                        >
                        <DefaultInput placeholder="请输入店铺名称" value={baseInfoStore.storeInfo.store_name} onChange={(e:any)=>baseInfoStore.setStoreInfo({
                            ...baseInfoStore.storeInfo,
                            store_name:e.target.value
                        })} />
                    </Form.Item>
                    <Form.Item
                        label="商店联系人邮箱"
                        >
                        <div style={{marginBottom:"8px"}}>MataCart可通过此邮箱与你联系。</div>
                        <DefaultInput placeholder="请输入商店联系人邮箱" value={baseInfoStore.storeInfo.merchant_email} onChange={(e:any)=>baseInfoStore.setStoreInfo({
                            ...baseInfoStore.storeInfo,
                            merchant_email:e.target.value
                        })}  />
                    </Form.Item>
                    <Form.Item
                        label="客服邮箱"
                        >
                        <div style={{marginBottom:"8px"}}>客户可通过此邮箱与您联系。</div>
                        <DefaultInput placeholder="请输入客服邮箱" value={baseInfoStore.storeInfo.service_email} onChange={(e:any)=>baseInfoStore.setStoreInfo({
                            ...baseInfoStore.storeInfo,
                            service_email:e.target.value
                        })} />
                    </Form.Item>
                    <div className="color-7A8499 font-12">
                        {"您的电子邮件在收件箱中可能通过以下形式显示：StoreName<no-reply@matacart.com>，您可以自行配置为带域名的品牌邮箱以提升邮件到达率。了解展示效果"}
                    </div>
                    {/*  */}
                    {baseInfoStore.storeInfo.service_email && baseInfoStore.storeInfo.email_verify_status == 0 ?
                        <div style={{marginTop:"12px"}}>
                            <MyAlert className="my-alert" type="warning" showIcon closable message={
                                <Flex align="center" className="font-w-500 font-12">
                                    <div>请通过点击发送到邮箱的链接来验证您有权访问{baseInfoStore.storeInfo.service_email}。</div>
                                    {isSendVerify ? <Flex align="center">
                                        <button disabled className="font-12 color-356DFF my-alert-resend">
                                            <div>重新发送验证码（{count}）</div>
                                        </button>
                                        <div className="font-12 color-356DFF cursor-pointer">未收到验证码？<ExportOutlined style={{left:"2px"}} /></div>
                                    </Flex> : <button disabled={sendVerifyLoading} className="font-12 color-356DFF my-alert-send" onClick={sendVerifyEmail}>
                                        <Flex gap={4}>
                                            {sendVerifyLoading ? <LoadingOutlined spin /> : ""}
                                            <div>发送验证邮件</div>
                                        </Flex>
                                    </button>}
                                </Flex>
                            } />
                        </div>:null
                    }
                </Form>
            </Card>
        </Scoped>
    )

}

export default observer(BaseInfoCard);

const Scoped = styled.div`
    margin-bottom: 20px;

    :where(.css-dev-only-do-not-override-no4izc).ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{
        width: 90px;
        height: 90px;
    }

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
    img {

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

    .my-alert{
        .my-alert-send{
            cursor: pointer;
            border: none;
            background: none;
            &:hover{
                text-decoration: underline;
            }
        }
        .my-alert-resend{
            cursor: pointer;
            border: none;
            background: none;
            &:hover{
                text-decoration: underline;
            }
        }
        .my-alert-send:disabled, .my-alert-resend:disabled {
            opacity: 0.6;    /* 透明度 */
            cursor: not-allowed;
        }
    }
`
