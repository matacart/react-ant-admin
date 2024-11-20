import { Button } from "antd";
import Drawer from "../Drawer/Drawer";
import { useState } from "react";
// 
export default function SEOEdit(){
    
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    // const onClose = () => {
    //     setOpen(false);
    // };
    
    return (
        <div>
            <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>{setOpen(true)}}>编辑</span>
            <Drawer title='搜索引擎优化' open={open} onClose={()=>{
                setOpen(false);
            }}>
                <div>预览</div>
                
            </Drawer>
        </div>
    )
}