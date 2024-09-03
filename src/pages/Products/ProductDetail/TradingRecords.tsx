import { Card } from "antd"
import styled from "styled-components"

export default function TradingRecords(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">洞察</span>
                </div>
                <div className="pasttime">过去 90 日</div>
                <div className="event">过去 90 天没有成交记录。</div>
            </Card>
        </Scoped>
    )
}

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
a{
    font-weight: 400;
}
.pasttime{
    font-size: 12px;
    color:'#7A8499';
}
.event{
    font-size: 12px;
    color:'#242833';
}




`