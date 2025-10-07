import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import MyDropdownExpansion from '@/components/Dropdown/MyDropdownExpansion';
import { UnfoldIcon } from '@/components/Icons/Icons';
import { Flex, message, version } from 'antd';
import React, { useState } from 'react';
// 离线版本
import { loader } from '@monaco-editor/react';
// 配置 loader 使用本地的 monaco 实例
loader.config({ 
    paths: {
        vs: '/monaco-editor/vs' // 指向你本地的 monaco 资源路径
        // vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
    }
});

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getFileVersion, getThemeFileDetail, setFileSave } from '@/services/y2/api';
import { useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSleep } from '@/hooks/customHooks';
import codeEditor from '@/store/theme/codeEditor';
import { observer } from 'mobx-react-lite';
// 使用 @monaco-editor/react 组件
import MonacoEditor from '@monaco-editor/react';


function MyMonacoEditor({file}:{file:any}){

    const [fileInfo, setFileInfo] = useState<any>(file);

    const sleep = useSleep();

    const mRef = useRef<any>(null);

    const searchParams = new URLSearchParams(useLocation().search);

    const key = searchParams.get('key');

    const { id,templateId }  = useParams();

    const [loading,setLoading] = useState(false);

    const editorRef = useRef<any>(null); // 用于保存编辑器实例

    const [versionList,setVersionList] = useState<any[]>([]);
    const [fileVersionList,setFileVersionList] = useState([]);

    // 当前版本
    const [version,setVersion] = useState("");
    // 语言状态
    const [language, setLanguage] = useState<string>("html");
    // 编辑器内容状态
    const [code, setCode] = useState<string>("");
    // 原始内容状态，用于比较是否有变化
    const [originalCode, setOriginalCode] = useState<string>("");
    // 编辑器就绪处理
    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };
    // 资源
    const [imageUrl,setImageUrl] = useState<string>("");

    const submit = ()=>{
        if (editorRef.current) {
            const content = editorRef.current.getValue();
            setLoading(true)
            setFileSave({
                id:id??"",
                templateId:templateId??"",
                languagesId:codeEditor.languageId,
                fileName:key??"",
                mode:codeEditor.mode,
                fileContent:content,
            }).then(async (res:any)=>{
                if(fileInfo){
                    await sleep(1000);
                    // 获取文件版本
                    getFileVersion({
                        id:id??"",
                        templateId:templateId??"",
                        languagesId:codeEditor.languageId,
                        fileName:key??"",
                        mode:codeEditor.mode,
                    }).then((res:any)=>{
                        setFileVersionList(res.data)
                    })
                    setVersion("");
                }
                // 更新原始代码为当前保存的代码
                setOriginalCode(content);
                message.success(res.msg)
            }).catch(err=>{
                message.error("请求失败")
            }).finally(()=>{
                setLoading(false)
            })
        }
    }
    
    // 添加首次渲染标记
    const isFirstRender = useRef(true);
    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // 激活文件重新读取 -- 且文件id或文件languageId需要改变
        if(fileInfo && fileInfo.key == codeEditor.activeFileKey){
            if(codeEditor.mode == fileInfo.mode && codeEditor.languageId == fileInfo.languagesId){
                return;
            }
            getThemeFileDetail({
                id:id??"",
                templateId:templateId??"",
                languagesId:codeEditor.languageId,
                fileName:fileInfo.url??"",
                versionId:"",
                mode:codeEditor.mode,
            }).then((res:any)=>{
                if(res.code == 0){
                    const fileTypeList = res.data?.fileType.split("/");
                    if(fileTypeList[0] == "image"){
                        setImageUrl(res.data?.fileUrl);
                    }else{
                        setCode(res.data?.fileContent || "");
                        setOriginalCode(res.data?.fileContent || "");
                        setLanguage(fileTypeList.length > 1 ? fileTypeList[1] : fileTypeList[0]);
                    }
                } 
            }).catch(err=>{
                message.error("请求失败")
            })
            // 获取文件版本
            getFileVersion({
                id:id??"",
                templateId:templateId??"",
                languagesId:codeEditor.languageId,
                fileName:fileInfo.url??"",
                mode:codeEditor.mode
            }).then((res:any)=>{
                setFileVersionList(res.data)
            })
            // 修改文件信息
            setFileInfo({
                ...fileInfo,
                mode:codeEditor.mode,
                languagesId:codeEditor.languageId,
            })
        }
    },[codeEditor.mode,codeEditor.languageId,codeEditor.activeFileKey])

    // 组件卸载时销毁编辑器
    useEffect(()=>{
        if(fileInfo){
            getThemeFileDetail({
                id:id??"",
                templateId:templateId??"",
                languagesId:codeEditor.languageId,
                fileName:fileInfo.url??"",
                versionId:"",
                mode:codeEditor.mode,
            }).then((res:any)=>{
                const fileTypeList = res.data?.fileType.split("/");
                if(fileTypeList[0] == "image"){
                    setImageUrl(res.data?.fileUrl);
                }else{
                    setCode(res.data?.fileContent || "");
                    setOriginalCode(res.data?.fileContent || "");
                    setLanguage(fileTypeList.length > 1 ? fileTypeList[1] : fileTypeList[0]);
                }
            }).catch(err=>{
                message.error("请求失败")
            })
            // 获取文件版本
            getFileVersion({
                id:id??"",
                templateId:templateId??"",
                languagesId:codeEditor.languageId,
                fileName:fileInfo.url??"",
                mode:codeEditor.mode
            }).then((res:any)=>{
                setFileVersionList(res.data)
            })
        }
        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
            }
        };
    },[])


    // 切换版本变化或新增版本
    useEffect(()=>{
        if(fileVersionList){
            const newVersionList = fileVersionList.map((item:any,index:number)=>{
                return {
                    key:index,
                    label: <a onClick={() => {
                        getThemeFileDetail({
                            id:id??"",
                            templateId:templateId??"",
                            languagesId:codeEditor.languageId,
                            fileName:fileInfo.url??"",
                            versionId:item.id??"",
                            mode:codeEditor.mode,
                        }).then((res:any)=>{
                            if(res.code == 0){
                                setVersion(item.id);
                                setCode(res.data?.fileContent || "");
                                setOriginalCode(res.data?.fileContent || "");
                                const fileTypeList = res.data?.fileType.split("/");
                                setLanguage(fileTypeList.length > 1 ? fileTypeList[1] : fileTypeList[0]);
                            }
                        })
                    }}>
                        <div className={version == (item.id??"") ? 'color-356DFF':'color-242833'}>
                            {item.id == null ?<>
                                当前版本
                            </>:item.id?<>
                                {item.version} - {dayjs(item?.updateTime).format("YYYY/MM/DD HH:mm:ss")}
                            </>:<></>}
                        </div>
                    </a>
                }
            })
            setVersionList(newVersionList);
        }
    },[version,fileVersionList])

    return (
        <Scoped>
            <div className='actionBar'>
                <div className='left color-474F5E' ref={mRef}>
                    <div>查看历史版本</div>
                    {/*  */}
                    <MyDropdownExpansion
                        getPopupContainer={()=>mRef.current!}
                        tiggerEle={
                            <Flex className='current-version cursor-pointer' align='center'>
                                当前版本
                                <UnfoldIcon className='font-16' />
                            </Flex>
                        }
                        menu={{
                            items:versionList
                        }}
                        theme={{
                            token: {
                                paddingXXS:0,
                                borderRadiusLG:4
                            },
                        }}
                    />
                </div>
                <Flex className='right' gap={8}>
                    <DefaultButton text="查找" />
                    <PrimaryButton text="保存" disabled={code === originalCode} loading={loading} onClick={submit} />
                </Flex>
            </div>
            {/* 使用 MonacoEditor 组件 */}
            {imageUrl ? <div className='image-box'>
                {/* 图片预览 */}
                <img src={imageUrl} alt="图片预览" />
            </div>:<MonacoEditor
                height="100%"
                language={language}
                value={code}
                onChange={(newValue) => setCode(newValue || "")}
                onMount={handleEditorDidMount}
                theme="vs"
                options={{
                    minimap: { enabled: true },
                    automaticLayout: true,
                }}
            />}
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    height: calc(100vh - 164px);
    .actionBar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 52px;
        padding: 0 20px;
        border-bottom: 1px solid #d7dbe7;

        .left{
            .ant-dropdown{
                box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
            }
        }

    }
    .image-box{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ebf5fa;
        height: 100%;
        padding: 80px;
        img{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    }
`

export default observer(MyMonacoEditor);