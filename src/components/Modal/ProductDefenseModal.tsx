import newStore from "@/store/newStore";
import { Col, Flex, Form, Input, Modal, Radio, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
export default function ProductDefenseModal(props:any) {

    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    // const [amazonRule,setAmazonRule]:any = useState('success')

    const submit = ()=>{
        // console.log(form.getFieldsValue());
        props.data.setAdGroupId(form.getFieldsValue().defenseSort)
        props.data.setAdWafStatus(form.getFieldsValue().defenseStatus)
        props.data.setAdProductId(form.getFieldsValue().productId)
        props.data.setAdProductUrl(form.getFieldsValue().productUrl)
        setIsOpen(false);
    }

    useEffect(()=>{
        form.setFieldsValue({
            defenseSort:props.data.adGroupId,
            defenseStatus:props.data.adWafStatus,
            productId:props.data.adProductId,
            productUrl:props.data.adProductUrl
        });
    },[props.status])

    return(
        <>
            <a onClick={()=>{setIsOpen(true)}}>编辑</a>
            <Modal destroyOnClose width="650px" title="防护信息" centered open={isOpen} onOk={submit} okText="确认" onCancel={()=>{
                setIsOpen(false);
                // 初始化
                form.setFieldsValue({
                    defenseSort:props.data.adGroupId,
                    defenseStatus:props.data.adWafStatus,
                    productId:props.data.adProductId,
                    productUrl:props.data.adProductUrl
                });
                // setAmazonRule("success")
            }}>
                <Scoped>
                    <Form
                        form={form}
                        name="control-hooks"
                        // onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        >
                        <div className="item-first">
                            <Flex justify='space-between'>
                                <Col span={11}>
                                    <Form.Item name="defenseSort" label={<span className="label">商品分组</span>}>
                                        <Select
                                            defaultValue={'0'}
                                            options={[
                                                { value: '0', label: '默认' },
                                                { value: '1', label: '一组' },
                                                { value: '3', label: '二组' },
                                                { value: '4', label: '三组' },
                                                { value: '5', label: '四组' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item name="defenseStatus" label={<span className="label">防护开关</span>}>
                                        <Select
                                            defaultValue={'1'}
                                            options={[
                                                { value: '1', label: '启用' },
                                                { value: '0', label: '禁用' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Flex>
                            <Form.Item name="productId" label={<span className="label">投品ID</span>} 
                                // validateStatus={amazonRule}
                                // help={amazonRule == "success"?"":<span style={{ color: '#F86140' }}>请输入正确的链接格式</span>}
                            >
                                <Input onChange={(e)=>{
                                    // console.log(e.target.value)
                                    // 规则
                                    // setAmazonRule("error")
                                }} placeholder="投放的产品id" />
                            </Form.Item>
                            <Form.Item name="productUrl" label={<span className="label">投品URL</span>} 
                                // validateStatus={amazonRule}
                                // help={amazonRule == "success"?"":<span style={{ color: '#F86140' }}>请输入正确的链接格式</span>}
                            >
                                <Input onChange={(e)=>{
                                    // console.log(e.target.value)
                                    // 规则
                                    // setAmazonRule("error")
                                }} placeholder="投放的产品url" />
                            </Form.Item>
                        </div>
                        <div style={{height:"10px"}}></div>
                    </Form>
                </Scoped>
            </Modal>
        </>
    )

}

const Scoped = styled.div`

.item-first:nth-child(1){
    padding-top: 20px;
    border-top: 1px solid #e8e8e8;
    margin: 20px 0;
    border-bottom: 1px solid #e8e8e8;
}
.item-first{
    /* padding-top: 20px; */
    margin: 20px 0;
    /* border-bottom: 1px solid #e8e8e8; */
    .label{
        width: 90px;
    }
}

`