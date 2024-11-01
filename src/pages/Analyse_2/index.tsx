// import { Line } from '@ant-design/charts';
// import { DatePicker, Button,Tooltip,Popover,Flex   } from "antd";
// import { ExpandOutlined,QuestionCircleOutlined } from '@ant-design/icons';
// import React, { useState,useRef, useEffect } from 'react';
// import './index.scss';
// import { Col, Divider, Row } from 'antd';
// import classes from './../../.umi/typings.d';

// // 是否全屏
// function DrivingScreen() {
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const toggleFullScreen = () => {
//     if (!isFullScreen) {
//       if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//       } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
//         document.documentElement.mozRequestFullScreen();
//       } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//         document.documentElement.webkitRequestFullscreen();
//       } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
//         document.documentElement.msRequestFullscreen();
//       }
//       setIsFullScreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) { /* Firefox */
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) { /* IE/Edge */
//         document.msExitFullscreen();
//       }
//       setIsFullScreen(false);
//     }
//   };

//   return (
//     <Button onClick={toggleFullScreen} icon={<ExpandOutlined />} color="default" variant="filled">
//             {isFullScreen ? '退出全屏' : '全屏'}
//     </Button>
//   );
// }


// export default function analys() {
//   // 图表数组
//   const chartList = [
//     { 
//       title : "销售额",
//       statistics : "统计",
//       amount : "0.00",
//       compare : "较去年同期",
//       config : {
//         height: 300,
//         forceFit: true,
//         data : [
//           { year: '1991', value: 3 },
//           { year: '1992', value: 4 },
//           { year: '1993', value: 3.5 },
//           { year: '1994', value: 5 },
//           { year: '1995', value: 4.9 },
//           { year: '1996', value: 6 },
//           { year: '1997', value: 7 },
//           { year: '1998', value: 9 },
//           { year: '1999', value: 13 }
//         ],
//         xField: 'year',
//         yField: 'value',
//         label: {
//           visible: true,
//           type: 'point',
//         },
//       },
//       description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
//       formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
//     },
//     { 
//       title : "销售额",
//       statistics : "统计",
//       amount : "0.00",
//       compare : "较去年同期",
//       config : {
//         height: 300,
//         forceFit: true,
//         data : [
//           { year: '1991', value: 3 },
//           { year: '1992', value: 4 },
//           { year: '1993', value: 3.5 },
//           { year: '1994', value: 5 },
//           { year: '1995', value: 4.9 },
//           { year: '1996', value: 6 },
//           { year: '1997', value: 7 },
//           { year: '1998', value: 9 },
//           { year: '1999', value: 13 }
//         ],
//         xField: 'year',
//         yField: 'value',
//         label: {
//           visible: true,
//           type: 'point',
//         },
//       },
//       description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
//       formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
//     },
//     { 
//       title : "销售额",
//       statistics : "统计",
//       amount : "0.00",
//       compare : "较去年同期",
//       config : {
//         height: 300,
//         forceFit: true,
//         data : [
//           { year: '1991', value: 3 },
//           { year: '1992', value: 4 },
//           { year: '1993', value: 3.5 },
//           { year: '1994', value: 5 },
//           { year: '1995', value: 4.9 },
//           { year: '1996', value: 6 },
//           { year: '1997', value: 7 },
//           { year: '1998', value: 9 },
//           { year: '1999', value: 13 }
//         ],
//         xField: 'year',
//         yField: 'value',
//         label: {
//           visible: true,
//           type: 'point',
//         },
//       },
//       description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
//       formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
//     },
//     { 
//       title : "销售额",
//       statistics : "统计",
//       amount : "0.00",
//       compare : "较去年同期",
//       config : {
//         height: 300,
//         forceFit: true,
//         data : [
//           { year: '1991', value: 3 },
//           { year: '1992', value: 4 },
//           { year: '1993', value: 3.5 },
//           { year: '1994', value: 5 },
//           { year: '1995', value: 4.9 },
//           { year: '1996', value: 6 },
//           { year: '1997', value: 7 },
//           { year: '1998', value: 9 },
//           { year: '1999', value: 13 }
//         ],
//         xField: 'year',
//         yField: 'value',
//         label: {
//           visible: true,
//           type: 'point',
//         },
//       },
//       description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
//       formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
//     },
//     { 
//       title : "销售额",
//       statistics : "统计",
//       amount : "0.00",
//       compare : "较去年同期",
//       config : {
//         height: 300,
//         forceFit: true,
//         data : [
//           { year: '1991', value: 3 },
//           { year: '1992', value: 4 },
//           { year: '1993', value: 3.5 },
//           { year: '1994', value: 5 },
//           { year: '1995', value: 4.9 },
//           { year: '1996', value: 6 },
//           { year: '1997', value: 7 },
//           { year: '1998', value: 9 },
//           { year: '1999', value: 13 }
//         ],
//         xField: 'year',
//         yField: 'value',
//         label: {
//           visible: true,
//           type: 'point',
//         },
//       },
//       description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
//       formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
//     },
//     { 
//       title : "销售额",
//       statistics : "统计",
//       amount : "0.00",
//       compare : "较去年同期",
//       config : {
//         height: 300,
//         forceFit: true,
//         data : [
//           { year: '1991', value: 3 },
//           { year: '1992', value: 4 },
//           { year: '1993', value: 3.5 },
//           { year: '1994', value: 5 },
//           { year: '1995', value: 4.9 },
//           { year: '1996', value: 6 },
//           { year: '1997', value: 7 },
//           { year: '1998', value: 9 },
//           { year: '1999', value: 13 }
//         ],
//         xField: 'year',
//         yField: 'value',
//         label: {
//           visible: true,
//           type: 'point',
//         },
//       },
//       description : "下单成单的订单金额。包含商品税、运费、优惠金额和退回的金额等，包括所有销售渠道的订单以及导入订单。",
//       formula : "销售额=小计金额-优惠金额+商品税+运费+运费税+小费-积分抵扣金额+舍入调整金额+关税-退款金额"
//     },
//   ]

//   // 文字提示

//   const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');
  
//   const content = (
//     <div>
//       <p>Content</p>
//       <p>Content</p>
//     </div>
//   );
  
//   return (
//     <div>
//       <div className="head">
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{ fontSize: '25px', fontWeight: 'bold' }}>分析</div>
//           {/* 获取位置时区 */}
//           <div style={{ padding: '20px' }}>当前时区: (GMT+08:00) Asia/Shanghai</div>
//         </div>
//         <DrivingScreen/>
//       </div>

