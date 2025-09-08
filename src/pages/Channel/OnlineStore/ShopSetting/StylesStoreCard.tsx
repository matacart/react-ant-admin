import { CompilationIcon, EyeIcon, TiledIcon } from "@/components/Icons/Icons"
import shopSetting, { TemplateMall } from "@/store/channel/shopSetting/shopSetting"
import { Row, Col, Tooltip, Flex } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"




function StylesStoreCard() {

  const navigator = useNavigate();

  // 模板列表
  const [tempList,setTempList] = useState<TemplateMall[]>([]);

  const [groupedByTheme,setGroupedByTheme] = useState<TemplateMall[]>([]);

  useEffect(()=>{
    setTempList(shopSetting.templateMallList)

    // 分组
    // const newGroupedByTheme = shopSetting.templateMallList.reduce((acc, current) => {
    //   const key = current.themeKey;
    //   if (!acc[key]) {
    //     acc[key] = [];
    //   }
    //   acc[key].push(current);
    //   return acc;
    // }, {} as Record<string, typeof tempList>);

    setGroupedByTheme(shopSetting.templateMallList)


  },[])
  // 按类型 
  // business_id
  // 按版本

  const [list,setList] = useState([
    {text:"全部模板",check:true,value:"0"},
    {text:"时尚/服装/内衣",check:false,value:"1"},
    {text:"鞋靴/箱包/首饰",check:false,value:"2"},
    {text:"运动/户外/休闲",check:false,value:"3"},
    {text:"五金/配件/工具",check:false,value:"4"},
    {text:"电子/数码/科技",check:false,value:"5"},
    {text:"母婴/玩具/儿童",check:false,value:"6"},
    {text:"综合/多类品",check:false,value:"7"},
    {text:"健康/美妆/护理",check:false,value:"8"},
    {text:"家居/园艺/宠物",check:false,value:"9"},
    {text:"保健/食品/医药",check:false,value:"10"},
    {text:"防疫类产品",check:false,value:"11"},
  ])

  const [ctrList,setCtrList] = useState([
    {content:<CompilationIcon className="font-20" />,check:true},
    {content:<TiledIcon className="font-20" />,check:false},
  ])

  // const tempList = [
  //   {
  //     themeKey:"Arise Pro",
  //     style:"简约",
  //     version:"OS 2.1",
  //     themeColor:"rgb(177, 148, 96)",
  //     img:"https://img.myshopline.com/image/shopline/c540d1c306b040789bead710af861371.jpeg",
  //   },
  //   {
  //     themeKey:"Arise Pro",
  //     style:"食物",
  //     version:"OS 2.1",
  //     themeColor:"rgb(255, 15, 0)",
  //     img:"https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg",
  //   },
  //   {
  //     themeKey:"Arise",
  //     style:"机械",
  //     version:"OS 2.1",
  //     themeColor:"rgb(255, 228, 106)",
  //     img:"https://img.myshopline.com/image/shopline/66a2caf453884c748b946018cfc7d11c.jpeg",
  //   },
  //   {
  //     themeKey:"Arise Pro",
  //     style:"动感",
  //     version:"OS 2.1",
  //     themeColor:"rgb(253, 80, 11)",
  //     img:"https://img.myshopline.com/image/shopline/f970183136af49bc8fa2d800ae2d8c7b.jpeg",
  //   },
  //   {
  //     themeKey:"North",
  //     style:"简约",
  //     version:"OS 2.1",
  //     themeColor:"rgb(24, 70, 115)",
  //     img:"https://img.myshopline.com/image/shopline/3338b941e5c849eaa59d016a271da831.jpeg",
  //   }
  // ]
  
  // // 默认选中第一个
  // const [selectedThemes, setSelectedThemes] = useState<Record<string, number>>(() => {
  //   const initial: Record<string, number> = {};
  //   Object.keys(groupedByTheme).forEach(theme => {
  //     initial[theme] = 0; // 默认每个主题选中第一个
  //   });
  //   return initial;
  // });

    return (
      <Scoped>
        {/*  */}
        <div className="themeOptionsWrapper">
          <div className="m">
            {list.map((item,index:number)=>{
              return (
                <div key={index} onClick={()=>{
                  setList(list.map(res=>{
                    if(item.text===res.text){
                      res.check=true
                    }else{
                      res.check=false
                    }
                    return res
                  }))
                }} className={item.check?"typeOption activeOptions":"typeOption"}>
                  {item.text}
                </div>
              )
            })}
          </div>
          <div className="ctr-box">
            {ctrList.map(item=>(
              <span className={item.check?"ctr-icon active-btn":"ctr-icon"} onClick={()=>{
                setCtrList(ctrList.map(res=>{
                  if(item.content===res.content){
                    res.check=true
                  }else{
                    res.check=false
                  }
                  return res
                }))
              }}>
                {item.content}
              </span>
            ))}
          </div>
        </div>
        {/* card-warp */}
        <div className="themeContainerWrapper">
          {/* 合集视图 */}
          {ctrList[0].check && <Row gutter={[24, 24]}>
            {groupedByTheme.map((item:TemplateMall)=>{
              // const selectedIndex = selectedThemes[theme];
              // const selectedItem = items[selectedIndex];
              return (
                <Col span={6}>
                  <div className="bg-color-FFFFFF item-card cursor-pointer">
                    <div className="container" role="button">
                      <div className="containerInner">
                        <div className="tempItemBody">
                          <img className="tempImg" src={`https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg`} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="tempItemTitleWrapper" style={{paddingBottom:"12px"}}>
                      <Flex className="tempItemTitle typography-title-3" justify="space-between" gap={12}>
                        <span className="tempItemTitleName color-242833 font-16 font-w-600">{item.template_name}</span>
                        <span className="color-242833 font-16 font-w-600">{item.need_buy == "0" ? "Free":"Paid"}</span>
                      </Flex>
                      <div className="tempItemVersion color-7A8499 font-14">{item.os_version}</div>
                    </div>
                    <div className="stylesWrapper">
                      {/* {items.map((res,index)=>(
                        <div key={index} onClick={(e)=>{
                          setSelectedThemes(prev => ({
                            ...prev,
                            [theme]: index
                          }));
                        }}  className={selectedIndex == index ? "styleItem styleItemActive":"styleItem"} style={{backgroundColor:res.themeColor,color:res.themeColor}}></div>
                      ))} */}
                    </div>
                    <Tooltip title="预览">
                      <div className="preview-btn">
                        <EyeIcon className="font-16" />
                      </div>
                    </Tooltip>
                  </div>
                </Col>
              )
            })}
          </Row>}
          {/* 平铺视图 */}
          {ctrList[1].check && <Row gutter={[24, 24]}>
            {tempList.map((item:TemplateMall)=>(
              <Col span={6}>
                <div className="bg-color-FFFFFF item-card cursor-pointer" onClick={()=>window.open(`/theme/styles/${item.id}/${'Default'}`)}>
                  <div className="container" role="button">
                    <div className="containerInner">
                      <div className="tempItemBody">
                        <img className="tempImg" src={`https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg`} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="tempItemTitleWrapper">
                    <Flex className="tempItemTitle typography-title-3" justify="space-between" gap={12}>
                      <span className="tempItemTitleName color-242833 font-16 font-w-600">{item.template_name} · {"基础"}</span>
                      <span className="color-242833 font-16 font-w-600">{item.need_buy == "0" ? "Free":"Paid"}</span>
                    </Flex>
                  </div>
                  <div className="tempItemDescWrapper">
                    <div className="tempItemVersion color-7A8499 font-14">{item.os_version}</div>
                  </div>
                  <Tooltip title="预览">
                    <div className="preview-btn">
                      <EyeIcon className="font-16" />
                    </div>
                  </Tooltip>
                </div>
              </Col>
            ))}
          </Row>}
        </div>
        
      </Scoped>
    )
}

