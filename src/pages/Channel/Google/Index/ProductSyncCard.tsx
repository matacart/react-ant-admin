import DefaultButton from "@/components/Button/DefaultButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import styled from "styled-components";

function ProductSyncCard() {
    return (
        <MyCard
            styles={{
                body: {
                    padding: 0,
                }
            }}
        >
            <div className="header">
                <Flex justify="space-between" align="center">
                    <div>
                        <Flex gap={4} align="center" className="title font-16 font-w-500" style={{height:"28px"}}>
                            <div>商品同步</div>
                            <Flex className="more" gap={4}>
                                <QuestionCircleOutlined />
                                <span className="more-text font-12 color-474F5E">了解详情</span>
                            </Flex>
                        </Flex>
                        <div className="color-474F5E">将您的商品同步到 Google Merchant Center，通过 购物广告 和 Free Listings 等向全球买家展示您的商品。</div>
                    </div>
                </Flex>
            </div>
            <div className="list">
                <Flex className="list-item" justify="space-between" align="center">
                    <Flex align="center" gap={12}>
                        <div>
                            <img style={{width:"32px",height:"32px"}} src="/img/smartfeed_logo.svg" alt="" />
                        </div>
                        <div>
                            <div className="font-w-500" style={{marginBottom:"4px"}}>Smart Feed</div>
                            <div className="color-474F5E">高效且便捷的智能Feed管理工具。</div>
                        </div>
                    </Flex>
                    <DefaultButton text="立即使用" />
                </Flex>
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .header{
        padding: 24px;
        .title{
            margin-bottom: 8px;
        }
        .more{
            cursor: pointer;
            &-text{
                display: none;
            }
            &:hover{
                .more-text{
                    display: inline;
                }
                padding: 4px 8px;
                border-radius: 12px;
                background-color: #fff;
                -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
            }
        }
    }
    .list{
        &-item{
            padding: 24px;
            border-top: 1px solid #eef1f6;
        }
    }
    
`;

export default ProductSyncCard;
