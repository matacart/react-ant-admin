import DefaultButton from "@/components/Button/DefaultButton";
import { RightIcon } from "@/components/Icons/Icons";
import shippingDistribution from "@/store/settings/ShippingAndDistribution/shippingDistribution";
import { EnvironmentOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Divider, Flex } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

function CustomFreight() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between" align="center">
                    <div>
                        <div className="color-242833 font-16 font-w-600">自定义运费</div>
                        <div className="color-474F5E font-14" style={{marginTop:"4px"}}>通过分组，为指定商品配置物流运费方案</div>
                    </div>
                    <div>
                        <DefaultButton text="添加分组" onClick={()=>history.push("/settings/logistics/add/custom")} />
                    </div>
                </Flex>
                <div className="list">
                    {shippingDistribution.customFreight.map(item=>{
                        return (
                            <Flex className="location-box">
                                <div className="location" style={{width:"48px",height:"48px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <EnvironmentOutlined className="font-24 color-7A8499" />
                                </div>
                                <Flex flex={1} align="center">
                                    <div>支持发往 1 个地区</div>
                                </Flex>
                                <Flex align="center">
                                    <RightIcon className="font-24" />
                                </Flex>
                            </Flex>
                        )
                    })}
                </div>
            </Card>
        </Scoped>
    )
}

export default observer(CustomFreight)

const Scoped = styled.div`
    margin-bottom: 20px;
    .divider{
        margin-top: 20px;
        margin-bottom: 0px;
    }
    .list{
        margin-top: 20px;
        border:1px solid #0505050F;
        .location-box{
            padding:12px;
            border-bottom:1px solid #0505050F;
            &:last-child{
                border-bottom:none;
            }
            .location{
                margin-right: 12px;
                background-color: #F7F8Fb;
                border-radius: 4px;
                border: 1px solid #EEF1F7;
            }
        }
    }
`
