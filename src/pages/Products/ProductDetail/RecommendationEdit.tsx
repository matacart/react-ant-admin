import product from "@/store/product/product"
import { Card, Checkbox, Flex, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"

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
                        <span><Checkbox checked={product.productInfo.is_home == 1?true:false} onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                is_home:e.target.checked?1:0
                            })
                        }}>首页</Checkbox></span>
                        <span><Checkbox checked={product.productInfo.is_hot == 1?true:false} onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                is_hot:e.target.checked?1:0
                            })
                        }}>热销</Checkbox></span>
                        <span><Checkbox checked={product.productInfo.is_best == 1?true:false} onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                is_best:e.target.checked?1:0
                            })
                        }}>精品</Checkbox></span>
                        <span><Checkbox checked={product.productInfo.is_new == 1?true:false} onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                is_new:e.target.checked?1:0
                            })
                        }}>新品</Checkbox></span>
                    </Flex>
                </div>
            </Card>
        </Scoped>
    )
}
export default observer(RecommendationEdit)

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
