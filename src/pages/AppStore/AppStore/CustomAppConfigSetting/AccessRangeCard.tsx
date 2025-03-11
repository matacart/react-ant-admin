import { Button, Card, Tabs, TabsProps } from "antd"
import styled from "styled-components"
import AccessRangeAllCard from "./AccessRangeAllCard";
import WebHookSubscriptionTable from "./WebHookSubscriptionTable";

function AccessRangeCard(){

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '全部',
          children: <AccessRangeAllCard />,
        },
        {
          key: '2',
          label: '已选(2)',
          children: 'Content of Tab Pane 2',
        },
    ];

    return(
        <Scoped>
            <Card title="后台 API 访问范围" extra={<Button type="primary">保存</Button>}>
                <Tabs defaultActiveKey="1" items={items} onChange={()=>{}} />
            </Card>
            <Card style={{marginTop:"20px"}} title="WebHook订阅" extra={<Button type="primary">创建WebHook</Button>}>
                <WebHookSubscriptionTable />
            </Card>
        </Scoped>
    )
}

export default AccessRangeCard

const Scoped = styled.div`

`

