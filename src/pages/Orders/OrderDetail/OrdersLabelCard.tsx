import { Card, Divider, Flex, Form, Input, Tag, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
import { useIntl } from "@umijs/max";
import ContactInformation from "./Modal/ContactInformation";
import TagAutoComplete from "@/components/AutoComplete/TagAutoComplete";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/Icons/Icons";
import ManagementLabelModal from "./Modal/ManagementLabelModal";
import { addOrderTag, removeOrderTag } from "@/services/y2/api";
import order from "@/store/order/order";

function OrdersLabelCard() {

    const intl = useIntl();

    const [customerList,setCustomerList] = useState([
        { label: '0001', value: '0001', email: 'john@example.com', tel: '123-456-7890' },
    ]);

    const [tags,setTags] = useState<Array<{ label: string; value: string }>>([]);

    // 添加标签
    const addTag = (value:string)=>{
        addOrderTag({
            orderId:order.orderInfo.order_id,
            tagName:value
        }).then(res=>{
            setTags([...tags,{
                label:value,
                value:value
            }])
        }).catch(error=>{

        })
    }
    // 删除标签
    const removeTag = async (value:any)=>{
        const prevTags = [...tags]; // 保存当前状态用于回滚
        await setTags(prevTags.filter(tag => tag.value !== value)); // 先乐观更新
        removeOrderTag({
            orderId:order.orderInfo.order_id,
            tagName:value
        }).then(res=>{
        }).catch(error=>{
            setTags(prevTags)
        })
    }

    useEffect(()=>{
        const newTags = order.orderInfo.tags?.map(item=>{
            return {
                label:item,
                value:item
            }
        })
        setTags(newTags ?? [])
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex style={{marginBottom:"16px"}} justify="space-between" align="center">
                    <div className="font-w-600 font-16">{intl.formatMessage({ id:'order.detail.orderlabel'})}</div>
                    <ManagementLabelModal />
                </Flex>
                <Form>
                    <TagAutoComplete style={{width:"100%"}} options={customerList} placeholder="输入标签，按enter确认" onClick={(value)=>{
                        if(tags.some(tag => tag.value === value)){

                        }else{
                            addTag(value)
                        }
                    }} />
                    {/*  */}
                    <div className="color-474F5E tags-warp">
                        {tags.map((tag,index)=>(
                            <Tag key={index} color={"#e2f0ff"} className="tag" style={{color:"#474F5E"}} bordered={false} closeIcon={<CloseIcon style={{
                                lineHeight: 1,  // 关键属性
                                fontSize:"14px",
                                verticalAlign: '-0.15em' // 微调对齐
                            }} />}
                            onClose={()=>removeTag(tag.value)}
                            >
                                <span>{tag.label}</span>
                            </Tag>
                        ))}
                    </div>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }

    .tags-warp{
    /* gap: 8px; */
        margin-top: 4px;
        .tag{
            margin-top:8px;
        }
    }
`

export default observer( OrdersLabelCard);