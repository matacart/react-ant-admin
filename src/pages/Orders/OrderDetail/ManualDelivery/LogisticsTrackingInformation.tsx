import SimpleCard from "@/components/Card/SimpleCard";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import globalStore from "@/store/globalStore";
import { Form, Row, Col, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { Logistic } from "../AfterSales/ReturnInformation";
import { FavoriteIcon } from "@/components/Icons/Icons";

function LogisticsTrackingInformation({form}:{form:any}){

    const listData = Form.useWatch("multiExpressInfo", form);

    const scopedRef = useRef<any>(null);
    // 收藏
    const toggleFavorite = (courierId:string)=>{
        globalStore.toggleFavorite(courierId);
    }
    // 挂载时触发加载
    useEffect(() => {
        globalStore.getShippingCourierList();
    }, []);

    const logisticsOptions = useMemo(() => {
        let favoriteLogistics:Logistic[] = [];
        let otherLogistics:Logistic[] = [];

        globalStore.shippingCourierList.forEach((item)=>{
            if(item.favorite){
                favoriteLogistics.push({
                    value: item.courierId,
                    label: item.name,
                    info: item,
                });
            }else{
                otherLogistics.push({
                    value: item.courierId,
                    label: item.name,
                    info: item,
                });
            }
        })

        return [
            ...(favoriteLogistics.length > 0 ? [{
                label: "我的收藏",
                title: "我的收藏",
                options: favoriteLogistics,
            }] : []),
            {
                label:"全部服务商",
                title: '全部服务商',
                options: [...otherLogistics,{ value: "0", label: "其它", info: undefined as any }]
            }
        ];
    }, [globalStore.shippingCourierList]);


    useEffect(()=>{
        form.setFieldsValue({
            multiExpressInfo:[{
                expressCode:"",
                expressCompanyCode:undefined,
                expressCompany:"",
                expressUrl:""
            }]
        })
    },[])

    return (
        <Scoped ref={scopedRef}>
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
                                                    <MySelect 
                                                        placeholder="请填写快递公司名称"
                                                        getPopupContainer={()=>scopedRef.current}
                                                        classNames={{
                                                            popup: {
                                                                root: 'my-classname'
                                                            }
                                                        }}
                                                        styles={{
                                                            root: {
                                                                height: '36px'
                                                            },
                                                            popup: {
                                                                root: {
                                                                    padding: "8px 0"
                                                                }
                                                            }
                                                        }}
                                                        options={logisticsOptions}
                                                        optionRender={(option)=><Flex justify="space-between">
                                                            <div>{option.label}</div>
                                                            {option.value === '0' ? null : option.data?.info?.favorite ? (
                                                                <div className="color-FFBC11" onClick={(e)=>{
                                                                    e.stopPropagation();
                                                                    toggleFavorite((option?.value || "") as string)
                                                                }}><FavoriteIcon /></div>
                                                            ) : (
                                                                <div className="color-D7DBE7 option-favorite" onClick={(e)=>{
                                                                    e.stopPropagation();
                                                                    toggleFavorite((option?.value || "") as string)
                                                                }}><FavoriteIcon /></div>
                                                            )}
                                                        </Flex>}
                                                        onChange={(value,options)=>{
                                                            if(value == '0'){
                                                                form.setFieldValue(["multiExpressInfo",name,"expressCompany"], "");
                                                                form.setFieldValue(["multiExpressInfo",name,"expressUrl"], "");
                                                                return;
                                                            }
                                                            const target = logisticsOptions.flatMap((group) => group.options).find((item) => item.value === value);
                                                            form.setFieldValue(["multiExpressInfo",name,"expressCompany"], target?.label || "");
                                                            form.setFieldValue(["multiExpressInfo",name,"expressUrl"], target?.info?.webUrl || "");
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

export default observer(LogisticsTrackingInformation);
