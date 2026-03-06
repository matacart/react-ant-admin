import React, { useEffect, useRef, useState } from 'react';
import { Divider, Flex, Form } from 'antd';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import SEOSetupCard from './SEOSetupCard';
import { ExportOutlined } from '@ant-design/icons';
import OnlineShopPasswordCard from './OnlineShopPasswordCard';
import SocialSharingPicturesCard from './SocialSharingPicturesCard';
import EventTraceCard from './EventTraceCard';
import IPAddressAccessCard from './IPAddressAccessCard';
import RobotsFileManagementCard from './RobotsFileManagementCard';
import SitemapFileManagementCard from './SitemapFileManagementCard';
import { useSleep } from '@/hooks/customHooks';
import { getHomeSeo, getIPAddressAccessList, getIPRegionBlackList, getProtectionPassWord, getSitemapList, getSitemapStatus, getSocialPicture, updateProtectionPassWord } from '@/services/y2/api';
import cookie from 'react-cookies';
import preferences from '@/store/channel/preferences/preferences';
import CustomerPrivacyCard from './CustomerPrivacyCard';
import BlacklistAreaCard from './BlacklistAreaCard';

function Preferences(){

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [isRenewal,setIsRenewal] = useState(false);

    const lang = cookie.load("shop_lang");

    // 获取首页SEO
    const getSeo = ()=>{
        return getHomeSeo({
            languages_id:lang,
        }).then(res=>{
            res.code == 0 && preferences.setHomeSEO(res.data);
        })
    }

    // 密码保护
    const getPassWord = ()=>{
        return getProtectionPassWord().then(res=>{
            res.code == "SUCCESS" && preferences.setPassWord(res.data);
        })
    }

    // IP地址访问名单列表
    const getIPAccessList = ()=>{
        return getIPAddressAccessList({
            page:1,
            limit:10,
        }).then(res=>{
            res.code == 0 && preferences.setIPAddressAccessList({
                data:res.data.list,
                total:res.data.total,
            });
        })
    }

    // IP区域访问限制名单列表
    const getIPBlackList = ()=>{
        return getIPRegionBlackList({
            page:1,
            limit:10,
        }).then(res=>{
            res.code == 0 && preferences.setIPBlackList({
                data:res.data.list,
                total:res.data.total,
            });
        })
    }
    

    // 站点地图
    const getSitemap = ()=>{
        return getSitemapStatus().then(res=>{
            res.code == 0 && preferences.setSitemapStatus({
                active: res.data.sitemap_enabled == "1" ? "on" : "off",
            });
        })
    }

    // 站点地图文件管理
    const getSitemapFileList = ()=>{
        return getSitemapList().then(res=>{
            res.code == 0 && preferences.setSitemapFileList(res.data.list);
        })
    }

    // 社交图片
    const getSocialPictures = ()=>{
        return getSocialPicture().then(res=>{
            // console.log(res);
            res.code == 0 && preferences.setSocialPicture(res.data.picture_url);
        })
    }

    const updatePassWord = ()=>{
        setIsRenewal(true)
        updateProtectionPassWord({
            gdprState:preferences.passWord.gdprState,
            switchEnable:preferences.passWord.switchEnable,
            password:preferences.passWord.password
        }).then(res=>{
            console.log(res);
        }).catch(()=>{
        }).finally(()=>{
            setIsRenewal(false)
        })
    }

    useEffect(()=>{
        const init = async()=>{
            await Promise.all([
                getSeo(),
                getPassWord(),
                getSitemap(),
                getSitemapFileList(),
                getIPAccessList(),
                getIPBlackList(),  
                getSocialPictures(),
            ])
            setIsSkeleton(false);
        }
        init();
        // 组件卸载时
        return ()=>{
            preferences.reset();
        }
    },[])

  return (
    <Scoped>
        {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <div className='create-title-left'>
                        <h3>偏好设置</h3>
                    </div>
                </div>
                <div className='create-content'>
                    {/* SEO设置 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">SEO设置</div>
                                <p className="font-14 color-474F5E desc line-h-20">优化标题和描述有助于您的商店在搜索引擎上的表现。</p>
                            </div>
                            <div className="create-content-content-right">
                                <SEOSetupCard />
                            </div>
                        </div>
                    </div>
                    {/* 客户隐私 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">客户隐私</div>
                                <p className="font-14 color-474F5E desc line-h-20">让您的客户自行控制其数据。针对欧洲国家的客户，需要先获得他们的授权，只能使用允许授权的客户的数据信息。</p>
                            </div>
                            <div className="create-content-content-right">
                                <CustomerPrivacyCard />
                            </div>
                        </div>
                    </div>
                    {/* 网店密码 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">网店密码</div>
                                <p className="font-14 color-474F5E desc line-h-20">限制在线商店访问范围，只有拥有密码的客户才能访问。<br/><a>了解网店密码保护设定<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="create-content-content-right">
                                <OnlineShopPasswordCard />
                            </div>
                        </div>
                    </div>
                    {/* 社交分享图片设置 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">社交分享图片设置</div>
                                <p className="font-14 color-474F5E desc line-h-20">当您在社交媒体上分享商店链接时，通常会显示您的商店主题logo图片。如果没有相关图片可用，将使用此图片。
                                    <br/><a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a>
                                </p>
                            </div>
                            <div className="create-content-content-right">
                                <SocialSharingPicturesCard />
                            </div>
                        </div>
                    </div>
                    {/* 事件追踪 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">事件追踪</div>
                                <p className="font-14 color-474F5E desc line-h-20">添加不同渠道的统计代码，跟踪店铺流量及访客行为，更好地分析用户和营销。</p>
                            </div>
                            <div className="create-content-content-right">
                                <EventTraceCard />
                            </div>
                        </div>
                    </div>
                    {/* 访问限制地区黑名单 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">访问限制地区黑名单</div>
                                <p className="font-14 color-474F5E desc line-h-20">黑名单地区的用户访问网店时，将统一以打烊页承接。</p>
                            </div>
                            <div className="create-content-content-right">
                                <BlacklistAreaCard />
                            </div>
                        </div>
                    </div>
                    {/* IP地址访问黑/白名单 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">IP地址访问黑/白名单</div>
                                <p className="font-14 color-474F5E desc line-h-20">设置限制访问网店的IP地址，或对指定IP地址允许访问。</p>
                            </div>
                            <div className="create-content-content-right">
                                <IPAddressAccessCard />
                            </div>
                        </div>
                    </div>
                    {/* Robots.txt管理 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">Robots.txt管理</div>
                                <p className="font-14 color-474F5E desc line-h-20">您可以编辑robots.txt文件，让搜索引擎知道要索引哪些页面网站。</p>
                            </div>
                            <div className="create-content-content-right">
                                <RobotsFileManagementCard />
                            </div>
                        </div>
                    </div>
                    {/* Sitemap.xml管理 */}
                    <div className='create-content-main'>
                        <div className='create-content-content'>
                            <div className="create-content-content-left">
                                <div className="font-20 color-242833 font-w-600">Sitemap.xml管理</div>
                                <p className="font-14 color-474F5E desc line-h-20">Sitemap能够确保了您的网站内容能够及时被搜索引擎发现和索引。请谨慎关闭默认站点地图文件，可能会出现搜索引擎蜘蛛无法通过sitemap爬行，影响在搜索结果中的排名和可见性。若需上传自定义Sitemap文件，推荐<a target="_blank" href="https://technicalseo.com/tools/xml-sitemap/"> 点击此处 </a>去生成。</p>
                            </div>
                            <div className="create-content-content-right">
                                <SitemapFileManagementCard />
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <Divider style={{ fontSize: '14px',lineHeight: '20px',textAlign: 'center',color: '#666',fontWeight: '500',}}orientationMargin="3em" />
                    <Flex justify="end">
                        <PrimaryButton loading={isRenewal} onClick={updatePassWord} text="更新" />
                    </Flex>
                </div>
            </div>
        </div>}
    </Scoped>
    
  );
}

export default Preferences;


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
              margin-bottom: 4px;
              overflow: hidden;
              color: #242833;
              font-size: 24px;
              font-weight: 600;
              line-height: 32px;
            }
          }
          .create-title-right{
            display: inline-block;
          }
        }
        .create-content{
            margin-top: 24px;
            &-main {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 20px;
            }
            &-content {
                flex: 9;
                min-width: 510px;
                display: flex;
                gap:20px;
                &-left{
                    flex: 1;
                    min-width: 0;
                    margin-right: 20px;
                    .desc{
                        margin-top: 8px;
                    }
                }
                &-right{
                    flex: 2;
                    min-width: 0;
                    .availableLocation_box{
                        padding: 12px 0;
                        border-bottom: 1px solid #EEF1F7;
                        cursor: pointer;
                        .availableLocation{
                            margin-right: 12px;
                            background-color: #F7F8Fb;
                            border-radius: 4px;
                            border: 1px solid #EEF1F7;
                        }
                    }
                    .availableLocation_box:hover{
                        background-color: #F7F8Fb;
                    }
                }
            }
        }
    }
}
`;



