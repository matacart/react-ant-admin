import InputSearch from "@/components/Search/InputSearch";
import { getCityList, getProvinceList } from "@/services/y2/api";
import baseInfoStore from "@/store/setUp/baseInfoStore";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Form, Input, Modal, Row, Select, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { parse } from 'url';
import { set } from 'lodash';
import { select } from "react-cookies";
import { useForm } from "antd/es/form/Form";

function ShopOperationInformation() {

    const [isOpen,setIsOpen] = useState(false);

    const [form] = useForm();

    const [isOpenBillingAddress,setIsOpenBillingAddress] = useState(false);

    const [countryList,setCountryList] = useState([]);

    const [provinceList,setProvinceList] = useState([]);

    const [cityList,setCityList] = useState([]);

    // const [data,setData] = useState();

    const [timeZone,setTimeZone] = useState([]);

    const selectedCountry = (value:string)=>{
        getProvinceList(value).then(res=>{
            console.log(res)
            res.code == 0 && setProvinceList(
                res.data.map(
                    (item:any) => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    }
                )
            )
            setCityList([])
        })
    }

    const selectedProvince = (value:string)=>{
        getCityList(value).then(res=>{
            res.code == 0 && setCityList(
                res.data.map(
                    (item:any) => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    }
                )
            )
        })
    }

    // 提交账单地址
    const submitBillingAddress = ()=>{
        console.log(form.getFieldsValue())
    }

    useEffect(()=>{

        const timeZones = JSON.parse(localStorage.getItem('MC_DATA_TIME_ZONEZ') || '[]')
        let newTimeZone:any = [];
        timeZones.forEach((e:any) => {
            newTimeZone.push({
                label:"("+e.time_zone_label+")"+" "+e.time_zone_name,
                value:e.time_zone_name
            })
        });
        setTimeZone(newTimeZone)

        setCountryList(
            JSON.parse(sessionStorage.getItem("country") || "").map(
                (item:any) => {
                    return {
                        label: item.country_name,
                        value: item.country_id
                    }
                }
            )
        )
    },[])

    return (
        <Scoped>
            <Card style={{marginBottom:"20px"}}>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="账单地址"
                        name="logo"
                        >
                        <div>
                            代表公司注册地址或者个人常驻地址，请慎重填写。账单地址将决定您的账单税费，请关注账单费用的变化，且有可能会造成您之前绑定的信用卡扣费失败。系统会帮您在后台处理已绑卡的切换，如果收到失败提示，请及时重新绑卡，避免自动续费扣费失败而导致产品的无法使用。详细了解
                        </div>
                        <Flex className="billingAddress" justify="space-between">
                            <Flex align="center">
                                <div><img src="/icons/set/billingAddress.svg"></img></div>
                                <div style={{marginLeft:"12px"}}>中国</div>
                            </Flex>
                            <Flex align="center">
                                <Button onClick={()=>setIsOpenBillingAddress(true)}>编辑</Button>
                            </Flex>
                        </Flex>
                    </Form.Item>
                    <Form.Item
                        label="商品种类"
                        >
                        <Select
                            defaultValue={baseInfoStore.productType}
                            style={{ width: 256 }}
                            options={[
                                { value: '0', label: '全类目' },
                                { value: '1', label: '生活家居' },
                                { value: '2', label: '流行衣饰' },
                                { value: '3', label: '美妆保养' },
                                { value: '4', label: '3C家电' },
                                { value: '5', label: '户外运动' },
                                { value: '6', label: '食品饮料' },
                                { value: '7', label: '图书文具' },
                                { value: '8', label: '亲子用品' },
                                { value: '9', label: '宠物用品' },
                                { value: '10', label: '未填写' }
                            ]}
                            onChange={(e)=>{
                                baseInfoStore.setProductType(e)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="经营所在地时区"
                        >
                        <Select
                            defaultValue={baseInfoStore.timezone}
                            style={{ width: 256 }}
                            options={timeZone}
                            onChange={(e)=>{
                                console.log(e)
                                baseInfoStore.setTimeZone(e)
                            }}
                        />
                    </Form.Item>
                </Form>
            </Card>
            {/* 账单地址 */}
            {/* Edit billing address */}
            <Modal title="编辑账单地址" centered width={620} open={isOpenBillingAddress} onOk={submitBillingAddress} onCancel={()=>{setIsOpenBillingAddress(false)}}>
                <Form layout={"vertical"} form={form}>
                    <Form.Item
                        name="country"
                        label="国家/地区"
                        >
                            {/* <Input placeholder="请选择国家/地区"></Input> */}
                            <Select options={countryList} onChange={selectedCountry} />
                    </Form.Item>
                    <Row gutter={[10,0]}>
                        <Col span={12}>
                            <Form.Item
                                label="省份"
                                name="province"
                                >
                                    {provinceList.length>0 ? <Select options={provinceList} onChange={selectedProvince} placeholder="请选择省份" /> : <Input placeholder="请输入省份"></Input> }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="城市"
                                name="city"
                                >
                                    {cityList.length>0 ? <Select options={cityList} onChange={()=>{}} placeholder="请选择城市" />:<Input placeholder="请输入城市"></Input>}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="区"
                        name="area"
                        >
                            <Input placeholder="区"></Input>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                        >
                            <Input placeholder="地址"></Input>
                    </Form.Item>
                    <Form.Item
                        label="详细地址"
                        name="detailAddress"
                        >
                            <Input placeholder="详细地址"></Input>
                    </Form.Item>
                    <Form.Item
                        label="邮编"
                        name="postCode"
                        >
                            <Input placeholder="邮编"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )
}


export default observer(ShopOperationInformation)

const Scoped = styled.div`
    .table_box{
        margin-top: 12px;
        border: 1px solid #eef1f7;
        border-radius: 4px;
        max-height: 680px;
        overflow-y: auto;
    }
    .billingAddress{
        border: 1px solid #eef1f6;
        border-radius: 6px;
        padding: 12px;
        margin-top: 12px;
    }
`