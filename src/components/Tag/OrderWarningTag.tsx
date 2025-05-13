import { Tabs, TabsProps, Tag } from "antd"
import styled from "styled-components"

export default function OrderWarningTag({text}:{text:string}){
    return(
        <Scoped>
            <Tag color="warning" bordered={false} style={{borderRadius:"9999px",backgroundColor:"#ffedc9",padding:"0 8px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    <svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3" stroke="#FE9E0F" stroke-width="2"></circle>
                    </svg>
                    <span className='font-12 color-474F5E font-w-500'>{text}</span>
                </div>
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`
`