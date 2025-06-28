import DefaultButton from "@/components/Button/DefaultButton";
import MyButton from "@/components/Button/MyButton";
import { CloseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { AimOutlined, ClockCircleOutlined, EyeOutlined, MenuOutlined, RightOutlined, ShoppingCartOutlined, ShoppingOutlined, SyncOutlined, TeamOutlined } from "@ant-design/icons";
import { Drawer, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from 'dayjs';
import { all, attractNewCustomers, attractOldCustomers, customerBrowsingBehavior, customerPurchasingBehavior, keyOperatingCustomers, reAttractCustomers, specificGroupOfPeople } from "./Subdivision";
import { useNavigate } from "react-router-dom";

function SubdivisionTemplate() {

  const navigator = useNavigate();

  const [open, setOpen] = useState(false);

  const [templateCategorys,setTemplateCategorys] = useState([
    {
      name: "全部",
      icon: <MenuOutlined />
    },
    {
      name: "吸引新客户",
      icon: <ShoppingOutlined />
    },
    {
      name: "吸引老客户",
      icon: <ClockCircleOutlined />
    },
    {
      name: "重新吸引客户",
      icon: <SyncOutlined />
    },
    {
      name: "特定人群",
      icon: <TeamOutlined />
    },
    {
      name: "重点运营客户",
      icon: <AimOutlined />
    },
    {
      name: "客户浏览行为",
      icon: <EyeOutlined />
    },
    {
      name: "客户购买行为",
      icon: <ShoppingCartOutlined />
    },
  ])

  const [activeIndex, setActiveIndex] = useState(0);  // 默认选中第一个分类

  const [templateCategoryList,setTemplateCategoryList] = useState<any[]>([])

  useEffect(()=>{
  },[])

  return (
    <>
      <Flex className="cursor-pointer" gap={8} onClick={()=>setOpen(true)}>
          <TemplateIcon />
          <div>细分模板</div>
      </Flex>
      <MyDrawer
          title={<Flex justify="space-between" align="center">
              <div>
                <div className="font-20">分组模板</div>
                <div className="font-14 color-7A8499 font-w-500" style={{marginTop:"4px"}}>使用可自定义的模版对客户进行分组</div>
              </div>
              <div>
                <Flex className="btn-cancel cursor-pointer" justify="center" align="center" onClick={()=>setOpen(false)}><CloseIcon className="font-16" /></Flex>
              </div>
          </Flex>}
          closeIcon={null}
          onClose={()=>setOpen(false)}
          open={open}
          width={600}
          footer={
            <Flex justify="flex-end" style={{marginTop:"6px",marginBottom:"8px"}}>
              <DefaultButton text={"进入进阶筛选模式"}  />
            </Flex>
          }
          styles={{
            body:{
              padding: "0px"
            }
          }}
      >
        <Flex style={{height:"100%"}}>
          <div className="template-category">
            <ul className="template-category-ul">
              {templateCategorys.map((item,index)=>(
                <li key={index} className={`template-category-li cursor-pointer ${activeIndex == index ? 'active':''}`} onClick={()=>{
                  setActiveIndex(index)
                  switch (item.name){
                    case '全部':
                      setTemplateCategoryList(all)
                      break;
                    case '吸引新客户':
                      setTemplateCategoryList(attractNewCustomers)
                      break;
                    case '吸引老客户':
                      setTemplateCategoryList(attractOldCustomers)
                      break;
                    case '重新吸引客户':
                      setTemplateCategoryList(reAttractCustomers)
                      break;
                    case '特定人群':
                      setTemplateCategoryList(specificGroupOfPeople)
                      break;
                    case '重点运营客户':
                      setTemplateCategoryList(keyOperatingCustomers)
                      break;
                    case '客户浏览行为':
                      setTemplateCategoryList(customerBrowsingBehavior)
                      break;
                    case '客户购买行为':
                      setTemplateCategoryList(customerPurchasingBehavior)
                      break;
                  }
                }}>
                  <Flex justify="space-between" align="center">
                    <Flex gap={8}>
                      {item.icon}
                      <span className="font-w-500">{item.name}</span>
                    </Flex>
                    <RightOutlined className="font-10 color-242833" />
                  </Flex>
                </li>
              ))}
            </ul>
          </div>
          {/*  */}
          <div className="template-condition">
              {templateCategoryList.map((item,index)=>(
                <div key={index} style={{padding:"20px 20px 0 20px"}}>
                  <div className="title font-16 color-242833 font-w-500" style={{marginBottom:"12px"}}>{item.templateCaseName}</div>
                  <div className="desc color-7A8499" style={{marginBottom:"14px"}}>{item.templateDesc}</div>
                  <div className="container-warp">
                    {/* 筛选条件 */}
                    <Flex gap={16}>
                      {item.crowdTemplateCondition.conditions.children.length > 1 && (
                        <Flex className="switch">
                          <div className="line"></div>
                          <Flex className="switch-condition font-12" justify="center" align="center">
                            {item.crowdTemplateCondition.conditions.relation == "and" && <div className="color-35C08E">且</div>}
                            {item.crowdTemplateCondition.conditions.relation == "or" && <div className="color-356DFF">或</div>}
                          </Flex>
                        </Flex>
                      )}
                      <Flex gap={8} vertical style={{width:"100%"}}>
                        {item.crowdTemplateCondition.conditions.children?.map((conditions:any,index:number) =>(
                          <div key={index} className="conditionGroup">
                            <Flex gap={16}>
                              {(conditions.children.length > 1 || conditions.children[0]?.children?.length > 1 ) && (
                                <Flex className="switch">
                                  <div className="line"></div>
                                  <Flex className="switch-condition font-12" justify="center" align="center">
                                    {conditions.relation == "and" && <div className="color-35C08E">且</div>}
                                    {conditions.relation == "or" && <div className="color-356DFF">或</div>}
                                  </Flex>
                                </Flex>
                              )}
                              <div className="conditionGroupItem" style={{width:"100%"}}>
                                {conditions.children.map((conditionsItem:any, index:number) => {
                                  if(conditionsItem?.children){
                                    return(
                                      <>
                                        {conditionsItem.children.map((conditionsChildItem:any,index:number)=>(
                                          <Flex className="font-w-500 conditionItem">
                                            <Flex>
                                              <div className="color-7A8499" style={{flex:1}}>
                                                {
                                                  conditionsChildItem.key == "purchasedItem" ? "购买过指定商品" :
                                                  conditionsChildItem.key == "purchasedCate" ? "购买过指定分类" :
                                                  conditionsChildItem.key == "viewedItem" ? "浏览过指定商品" :
                                                  conditionsChildItem.key == "viewedCate" ? "浏览过指定分类" :
                                                  conditionsChildItem.key == "viewedItemDate" ? "浏览时间" :
                                                  conditionsChildItem.key == "purchasedItemTime" ? "下单时间" : ""
                                                }
                                              </div>
                                            </Flex>
                                            <Flex className="color-474F5E" gap={8} style={{flex:1,textAlign:"right"}} justify="end">
                                              {conditionsChildItem.operator == "IN" && <span>包含</span>}
                                              {conditionsChildItem.extInfo.listSource == "productList" ? <span>
                                                {
                                                  conditionsChildItem.value.length > 0 ? conditionsChildItem.value.join(",") : "{商品名称}"
                                                }
                                              </span> : <span>
                                                {
                                                  conditionsChildItem.value.length > 0 ? conditionsChildItem.value.join(",") : "{分类名称}"
                                                }
                                              </span>}
                                              
                                            </Flex>
                                          </Flex>
                                        ))}
                                      </>
                                    )
                                  }else{
                                    return(
                                      <Flex key={index} className="conditionItem font-w-500">
                                        <div className="color-7A8499" style={{flex:1}}>
                                          {
                                            conditionsItem.key == "status" ? "客户状态" : 
                                            conditionsItem.key == "rfm" ? "RFM价值" :
                                            conditionsItem.key == "payOrderCnt" ? "订单数量" :
                                            conditionsItem.key == "totalAmount" ? "消费金额" :
                                            conditionsItem.key == "lastOrderTime" ? "上次购买时间" :
                                            conditionsItem.key == "customerCycle" ? "客户生命周期" :
                                            conditionsItem.key == "emailSubscribeStatus" ? "邮箱订阅状态" :
                                            conditionsItem.key == "lastLoginTime" ? "最近一次登录时间" :
                                            conditionsItem.key == "isBirthdayInNextMonth" ? "重点运营" :
                                            conditionsItem.key == "lastCartCreateTime" ? "最近一次加购时间" :
                                            conditionsItem.key == "createTime" ? "客户加入日期" :
                                            conditionsItem.key == "lastAbandonedCreateTime" ? "最近一次弃单时间" :
                                            conditionsItem.key == "address" ? "地址" :
                                            conditionsItem.key == "language" ? "客户语言" :
                                            conditionsItem.key == "singleOrderAmount" ? "单次消费金额" :
                                            conditionsItem.key == "singleOrderAmountTime" ? "下单时间" : ""
                                          }
                                        </div>
                                        <Flex className="color-474F5E" gap={8} style={{flex:1,textAlign:"right"}} justify="end">
                                          {
                                            <>
                                              {
                                                conditionsItem.extInfo.componentType == "DATE" ? <>
                                                  {conditionsItem.operator == "BETWEEN" ? <span>{dayjs(conditionsItem.value[0]).format("YYYY-MM-DD")} - {dayjs(conditionsItem.value[1]).format("YYYY-MM-DD")}</span>:<span>{conditionsItem.value[0]}</span>}
                                                </>:<>
                                                  {
                                                    (conditionsItem.extInfo.componentType == "TAG") ? <></> : 
                                                      <span>
                                                      {
                                                        (conditionsItem.operator == "EQ" || conditionsItem.operator == "IN") ? "等于" :
                                                        conditionsItem.operator == "NEQ" ? "不等于" :
                                                        conditionsItem.operator == "GT" ? "大于" :
                                                        conditionsItem.operator == "LT" ? "小于" :""
                                                      }
                                                    </span>
                                                  } 
                                                  <span>
                                                    {
                                                      conditionsItem.extInfo.componentType == "PRICE" ? "US$"+conditionsItem.value.join(","):
                                                      conditionsItem.value.join(",")
                                                    }
                                                  </span>
                                                </>
                                              }
                                            </>
                                          }
                                        </Flex>
                                      </Flex>
                                    )
                                  }
                                }
                                )}
                              </div>
                            </Flex>
                          </div>
                        ))}
                      </Flex>
                    </Flex>
                    {/* 除外条件 */}
                    {(item.crowdTemplateCondition.not?.children?.length ?? 0) > 0 && 
                      <Flex gap={16} style={{marginTop:"8px"}}>
                        <Flex className="switch">
                          <div className="line"></div>
                          <Flex className="switch-condition font-12" justify="center" align="center">
                            <div>除</div>
                          </Flex>
                        </Flex>
                        <Flex gap={8} vertical style={{width:"100%"}}>
                        {item.crowdTemplateCondition.not.children?.map((not:any,index:number)=>{
                          return(
                            <div key={index} className="conditionGroup">
                              <Flex gap={16}>
                                {not.children.length > 1 && (
                                  <Flex className="switch">
                                    <div className="line"></div>
                                    <Flex className="switch-condition font-12" justify="center" align="center">
                                      <div>除</div>
                                    </Flex>
                                  </Flex>
                                )}
                                <div className="conditionGroupItem" style={{width:"100%"}}>
                                  {not.children.map((notItem:any,index:number)=>{
                                    return(
                                      <Flex key={index} className="conditionItem font-w-500" justify="space-between">
                                        <div className="color-7A8499">
                                          {notItem.key === "status" ? "客户状态" : ""}
                                        </div>
                                        <Flex className="color-474F5E" gap={8}>
                                          <span>{(notItem.operator == "EQ" || notItem.operator == "IN") ? "等于" : ""}</span>
                                          {notItem.value.join(",")}
                                        </Flex>
                                      </Flex>
                                    )
                                  })}
                                </div>
                              </Flex>
                            </div>
                            )
                        })}
                        </Flex>
                      </Flex>
                    }
                  </div>
                  {/*  */}
                  <Flex style={{marginTop:"12px"}} justify="flex-end" gap={8}>
                    <MyButton text={"创建细分"} className="color-242833 font-w-500" onClick={()=>navigator(`/customer/management/subdivision/create/${item.id}`)} />
                    <MyButton text={"筛选客户"} className="font-w-500" color="primary" variant="outlined" />
                  </Flex>
                </div>
              ))}
          </div>
        </Flex>
        
      </MyDrawer>
    </>
  );
}

const MyDrawer = styled(Drawer)`
  .btn-cancel{
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: rgb(0 39 155 / 7%);
  }
  .btn-cancel:hover{
    background: rgb(0 39 155 / 12%);
  }

  .template-category{
    flex: 1;
    &-ul{
      padding: 0;
      margin: 0;
    }
    &-li{
      padding: 14px 10px 14px 20px;
      &.active{
        background-color : #F0F7FF;
        color:#356DFF;
      }
    }
  }

  .template-condition{
    width: 380px;
    overflow-y: auto;
    padding-bottom: 20px;
    border-left: 1px solid #eef1f7;
    .container-warp{
      .container{
        display: flex;
        position: relative;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 100%;
      }
    }
    .conditionGroup{
      flex:1;
      padding: 12px 16px;
      border-radius: 4px;
      border: 1px solid #d7dbe7;
      .conditionItem{
        padding: 8px 5px;
        width: 100%;
      }
    }

    .switch{
      width: 24px;
      position: relative;
      justify-content: center;
      .line{
        width: 2px;
        height: 100%;
        border-radius: 1px;
        background-color: #eaedf1;
      }
      .switch-condition{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 24px;
        width: 100%;
        border-radius: 2px;
        color: #7a8499;
        background-color:#eaedf1;
      }
    }
  }

`;

export default SubdivisionTemplate;

