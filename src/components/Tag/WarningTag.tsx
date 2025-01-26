import { Tabs, TabsProps, Tag } from "antd"
import styled from "styled-components"

export default function WarningTag({text}:{text:string}){
    return(
        <Scoped>
            <Tag color="warning" style={{borderRadius:"9999px",backgroundColor:"#ffedc9",padding:"0 8px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    <div style={{height:"4px",width:"4px",backgroundColor: "#FE9E0F",borderRadius:"50%"}}></div>
                    <div className='font-12 color-474F5E'>{text}</div>
                </div>
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`

`