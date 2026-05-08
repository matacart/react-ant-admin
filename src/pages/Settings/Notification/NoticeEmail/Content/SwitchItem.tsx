import { settingType } from "@/store/settings/notification/noticeEmail"
import { Flex, Switch } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

function SwitchItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {

    const [value,setValue] = useState<boolean>(false);
                
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);

   
    return (
        <Scoped>
            <Flex align="center" justify="space-between">
                <div className="font-14 color-474F5E">{setting.label}</div>
                <Switch checked={value} onChange={(checked:boolean)=>{
                    setValue(checked);
                    setSections(setting.id, {value: checked});
                }} />
            </Flex>
        </Scoped>
    )
}

export default SwitchItem

const Scoped = styled.div`
    padding-bottom: 24px;
`
