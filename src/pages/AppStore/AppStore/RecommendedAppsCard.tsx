import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Flex, Input, List, Rate, Row, Select, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import { NailIcon } from '@/components/Icons/Icons';
import MyDropdown from '@/components/Dropdown/MyDropdown';
import DefaultButton from '@/components/Button/DefaultButton';

export default function RecommendedAppsCard() {
  const [loading, setLoading] = useState(false);

  const [appList,setAppList] = useState([
    {
        appImg:"https://img.myshopline.com/image/devcenter/9999/8888/3fd94ac99f174da88057d7eaecc444d8.jpeg?w=120&h=120",
        appName:"Facebook",
        appDesc:"Facebook 应用：与全球 20 亿用户互动，让您的产品被更多人发现。",
    },
    {
        appImg:"https://img.myshopline.com/image/devcenter/9999/8888/e88de6bc368546c59deb2ec83b6f14f0.jpeg?w=120&h=120",
        appName:"Google",
        appDesc:"绑定Google账户后，实现Google渠道的投放、广告ga数据上报、Google feed的内容。",
    },
    {
        appImg:"https://img.myshopline.com/image/devcenter/8888/bdd67d48a71541298b9c7b8623668f09.png?w=120&h=120",
        appName:"商品评价",
        appDesc:"店铺商品评价的管理、展示和分享，为店铺获得高影响力的真实产品评论和评级，在商品页面展示带星级评分的评论，增强顾客信任度增加商品转化。",
    },
    {
        appImg:"https://img.myshopline.com/image/devcenter/9999/8888/3e2f5d283b934f76a51ac07a93fee400.png?w=120&h=120",
        appName:"贴文销售",
        appDesc:"社媒贴文营销助手，支持多平台贴文关键字抓取下单，提升贴文营销的订单转化率！",
    },
    {
        appImg:"https://img-preview.myshopline.com/image/appstore/ca334e5d59624929b23bc8edaa50f1d0.png",
        appName:"店铺转化提升",
        appDesc:"营造店铺热销、稀缺、紧张氛围，促进下单，提升转化。",
    },
    {
        appImg:"https://img.myshopline.com/image/devcenter/9999/8888/f33c6f0fb3134a4b98a27305392e4315.jpeg?w=120&h=120",
        appName:"Telegram",
        appDesc:"MataCart X Telegram使企业能够展现自己的品牌故事并增加产品曝光度 —— 您可以在消息中心挑选商品、透过消息模板发送商品给您的顾客，为顾客提供从浏览商品到完成购物都无须离开MataCart 的原生购物体验",
    },
  ]);


  return (
    <Scoped>
      <Card classNames={{body:"card"}}>
        {/* 控制 */}
        <Flex className="control" justify='space-between' align='center'>
            <div className='font-16 color-242833'>为店铺安装最受欢迎的应用</div>
            <DefaultButton text="查看更多应用" onClick={()=>window.open("https://www.handingyun.cn/appstore")} />
        </Flex>
        <Row wrap={true} style={{ flexWrap: "wrap",padding:"12px 0"}}>
            {appList.map(item=>{
                return (
                    <Col flex="1 1 400px">
                        <Flex className='list-item cursor-pointer'>
                            <div className='list-item-img'>
                                <img src={item.appImg} />
                            </div>
                            <div style={{flex:"1"}}>
                                <div className='font-16 font-w-600 color-474F5E'>{item.appName}</div>
                                <div className='color-474F5E'>{item.appDesc}</div>
                                <Flex style={{marginTop:"8px"}} align='center'>
                                    <img src="https://s2cdn.myshopline.com/slfs/op-new/image/2023/02/28/778875/select_star.svg" />
                                    <div style={{marginLeft:"6px",marginTop:"2px"}}>4.8</div>
                                </Flex>
                                <div className='font-16 color-242833'>免费</div>
                            </div>
                        </Flex>
                    </Col>
                )
            })}
        </Row>
        
      </Card>
    </Scoped>
  );
};

const Scoped = styled.div`
    .card{
        padding: 0px;
    }

    .control{
        padding: 16px 0;
        margin: 0 24px;
        border-bottom: 1px solid #eef1f6;
        &-input{
            width: 40%;
            height: 36px;
        }
    }
    /* .list-item-box{
        padding: 0 24px;
    }
    .list-item-box:hover{
        background: #f0f7ff;
    } */
    .list-item{
        margin: 12px 24px;
        /* padding: 0px 24px; */
        .list-item-img{
            width: 48px;
            height: 48px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            margin-right: 20px;
        }

        .list-item-controls{
            .icon-box{
                font-size: 24px;
                width: 32px;
                height: 32px;
            }
            .icon-box:hover{
                width: 32px;
                height: 32px;
                border-radius: 2px;
                background-color: #e2f0ff;
            }
        }
    }
`