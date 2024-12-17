import newStore from "@/store/newStore"
import { Card, Checkbox, Flex, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"
import newCategories from "@/store/categories/newCategories"


 function CategoriesSettings(){
    
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">分类设置
                        {/* <Tooltip title="客户可以把商品添加到精选联盟商品库，供达人选品推广">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip> */}
                    </span>
                </div>
                <div className="item between">
                    <span>启用</span>
                    <Switch onChange={(e) => {newCategories.setStatus(e ? '1' : '0')}} checked={newCategories.status == '1'?true:false}  />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(CategoriesSettings)

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
