import { Card, Flex } from "antd";
import styled from "styled-components";

function AccountSettingCard(){

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between" className="title">
                    <div className="font-18 color-474F5E font-w-600">账户设置</div>
                    <div>
                        <div className="underline font-w-600 cursor-pointer">设置</div>
                    </div>
                </Flex>
                <div>管理你的账号</div>
            </Card>
        </Scoped>
    )
}

export default AccountSettingCard;

const Scoped = styled.div`
    margin-top: 20px;
    .title{
        margin-bottom: 16px;
        .underline{
            width: fit-content;
            color: #356DFF;
            border-bottom: 1px solid #356DFF;
        }
    }
`