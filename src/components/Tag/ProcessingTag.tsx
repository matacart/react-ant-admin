import { Tag } from "antd"

export default function ProcessingTag({text}:{text:string}){
    return(
        <Tag color="processing" style={{borderRadius:"9999px",backgroundColor:"#E2F0FF",padding:"0 8px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                <div style={{height:"4px",width:"4px",backgroundColor: "#356DFF",borderRadius:"50%"}}></div>
                <div className='font-12 color-474F5E font-w-500'>{text}</div>
            </div>
        </Tag>
    )
}