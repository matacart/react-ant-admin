import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Form, GetProp, Input, message, Radio, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

function LoginLink() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600">选择链接的客户账户版本</div>
                <Divider className="divider" />
                <Radio.Group
                    style={style}
                    onChange={(e)=>setAccountVersion(e.target.value)}
                    value={accountVersion}
                    options={[
                        {
                        value: 1,
                        label: (
                            <div>
                                <div className="color-474F5E">经典客户账户</div>
                                <div className="color-7A8499">支持邮箱和手机号登录注册，可进行基础的个人信息管理与订单查看，适用于B2C店铺</div>
                            </div>
                        ),
                        },
                        {
                        value: 2,
                        label: (
                            <Flex vertical>
                                <div className="color-474F5E">新客户账户</div>
                                <div className="color-7A8499">仅支持使用邮箱登录注册，可进行更多的个人信息管理与订单管理，适用于B2B和B2C店铺</div>
                            </Flex>
                        ),
                        }
                    ]}
                />
                <div className="text color-474F5E">客户仍可以通过URL访问新客户账户。如果您的店铺同时经营B2C与B2B，您可以<a>了解并选择合适的帐户版本<ExportOutlined style={{position:"relative",left:"4px"}} /></a></div>
            </Card>
        </Scoped>
    )
}

export default LoginLink

const Scoped = styled.div`
    margin-bottom: 20px;
    .ant-radio{
        position: relative;
        top: -10px;
    }
    .divider{
        margin:20px 0px;
    }
    .text{
        margin-top: 16px;
    }
`
