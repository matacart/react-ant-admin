import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { getMarketConfigV2 } from "@/services/y2/apiSaleMarket";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

function DomainAndLang() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(false);

    useEffect(() => {
        getMarketConfigV2({
            marketId: marketId,
            languages_id: langId,
        })
    }, [])

    return (
            <Scoped>
                {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                    <div className="mc-layout">
                        <div className="mc-header">
                            <Flex className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/markets")}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div className="mc-header-left-content">{"域名和语言"}</div>
                            </Flex>
                            <Flex gap={12}>
                            </Flex>
                        </div>
                        {/* 主要内容 */}
                        <div className='mc-layout-main'>
                            <div>123</div>
                        </div>
                    </div>
                </Flex>}
            </Scoped>
        )
}

const Scoped = styled.div`
    .mc-layout-wrap{
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: '0 auto';
            .mc-header {
                color: rgb(36, 40, 51);
                font-size: 30px;
                height: 42px;
                font-weight: bold;
                margin: 8px 0px 24px;
                display: flex;
                justify-content: space-between;
                align-content: center;
                .mc-header-left-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                .mc-header-left-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }

            &-main {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 20px;
            }
        }
    }
`

export default DomainAndLang;