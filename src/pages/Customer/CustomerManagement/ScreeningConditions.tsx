import DefaultButton from "@/components/Button/DefaultButton";
import { AdvancedModeIcon, CrowdSecondIcon, CustomerInformationIcon, FillCollectionIcon, GroupingModeIcon, MetaFieldIcon, PromotionIcon, ScreeningIcon, SearchSecondIcon, ShopIcon, ShoppingIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import cousomerManagement from "@/store/customer/cousomerManagement";
import { ConfigProvider, Flex, Menu, MenuProps, Popover, Tooltip } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";


type MenuItem = Required<MenuProps>['items'][number];

function ScreeningConditions(){

    const Ref = useRef(null)

    const [open,setOpen] = useState(false);

    // 添加RFM
    const addRFMValue = (value:string)=>{
      cousomerManagement.setConditionList([
        ...cousomerManagement.conditionList,
        {
          type:'checkedGroup',
          condition:[{
            label:"RFM价值",
            options:[
              { label : "重要价值客户", value : "重要价值客户",tip:"最近一次消费时间、消费频率、消费金额都高于均值的客户，是价值最高的客户"},
              { label : "重要挽留客户", value : "重要挽留客户",tip:"消费金额高于均值，但消费时间、消费频率低于均值，是需要重点挽留的客户"},
              { label : "重要发展客户", value : "重要发展客户",tip:"最近一次消费时间、消费金额高于均值，但消费频率低于均值，是需要重点发展其购买频率"},
              { label : "重要保持客户", value : "重要保持客户",tip:"消费频率、消费金额高于均值，但最近一次消费时间低于均值的客户，需要重点保持"},
              { label : "一般价值客户", value : "一般价值客户",tip:"最近一次消费时间、消费频率高于均值，但消费金额低于均值的客户"},
              { label : "一般挽留客户", value : "一般挽留客户",tip:"最近一次消费时间、消费频率、消费金额都低于均值的客户"},
              { label : "一般发展客户", value : "一般发展客户",tip:"最近一次消费时间高于均值，但消费频率、消费金额都低于均值的客户"},
              { label : "一般保持客户", value : "一般保持客户",tip:"消费频率高于均值，但最近一次消费时间、消费金额都低于均值的客户"},
            ],
            selectOptions:[value]
          }]
        }
      ])
      setOpen(false)
    }

    const items: MenuItem[] = [
      {
        key: 'sub1',
        icon: <FillCollectionIcon style={{fontSize:"16px"}} />,
        label: <div>重点运营</div>,
        children: [
          {
            key: '1-1',
            label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"select",
                  condition:[{
                    label:"重点运营",
                    options:[
                      { label : "近30天加购未下单客户", value : "近30天加购未下单客户",tip:""},
                      { label : "订阅邮件30天内未下单客户", value : "订阅邮件30天内未下单客户",tip:""},
                      { label : "高价值客户", value : "高价值客户",tip:"消费金额高于店铺平局水平的客户"},
                      { label : "近期活跃客户", value : "近期活跃客户",tip:"近30天登录过的已订阅的客户"},
                      { label : "复购人群", value : "复购人群",tip:"近90天下过单且累计消费次数大于1的已订阅客户"},
                    ],
                    selectOptions:["近30天加购未下单客户"]
                  }]
                }
              ])
              setOpen(false)
            }}>近30天加购未下单客户</a>,
          },
          {
            key: '1-2',
            label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"select",
                  condition:[{
                    label:"重点运营",
                    options:[
                      { label : "近30天加购未下单客户", value : "近30天加购未下单客户",tip:""},
                      { label : "订阅邮件30天内未下单客户", value : "订阅邮件30天内未下单客户",tip:""},
                      { label : "高价值客户", value : "高价值客户",tip:"消费金额高于店铺平局水平的客户"},
                      { label : "近期活跃客户", value : "近期活跃客户",tip:"近30天登录过的已订阅的客户"},
                      { label : "复购人群", value : "复购人群",tip:"近90天下过单且累计消费次数大于1的已订阅客户"},
                    ],
                    selectOptions:["订阅邮件30天内未下单客户"]
                  }]
                }
              ])
              setOpen(false)
            }}>订阅邮件30天内未下单客户</a>,
          },
          {
            key: '1-3',
            label: <Tooltip placement="top" title={"消费金额高于店铺平局水平的客户"}>
              <a onClick={()=>{
                cousomerManagement.setConditionList([
                  ...cousomerManagement.conditionList,
                  {
                    type:"select",
                    condition:[{
                      label:"重点运营",
                      options:[
                        { label : "近30天加购未下单客户", value : "近30天加购未下单客户",tip:""},
                        { label : "订阅邮件30天内未下单客户", value : "订阅邮件30天内未下单客户",tip:""},
                        { label : "高价值客户", value : "高价值客户",tip:"消费金额高于店铺平局水平的客户"},
                        { label : "近期活跃客户", value : "近期活跃客户",tip:"近30天登录过的已订阅的客户"},
                        { label : "复购人群", value : "复购人群",tip:"近90天下过单且累计消费次数大于1的已订阅客户"},
                      ],
                      selectOptions:["高价值客户"]
                    }]
                  }
                ])
                setOpen(false)
              }}>高价值客户</a>
            </Tooltip>,
          },
          {
            key: '1-4',
            label: <Tooltip placement="top" title={"近30天登录过的已订阅的客户"}>
            <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"select",
                  condition:[{
                    label:"重点运营",
                    options:[
                      { label : "近30天加购未下单客户", value : "近30天加购未下单客户",tip:""},
                      { label : "订阅邮件30天内未下单客户", value : "订阅邮件30天内未下单客户",tip:""},
                      { label : "高价值客户", value : "高价值客户",tip:"消费金额高于店铺平局水平的客户"},
                      { label : "近期活跃客户", value : "近期活跃客户",tip:"近30天登录过的已订阅的客户"},
                      { label : "复购人群", value : "复购人群",tip:"近90天下过单且累计消费次数大于1的已订阅客户"},
                    ],
                    selectOptions:["近期活跃客户"]
                  }]
                }
              ])
              setOpen(false)
            }}>近期活跃客户</a>
          </Tooltip>
          },
          {
            key: '1-5',
            label: <Tooltip placement="top" title={"近90天下过单且累计消费次数大于1的已订阅客户"}>
              <a onClick={()=>{
                cousomerManagement.setConditionList([
                  ...cousomerManagement.conditionList,
                  {
                    type:"select",
                    condition:[{
                      label:"重点运营",
                      options:[
                        { label : "近30天加购未下单客户", value : "近30天加购未下单客户",tip:""},
                        { label : "订阅邮件30天内未下单客户", value : "订阅邮件30天内未下单客户",tip:""},
                        { label : "高价值客户", value : "高价值客户",tip:"消费金额高于店铺平局水平的客户"},
                        { label : "近期活跃客户", value : "近期活跃客户",tip:"近30天登录过的已订阅的客户"},
                        { label : "复购人群", value : "复购人群",tip:"近90天下过单且累计消费次数大于1的已订阅客户"},
                      ],
                      selectOptions:["复购人群"]
                    }]
                  }
                ])
                setOpen(false)
              }}>复购人群</a>
            </Tooltip>
          },
        ],
      },
      {
        key: 'sub2',
        icon: <CrowdSecondIcon style={{fontSize:"16px"}} />,
        label: '客户价值',
        children: [
          {
            key: '2-1',
            label: <Tooltip placement="top" title={"最近一次消费时间、消费频率、消费金额都高于均值的客户，是价值最高的客户"}>
              <a onClick={()=>addRFMValue("重要价值客户")}>重要价值客户</a>
            </Tooltip>,
          },
          {
            key: '2-2',
            label: <Tooltip placement="top" title={"消费金额高于均值，但消费时间、消费频率低于均值，是需要重点挽留的客户"}>
              <a onClick={()=>addRFMValue("重要挽留客户")}>重要挽留客户</a>
            </Tooltip>,
          },
          {
            key: '2-3',
            label: <Tooltip placement="top" title={"最近一次消费时间、消费金额高于均值，但消费频率低于均值，是需要重点发展其购买频率"}>
              <a onClick={()=>addRFMValue("重要发展客户")}>重要发展客户</a>
            </Tooltip>,
          },
          {
            key: '2-4',
            label: <Tooltip placement="top" title={"消费频率、消费金额高于均值，但最近一次消费时间低于均值的客户，需要重点保持"}>
              <a onClick={()=>addRFMValue("重要保持客户")}>重要保持客户</a>
            </Tooltip>,
          },
          {
            key: '2-5',
            label: <Tooltip placement="top" title={"最近一次消费时间、消费频率高于均值，但消费金额低于均值的客户"}>
              <a onClick={()=>addRFMValue("一般价值客户")}>一般价值客户</a>
            </Tooltip>,
          },
          {
            key: '2-6',
            label: <Tooltip placement="top" title={"最近一次消费时间、消费频率、消费金额都低于均值的客户"}>
              <a onClick={()=>addRFMValue("一般挽留客户")}>一般挽留客户</a>
            </Tooltip>,
          },
          {
            key: '2-7',
            label: <Tooltip placement="top" title={"最近一次消费时间高于均值，但消费频率、消费金额都低于均值的客户"}>
              <a onClick={()=>addRFMValue("一般发展客户")}>一般发展客户</a>
            </Tooltip>,
          },
          {
            key: '2-8',
            label: <Tooltip placement="top" title={"消费频率高于均值，但最近一次消费时间、消费金额都低于均值的客户"}>
              <a onClick={()=>addRFMValue("一般保持客户")}>一般保持客户</a>
            </Tooltip>,
          },
        ],
      },
      {
        key: 'sub3',
        label: '基础信息',
        icon: <CustomerInformationIcon style={{fontSize:"16px"}} />,
        children: [
          { key: '3-1', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"checkedGroup",
                condition:[{
                  label:"邮箱订阅状态",
                  options:[
                    { label : "已订阅", value : "已订阅",tip:""},
                    { label : "未订阅", value : "未订阅",tip:""},
                    { label : "已取消订阅", value : "已取消订阅",tip:""},
                    { label : "订阅确认中", value : "订阅确认中",tip:""},
                    { label : "无效", value : "无效",tip:""},
                  ],
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>邮箱订阅状态</a> },
          { key: '3-2', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"checkedGroup",
                condition:[{
                  label:"短信订阅状态",
                  options:[
                    { label : "已取消订阅", value : "已取消订阅",tip:""},
                    { label : "已订阅", value : "已订阅",tip:""},
                    { label : "未订阅", value : "未订阅",tip:""},
                  ],
                  selectOptions:[]
                }]
              },
            ])
            setOpen(false)
          }}>短信订阅状态</a> },
          { key: '3-3', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"checkedGroup",
                condition:[{
                  label:"客户状态",
                  options:[
                    { label : "已注册", value : "已注册",tip:""},
                    { label : "黑名单", value : "黑名单",tip:""},
                    { label : "待邀请", value : "待邀请",tip:""},
                    { label : "已邀请", value : "已邀请",tip:""},
                  ],
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>客户状态</a> },
          { key: '3-4', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"date",
                condition:[{
                  label:"客户加入日期",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>客户加入日期</a> },
          { key: '3-5', label: <a onClick={()=>{
            // 查询邮箱域名
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"checkedGroupSearch",
                condition:[{
                  label:"邮箱域名",
                  options:[
                    { label : "@gmail.com", value : "@gmail.com",tip:""},
                    { label : "@yahoo.com", value : "@yahoo.com",tip:""},
                    { label : "@hotmail.com", value : "@hotmail.com",tip:""},
                  ],
                  selectOptions:[]
                }]
              },
            ])
            setOpen(false)
          }}>邮箱域名</a> },
          { key: '3-6', label: <a onClick={()=>{
            // 查询邮箱域名
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"checkedGroupSearch",
                condition:[{
                  label:"客户语言",
                  options:[
                    { label : "英语", value : "英语",tip:""},
                    { label : "简体中文", value : "简体中文",tip:""},
                  ],
                  selectOptions:[]
                }]
              },
            ])
            setOpen(false)
          }}>客户语言</a> },
          { key: '3-7', label: <a onClick={()=>{
            // 查询邮箱域名
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"modal",
                condition:[{
                  label:"地址",
                  selectOptions:[]
                }]
              },
            ])
            setOpen(false)
          }}>地址</a> },
          { key: '3-8', label: <a onClick={()=>{
            // 查询邮箱域名
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"checkedGroupSearch",
                condition:[{
                  label:"客户标签",
                  options:[],
                  selectOptions:[]
                }]
              },
            ])
            setOpen(false)
          }}>客户标签</a> },
          { key: '3-9', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"date",
                condition:[{
                  label:"客户注册日期",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>客户注册日期</a> },
        ],
      },
      {
        key: 'sub4',
        label: '购物特征',
        icon: <ShoppingIcon style={{fontSize:"16px"}} />,
        children: [
          { key: '4-1', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"productsAndDate",
                condition:[
                  {
                    label:"购买过指定商品",
                    options:[],
                    selectOptions:[]
                  },
                  {
                    label:"下单时间",
                    options:[],
                    selectOptions:[]
                  }
                ]
              }
            ])
            setOpen(false)
          }}>购买过指定商品</a> },
          { key: '4-2', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"productsAndDate",
                condition:[
                  {
                    label:"浏览过指定商品",
                    options:[],
                    selectOptions:[]
                  },
                  {
                    label:"浏览时间",
                    options:[],
                    selectOptions:[]
                  }
                ]
              }
            ])
            setOpen(false)
          }}>浏览过指定商品</a> },
          { key: '4-3', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"inputNumber",
                condition:[{
                  label:"订单数量",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>订单数量</a> },
          { key: '4-4', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"inputPrice",
                condition:[{
                  label:"消费金额",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>消费金额</a> },
          { key: '4-5', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"inputPrice",
                condition:[{
                  label:"客单价",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>客单价</a> },
          { key: '4-6', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"date",
                condition:[{
                  label:"首单时间",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>首单时间</a> },
          { key: '4-7', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"date",
                condition:[{
                  label:"上次购买时间",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>上次购买时间</a> },
          { key: '4-8', label: <a onClick={()=>{
            cousomerManagement.setConditionList([
              ...cousomerManagement.conditionList,
              {
                type:"date",
                condition:[{
                  label:"最近一次弃单时间",
                  selectOptions:[]
                }]
              }
            ])
            setOpen(false)
          }}>最近一次弃单时间</a> },
        ],
      },
      {
          key: 'sub5',
          label: '店铺行为',
          icon: <ShopIcon style={{fontSize:"16px"}} />,
          children: [
            { key: '5-1', label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"date",
                  condition:[{
                    label:"最近一次登录时间",
                    selectOptions:[]
                  }]
                }
              ])
              setOpen(false)
            }}>最近一次登录时间</a> },
            { key: '5-2', label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"checkedGroupSearch",
                  condition:[{
                    label:"最近一次访问渠道",
                    options:[
                      { label : "taboola", value : "taboola",tip:""},
                      { label : "omnisend", value : "omnisend",tip:""},
                      { label : "google-广告", value : "google-广告",tip:""},
                      { label : "FB-广告", value : "FB-广告",tip:""},
                    ],
                    selectOptions:[]
                  }]
                },
              ])
              setOpen(false)
            }}>最近一次访问渠道</a> },
            { key: '5-3', label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"checkedSearchAndDate",
                  condition:[
                    {
                      label:"访问过的渠道",
                      options:[
                        { label : "google-广告", value : "google-广告",tip:""},
                        { label : "taboola", value : "taboola",tip:""},
                        { label : "omnisend", value : "omnisend",tip:""},
                        { label : "FB-广告", value : "FB-广告",tip:""},
                        { label : "twitter", value : "twitter",tip:""},
                        { label : "yahoo", value : "yahoo",tip:""},
                        { label : "FB-诸葛系统", value : "FB-诸葛系统",tip:""},
                        { label : "pinterest", value : "pinterest",tip:""},
                        { label : "tiktok", value : "tiktok",tip:""},
                      ],
                      selectOptions:[]
                    },
                    {
                      label:"访问时间",
                      options:[],
                      selectOptions:[]
                    }
                  ]
                }
              ])
              setOpen(false)
            }}>访问过的渠道</a> },
            { key: '5-4', label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"date",
                  condition:[{
                    label:"最近一次加购时间",
                    selectOptions:[]
                  }]
                }
              ])
              setOpen(false)
            }}>最近一次加购时间</a> },
            { key: '5-5', label: <a onClick={()=>{
              cousomerManagement.setConditionList([
                ...cousomerManagement.conditionList,
                {
                  type:"inputNumber",
                  condition:[{
                    label:"访问次数",
                    selectOptions:[]
                  }]
                }
              ])
              setOpen(false)
            }}>访问次数</a> },
          ],
      },
      {
          key: 'sub6',
          label: '促销敏感度',
          icon: <PromotionIcon style={{fontSize:"16px"}} />,
          children: [
            { 
              key: '6-1', 
              label:<Tooltip placement="top" title={"客户历史订单中参与过的营销活动类型"}>
                <a onClick={()=>{
                  cousomerManagement.setConditionList([
                    ...cousomerManagement.conditionList,
                    {
                      type:"checkedGroup",
                      condition:[{
                        label:"活动类型偏好",
                        options:[
                          { label : "折扣活动", value : "折扣活动",tip:""},
                          { label : "限时活动", value : "限时活动",tip:""},
                          { label : "捆绑活动", value : "捆绑活动",tip:""},
                          { label : "组合套餐", value : "组合套餐",tip:""},
                          { label : "赠品活动", value : "赠品活动",tip:""},
                          { label : "预售活动", value : "预售活动",tip:""},
                        ],
                        selectOptions:[]
                      }]
                    }
                  ])
                  setOpen(false)
                }}>活动类型偏好</a>
              </Tooltip>
            },
            { key: '6-2', label: <Tooltip placement="top" title={"根据客户历史订单参与营销活动产生的优惠金额计算得出，可以用来衡量客户对单笔订单优惠金额的偏好"}>
              <a onClick={()=>{
                cousomerManagement.setConditionList([
                  ...cousomerManagement.conditionList,
                  {
                    type:"inputPrice",
                    condition:[{
                      label:"优惠敏感度",
                      options:[],
                      selectOptions:[]
                    }]
                  }
                ])
                setOpen(false)
              }}>优惠敏感度</a>
            </Tooltip> },
          ],
      },
      {
          key: 'sub7',
          label: '元字段',
          icon: <MetaFieldIcon style={{fontSize:"16px"}} />,
          children: [
            { key: '7-1', label: '暂无数据' },
          ],
      },
      {
        type: 'divider',
      },
      {
        key: 'sub8',
        label: <Tooltip placement="rightTop"
          title={<div>
          <div>
            <img style={{width:"400px"}} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250529184502625/imgs/customer-filter-template.be3d1.png" />
          </div>
          <div style={{marginTop:"8px",fontWeight:"400"}}>根据细分模板快速添加筛选条件</div>
        </div>}
        getPopupContainer={()=>Ref.current!}
        >
          <Flex gap={10} style={{width:"220px"}}>
            <GroupingModeIcon style={{fontSize:"16px"}} />
            <div>通过分组模式加载</div>
          </Flex>
        </Tooltip>,
      },
      {
        key: 'sub9',
        label: <Tooltip placement="rightTop"
          title={<div>
          <div>
            <img style={{width:"400px"}} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250529184502625/imgs/customer-filter-advance.1692b.png" />
          </div>
          <div style={{marginTop:"8px",fontWeight:"400"}}>提供更丰富的筛选条件及组合方式，帮助您精准定位目标客户</div>
        </div>}
        getPopupContainer={()=>Ref.current!}
        >
          <Flex gap={10} style={{width:"220px"}}>
            <AdvancedModeIcon style={{fontSize:"16px"}} />
            <div>进阶筛选模式</div>
          </Flex>
        </Tooltip>,
      },
    ];

    const content = (
        <div>
            {/* search */}
            <div style={{padding:"10px 12px"}}>
                <MyInput prefix={<SearchSecondIcon />} style={{height:"36px"}} placeholder="搜索筛选条件" />
            </div>
            <div style={{paddingBottom:"12px"}} className="menu-warp">
                <ConfigProvider
                    theme={{
                        components: {
                        Menu: {
                            /* 这里是你的组件 token */
                            itemMarginBlock:0,
                            itemMarginInline:0,
                            itemBorderRadius:0,
                            subMenuItemBorderRadius:0,
                            itemActiveBg:"rgba(0,0,0,0.06)",
                        },
                        },
                    }}
                >
                    <Menu onClick={()=>{}} getPopupContainer={() => Ref.current!} selectable={false} style={{ width: 256, }} mode="vertical" items={items} />
                </ConfigProvider>
            </div>
        </div>
    )

    return(
        <Scoped ref={Ref}>
            <Popover
              open={open}
              onOpenChange={(open)=>setOpen(open)}
              content={content} 
              placement="bottomLeft" 
              arrow={false}
              trigger="click"
              getPopupContainer={()=>Ref.current!}
            >
                <DefaultButton style={{fontWeight:500}} icon={<ScreeningIcon className="font-16" />} text="添加筛选条件" />
            </Popover>
        </Scoped>
        
    )
}

export default ScreeningConditions;

const Scoped = styled.div`
    .ant-popover-inner{
      padding: 0;
    }
    .ant-menu-submenu{
      .ant-menu-sub {
        position: relative;
        top:-8px;
        padding: 8px 0;
      }
    }
    .ant-tooltip{
      max-width: none;
    }
`

