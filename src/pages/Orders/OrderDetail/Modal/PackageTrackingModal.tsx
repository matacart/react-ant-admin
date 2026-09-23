import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { updatePackageExpress } from "@/services/y2/apiStore";
import globalStore from "@/store/globalStore";
import order, { OrdersPackageType } from "@/store/order/order";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { App, Checkbox, Col, Flex, Form, Modal, Row } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logistic } from "../AfterSales/ReturnInformation";
import styled from "styled-components";
import { FavoriteIcon } from "@/components/Icons/Icons";
import { observer } from "mobx-react-lite";

export interface LogisticsType{
    value:string,
    label:string,
    expressCompany:string,
    expressUrl:string,
}

function PackageTrackingModal({ordersPackage}:{ordersPackage:OrdersPackageType}){
    
    const intl = useIntl();

    const scopedRef = useRef<any>(null);

    const { message } = App.useApp();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const listData = Form.useWatch("multiExpressInfo", form);
    // 向客户发送通知
    const [sendNotify,setSendNotify] = useState(false);
    const submit = () => {
        form.validateFields().then((values)=>{
            setLoading(true)
            updatePackageExpress({
                languages_id:order.languages,
                orderId:order.orderInfo.orderSeq,
                packageSeq:ordersPackage.packageSeq,
                sendNotify:sendNotify,
                sellerCountryCode:"CN",
                multiExpressInfo:JSON.stringify(values.multiExpressInfo),
            }).then((res)=>{
                if(res.code == 0){
                    order.triggerRefresh();
                    setOpen(false);
                }
            }).catch(()=>{
                message.error("更新失败");
            }).finally(()=>{
                setLoading(false)
            })
        }).catch(()=>{
        })
    }
    const cancel = () => {
        setOpen(false);
    };

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
    

    return(
        <>
            {ordersPackage?.multiExpressInfo?.length>0 ? <>
                <a onClick={()=>{
                    // 编辑跟踪信息
                    form.setFieldsValue({
                        multiExpressInfo:ordersPackage?.multiExpressInfo || []
                    });
                    setSendNotify(true);
                    setOpen(true);
                }}>编辑跟踪信息</a>            
            </>:<a onClick={()=>{
                // 添加跟踪信息
                form.setFieldsValue({
                    multiExpressInfo:[{
                        expressCode:undefined,
                        expressCompanyCode:undefined,
                        expressCompany:"",
                        expressUrl:"",
                    }]
                });
                setSendNotify(true);
                setOpen(true);
            }}>添加跟踪信息</a>}
            <MyModal open={open} width={620} title="更新运单号" centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify="space-between" align="center">
                            <Checkbox checked={sendNotify} onChange={(e)=>setSendNotify(e.target.checked)}>向客户发送通知</Checkbox>
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={cancel} />
                                <PrimaryButton text={"更新"} onClick={submit} loading={loading} />
                            </Flex>
                        </Flex>
                    </>
                )}
            >
                <div ref={scopedRef}>
                    <Form layout="vertical" form={form} style={{marginTop:"12px"}}>
                        <Form.List name="multiExpressInfo">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Flex key={key} align="flex-end" gap={12} >
                                            <div style={{flex:1}}>
                                                <Row gutter={20}>
                                                    <Col span={12}>
                                                        <Form.Item label="运单号" name={[name,"expressCode"]}>
                                                            <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>}/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item label="物流服务商" name={[name,"expressCompanyCode"]} required={false} rules={[{ required: true, message: '请选择物流服务商' }]}>
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
                                            {/* 删除按钮 */}
                                            {fields.length > 1 && <MinusCircleOutlined style={{position:"relative",bottom:"36px",fontSize:"16px"}}  onClick={() => remove(name)} />}
                                        </Flex>
                                    ))}
                                    <div onClick={()=>add()} className="cursor-pointer color-356DFF font-12"><PlusOutlined />添加多个运单</div>
                                </>
                            )}
                        </Form.List>
                    </Form>
                </div>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
`;

export default observer(PackageTrackingModal);
