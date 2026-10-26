import PrimaryButton from "@/components/Button/PrimaryButton";
import { RightIcon } from "@/components/Icons/Icons";
import shippingDistribution from "@/store/settings/ShippingAndDistribution/shippingDistribution";
import { EnvironmentOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Divider, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

function GeneralFreight() {

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        console.log(shippingDistribution.generalFreight)
    },[])

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600">通用运费</div>
                <div className="color-474F5E font-14" style={{marginTop:"4px"}}>针对所有商品（不包含自定义组中的商品）</div>
                {/* 无运费 */}
                {shippingDistribution.generalFreight?.areaNum ? <div className="list">
                    <Flex className="location-box">
                        <div className="location" style={{width:"48px",height:"48px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <EnvironmentOutlined className="font-24 color-7A8499" />
                        </div>
                        <Flex flex={1} align="center">
                            <div>支持发往 {shippingDistribution.generalFreight.areaNum} 个地区</div>
                        </Flex>
                        <Flex align="center">
                            <RightIcon className="font-24" />
                        </Flex>
                    </Flex>
                </div>:<Flex className="no-freight-box" align="center" vertical>
                    <div className="color-7A8499">无运费</div>
                    <div className="font-12 color-7A8499">添加运费以便客户完成结账</div>
                    <PrimaryButton text="添加区域运费" onClick={()=>history.push("/settings/logistics/edit/common/1")} />
                </Flex>}
            </Card>
        </Scoped>
    )
}

export default observer(GeneralFreight)

const Scoped = styled.div`
    margin-bottom: 20px;
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
    .no-freight-box{
        margin-top: 20px;
        background-color: #f0f3f9;
        border-radius: 6px;
        padding:20px 0;
        div{
            margin-bottom: 8px;
        }
    }
`
