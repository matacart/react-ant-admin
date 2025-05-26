import { Button, Card, Divider, Flex, Form, Input, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import styled from "styled-components";

function AbstractCard() {

    const intl = useIntl();

    return (
        <Scoped>
            <Card className="card">
                <Flex style={{marginBottom:"16px"}}>
                    <div className="font-w-600 font-16">{intl.formatMessage({ id:'order.detail.convertedabstract'})}</div> 
                </Flex>
                <div style={{color:'#474F5E'}}>{"暂无此订单的任何转化详细信息。"}</div>
            </Card>  
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(AbstractCard);