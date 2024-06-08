import React, { useEffect, useState } from 'react';  
  
function formatDateTime(date:any) {  
    const options = {  
      weekday: 'long',  
      year: 'numeric',  
      month: 'long',  
      day: 'numeric',  
      hour: 'numeric',  
      minute: 'numeric',  
      hour12: true, // 使用12小时制  
    };  
    
    // 获取本地化的日期和时间字符串（不包括时间部分）  
    const dateTimeStringWithoutTime = date.toLocaleString('zh-CN', {  
      ...options,  
      hour: 'numeric', // 保留小时字段以便后续处理，但这里不会用于输出  
      minute: undefined, // 不需要分钟字段  
      second: undefined, // 不需要秒字段  
      hour12: undefined, // 不需要指定12小时制，因为后续会手动处理  
    }).split(', ')[0]; // 移除时间部分  
    
    // 单独处理时间部分  
    const hours = date.getHours();  
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 保证分钟数总是两位数  
    const isPM = hours >= 12; // 判断是上午还是下午  
    const formattedHour = isPM ? (hours - 12) % 12 || 12 : hours; // 转换为12小时制并处理中午12点和午夜12点  
    
    // 拼接最终的字符串  
    return `店铺所在时区时间：${isPM ? '下午' : '上午'}${formattedHour}:${minutes} ${dateTimeStringWithoutTime.slice(dateTimeStringWithoutTime.lastIndexOf('年') + 1)}`;  
  }  
    
  // ... 其余代码保持不变 ...
  
// React 组件  
function ShopTimeDisplay() {  
  const [currentTime, setCurrentTime] = useState(new Date());  
  
  // 使用 useEffect 来在组件加载后每秒更新当前时间  
  useEffect(() => {  
    const timer = setInterval(() => {  
      setCurrentTime(new Date());  
    }, 1000);  
  
    return () => {  
      clearInterval(timer);  
    };  
  }, []);  
  
  return (  
    <div>  
      {formatDateTime(currentTime)}  
    </div>  
  );  
}  
  
export default ShopTimeDisplay;