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


 function Winnow(){
    
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        oldStore.setAllianceStatus(checked?'1':'0')
    };

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">精选联盟
                        <Tooltip title="功能未开放">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                    <Link to='#'>编辑</Link>
                </div>
                <div className="item between">
                    <span>加入联盟</span>
                    <Switch defaultChecked={oldStore.allianceStatus == "1"?true:false} onChange={onChange} />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(Winnow)

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
