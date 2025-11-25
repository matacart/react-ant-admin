import styled from "styled-components"
import { Button, Card, Col, ConfigProvider, Divider, Flex, MenuProps, Pagination, Progress, Row, Spin } from 'antd';
import { RocketIcon, StarsIcon } from "@/components/Icons/Icons";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ButtonDropdownSecondary from "@/components/Dropdown/ButtonDropdownSecondary";
import DefaultButton from "@/components/Button/DefaultButton";
import { useEffect, useState } from "react";
import { getTemplateInstanceList, getTemplateInstanceUsing, setInstanceStatus } from "@/services/y2/api";
import { observer } from "mobx-react-lite";
import shopSetting, { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import dayjs from 'dayjs';
import RenameModal from "./RenameModal";
import UploadTemplateModal from "./UploadTemplateModal";
import DownloadModal from "./DownloadModal";
import { useAbortController } from "@/hooks/customHooks";
import { LoadingOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import cookie from 'react-cookies';


interface MyStylesCardProps {
  onSwitchToStore: () => void;
}

function MyStylesCard({ onSwitchToStore }: MyStylesCardProps) {

  const { createAbortController } = useAbortController();

  const [instanceUsingLoading,setInstanceUsingLoading] = useState(false);

  const [instanceListLoading,setInstanceListLoading] = useState(false);


  const themeItems: MenuProps['items'] = [
    {
      label: <a onClick={onSwitchToStore}>添加模板</a>,
      key: '1',
    },
    {
      label: <UploadTemplateModal />,
      key: '2',
    },
    {
      label: <div>从GitHub添加</div>,
      key: '3',
    }
  ];

  // 分页数据
  const [pagination,setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 5,
  });

  

  useEffect(()=>{
    // 用户模板
    getTemplateInstanceList({
      page: pagination.current,
      limit: pagination.pageSize,
      languages_id:shopSetting.languagesId,
    }).then((res:any)=>{
      if(res.data.length !== 0){
        shopSetting.setTemplateInstanceList(res.data);
        setPagination({
          ...pagination,
          total:res.count
        })
      }
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
    })
  },[pagination.current,shopSetting.languagesId]) // 依赖项添加分页参数

  // 获取当前模板
  useEffect(()=>{
    setInstanceUsingLoading(true);
    getTemplateInstanceUsing(shopSetting.languagesId).then((res:any)=>{
      shopSetting.setTemplateInstanceUsing(res.data)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setInstanceUsingLoading(false);
    })
  },[shopSetting.languagesId])

  // 处理分页变化
  const handlePageChange = (page: number, size: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: size,
    })
  };

  return (
    <Scoped>
        <Flex className="aiTipContainer">
            <div>
              <img src="/img/aiIcon.svg" />
            </div>
            <div className="color-FFFFFF aiContent">
              <h3 className="font-20">全新 AI 建站功能，闪电完成网店搭建！<span className="aiCount">限1次</span></h3>
              <p>MATACART AI建站！根据你的品类，我们提供最合适的模板，让你的网站独具特色。根据你的喜好调整色系和风格，完美展示网站个性。通过AI生成的图片和文本，让你的网站内容充满创意和吸引力。立即体验，让你的网站与众不同！</p>
            </div>
            <Flex gap={8} vertical>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                        defaultActiveBorderColor:"#d7dbe7",
                        defaultBorderColor:"#d7dbe7",
                        defaultHoverBorderColor:"#d7dbe7",
                        defaultHoverColor:"#ab71fe",
                        defaultActiveColor:"#ab71fe",
                        defaultHoverBg:"#f7f8fb",
                        defaultActiveBg:"#f7f8fb",
                        borderRadius:4
                    },
                  },
                }}
              >
                <Button className="aiBtn" icon={<StarsIcon className="font-16" style={{margin:"0 2px"}} />}>立即体验</Button>
                <Button className="aiBtn">查看过往模板</Button>
              </ConfigProvider>
            </Flex>
        </Flex>
        {/* 当前模板 */}
        <Card>
          <Flex className="current-topic-box">
            <div className="current-topic-left">
              <h2 className="font-16 title">当前模板</h2>
              <p className="des">这是当前你向客户展示的店面样式</p>
            </div>
            <div className="current-topic-right">
              <Spin spinning={instanceUsingLoading} indicator={<LoadingOutlined spin />} >
                  <Flex justify="space-between" align="center">
                    <div>
                      <h3>{shopSetting.templateInstanceUsing?.template_name}</h3>
                      <p className="font-12 color-7A8499">
                        <span>
                          当前版本：{shopSetting.templateInstanceUsing?.template_version}
                          <Divider type="vertical" />
                          语言：
                          {
                            JSON.parse(sessionStorage.getItem('languages') || "[]").find((lang:any)=>lang.id===shopSetting.templateInstanceUsing?.languages_id)?.name
                          }
                          <Divider type="vertical" />
                          上次修改时间：{dayjs(JSON.parse(shopSetting.templateInstanceUsing?.update_time || "0") * 1000).format("YYYY/MM/DD hh:mm")}
                        </span>
                      </p>
                    </div>
                    <div>
                      <Flex gap={12}>
                        <DefaultButton text="预览" onClick={()=>window.open(cookie.load("domain")?.second_domain && `https://${cookie.load("domain").second_domain}.v.matacart.com?preview=1&themeId=${shopSetting.templateInstanceUsing.template_id}`,'_blank')} />
                        <ButtonDropdownSecondary menu={{items:[
                          {
                            label: <a onClick={()=>window.open(cookie.load("domain")?.second_domain && `https://${cookie.load("domain").second_domain}.v.matacart.com`,'_blank')}>查看店铺</a>,
                            key: '1',
                          },
                          {
                            label: <div>复制</div>,
                            key: '2',
                          },
                          {
                            label: <RenameModal template={shopSetting.templateInstanceUsing} />,
                            key: '3',
                          },
                          {
                            label: <div onClick={()=>history.push(`/theme/langFieldEdit/${shopSetting.templateInstanceUsing?.template_id}`)}>编辑语言</div>,
                            key: '4',
                          },
                          {
                            label: <a onClick={()=>history.push(`/theme/codeEditor/${shopSetting.templateInstanceUsing?.id}/${shopSetting.templateInstanceUsing?.template_id}/${shopSetting.languagesId}`)}>编辑代码</a>,
                            key: '5',
                          },
                          {
                            label: <DownloadModal template={shopSetting.templateInstanceUsing} />,
                            key: '6',
                          }
                        ]}} trigger={['click']} text="操作" />
                        <PrimaryButton text="设计" onClick={()=>history.push(`/theme/editor?templateId=${shopSetting.templateInstanceUsing?.template_id}&languagesId=${shopSetting.templateInstanceUsing?.languages_id}&templateName=templates/index.json&title=Home`)} />
                      </Flex>
                    </div>
                  </Flex>
                  {/*  */}
                  <Flex className="middle" justify="center">
                    <div className="item-wrap">
                      <div className="pc">
                        <nav>
                          <div className="circle"></div>
                          <div className="circle"></div>
                          <div className="circle"></div>
                          <div className="input"></div>
                        </nav>
                        <div className="img-wrap">
                          <img src="https://img.myshopline.com/image/official/71ac683822e14c8c81dab2146ae96ca8.png" alt="https://img.myshopline.com/image/official/71ac683822e14c8c81dab2146ae96ca8.png" draggable="false" />
                        </div>
                      </div>
                      <div className="mobile">
                        <div className="img-wrap">
                          <img src="https://img.myshopline.com/image/official/bf86b9750c4c496dbb813cf16cc4fe98.png" alt="https://img.myshopline.com/image/official/bf86b9750c4c496dbb813cf16cc4fe98.png" draggable="false" />
                        </div>
                      </div>
                    </div>
                  </Flex>
              </Spin>
            </div>
          </Flex>
          {/* 在线商店速度 */}
          <Flex className="current-shop-speed-box">
            <Flex className="left" vertical justify="center">
              <h2 className="font-16 title">在线商店速度</h2>
              <p className="des">该评分显示了你的商店对于访客的加载速度</p>
            </Flex>
            <div className="right">
              <Flex gap={16} >
                <div>
                  <Progress type="dashboard" percent={0} status="normal" format={() => <span className="textPercent">-</span>} size={100} />
                </div>
                <Flex className="text-warp" justify="center" gap={8} vertical>
                  <h3 className="title color-242833 font-16">您的在线商店接入速度评分：-</h3>
                  <div className="color-356DFF"><a className="ant-typography">为什么无法显示评分？&nbsp;</a></div>
                  <p className="color-474F5E">商店速度受已安装的应用、已编辑的模板代码以及图像和视频的大小影响。</p>
                </Flex>
                <Flex align="center">
                  <DefaultButton text="查看报告" onClick={()=>history.push(`/analyse/reports/behavior/speed`)} />
                </Flex>
              </Flex>
            </div>
          </Flex>
          {/*  */}
          <Flex className="performance-warp">
            <Flex className="left" align="center">
              <h2 className="font-16">Booster插件</h2>
            </Flex>
            <div className="right performance-item">
              <Flex justify="space-between">
                <Flex align="center">
                  <RocketIcon className="font-24" />
                  <div style={{marginLeft:"12px"}}>使用性能优化Booster插件提高你的页面速度和转化率，仅需30S完成配置！</div>
                </Flex>
                <DefaultButton text="前往了解" />
              </Flex>
            </div>
          </Flex>
          {/*  */}
          <Flex className="themeList-warp">
            <div className="left">
              <h2 className="font-16">模板库</h2>
              <p className="des">管理商店可使用的其他模板</p>
              <ButtonDropdownSecondary menu={{items:themeItems}} trigger={['click']} text="添加模板" />
            </div>
            <div className="right">
              <Spin spinning={instanceUsingLoading} indicator={<LoadingOutlined spin />} >
                  {shopSetting.templateInstanceList?.map((template:TemplateInstance)=>{
                    return (
                      <Flex key={template.id} justify="space-between" className="themeList-item">
                        <Flex vertical gap={8} justify="center">
                          <div>{template.template_name}</div>
                          <div className="font-12 color-7A8499">
                            当前版本：{template.template_version}
                            <Divider type="vertical" />
                            语言：{JSON.parse(sessionStorage.getItem('languages') || "[]").find((lang:any)=>lang.id===template?.languages_id)?.name}
                            <Divider type="vertical" />
                            保存时间：{dayjs(JSON.parse(template?.create_time || "0") * 1000).format("YYYY/MM/DD hh:mm")}
                          </div>
                        </Flex>
                        <Flex gap={12}>
                          <DefaultButton text="预览" onClick={()=>window.open(cookie.load("domain")?.second_domain && `https://${cookie.load("domain").second_domain}.v.matacart.com?preview=1&themeId=${template.template_id}`,'_blank')} />
                          <ButtonDropdownSecondary 
                            menu={{
                              items:[
                                {
                                  label: <a onClick={()=>{
                                    setInstanceStatus(template.id,"1").then(async res=>{
                                      const { data } = await getTemplateInstanceUsing(shopSetting.languagesId) as any;
                                      shopSetting.setTemplateInstanceUsing(data as TemplateInstance ?? null);
                                      getTemplateInstanceList({
                                        page: pagination.current,
                                        limit: pagination.pageSize
                                      }).then((res:any)=>{
                                        if(res.data.length !== 0){
                                          shopSetting.setTemplateInstanceList(res.data);
                                          setPagination({
                                            ...pagination,
                                            total:res.count
                                          })
                                        }
                                      }).catch(err=>{
                                        console.log(err)
                                      })
                                    })
                                  }}>发布</a>,
                                  key: '1',
                                },
                                {
                                  label: <div>复制</div>,
                                  key: '2',
                                },
                                {
                                  label: <RenameModal template={template} />,
                                  key: '3',
                                },
                                {
                                  label: <div>编辑语言</div>,
                                  key: '4',
                                },
                                {
                                  label: <a onClick={()=>history.push(`/theme/codeEditor/${template?.id}/${template?.template_id}/${shopSetting.languagesId}`)}>编辑代码</a>,
                                  key: '5',
                                },
                                {
                                  label: <DownloadModal template={template} />,
                                  key: '6',
                                },
                                {
                                  label: <div className="color-F86140">删除</div>,
                                  key: '7',
                                },
                              ]
                            }} 
                            trigger={['click']} 
                            text="操作"
                          />
                          <DefaultButton text="设计" onClick={()=>history.push(`/theme/editor?templateId=${template?.template_id}&languagesId=${shopSetting?.languagesId}&templateName=templates/index.json&title=Home`)} />
                        </Flex>
                      </Flex>
                    )
                  })}
                  {/*  */}
                  <Flex style={{marginTop:"24px"}} align="center" justify="space-between">
                    <span className="ant-pagination-total-text">
                      共 {pagination.total} 条记录
                    </span>
                    <Pagination 
                      {...pagination}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </Flex>
              </Spin>
            </div>
          </Flex>
        </Card>
    </Scoped>
  )
}

