import { FavoriteIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import globalStore from "@/store/globalStore";
import { Form, Row, Col, Flex, Card, Radio } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

export interface Logistic{
    value:string;
    label:string;
    info?:any;
}

function ReturnInformation({form}:{form:any}){

    const scopedRef = useRef<any>(null);

    const returnGoodsType = Form.useWatch('returnGoodsType', form);
    const expressCompanyCode = Form.useWatch('expressCompanyCode', form);

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

    return (
        <Scoped ref={scopedRef}>
            <Card title="退货运输选项">
                <MyForm form={form} layout="vertical" >
                    <Form.Item name="returnGoodsType" initialValue="matacart">
                        <Radio.Group style={style}>
                            <Radio value="matacart" onClick={()=>{
                                form.setFieldValue("expressCode", "");
                                form.setFieldValue("expressCompanyCode", "");
                                form.setFieldValue("expressCompany", "");
                                form.setFieldValue("expressUrl", "");
                            }}>在 MATACART 中创建退货标签</Radio>
                            <Radio value="manual">手动输入退货信息</Radio>
                            {returnGoodsType === 'manual' && (
                                <div style={{padding:"0 0 0 24px"}}>
                                    <Row gutter={20}>
                                        <Col span={12}>
                                            <Form.Item label="运单号" name={"expressCode"}>
                                                <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="物流服务商" name={"expressCompanyCode"}>
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
                                        </Col>
                                    </Row>
                                    <Row gutter={20} style={{ display: expressCompanyCode === "0" ? "flex" : "none" }}>
                                        <Col span={12}>
                                            <Form.Item label="公司名称" name={"expressCompany"}>
                                                <MyInput style={{height:"36px"}} placeholder="请输入公司名称"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="货件追踪链接URL" name={"expressUrl"} rules={[
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
                            )}
                            <Radio value="none" onClick={()=>{
                                form.setFieldValue("expressCode", "");
                                form.setFieldValue("expressCompanyCode", "");
                                form.setFieldValue("expressCompany", "");
                                form.setFieldValue("expressUrl", "");
                            }}>无需运输</Radio>
                        </Radio.Group>
                    </Form.Item>
                </MyForm>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
`


const MyForm = styled(Form)`
    .ant-form-item{
        margin-bottom: 16px;
    }
`

export default observer(ReturnInformation);
