import DefaultInput from "@/components/Input/DefaultInput";
import baseInfoStore from "@/store/setUp/baseInfoStore";
import { DeleteOutlined, ExclamationCircleOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Form, GetProp, Input, message, Spin, Upload, UploadProps } from "antd";
import modal from "antd/es/modal";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
function BaseInfoCard() {

    const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState<string>();

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
        let formData = new FormData()
        formData.append("1", file)

        setLoading(true)
        axios.post('/api/ApiAppstore/doUploadPic',formData).then((req: any) => {
          if(req.data.code == 0){
            // setImageUrl(req.data.data.src)
            baseInfoStore.setStoreLogo(req.data.data.src)
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

    return (
        <Scoped>
            <Card>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="商店Logo"
                        >
                        <div style={{marginBottom:"12px"}}>该Logo展示在您的店铺管理页面上。详见 <a className="font-w-500">此链接</a> 展示Logo的位置。图片最大限制 10MB。</div>
                        {/* <Spin spinning={loading}> */}
                            {(baseInfoStore.storeLogo == null || baseInfoStore.storeLogo == "") ? <Upload
                                style={{width:"90px",height:"90px"}}
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                            >
                                {uploadButton}
                            </Upload> : <div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                                <img src={baseInfoStore.storeLogo} style={{width:"100%"}}/>
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
                                                    baseInfoStore.setStoreLogo("")
                                                }
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
                        <DefaultInput placeholder="请输入店铺名称" value={baseInfoStore.storeName} onChange={(e:any)=>baseInfoStore.setStoreName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="商店联系人邮箱"
                        >
                        <div style={{marginBottom:"8px"}}>MataCart可通过此邮箱与你联系。</div>
                        <DefaultInput placeholder="请输入商店联系人邮箱" value={baseInfoStore.merchantEmail} onChange={(e:any)=>baseInfoStore.setMerchantEmail(e.target.value)}  />
                    </Form.Item>
                    <Form.Item
                        label="客服邮箱"
                        >
                        <div style={{marginBottom:"8px"}}>客户可通过此邮箱与您联系。</div>
                        <DefaultInput placeholder="请输入客服邮箱" value={baseInfoStore.serviceEmail} onChange={(e:any)=>baseInfoStore.setServiceEmail(e.target.value)}/>
                    </Form.Item>
                    <div className="color-7A8499 font-12">
                        {"您的电子邮件在收件箱中可能通过以下形式显示：StoreName<no-reply@matacart.com>，您可以自行配置为带域名的品牌邮箱以提升邮件到达率。了解展示效果"}
                    </div>
                </Form>
                <div></div>
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

`
