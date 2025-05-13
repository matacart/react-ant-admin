import { Col, Flex, Form, Input, Modal, Radio, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
export default function DefenseModal({adStatus,adData,setAdData}:{adStatus:string,adData:any,setAdData:(status:string,adId:string,adUrl:string)=>void}){

    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    // const [amazonRule,setAmazonRule]:any = useState('success')

    const submit = ()=>{
        // console.log(form.getFieldsValue());
        // props.data.setAdGroupId(form.getFieldsValue().defenseSort)
        setAdData(form.getFieldsValue().defenseStatus,form.getFieldsValue().adId,form.getFieldsValue().adUrl)
        setIsOpen(false);
    }

    useEffect(()=>{
        form.setFieldsValue({
            defenseSort:"0",
            defenseStatus:adStatus,
            adId:adData.ad_article_id,
            adUrl:adData.ad_article_url
        });
    },[adStatus])

    return(
        <>
            <a onClick={()=>{setIsOpen(true)}}>编辑</a>
            <Modal destroyOnClose width="650px" title="防护信息" centered open={isOpen} onOk={submit} okText="确认" onCancel={()=>{
                setIsOpen(false);
                // 初始化
                form.setFieldsValue({
                    defenseSort:"0",
                    defenseStatus:adStatus,
                    adId:adData.ad_article_id,
                    adUrl:adData.ad_article_url
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
                                            value={'0'}
                                            options={[
                                                { value: '0', label: '默认' },
                                                { value: '1', label: '一正' },
                                                { value: '3', label: '二防' },
                                                { value: '4', label: '三正' },
                                                { value: '5', label: '四防' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item name="defenseStatus" label={<span className="label">防护开关</span>}>
                                        <Select
                                            defaultValue={adStatus}
                                            options={[
                                                { value: '1', label: '启用' },
                                                { value: '0', label: '禁用' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Flex>
                            <Form.Item name="adId" label={<span className="label">投防ID</span>} 
                                // validateStatus={amazonRule}
                                // help={amazonRule == "success"?"":<span style={{ color: '#F86140' }}>请输入正确的链接格式</span>}
                            >
                                <Input onChange={(e)=>{
                                    // console.log(e.target.value)
                                    // 规则
                                    // setAmazonRule("error")
                                }} placeholder="投放的产品id" />
                            </Form.Item>
                            <Form.Item name="adUrl" label={<span className="label">投防URL</span>} 
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