import { Card, Flex, Form, Input } from "antd"
import styled from "styled-components"

export default function ShopWebsiteCard(){
    return(
        <Scoped>
            <Card className="shop-website-card-title">
                <Form layout="vertical">
                    <Form.Item label={
                        <div>
                            <div className="font-w-600 color-242833">第一步，输入Shopify店铺网址</div>
                            <div className="font-12 color-7A8499 desc">进入Shopify店铺管理后台后，复制店铺名称并填写至输入框</div>
                        </div>
                    }>
                        <Flex align="center" gap={8}>
                            http://<Input className="input" />.matacart.com
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .desc{
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .input{
        width: 280px;
        height: 36px;
    }
`
    