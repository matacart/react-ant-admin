import MyInput from "@/components/Input/MyInput";
import MyTextArea from "@/components/Input/MyTextArea";
import NumberInput from "@/components/Input/NumberInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import taxes from "@/store/settings/taxes/taxes";
import { MinusOutlined } from "@ant-design/icons";
import { Card, Checkbox, Divider, Flex, Form, FormInstance } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";

function TaxOverall({form}:{form:FormInstance}){
    useEffect(() => {
        form.setFieldsValue({
            overallTaxes: taxes.overallTax.subTaxesConfigDTOList,
        });
    }, []);

    return <MyCard>
        <div className="font-w-500" style={{marginBottom:12}}>全境税率</div>
        <NumberInput 
            controls={false}
            min={0}
            max={100}
            style={{width:"240px",height:36}}
            suffix="%"
            value={Number(taxes.overallTax?.taxesRate)}
            onChange={(value:any)=>taxes.setOverallTax({...taxes.overallTax,taxesRate:Number(value)})}
        />
        <Divider size="middle" />
        {taxes.zoneList.length > 0 && <>
            <Form
                form={form}
                autoComplete="off"
                onValuesChange={(changedValues, allValues) => {
                    console.log('整体变化：', changedValues);
                    // 或者从 allValues 中提取 overallTaxes 字段
                }}
            >
                <Form.List name="overallTaxes">
                {(fields, { add, remove }) => (
                    <>
                        <div className="font-w-500">区域税率</div>
                        <div className="font-12 color-62708D" style={{marginBottom:16}}>如果添加了州税率，将替代地方税率。</div>
                        {/* 区域税率列表 */}
                        {fields.map(({ key, name, ...restField }) => (
                            <Flex key={key} gap={16} align="center">
                                <Form.Item
                                    {...restField}
                                    style={{flex:1}}
                                    name={[name, 'districtCode']}
                                    rules={[{ required: true, message: '请选择区域' }]}
                                >
                                    <DefaultSelect 
                                        style={{height:"36px"}} 
                                        placeholder="区域" 
                                        options={taxes.zoneList}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    style={{flex:1}}
                                    name={[name, 'taxesName']}
                                    rules={[{ required: true, message: '请输入税名' }]}
                                >
                                    <MyInput style={{height:"36px"}} placeholder="税名" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    style={{flex:1}}
                                    name={[name, 'taxesRate']}
                                >
                                    <NumberInput style={{height:"36px",width:"100%"}} min={0} max={100} controls={false} suffix="%" />
                                </Form.Item>
                                <Flex className="remove-btn" align="center" justify="center" onClick={() => remove(name)}>
                                    <MinusOutlined />
                                </Flex>
                            </Flex>
                        ))}
                        <div><span className="cursor-pointer color-356DFF" onClick={() => add()}>添加区域</span></div>
                    </>
                )}
                </Form.List>
            </Form>
            <Divider size="middle" />
        </>}
        <div>
            <Checkbox checked={taxes.overallTax?.taxesDescSwitch} onChange={(e)=>taxes.setOverallTax({...taxes.overallTax,taxesDescSwitch:e.target.checked})}>在结账时允许消费者查看关税说明</Checkbox>
            {taxes.overallTax?.taxesDescSwitch && <MyTextArea value={taxes.overallTax?.taxesDesc} onChange={(e:any)=>taxes.setOverallTax({...taxes.overallTax,taxesDesc:e.target.value})} placeholder="请输入税费规则说明" style={{marginTop:12,resize: 'none'}} autoSize={{ minRows: 4, maxRows: 4 }}  />}
        </div>
    </MyCard>
}
export default observer(TaxOverall)

const MyCard = styled(Card)`
    .ant-card-body{
        padding:20px;
    }
    .ant-form-item{
    }
    .remove-btn{
        position: relative;
        top: -12px;
        background: #eef1f7;
        cursor: pointer;
        border-radius: 4px;
        height: 24px;
        width: 24px;
    }
    
`
