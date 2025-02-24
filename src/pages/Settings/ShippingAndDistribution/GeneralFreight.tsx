import { history } from "@umijs/max";
import { Button, Card, Divider, Flex, Form, GetProp, Input, message, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

function GeneralFreight() {

    const [loading, setLoading] = useState(false);

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600">通用运费</div>
                <div className="color-474F5E font-14" style={{marginTop:"4px"}}>针对所有商品（不包含自定义组中的商品）</div>
                <Divider className="divider" />
                {/* 无运费 */}
                <Flex className="no-freight-box" align="center" vertical>
                    <div className="color-7A8499">无运费</div>
                    <div className="font-12 color-7A8499">添加运费以便客户完成结账</div>
                    <Button type="primary" onClick={()=>history.push("/settings/logistics/edit/custom/1")}>添加区域运费</Button>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default GeneralFreight

const Scoped = styled.div`
    margin-bottom: 20px;
    .divider{
        margin:20px 0px;
    }
    .no-freight-box{
        background-color: #f0f3f9;
        border-radius: 6px;
        padding:20px 0;
        div{
            margin-bottom: 8px;
        }
    }
`
