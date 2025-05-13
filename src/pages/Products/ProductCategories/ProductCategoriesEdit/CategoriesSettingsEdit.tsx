import categories from "@/store/product/categories"
import { Card, Switch } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

 function CategoriesSettingsEdit(){
    
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">分类设置</span>
                </div>
                <div className="item between">
                    <span>启用</span>
                    <Switch onChange={(e) => {
                        categories.setCategoriesInfo({
                            ...categories.categoriesInfo,
                            status: e ? 1 : 0
                        })
                    }} checked={categories.categoriesInfo.status == 1?true:false}  />
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(CategoriesSettingsEdit)

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
