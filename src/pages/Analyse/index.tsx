import { Line } from '@ant-design/plots';
import { DatePicker, Button,Tooltip,Popover,Flex,Space  } from "antd";
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
import { forEach, values } from 'lodash';


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

// 筛选出对应的日期 重新渲染图表
// 
function screeningDate(res:any,chartList:any,f1:any,f2:any,f3:any,f4: any,f5:any,f6:any,f7:any){
  
  chartList.forEach((i:any)=>{
    let temp:any = []
    res.data.forEach((res: any) =>{
      // 销售额
      if(res.salesVolume && i.title == "销售额"){
        temp.push(
          {
            year:res.date,
            type:i.title,
            value:res.salesVolume,
          }
        )
      }
      if(res.amountPaid && i.title == "已付款金额"){
        temp.push(
          {
            year:res.date,
            value:res.amountPaid,
            type:i.title,
          }
        )
      }
      if(res.visitorsNum && i.title == "访客数"){
        temp.push(
          {
            year:res.date,
            value:res.visitorsNum,
            type:i.title,
          }
        )
      }
      if(res.customer && i.title == "客单价"){
        temp.push(
          {
            year:res.date,
            value:res.customer,
            type:i.title,
          }
        )
      }
      if(res.orders && i.title == "订单数"){
        temp.push(
          {
            year:res.date,
            value:res.orders,
            type:i.title,
          }
        )
      }
      if(res.pageView && i.title == "浏览量"){
        temp.push(
          {
            year:res.date,
            value:res.pageView,
            type:i.title,
          }
        )
      }
      if(res.refundAmount && i.title == "退款金额"){
        temp.push(
          {
            year:res.date,
            value:res.refundAmount,
            type:i.title,
          }
        )
      }
      
    })
    if(i.title == "销售额"){
      f1(temp)
    }
    if(i.title == "已付款金额"){
      f2(temp)
    }
    if(i.title == "访客数"){
      f3(temp)
    }
    if(i.title == "订单数"){
      f5(temp)
    }
    if(i.title == "客单价"){
      f4(temp)
    }
    if(i.title == "浏览量"){
      f6(temp)
    }
    if(i.title == "退款金额"){
      f7(temp)
    }
    console.log(temp)
  })
  
  console.log(chartList);
}


// 对比 --- 根据范围获取
// 

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


// 
let objList = getAnalyse();
interface ChartDate {
  year: string;
  values: string;
  type: string;
}

