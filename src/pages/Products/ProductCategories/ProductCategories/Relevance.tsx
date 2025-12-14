import categories from "@/store/product/categories"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"


 function Relevance(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">店铺关联
                        <Tooltip title="分类在店铺中展示">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                </div>
                <div className="item between">
                    <span>数据关联</span>
                    <Switch onChange={(e) => {
                        categories.setCategoriesInfo({
                            ...categories.categoriesInfo,
                            is_bind: e ? 1 : 0
                        })
                    }} checked={categories.categoriesInfo.is_bind == 1?true:false}  />
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
