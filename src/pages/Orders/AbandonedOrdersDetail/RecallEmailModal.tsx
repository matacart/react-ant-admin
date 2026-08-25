import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton"
import DefaultInput from "@/components/Input/DefaultInput";
import MyInput from "@/components/Input/MyInput";
import SecondTinyMce from "@/components/MCE/SecondTinyMce";
import { sendRecallEmail } from "@/services/y2/ApiAbandonedOrder";
import { getEmailTemplateConfig, getEmailTemplateDetail } from "@/services/y2/apiEmail";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "@umijs/max";
import { App, Col, Flex, Form, Modal, Row } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const RecallEmailModal = () => {

    const {modal,message} = App.useApp();

    const [open, setOpen] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    // 生成临时编号
    const oseId = uuidv4();

    const [title, setTitle] = useState("");
    const titleRef = useRef<any>(null);
    const [content, setContent] = useState("");
    const editorInstanceRef = useRef<any>(null);
    const [usableVariable, setUsableVariable] = useState([]);

    // 是否有变更默认值
    const [hasChange, setHasChange] = useState(false);

    // 预览模板
    const [previewOpen, setPreviewOpen] = useState(false);

    // 转换 {{变量名}} 为 【动态源名称】 格式
    const replaceVariables = (str:string) => {
        let displayValue = str;
        // 遍历所有可用变量，将 {{变量名}} 替换为动态源名称
        usableVariable.forEach((item:any) => {
            const regex = new RegExp(`\\{\\{metafields\\.${item.key}\\}\\}`, 'g');
            displayValue = displayValue.replace(regex, `{${item.name}}`);
        });
        return displayValue;
    }

    // 转换 【动态源名称】 格式为 {{变量名}} 格式
    const replaceDynamicSource = (str:string) => {
        let displayValue = str;
        // 遍历所有可用变量，将 【动态源名称】 替换为 {{变量名}}
        usableVariable.forEach((item:any) => {
            const regex = new RegExp(`{\\${item.name}\\}`, 'g');
            displayValue = displayValue.replace(regex, `{{metafields.${item.key}}}`);
        });
        return displayValue;
    }

    const setTinyMceContent = (str:string)=>{
        setContent(str);
        !hasChange && setHasChange(true);
    }

    const cancelHandle = ()=>{
        setOpen(false)
    }

    const submitHandle = ()=>{
        const params = {
            abandonedOrderSeqList:JSON.stringify([abandonedOrder.abandonedOrderData?.abandonedOrderSeq || ""]),
            mToken:oseId,
            languages_id:abandonedOrder.languages || "",
            emailTitle:replaceDynamicSource(title),
            headerContent:replaceDynamicSource(content),
            senderName:abandonedOrder.serviceEmail || "",
            hasChange:hasChange || false,
        }
        if(hasChange){
            const confirm = modal.confirm({
                icon: <ExclamationCircleFilled style={{color:"#356DFF"}}/>,
                title:"温馨提示",
                content:"更新过的邮件内容须经过平台审核通过后才能生效。如果内容审核未通过，系统将采用默认模板发送。",
                centered:true,
                footer:()=>(
                    <Flex justify="flex-end" gap={12} style={{marginTop:"20px"}}>
                        <DefaultButton text="取消" onClick={()=>confirm.destroy()}  />
                        <PrimaryButton text="发送" loading={loading} onClick={()=>{
                            confirm.destroy();
                            setLoading(true);
                            sendRecallEmail(params).then(()=>{
                                message.success("发送成功");
                            }).catch(()=>{
                            }).finally(()=>{
                                setOpen(false);
                                setLoading(false);
                            })
                        }} />
                    </Flex>
                ),
            })
        }else{
            setLoading(true);
            sendRecallEmail(params).then(()=>{
                message.success("发送成功");
            }).catch(()=>{
            }).finally(()=>{
                setOpen(false);
                setLoading(false);
            })
        }
    }

    // 发送召回邮件
    const getRecallEmail = async ()=>{
        setOpen(true);
        setOpenLoading(true);
        getEmailTemplateDetail({
            template_code:"order_action_email_abandoned_order_recall",
            languages_id:abandonedOrder.languages || "",
            user_languages_id:"1",
            oseid:oseId,
        }).then((res)=>{
            setTitle(replaceVariables(res.data.sections.content_section.settingsData.settings.title.value || ""))
            setContent(replaceVariables(res.data.sections.content_section.settingsData.settings.content.value || ""))
        }).finally(()=>{
            setPreviewOpen(false);
            setHasChange(false);
            setOpenLoading(false);
        })
    }

    // 保存编辑器实例
    const handleEditorInit = (editor: any) => {
        editorInstanceRef.current = editor;
    };

    const insertTitle = ()=>{
        // 1. 获取光标起始位置
        const start = titleRef.current.input.selectionStart ?? 0; 
        // 2. 获取选区结束位置（如果只是光标没选中文字，end === start）
        const end = titleRef.current.input.selectionEnd ?? 0;   
        // 3. 在光标/选区处插入文字
        const newValue = title.substring(0, start) + "{店铺名称}" + title.substring(end);
        setTitle(newValue);
    }
    const insertContent = ()=>{
        const editor = editorInstanceRef.current;
        if (editor) {
            editor.insertContent('{客户名称}');
        }
    }

    useEffect(()=>{
        getEmailTemplateConfig({
            template_code:"order_action_email_abandoned_order_recall",
            languages_id:abandonedOrder.languages || "",
            user_languages_id:"1",
            oseid:`oseid_${oseId}`,
        }).then((res)=>{
            setUsableVariable(res.data.usableVariable || []);
        })
    },[])

    return (
        <>
            <PrimaryButton text="发送召回邮件" onClick={getRecallEmail} />
            <MyModal
                title={previewOpen?"预览邮件":"发送召回邮件"} 
                width={620} 
                centered 
                open={open} 
                loading={openLoading}
                onCancel={cancelHandle}
                footer={<Flex justify="space-between">
                    {previewOpen ? <DefaultButton text="返回发送召回邮件" onClick={()=>setPreviewOpen(false)} /> : <DefaultButton text="预览模板" onClick={()=>setPreviewOpen(true)} />}
                    <Flex justify="end" gap={16}>
                        <DefaultButton text="取消" onClick={cancelHandle} />
                        <PrimaryButton text="发送" loading={loading} onClick={submitHandle} />
                    </Flex>
                </Flex>}
            >
                {previewOpen ? <div className="preview">
                    <iframe style={{border: "none",width: "100%",height: "500px"}} src={`https://yiyi.v.matacart.com/pigeon/editor/preview?languages_id=2&template_code=order_action_email_abandoned_order_recall&store_name=YIYI&store_general_name=YIYI&store_logo=&store_general_logo=&store_email=matacart@email.com&store_custom_email=matacart@email.com`} />
                </div> : <Form layout="vertical" className="form">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="发件人">
                                <DefaultInput disabled value={abandonedOrder.serviceEmail} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="收件人">
                                <DefaultInput disabled value={abandonedOrder.abandonedOrderData?.buyerInfo?.buyerEmail || ""} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item label="邮件主题">
                                <MyInput ref={titleRef} value={title} onChange={(e:any)=>{
                                    setTitle(e.target.value);
                                    !hasChange && setHasChange(true)
                                }} style={{height: "36px"}} placeholder="默认使用邮件模板主题" />
                                {/*  */}
                                <div style={{marginTop: "8px"}}>插入动态文字：<span className="variable-item cursor-pointer" onClick={insertTitle}>店铺名称</span></div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item label="邮件正文">
                                <SecondTinyMce onEditorInit={handleEditorInit} content={content} setContent={setTinyMceContent} />
                                {/*  */}
                                <div style={{marginTop: "8px"}}>插入动态文字：<span className="variable-item cursor-pointer" onClick={insertContent}>客户名称</span></div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>}
                <div className="color-7A8499">可在<Link to="/settings/noticeEmail/order_action_email_abandoned_order_recall"> 通知 </Link>中编辑此邮件模板</div>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
    .preview{
        margin-top: 20px;
    }
    .form{
        margin-top: 20px;
    }
    .variable-item{
        font-size: 12px;
        padding: 4px 8px;
        text-align: center;
        background-color: rgba(0,39,155,.07);
    }
`

export default RecallEmailModal;