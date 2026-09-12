import SimpleCard from "@/components/Card/SimpleCard";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { Form, Row, Col, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

function LogisticsTrackingInformation({form}:{form:any}){

    const [logistics,setLogistics] = useState<any[]>([]);

    const listData = Form.useWatch("multiExpressInfo", form);

    useEffect(()=>{
        const newLogistics = JSON.parse(localStorage["MC_DATA_SHIPPING_COURIER"] || "[]").map((item:any)=>{
            return{
                value:item.id,
                label:item.courier_name,
                expressCompany:item.courier_name,
                expressUrl:item.courier_url,
            }
        })
        setLogistics([...newLogistics,{
            value:'0',
            label:"其它",
            expressCompany:"",
            expressUrl:""
        }])
    },[])


    useEffect(()=>{
        form.setFieldsValue({
            multiExpressInfo:[{
                expressCode:"",
                expressCompanyCode:"",
                expressCompany:"",
                expressUrl:""
            }]
        })
    },[])

    return (
        <Scoped>
            <SimpleCard title={<Flex justify="space-between">
                <div className="font-w-500">物流和跟踪信息</div>
            </Flex>} content={<div>
                <Form layout="vertical" form={form}>
                    <Form.List name="multiExpressInfo">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="form-list-item">
                                        <Row gutter={20}>
                                            <Col span={12}>
                                                <Form.Item label="运单号" name={[name,"expressCode"]}>
                                                    <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="物流服务商" name={[name,"expressCompanyCode"]}>
                                                    <MySelect placeholder="请填写快递公司名称" 
                                                        showSearch 
                                                        style={{height:"36px"}}
                                                        options={logistics}
                                                        onChange={(value,options)=>{
                                                            if(value == '0'){
                                                                form.setFieldValue(["multiExpressInfo", name, "expressCompany"], "");
                                                                form.setFieldValue(["multiExpressInfo", name, "expressUrl"], "");
                                                                return;
                                                            }
                                                            const target = logistics.find((item) => item.value == value);
                                                            form.setFieldValue(["multiExpressInfo", name, "expressCompany"], target?.expressCompany || "");
                                                            form.setFieldValue(["multiExpressInfo", name, "expressUrl"], target?.expressUrl || "");
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20} style={{ display: listData?.[name]?.expressCompanyCode === "0" ? "flex" : "none" }}>
                                            <Col span={12}>
                                                <Form.Item label="公司名称" name={[name,"expressCompany"]}>
                                                    <MyInput style={{height:"36px"}} placeholder="请输入公司名称"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="货件追踪链接URL" name={[name,"expressUrl"]} rules={[
                                                    {
                                                        message: '请输入正确的网页链接格式',
                                                        pattern: /^https?:\/\/.+/
                                                    }
                                                ]}>
                                                    <MyInput style={{height:"36px"}} placeholder="http://" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <div onClick={()=>add()} className="cursor-pointer color-356DFF font-12">添加多个运单</div>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>} />
        </Scoped>
    )
}

const Scoped = styled.div`
    .form-list-item{
        padding-top: 16px;
        border-top: 1px solid #E5E5E5;
    }
    .form-list-item:first-child{
        padding-top: 0;
        border-top: none;
    }

`

export default LogisticsTrackingInformation;