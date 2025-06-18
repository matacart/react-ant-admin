



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
              children:[],
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
              children:[],
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



