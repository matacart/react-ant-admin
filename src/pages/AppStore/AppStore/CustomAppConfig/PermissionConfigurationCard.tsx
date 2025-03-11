import { history } from "@umijs/max"
import { Button, Card, Flex } from "antd"
import styled from "styled-components"

function PermissionConfigurationCard() {


    return (
        <Scoped>
            <Card>
                <Flex>
                    <div style={{flex:"1"}}>
                        <div className="font-16 color-242833">集成后台API</div>
                        <div className="474F5E" style={{marginTop:"8px"}}>使用后台 API 和 Webhook 将商店数据连接到后端服务配置</div>
                    </div>
                    <div>
                        <Button onClick={()=>history.push("/app-store/custom-app-config-setting")}>配置</Button>
                    </div>
                </Flex>
            </Card>
            <Card style={{marginTop:"20px"}}>
                <Flex>
                    <div style={{flex:"1"}}>
                        <div className="font-16 color-242833">集成店面API</div>
                        <div className="474F5E" style={{marginTop:"8px"}}>使用店面 API 创造独特的购物体验</div>
                    </div>
                    <div>
                        <Button>配置</Button>
                    </div>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default PermissionConfigurationCard

const Scoped = styled.div`


`