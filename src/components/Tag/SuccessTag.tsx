import { Tabs, TabsProps, Tag } from "antd"
import styled from "styled-components"

export default function SuccessTag({text}:{text:string}){
    return(
        <Tag color="success" style={{borderRadius:"9999px",backgroundColor:"#D6FAE7",padding:"0 8px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                <div style={{height:"4px",width:"4px",backgroundColor: "#35C08E",borderRadius:"50%"}}></div>
                <div className='font-12 color-474F5E font-w-500'>{text}</div>
            </div>
        </Tag>
    )
}

const Scoped = styled.div`
`