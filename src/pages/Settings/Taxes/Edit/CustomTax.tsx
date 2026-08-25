import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import taxes from "@/store/settings/taxes/taxes";
import { DeleteOutlined, EditOutlined, MinusOutlined } from "@ant-design/icons";
import { Card, Flex, Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomTaxAdd from "./CustomTaxAdd";
import { observer } from "mobx-react-lite";
import CustomTaxEdit from "./CustomTaxEdit";
import DeleteModal from "@/components/Modal/DeleteModal";

function CustomTax({form}:{form:FormInstance}){

    // 删除自定义税率
    const deleteCustomTax = (index:number)=>{
        const newCustomTaxes = [...taxes.customTax];
        if(newCustomTaxes[index] && newCustomTaxes[index]?.id){
            taxes.setDeleteList([...taxes.deleteList,newCustomTaxes[index]?.id]);
        }
        newCustomTaxes.splice(index, 1);
        taxes.setCustomTax(newCustomTaxes);
    }

    useEffect(() => {
        const values:any = {};
        taxes.customTax.forEach((item, index) => {
            // const customTaxes = item.subTaxesConfigDTOList.map((item:any) => ({
            //     taxZone: item.districtCode,
            //     taxName: item.taxesName,
            //     taxRate: item.taxesRate,
            // }))
            values[`customTaxes${index}`] = item.subTaxesConfigDTOList || [];
        });
        form.setFieldsValue(values);
    }, [taxes.customTax]);
    
    return <MyCard>
        <Flex justify="space-between">
            <div>
                <div className="font-w-500" style={{marginBottom:6}}>自定义税率</div>
                <div className="font-12 color-62708D">发货到指定区域时，为特定产品系列自定义基于区域的税率或运费。</div>
            </div>
            <CustomTaxAdd />
        </Flex>
        <Form style={{marginTop:"16px"}} form={form}>
            <Flex vertical gap={20}>
                {taxes.customTax.map((item,index)=>(
                    <div key={index} className="tax-group-warp">
                        <Flex className="header" justify="space-between">
                            <div>{item.taxesName}</div>
                            <Flex gap={12}>
                                <CustomTaxEdit index={index} />
                                <DeleteModal
                                    tElement={
                                        <DeleteOutlined className="cursor-pointer font-16 color-F86140" />
                                    }
                                    removeFunc={()=>deleteCustomTax(index)} 
                                    title="删除自定义税率" 
                                    content={"自定义税率将被删除，此操作无法撤销。"}
                                    okText="删除"
                                />
                                
                            </Flex>
                        </Flex>
                        <div className="content">
                            <Form.List name={`customTaxes${index}`}>
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
                        </div>
                    </div>
                ))}
            </Flex>
        </Form>
    </MyCard>
}
export default observer(CustomTax)

const MyCard = styled(Card)`
    .ant-card-body{
        padding:20px;
    }
    .ant-form-item{
    }

    .tax-group-warp{
        border: 1px solid #eef1f6;
        border-radius: 4px;

        .header{
            padding:12px 16px;
            background: #f7f8fb;
        }

        .content{
            padding:12px 16px;
        }
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
