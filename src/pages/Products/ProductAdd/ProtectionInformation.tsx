// import globalStore from "@/store/globalStore"
// import newStore from "@/store/newStore"
// import { Card } from "antd"
// import { observer } from "mobx-react"
// import styled from "styled-components"

import SEOEdit from "@/components/Select/SEOEdit"
import globalStore from "@/store/globalStore"
import newStore from "@/store/newStore"
import { Card, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useEffect, useState } from 'react';
import oldStore from "@/store/oldStore"
import { Link } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"
import ProductDefenseModal from "@/components/Modal/ProductDefenseModal"


 function ProtectionInformation(){
    
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">防护信息
                        <Tooltip title="用于广告优化">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                    <ProductDefenseModal data={newStore} status={newStore.adWafStatus} />
                </div>
                <div className="item between">
                    <span>防护开关</span>
                    <Switch onChange={(e) => {newStore.setAdWafStatus(e ? '1' : '0')}} checked={newStore.adWafStatus == '1'?true:false} />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(ProtectionInformation)

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
