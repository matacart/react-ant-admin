import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton"
import { AddIcon } from "@/components/Icons/Icons";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { getCurrenciesList, setAddonsConfigs } from "@/services/y2/api";
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, ConfigProvider, Divider, Flex, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Tooltip } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { title } from 'process';

const { TextArea } = Input;

interface currency{
    id:string,
    code:string,
    title:string
}

// 步骤1：在组件顶部定义类型
type FieldConfig = {
    label: string;
    name:string;
    type: 'input' | 'inputNumber' | 'currency';
    suffix?: string;
    colSpan?: number;
  };
  
  type ConditionConfig = {
    title: string;
    suffix?: string;
    description?: string;
    rows: {
      labels: string[];
      fields: FieldConfig[][];
    }[];
  };

export default function AddFreightModal(){

    const [form] = Form.useForm();

    const [formFreight] = Form.useForm();

    const [open,setOpen] = useState(false)

    const [billingMethod,setBillingMethod] = useState(1)

    const [isAddConditions,setIsAddConditions] = useState(false)

    const [weightUnit,setWeightUnit] = useState("kg")

    const [symbolLeft,setSymbolLeft] = useState("US$")
    
    const [currency,setCurrency] = useState("USD")

    const [currencyList,setCurrencyList] = useState([])

    const [conditions,setConditions] = useState(1)

    const submit = async ()=>{
        try{
             // 同时验证两个表单
            const [mainFormData, freightFormData] = await Promise.all([
                form.validateFields(),
                formFreight.validateFields()
            ]);

            console.log('完整表单数据:', mainFormData[`${billingMethod}_${conditions}_rules`]);
            console.log('完整表单数据:', freightFormData);
            let strArray
            if(mainFormData[`${billingMethod}_${conditions}_rules`]){
                strArray = mainFormData[`${billingMethod}_${conditions}_rules`]?.map(item=>{
                    return item.first+":"+item.firstCharge
                })
            }else{
                strArray = []
            }
            // console.log("：",strArray)

            let res = {
                id:"",
                languages_id: 2,
                addons_id: 1589559,
                title: freightFormData.freightName,
                summary: freightFormData.instructions??"",
                description: "",
                is_sys: 0,
                remark: "",
                sort: 0,
                status:1,
                "config[MODULE_SHIPPING_FREESHIPPER_METHOD]": billingMethod,
                "config[MODULE_SHIPPING_FREESHIPPER_SORT_ORDER]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_SKIPPED]": "",
                "config[MODULE_SHIPPING_FREESHIPPER_COUNTRIES_1]": freightFormData.country.join(","),
                "config[MODULE_SHIPPING_FREESHIPPER_COST_1]":strArray.join(","),
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
            // console.log("res：",res)
            // console.log(res)
            setAddonsConfigs(res).then(res=>{
                console.log("res：",res)
            })
        }catch(err){
            console.log(err)
        }
        
    }

    const options = [
        {
          label: 'China',
          value: '🇨🇳',
          desc: 'China (中国)',
        },
        {
          label: 'USA',
          value: '🇺🇸',
          desc: 'USA (美国)',
        },
        {
          label: 'Japan',
          value: '🇯🇵',
          desc: 'Japan (日本)',
        },
        {
          label: 'Korea',
          value: '🇰🇷',
          desc: 'Korea (韩国)',
        },
    ];


    useEffect(()=>{
        getCurrenciesList().then(res=>{
            // console.log(res.data)
            setCurrencyList(res.data.map(item=>{
                return {
                    value:item.code,
                    label:item.title,
                    symbol_left:item.symbol_left
                }
            }))
        })
    },[])

    // 步骤2：在组件内部添加配置映射
    const getConditionConfig = (
        billingMethod: number,
        conditions: number
    ): ConditionConfig => {
        const configMap: Record<number, Record<number, ConditionConfig>> = {
        1: { // 固定运费
            1: {
                title: '商品总价区间',
                rows: [{
                    labels: ['起始金额', '结束金额', '运费金额'],
                    fields: [
                        [{ type: 'currency', label: '起始金额',name:"start" }],
                        [{ type: 'currency', label: '结束金额',name:"start" }],
                        [{ type: 'currency', label: '运费金额',name:"start" }]
                    ]
                }]
            },
            2: {
                title: '按订单总价',
                rows: [{
                    labels: ['起始金额', '结束金额', '运费金额'],
                    fields: [
                        [{ type: 'currency', label: '起始金额',name:"start" }],
                        [{ type: 'currency', label: '结束金额',name:"start" }],
                        [{ type: 'currency', label: '运费金额',name:"start" }]
                    ]
                }]
            },
            3: {
                title: '按包裹重量',
                rows: [{
                    labels: ['起始金额', '结束金额', '运费金额'],
                    fields: [
                        [{ type: 'currency', label: '起始金额',name:"start" }],
                        [{ type: 'currency', label: '结束金额',name:"start" }],
                        [{ type: 'currency', label: '运费金额',name:"start" }]
                    ]
                }]
            },
            4: {
                title: '按商品件数',
                rows: [{
                    labels: ['起始金额', '结束金额', '运费金额'],
                    fields: [
                        [{ type: 'currency', label: '起始金额',name:"start" }],
                        [{ type: 'currency', label: '结束金额',name:"start" }],
                        [{ type: 'currency', label: '运费金额',name:"start" }]
                    ]
                }]
            },
        },
        2: { // 首续重
            1: {
                title: '按商品总价',
                rows: [{
                    labels: [ '首重', '首重费用', '续重', '续重费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首重', name:"first", suffix: weightUnit }],
                        [{ type: 'currency', label: '首重费用', name:"firstCharge",}],
                        [{ type: 'inputNumber', label: '续重', name:"continue", suffix: weightUnit }],
                        [{ type: 'currency', label: '续重费用', name:"continueCharge" }]
                    ]
                }]
            },
            2: {
                title: '按订单总价',
                rows: [{
                    labels: [ '首重', '首重费用', '续重', '续重费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首重', name:"first", suffix: weightUnit }],
                        [{ type: 'currency', label: '首重费用', name:"firstCharge",}],
                        [{ type: 'inputNumber', label: '续重', name:"continue", suffix: weightUnit }],
                        [{ type: 'currency', label: '续重费用', name:"continueCharge" }]
                    ]
                }]
            },
            3: {
                title: '按包裹重量',
                rows: [{
                    labels: [ '首重', '首重费用', '续重', '续重费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首重', name:"first", suffix: weightUnit }],
                        [{ type: 'currency', label: '首重费用', name:"firstCharge",}],
                        [{ type: 'inputNumber', label: '续重', name:"continue", suffix: weightUnit }],
                        [{ type: 'currency', label: '续重费用', name:"continueCharge" }]
                    ]
                }]
            },
            4: {
                title: '按商品件数',
                rows: [{
                    labels: [ '首重', '首重费用', '续重', '续重费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首重', name:"first", suffix: weightUnit }],
                        [{ type: 'currency', label: '首重费用', name:"firstCharge",}],
                        [{ type: 'inputNumber', label: '续重', name:"continue", suffix: weightUnit }],
                        [{ type: 'currency', label: '续重费用', name:"continueCharge" }]
                    ]
                }]
            },
        },
        3: { // 首续件
            1: {
                title: '按商品总价',
                rows: [{
                    labels: ['首件', '首件费用', '续件', '续件费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首件', name:"first", suffix: '件' }],
                        [{ type: 'currency', label: '首件费用', name:"firstCharge"}],
                        [{ type: 'inputNumber', label: '续件', name:"continue", suffix: '件' }],
                        [{ type: 'currency', label: '续件费用', name:"continueCharge"}]
                    ]
                }]
            },
            2: {
                title: '按订单总价',
                rows: [{
                    labels: ['首件', '首件费用', '续件', '续件费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首件', name:"first", suffix: '件' }],
                        [{ type: 'currency', label: '首件费用', name:"firstCharge"}],
                        [{ type: 'inputNumber', label: '续件', name:"continue", suffix: '件' }],
                        [{ type: 'currency', label: '续件费用', name:"continueCharge"}]
                    ]
                }]
            },
            3: {
                title: '按包裹重量',
                rows: [{
                    labels: ['首件', '首件费用', '续件', '续件费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首件', name:"first", suffix: '件' }],
                        [{ type: 'currency', label: '首件费用', name:"firstCharge"}],
                        [{ type: 'inputNumber', label: '续件', name:"continue", suffix: '件' }],
                        [{ type: 'currency', label: '续件费用', name:"continueCharge"}]
                    ]
                }]
            },
            4: {
                title: '按商品件数',
                rows: [{
                    labels: ['首件', '首件费用', '续件', '续件费用'],
                    fields: [
                        [{ type: 'inputNumber', label: '首件', name:"first", suffix: '件' }],
                        [{ type: 'currency', label: '首件费用', name:"firstCharge"}],
                        [{ type: 'inputNumber', label: '续件', name:"continue", suffix: '件' }],
                        [{ type: 'currency', label: '续件费用', name:"continueCharge"}]
                    ]
                }]
            }
        }
        };
    
        return configMap[billingMethod]?.[conditions] || { title: '', rows: [] };
    };

    // 动态表单行组件
    const DynamicFormRow = ({ name, restField, config, symbolLeft, weightUnit, onRemove }) => {
        // console.log(config);
        return (
            <div style={{marginBottom: 24 }}>
                <Row gutter={[10, 10]}>
                    {/* 金额区间输入 */}
                    <Col span={6}>
                        <Flex>
                            <Form.Item
                                {...restField}
                                name={[name, 'min']}
                                rules={[{ required: true, message: '请输入起始值' }]}
                            > 
                                {config.title == "按包裹重量" && <InputNumber suffix={weightUnit} style={{ width: '100%' }} />}
                                {config.title == "按商品件数" && <InputNumber suffix={"件"} style={{ width: '100%' }} />}
                                {(config.title == "按商品总价" || config.title == "按订单总价") && <InputNumber prefix={symbolLeft} style={{ width: '100%' }} />}
                            </Form.Item>
                            <span style={{ margin: '0 5px' }}>-</span>
                            <Form.Item
                                {...restField}
                                name={[name, 'max']}
                                rules={[{ required: true, message: '请输入结束值' }]}
                            >
                                {config.title == "按包裹重量" && <InputNumber suffix={weightUnit}  style={{ width: '100%' }} />}
                                {config.title == "按商品件数" && <InputNumber suffix={"件"}  style={{ width: '100%' }} />}
                                {(config.title == "按商品总价" || config.title == "按订单总价") && <InputNumber prefix={symbolLeft} style={{ width: '100%' }} />}
                            </Form.Item>
                        </Flex>
                    </Col>
                    {/* 动态字段渲染 */}
                    {config.rows[0].fields.map((fieldGroup, index) => (
                    <Col span={4} key={index}>
                        {fieldGroup.map((field, subIndex) => (
                        <Form.Item
                            {...restField}
                            key={subIndex}
                            name={[name, field.name]}
                            rules={[{ required: true, message: `${field.label}不能为空` }]}
                        >
                            {field.type === 'currency' ? (
                                <InputNumber prefix={symbolLeft} style={{ width: '100%' }} />
                                ) : (
                                <InputNumber 
                                    suffix={field.suffix || weightUnit} 
                                    style={{ width: '100%' }}
                                />
                            )}
                        </Form.Item>
                        ))}
                    </Col>
                    ))}
            
                    <Col span={2}>
                    <MinusCircleOutlined 
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove();
                        }} 
                    />
                    </Col>
                </Row>
            </div>
        );
    }
  // 添加区间按钮组件
  const AddIntervalButton = ({ onAdd }) => (
    <Form.Item>
      <ConfigProvider theme={{/* 保持原有样式 */}}>
        <Button onClick={() => onAdd()} icon={<AddIcon />}>
          区间
        </Button>
      </ConfigProvider>
    </Form.Item>
  );

    return (
        <Scoped>
            <PrimaryButton text="添加运费" onClick={()=>setOpen(true)} />
            {/*  */}
            <Modal open={open} title="添加运费" centered width={1000} onCancel={()=>setOpen(false)} onOk={submit}>
                <ScopedForm>
                    <Radio.Group
                        defaultValue={1}
                        style={{
                            marginTop:"24px",
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}
                        options={[
                            { value: 1, label: '设置您自己的运费' },
                            { value: 2, label: '使用承运商或应用来计算费率' },
                        ]}
                    />
                    <Divider />
                    {/*  */}
                    <MyForm layout="vertical" form={formFreight}>
                        <Form.Item className="mb-20" name="freightName" label={<div>运费名称（客户选择物流方案时展示）</div>} 
                            rules={[{ required: true, message: '请填写运费名称' }]}
                        >
                            <Input placeholder="请输入运费" />
                        </Form.Item>
                        <Form.Item className="mb-20" name="country" initialValue={['🇨🇳']} label={<div>国家</div>} >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select one country"
                                options={options}
                                optionRender={(option) => (
                                <Space>
                                    {/* <span role="img" aria-label={option.data.label}>
                                    </span> */}
                                    {option.data.desc}
                                </Space>
                                )}
                            />
                        </Form.Item>
                        <Form.Item className="mb-20" label="补充说明" name="instructions">
                            <TextArea
                                placeholder="补充说明物流时效，送货注意事项等信息（可选，如有填写，将在无运费合并时进行展示）"
                                showCount
                                maxLength={300}
                                autoSize={{ minRows: 4, maxRows: 4 }}
                            />
                        </Form.Item>
                        <Form.Item style={{marginBottom:"4px"}} label={false} name="delivery" valuePropName="checked" initialValue={false}>
                            <Checkbox>支持货到付款</Checkbox>
                        </Form.Item>
                        <Flex align="center" className="mb-12">
                            <div className="font-w-600">计费方式：</div>
                            <Flex gap={8}>
                                <Form.Item label={false}>
                                    <DefaultSelect value={billingMethod} onChange={(e)=>{
                                        setBillingMethod(e)
                                        console.log(e)
                                    }} options={[
                                        {
                                            label:"固定运费",
                                            value:1,
                                        },
                                        {
                                            label:"首续重",
                                            value:2,
                                        },
                                        {
                                            label:"首续件",
                                            value:3,
                                        }
                                    ]} />
                                </Form.Item>
                                {billingMethod == 2 && <Form.Item label={false}>
                                    <DefaultSelect value={"重量单位："+weightUnit} onChange={(e)=>{
                                        setWeightUnit(e)
                                    }} options={[
                                        {
                                            label:"kg",
                                            value:"kg",
                                        },
                                        {
                                            label:"g",
                                            value:"g",
                                        },
                                        {
                                            label:"lb",
                                            value:"lb",
                                        },
                                        {
                                            label:"oz",
                                            value:"oz",
                                        }
                                    ]} />
                                </Form.Item>}
                            </Flex>
                        </Flex>
                        <Flex align="center" className="mb-12">
                            <div className="font-w-600">计费货币：</div>
                            <Form.Item label={false}>
                                <DefaultSelect options={currencyList} value={currency} onChange={(e,option)=>{
                                    setCurrency(e)
                                    setSymbolLeft(option.symbol_left)
                                }} />
                            </Form.Item>
                        </Flex>
                        {(!isAddConditions && billingMethod == 1) && <Flex align="center" className="mb-12">
                            <div className="font-w-600">运费价格：</div>
                            <Form.Item label={false}>
                                <InputNumber prefix={symbolLeft} style={{height:"36px",width:"180px"}} />
                            </Form.Item>
                        </Flex>}
                        {(!isAddConditions && billingMethod == 3) && <Flex vertical gap={12} className="mb-12">
                            <Row gutter={[10,10]}>
                                <Col span={6}>首件</Col>
                                <Col span={6}>首件费用</Col>
                                <Col span={6}>续件</Col>
                                <Col span={6}>续件费用</Col>
                            </Row>
                            <Row gutter={[10,10]}>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber suffix={<span className="color-D7DBE7">{"件"}</span>} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber prefix={symbolLeft} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber suffix={<span className="color-D7DBE7">{"件"}</span>} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber prefix={symbolLeft} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Flex>}
                        {(!isAddConditions && billingMethod == 2) && <Flex vertical gap={12} className="mb-12">
                            <Row gutter={[10,10]}>
                                <Col span={6}>首重</Col>
                                <Col span={6}>首重费用</Col>
                                <Col span={6}>续重</Col>
                                <Col span={6}>续重费用</Col>
                            </Row>
                            <Row gutter={[10,10]}>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber suffix={<span className="color-D7DBE7">{weightUnit}</span>} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber prefix={symbolLeft} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber suffix={<span className="color-D7DBE7">{weightUnit}</span>} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={false}>
                                        <InputNumber prefix={symbolLeft} style={{height:"36px",width:"100%"}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Flex>}
                        {isAddConditions?<div className="color-356DFF font-w-600 cursor-pointer mb-12" onClick={()=>setIsAddConditions(false)}>删除条件</div>:<div className="color-356DFF font-w-600 cursor-pointer mb-12" onClick={()=>setIsAddConditions(true)}>添加条件</div>}
                        {isAddConditions && <>
                            {/* {} */}
                            <Flex align="center" className="mb-12">
                                <div>条件区间：</div>
                                <Form.Item label={false}>
                                <Radio.Group
                                    options={[
                                        {
                                            value: 1,
                                            label: (
                                                <Flex justify="center" align="center" vertical>按商品总价</Flex>
                                            ),
                                        },
                                        {
                                            value: 2,
                                            label: (
                                                <Flex justify="center" align="center" vertical>按订单总价</Flex>
                                            ),
                                        },
                                        {
                                            value: 3,
                                            label: (
                                                <Flex justify="center" align="center" vertical>按包裹重量</Flex>
                                            ),
                                        },
                                        {
                                            value: 4,
                                            label: (
                                                <Flex justify="center" align="center" vertical>按商品件数</Flex>
                                            ),
                                        },
                                    ]}
                                    value={conditions}
                                    onChange={(e)=>setConditions(e.target.value)}
                                />
                                </Form.Item>
                            </Flex>
                            {/*  */}
                            {isAddConditions && billingMethod && conditions && (
                                <Form form={form}>
                                    <Row className="mb-12">
                                    <Col span={6}>
                                        {getConditionConfig(billingMethod, conditions).title}
                                        <Tooltip title="区间范围遵循左闭右开规则">
                                            <QuestionCircleOutlined style={{ color: '#999', marginLeft: 4 }} />
                                        </Tooltip>
                                    </Col>
                                    {getConditionConfig(billingMethod, conditions).rows[0].labels.map(
                                        (label, index) => (
                                            <Col span={4} key={index}>{label}</Col>
                                        )
                                    )}
                                    </Row>
                                    <Form.List name={`${billingMethod}_${conditions}_rules`}>
                                        {(fields, { add, remove }) => (
                                            <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <DynamicFormRow 
                                                    key={key}
                                                    name={name}
                                                    restField={restField}
                                                    config={getConditionConfig(billingMethod, conditions)}
                                                    symbolLeft={symbolLeft}
                                                    weightUnit={weightUnit}
                                                    onRemove={() => remove(name)}
                                                />
                                            ))}
                                            <AddIntervalButton onAdd={add} />
                                            </>
                                        )}
                                    </Form.List>
                                </Form>
                                )}
                            {/* {billingMethod == 2 &&  conditions == 1 && <Form>
                                <Row className="mb-12">
                                    <Col span={6}>
                                        按商品总价
                                        <Tooltip title="提醒：区间范围遵循“左闭右开”规则， 例：0-5件，代表0≤X<5件。">
                                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </Col>
                                    <Col span={4}>首重</Col>
                                    <Col span={4}>首重费用</Col>
                                    <Col span={4}>续重</Col>
                                    <Col span={4}>续重费用</Col>
                                </Row>
                                <Form.List name="users">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 12 }} align="baseline">
                                                <Row gutter={[10,10]}>
                                                    <Col span={6}>
                                                        <Flex>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                            </Form.Item>
                                                            <Flex align="center" style={{margin:"0 5px",fontSize:"16px"}}>-</Flex>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                            </Form.Item>
                                                        </Flex>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Flex align="center" style={{height:"32px"}}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Flex>
                                                    </Col>
                                                </Row>
                                                </Space>
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
                                                    <Button onClick={() => add()} className="default-btn" icon={<AddIcon className="font-16" />}>
                                                        区间
                                                    </Button>
                                                </ConfigProvider>
                                            </Form.Item>
                                            </>
                                        )
                                    }}
                                </Form.List>
                            </Form>}
                            {billingMethod == 2 &&  conditions == 2 && <Form>
                                <Row className="mb-12">
                                    <Col span={6}>
                                        按订单总价
                                        <Tooltip title="提醒：区间范围遵循“左闭右开”规则， 例：0-5件，代表0≤X<5件。">
                                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </Col>
                                    <Col span={4}>首重</Col>
                                    <Col span={4}>首重费用</Col>
                                    <Col span={4}>续重</Col>
                                    <Col span={4}>续重费用</Col>
                                </Row>
                                <Form.List name="users">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 12 }} align="baseline">
                                                <Row gutter={[10,10]}>
                                                    <Col span={6}>
                                                        <Flex>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                            </Form.Item>
                                                            <Flex align="center" style={{margin:"0 5px",fontSize:"16px"}}>-</Flex>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                            </Form.Item>
                                                        </Flex>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Flex align="center" style={{height:"32px"}}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Flex>
                                                    </Col>
                                                </Row>
                                                </Space>
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
                                                    <Button onClick={() => add()} className="default-btn" icon={<AddIcon className="font-16" />}>
                                                        区间
                                                    </Button>
                                                </ConfigProvider>
                                            </Form.Item>
                                            </>
                                        )
                                    }}
                                </Form.List>
                            </Form>}
                            {billingMethod == 3 &&  conditions == 1 && <Form>
                                <Row className="mb-12">
                                    <Col span={6}>
                                        按商品总价
                                        <Tooltip title="提醒：区间范围遵循“左闭右开”规则， 例：0-5件，代表0≤X<5件。">
                                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                                <QuestionCircleOutlined />
                                            </span>
                                        </Tooltip>
                                    </Col>
                                    <Col span={4}>首件</Col>
                                    <Col span={4}>首件费用</Col>
                                    <Col span={4}>续件</Col>
                                    <Col span={4}>续件费用</Col>
                                </Row>
                                <Form.List name="users">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 12 }} align="baseline">
                                                <Row gutter={[10,10]}>
                                                    <Col span={6}>
                                                        <Flex>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                            </Form.Item>
                                                            <Flex align="center" style={{margin:"0 5px",fontSize:"16px"}}>-</Flex>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'first']}
                                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                            >
                                                                <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                            </Form.Item>
                                                        </Flex>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <Input placeholder="First Name" />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                        <InputNumber<number> style={{width:"100%"}} prefix={symbolLeft} />
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Flex align="center" style={{height:"32px"}}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Flex>
                                                    </Col>
                                                </Row>
                                                </Space>
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
                                                    <Button onClick={() => add()} className="default-btn" icon={<AddIcon className="font-16" />}>
                                                        区间
                                                    </Button>
                                                </ConfigProvider>
                                            </Form.Item>
                                            </>
                                        )
                                    }}
                                </Form.List>
                            </Form>} */}
                        </>}
                        
                    </MyForm>
                </ScopedForm>
            </Modal>
        </Scoped>
    )

}

const Scoped = styled.div`
    
`
const ScopedForm = styled.div`
    overflow-y: auto;
    max-height: 680px;
    padding-right: 20px; // 新增右侧内边距
    margin-right: -20px; // 通过负边距保持原始布局宽度
    scrollbar-gutter: stable; // 确保滚动条出现时不影响布局
`
const MyForm = styled(Form)`
    .ant-form-item{
        margin-bottom: 0;
    }
    .ant-form-item-required::before {
        display: none !important;
    }
    .mb-20{
        margin-bottom: 20px;
    }
    .mb-12{
        margin-bottom: 12px;
    }
`