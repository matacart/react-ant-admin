import { Button, Card, Flex } from "antd";
import styled from "styled-components";
import { RightIcon } from "@/components/Icons/Icons";
import { history } from "@umijs/max";

function LogisticsUpdate({orderList}:{orderList:any[]}) {

    return (
        <Scoped>
            <Card title="物流更新" classNames={{body:"order-card"}} extra={<Button className="color-474F5E">查看发送场景</Button>}>
                {orderList.map(item=>{
                    return(
                        <Flex key={item.key} className="item" justify="space-between" align="center" onClick={()=>history.push(`/settings/noticeEmail/${item.key.toLowerCase()}`)}>
                            <div>
                                <div>{item.title}</div>
                                <div className="font-12 color-62708D">{item.content}</div>
                            </div>
                            <Flex align="center" gap={20}>
                                <RightIcon className="font-20" />
                            </Flex>
                        </Flex>
                    )
                })}
            </Card>
        </Scoped>
    )
}

export default LogisticsUpdate

const Scoped = styled.div`
    .order-card{
        padding: 0;
        padding-bottom: 12px;
        .item{
            padding: 12px 24px;
            border-bottom: 1px solid #eef1f7;
        }
        .item:last-child{
            border-bottom: none;
        }
        .item:hover{
            cursor: pointer;
        }
    }
`
