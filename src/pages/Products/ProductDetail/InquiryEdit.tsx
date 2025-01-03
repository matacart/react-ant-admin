import { Card, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { QuestionCircleOutlined } from "@ant-design/icons"
import oldStore from "@/store/product/oldStore"


// 询盘开关

 function InquiryEdit(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">询盘开关
                        <Tooltip title="是否允许客户询问商品">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                </div>
                <div className="item between">
                    <span>状态</span>
                    <Switch onChange={(e) => {oldStore.setInquiryStatus(e ? '1' : '0')}} checked={oldStore.inquiryStatus == '1'?true:false} />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(InquiryEdit)

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
