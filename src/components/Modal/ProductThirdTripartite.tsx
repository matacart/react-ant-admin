import { HolderOutlined } from "@ant-design/icons";
import { Col, Flex, Form, Input, message, Modal, Select, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DefaultButton from "../Button/DefaultButton";
import PrimaryButton from "../Button/PrimaryButton";

export default function ProductThirdTripartite(props:any) {

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

    const cancel = ()=>{
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

    // 使用 dnd-kit 替代 react-beautiful-dnd 的处理函数
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

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
            <Modal 
                width="666px" 
                title={<div style={{display:'flex'}}>
                    添加第三方平台
                    <div style={{marginLeft:"28px"}}>
                        {/* checkedChildren="开启" unCheckedChildren="关闭" */}
                        <Switch onChange={(e) => setTripartiteStatus(e)} checked={tripartiteStatus} />
                    </div>
                    {/* <Tooltip title="绑定第三方商品">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip> */}
                </div>}
                centered 
                open={isOpen}
                onCancel={cancel}
                footer={
                    <Flex justify="flex-end" gap={12}>
                        <PrimaryButton text="确认" onClick={submit} />
                        <DefaultButton text="取消" onClick={cancel} />
                    </Flex>
                } 
            >
                <Scoped>
                    <Form form={form} className="form">
                        <DndContext 
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext 
                                items={items.map(item => item.id)} 
                                strategy={verticalListSortingStrategy}
                            >
                                {items.map((item, index) => (
                                    <SortableItem 
                                        key={item.id} 
                                        id={item.id}
                                        item={item}
                                        form={form}
                                        setItems={setItems}
                                        items={items}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                        {/* <Form.Item label="绑定状态" name="status">
                        </Form.Item> */}
                    </Form>
                </Scoped>
            </Modal>
        </>
    )
}

// 创建可排序项组件
const SortableItem = ({ id, item, form, setItems, items }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <div className="item-first">
                <Flex justify='space-between'>
                    <Col span={1}>
                        <HolderOutlined 
                            {...listeners} 
                            style={{fontSize:"20px", marginRight:"6px", marginTop:"5px", cursor: 'grab'}} 
                        />
                    </Col>
                    <Col span={18}>
                        <Form.Item 
                            name={item.title} 
                            label={<span className="label">{item.title}</span>} 
                            rules={[
                                { pattern: /^(http|https):\/\/[^\s]+$/, message: '请输入正确的链接格式'}
                            ]}
                        >
                            <Input 
                                onChange={(e) => {
                                    const newItems = items.map((res: any) => {
                                        if (res.id === item.id) {
                                            return { ...res, url: e.target.value };
                                        }
                                        return res;
                                    })
                                    setItems(newItems)
                                }} 
                                placeholder="请带上http://或https://，并完整填写地址" 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{textAlign:"center"}}>
                        <Switch 
                            checked={item.status=="1"?true:false} 
                            onChange={(e) => {
                                const newItems = items.map((res: any) => {
                                    if (res.id === item.id) {
                                        return { ...res, status: e ? '1' : '0' };
                                    }
                                    return res;
                                })
                                setItems(newItems)
                            }} 
                            style={{marginTop:"5px"}}
                        >
                        </Switch>
                    </Col>
                </Flex>
            </div>
        </div>
    );
};

const Scoped = styled.div`

/* height: 500px; */
/* overflow-y: scroll; */
.form{
    margin: 20px 0;
    border-top:1px solid #e8e8e8;
}
.item-first{
    padding-top: 20px;
    border-bottom: 1px solid #e8e8e8;
    .label{
        width: 60px;
    }
}

`