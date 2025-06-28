import { Badge, Button, Card, Divider, Flex, Form, Input, Tag, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
import TagAutoComplete from "@/components/AutoComplete/TagAutoComplete";
import { useEffect, useMemo, useState } from "react";
import { CloseIcon } from "@/components/Icons/Icons";
import ManagementLabelModal from "./ManagementLabelModal";
import orderDraft from "@/store/order/orderDraft";

function OrderDraftLabel() {

    const [customerList,setCustomerList] = useState([]);

    const [tags,setTags] = useState<Array<{ label: string; value: string }>>([]);

    // 删除标签
    const removeTag = (value:any)=>{
        const newTags = tags.filter(tag => tag.value !== value);
        orderDraft.setOrderInfo({
            ...orderDraft.orderInfo,
            tags: newTags.map(tag => tag.value).join(",")
        });
    }

    useEffect(() => {
        const newTags = orderDraft.orderInfo.tags ? orderDraft.orderInfo.tags.trim().split(",").filter(tag => tag !== "").map(tag => ({
            label: tag,
            value: tag
        })) : [];
        setTags([...newTags]);
    }, [orderDraft.orderInfo.tags]);

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between" align="center" className='title font-16 font-w-600 color-242833'>
                    <div>订单标签</div>
                    <ManagementLabelModal />
                </Flex>
                <TagAutoComplete style={{width:"100%"}} options={customerList} placeholder="输入标签，按enter确认" onClick={(value)=>{
                     setTags(prevTags => {
                        const newTags = [...prevTags, { label: value, value: value }];
                        orderDraft.setOrderInfo({
                            ...orderDraft.orderInfo,
                            tags: newTags.map(tag => tag.value).join(",")
                        });
                        return newTags;
                    });
                }} />

                {/*  */}
                <div className="color-474F5E tags-warp">
                    {tags?.map((tag,index)=>(
                        // 使用 index 作为下标时 当删除中间项后，React 会复用后续组件实例，导致状态混乱
                        <Tag key={tag.value+Date.now()+index} color={"#e2f0ff"} className="tag" style={{color:"#474F5E"}} bordered={false} closeIcon={<CloseIcon style={{
                            lineHeight: 1,  // 关键属性
                            fontSize:"14px",
                            verticalAlign: '-0.15em' // 微调对齐
                        }}/>}
                            onClose={()=>removeTag(tag.value)}
                        >
                            <span>{tag.label}</span>
                        </Tag>
                    ))}
                </div>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
  .search-input-warp{
    margin:20px 0;
  }
  .tags-warp{
    /* gap: 8px; */
    .tag{
        margin-top:8px;
    }
  }
`

export default observer(OrderDraftLabel);