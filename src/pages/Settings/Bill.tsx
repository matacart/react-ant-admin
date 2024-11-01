import BackButton from "@/components/Button/BackButton";
import BillList from "@/components/List/BillList";
import CommissionFlowList from "@/components/List/CommissionFlowList";
import MCTabs from "@/components/Tabs/MCTabs";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tabs, TabsProps } from "antd";
import styled from "styled-components";


const exportBtnItems: MenuProps['items'] = [
    {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const onChange = (key: string) => {
    console.log(key);
  };
  
  const PageItems: TabsProps['items'] = [
    {
      key: '1',
      label: '账单列表',
      children: <BillList/>,
    },
    {
      key: '2',
      label: '佣金流水',
      children: <CommissionFlowList/>,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
export default function Bill() {

    return (
        <Scoped>
            <div className="bill-wrap">
                <div className="header">
                    <BackButton />
                    <span className="titleText">
                        我的账单
                    </span>
                    <span className="exportBtn">
                        <Dropdown menu={{ items:exportBtnItems }} trigger={['click']}>
                            <Space size={4}>
                                <UploadOutlined style={{ fontSize: '20px' }} />
                                导出账单
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </span>
                </div>
                <div className="body">
                <MCTabs defaultActiveKey="1" items={PageItems} onChange={onChange} />
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
.bill-wrap{
    margin:auto;
    width: 90vw;
    max-width: 1220px;
}
.header{
    display: flex;
    align-content: center;
    margin: 24px 0;
    .titleText{
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        margin:0 16px 0 10px;
        color: #242833;
        font-size: 30px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.35;
        line-height: 28px;
        margin-bottom: 0;
    }
    .exportBtn{
        display: flex;
        align-content: center;  
        flex-wrap: wrap;
        cursor: pointer;
    }
}
.body{
    background-color:white;
    padding: 0 24px;
    .ant-tabs-tab{
        padding: 16px 0;
        cursor: pointer;
        font-size: 16px;
        line-height:22px;
    }
}
`