export default function analys(this: any) {
  
  const [transformedData, setTransformedData] = useState<ChartDate[]>([]);
  const [transformedData1, setTransformedData1] = useState<ChartDate[]>([]);
  const [transformedData2, setTransformedData2] = useState<ChartDate[]>([]);
  const [transformedData3, setTransformedData3] = useState<ChartDate[]>([]);
  const [transformedData4, setTransformedData4] = useState<ChartDate[]>([]);
  const [transformedData5, setTransformedData5] = useState<ChartDate[]>([]);
  const [transformedData6, setTransformedData6] = useState<ChartDate[]>([]);

  // 当前时间段
  const [formDate, setFormDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();
  
  // 
  const chartList = 
    [
      {
          id:0,
          title : "访客数异动分析",
          statistics : "统计",
          amount : "0.00",
          compare : "较去年同期",
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "销售额",
          statistics : "统计",
          amount : "US$0.00",
          formDate : formDate,
          toDate : toDate,
          compare : "较去年同期",
          config : {
            forceFit: true,
            data:transformedData,
            xField: 'year',
            yField: 'value',
            // seriesField: 'type',
            tooltip: {
              itemTpl: `
                <li class="g2-tooltip-list-item">
                  <span class="g2-tooltip-value">{value}<span style="margin-left: 16px; color: #ccc">{rate}%</span></span>
                </li>
              `
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
          compare : "较去年同期",
          config : {
            height: 300,
            forceFit: true,
            data:transformedData1,
            xField: 'year',
            yField: 'value',
            label: {
              visible: true,
              type: 'point',
            },
            seriesField: 'type',
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
          compare : "较去年同期",
          config : {
          height: 300,
          forceFit: true,
          data:transformedData2,
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          seriesField: 'type',
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "转化率",
          statistics : "统计",
          amount : "0.00",
          compare : "较去年同期",
          config : {
          height: 300,
          forceFit: true,
          data:[],
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        },
        {
          title : "客单价",
          statistics : "统计",
          amount : "US$0.00",
          formDate : formDate,
          toDate : toDate,
          compare : "较去年同期",
          config : {
          height: 300,
          forceFit: true,
          data:transformedData3,
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          seriesField: 'type',
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
          compare : "较去年同期",
          config : {
          height: 300,
          forceFit: true,
          data:transformedData4,
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          seriesField: 'type',
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
          compare : "较去年同期",
          config : {
          height: 300,
          forceFit: true,
          data:transformedData5,
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          seriesField: 'type',
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
          compare : "较去年同期",
          config : {
          height: 300,
          forceFit: true,
          data:transformedData6,
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          seriesField: 'type',
          },
          description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
          formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
        }
  ]
  // 
  useEffect(() => {
    objList.then(res=>{ 
      screeningDate(res,chartList,setTransformedData,setTransformedData1,setTransformedData2,setTransformedData3,setTransformedData4,setTransformedData5,setTransformedData6)
    });
  }, [])
  
  // 日期
  const { RangePicker } = DatePicker;
  
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      // 
      let startDate = new Date(dateStrings[0]);
      let endDate = new Date(dateStrings[1]);

      setFormDate((startDate.getMonth()+1)+"/"+(startDate.getDate()));
      setToDate((endDate.getMonth()+1)+"/"+(endDate.getDate()));

      // 时间
      objList.then(res=>{
        let xList: any = [[],[],[],[],[],[],[]];
        res.data.forEach((e:any) => {
          if (new Date(e.date) >= startDate && new Date(e.date) <= endDate) {
            console.log('当前日期在指定范围内');
            xList[0].push({ year: e.date, value: e.salesVolume,type:"销售额"})
            xList[1].push({ year: e.date, type:"已付款金额",value: e.amountPaid})
            xList[2].push({ year: e.date, value: e.visitorsNum,type:"访客数" })
            xList[3].push({ year: e.date, value: e.customer,type:"客单价" })
            xList[4].push({ year: e.date, value: e.orders,type:"订单数" })
            xList[5].push({ year: e.date, value: e.pageView,type:"浏览量" })
            xList[6].push({ year: e.date, value: e.refundAmount,type:"退款金额" })
          }else{
            console.log("no")
          }
        });
        console.log(xList);
        // console.log(chartList)
        setTransformedData(xList[0])
        setTransformedData1(xList[1])
        setTransformedData2(xList[2])
        setTransformedData3(xList[3])
        setTransformedData4(xList[4])
        setTransformedData5(xList[5])
        setTransformedData6(xList[6])
            
        // console.log(res.data)
      })
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);



      // startDate endDate

      timeFrame(startDate,endDate)

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
                          <div><span style={{borderBottom:"1px dashed #b8becc"}}>推荐来源名称正向贡献数</span><span style={{fontSize:"10px",marginLeft:"8px"}}><RightOutlined /></span></div>
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
                        <div className="shadow-3-item">
                          <span style={{ marginRight: '4px', color: '#474f5e' }}>{item.compare}</span>
                          <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
                          </div>
                        </div>
                        {/*  */}
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
                        <div className="shadow-3-item">
                          <span style={{ marginRight: '4px', color: '#474f5e' }}>{item.compare}</span>
                          <div style={{ display: 'inline-block' }}>
                            <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <Line {...chartList[index].config} />
              <div style={{ display: 'none' }}></div>
              <div className="legendWrapper">
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
                      <div>213</div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )
          })
        }
        </Masonry>
        
      </div>
    </div>
  )
}

// export default LineBarChart;
