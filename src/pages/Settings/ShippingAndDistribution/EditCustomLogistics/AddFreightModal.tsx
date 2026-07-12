import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton"
import { AddIcon } from "@/components/Icons/Icons";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { useSleep } from "@/hooks/customHooks";
import { getDeliveryList, setAddonsConfigs } from "@/services/y2/api";
import generalFreight from "@/store/settings/ShippingAndDistribution/generalFreight";
import { MinusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { App, Button, Col, ConfigProvider, Flex, Form, Input, InputNumber, Modal, Row, Select, Spin, Tooltip } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"

const { TextArea } = Input;


// 步骤1：在组件顶部定义类型
type FieldConfig = {
    label: string;
    name:string;
    type: 'input' | 'inputNumber' | 'currency';
    suffix?: string;
    colSpan?: number;
};

export default function AddFreightModal({type}:{type:string}){

    const { message } = App.useApp();

    const [formFreight] = Form.useForm();

    const [open,setOpen] = useState(false)

    const [btnLoading,setBtnLoading] = useState(false)

    const sleep = useSleep();

    const [billingMethod,setBillingMethod] = useState(1)
    const submit = async ()=>{
            // 同时验证两个表单
        formFreight.validateFields().then((res=>{
            let temp = {
                id:"",
                languages_id:generalFreight.deliverysLanguage,
                addons_id: 1589559,
                title: res.freightName,
                summary: res.instructions??"",
                description: "",
                is_sys: 0,
                remark: "",
                sort: 0,
                status:1,
                "config[MODULE_SHIPPING_FREESHIPPER_METHOD]": billingMethod,
                "config[MODULE_SHIPPING_FREESHIPPER_SORT_ORDER]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_SKIPPED]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_1]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COST_1]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_1]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_2]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COST_2]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_2]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_3]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COST_3]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_3]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_4]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COST_4]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_4]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_5]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COST_5]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_5]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_6]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COST_6]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_6]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_7]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COST_7]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_7]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_8]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_COST_8]": "", 
                "config[MODULE_SHIPPING_FREESHIPPER_HANDLING_8]": ""
            }
            res.settings?.forEach((item,index)=>{
                // console.log(item)
                const strList = item.rules?.map(items=>items.max+":"+items.value)
                temp = {
                    ...temp,
                    [`config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_${index+1}]`]:item.countries.join(","),
                    [`config[MODULE_SHIPPING_FREESHIPPER_COST_${index+1}]`]:strList.join(","),
                    [`config[MODULE_SHIPPING_FREESHIPPER_HANDLING_${index+1}]`]:item.handlingCharge
                    
                }
            })
            setBtnLoading(true)
            setAddonsConfigs(temp).then(async res=>{
                await sleep(2000)
                getDeliveryList(generalFreight.deliverysLanguage).then(res=>{
                    generalFreight.setDeliverys(res.data)
                }).catch(err=>{
                    message.error("刷新数据")
                }).finally(()=>{
                })
            }).catch(err=>{
                message.error("失败")
            }).finally(()=>{
                formFreight.resetFields()
                setBillingMethod(1)
                setOpen(false)
                setBtnLoading(false)
            })
        }))
    }
   
    const options = JSON.parse(localStorage.getItem("MC_DATA_COUNTRY") || "[]").map(item=>{
        return {
            label:item.country_name,
            value:item.iso_code_2,
        }
    })

    useEffect(()=>{
    },[])

    // 步骤2：在组件内部添加配置映射
    const billingConfig = {
        1: { // 价格
          title: '价格区间',
          unit: '元',
          fields: ['运费金额']
        },
        2: { // 数量
          title: '数量区间',
          unit: '件',
          fields: ['运费金额']
        },
        3: { // 重量
          title: '重量区间',
          unit: 'kg',
          fields: ['运费金额']
        }
    };

    return (
        <Scoped>
            {type == "default" && <DefaultButton text="添加运费" onClick={()=>setOpen(true)} />}
            {type == "primary" && <PrimaryButton text="添加运费" onClick={()=>setOpen(true)} />}
            <Modal open={open} title="添加运费" centered width={1000} okText="保存" onCancel={()=>{
                setOpen(false)
                formFreight.resetFields()
                setBillingMethod(1)
            }} footer={
                (_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end" gap={8}>
                      <DefaultButton text="取消" onClick={()=>{
                        setOpen(false)
                        formFreight.resetFields()
                        setBillingMethod(1)
                      }} />
                      <PrimaryButton loading={btnLoading} text="保存" onClick={submit} />
                    </Flex>
                )
            }>
                <Spin spinning={btnLoading}>
                    <ScopedForm>
                        {/*  */}
                        <MyForm layout="vertical" form={formFreight} initialValues={{freightName:"",instructions:"",country:['🇨🇳']}}>
                            <Form.Item className="mb-20" name="freightName" label={<div>运费名称（客户选择物流方案时展示）</div>} 
                                rules={[{ required: true, message: '请填写运费名称' }]}
                            >
                                <Input placeholder="请输入运费" />
                            </Form.Item>
                            <Form.Item className="mb-20" label="补充说明" name="instructions">
                                <TextArea
                                    placeholder="补充说明物流时效，送货注意事项等信息（可选，如有填写，将在无运费合并时进行展示）"
                                    showCount
                                    maxLength={300}
                                    autoSize={{ minRows: 4, maxRows: 4 }}
                                />
                            </Form.Item>
                            {/* <Form.Item style={{marginBottom:"4px"}} label={false} name="delivery" valuePropName="checked" initialValue={false}>
                                <Checkbox>支持货到付款</Checkbox>
                            </Form.Item> */}
                            <Flex align="center" className="mb-12">
                                <div className="font-w-600">计费方式：</div>
                                <Flex gap={8}>
                                    <Form.Item label={false}>
                                        <DefaultSelect style={{width:"120px"}} value={billingMethod} onChange={(e)=>{
                                            setBillingMethod(e)
                                            console.log(e)
                                        }} options={[
                                            {
                                                label:"价格",
                                                value:1,
                                            },
                                            {
                                                label:"数量",
                                                value:2,
                                            },
                                            {
                                                label:"重量",
                                                value:3,
                                            }
                                        ]} />
                                    </Form.Item>
                                </Flex>
                            </Flex>
                            {/*  */}
                            <Form.List
                                name="settings"
                                rules={[
                                ]}
                                initialValue={[{
                                    countries: ['CN'],  // 国家选择字段
                                    rules: [
                                        {
                                            min:0,
                                            max:5,
                                            value:5
                                        }
                                    ]          // 运费规则字段
                                }]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <div className="setting-item">
                                            <Flex justify="space-between" className="mb-12">
                                                <Flex align="center" style={{flex:1}}>
                                                    配送至：
                                                    <Form.Item style={{width:"350px"}} initialValue={['CN']}  name={[field.name, 'countries']} label={false} >
                                                        <Select
                                                            mode="multiple"
                                                            placeholder="选择区域"
                                                            options={options}
                                                        />
                                                    </Form.Item>
                                                </Flex>
                                                <Flex gap={8}>
                                                    <div className="color-356DFF cursor-pointer" onClick={() => add()}>添加</div>
                                                    <div className="color-F86140 cursor-pointer" onClick={()=>remove(index)}>删除</div>
                                                </Flex>
                                            </Flex>
                                            <Flex className="mb-12">
                                                <Flex align="center" style={{flex:1}}>
                                                    手续费：
                                                    <Form.Item style={{width:"350px"}} initialValue={""}  name={[field.name, 'handlingCharge']} label={false} >
                                                        <Input placeholder="请输入" />
                                                    </Form.Item>
                                                </Flex>
                                            </Flex>
                                            {/*  */}
                                            <Row className="mb-8" gutter={[10,10]}>
                                                <Col span={10}>
                                                    {billingConfig[billingMethod].title}
                                                    <Tooltip title="提醒：区间范围遵循“左闭右开”规则， 例：0-5件，代表0≤X<5件。">
                                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                                            <QuestionCircleOutlined />
                                                        </span>
                                                    </Tooltip>
                                                </Col>
                                                <Col span={6}>{billingConfig[billingMethod].fields[0]}</Col>
                                                <Col span={2}></Col>
                                            </Row>
                                            <Form.List name={[field.name, 'rules']} initialValue={[
                                                {
                                                    min:0,
                                                    max:5,
                                                    value:5
                                                }
                                            ]}>
                                                {(fields, { add, remove }) => {
                                                    return (
                                                        <>
                                                        {fields.map(({ key, name, ...restField }) => (
                                                            <Row gutter={[10,10]} className="mb-12">
                                                                <Col span={10}>
                                                                    <Flex>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'min']}
                                                                            rules={[{ required: true, message: '请输入区间' }]}
                                                                        >
                                                                            <InputNumber<number> disabled style={{width:"100%"}}/>
                                                                        </Form.Item>
                                                                        <Flex align="center" style={{margin:"0 5px",fontSize:"16px"}}>-</Flex>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'max']}
                                                                            rules={[
                                                                                { required: true, message: '请输入区间' },
                                                                                ({ getFieldValue }) => ({
                                                                                    validator(_, value) {
                                                                                      const minVal = getFieldValue(['settings', field.name, 'rules', name, 'min']);
                                                                                      if (value <= minVal) {
                                                                                        return Promise.reject('最大值必须大于最小值');
                                                                                      }
                                                                                      return Promise.resolve();
                                                                                    }
                                                                                })
                                                                            ]}
                                                                        >
                                                                            <InputNumber<number> onChange={(value)=>{
                                                                                // 步骤2：获取所有规则字段
                                                                                const allRules = formFreight.getFieldValue(['settings', field.name, 'rules']);
                                                                                if (name < allRules.length - 1) {
                                                                                    formFreight.setFieldValue(['settings', field.name, 'rules', name + 1, 'min'],value)
                                                                                }
                                                                            }} style={{width:"100%"}} />
                                                                        </Form.Item>
                                                                    </Flex>
                                                                </Col>
                                                                <Col span={6}>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, 'value']}
                                                                    rules={[{ required: true, message: '请输入金额' }]}
                                                                >
                                                                    <InputNumber<number> style={{width:"100%"}} />
                                                                </Form.Item>
                                                                </Col>
                                                                <Col span={2}>
                                                                    {fields.length > 1 && <Flex align="center" style={{height:"32px"}}>
                                                                        <MinusCircleOutlined onClick={() =>{
                                                                            remove(name)
                                                                            // 获取最新规则列表
                                                                            const currentRules = formFreight.getFieldValue(
                                                                                ['settings', field.name, 'rules']
                                                                            ) || [];
                                                                            // 更新后续区间的min值
                                                                            currentRules.forEach((_, idx) => {
                                                                                if (idx === 0) return; // 保持首区间不变
                                                                                formFreight.setFieldValue(['settings', field.name, 'rules', idx, 'min'],formFreight.getFieldValue(['settings', field.name, 'rules', idx - 1, 'max']))
                                                                            });
                                                                        }} />
                                                                    </Flex>}
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                        <Form.Item>
                                                            <ConfigProvider
                                                                theme={{
                                                                    components: {
                                                                        Button: {
                                                                            defaultActiveBorderColor:"#d7dbe7",
                                                                            defaultBorderColor:"#d7dbe7",
                                                                            defaultHoverBorderColor:"#d7dbe7",
                                                                            defaultHoverColor:"#474F5E",
                                                                            defaultActiveColor:"#474F5E",
                                                                            defaultHoverBg:"#f7f8fb",
                                                                            defaultActiveBg:"#f7f8fb",
                                                                            borderRadius:4
                                                                        },
                                                                    },
                                                                }}
                                                                >
                                                                <Button onClick={() => {
                                                                    const lastIndex = fields.length - 1;
                                                                    const lastMax = formFreight.getFieldValue([
                                                                      'settings',
                                                                      field.name,
                                                                      'rules',
                                                                      lastIndex,
                                                                      'max'
                                                                    ]);
                                                                    add({
                                                                        min: lastMax || 0,  // 自动继承前一个max值
                                                                        max: undefined,
                                                                        value: undefined
                                                                    })
                                                                }} className="default-btn" icon={<AddIcon className="font-16" />}>
                                                                    区间
                                                                </Button>
                                                            </ConfigProvider>
                                                        </Form.Item>
                                                        </>
                                                    )
                                                }}
                                            </Form.List>
                                        </div>
                                        
                                    ))}
                                </>
                                )}
                            </Form.List>
                            {/*  */}
                        </MyForm>
                    </ScopedForm>
                </Spin>
            </Modal>
        </Scoped>
    )

}

const Scoped = styled.div`
    
`
const ScopedForm = styled.div`
    overflow-y: auto;
    max-height: 620px;
    padding-right: 20px; // 新增右侧内边距
    margin-right: -20px; // 通过负边距保持原始布局宽度
    scrollbar-gutter: stable; // 确保滚动条出现时不影响布局
`
const MyForm = styled(Form)`
    .ant-form-item{
        margin-bottom: 0;
    }
    /* .full-width-label .ant-form-item-label label{
        width: 100%;
    } */
    .ant-form-item-required::before {
        display: none !important;
    }
    .setting-title{
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #d7dbe7;
    }
    .setting-item{
        margin-bottom: 12px;
        padding-top: 20px;
        border-top: 1px solid #d7dbe7;
    }
    .mb-20{
        margin-bottom: 20px;
    }
    .mb-12{
        margin-bottom: 12px;
    }
    .mb-8{
        margin-bottom: 8px;
    }
    .default-btn{
        /* margin-top:12px */
    }
`