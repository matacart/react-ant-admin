// import globalStore from "@/store/globalStore"
// import newStore from "@/store/newStore"
// import { Card } from "antd"
// import { observer } from "mobx-react"
// import styled from "styled-components"

import SEOEdit from "@/components/Select/SEOEdit"
import globalStore from "@/store/globalStore"
import newStore from "@/store/newStore"
import { Card, Checkbox, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useEffect, useState } from 'react';
import oldStore from "@/store/oldStore"
import { Link } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"

 function PlatformHosting(){
    const onChange = (checked: boolean) => {
        newStore.setHostedStatus(checked?'1':'0')
    };
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">平台托管
                        <Tooltip title="客户可以将商品交给平台托管，平台会负责商品的发布、库存、价格、物流等管理，客户只需要关注商品详情页的编辑。">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                    <Link to='#'>管理</Link>
                </div>
                <div className="item between">
                    <span>托管</span>
                    {/* <Checkbox></Checkbox> */}
                    <Switch onChange={onChange} />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(PlatformHosting)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
.item{
        /* margin-bottom: 10px; */
        margin-top: 12px;
}
.between{
    display: flex;
    justify-content: space-between;
}
a{
    font-weight: 400;
}
`
