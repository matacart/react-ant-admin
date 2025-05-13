import ProductThirdTripartite from "@/components/Modal/ProductThirdTripartite";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Switch, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import product from "@/store/product/product";


function ThirdPartyInfoEdit() {

    const setDiversion = (diversion:any) => {
        // console.log(diversion)
        product.setProductInfo({
            ...product.productInfo,
            diversion:diversion
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <div className="title">
                        绑定第三方商品
                        <Tooltip title="客户可以从商品详情页访问已绑定的第三方商品链接">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </div>
                    {product.productInfo.diversion && <ProductThirdTripartite diversion={product.productInfo.diversion} setDiversion={setDiversion} />}
                </div>
                <div className="content">
                    <div className="item between">
                        <span>绑定状态</span>
                        <Switch checked={product.productInfo.diversion?.status == 1?true:false} onChange={(e) => {
                             product.setProductInfo({
                                ...product.productInfo,
                                diversion:{
                                    ...product.productInfo.diversion,
                                    status:e?1:0
                                }
                            })
                        }} />
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

export default observer(ThirdPartyInfoEdit)

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
.between{
    display:flex;
    justify-content: space-between;
}
.content{
    display:flex;
    flex-direction: column;
    gap: 15px;
}
/* a{
    font-weight: 400;
} */
.item-name{
    color: #242833;
    margin-bottom: 8px;
}
.twoLineUrl{
    color: #7a8499;
}

`


