import { RightIcon } from "@/components/Icons/Icons";
import { App, Button, Card, Flex, Switch } from "antd";
import styled from "styled-components";
import { history, useIntl } from "@umijs/max";
import { useState } from "react";
import { setCustomTemplateConfig } from "@/services/y2/api";

function Customer({orderList}:{orderList:any[]}) {

    const { message } = App.useApp();

    const intl = useIntl();
    
    const [list,setList] = useState(orderList);
    
    return (
        <Scoped>
            <Card title="客户" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
                {list.map(item=>{
                    return(
                        <Flex key={item.key} className="item" justify="space-between" align="center" onClick={()=>history.push(`/settings/noticeEmail/${item.key.toLowerCase()}`)}>
                            <div>
                                <div>{item.title}</div>
                                <div className="font-12 color-62708D">{item.content}</div>
                            </div>
                            <Flex align="center" gap={20} onClick={(e)=>{e.stopPropagation()}}>
                                {item.check !== undefined && <Switch checked={item.check} onChange={(checked)=>{
                                    setCustomTemplateConfig({
                                        languages_id:item.languages_id,
                                        config_key:item.key,
                                        config_value:checked,
                                    }).then(res=>{
                                        res.code == 0 && setList(list.map(i=>i.key == item.key ? {...i,check:checked} : i))
                                    }).catch(()=>{
                                        message.error(intl.formatMessage({ id: 'components.message.error' }))
                                    })
                                }} />}
                                <RightIcon className="font-20" />
                            </Flex>
                        </Flex>
                    )
                })}
            </Card>
        </Scoped>
    )
}

export default Customer

const Scoped = styled.div`
    .order-card{
        padding: 0;
        padding-bottom: 12px;
        .item{
            padding: 12px 24px;
            border-bottom: 1px solid #eef1f7;
        }
        .item:last-child{
            border-bottom: none;
        }
        .item:hover{
            cursor: pointer;
        }
    }
`