//       <div className="date">
//         <div>
//           <DatePicker>日期范围：今天</DatePicker>
//           <DatePicker style={{ left: '10px' }}>对比：上个时段</DatePicker>
//         </div>
//         <div>
//           <input type="checkbox"></input>
//           <span style={{padding:'5px'} }>自动刷新</span>
//           <span>
//             <Tooltip title="数据每 60 秒刷新一次" placement="bottomRight">
//               <QuestionCircleOutlined />
//             </Tooltip>
//           </span>
//           <Button style={{ left:'10px' }}>自定义</Button>
//         </div>
//       </div>
//       {/* 图表 */}
//       {/* 抽离成组件 */}
//       {/* 遍历图表数组：item为图表数组中的元素，index为索引 */}
//       <div className='a'>
//         {
//           chartList.map((item, index) => {
//           return (
//             <div className='sellBox'>
//                 <div key={index} className="sell" >
//                   <div className="shadow">
//                     <div className="shadow-container">
//                       <div className="shadow-1">
//                         <div className="shadow-1-1">
//                           <div className="shandow-1-item">
//                             <div style={{ display: 'flex' }}>
//                               <div>
//                               <Popover placement="topLeft" content={content}>
//                                 <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                                   <span className="shandow-1-item-title">{item.title}</span>
//                                 </span>
//                               </Popover>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         {/* 提示 */}
//                         <div className='visitorData'>
//                           <div className='visitor'>
//                             <div><InfoCircleOutlined /></div>
//                             <div>该数据为实时更新。当筛选无对比时，不显示访客异动。</div>
//                           </div>
//                           <div style={{fontSize:'12px'}}><CloseOutlined /></div>
//                         </div>
//                         <div style={{height:"10px", width:"100%"}}></div>
//                         {/* Contribution degree */}
//                         {/* <div className='contributionDegree'> */}
//                         <div className='contributionDegree'>
//                           <div><span style={{borderBottom:"1px dashed #b8becc"}}>推荐来源名称正向贡献数</span><span style={{fontSize:"10px",marginLeft:"8px"}}><RightOutlined /></span></div>
//                           <div className='num'>0</div>
//                         </div>
//                         <div style={{height:"10px", width:"100%"}}></div>
//                         <div className='contributionDegree'>
//                           <div><span style={{borderBottom:"1px dashed #b8becc"}}>推荐来源名称正向贡献数</span><span style={{fontSize:"10px",marginLeft:"8px"}}><RightOutlined /></span></div>
//                           <div className='num'>0</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//           )
//           })
//         }
//       </div>
//         <div style={{ padding: '10px' }}>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">访客数</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>9/29</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
//                     <div>9/28</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">订单数</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>9/29</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
//                     <div>9/28</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">访客按社交渠道分</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>9/29</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
//                     <div>9/28</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">热门着陆页面（按访客数）</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>9/29</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
//                     <div>9/28</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">营销活动带来的销售额</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>9/29</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
//                     <div>9/28</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">复购率</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>新客户</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(90,191,134)', borderStyle: 'solid' }}></i>
//                     <div>回头客</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="sell">
//             <div className="shadow">
//               <div className="shadow-container">
//                 <div className="shadow-1">
//                   <div className="shadow-1-1">
//                     <div>
//                       <div className="shandow-1-item">
//                         <div style={{ display: 'flex' }}>
//                           <div>
//                             <span style={{ display: 'inline-block', cursor: 'pointer' }}>
//                               <span className="shandow-1-item-title">按 POS 门店位置显示销售额</span>
//                             </span>
//                           </div>
//                         </div>
//                         <div style={{ paddingLeft: '8px' }}>
//                           <a style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}>
//                             <span>统计</span>
//                           </a>
//                         </div>
//                       </div>

//                       <div className="shadow-2-item">
//                         <span style={{ display: 'inline-block', verticalAlign: 'top', color: 'rgb(36, 40, 51)' }}>0</span>
//                       </div>

//                       <div className="shadow-3-item">
//                         <span style={{ marginRight: '4px', color: '#474f5e' }}>比较上一个阶段</span>
//                         <div style={{ display: 'inline-block' }}>
//                           <div style={{ display: 'inline-block', paddingLeft: '2px' }}>-</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Line {...chartList[0].config} />
//             <div style={{ display: 'none' }}></div>
//             <div className="legendWrapper">
//               <div className="container_1B">
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'solid' }}></i>
//                     <div>9/29</div>
//                   </div>
//                 </div>
//                 <div className="legend_k">
//                   <div className="iconWrapper">
//                     <i className="lineIcon" style={{ borderColor: 'rgb(53,109,255)', borderStyle: 'dotted' }}></i>
//                     <div>9/28</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>
//   )
// }
