import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { ExclamationCircleFilled, ExportOutlined } from "@ant-design/icons";
import { Flex, message, Modal, Spin } from "antd";
import { useState } from "react";
import styled from "styled-components";
// 使用 @monaco-editor/react 组件
import MonacoEditor from '@monaco-editor/react';
import { getSectionRenderTemplate, resetSectionRenderTemplate, updateSectionRenderTemplate } from "@/services/y2/apiEmail";
import noticeEmail from "@/store/settings/notification/noticeEmail";
import { useIntl } from "@umijs/max";

function SectionHtmlEditor({setting,sectionId}:{setting:any,sectionId:string}) {
    
    const intl = useIntl();

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const [resetCodeOpen, setResetCodeOpen] = useState(false);

    const [resetCodeLoading, setResetCodeLoading] = useState(false);

    const [code, setCode] = useState("");

    const [css, setCss] = useState("");

    // 编辑器就绪处理
    const handleEditorDidMount = (editor: any) => {
        // editorRef.current = editor;
    };

    const editCode = ()=>{
        setOpen(true);
        setLoading(true);
        getSectionRenderTemplate({
            template_code: noticeEmail?.templateCode || "",
            languages_id: noticeEmail?.languagesId || "2",
            user_languages_id: noticeEmail?.useLanguagesId || "2",
            oseid: noticeEmail?.oseId || "",
            section_id: sectionId
        }).then(res=>{
            if(res?.code == 0) {
                setCode(res?.data?.render_template || "")
                setCss(res?.data?.render_css || "")
            };
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    const onCancel = ()=>{
        setOpen(false);
        setCode("");
    }

    const onsubmit = ()=>{
        setLoading(true);
        updateSectionRenderTemplate({
            template_code: noticeEmail?.templateCode || "",
            languages_id: noticeEmail?.languagesId || "2",
            user_languages_id: noticeEmail?.useLanguagesId || "2",
            oseid: noticeEmail?.oseId || "",
            section_id: sectionId,
            render_template: code,
            render_css: css,
        }).then(res=>{
            if(res?.code == 0) {
                
            }
        }).finally(()=>{
            setLoading(false);
            setOpen(false);
        })
    }

    // 重置代码 弹窗确认
    const resetCodeSubmit = ()=>{
        setResetCodeLoading(true);
        resetSectionRenderTemplate({
            template_code: noticeEmail?.templateCode || "",
            languages_id: noticeEmail?.languagesId || "2",
            user_languages_id: noticeEmail?.useLanguagesId || "2",
            oseid: noticeEmail?.oseId || "",
            section_id: sectionId,
        }).then(res=>{
            if(res?.code == 0) {
                message.success(intl.formatMessage({id:'components.message.success'}));
            }
        }).catch(()=>{
            message.error(intl.formatMessage({id:'components.message.error'}));
        }).finally(()=>{
            setResetCodeOpen(false);
            setResetCodeLoading(false);
        })
    }
    // 重置代码 弹窗取消
    const resetCodeCancel = ()=>{
        setResetCodeOpen(false);
    }

    return (
        <Scoped>
            <div className="title">
                <Flex className="font-14 color-474F5E" justify="space-between" align="center">
                    <div>{intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.title'})}</div>
                    <Flex gap={12}>
                        <div className="cursor-pointer font-12 color-356DFF" onClick={()=>setResetCodeOpen(true)}>{intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.reset'})}</div>
                        <div className="cursor-pointer font-12 color-356DFF" onClick={editCode}>{intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.edit'})}</div>
                    </Flex>
                </Flex>
                <div className="font-12 color-7A8499" style={{marginTop:4}}>
                    {intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.desc'})}<span className="cursor-pointer color-356DFF">{intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.learnMore'})}<ExportOutlined style={{position:"relative",left:"4px"}} /></span>
                </div>
            </div>
            {/* 编辑代码弹窗 */}
            <MyModal 
                title={intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.edit'})}
                open={open}
                width={860}
                centered
                onCancel={onCancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton text={intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.cancel'})} onClick={onCancel} />
                    <PrimaryButton loading={loading} text={intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.confirm'})} onClick={onsubmit} />
                </Flex>}
            >
                <Spin spinning={loading}>
                    <div className="editor-container">
                        <MonacoEditor
                            height="100%"
                            language="html"
                            value={code}
                            onChange={(newValue) => setCode(newValue || "")}
                            onMount={handleEditorDidMount}
                            theme="vs"
                            options={{
                                minimap: { enabled: true },
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </Spin>
            </MyModal>
            {/* 重置代码弹窗 */}
            <Modal
                width={420}
                title={<Flex gap={16} align="flex-start">
                    <ExclamationCircleFilled className='font-20' style={{color:"#356DFF",position:"relative",top:"4px"}} />
                    <div>{intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.resetDesc'})}</div>
                </Flex>}
                open={resetCodeOpen}
                centered
                onCancel={resetCodeCancel}
                footer={<Flex justify="flex-end" gap={12} style={{marginTop:"24px"}}>
                    <DefaultButton loading={resetCodeLoading} text={intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.cancel'})} onClick={resetCodeCancel} />
                    <PrimaryButton loading={resetCodeLoading} text={intl.formatMessage({id:'settings.notification.noticeEmail.right.sectionHtmlEditor.confirm'})} onClick={resetCodeSubmit} />
                </Flex>}
            >
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`

const MyModal = styled(Modal)`
    .editor-container{
        height: 460px;
    }
`;

export default SectionHtmlEditor;