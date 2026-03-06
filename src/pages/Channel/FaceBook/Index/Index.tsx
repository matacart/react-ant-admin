import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { Card, Flex } from "antd";
import { useState } from "react";
import styled from "styled-components";
import IndexCard from "./IndexCard";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { history } from "@umijs/max";

function Index() {

  const [isSkeleton,setIsSkeleton] = useState(false);

  return (
    <Scoped>
        {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', display: 'inline-block' }}>Facebook</h3>
                    </div>
                </div>
                <div className='create-content'>
                    <IndexCard
                      name="网域验证"
                      title="声明网域所有权"
                      description="拥有网域所有权，您就可以控制链接和其他内容的编辑权限，避免网域遭到违规使用，防止不良行为者传播错误信息。"
                      icon="/img/facebook-website.svg"
                      footer={<Flex gap={12}>
                        <DefaultButton text={"了解详情"} />
                        <PrimaryButton text={"前往设置"} onClick={()=>history.push("/channels/facebook/settings/website")} />
                      </Flex>}
                    />
                    <IndexCard
                      name="数据追踪"
                      title="连接 Pixel 和 Conversion API 完成数据追踪"
                      description="添加 Website Pixel 可以把您店铺的转化事件上报到 Meta。Conversion API 可以补全 Pixel 丢失的数据，提升广告效果。根据 Meta 研究，Conversion API 可多获取13%的转化事件。"
                      icon="/img/facebook-dataTrack.svg"
                      footer={<Flex gap={12}>
                        <DefaultButton text={"了解详情"} />
                        <PrimaryButton text={"前往设置"} onClick={()=>history.push("/channels/facebook/settings/tracking")} />
                      </Flex>}
                    />
                    <IndexCard
                      name="广告投放"
                      title="借助 Facebook 广告扩大客户群"
                      description="使用广告管理工具，轻松完成账户开通、投放配置、效果跟踪、财务对账等操作。Facebook Ads Manager 为 Facebook 原生的专业投放工具。"
                      icon="/img/facebook-ads.svg"
                      footer={<Flex gap={12}>
                        <DefaultButton text={"原生广告工具"} onClick={()=>window.open("https://adsmanager.facebook.com/adsmanager/manage/")} />
                      </Flex>}
                    />
                    <IndexCard
                      name="社群营销"
                      title="通过 Messenger 与客户沟通并销售产品"
                      description="轻松管理多个粉丝主页的Messenger和Instagram消息、贴文内容。"
                      icon="/img/facebook-social.svg"
                      footer={<Flex gap={12}>
                        <DefaultButton text={"了解详情"} />
                        <PrimaryButton text={"前往设置"} onClick={()=>history.push("/channels/facebook/settings/social")} />
                      </Flex>}
                    />
                </div>
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
        .create-content{
            
        }
    }
}
`;