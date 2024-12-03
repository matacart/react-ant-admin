
import { Card } from "antd"
import styled from "styled-components"
import { useEffect, useState } from 'react';


 function SalesChannel(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">销售渠道</span>
                    <span className="more">
                        <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>{}}>编辑</span>
                    </span>
                </div>
                <div className="webUrl">上线于在线商店, Telegram</div>
            </Card>
        </Scoped>
    )
}
export default SalesChannel

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
a{
    font-weight: 400;
}
.webUrl{
    font-size: 12px;
}
.webTitle{
    margin-top: 4px;
    margin-bottom: 0;
    color: #101aa4;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    -webkit-line-clamp: 2;
}
.webDesc{
    margin-top: 4px;
    margin-bottom: 0;
    color: #474f5e;
    font-size: 12px;
    -webkit-line-clamp: 3;
}`

