import { Card, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { QuestionCircleOutlined } from "@ant-design/icons"
import product from "@/store/product/product"

 function RelevanceEdit(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">店铺关联
                        <Tooltip title="商品在店铺中展示">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </span>
                </div>
                <div className="item between">
                    <span>数据关联</span>
                    <Switch checked={product.productInfo.is_bind == 1?true:false} onChange={(checked) => {
                        product.setProductInfo({
                            ...product.productInfo,
                            is_bind:checked?1:0
                        })
                    }}/>
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(RelevanceEdit)

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
