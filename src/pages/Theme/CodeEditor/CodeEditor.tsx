import { Flex } from "antd"
import Header from "./Header"
import Side from "./Side"
import styled from "styled-components"
import Main from "./Main"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTemplateInfo, getThemeFileList } from "@/services/y2/api"
import codeEditor from "@/store/theme/codeEditor"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"

function CodeEditor(){

    const { id,templateId }  = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true);

    useEffect(() => { 
        Promise.allSettled([
            getThemeFileList(
                id ?? "", 
                templateId ?? "",
                codeEditor.mode
            ),
            getTemplateInfo(templateId ?? "")
        ]).then((res:any)=>{
             // 处理结果
            const [fileListResult, templateInfoResult] = res;
            if(fileListResult.status === "fulfilled"){
                codeEditor.setFileList(fileListResult.value?.data?.files || [])
            }
            if(templateInfoResult.status === "fulfilled"){
                codeEditor.setTemplateInfo(templateInfoResult.value?.data?.templateInstanceInfo || null)
            }
            setIsSkeleton(false)
        })
    }, [])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<>
                {/* header */}
                <Header />
                {/* container */}
                <Flex>
                    {/* side */}
                    <div className="side">
                        <Side />
                    </div>
                    <div className="main">
                        <Main />
                    </div>
                </Flex>
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

export default CodeEditor