const Scoped = styled.div`
    .aiTipContainer{
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background: linear-gradient(111deg, #13e2da -5.5%, #417dee 30.41%, #735cff 75.82%, #8547ff 100%);
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 12px;
      padding: 10px 50px;
      .aiContent{
        margin:0 30px;
        .aiCount{
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          height: 20px;
          padding: 2px 8px;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          color: #ab71fe;
          border-radius: 11px;
          font-size: 12px;
          line-height: 1.3;
          background: #f9f0ff;
          position: relative;
          top: -4px;
        }
      }
      .aiBtn{
        height: 36px;
        color: #ab71fe;
      }
    }
    .current-topic-left{
      width: 300px;
      .title{
        margin-top:28px;
        margin-bottom: 8px;
      }
    }
    .current-topic-right{
      min-width: 664px;
      flex: 1;
      padding: 20px;
      border: 1px solid #eef1f7;
      border-radius: 6px;
      background: #f7f8fb;
      .middle{
        margin-top: 12px;
        .item-wrap {
          position: relative;
          width: 588px;
          height: 360px;
          .pc{
            left: 0;
            width: 496px;
            /* height: 438px; */
            padding-left: 12px;
            padding-right: 12px;
            background: #fafbfc;
            position: absolute;
            top: 0;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            nav{
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              height: 26px;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              .circle {
                width: 10px;
                border-radius: 50%;
                margin-right: 8px;
                background: #eaedf1;
                height: 10px;
              }
              .input {
                background: #eaedf1;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                border-radius: 5px;
                height: 10px;
              }
            }
            .img-wrap {
              height: 324px;
              overflow: hidden;
              border-radius: 6px 6px 0 0;
              img {
                -o-object-fit: cover;
                object-fit: cover;
                width: 100%;
                min-height: 100%;
              }
            }
          }
          .mobile {
            width: 160px;
            height: 290px;
            right: 0;
            z-index: 2;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            top: 70px;
            padding: 10px;
            background: #fafbfc;
            position: absolute;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            .img-wrap {
              width: 100%;
              height: 100%;
              border-radius: 6px 6px 0 0;
              overflow: hidden;
              img {
                -o-object-fit: cover;
                object-fit: cover;
                width: 100%;
                min-height: 100%;
              }
            }
          }  
        }
      }
      
    }

    .current-shop-speed-box{
      margin-top: 48px;
      .textPercent {
        font-family: "Helvetica Neue";
        font-size: 42px;
        font-weight: 500;
        line-height: 28px;
        font-variant: normal;
        -webkit-font-feature-settings: normal;
        font-feature-settings: normal;
        color: #474f5e;
      }
      .text-warp{
        flex: 1 1 0%;
        .title{
          margin-bottom: 0px;
        }
        p{
          margin-bottom: 0;
        }
      }
    }
    .performance-warp{
      margin-top: 48px;
      h2{
        margin-bottom: 0;
      }
      .performance-item{
        padding: 20px 0;
        border-bottom: 1px solid #eef1f7;
      }
    }
    .themeList-warp{
      margin-top: 28px;
      .themeList-item{
        padding: 20px 0;
        border-bottom: 1px solid #eef1f7;
      }
    }

    .left{
      width: 300px;
      .title{
        /* margin-top:28px; */
        margin-bottom: 8px;
      }
    }
    .right{
      min-width: 664px;
      flex: 1;
      /* padding: 20px 0; */
    }

    
  
`

export default observer(MyStylesCard)