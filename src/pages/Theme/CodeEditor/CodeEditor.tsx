import { Flex, Spin } from "antd"
import Header from "./Header"
import Side from "./Side"
import styled from "styled-components"
import Main from "./Main"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { getTemplateInfo, getThemeFileList } from "@/services/y2/api"
import codeEditor from "@/store/theme/codeEditor"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { observer } from "mobx-react-lite"

function CodeEditor(){

    const { id,templateId,languageId }  = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [loading,setLoading] = useState(false);

    const fetch = async ()=>{
        setLoading(true)
        await Promise.allSettled([
            getThemeFileList({
                id:id??"",
                templateId:templateId??"",
                mode:codeEditor.mode,
                languages_id:codeEditor.languageId
            }),
            getTemplateInfo(templateId ?? "",codeEditor.languageId)
        ]).then((res:any)=>{
             // 处理结果
            const [fileListResult, templateInfoResult] = res;
            if(fileListResult.status === "fulfilled"){
                codeEditor.setFileList(fileListResult.value?.data?.files || [])
            }
            if(templateInfoResult.status === "fulfilled"){
                codeEditor.setTemplateInfo(templateInfoResult.value?.data?.templateInstanceInfo || null)
            }
        }).catch(()=>{
            // 错误处理
            console.log("错误处理");
        }).finally(()=>{
            setLoading(false)
        })
        setIsSkeleton(false);
    }

    
    useEffect(()=>{
        // 默认语言
        codeEditor.setLanguageId(languageId ?? "2");
        // 初始化状态
        codeEditor.setOpenFileList([]);
        codeEditor.setActiveFileKey("");
    },[])

    useEffect(()=>{
        fetch();
    },[codeEditor.languageId])

    // 首次
    const isFirstRender = useRef(true);
    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setLoading(true)
        getThemeFileList({
            id:id??"",
            templateId:templateId??"",
            mode:codeEditor.mode,
            languages_id:codeEditor.languageId
        }).then((res:any)=>{
            codeEditor.setFileList(res.data?.files || [])
        }).catch(()=>{
            // 错误处理
        }).finally(()=>{
            setLoading(false)
        })
    },[codeEditor.mode])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<>
                <Spin spinning={loading}>
                    {/* header */}
                    <Header templateId={templateId??""} languageId={languageId??"2"} />
                    {/* container */}
                    <Flex>
                        <div className="side">
                            <Side />
                        </div>
                        <div className="main">
                            <Main />
                        </div>
                    </Flex>
                </Spin>
            </>}
        </Scoped>
        

    )
}

const Scoped = styled.div`
    .side{
        width: 320px;
        height: calc(100vh - 60px);
        overflow-y: auto;
        border: 1px solid #ccc;
    }
    .main{
        /* flex:1 导致元素宽度无法缩小，改用百分比布局 */
        width: calc(100% - 320px);
        border-top: 1px solid #d7dbe7;
    }

`

export default observer(CodeEditor)