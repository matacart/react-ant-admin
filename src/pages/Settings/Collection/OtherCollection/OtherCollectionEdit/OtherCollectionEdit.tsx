import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Flex, Form, Input, List, message, TabsProps, Upload } from "antd"
import { history, useParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getAddonsConfigs, setAddonsConfig, upDataAddonsConfig } from "@/services/y2/api";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import axios from "axios";
import modal from "antd/es/modal";


const { TextArea } = Input;

function OtherCollectionEdit() {

    const params = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [imgLoading, setimgLoading] = useState(false);

    const [isMaskVisible, setIsMaskVisible] = useState(false);

    const [config,setConfig] = useState<any>({
        isAddressRequired:"0",
        isUploadCredentials:"0",
        credentialsText:"",
        credentialsImg:""
    });

    const [manualCollection,setManualCollection] = useState<any>([])
    const [manualCollectionData,setManualCollectionData] = useState<any>()

    const uploadButton = (
        <button style={{ border: 0, background: 'none',width:"100%",height:"100%" }} type="button">
          {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>添加图片</div>
          <p style={{ margin:"8px 10px 0 10px" }} className="font-12 color-7A8499">请上传4MB以内的JPG，PNG，GIF图片</p>
        </button>
    );

    const stop = ()=>{

        modal.confirm({
            title: '停用服务商？',
            icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
            content: '停用后，网店客户将不可使用此服务商结账。',
            centered:true,
            okText: '确认停用',
            okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
            cancelText: '取消',
            onOk:()=>{
                upDataAddonsConfig({...manualCollectionData,status:0,config:config}).then(res=>{
                    message.success("支付方式已停用")
                })
            }
        });
    }

    const upData = ()=>{
        console.log(manualCollection)
        upDataAddonsConfig({...manualCollection,status:1,config:config}).then(res=>{
            message.success("已更新")
        })
    }

    // 凭证图片
    const beforeUploadImg = (file:any)=>{
        // console.log(file)
        if(file.type.slice(0,5)=="image"){
            // 上传
            setimgLoading(true)
            let formData = new FormData()
            formData.append("file", file)
            axios.post('/api/ApiAppstore/doUploadPic',formData).then((req: any) => {
                if(req.data.code == 0){
                    setConfig({...config,credentialsImg:req.data.data.src})
                }else{
                    message.error("上传失败", 1)
                }
                setimgLoading(false);
            })
        }else{
            message.error("文件格式错误")
            setimgLoading(false);
        }
        return false
    }

    useEffect(()=>{

        if(params.id=="0"){
            // 货到付款
            setManualCollection({
                id:"0",
                title:"货到付款",
                languages_id:"2",
                addons_id:"23",
            })
            setIsSkeleton(false)
        }else{
            getAddonsConfigs(params.id).then(res=>{
                setManualCollection(res.data[0])
                setManualCollectionData(res.data[0])
                setIsSkeleton(false)
                // 配置信息
                console.log(JSON.parse(res.data[0].config))
                setConfig(JSON.parse(res.data[0].config))
    
                console.log(config.credentialsImg)
            })
        }
        
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />: <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/payments")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">编辑 {manualCollection?.title}</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px 20px 0 20px"}}>
                                    <Form layout="vertical">
                                        <Form.Item label={<div>
                                            <div className="font-w-600">付款方式简介 (选填)</div>
                                            <div className="font-12 color-7A8499" style={{marginTop:"8px"}}>* 您可以通过分点罗列、分段换行、控制每段的字符数等方式提升内容清晰度。</div>
                                        </div>}>
                                            <TextArea value={manualCollection.summary} onChange={(e)=>{setManualCollection({...manualCollection,summary:e.target.value})}} style={{ height: 120, resize: 'none' }} showCount placeholder={`输入简介内容，如有多个内容，建议分段展示，如：\x0A1、需要注意的付款说明... \x0A2、....`} maxLength={500} />
                                            <div style={{marginTop:"8px"}} className="color-356DFF cursor-pointer">了解展示效果</div>
                                        </Form.Item>
                                        <div>
                                            <Checkbox checked={config.isAddressRequired == "1"?true:false} onChange={(e)=>{
                                                setConfig({...config,isAddressRequired:e.target.checked?"1":"0"})
                                            }}>无需客户填写账单地址</Checkbox>
                                        </div>
                                        <div style={{margin:"20px 0"}}>
                                            <Checkbox checked={config.isUploadCredentials == "1"?true:false} onChange={(e)=>{
                                                setConfig({...config,isUploadCredentials:e.target.checked?"1":"0"})
                                            }}>需要客户上传凭证</Checkbox>
                                        </div>
                                        {config.isUploadCredentials == "1" && <div>
                                            <Flex>
                                                {/* <TinyMce /> */}
                                                <div className="credentials-left-box">
                                                    <TextArea value={config.credentialsText} onChange={(e)=>{
                                                        setConfig({...config,credentialsText:e.target.value})
                                                    }} style={{height:150,resize: 'none'}} showCount placeholder={"输入附加信息，如提示客户转账至具体银行账号或使用支付平台扫码支付。"} maxLength={200} />
                                                </div>
                                                <div className="credentials-right-box">
                                                    {(config.credentialsImg == "" || config.credentialsImg == undefined) ? <Upload
                                                        name="avatar"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        beforeUpload={beforeUploadImg}
                                                    >
                                                        {uploadButton}
                                                    </Upload> : <div className="upload-img" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                                                        <img src={config.credentialsImg} alt="avatar" style={{ width: '100%',height:"100%",objectFit:"contain" }} />
                                                        {isMaskVisible && (
                                                            <div className="mask">
                                                                <div className="delete-icon" onClick={(e)=>{
                                                                    e.stopPropagation()
                                                                    modal.confirm({
                                                                        title: '确认要删除吗？',
                                                                        icon: <ExclamationCircleOutlined />,
                                                                        content: '删除后不可恢复。',
                                                                        centered:true,
                                                                        okText: '确认',
                                                                        cancelText: '取消',
                                                                        onOk:()=>{
                                                                            setConfig({...config,credentialsImg:""})
                                                                        }
                                                                    });
                                                                }}>
                                                                    <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    }
                                                </div>
                                            </Flex>
                                            <div style={{margin:"8px 0 20px 0"}} className="color-356DFF cursor-pointer">了解展示效果</div>
                                        </div>}
                                    </Form>
                                </div>
                            </Card>
                            <Flex justify="space-between">
                                <Button onClick={stop} type="primary" style={{height:36,backgroundColor:"#F86140",color:"#FFFFFF"}}>停用 货到付款</Button>
                                <Button onClick={upData} type="primary" style={{height:36}}>更新</Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default OtherCollectionEdit

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 880px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    /* display: flex; */
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                padding: 0;
                .credentials-left-box{
                    flex: 1;
                    min-height: 150px;
                }
                .credentials-right-box{
                    margin-left: 8px;
                    .ant-upload{
                        width: 180px;
                        min-height: 150px;
                    }
                    .upload-img{
                        background-color: #f7f8fb;
                        border-radius: 4px;
                        width: 180px;
                        min-height: 150px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        /*  */
                        position: relative;
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
                        background-color: rgba(36,40,51,0.4);
                        /* opacity: 0; */
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: opacity 0.3s ease;
                    }

                    .upload-img:hover.mask {
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
            }
            

        }
        
    }
}
`