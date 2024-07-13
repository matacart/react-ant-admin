import { Tabs, TabsProps } from "antd"
import styled from "styled-components"

export default function MCTabs({defaultActiveKey,items,onChange}:{
    items:TabsProps['items'];
    defaultActiveKey:string;
    onChange: any;
}){ 
    return(
        <Scoped>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
        </Scoped>
    )
}

const Scoped = styled.div`
.ant-tabs-tab{
    padding: 16px 0;
    .ant-tabs-tab-btn{
        color: #242833;
        text-shadow: 0 0 .25px #242833;
    }

}
`