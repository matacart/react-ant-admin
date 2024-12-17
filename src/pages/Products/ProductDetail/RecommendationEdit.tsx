import oldStore from "@/store/oldStore"
import { Card, Checkbox, Flex, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"


 function RecommendationEdit(){

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">显示位置
                        {/* <Tooltip title="客户可以把商品添加到精选联盟商品库，供达人选品推广">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip> */}
                    </span>
                </div>
                <div className="item between">
                    <Flex gap="8px 8px" wrap>
                        <span><Checkbox defaultChecked={oldStore.isHome} onChange={(e)=>{oldStore.setIsHome(e.target.checked)}}>首页</Checkbox></span>
                        <span><Checkbox defaultChecked={oldStore.isHot} onChange={(e)=>{oldStore.setIsHot(e.target.checked)}}>热销</Checkbox></span>
                        <span><Checkbox defaultChecked={oldStore.isBest} onChange={(e)=>{oldStore.setIsBest(e.target.checked)}}>精品</Checkbox></span>
                        <span><Checkbox defaultChecked={oldStore.isNew} onChange={(e)=>{oldStore.setIsNew(e.target.checked)}}>新品</Checkbox></span>
                    </Flex>
                </div>
            </Card>
        </Scoped>
    )
}
export default RecommendationEdit

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
