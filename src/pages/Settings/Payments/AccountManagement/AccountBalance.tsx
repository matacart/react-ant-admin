import { ExportIcon, MistakeIcon } from "@/components/Icons/Icons";
import ErrorTag from "@/components/Tag/ErrorTag";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Divider, Flex, Table, TableProps, Tooltip } from "antd";
import styled from "styled-components";

function AccountBalance(){

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Flex className="top-card" gap={8} vertical>
                    <div>
                        <span className="font-16" style={{color:"rgba(0, 0, 0, 0.45)",marginRight:"4px"}}>港币帐户余额</span>
                        <Tooltip title="当商品参与各类促销活动时的价格">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined className="font-16 font-w-600" />
                            </span>
                        </Tooltip>
                    </div>
                    <Flex>
                        <ErrorTag text="无法收款" />
                        <ErrorTag text="无法收款" />
                        <ErrorTag text="无法收款" />
                    </Flex>
                    <div className="font-20 color-242833 font-w-600">HK$ 0</div>
                    <Divider className="divider" />

                    <Flex justify="space-between">
                        <div>
                            <span style={{color:"rgba(0, 0, 0, 0.45)"}}>包含保证金</span>
                            <Tooltip title="当商品参与各类促销活动时的价格">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined className="font-12" style={{position:"relative",top:"0px"}} />
                                </span>
                            </Tooltip>
                        </div>
                        <div style={{borderBottom:"1px dashed #4f535a"}}>
                            HK$0
                        </div>
                    </Flex>
                    <div className="underline font-w-600 cursor-pointer">
                        查看保证金记录
                    </div>
                </Flex>
                <Divider className="divider-card" />
                <div className="bottom-card">
                    <div className="font-16 color-474F5E" style={{ marginBottom: "8px" }}>即将到账</div>
                    <div className="font-16 color-474F5E">
                        <MistakeIcon />
                        <span style={{marginLeft:"4px"}}>高级验证审核中,通过后即可提款</span>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

export default AccountBalance;

const Scoped = styled.div`
    .card{
        padding: 0;
        .top-card{
            padding: 24px;
            .divider{
                margin: 8px 0;
            }
            .underline{
                width: fit-content;
                color: #356DFF;
                border-bottom: 1px solid #356DFF;
            }
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