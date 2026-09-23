import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import order, { AfterSaleOrderType } from "@/store/order/order";
import { useIntl } from "@umijs/max";
import { Flex, Form, Modal } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import globalStore from "@/store/globalStore";
import { FavoriteIcon } from "@/components/Icons/Icons";
import { Logistic } from "../AfterSales/ReturnInformation";
import { observer } from "mobx-react-lite";
import { updateReturnExpressInfo } from "@/services/y2/apiStore";

function AfterSalesTrackingModal({afterSaleOrder}:{afterSaleOrder:AfterSaleOrderType}){
    
    const intl = useIntl();

    const scopedRef = useRef<any>(null);

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const expressCompanyCode = Form.useWatch("expressCompanyCode", form);
    // 收藏
    const toggleFavorite = (courierId:string)=>{
        globalStore.toggleFavorite(courierId);
    }

    const submit = () => {
        form.validateFields().then(()=>{
            const values = form.getFieldsValue(true);
            setLoading(true)
            updateReturnExpressInfo({
                languages_id:order.languages,
                afterSaleOrderSeq:afterSaleOrder.afterSaleOrderSeq,
                appScene:"NORMAL",
                expressCode:values.expressCode || "",
                expressCompany:values.expressCompany || "",
                expressCompanyCode:values.expressCompanyCode || "",
                expressUrl:values.expressUrl || "",
            }).then((res)=>{
                res.code == 0 && order.triggerRefresh();
            }).catch(()=>{

            }).finally(()=>{
                setOpen(false);
                setLoading(false)
            })
        }).catch(()=>{
        })
    }

    const cancel = () => {
        setOpen(false);
    };

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
            {(afterSaleOrder?.orderRefund?.expressCompanyCode || afterSaleOrder?.orderRefund?.expressCompanyCode == "0") ? <a onClick={()=>{
                form.setFieldsValue({
                    expressCode:afterSaleOrder?.orderRefund?.expressCode || "",
                    expressCompanyCode:afterSaleOrder?.orderRefund?.expressCompanyCode || "",
                    expressCompany:afterSaleOrder?.orderRefund?.expressCompany || "",
                    expressUrl:afterSaleOrder?.orderRefund?.expressUrl || "",
                })
                setOpen(true)
            }}>编辑跟踪信息</a>:
            <a onClick={()=>{
                setOpen(true);
            }}>添加跟踪信息</a>
            }
            <Modal open={open} title="更新运单号" centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify='end' align='center'>
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={cancel} />
                                <PrimaryButton text={"更新"} onClick={submit} loading={loading} />
                            </Flex>
                        </Flex>
                    </>
                )}
            >
                <div ref={scopedRef}>
                    <Form form={form} layout="vertical" style={{marginTop:"28px"}}>
                        <Form.Item label="运单号" name="expressCode">
                            <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>} />
                        </Form.Item>
                        <Form.Item label="物流服务商" name="expressCompanyCode">
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
                                        form.setFieldValue("expressCompany", "");
                                        form.setFieldValue("expressUrl", "");
                                        return;
                                    }
                                    const target = logisticsOptions.flatMap((group) => group.options).find((item) => item.value === value);
                                    form.setFieldValue("expressCompany", target?.label || "");
                                    form.setFieldValue("expressUrl", target?.info?.webUrl || "");
                                }}
                            />
                        </Form.Item>
                        {expressCompanyCode == "0" && <>
                            <Form.Item label="公司名称" name="expressCompany">
                                <MyInput style={{height:"36px"}} placeholder="请输入公司名称" />
                            </Form.Item>
                            <Form.Item label="货件追踪链接URL" name="expressUrl">
                                <MyInput style={{height:"36px"}} placeholder="https://" />
                            </Form.Item>
                        </>}
                        {/* <Form.Item label={null} name="notice" valuePropName="checked">
                            <Checkbox>向客户发送通知</Checkbox>
                        </Form.Item> */}
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default observer(AfterSalesTrackingModal);