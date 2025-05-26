import { Line } from '@ant-design/plots';
import { DatePicker, Button,Tooltip,Popover,Select  } from "antd";
// // 
{/* <script src="https://unpkg.com/@antv/g2plot@latest/dist/g2plot.js"></script> */}
import { Masonry } from "react-masonry-component2";
import { getAnalyse } from "@/services/analyse/api"
import { ExpandOutlined,QuestionCircleOutlined,InfoCircleOutlined,CloseOutlined,RightOutlined} from '@ant-design/icons';
import React, { useState,useRef, useEffect } from 'react';
import './index.scss';
// 日期
import type { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useSleep } from '@/hooks/customHooks';

// 格式化日期
function formatDate(str:string) {
  /*
        replace第一个参数正则和上面的一样
        
        replace 第二个参数是一个函数，第一个入参就是匹配到的第一个参数，可以在函数内处理补0
    */
  return str.replace(
    /(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g,
    function ($1) {
      return "0" + $1;
    }
  );
}

// 是否全屏
function DrivingScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };
  
  return (
    <Button onClick={toggleFullScreen} icon={<ExpandOutlined />} color="default" variant="filled">
      {isFullScreen ? '退出全屏' : '全屏'}
    </Button>
  );
}
// 对比 --- 根据范围获取
function timeFrame(s:Date,d:Date){
  // 将 Date 对象转换为时间戳（毫秒数）
  const startTimestamp = s.getTime();
  const endTimestamp = d.getTime();

  // 计算时间差
  const difference = endTimestamp - startTimestamp;
  console.log(difference)
  if(difference == 0  || difference == 86400000){
    //1天
  }
  if(difference == 604800000){
    //7天
  }
  if(difference == 2592000000){
    //30天
  }
  if(difference == 7776000000){
    //90天
  }
  // 2678400000 30天
}
// 获取全部产品
const objList = getAnalyse();
// 上一个月
function getLastMonth(time:Date){
  // console.log(time)
  const currTime = time;
  let lastTime = 0;
  // 1 3 5 7 8 10 12
  if(currTime.getMonth() == 0 ||currTime.getMonth() == 2 || currTime.getMonth() == 4 || currTime.getMonth() == 6 ||currTime.getMonth() ==7 ||currTime.getMonth() == 9 ||currTime.getMonth() ==11){
    lastTime = currTime.getTime() - 1000*3600*24*31
  }else if(currTime.getMonth() == 1){
    lastTime = currTime.getTime() - 1000*3600*24*28
  }else{
    lastTime = currTime.getTime() - 1000*3600*24*30
  }
  const lastDate = new Date(lastTime)
  // console.log(lastDate)
  return formatDate((lastDate.getFullYear())+"-"+(lastDate.getMonth()+1)+"-"+(lastDate.getDate()))
}
// 上一年
function getLastYear(time:Date){
  const currTime = time
  // console.log(currTime)
  return formatDate((currTime.getFullYear()-1)+"-"+(currTime.getMonth()+1)+"-"+(currTime.getDate()));
}
export default function(this: any) {

  const [loading,setLoading] = useState(false);

  const sleep = useSleep();

  let [flag,setFlag] = useState("0");

  let [contrastTitle,setcontrastTitle] = useState("");

  let [salesVolumeData,setSalesVolumeData] = useState([
      { year: '02/03', value: "3" },
      { year: '03/03', value: "4" },
      { year: '04/03', value: "3.5" },
      { year: '05/03', value: "5" },
      { year: '06/03', value: "4.9" },
      { year: '07/01', value: "7" }
  ]);
  let [amountPaid,setAmountPaid] = useState([
      { year: '1993-02-03', value: 3 },
      { year: '1994-02-03', value: 4 },
      { year: '1995-02-03', value: 3.5 },
      { year: '1996-02-03', value: 9 },
      { year: '1999-02-03', value: 5 },
      { year: '2002-02-03', value: 7 }
  ]);
  let [visitorsNum,setVisitorsNum] = useState([
      { year: '1991-02-03', value: 3 },
      { year: '1992-02-03', value: 5 },
      { year: '1994-02-03', value: 5 },
      { year: '1996-02-03', value: 6 },
      { year: '1997-02-03', value: 6 },
      { year: '1998-02-03', value: 9 },
      { year: '1999-02-03', value: 10 }
  ]);
  let [customer,setSalesCustomer] = useState([
      { year: '1991-02-03', value: 3 },
      { year: '1992-02-03', value: 4 },
      { year: '1993-02-03', value: 3.5 },
      { year: '1994-02-03', value: 5 },
      { year: '1995-02-03', value: 9.9 },
      { year: '1996-02-03', value: 6 },
      { year: '1997-02-03', value: 7 }
  ]);
  let [orders,setOrders] = useState([
      { year: '1991-02-03', value: 3 },
      { year: '1992-02-03', value: 4 },
      { year: '1993-02-03', value: 2.5 },
      { year: '1994-02-03', value: 5 },
      { year: '1995-02-03', value: 4.9 },
      { year: '1996-02-03', value: 6 },
      { year: '1997-02-03', value: 7 }
  ]);
  let [pageView,setPageView] = useState([
      { year: '1991-02-03', value: 3 },
      { year: '1992-02-03', value: 4 },
      { year: '1993-02-03', value: 3 },
      { year: '1994-02-03', value: 5 },
      { year: '1995-02-03', value: 4.9 },
      { year: '1996-02-03', value: 9 },
      { year: '1997-02-03', value: 7 }
  ]);
  let [refundAmount,setRefundAmount] = useState([
      { year: '1991-02-03', value: 3 },
      { year: '1992-02-03', value: 4 },
      { year: '1993-02-03', value: 4.5 },
      { year: '1994-02-03', value: 5 },
      { year: '1995-02-03', value: 6.9 },
      { year: '1996-02-03', value: 6 },
      { year: '1997-02-03', value: 8 }
  ]);
  // 当前时间段
  const [formDate, setFormDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();
  // 对比时间段
  const [lastFormDate, setLastFormDate] = useState<string>();
  const [lastToDate, setLastToDate] = useState<string | undefined>();

  // 图表
  const chartList = 
    [
      {
          id:0,
          title : "访客数异动分析",
          statistics : "统计",
          amount : "0.00",
          // compare : contrastTitle,
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "销售额",
          statistics : "统计",
          amount : "US$0.00",
          formDate : formDate,
          toDate : toDate,
          lastForm :lastFormDate,
          lastToDate:lastToDate,
          compare : contrastTitle,
          config : {
            autoFit: true,
            data:salesVolumeData,
            style: {
              width:"1000px",
            },
            viewStyle: {
              // 视图的样式
              width:"1000px",
            },
            xField: 'year',
            yField: 'value',
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            // 坐标轴配置
            axis: {
              x: {
                line:true,
                lineLineWidth: 0.5, // 轴线宽度
              },
              y: { tickCount: 5 },
            },
            interaction: {
              tooltip: {
                render:(e:any,{title, items}:any)=>{
                  // let flag =0
                  if(flag==="1"){
                    // getLastMonth(title)
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>销售额</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>销售额[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>销售额</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>销售额[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>销售额</span>
                        <span>US$0.00</span>
                      </div>
                    </div>
                  }
                }
              },
            },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "已付款金额",
          statistics : "统计",
          amount : "0.00",
          formDate : formDate,
          toDate : toDate,
          compare : contrastTitle,
          config : {
            data:amountPaid,
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            xField: 'year',
            yField: 'value',
            interaction: {
              tooltip: {
                render:(e:any,{title, items}:any)=>{
                  if(flag==="1"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>已付款金额</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>已付款金额[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>已付款金额</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>已付款金额[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>已付款金额</span>
                        <span>US$0.00</span>
                      </div>
                    </div>
                  }
                }
              },
            },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "访客数",
          statistics : "统计",
          amount : "0",
          formDate : formDate,
          toDate : toDate,
          compare : contrastTitle,
          config : {
            data:visitorsNum,
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            xField: 'year',
            yField: 'value',
            interaction: {
              tooltip: {
                render:(e:any,{title, items}:any)=>{
                  if(flag==="1"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>访客数</span>
                          <span>0</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>访客数[对比]</span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>访客数</span>
                          <span>0</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>访客数[对比]</span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>访客数</span>
                        <span>0</span>
                      </div>
                    </div>
                  }
                 
                }
              },
            },
          },
          seriesField: 'type',
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "转化率",
          statistics : "统计",
          amount : "0.00",
          compare : contrastTitle,
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "客单价",
          statistics : "统计",
          amount : "US$0.00",
          formDate : formDate,
          toDate : toDate,
          compare : contrastTitle,
          config : {
            data:customer,
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            xField: 'year',
            yField: 'value',
            interaction: {
              tooltip: {
                render:(e:any,{title, items}:any)=>{
                  if(flag==="1"){
                    // getLastMonth(title)
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>客单价</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>客单价[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>客单价</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>客单价[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>客单价</span>
                        <span>US$0.00</span>
                      </div>
                    </div>
                  }
                }
              },
            },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "订单数",
          statistics : "统计",
          amount : "0",
          formDate : formDate,
          toDate : toDate,
          compare : contrastTitle,
          config : {
            data:orders,
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            xField: 'year',
            yField: 'value',
            interaction: {
              tooltip: {
                render:(e:any,{title, items}:any)=>{
                  if(flag==="1"){
                    // getLastMonth(title)
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>订单数</span>
                          <span>0</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>订单数[对比]</span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>订单数</span>
                          <span>0</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>订单数[对比]</span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>订单数</span>
                        <span>0</span>
                      </div>
                    </div>
                  }
                 
                }
              },
            },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "浏览量",
          statistics : "统计",
          amount : "0",
          formDate : formDate,
          toDate : toDate,
          compare : contrastTitle,
          config : {
            data:pageView,
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            xField: 'year',
            yField: 'value',
            interaction: {
              tooltip: {
                render:(e:any,{title, items}:any)=>{
                  if(flag==="1"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>浏览量</span>
                          <span>0</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>浏览量[对比]</span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>浏览量</span>
                          <span>0</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>浏览量[对比]</span>
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>浏览量</span>
                        <span>0</span>
                      </div>
                    </div>
                  }
                }
              },
            },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "退款金额",
          statistics : "统计",
          amount : "US$0.00",
          formDate : formDate,
          toDate : toDate,
          compare : contrastTitle,
          config : {
            data:refundAmount,
            title: {
              visible: true,
              text: '带数据点的折线图',
            },
            xField: 'year',
            yField: 'value',
            interaction: {
              tooltip: {
                // render: (event, { title, items }) => {
                //   <div>Your custom render content here.</div>,
                // }
                render:(e:any,{title, items}:any)=>{
                  if(flag==="1"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>退款金额</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastMonth(new Date(title))}</div>
                        <div>
                          <span>退款金额[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else if(flag === "2"){
                    return <div style={{color:"#000"}}>
                      <div>
                        <div>{title}</div>
                        <div>
                          <span>退款金额</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                      <div>
                        <div>{getLastYear(new Date(title))}</div>
                        <div>
                          <span>退款金额[对比]</span>
                          <span>US$0.00</span>
                        </div>
                      </div>
                    </div>
                  }else{
                    return <div>
                      <div>{title}</div>
                      <div>
                        <span>退款金额</span>
                        <span>US$0.00</span>
                      </div>
                    </div>
                  }
                 
                }
              },
            },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        }
  ]
  // 日期
  const { RangePicker } = DatePicker;

  // 对比
  const compareHandleChange = (value: string) => {
    // 0 1 2
    setFlag(value)
    if(value == "0"){
      setcontrastTitle("")
    }
    if(value == "1"){
      setcontrastTitle("较上月同期")
    }
    if(value == "2"){
      setcontrastTitle("较去年同期")
    }
  };
  // 根据时间筛选修改图表数据  ---
  function chartDate (startTime:any,endTime:any,key:number){
    let tempList:any = [];
    objList.then(res=>{
      if(res.code == 0){
        switch (key) {
          // 销售数据
          case 1:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    // { year: '1992', value: 4 },
                    {year:item.date,value:item.salesVolume}
                  )
              }
            })
            setSalesVolumeData(tempList)
          break;
          case 2:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    {year:item.date,value:item.amountPaid}
                  )
              }
            })
            setAmountPaid(tempList)
          break;
          case 3:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    {year:item.date,value:item.visitorsNum}
                  )
              }
            })
            setVisitorsNum(tempList)
          break;
          case 4:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    {year:item.date,values:item.customer}
                  )
              }
            })
            setSalesCustomer(tempList)
          break;
          case 5:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    {year:item.date,value:item.orders}
                  )
              }
            })
            setOrders(tempList)
          break;
          case 6:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    {year:item.date,value:item.pageView}
                  )
              }
            })
            setPageView(tempList)
          break;
          case 7:
            res.data.forEach((item:any)=>{
              if(new Date(item.date)>startTime && new Date(item.date)<endTime){
                  tempList.push(
                    {year:item.date,value:item.refundAmount}
                  )
              }
            })
            setRefundAmount(tempList)
          break;
        }
      }
    })
  }

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      // chartList[1].data =["2020-10-10","1"];
      let startDate = new Date(dateStrings[0]);
      let endDate = new Date(dateStrings[1]);
      for(let i=1;i<=7;i++){
        chartDate(startDate,endDate,i);
        // console.log(chartList)
      }
      // 
      setFormDate((startDate.getMonth()+1)+"/"+(startDate.getDate()));
      setToDate((endDate.getMonth()+1)+"/"+(endDate.getDate()));

      //  0 ---  1 --- yue   2-----nian
      // console.log(startDate)
      // console.log(endDate)
      // setLastFormDate(getLastMonth(startDate))
      // console.log(getLastMonth(startDate))
      // 2024-10-05  -- 1
      if(flag == "1"){
        let tempTime = new Date(getLastMonth(startDate));
        let tempTime2 = new Date(getLastMonth(endDate));
        //  (+"-"+(tempTime2.getMonth()+1)+"/"+tempTime.getDate()
        setLastFormDate((tempTime.getMonth()+1)+"/"+tempTime.getDate())
        setLastToDate((tempTime2.getMonth()+1)+"/"+tempTime2.getDate())
      }
      if(flag == "2"){
        // 格式化为 /
        let tempTime = new Date(getLastYear(startDate));
        let tempTime2 = new Date(getLastYear(endDate));
        setLastFormDate(tempTime.getFullYear()+"/"+(tempTime.getMonth()+1)+"/"+tempTime.getDate())
        setLastToDate(tempTime2.getFullYear()+"/"+(tempTime2.getMonth()+1)+"/"+tempTime2.getDate())
      }
    } else {
      // console.log('Clear');
    }
  };
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: '今天', value: [dayjs().add(0, 'd'), dayjs()] },
    { label: '过去24小时', value: [dayjs().add(-24, 'h'), dayjs()] },
    { label: '昨天', value: [dayjs().add(-1, 'd'), dayjs()] },
    { label: '过去7天', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '过去30天', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: '过去90天', value: [dayjs().add(-90, 'd'), dayjs()] },
    { label: '上月', value: [dayjs().add(-1, 'M'), dayjs()] },
    { label: '上年', value: [dayjs().add(-1, 'y'), dayjs()] },
    { label: '本周累计', value: [dayjs().add(0, 'w'), dayjs()] },
    { label: '本月累计', value: [dayjs().add(0, 'M'), dayjs()] }
  ];
  // 图表数组
  // 文字提示
  const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  async function a(){
    await sleep(2000)
    setLoading(true)
  }

  useEffect(() => {
    a()
  }, []);

  return (
    <div>
      <div className="head">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '25px', fontWeight: 'bold' }}>分析</div>
          {/* 获取位置时区 */}
          <div style={{ padding: '20px' }}>当前时区: (GMT+08:00) Asia/Shanghai</div>
        </div>
        <DrivingScreen/>
      </div>

      <div className="date">
        <div>
          <RangePicker presets={rangePresets} onChange={onRangeChange} />
          <div style={{display:"inline-block",width:"10px"}}></div>
          {/* 对比 */}
          <Select
            defaultValue="对比"
            style={{ width: 120 }}
            onChange={compareHandleChange}
            options={[
              { value: '0', label: '无对比' },
              { value: '1', label: '上一月' },
              { value: '2', label: '上一年' },
            ]}
          />
        </div>
        
        
        <div>
          <input type="checkbox"></input>
          <span style={{padding:'5px'} }>自动刷新</span>
          <span>
            <Tooltip title="数据每 60 秒刷新一次" placement="bottomRight">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
          <Button style={{ left:'10px' }}>自定义</Button>
        </div>
      </div>
      {/* 图表 */}
      {/* 抽离成组件 */}
      {/* 遍历图表数组：item为图表数组中的元素，index为索引 */}
      <div>
        <Masonry
          direction="column"
          columnsCountBreakPoints={{
            1400: 3,
            1000: 3,
            700: 2,
          }}
        >
          { 
          chartList.map((item, index) => {
          // 弹窗
          const content = (
            <div>
              <p>{item.description}</p>
              <p>{item.formula}</p>
            </div>
          );
          // 访客数异动分析
          if(index == 0){
            return (
              <div className='sellBox'>
                <div key={index} className="sell" >
                  <div className="shadow">
                    <div className="shadow-container">
                      <div className="shadow-1">
                        <div className="shadow-1-1">
                          <div className="shandow-1-item">
                            <div style={{ display: 'flex' }}>
                              <div>
                              <Popover placement="topLeft" content={content}>
                                <span style={{ display: 'inline-block', cursor: 'pointer' }}>
                                  <span className="shandow-1-item-title">{item.title}</span>
                                </span>
                              </Popover>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 提示 */}
                        <div className='visitorData'>
                          <div className='visitor'>
                            <div><InfoCircleOutlined /></div>
                            <div>该数据为实时更新。当筛选无对比时，不显示访客异动。</div>
                          </div>
                          <div style={{fontSize:'12px'}}><CloseOutlined /></div>
                        </div>
                        <div style={{height:"10px", width:"100%"}}></div>
                        {/* Contribution degree */}
                        {/* <div className='contributionDegree'> */}
                        <div className='contributionDegree'>
                          <div><span style={{borderBottom:"1px dashed #b8becc"}}>推荐来源名称正向贡献数</span><span style={{fontSize:"10px",marginLeft:"8px"}}><RightOutlined /></span></div>
                          <div className='num'>0</div>
                        </div>
                        <div style={{height:"10px", width:"100%"}}></div>
                        <div className='contributionDegree'>
                          <div><span style={{borderBottom:"1px dashed #b8becc"}}>推荐来源名称负向贡献数</span><span style={{fontSize:"10px",marginLeft:"8px"}}><RightOutlined /></span></div>
                          <div className='num'>0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          // 转化率
          if(index == 4){
            // 弹窗
            const content2 = (
              <div>
                <p>{item.description}</p>
                <p>{item.formula}</p>
              </div>
            );
            return (
              <div className='sellBox'>
              <div key={index} className="sell" >
              <div className="shadow">
                <div className="shadow-container">
                  <div className="shadow-1">
                    <div className="shadow-1-1">
                      <div>
                        <div className="shandow-1-item">
                          <div style={{ display: 'flex' }}>
                            <div>
                            <Popover placement="topLeft" content={content2}>
                              <span style={{ display: 'inline-block', cursor: 'pointer' }}>
                                <span className="shandow-1-item-title">{item.title}</span>
                              </span>
                            </Popover>
                            </div>
                          </div>
                          <div style={{ paddingLeft: '8px' }}>
                            <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
                              <span>{item.statistics}</span>
                            </a>
                          </div>
                        </div>
                        <div className="shadow-2-item">
                          <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}></span>
                          <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>{item.amount}</span>
                        </div>
                        {
                          item.compare !== "" && <div className="shadow-3-item">
                          <span style={{ marginRight: '4px', color: '#474f5e' }}>{item.compare}</span>
                          <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
                          </div>
                        </div>
                        }
                        <div className='rate'>
                          <div>
                            <Popover placement="topLeft" content={content2}>
                            <div>访客数</div>
                            </Popover>
                            <div className='num'>0</div>
                          </div>
                        </div>
                        <div className='rate' style={{width:"90%",marginLeft:"5%"}}>
                          <div>
                            <div>加入购物车</div>
                            <div className='num'>0</div>
                          </div>
                          <div><div>立即购买</div>
                            <div className='num'>0</div>
                          </div>
                          <div><div>...</div>
                            <div className='num'>0</div>
                          </div>
                        </div>
                        <div className='rate' style={{width:"80%",marginLeft:"10%"}}>
                          <div><div>到达结账</div>
                            <div className='num'>0</div>
                          </div>
                        </div>
                        <div className='rate' style={{width:"70%",marginLeft:"15%"}}>
                          <div><div>添加用户信息</div>
                            <div className='num'>0</div>
                          </div>
                        </div>
                        <div className='rate' style={{width:"60%",marginLeft:"20%"}}>
                          <div><div>选择物流方式</div>
                            <div className='num'>0</div>
                          </div>
                        </div>
                        <div className='rate' style={{width:"50%",marginLeft:"25%"}}>
                          <div><div>完成结账</div>
                            <div className='num'>0</div>
                          </div>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'none' }}></div>
              </div>
              </div>
            )
          }
          return (
            <div className='sellBox' style={{width: '100%'}}>
              {loading ? <div key={index} className="sell" >
              <div className="shadow">
                <div className="shadow-container">
                  <div className="shadow-1">
                    <div className="shadow-1-1">
                      <div>
                        <div className="shandow-1-item">
                          <div style={{ display: 'flex' }}>
                            <div>
                            <Popover placement="topLeft" content={content}>
                              <span style={{ display: 'inline-block', cursor: 'pointer' }}>
                                <span className="shandow-1-item-title">{item.title}</span>
                              </span>
                            </Popover>
                            </div>
                        </div>
                        <div style={{ paddingLeft: '8px' }}>
                            <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
                              <span>{item.statistics}</span>
                            </a>
                          </div>
                        </div>
                        <div className="shadow-2-item">
                          <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}></span>
                          <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>{item.amount}</span>
                        </div>
                        { item.compare !=="" && <div className="shadow-3-item">
                          <span style={{ marginRight: '4px', color: '#474f5e' }}>{item.compare}</span>
                          <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
                          </div>
                        </div> }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* { item.data?.length&& <EchartsPage dataList={item.data}/>} */}
              {/* <EchartsPage dataList={salesVolumeData}/> */}
              <Line {...item.config} />
              <div style={{ display: 'none' }}></div>
              { flag !== "0" && <div className="legendWrapper">
                <div className="container_1B">
                  <div className="legend_k">
                    <div className="iconWrapper">
                      <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
                      <div>{item.formDate}-{item.toDate}</div>
                    </div>
                  </div>
                  <div className="legend_k">
                    <div className="iconWrapper">
                      <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
                      <div>{lastFormDate}-{lastToDate}</div>
                    </div>
                  </div>
                </div>
              </div> }
              </div>:<div className="sell" style={{height:"400px"}}></div>}
            </div>
          )
          })
        }
        </Masonry>
      </div>
    </div>
  )
}