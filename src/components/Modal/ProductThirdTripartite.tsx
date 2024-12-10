import newStore from "@/store/newStore";
import { Col, Flex, Form, Input, Modal, Radio, Select, Switch } from "antd";
import e from "express";
import { set } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
export default function ProductThirdTripartite() {

    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();


    const [amazonRule,setAmazonRule]:any = useState('success')

    const submit = ()=>{
        console.log(form.getFieldsValue());
        newStore.setThirdPartyPlatform(form.getFieldsValue());
        setIsOpen(false);
    }

    useEffect(()=>{
        form.setFieldsValue(newStore.thirdPartyPlatform);
    },[])

    return(
        <>
            <a onClick={()=>{setIsOpen(true)}}>管理</a>
            <Modal width="650px" title="添加第三方平台" centered open={isOpen} onOk={submit} okText="确认" onCancel={()=>{
                setIsOpen(false);
                // 初始化
                form.setFieldsValue(newStore.thirdPartyPlatform);
                setAmazonRule("success")
            }}>
                <Scoped>
                    <Form
                        form={form}
                        name="control-hooks"
                        // onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        >
                        <div className="item-first">
                            <Form.Item name="amazonUrl" label={<span className="label">Amazon链接</span>} 
                                validateStatus={amazonRule}
                                help={amazonRule == "success"?"":<span style={{ color: '#F86140' }}>请输入正确的链接格式</span>}
                            >
                                <Input onChange={(e)=>{
                                    console.log(e.target.value)
                                    // 规则
                                    setAmazonRule("error")
                                }} placeholder="请带上http://或https://，并完整填写地址" />
                            </Form.Item>
                            <Flex justify='space-between'>
                                <Col span={11}>
                                    <Form.Item name="amazonSort" label={<span className="label">Amazon排序</span>}>
                                        <Select
                                            defaultValue={'0'}
                                            options={[
                                                { value: '1', label: '置顶' },
                                                { value: '0', label: '默认' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item name="amazonStatus" label={<span className="label">Amazon状态</span>}>
                                        <Select
                                            defaultValue={'0'}
                                            options={[
                                                { value: '1', label: '启用' },
                                                { value: '0', label: '禁用' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Flex>
                        </div>
                        <div className="item-first">
                            <Form.Item name="eBayUrl" label={<span className="label">eBay链接</span>}>
                                <Input placeholder="请带上http://或https://，并完整填写地址" />
                            </Form.Item>
                            <Flex justify='space-between'>
                                <Col span={11}>
                                    <Form.Item name="eBaySort" label={<span className="label">eBay排序</span>}>
                                        <Select
                                            defaultValue={'0'}
                                            options={[
                                                { value: '1', label: '置顶' },
                                                { value: '0', label: '默认' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item name="eBayStatus" label={<span className="label">eBay状态</span>}>
                                        <Select
                                            defaultValue="0"
                                            options={[
                                                { value: '1', label: '启用' },
                                                { value: '0', label: '禁用' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Flex>
                        </div>
                        <div className="item-first">
                            <Form.Item name="tmallUrl" label={<span className="label">Tmall链接</span>}>
                                <Input placeholder="请带上http://或https://，并完整填写地址" />
                            </Form.Item>
                            <Flex justify='space-between'>
                                <Col span={11}>
                                    <Form.Item name="tmallSort" label={<span className="label">Tmall排序</span>}>
                                        <Select
                                            defaultValue={'0'}
                                            options={[
                                                { value: '1', label: '置顶' },
                                                { value: '0', label: '默认' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item name="tmallStatus" label={<span className="label">Tmall状态</span>}>
                                        <Select
                                            defaultValue="0"
                                            options={[
                                                { value: '1', label: '启用' },
                                                { value: '0', label: '禁用' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Flex>
                        </div>
                        <div className="item-first">
                            <Form.Item name="aliExpressUrl" label={<span className="label">AliExpress链接</span>}>
                                <Input placeholder="请带上http://或https://，并完整填写地址" />
                            </Form.Item>
                            <Flex justify='space-between'>
                                <Col span={11}>
                                    <Form.Item name="aliExpressSort" label={<span className="label">AliExpress链接</span>}>
                                        <Select
                                            defaultValue={'0'}
                                            options={[
                                                { value: '1', label: '置顶' },
                                                { value: '0', label: '默认' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item name="aliExpressStatus" label={<span className="label">AliExpress状态</span>}>
                                        <Select
                                            defaultValue="0"
                                            options={[
                                                { value: '1', label: '启用' },
                                                { value: '0', label: '禁用' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Flex>
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
    border-bottom: 1px solid #e8e8e8;
    .label{
        width: 90px;
    }
}

`