const Scoped = styled.div`
  .themeOptionsWrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    width: 100%;
    .m {
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      grid-gap: 8px;
      gap: 8px;
      padding: 8px 0 8px 8px;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      .typeOption {
        padding: 2px 8px;
        background-color: #fff;
        border-radius: 4px;
        background: #fff;
        color: #474f5e;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
      }
      .activeOptions {
        background: #356dff;
        color: #fff;
      }
    }
    .ctr-box {
      border-radius: 4px;
      background: #eef1f6;
      background: var(--grey-divider, #eef1f6);
      -ms-flex-negative: 0;
      flex-shrink: 0;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin: 4px;
      color: #7a8499;
      color: var(--grey-text-secondary, #7a8499);
      .ctr-icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 6px;
        font-size: 20px;
        margin: 2px;
        cursor: pointer;
        border-radius: 3px;
      }
      .active-btn {
        background-color: #fff;
        -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
        color: #356dff;
      }
    }
  }

  .themeContainerWrapper{
    margin-top: 16px;

    .item-card{
      border-radius: 8px;
      transition: all 0.3s ease; // 添加过渡动画
      &:hover {  // 移动hover到卡片层级
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 兼容写法
        .preview-btn {
          display: flex;
        }
        .container{
          .containerInner{
            .tempItemBody{
              .tempImg{
                transform:scale(1.3);
              }
            }
          }
        }
      }
      .container{
        position: relative;
        padding-bottom: 100%;
        .containerInner{
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          .tempItemBody{
            position: relative;
            height: 100%;
            overflow: hidden;
            border-radius: 8px 8px 0 0;
            border-bottom: 1px solid #eef1f7;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            .tempImg{
              -webkit-transition: all 0.3s;
              transition: all 0.3s;
              width: 100%;
              height: auto;
              -o-object-fit: cover;
              object-fit: cover;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
          }
        }
      }

      .tempItemTitleWrapper{
        padding: 12px 16px 4px 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        .tempItemTitle{
          width: 100%;
          .tempItemTitleName{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .tempItemDescWrapper{
        padding: 0 16px;
        padding-bottom: 12px;
      }

      .preview-btn{
        position: absolute;
        top: 6px;
        right: 18px;
        padding: 6px;
        display: none;
        background-color: #fff;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #d7dbe7;
        border: 1px solid var(--grey-border, #d7dbe7);
      }

      /*  */
      .stylesWrapper{
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        grid-gap: 10px;
        gap: 10px;
        padding: 0 16px 16px 19px;
        min-height: 28px;
        .styleItem{
          width: 16px;
          height: 16px;
          border-radius: 100%;
          position: relative;
        }
        .styleItemActive::after{
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          border-radius: 13px;
          border: 1px solid currentColor;
          width: 22px;
          height: 22px;
        }
      }
    }
    
  }

`
  
export default StylesStoreCard