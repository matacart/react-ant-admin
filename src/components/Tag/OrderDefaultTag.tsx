import { Tag } from "antd"
import styled from "styled-components"



export default function OrderDefaultTag({text}:{text:string}){
    return(
        <Scoped>
            <Tag color="default" style={{borderRadius:"9999px",backgroundColor:"#f0f3f9",padding:"0 8px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    <svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="4" fill="#7A8499"></circle></svg>
                    <div className='font-12 color-474F5E'>{text}</div>
                </div>
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`
    
`