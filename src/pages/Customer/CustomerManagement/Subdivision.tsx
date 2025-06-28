



export const keyOperatingCustomers = [
  {
    id:"9",
    templateCaseName: "高价值客户",
    templateDesc: "对于客户价值为高的客户，发送可提高忠诚度和增加收入的针对性宣传活动",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"or",
          children:[
            {
              key:"rfm",
              type:0,
              operator:"IN",
              value:["重要价值客户"],
              extInfo:"{\"operatorType\":\"EQ\",\"componentType\":\"ENUM\",\"id\":\"6f9b28c2-8249-4aa9-b1e6-3dedb715228e\"}"
            },
            {
              type:0,
              key:"rfm",
              operator:"IN",
              value:["重要发展客户"],
              extInfo:"{\"operatorType\":\"EQ\",\"componentType\":\"ENUM\",\"id\":\"6f9b28c2-8249-4aa9-b1e6-3dedb715228e\"}"
            },
            {
              type:0,
              key:"rfm",
              operator:"IN",
              value:["重要保持客户"],
              extInfo:"{\"operatorType\":\"EQ\",\"componentType\":\"ENUM\",\"id\":\"6f9b28c2-8249-4aa9-b1e6-3dedb715228e\"}"
            },
            {
              type:0,
              key:"rfm",
              operator:"IN",
              value:["重要挽留客户"],
              extInfo:"{\"operatorType\":\"EQ\",\"componentType\":\"ENUM\",\"id\":\"6f9b28c2-8249-4aa9-b1e6-3dedb715228e\"}"
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
          {
            extInfo: "{\"id\":\"6f09771a-1ac9-4167-bd1b-9818cb8db28a\"}",
            relation: "and",
            type: 1,
            children:[
              {
                type:0,
                key: "status",
                operator: "IN",
                value:["黑名单"],
                extInfo: "{\"operatorType\":\"EQ\",\"componentType\":\"ENUM\",\"id\":\"db89da14-c936-484e-ae33-759e4e5e02ea\"}"
              }
            ]
          },
        ]
      }
    }
  },
  {
    id:"17",
    templateCaseName: "购买力强客户",
    templateDesc: "为购买力强的客户提供抢先体验促销活动、促销商品和新商品的机会",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"payOrderCnt",
              operator:"GT",
              value:["2"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
            {
              type:0,
              key:"totalAmount",
              operator:"GT",
              value:["100000"],
              extInfo:{componentType:"PRICE",id:"c15762dc-1c92-4152-b90c-054856dfe242"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"18",
    templateCaseName: "购买指定分类的高消费客户",
    templateDesc: "在您的商店花费大量金额并且购买过具有指定分类商品的客户",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"totalAmount",
              operator:"GT",
              value:["100000"],
              extInfo:{componentType:"PRICE",id:"c15762dc-1c92-4152-b90c-054856dfe242"}
            },
            {
              type:0,
              key:"purchasedCate",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "purchasedCate",
                  operator: "IN",
                  type: 0,
                  value:[],
                  extInfo:{operatorType:"IN",componentType:"LIST",listSource:"categoryList",id:"4485763c-10d2-4723-a63f-153ce0744af6",label:[]}
                }
              ],
              extInfo:{id:"c14a1b0a-c2de-47d5-bf47-99a3d5e62627"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"10",
    templateCaseName: "复购人群",
    templateDesc: "通过锁定选择了电子邮件营销并在近期下过单的客户，推动复购",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"customerCycle",
              operator:"IN",
              value:["复购"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"11",
    templateCaseName: "近期活跃客户",
    templateDesc: "和近期活跃客户互动以提高忠诚度和留存率",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"lastLoginTime",
              operator:"EQ",
              value:["过去30天"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"11",
    templateCaseName: "最近下单的高消费客户",
    templateDesc: "根据已消费金额和上次下单时间向客户发送新商品相关信息",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"totalAmount",
              operator:"GT",
              value:["100000"],
              extInfo:{componentType:"PRICE",id:"c15762dc-1c92-4152-b90c-054856dfe242"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"12",
    templateCaseName: "下月生日客户",
    templateDesc: "向客户发送可在其生日月内使用的个性化折扣",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"isBirthdayInNextMonth",
              operator:"EQ",
              value:["下月生日客户"],
              extInfo:{subGroup:"keyPperations",componentType:"TAG",id:"b66b7dfc-4e71-43ee-9104-503224fcdeb7"}
            },
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]

export const attractNewCustomers = [
  {
    id:"13",
    templateCaseName: "访问未成单客户",
    templateDesc: "向对品牌感兴趣的客户提供首购折扣，将其转换为首购客户",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"lastLoginTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"BETWEEN",
              value:[1577808000238,1653840000238],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
        ]
      }
    }
  },
  {
    id:"14",
    templateCaseName: "加购未成单客户",
    templateDesc: "通过向客户发送折扣码来鼓励他们返回完成订单",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"lastCartCreateTime",
              operator:"EQ",
              value:["过去7天"],
              extInfo:{componentType:"DATE",dateType:"LAST_7_DAY",id:"5792e958-f8ab-4f3b-be6f-50f26e2bb33a"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"BETWEEN",
              value:[1577808000238,1653840000238],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"15",
    templateCaseName: "购买过指定商品的首单客户",
    templateDesc: "向客户发送邀请来鼓励他们创建账户，以便加快结账速度、轻松跟踪订单状态和查看订单历史记录",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"payOrderCnt",
              operator:"EQ",
              value:["2"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
            {
              type:0,
              key:"purchasedItem",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "purchasedItem",
                  operator: "IN",
                  type: 0,
                  value:[],
                  extInfo:{operatorType:"IN",componentType:"LIST_PAGE",listSource:"productList",id:"17ce3c87-673b-4697-a1d1-54a31ec809e5",label:[]}
                }
              ],
              extInfo:{id:"c14a1b0a-c2de-47d5-bf47-99a3d5e62627"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"1",
    templateCaseName: "订阅邮件的首单客户",
    templateDesc: "在客户首次下单后，向其提供商品优惠来推动再次下单",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"payOrderCnt",
              operator:"EQ",
              value:["1"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"2",
    templateCaseName: "订阅邮件30天内未下单客户",
    templateDesc: "向对品牌感兴趣的客户宣布商品发布，将其转换为新客户",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"createTime",
              operator:"EQ",
              value:["过去30天"],
              extInfo:{componentType:"DATE",dateType:"LAST_30_DAY",id:"72a1a927-a392-4bde-9443-589db54d057e"}
            },
            {
              type:0,
              key:"payOrderCnt",
              operator:"LT",
              value:["1"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]
export const attractOldCustomers = [
  {
    id:"7",
    templateCaseName: "最近高消费金额客户",
    templateDesc: "向过去 90 天内订单消费金额较高的客户销售同一商品标签偏好中的其他商品",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
            {
              type:0,
              key:"totalAmount",
              operator:"GT",
              value:["100000"],
              extInfo:{componentType:"PRICE",id:"c15762dc-1c92-4152-b90c-054856dfe242"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
        ]
      }
    }
  },
  {
    id:"3",
    templateCaseName: "最近高下单数量客户",
    templateDesc: "与近期下单较多的客户进行互动。在他们的下笔订单中提供免运费优惠以鼓励再次购买",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
            {
              type:0,
              key:"payOrderCnt",
              operator:"GT",
              value:["20"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]
export const reAttractCustomers = [
  {
    id:"8",
    templateCaseName: "近期弃单的客户",
    templateDesc: "通过向近期有过弃单的客户发送折扣码来鼓励他们返回完成订单",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"lastAbandonedCreateTime",
              operator:"EQ",
              value:["过去30天"],
              extInfo:{componentType:"DATE",dateType:"LAST_30_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
        ]
      }
    }
  },
  {
    id:"4",
    templateCaseName: "曾经活跃的客户",
    templateDesc: "尝试打动以前从商店中购买大量商品的客户回头",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"totalAmount",
              operator:"GT",
              value:["100000"],
              extInfo:{componentType:"PRICE",id:"c15762dc-1c92-4152-b90c-054856dfe242"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"EQ",
              value:["过去12个月"],
              extInfo:{componentType:"DATE",dateType:"LAST_12_MONTH",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"5",
    templateCaseName: "近期消费过的客户",
    templateDesc: "通过锁定选择了电子邮件营销并在近期下过单的客户，推动复购",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"emailSubscribeStatus",
              operator:"IN",
              value:["已订阅"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"e84eb846-5592-4bb8-9552-3b060077090a"}
            },
            {
              type:0,
              key:"lastOrderTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d9a26119-d4ec-437b-9d48-f8ddea3d6729"}
            },
            {
              type:0,
              key:"payOrderCnt",
              operator:"GT",
              value:["5"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            }
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]

export const specificGroupOfPeople = [
  {
    id:"16",
    templateCaseName: "客户国家",
    templateDesc: "地址位于指定国家的所有客户",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"address",
              operator:"EQ",
              isEdit: true,
              isOpen: true,
              value:["{国家/地区}"],
              extInfo:{componentType:"ADDRESS",id:"c03af3e4-59f7-4c19-9f9f-bc34563525da"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
        ]
      }
    }
  },
  {
    id:"6",
    templateCaseName: "客户语言",
    templateDesc: "使用指定语言的所有客户",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"language",
              operator:"IN",
              value:["英语"],
              extInfo:{operatorType:"EQ",componentType:"LIST",listSource:"language",id:"cddc6d80-3b60-451b-be52-ae112ea864ac",label:["英语"]}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]


export const customerBrowsingBehavior = [
  {
    id:"20",
    templateCaseName: "浏览过指定商品但从未下单的客户",
    templateDesc: "通过为弃购的高意向潜在客户提供其感兴趣的商品的折扣，将其转换为首购客户",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"payOrderCnt",
              operator:"EQ",
              value:["0"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
            {
              type:0,
              key:"viewedItem",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "viewedItem",
                  operator: "IN",
                  type: 0,
                  extInfo:{operatorType:"IN",componentType:"LIST_PAGE",listSource:"productList",id:"e745e54b-0d9b-4f46-89e9-7f838138972d",label:[]},
                  value: []
                },
                {
                  key: "viewedItemDate",
                  operator: "EQ",
                  type: 0,
                  extInfo:{componentType:"DATE",dateType:"LAST_30_DAY",id:"bee73362-c804-4921-a3e6-32aec6fb714c"},
                  value: ["过去30天"]
                },
              ],
              extInfo:{id:"f34ed3d6-e487-4fc0-a825-d3973e479631"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
        ]
      }
    }
  },
  {
    id:"21",
    templateCaseName: "浏览过指定分类但从未下单的客户",
    templateDesc: "通过根据潜在客户感兴趣的商品分类对潜在客户进行再营销，将潜在客户转换为首购客户。展示类似的其他商品或品牌，并为其提供折扣以抵消运费",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"payOrderCnt",
              operator:"EQ",
              value:["0"],
              extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
            },
            {
              type:0,
              key:"viewedCate",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "viewedCate",
                  operator: "IN",
                  type: 0,
                  extInfo:{operatorType:"IN",componentType:"LIST",listSource:"categoryList",id:"b61b8286-722f-48f9-a5bd-b11bdabf5030",label:[]},
                  value: []
                },
                {
                  key: "viewedItemDate",
                  operator: "EQ",
                  type: 0,
                  extInfo:{componentType:"DATE",dateType:"LAST_30_DAY",id:"bee73362-c804-4921-a3e6-32aec6fb714c"},
                  value: ["过去30天"]
                },
              ],
              extInfo:{id:"f34ed3d6-e487-4fc0-a825-d3973e479631"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"22",
    templateCaseName: "近期浏览过指定分类的客户",
    templateDesc: "向对特定商品系列或品牌感兴趣的客户宣布商品发布",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"viewedCate",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "viewedCate",
                  operator: "IN",
                  type: 0,
                  extInfo:{operatorType:"IN",componentType:"LIST",listSource:"categoryList",id:"b61b8286-722f-48f9-a5bd-b11bdabf5030",label:[]},
                  value: []
                },
                {
                  key: "viewedItemDate",
                  operator: "EQ",
                  type: 0,
                  extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"bee73362-c804-4921-a3e6-32aec6fb714c"},
                  value: ["过去90天"]
                },
              ],
              extInfo:{id:"f34ed3d6-e487-4fc0-a825-d3973e479631"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]

export const customerPurchasingBehavior = [
  {
    id:"23",
    templateCaseName: "单笔消费金额低的客户",
    templateDesc: "向消费金额较低的客户交叉销售来自品牌或商品分类的高价值商品以提高平均订单金额",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"singleOrderAmount",
              operator:"LT",
              value:[100],
              extInfo:{componentType:"PRICE",id:"a2c5dd75-e0cf-4300-9c62-f87c251e0b9e"}
            },
            {
              type:0,
              key:"singleOrderAmountTime",
              operator:"EQ",
              value:["过去90天"],
              extInfo:{componentType:"DATE",dateType:"LAST_90_DAY",id:"d2558cf5-f2d8-465e-905e-43fa31f2b30f"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[
        ]
      }
    }
  },
  {
    id:"24",
    templateCaseName: "购买指定分类的客户",
    templateDesc: "向购买过具有指定分类的商品的客户营销相关商品",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"purchasedCate",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "purchasedCate",
                  operator: "IN",
                  type: 0,
                  value:[],
                  extInfo:{operatorType:"IN",componentType:"LIST",listSource:"categoryList",id:"4485763c-10d2-4723-a63f-153ce0744af6",label:[]}
                }
              ],
              extInfo:{id:"c14a1b0a-c2de-47d5-bf47-99a3d5e62627"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"25",
    templateCaseName: "指定时间范围买过指定商品的客户",
    templateDesc: "鼓励客户购买最新版本的商品或销售其它经常一起购买的商品",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"purchasedItem",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "purchasedItem",
                  operator: "IN",
                  type: 0,
                  value:[],
                  extInfo:{operatorType:"IN",componentType:"LIST_PAGE",listSource:"productList",id:"17ce3c87-673b-4697-a1d1-54a31ec809e5",label:[]}
                },
                {
                  key: "purchasedItemTime",
                  operator: "EQ",
                  type: 0,
                  value:["过去12个月"],
                  extInfo:{componentType:"DATE",dateType:"LAST_12_MONTH",id:"8437dad0-af6f-4a0a-b310-0fcf84428919"}
                }
              ],
              extInfo:{id:"c14a1b0a-c2de-47d5-bf47-99a3d5e62627"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
  {
    id:"26",
    templateCaseName: "购买过指定商品的客户",
    templateDesc: "向购买过指定商品的客户营销相关商品",
    crowdTemplateCondition:{
      // 条件
      conditions:{
        type:1,
        extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
        relation:"and",
        children:[{
          type:1,
          extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa6"},
          relation:"and",
          children:[
            {
              type:0,
              key:"purchasedItem",
              isEdit: true,
              isOpen: true,
              children:[
                {
                  key: "purchasedItem",
                  operator: "IN",
                  type: 0,
                  value:[],
                  extInfo:{operatorType:"IN",componentType:"LIST_PAGE",listSource:"productList",id:"17ce3c87-673b-4697-a1d1-54a31ec809e5",label:[]}
                }
              ],
              extInfo:{id:"c14a1b0a-c2de-47d5-bf47-99a3d5e62627"}
            },
          ]
        }]
      },
      // 除外条件
      not:{
        extInfo:"{\"id\":\"a27794e7-535b-45eb-8f64-4023443f6f4f\"}",
        relation: "and",
        children:[]
      }
    }
  },
]


export const all = [
  ...attractNewCustomers,
  ...attractOldCustomers,
  ...reAttractCustomers,
  ...specificGroupOfPeople,
  ...keyOperatingCustomers,
  ...customerBrowsingBehavior,
  ...customerPurchasingBehavior
] 



