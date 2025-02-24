import { Card, DatePicker, Form, Input, Radio, Select, Tooltip } from "antd";
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import styled from "styled-components";


const {TextArea} = Input

import moment from 'moment';

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};



function ExpiredInformationCard() {

    const [isExpirationDate,setIsExpirationDate] = useState("1")
  
    useEffect(()=>{
       
    })


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
                {isExpirationDate == "2" && <>
                    <DatePicker onChange={()=>{}} disabledDate={(current) => current && current < moment().startOf('day')} />
                    <div style={{marginTop:"4px"}} className="font-12 color-7A8499">(UTC+08:00) Asia/Shanghai</div>
                </>}  
            </Card>
        </Scoped>
        
    )
}

export default ExpiredInformationCard


const Scoped = styled.div`

    

    .radio-box{
        margin-top: 20px;
        margin-bottom: 12px;
    }
`