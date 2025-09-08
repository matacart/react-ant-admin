import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import MyDropdownExpansion from '@/components/Dropdown/MyDropdownExpansion';
import { UnfoldIcon } from '@/components/Icons/Icons';
import { Flex, message, version } from 'antd';
import React, { useState } from 'react';
// 全部导入
import * as monaco from 'monaco-editor';
// 导入基础版 （不含功能）
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// import 'monaco-editor/esm/vs/editor/contrib/folding/browser/folding';
// import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"; // 代码高亮&提示
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getFileVersion, getThemeFileDetail, setFileSave } from '@/services/y2/api';
import { useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSleep } from '@/hooks/customHooks';
import codeEditor from '@/store/theme/codeEditor';

function MyMonacoEditor({file}:{file:any}){

    const sleep = useSleep();

    const mRef = useRef<any>(null);

    const cRef = useRef<any>(null);

    const editorRef = useRef<any>(null); // 新增 ref 用于保存编辑器实例

    const searchParams = new URLSearchParams(useLocation().search);

    const key = searchParams.get('key');

    const { id,templateId }  = useParams();

    const [loading,setLoading] = useState(false);

    const initMonacoEditor = async (file:any) => {
        editorRef.current = monaco.editor.create(cRef.current, {
            value: file?.fileContent || "",
            language: "html",
            theme: "vs",
            minimap: { enabled: true },
        });
    }

    const [versionList,setVersionList] = useState<any[]>([]);
    const [fileVersionList,setFileVersionList] = useState([]);

    // 当前版本
    const [version,setVersion] = useState("");

    const submit = ()=>{
        if (editorRef.current) {
            const content = editorRef.current.getValue();
            setLoading(true)
            setFileSave(id??"",templateId??"",key??"",content,codeEditor.mode).then(async (res:any)=>{
                if(file){
                    await sleep(1000);
                    // 获取文件版本
                    getFileVersion(id??"",templateId??"",key??"",codeEditor.mode).then((res:any)=>{
                        setFileVersionList(res.data)
                    })
                    setVersion("");
                }
                message.success(res.msg)
            }).catch(err=>{
                message.error("请求失败")
            }).finally(()=>{
                setLoading(false)
            })
        }
    }
    
    useEffect(()=>{
        if(file){
            getThemeFileDetail(id??"",templateId??"",key??"","",codeEditor.mode).then((res:any)=>{
                setVersion(res.data?.version);
                initMonacoEditor(res.data);
            })
            // 获取文件版本
            getFileVersion(id??"",templateId??"",key??"",codeEditor.mode).then((res:any)=>{
                setFileVersionList(res.data)
            })
        }
        // 组件卸载时销毁编辑器
        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
            }
        };
    },[])

    useEffect(()=>{
        if(fileVersionList){
            const newVersionList = fileVersionList.map((item:any,index:number)=>{
                return {
                    key:index,
                    label: <div onClick={() => {
                        getThemeFileDetail(id??"",templateId??"",key??"",item.id == "current" ? "": (item.id??""),codeEditor.mode).then((res:any)=>{
                            res.data?.version && setVersion(res.data.version);
                            initMonacoEditor(res.data);
                        })
                    }}>
                        <div className={version == item?.version ? 'color-356DFF':'color-242833'}>
                            {item.id == "current" ?<>
                                当前版本
                            </>:item.id?<>
                                {item.version} - {dayjs(item?.updateTime).format("YYYY/MM/DD HH:mm:ss")}
                            </>:<></>}
                        </div>
                    </div>
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
                    <PrimaryButton text="保存" loading={loading} onClick={submit} />
                </Flex>
            </div>
            {/*  */}
            <div id="container" ref={cRef} className='container'></div>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
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
    .container{
        height: calc(100vh - 164px);
        width: 100%;
    }
`

export default MyMonacoEditor;