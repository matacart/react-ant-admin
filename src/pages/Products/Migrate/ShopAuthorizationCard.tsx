import { Card, Flex, Form, Input } from "antd"
import styled from "styled-components"

export default function ShopAuthorizationCard(){
    return(
        <Scoped>
            <Card className="shop-website-card-title">
                <Form layout="vertical">
                    <div>
                        <div className="font-w-600 color-242833">第二步，获取Shopify店铺授权</div>
                        <div className="font-12 color-7A8499 desc">
                            <div>1.进入Shopify后台“应用”</div>
                            <div>2.进入“管理专有应用”</div>
                            <div>3.点击“创建专有应用”</div>
                            <div>4.首次操作需点击“创建新的专有应用”新增密钥；非首次操作可选择现有密钥</div>
                            <div>5.填写“应用详细信息”；展开“后台API”模块并将“产品”及“产品页面”设置为“读取访问权限”</div>
                            <div>6.点击“保存”并“创建应用”</div>
                            <div>7.应用创建成功后，将Shopify API密钥与密码复制至MataCart，即可完成商品迁移</div>
                        </div>
                    </div>
                    <Form.Item label="店铺密钥（API Key）">
                        <Flex align="center" gap={8}>
                            <Input className="input" />
                        </Flex>
                    </Form.Item>
                    <Form.Item label="密钥密码（Password）">
                        <Flex align="center" gap={8}>
                            <Input className="input" />
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-top: 20px;
    .desc{
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .input{
        width: 480px;
        height: 36px;
    }
`
    