import { CheckCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons"
import { Flex, Tabs, TabsProps, Tag } from "antd"
import styled from "styled-components"

export default function WarningTagText({content}:{content:React.ReactNode}){
    return(
        <Scoped>
            <Tag className="tag" color="warning">
                {/* <div style={{display:"flex",alignItems:"center",gap:"5px"}}> */}
                    {/* {content} */}
                    <Flex gap={8}>
                        <ExclamationCircleFilled className="font-14 tag-icon" />
                        <div>{content}</div>
                    </Flex>
                {/* </div> */}
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`
    .tag{
        width: 100%;
        white-space: nowrap !important;  // 新增
        word-break: break-word; 
        background-color: #ffedc9;
        padding: 8px 16px;
        .tag-icon{
            position: relative;
            top: 4px;
        }
        span {
            display: inline-block;  // 关键点4️⃣：允许应用宽度限制
            max-width: 100%;
            white-space: pre-wrap;  // 保留空格但允许换行
        }
    }
`