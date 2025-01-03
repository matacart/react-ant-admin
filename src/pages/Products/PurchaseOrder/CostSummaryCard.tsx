import { Card, Col, Flex, Form, Row, Select } from "antd";
import styled from "styled-components";

function CostSummaryCard() {
    return(
        <Scoped>
            <Card bordered={false} title="成本摘要">
                <div className="title_box">
                    <Flex justify="space-between">
                        <div>税款</div>
                        <div className="font-w-600">US$0.00</div>
                    </Flex>
                    <div style={{marginTop: '12px'}}></div>
                    <Flex justify="space-between">
                        <div>小记</div>
                        <div className="font-w-600">US$0.00</div>
                    </Flex>
                    <div className="title_count font-14 color-7A8499">10 件商品</div>
                </div>
                {/* 成本调整 */}
                <div className="content_box">
                    <div>成本调整</div>
                </div>
                <div className="foot_box">
                    <Flex justify="space-between">
                        <div>总计</div>
                        <div className="font-w-600">US$0.00</div>
                    </Flex>
                </div>
            </Card>
        </Scoped>
    )
}

export default CostSummaryCard;

const Scoped = styled.div`
    width: 100%;
    margin-top: 20px;
    .title_box{
        .title_count{
            margin-top: 8px;
        }
    }
    .content_box{
        margin-top: 12px;
        border-bottom: 1px solid #eef1f7;
    }
    .foot_box{
        margin-top: 12px;
    }
`

