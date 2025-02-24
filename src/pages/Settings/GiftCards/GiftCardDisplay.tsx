import { Button, Card, Divider, Flex, Radio, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

export default function GiftCardDisplay() {


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
                                <div className="color-474F5E">展示</div>
                            ),
                        },
                        {
                            value: 2,
                            label: (
                                <div className="color-474F5E">不展示</div>
                            ),
                        }
                    ]}
                />
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
`