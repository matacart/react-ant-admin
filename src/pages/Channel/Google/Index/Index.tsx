import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { useState } from "react";
import styled from "styled-components";
import DomainVerificationCard from "./DomainVerificationCard";
import { Flex } from "antd";
import AdsCard from "./AdsCard";
import ProductSyncCard from "./ProductSyncCard";
import DataTrackingCard from "./DataTrackingCard";

function Index() {

  const [isSkeleton,setIsSkeleton] = useState(false);

  return (
    <Scoped>
        {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', display: 'inline-block' }}>Google</h3>
                    </div>
                </div>
                <Flex className='create-content' vertical gap={24}>
                    <DomainVerificationCard />
                    <DataTrackingCard />
                    <ProductSyncCard />
                    <AdsCard />
                </Flex>
            </div>
        </div>}
    </Scoped>
  );
}

export default Index;

const Scoped = styled.div`
.create-warp-flex{
    width: 100%;
    max-width: max(75%,1200px);
    margin: auto;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    .create-warp{
        width: 100%;
        min-width: 500px;
        .create-title{
            padding-bottom: 0px;
            color: #474f5e;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-content: center;
          .create-title-left{
            display: inline-block;
            h3 {
              -webkit-box-flex: 1;
              -ms-flex: 1;
              flex: 1;
              margin-bottom: 20px;
              overflow: hidden;
              color: #242833;
              font-size: 24px;
              font-weight: 600;
              line-height: 32px;
            }
          }
        }
    }
}
`;