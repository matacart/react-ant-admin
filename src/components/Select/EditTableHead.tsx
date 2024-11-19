import { Button } from "antd";
import Drawer from "../Drawer/Drawer";
import { useState } from "react";





// 
export default function EditTableHead(){
    
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    // const onClose = () => {
    //     setOpen(false);
    // };
    
    return (
        <div>
            <Button onClick={()=>{setOpen(true)}} size="large">编辑表头</Button>
            <Drawer title='编辑表头' open={open} onClose={()=>{
                setOpen(false);
            }}>
                <div>请至少保留 2 个表头项，暂不支持编辑操作栏</div>
                
            </Drawer>
        </div>
    )
}