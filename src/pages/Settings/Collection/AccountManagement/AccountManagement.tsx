import { RemitIcon } from "@/components/Icons/Icons"
import { DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Dropdown, Flex, MenuProps, message, Modal, Radio, Select, Space, Tabs, TabsProps } from "antd"
import styled from "styled-components"
import GeneralView from "./GeneralView";
import { useState } from "react";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

const { RangePicker } = DatePicker;

function AccountManagement(){


    const [isBillingStatement,setIsBillingStatement] = useState(false)

    const [billingStatementRdaio,setBillingStatementRdaio] = useState("1")

    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    
    const items: MenuProps['items'] = [
        {
          label: 'Name1',
          key: '1',
        },
        {
          label: 'Name2',
          key: '2',
        },
        {
          label: 'Name3',
          key: '3',
        },
    ];

    const tabsItems: TabsProps['items'] = [
        {
          key: '1',
          label: <div className="font-w-600 font-16">总览</div>,
          children: <GeneralView />,
        },
        {
          key: '2',
          label: <div className="font-w-600 font-16">交易记录</div>,
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: <div className="font-w-600 font-16">账单</div>,
          children: 'Content of Tab Pane 3',
        },
    ]

    return (
        <Scoped>
            <Flex justify="space-between">
                <h1 style={{fontSize:"24px"}}>MataCart Payments 帐户</h1>
                <Button className="remit-btn" onClick={()=>setIsBillingStatement(true)}>
                    <RemitIcon />
                    汇出账单报表
                </Button>
            </Flex>
            <div className="dropdown-box color-474F5E">
                <Dropdown menu={{ items, onClick, style:{width:"100%"} }} trigger={["click"]}>
                    <span onClick={(e) => e.preventDefault()}>
                        <Flex align="center" className="dropdown-item" justify="space-between">
                            LiSi
                            <DownOutlined className="font-12" />
                        </Flex>
                    </span>
                </Dropdown>
            </div>
            <div className="tabs-box">
                <Tabs defaultActiveKey="1" items={tabsItems} onChange={()=>{}} />
            </div>

            {/* 账单报表 */}
            <Modal title="汇出账单报表" centered width={640} open={isBillingStatement} okText="申请" onOk={()=>{}} onCancel={()=>setIsBillingStatement(false)}>
                <ScopedModal>
                    <div className="radio-box">
                        <Radio.Group
                            style={style}
                            onChange={(e)=>setBillingStatementRdaio(e.target.value)}
                            value={billingStatementRdaio}
                            options={[
                                { 
                                    value: "1", 
                                    label: (<div>
                                        <div>综合对账单(月)</div>
                                        <div>包含每月帐户余额详情，报表会于次月1日产生</div>
                                    </div>)
                                },
                                { 
                                    value: "2", 
                                    label: (<div>
                                        <div>交易记录</div>
                                        <div>包含各类交易记录详情,单次下载最多 92 日记录</div>
                                    </div>)
                                },
                            ]}
                        />
                    </div>
                    <Divider style={{backgroundColor:"rgb(230, 234, 240)",margin:"20px 0 0 0"}} />
                    {/* 账单月份 */}
                    {/* 交易记录 */}
                    {billingStatementRdaio == "1" ? <div className='bill-month'>
                        <div>账单月份</div>
                    </div> : <div className="transaction-record">
                            <div className="transaction-record-radio-box">
                                <Radio.Group
                                    style={style}
                                    // onChange={(e)=>setBillingStatementRdaio(e.target.value)}
                                    // value={}
                                    options={[
                                        { 
                                            value: "3", 
                                            label: (<div>
                                                <div>选择订单成立日期范围</div>
                                            </div>)
                                        },
                                        { 
                                            value: "4", 
                                            label: (<div>
                                                <div>选择订单交易日期范围</div>
                                            </div>)
                                        },
                                        { 
                                            value: "5", 
                                            label: (<div>
                                                <div>选择综合对帐单对应的交易</div>
                                            </div>)
                                        },
                                    ]}
                                />
                            </div>
                            <Flex className="transaction-record-time">
                                <Select
                                    defaultValue="0"
                                    style={{ width: 120 }}
                                    onChange={()=>{}}
                                    options={[
                                        { value: '0', label: 'UTC+8' },
                                        { value: '1', label: 'UTC+12' },
                                    ]}
                                />
                                <RangePicker />
                            </Flex>
                        <div>

                        </div>
                    </div>}
                </ScopedModal>
            </Modal>
        </Scoped>
    )
}

export default AccountManagement

const Scoped = styled.div`
    padding: 0 120px;

    .remit-btn{
        height: 36px;
    }
    .dropdown-box{
        width: 300px;
        .dropdown-item{
            height: 36px;
            font-size: 16px;
            width: 300px;
        }
    }

    .tabs-box{
        :where(.css-dev-only-do-not-override-no4izc).ant-tabs-top >.ant-tabs-nav::before{
            border-bottom: 1px solid #d3dde6;
        }
    }
    
`

const ScopedModal = styled.div`
    .radio-box{
        padding: 24px 32px;
        .ant-radio{
            position: relative;
            top: -10px;
        }
    }
    .bill-month{
        padding: 24px 32px;
    }
    .transaction-record{
        padding: 24px 32px;
    }
    .transaction-record-time{
        margin-top: 12px;
        gap: 12px;
    }
`
