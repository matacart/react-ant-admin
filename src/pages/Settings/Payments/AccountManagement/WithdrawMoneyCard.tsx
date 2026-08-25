import { ExportIcon, MistakeIcon } from "@/components/Icons/Icons";
import ErrorTag from "@/components/Tag/ErrorTag";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Divider, Flex, Table, TableProps, Tooltip } from "antd";
import styled from "styled-components";

function WithdrawMoneyCard(){

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Flex className="top-card" gap={8} vertical>
                    <div className="font-20 color-242833 font-w-600">完成验证来提款</div>
                    <div className="font-14 color-474F5E">
                        使用 MataCart Payments 付款的订单收入会累积在提款中心，完成高级验证后会自动提款到你的指定银行。
                    </div>
                </Flex>
                <Divider className="divider-card" />
                <div className="bottom-card">
                    <div className="font-16 color-474F5E">当前用户尚未绑定银行卡</div>
                </div>
            </Card>
        </Scoped>
    )
}

export default WithdrawMoneyCard;

const Scoped = styled.div`
    margin-top: 20px;
    .card{
        padding: 0;
        .top-card{
            padding: 24px;
            
        }
        .divider-card{
            margin: 0;
            background-color: rgb(211, 221, 230);
        }
        .bottom-card{
            padding: 24px;
        }
    }
    
`