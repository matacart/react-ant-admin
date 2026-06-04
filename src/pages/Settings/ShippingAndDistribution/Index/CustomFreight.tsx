import { history } from "@umijs/max";
import { Button, Card, Divider, Flex } from "antd";
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
                        <Button className="submit-btn" onClick={()=>history.push("/settings/logistics/add/custom")}>添加分组</Button>
                    </div>
                </Flex>
                
            </Card>
        </Scoped>
    )
}

export default CustomFreight

const Scoped = styled.div`
    margin-bottom: 20px;
`
