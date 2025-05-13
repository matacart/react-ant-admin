import { Tag } from "antd"
import styled from "styled-components"


export default function MinDefaultTag({text}:{text:string}){
    return(
        <Scoped>
            <Tag color="default" style={{borderRadius:"9999px",backgroundColor:"#f0f3f9",padding:"0 10px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    {/* <div style={{height:"4px",width:"4px",backgroundColor: "#7a8499",borderRadius:"50%"}}></div> */}
                    <div className='font-12 color-474F5E'>{text}</div>
                </div>
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`
    
`