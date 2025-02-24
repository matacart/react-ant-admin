import { Button, Card, Divider, Flex, Radio, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

export default function CustomerAccountInformation() {


    const [accountVersion,setAccountVersion] = useState(1)

    return(
        <Scoped>
            <Card>
                <Radio.Group
                    style={style}
                    onChange={(e)=>setAccountVersion(e.target.value)}
                    value={accountVersion}
                    options={[
                        {
                            value: 1,
                            label: (
                                <div className="color-474F5E">游客或登录客户均可结账</div>
                            ),
                        },
                        {
                            value: 2,
                            label: (
                                <div className="color-474F5E">仅游客可结账</div>
                            ),
                        },
                        {
                            value: 3,
                            label: (
                                <div className="color-474F5E">仅限登录客户结账</div>
                            ),
                        }
                    ]}
                />
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
    .tag{
        width: 100%;
        font-size: 14px;
        margin-top:12px;
        padding: 8px 16px;
        background-color: #E2F0FF;
        .text-box{
            display: inline-block;
            width: 99%;
        }
    }
    .custom-btn{
        margin-top: 20px;
    }
`