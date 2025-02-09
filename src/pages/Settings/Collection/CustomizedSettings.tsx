import { Button, Card, Divider, Flex, Typography } from "antd"
import styled from "styled-components"


export default function CustomizedSettings() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">定制化设置</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="payment-info">
                   <p className="color-7A8499">通过安装应用，定制收款方式的展示方式，包括隐藏、排序和重命名</p>
                </div>
                <Button className="submit-btn">访问应用商店</Button>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .desc{
        margin-top: 4px;
    }
    .submit-btn{
        margin-top: 16px;
    }
    .payment-info{
    }
`