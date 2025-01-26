import { Tag } from "antd"
import styled from "styled-components"


export default function ErrorTag({text}:{text:string}){
    return(
        <Scoped>
            <Tag color="error" style={{borderRadius:"9999px",backgroundColor:"#FFEBE7",padding:"0 8px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    <div style={{height:"4px",width:"4px",backgroundColor: "#F86140",borderRadius:"50%"}}></div>
                    <div className='font-12 color-474F5E'>{text}</div>
                </div>
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`

`