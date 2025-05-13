import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton"
import { AddIcon, EditIcon } from "@/components/Icons/Icons";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { getAddonsConfigCreditCard, getCurrenciesList, setAddonsConfigs } from "@/services/y2/api";
import generalFreight from "@/store/settings/ShippingAndDistribution/generalFreight";
import { transformConfig } from "@/utils/dataStructure";
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, ConfigProvider, Divider, Flex, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Space, Spin, Tooltip } from "antd"
import { values } from "lodash";
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

interface DataType {
    languages_id: string;
    addons_config_id: string;
    status: string;
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function EditFreightModal({record}:{record:any}){

    const [formFreight] = Form.useForm();

    const [isLoading,setIsLoading] = useState(false)

    const [open,setOpen] = useState(false)

    const [billingMethod,setBillingMethod] = useState(1)
    const submit = async ()=>{
            // 同时验证两个表单
        formFreight.validateFields().then((res=>{
            console.log('完整表单数据:', res);
            let temp = {
                ...record,
                id:record.addons_config_id,
                title: res.freightName,
                summary: res.instructions??"",
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
            setAddonsConfigs(temp).then(res=>{
                let newData = generalFreight.deliverys.map((item:DataType) => {
                    if (item.addons_config_id === temp.addons_config_id) {
                        return {
                            ...item,
                            addons_config_title:temp.title,
                            summary:temp.summary
                        };
                    }
                    return item;
                })
                generalFreight.setDeliverys(newData)
                message.success("成功")
                setOpen(false)
            }).catch(err=>{
                message.error("失败")
            })
        }))
    }
   
    const options = JSON.parse(sessionStorage.getItem("country") || "[]").map(item=>{
        return {
            label:item.country_name,
            value:item.iso_code_2,
        }
    })

    const fetch = ()=>{
        setIsLoading(true)
        getAddonsConfigCreditCard(record.addons_config_id,record.addons_id,record.languages_id).then(res=>{
            const config:any = JSON.parse(res.data.addon_config.config || "[]")
            const settings:any = []
            let ruleList:any = []
            for(let i=1;i<=8;i++){
                if(config[`MODULE_SHIPPING_FREESHIPPER_COUNTRIES_${i}`]){
                    const rule = config[`MODULE_SHIPPING_FREESHIPPER_COST_${i}`].split(",")
                    settings.push({
                        countries:config[`MODULE_SHIPPING_FREESHIPPER_COUNTRIES_${i}`].split(","),  // 国家选择字段
                        handlingCharge:config[`MODULE_SHIPPING_FREESHIPPER_HANDLING_${i}`],
                        rules: rule.reduce((acc, item) => {
                            const [currentMax, value] = item.split(":");
                            acc.result.push({
                                min: acc.prevMin,
                                max: currentMax,
                                value: value
                            });
                            acc.prevMin = currentMax; // 关键修改点
                            return acc;
                        },{ result: [] as any[], prevMin: "0" }).result
                    })
                }
            }
            formFreight.setFieldsValue({
                freightName:res.data.addon_config.title,
                instructions:res.data.addon_config.summary,
                settings:settings,
                billingMethod:config.MODULE_SHIPPING_FREESHIPPER_METHOD
            })
            setBillingMethod(parseInt(config.MODULE_SHIPPING_FREESHIPPER_METHOD))
            // settings[`config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_${i}]`] = config[`MODULE_SHIPPING_FREESHIPPER_COUNTRIES_${i}`]
        }).catch(err=>{
            console.log(err)
            message.error("请求失败")
            setOpen(false)
        }).finally(()=>{
            setIsLoading(false)
        })
    }


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
            <div onClick={()=>{
                fetch()
                setOpen(true)
            }}><EditIcon className="font-20 cursor-pointer" /></div>
            {/*  */}
            <Modal open={open} title="编辑运费" centered width={1000} okText="保存" onCancel={()=>{
                setOpen(false)
                // formFreight.resetFields()
            }} onOk={submit}>
                <Spin spinning={isLoading}>
                    <ScopedForm>
                        {/*  */}
                        <MyForm layout="vertical" form={formFreight} initialValues={{
                            freightName:record.addons_config_title,
                            instructions:record.summary,
                            settings:[
                                {
                                    countries: ['CN'],  // 国家选择字段
                                    rules: [
                                        {
                                            min:0,
                                            max:5,
                                            value:5
                                        }
                                    ]          // 运费规则字段
                                },
                            ]
                        }}>
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
                                        <DefaultSelect value={billingMethod} onChange={(e)=>{
                                            setBillingMethod(e)
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
                                    {/* <Flex className="setting-title" justify="space-between">
                                        <div className="font-w-600">
                                            收货地址
                                            <Tooltip title="配置不同收货地址的计费方式。">
                                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                                    <QuestionCircleOutlined />
                                                </span>
                                            </Tooltip>
                                        </div>
                                        <div className="color-356DFF cursor-pointer" onClick={() => add()}>添加区域</div>
                                        <div className="color-F86140 cursor-pointer" onClick={()=>remove(index)}>删除区域</div>
                                    </Flex> */}
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
                                                        {fields.map(({ key, name, ...restField }) => {
                                                            console.log(fields)
                                                            // console.log(formFreight.getFieldValue("settings"))
                                                            return(
                                                                <Row gutter={[10,10]} className="mb-12">
                                                                    <Col span={10}>
                                                                        <Flex>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'min']}
                                                                                rules={[{ required: true, message: '请输入区间' }]}
                                                                            >
                                                                                <InputNumber<number> value={0} disabled style={{width:"100%"}}/>
                                                                            </Form.Item>
                                                                            <Flex align="center" style={{margin:"0 5px",fontSize:"16px"}}>-</Flex>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'max']}
                                                                                rules={[{ required: true, message: '请输入区间' }]}
                                                                            >
                                                                                <InputNumber<number> style={{width:"100%"}}/>
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
                                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                                        </Flex>}
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })}
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
                                                                <Button onClick={() => add()} className="default-btn" icon={<AddIcon className="font-16" />}>
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
    }import { join } from 'path';
import { load } from 'react-cookies';
import { rule } from '@/services/ant-design-pro/api';

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