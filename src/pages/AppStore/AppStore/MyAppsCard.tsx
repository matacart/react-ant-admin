import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Input, List, Select, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import { NailIcon } from '@/components/Icons/Icons';
import MyDropdown from '@/components/Dropdown/MyDropdown';
import { getAppStores, getDomainAppStores } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';

export default function MyAppsCard() {

  const [loading, setLoading] = useState(false);

  const [isSkeleton,setIsSkeleton] = useState(true)

  const [appList,setAppList] = useState([
    {
      appImg:"https://img.myshopline.com/image/devcenter/9999/8888/406ab03a38ad41b0b6bbd4e42734b4ee.png?w=120&h=120",
      appName:"订单票据定制助手",
      appDesc:"利用票据定制器灵活定制您的订单票据。",
    },
    {
      appImg:"https://img.myshopline.com/image/devcenter/8888/0e470e5333cc4b7193d4395a2154bfc8.png?w=120&h=120",
      appName:"在线商店",
      appDesc:"通过应用程序和主题自定义您的商店，轻松建立一个美观且安全的在线商店来展示您的品牌。",
    },
    {
      appImg:"https://img-preview.myshopline.com/image/devcenter/8888/68eec6574d7c41e1a76a3901aaae76ad.png?w=120&h=120",
      appName:"微信公众号",
      appDesc:"将店铺与微信公众号建立连接，实现即时回复粉丝消息。",
    },
    {
      appImg:"https://img-preview.myshopline.com/image/appstore/4d92d3d3bcd64732ac736cc1931755d3.png",
      appName:"商品推荐",
      appDesc:"通过强大的AI引擎，为店铺设置更符合客户画像的商品推荐组件，帮助提升客单价和销售额。",
    }
  ]);

  useEffect(()=>{
    getAppStores().then(res=>{
      // console.log(res);
      setAppList(res.data)
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setIsSkeleton(false)
    })
  },[])
  


  return (
    <Scoped>
      {isSkeleton?<SkeletonCard />:<Card classNames={{body:"card"}}>
        {/* 控制 */}
        <Flex className="control" justify='space-between' align='center'>
          <div className='font-16 color-242833'>已安装4个应用</div>
          <Flex gap={12} flex={1} justify='flex-end'>
            <Input className='control-input' placeholder="搜索应用" prefix={<SearchOutlined />} />
            <Select defaultValue={"2"} style={{width:"160px",height:"36px"}} options={[
              {
                value: '0', label: '最近使用'
              },
              {
                value: '1', label: '最近安装'
              },
              {
                value: '2', label: '最常使用'
              }
            ]} />
          </Flex>
        </Flex>
        {appList.map(item=>{
          return (
            <div className='list-item-box cursor-pointer' onClick={()=>{
              console.log(item);
            }}>
              <Flex className='list-item' justify='space-between' align='center'>
                <Flex align='center'>
                  <div className='list-item-img'>
                    <img src={item.appImg??"/icons/ProductCoverBlank.svg"} />
                  </div>
                  <div>
                    <div className='font-18 color-242833'>{item.app_name}</div>
                    <div style={{marginTop:"4px"}} className='color-7A8499'>{"item.appDesc"}</div>
                  </div>
                </Flex>
                <Flex className="list-item-controls" gap={8}>
                    <Tooltip title="将应用订到导航上">
                        <Flex justify="center" className="icon-box cursor-pointer"><NailIcon /></Flex>
                    </Tooltip>
                    <MyDropdown
                        tiggerEle={<Flex justify="center" className="icon-box cursor-pointer"><EllipsisOutlined /></Flex>}
                        menu={{
                          items:[
                            {
                              key: "1", label: (
                                  <div onClick={() => { } }>应用详情</div>
                              )
                            },
                            {
                              key: "2", label: (
                                  <div onClick={() => { } }>关于应用</div>
                              )
                            },
                            {
                              key: "3", label: (
                                  <div onClick={() => { } } className="color-FF0000">删除应用</div>
                              )
                            }
                          ]
                        }}
                    />
                </Flex>
              </Flex>
            </div>
          )
        })}
      </Card>}
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
  .list-item-box{
    padding: 0 24px;
  }
  .list-item-box:hover{
    background: #f0f7ff;
  }
  .list-item{
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #eef1f6;
    .list-item-img{
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
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