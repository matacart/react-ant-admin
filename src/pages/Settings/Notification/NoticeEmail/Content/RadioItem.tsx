import { settingType } from "@/store/settings/notification/noticeEmail";
import { useIntl } from "@umijs/max";
import { Flex, Radio } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

function RadioItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {


    const intl = useIntl();

    const [value,setValue] = useState();
                 
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);

    
    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            <Radio.Group value={value} options={[{
                label:intl.formatMessage({ id: 'settings.notification.noticeEmail.right.radioItem.black' }),
                value:'black'
            },{
                label:intl.formatMessage({ id: 'settings.notification.noticeEmail.right.radioItem.colour' }),
                value:'colour'
            }]} onChange={(e:any)=>{
                setValue(e.target.value);
                setSections(setting.id, {value: e.target.value});
            }} />
        </Scoped>
    )
}

export default RadioItem

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`
