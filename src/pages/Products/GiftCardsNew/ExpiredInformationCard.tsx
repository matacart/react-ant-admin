import { Card, DatePicker, Form, Input, Radio, Select, Tooltip } from "antd";
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from 'moment';
import dayjs from "dayjs";
// 引入 utc 插件
import utc from "dayjs/plugin/utc";
// 引入 timezone 插件
import timezone from "dayjs/plugin/timezone";

import MyDatePicker from "@/components/DatePicker/MyDatePicker";

dayjs.extend(utc)
dayjs.extend(timezone)

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

function ExpiredInformationCard() {

    const [isExpirationDate,setIsExpirationDate] = useState(1);

    const [currentTime,setCurrentTime] = useState<dayjs.Dayjs>();
  
    useEffect(()=>{
        setCurrentTime(dayjs());
        // const time = dayjs.tz(Date.now(), "Asia/Shanghai").format("YYYY-MM-DD");
    },[])

    return (
        <Scoped>
            <Card title={<div className="">过期信息</div>} className='product-data-card'>
                <div className="font-12 color-7A8499">各国家/地区对于礼品卡到期日期有着不同的法律规定。在更改此日期之前，请查阅您所在国家/地区的法律。</div>
                <div className="radio-box">
                    <Radio.Group
                        style={style}
                        onChange={(e)=>setIsExpirationDate(e.target.value)}
                        value={isExpirationDate}
                        options={[
                            { value: 1, label: '无过期日期' },
                            { value: 2, label: <div>
                                设置过期日期
                                <Tooltip title="礼品卡有效时间不得小于10日。">
                                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                        <QuestionCircleOutlined />
                                    </span>
                                </Tooltip>
                            </div> },
                        ]}
                    />
                </div>
                {isExpirationDate == 2 && <>
                    <MyDatePicker className="my-date-picker" value={currentTime} onChange={()=>{}} disabledDate={(current) => current && current < moment().startOf('day')} />
                    <div style={{marginTop:"6px"}} className="font-12 color-7A8499">(UTC+08:00) Asia/Shanghai</div>
                </>}  
            </Card>
        </Scoped>
        
    )
}

export default ExpiredInformationCard


const Scoped = styled.div`

    .my-date-picker{
        height: 36px;
    }

    .radio-box{
        margin-top: 20px;
        margin-bottom: 12px;
    }
`