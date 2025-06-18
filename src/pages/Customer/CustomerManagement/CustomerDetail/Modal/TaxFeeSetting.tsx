import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { ReductionIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { setOrderIdNumber } from "@/services/y2/api";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Flex, Form, Input, Modal, Row, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function TaxFeeSetting(){

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [taxSetting,setTaxSetting] = useState("");

    const [allRegionalTax,setAllRegionalTax] = useState(false);

    const [loading,setLoading] = useState(false);

    const submit = ()=>{
        // 更新订单数据
    }

    const cancel = () => {
        setOpen(false);
    };

    return (
        <>
            <span className="cursor-pointer color-356DFF" onClick={() => setOpen(true)}>编辑</span>
            <MyModal title={<div>税费设置</div>} width={620} centered open={open} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" style={{margin:"20px 0 40px"}}>
                    <Form.Item label="税费设置" name="IDCard" rules={[
                    ]}>
                        <MySelect style={{height:"36px"}} onChange={(value:string)=>{
                            setTaxSetting(value)
                        }} options={[
                            {
                                label:"收税",
                                value:"0"
                            },
                            {
                                label:"不收税",
                                value:"1"
                            }
                        ]} />
                    </Form.Item>
                    {taxSetting == "1" && <>
                        <Checkbox value={allRegionalTax} onChange={(e)=>setAllRegionalTax(e.target.checked)} style={{marginTop:"32px",marginBottom:"16px"}}>对所有地区免税</Checkbox>
                        {!allRegionalTax && <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <>
                                        <Flex align="center" gap={12} className="mb-16">
                                            <div className="list-item">
                                                <Form.Item
                                                    label={<div>国家/地区</div>}
                                                    {...restField}
                                                    name={[name, 'first']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <MySelect style={{height:"36px"}} options={[
                                                        {
                                                            label:"收税",
                                                            value:"0"
                                                        },
                                                        {
                                                            label:"不收税",
                                                            value:"1"
                                                        }
                                                    ]} />
                                                </Form.Item>
                                            </div>
                                            <div className="list-item">
                                                <Form.Item
                                                    label={<div>州/省(可多选)</div>}
                                                    {...restField}
                                                    name={[name, 'first']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <MySelect style={{height:"36px"}} options={[
                                                        {
                                                            label:"收税",
                                                            value:"0"
                                                        },
                                                        {
                                                            label:"不收税",
                                                            value:"1"
                                                        }
                                                    ]} />
                                                </Form.Item>
                                            </div>
                                            <Flex style={{paddingTop:"28px"}}>
                                            {/* cursor-pointer */}
                                            {/* , */}
                                                <div className={`reduction-warp ${fields.length <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => fields.length > 1 && remove(name)}>
                                                    <ReductionIcon className="color-474F5E" />
                                                </div>
                                            </Flex>
                                        </Flex>
                                    </>
                                ))}
                                <Form.Item>
                                    <span className="cursor-pointer color-356DFF" onClick={() => add()}>添加免税区域</span>
                                </Form.Item>
                                </>
                            )}
                        </Form.List>}
                    </>}
                </Form>
            </MyModal>
        </>
    )
}


const MyModal = styled(Modal)`
    .ant-form-item{
        margin-bottom: 0;
    }
    .reduction-warp{
        width: 24px;
        height: 24px;
        background-color: #EEF1F6;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }
    .mb-16{
        margin-bottom: 16px;
    }
    .list-item{
        flex:1
    }
`



export default TaxFeeSetting