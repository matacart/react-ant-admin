import { Button, Card, Divider, Flex, Radio, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

export default function AutomaticFailure() {


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
                                <div className="color-474F5E">无过期日期</div>
                            ),
                        },
                        {
                            value: 2,
                            label: (
                                <div className="color-474F5E">设置过期日期</div>
                            ),
                        }
                    ]}
                />
                <div className="text color-7A8499 font-12">各国家/地区对于礼品卡到期日期有着不同的法律规定。在更改此日期之前，请查阅您所在国家/地区的法律。</div>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
    .text{
        margin-top: 20px;
    }
`