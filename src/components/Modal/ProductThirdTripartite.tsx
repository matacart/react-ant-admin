import { HolderOutlined } from "@ant-design/icons";
import { Col, Flex, Form, Input, message, Modal, Select, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function ProductThirdTripartite(props:any) {
    // console.log(props)

    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    // 总状态
    const [tripartiteStatus, setTripartiteStatus] = useState(false);
    
    const submit = ()=>{

        // 验证
        form.validateFields().then((values) => {
            let newDiversion = {...props.diversion,status:tripartiteStatus}
            items.forEach((item,index)=>{
                item.sort = index
                switch (item.id) {
                    case '0':
                        newDiversion.url_amazon = item.url
                        newDiversion.sort_amazon = index
                        newDiversion.status_amazon = item.status
                        break;
                    case '1':
                        newDiversion.url_ebay = item.url
                        newDiversion.sort_ebay = index
                        newDiversion.status_ebay = item.status
                        break;
                    case '2':
                        newDiversion.url_tmall = item.url
                        newDiversion.sort_tmall = index
                        newDiversion.status_tmall = item.status
                        break;
                    case '3':
                        newDiversion.url_aliexpress = item.url
                        newDiversion.sort_aliexpress = index
                        newDiversion.status_aliexpress = item.status
                        break;
                    case '4':
                        newDiversion.url_whatsapp = item.url
                        newDiversion.sort_whatsapp = index
                        newDiversion.status_whatsapp = item.status
                        break;
                }
            })
            props.setDiversion(newDiversion)
            setIsOpen(false);
        }).catch(errorInfo => {
            console.log(errorInfo);
            // 验证失败，不执行提交逻辑
            // 可以在这里显示错误信息给用户
            message.error("请输入正确的链接格式");
        });;
    }
    
    const [items, setItems] = useState([
        {
            id: '0',
            title: "Amazon",
            url: props.diversion.url_amazon,
            sort: props.diversion.sort_amazon,
            status: props.diversion.status_amazon,
        },
        {
            id: '1',
            title: "eBay",
            url: props.diversion.url_ebay,
            sort: props.diversion.sort_ebay,
            status: props.diversion.status_ebay,
        },
        {
            id: '2',
            title: "tmall",
            url: props.diversion.url_tmall,
            sort: props.diversion.sort_tmall,
            status: props.diversion.status_tmall,
        },
        {
            id: '3',
            title: "aliExpress",
            url: props.diversion.url_aliexpress,
            sort: props.diversion.sort_aliexpress,
            status: props.diversion.status_aliexpress,
        },
        {
            id: '4',
            title: "whatsapp",
            url: props.diversion.url_whatsapp,
            sort: props.diversion.sort_whatsapp,
            status: props.diversion.status_whatsapp,
        },
    ]);

    useEffect(()=>{
        // 排序
        form.setFieldsValue({
            Amazon:props.diversion.url_amazon,
            eBay:props.diversion.url_ebay,
            tmall:props.diversion.url_tmall,
            aliExpress:props.diversion.url_aliexpress,
            whatsapp:props.diversion.url_whatsapp,
        })
        setItems(items.sort((a, b) => a.sort - b.sort))
        setTripartiteStatus(props.diversion.status == "1"?true:false)
    },[props.diversion])
    
    return(
        <>
            <a onClick={()=>{setIsOpen(true)}}>管理</a>
            <Modal width="666px" title={<div style={{display:'flex'}}>
                添加第三方平台
                <div style={{marginLeft:"28px"}}>
                    {/* <span style={{fontSize:"14px",marginRight:"12px"}}>绑定状态</span> */}
                    {/* checkedChildren="开启" unCheckedChildren="关闭" */}
                    <Switch onChange={(e) => setTripartiteStatus(e)} checked={tripartiteStatus} />
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
                            item.url = props.diversion.url_amazon
                            item.status = props.diversion.status_amazon
                            break;
                        case '1':
                            item.url = props.diversion.url_ebay
                            item.status = props.diversion.status_ebay
                            break;
                        case '2':
                            item.url = props.diversion.url_tmall
                            item.status = props.diversion.status_tmall
                            break;
                        case '3':
                            item.url = props.diversion.url_aliexpress
                            item.status = props.diversion.status_aliexpress
                            break;
                        case '4':
                            item.url = props.diversion.url_whatsapp
                            item.status = props.diversion.status_whatsapp
                            break;
                    }
                })
                form.setFieldsValue({
                    Amazon:props.diversion.url_amazon,
                    eBay:props.diversion.url_ebay,
                    tmall:props.diversion.url_tmall,
                    aliExpress:props.diversion.url_aliexpress,
                    whatsapp:props.diversion.url_whatsapp,
                })
                setTripartiteStatus(props.diversion.status == "1"?true:false)
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