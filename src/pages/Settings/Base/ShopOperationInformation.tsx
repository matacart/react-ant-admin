import InputSearch from "@/components/Search/InputSearch";
import { getCurrenciesList, getTimeZoneList } from "@/services/y2/api";
import baseInfoStore from "@/store/set-up/baseInfoStore";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Modal, Select, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import src from './../../../.umi/typings.d';

function ShopOperationInformation() {

    const [isOpen,setIsOpen] = useState(false);

    // const [data,setData] = useState();

    const [timeZone,setTimeZone] = useState([]);

    useEffect(()=>{
        getTimeZoneList().then(res=>{
            let newTimeZone:any = [];
            res.forEach((e:any) => {
                newTimeZone.push({
                    label:"("+e.time_zone_label+")"+" "+e.time_zone_name,
                    value:e.id
                })
            });
            setTimeZone(newTimeZone)
        })
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
                                <Button>编辑</Button>
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
                                baseInfoStore.setTimeZone(e)
                            }}
                        />
                    </Form.Item>
                </Form>
            </Card>
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