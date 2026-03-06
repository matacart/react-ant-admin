import { Flex, message, Spin } from "antd"
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

    const { id,templateId,languageId,versionId }  = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [loading,setLoading] = useState(false);

    const fetch = async ()=>{
        setLoading(true)
        try {
            const results = await Promise.allSettled([
                getThemeFileList({
                    id:id??"",
                    templateId:templateId??"",
                    mode:codeEditor.mode,
                    languages_id:languageId || "2",
                    version_id:versionId??"",
                    versionId:versionId??"",
                }),
                getTemplateInfo(templateId ?? "",codeEditor.languageId)
            ])
            const [fileListResult, templateInfoResult] = results;
            if(fileListResult.status === "fulfilled"){
                codeEditor.setFileList(fileListResult.value?.data?.files || [])
                codeEditor.setLanguageId(languageId || "2")
                codeEditor.setVersionId(versionId??"")
            }
            if(templateInfoResult.status === "fulfilled"){
                codeEditor.setTemplateInfo(templateInfoResult.value?.data?.templateInstanceInfo || null)
            }
        }catch (error) { 
        }finally{ 
            setLoading(false);
            setIsSkeleton(false);
        }
    }

    useEffect(()=>{
        fetch();
        return () => {
            // 组件销毁时重置状态
            codeEditor.reset();
        };
    },[])

    useEffect(()=>{
        if (isSkeleton) {
            return;
        }
        setLoading(true)
        getThemeFileList({
            id:id??"",
            templateId:templateId??"",
            mode:codeEditor.mode,
            languages_id:codeEditor.languageId,
            version_id:codeEditor.versionId??"",
            versionId:codeEditor.versionId || ""
        }).then((res:any)=>{
            if(res.code == "SUCCESS"){
                codeEditor.setFileList(res.data?.files || []);
                codeEditor.setIsAuthor(res.data.isAuthor);
            }else{
                message.error(res.msg)
            }
        }).catch(()=>{
            // 错误处理
        }).finally(()=>{
            setLoading(false)
        })
        // 状态清除
    },[codeEditor.mode,codeEditor.languageId,codeEditor.versionId])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<>
                <Spin spinning={loading}>
                    {/* header */}
                    <Header templateId={templateId??""} />
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