import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, message, Modal, Row, Select, Space } from "antd";
import styled from "styled-components";
import { set, values } from 'lodash';
import { useEffect, useState } from "react";
import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";


const { TextArea } = Input;

function ShippingDetailsCard() {

    const [form] = Form.useForm();

    // 备注弹窗
    const [remarkOpen,setRemarkOpen] = useState(false);
    const [remarkIndex,setRemarkIndex] = useState(0);
    const [text,setText] = useState("");

    const [courierList,setCourierList] = useState([]);

    const handleRemakeOk = ()=>{
        setRemarkOpen(false)
        const newData = form.getFieldsValue().shippings
        newData[remarkIndex] = {...newData[remarkIndex],remark:text}
        form.setFieldsValue({ shippings: newData })
        // form.getFieldValue(['users', field.name, 'firstName'])
    }

    const handleRemakeCancel = ()=>{
        setRemarkOpen(false)
    }

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    let addFormListItem:any;


    useEffect(()=>{
        let tempList = [];
        if(courierList.length==0){
            tempList = JSON.parse(sessionStorage["currency"]).map((item:any)=>{
                return {
                    value: item.courier_name,
                    label: item.courier_name
                }
            })
            setCourierList(tempList)
        }else{
            message.error("刷新")
        }

        // 
        form.setFieldsValue({shippings:[{
            time:"",
            // courier:"",
            HWB:"",
            remark:""
        }]
        })
    },[])

    return(
        <Scoped>
            <Card bordered={false} title="运输详细信息" extra={<span className="color-356DFF cursor-pointer" onClick={()=>{
                addFormListItem()
            }}>新增</span>}>
                <Form
                    form={form}
                    name="dynamic_form_nest_item"
                    layout={"vertical"}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.List name="shippings">
                    {(fields, { add, remove }) => (
                        <>
                            {/* 在表单外保存add函数的引用 */}
                            {addFormListItem = add}
                            {fields.map(({ key, name, ...restField }) => (
                                <div className="item_box">
                                    <div style={{flex:"1"}}>
                                        <Row gutter={[20,0]}>
                                            <Col span={8}>
                                                <Form.Item
                                                    name={[name,"time"]}
                                                    {...restField}
                                                    label={<div className="color-242833 font-w-600 font-16">预计配送日期</div>}
                                                    // rules={[{ required: true, message: 'Please input your name' }]}
                                                >
                                                    <DatePicker style={{width:"100%"}} onChange={()=>{
                                                        purchaseOrderStore.setShipments(form.getFieldsValue().shippings)
                                                    }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                            <Form.Item
                                                name={[name,"courier"]}
                                                {...restField}
                                                label={<div className="color-242833 font-w-600 font-16">运输承运商</div>}
                                                // rules={[{ required: true, message: 'Please input your name' }]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="选择运输承运商"
                                                    optionFilterProp="label"
                                                    options={courierList}
                                                    onChange={()=>{
                                                        purchaseOrderStore.setShipments(form.getFieldsValue().shippings)
                                                    }}
                                                />
                                            </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                            <Form.Item
                                                name={[name,"HWB"]}
                                                {...restField}
                                                label={<div className="color-242833 font-w-600 font-16">运单号</div>}
                                                // rules={[{ required: true, message: 'Please input your name' }]}
                                            >
                                            <Input onBlur={()=>{
                                                purchaseOrderStore.setShipments(form.getFieldsValue().shippings)
                                            }} placeholder="运单号" />
                                            </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{marginLeft:"10px"}}>
                                        <Form.Item
                                            name={[name,"remark"]}
                                            {...restField}
                                            label={<div className="color-242833 font-w-600 font-16">备注</div>}
                                        >
                                            <div onClick={() => {
                                                setRemarkIndex(key)
                                                // console.log(form.getFieldsValue().shippings[key].remark)
                                                setText(form.getFieldsValue().shippings[key]?.remark)
                                                setRemarkOpen(true)
                                            }} className="cursor-pointer"><EditOutlined className="font-20" /></div>
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                                {...restField}
                                                label={<div className="color-242833 font-w-600 font-16"></div>}
                                            >
                                                <MinusCircleOutlined className="font-20 color-FF0000" onClick={() => remove(name)} />
                                        </Form.Item>
                                    </div>
                                    
                                </div>
                            ))}
                        </>
                    )}
                    </Form.List>
                </Form>
            </Card>
            {/* 备注 */}
            <Modal title="备注" centered open={remarkOpen} onOk={handleRemakeOk} onCancel={handleRemakeCancel}>
                <div style={{marginBottom:"30px"}}>
                    <TextArea
                        showCount
                        maxLength={300}
                        value={text}
                        onChange={(value)=>{
                            setText(value.target.value)
                        }}
                        placeholder="disable resize"
                        style={{ height: 120, resize: 'none' }}
                    />
                </div>
            </Modal>
        </Scoped>
    )
}

export default ShippingDetailsCard;

const Scoped = styled.div`
    margin-top: 20px;

    .item_box{
        display: flex;
        align-items: center;
    }
`

