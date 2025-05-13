import { Badge, Button, Card, Divider, Flex, Form, Input, Tag, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
import { useIntl } from "@umijs/max";
import TagAutoComplete from "@/components/AutoComplete/TagAutoComplete";
import { useState } from "react";
import { CloseIcon } from "@/components/Icons/Icons";
import ManagementLabelModal from "./ManagementLabelModal";

function OrderDraftLabel() {
    const intl = useIntl();

    const [customerList,setCustomerList] = useState([
        { label: 'John', value: 'John', email: 'john@example.com', tel: '123-456-7890' },
        { label: 'John1', value: 'John1', email: 'john@example.com', tel: '123-456-7890' },
        { label: 'John2', value: 'John2', email: 'john@example.com', tel: '123-456-7890' },
        { label: 'John3', value: 'John3', email: 'john@example.com', tel: '123-456-7890' },
    ]);

    const [tags,setTags] = useState<Array<{ label: string; value: string }>>([]);

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between" align="center" className='title font-16 font-w-600 color-242833'>
                    <div>订单标签</div>
                    <ManagementLabelModal />
                </Flex>
                {/* <div className='title font-16 font-w-600 color-242833'>订单标签</div> */}
                <TagAutoComplete style={{width:"100%"}} options={customerList} placeholder="输入标签，按enter确认" onClick={(value)=>{
                    console.log(value)
                    setTags([...tags,{
                        label:value,
                        value:value
                    }])
                }} />

                {/*  */}
                <div className="color-474F5E tags-warp">
                    {tags.map((tag,index)=>(
                        <Tag key={index} color={"#e2f0ff"} className="tag" style={{color:"#474F5E"}} bordered={false} closeIcon={<CloseIcon style={{
                            lineHeight: 1,  // 关键属性
                            fontSize:"14px",
                            verticalAlign: '-0.15em' // 微调对齐
                        }} />}>
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