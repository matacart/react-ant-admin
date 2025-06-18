import { Card, Divider, Flex, Form, Input, Tag, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
import { useIntl } from "@umijs/max";
import TagAutoComplete from "@/components/AutoComplete/TagAutoComplete";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/Icons/Icons";
import ManagementLabelModal from "./ManagementLabelModal";

function Label() {

    const intl = useIntl();

    const [customerList,setCustomerList] = useState([
    ]);

    const [tags,setTags] = useState<Array<{ label: string; value: string }>>([]);

    useEffect(()=>{
       
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex style={{marginBottom:"16px"}} justify="space-between" align="center">
                    <div className="font-w-600 font-16">{"标签"}</div>
                    <ManagementLabelModal />
                </Flex>
                <Form>
                    <TagAutoComplete style={{width:"100%"}} options={customerList} placeholder="输入标签，按enter确认" onClick={(value)=>{
                        if(tags.some(tag => tag.value === value)){

                        }else{
                            // addTag(value)
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
                            onClose={()=>{}}
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

export default observer(Label);