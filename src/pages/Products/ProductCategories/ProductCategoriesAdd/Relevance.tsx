import newStore from "@/store/newStore"
import { Card, Checkbox, Flex, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"
import newCategories from "@/store/categories/newCategories"


 function Relevance(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">店铺关联
                        <Tooltip title="商品在多个店铺中展示">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                </div>
                <div className="item between">
                    <span>数据关联</span>
                    <Switch onChange={(e) => {newCategories.setIsBind(e ? '1' : '0')}} checked={newCategories.isBind == '1'?true:false}  />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(Relevance)

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
