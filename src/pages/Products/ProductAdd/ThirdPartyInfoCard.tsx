import ProductThirdTripartite from "@/components/Modal/ProductThirdTripartite";
import newStore from "@/store/newStore";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";


function ThirdPartyInfoCard() {

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
                    <ProductThirdTripartite />
                </div>
                <div className="content">
                    <div>
                        <div className="between">
                            <div className="item-name">亚马逊</div>
                        </div>
                        <div className="twoLineUrl">{newStore.thirdPartyPlatform.amazonUrl==""?"未绑定":newStore.thirdPartyPlatform.amazonUrl}</div>
                    </div>
                    <div>
                        <div className="between">
                            <div className="item-name">eBay</div>
                        </div>
                        <div className="twoLineUrl">{newStore.thirdPartyPlatform.eBayUrl==""?"未绑定":newStore.thirdPartyPlatform.eBayUrl}</div>
                    </div>
                    <div>
                        <div className="between">
                            <div className="item-name">天猫</div>
                        </div>
                        <div className="twoLineUrl">{newStore.thirdPartyPlatform.tmallUrl==""?"未绑定":newStore.thirdPartyPlatform.tmallUrl}</div>
                    </div>
                    <div>
                        <div className="between">
                            <div className="item-name">AliExpress</div>
                        </div>
                        <div className="twoLineUrl">{newStore.thirdPartyPlatform.aliExpressUrl==""?"未绑定":newStore.thirdPartyPlatform.aliExpressUrl}</div>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

export default observer(ThirdPartyInfoCard)

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

