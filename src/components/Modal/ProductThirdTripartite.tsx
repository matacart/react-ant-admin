import { HolderOutlined } from "@ant-design/icons";
import { Col, Flex, Form, Input, message, Modal, Select, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function ProductThirdTripartite(props:any) {
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    // 总状态
    const [tripartiteStatus, setTripartiteStatus] = useState(false);
    
    const submit = ()=>{

        // 验证
        form.validateFields().then((values) => {
            props.product.setThirdPartyPlatform({
                ...props.product.thirdPartyPlatform,
                status: tripartiteStatus ? "1" : "0",
            })
            items.forEach((item,index)=>{
                item.sort = index
                switch (item.id) {
                    case '0':
                        props.product.setThirdPartyPlatform({
                            ...props.product.thirdPartyPlatform,
                            amazonUrl: item.url,
                            amazonSort: index,
                            amazonStatus: item.status,
                        })
                        break;
                    case '1':
                        props.product.setThirdPartyPlatform({
                            ...props.product.thirdPartyPlatform,
                            eBayUrl: item.url,
                            eBaySort: index,
                            eBayStatus: item.status,
                        })
                        break;
                    case '2':
                        props.product.setThirdPartyPlatform({
                            ...props.product.thirdPartyPlatform,
                            tmallUrl: item.url,
                            tmallSort: index,
                            tmallStatus: item.status,
                        })
                        break;
                    case '3':
                        props.product.setThirdPartyPlatform({
                            ...props.product.thirdPartyPlatform,
                            aliExpressUrl: item.url,
                            aliExpressSort: index,
                            aliExpressStatus: item.status,
                        })
                        break;
                    case '4':
                        props.product.setThirdPartyPlatform({
                            ...props.product.thirdPartyPlatform,
                            whatsappUrl: item.url,
                            whatsappSort: index,
                            whatsappStatus: item.status,
                        })
                        break;
                }
            })
            setIsOpen(false);
        }).catch(errorInfo => {
            // 验证失败，不执行提交逻辑
            // 可以在这里显示错误信息给用户
            message.error("请输入正确的链接格式");
        });;
    }
    
    const [items, setItems] = useState([
        {
            id: '0',
            title: "Amazon",
            url: props.product.thirdPartyPlatform.amazonUrl,
            sort: props.product.thirdPartyPlatform.amazonSort,
            status: props.product.thirdPartyPlatform.amazonStatus,
        },
        {
            id: '1',
            title: "eBay",
            url: props.product.thirdPartyPlatform.eBayUrl,
            sort: props.product.thirdPartyPlatform.eBaySort,
            status: props.product.thirdPartyPlatform.eBayStatus,
        },
        {
            id: '2',
            title: "tmall",
            url: props.product.thirdPartyPlatform.tmallUrl,
            sort: props.product.thirdPartyPlatform.tmallSort,
            status: props.product.thirdPartyPlatform.tmallStatus,
        },
        {
            id: '3',
            title: "aliExpress",
            url: props.product.thirdPartyPlatform.aliExpressUrl,
            sort: props.product.thirdPartyPlatform.aliExpressSort,
            status: props.product.thirdPartyPlatform.aliExpressStatus,
        },
        {
            id: '4',
            title: "whatsapp",
            url: props.product.thirdPartyPlatform.whatsappUrl,
            sort: props.product.thirdPartyPlatform.whatsappSort,
            status: props.product.thirdPartyPlatform.whatsappStatus,
        },
    ]);

    useEffect(()=>{
        // 排序
        form.setFieldsValue({
            Amazon:props.product.thirdPartyPlatform.amazonUrl,
            eBay:props.product.thirdPartyPlatform.eBayUrl,
            tmall:props.product.thirdPartyPlatform.tmallUrl,
            aliExpress:props.product.thirdPartyPlatform.aliExpressUrl,
            whatsapp:props.product.thirdPartyPlatform.whatsappUrl,
        })
        setItems(items.sort((a, b) => a.sort - b.sort))
        setTripartiteStatus(props.product.thirdPartyPlatform.status == "1"?true:false)
    },[props.product.thirdPartyPlatform.status])
    
    return(
        <>
            <a onClick={()=>{setIsOpen(true)}}>管理</a>
            <Modal width="666px" title={<div style={{display:'flex'}}>
                添加第三方平台
                <div style={{marginLeft:"28px"}}>
                    {/* <span style={{fontSize:"14px",marginRight:"12px"}}>绑定状态</span> */}
                    {/* checkedChildren="开启" unCheckedChildren="关闭" */}
                    <Switch  onChange={(e) => setTripartiteStatus(e)} checked={tripartiteStatus} />
                </div>
                {/* <Tooltip title="绑定第三方商品">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />
                    </span>
                </Tooltip> */}
            </div>}
            centered open={isOpen} onOk={submit} okText="确认" onCancel={()=>{
                setIsOpen(false);
                // 初始化 --- 待优化
                items.forEach((item,index)=>{
                    switch (item.id) {
                        case '0':
                            item.url = props.product.thirdPartyPlatform.amazonUrl
                            item.status = props.product.thirdPartyPlatform.amazonStatus
                            break;
                        case '1':
                            item.url = props.product.thirdPartyPlatform.eBayUrl
                            item.status = props.product.thirdPartyPlatform.eBayStatus
                            break;
                        case '2':
                            item.url = props.product.thirdPartyPlatform.tmallUrl
                            item.status = props.product.thirdPartyPlatform.tmallStatus
                            break;
                        case '3':
                            item.url = props.product.thirdPartyPlatform.aliExpressUrl
                            item.status = props.product.thirdPartyPlatform.aliExpressStatus
                            break;
                        case '4':
                            item.url = props.product.thirdPartyPlatform.whatsappUrl
                            item.status = props.product.thirdPartyPlatform.whatsappStatus
                            break;
                    }
                })
                form.setFieldsValue({
                    Amazon:props.product.thirdPartyPlatform.amazonUrl,
                    eBay:props.product.thirdPartyPlatform.eBayUrl,
                    tmall:props.product.thirdPartyPlatform.tmallUrl,
                    aliExpress:props.product.thirdPartyPlatform.aliExpressUrl,
                    whatsapp:props.product.thirdPartyPlatform.whatsappUrl,
                })
                setTripartiteStatus(props.product.thirdPartyPlatform.status == "1"?true:false)
                items.sort((a, b) => a.sort - b.sort)
            }}>
                <Scoped>
                    <Form form={form}>
                        <DragDropContext onDragEnd={(result)=>{
                            if (!result.destination) return;
                            const updatedItems = Array.from(items);
                            const [reorderedItem] = updatedItems.splice(result.source.index, 1);
                            updatedItems.splice(result.destination.index, 0, reorderedItem);
                            setItems(updatedItems);
                        }}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {items.map((item,index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps}
                                                {...provided.dragHandleProps} className="item-first">
                                                    <Flex justify='space-between'>
                                                        <Col span={1}>
                                                            <HolderOutlined style={{fontSize:"20px",marginRight:"6px",marginTop:"5px"}} />
                                                        </Col>
                                                        <Col span={18}>
                                                            <Form.Item name={item.title} label={<span className="label">{item.title}</span>} rules={[
                                                                { pattern: /^(http|https):\/\/[^\s]+$/, message: '请输入正确的链接格式'}
                                                            ]}>
                                                                <Input onChange={(e)=>{
                                                                    const newItems = items.map((res) => {
                                                                        if (res.id === item.id) {
                                                                            return { ...res, url: e.target.value };
                                                                        }
                                                                        return res;
                                                                    })
                                                                    setItems(newItems)
                                                                }} placeholder="请带上http://或https://，并完整填写地址" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4} style={{textAlign:"center"}}>
                                                            <Switch checked={item.status=="1"?true:false} onChange={(e)=>{
                                                                const newItems = items.map((res) => {
                                                                    if (res.id === item.id) {
                                                                        return { ...res, status: e ? '1' : '0' };
                                                                    }
                                                                    return res;
                                                                })
                                                                setItems(newItems)
                                                            }} style={{marginTop:"5px"}}></Switch>
                                                        </Col>
                                                    </Flex>
                                                </div>
                                            )}
                                        </Draggable>
                                        )
                                    )}
                                    {provided.placeholder}
                                </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {/* <Form.Item label="绑定状态" name="status">
                        </Form.Item> */}
                        <div style={{height:"10px"}}></div>
                    </Form>
                </Scoped>
            </Modal>
        </>
    )
}

const Scoped = styled.div`

/* height: 500px; */
/* overflow-y: scroll; */

.item-first:nth-child(1){
    padding-top: 20px;
    border-top: 1px solid #e8e8e8;
    margin: 20px 0;
    /* border-bottom: 1px solid #e8e8e8; */
}
.item-first{
    /* padding-top: 20px; */
    margin: 20px 0;
    border-bottom: 1px solid #e8e8e8;
    .label{
        width: 60px;
    }
}

`