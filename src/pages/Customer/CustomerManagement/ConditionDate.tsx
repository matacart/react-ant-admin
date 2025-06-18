import MyButton from "@/components/Button/MyButton";
import { CloseIcon, UnfoldIcon } from "@/components/Icons/Icons";
import cousomerManagement from "@/store/customer/cousomerManagement";
import { DatePicker, Flex, Input, Popover, Row, Select, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface conditionTypeOptions{
    label:string,
    value:string,
    tip:string
}

interface conditionType{
    label:string,
    options?:conditionTypeOptions[],
    selectOptions:string[],
}

interface propsType{
    index:number,
    condition:conditionType[]
}

const { RangePicker } = DatePicker;

function ConditionDate({condition,index}:propsType){

    const [open,setOpen] = useState(false);

    const myRef = useRef(null);

    // 条件
    const [time,setTime] = useState("");

    const [options,setOptions] = useState([
        { label:"今天",value:"今天" },
        { label:"过去7天",value:"过去7天" },
        { label:"过去30天",value:"过去30天" },
        { label:"过去90天",value:"过去90天" },
        { label:"过去12个月",value:"过去12个月" },
    ])

    const content = (
        <div style={{minWidth:"128px"}}>
            <Flex gap={8}>
                <div style={{width:"100%"}}>
                    {options.map((item,index)=>(
                        <div className="item cursor-pointer" onClick={()=>{
                            setTime(item.value)
                            setOpen(false)
                        }}>{item.label}</div>
                    ))}
                </div>
            </Flex>
            <div className="customTime">
                <div className="font-12 color-7A8499" style={{marginBottom:"8px"}}>自定义时间区间</div>
                <div>
                    <RangePicker style={{height:"36px"}} />
                </div>
            </div>
            <Flex align="center" justify="space-between" className="font-12" style={{padding:"12px"}}>
                <div className="color-474F5E cursor-pointer" onClick={()=>setTime("")}>重置</div>
                <MyButton className="font-12" type="primary" size="small" text="继续筛选" />
            </Flex>
        </div>
    )
    
    return(
        <Scoped ref={myRef}>
            {/*  */}
            <Popover open={open} onOpenChange={(open)=>setOpen(open)} className="popover" content={content} getPopupContainer={()=>myRef.current!} arrow={false} placement="bottomLeft" trigger="click">
                <Flex className="select-item color-242833 cursor-pointer" align="center">
                    <Flex gap={8}>
                        <div>{condition[0].label}</div>
                        {time && <div>{time}</div>}
                    </Flex>
                    {/*  */}
                    <UnfoldIcon style={{marginLeft:"4px"}} className={open?"font-18 active":"font-18 no-active"} />

                    {/* 移除 */}
                    <div className="colse font-12" onClick={(e)=>{
                        e.stopPropagation()
                        const newConditionList = [...cousomerManagement.conditionList]
                        newConditionList.splice(index,1)
                        cousomerManagement.setConditionList(newConditionList)
                    }}>
                        <CloseIcon />
                    </div>
                </Flex>
            </Popover>
        </Scoped>
    )
}

export default ConditionDate;

const Scoped = styled.div`
    .ant-popover-inner {
        padding: 0;
    }
    .select-item{
        position: relative;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        padding: 6px 8px;
        .select-item-conditions{
            padding: 0 4px;
        }
        .select-item-text{
            padding: 0 4px;
        }
        .active{
            color:rgb(0 0 0 / 25%);
            transform: rotate(180deg);
            transition: transform 0.3s;  // 添加旋转动画
        }
        .no-active{
            color:rgb(0 0 0 / 25%);
            transform: rotate(0deg);
            transition: transform 0.3s;  // 添加旋转动画
        }
    }
    .select-item:hover{
        border-color: #356dff;
        box-shadow: 0 0 12px rgba(53, 109, 255, 0.15);
        .select-item-conditions{
            padding: 0 4px;
            background-color: #f0f3f9;
            border-radius: 2px;
        }

        .select-item-text{
            padding: 0 4px;
            background-color: #f0f3f9;
            border-radius: 2px;
        }
    }

    .colse{
        display: none;
        position: absolute;
        top:0;
        right:0;
        padding: 2px;
        color:#FFF;
        background: #b8becc;
        border-radius: 20px;
        transform:translateX(6px) translateY(-6px);
    }
    .select-item:hover .colse{
        display: flex;
    }

    .item{
        padding: 8px 12px;
    }
    .item:first-child{
        border-radius: 8px 8px 0 0;
    }
    .item:hover{
        background-color: #f7f8fb;
    }
    .customTime{
        border-top: 1px solid #eef1f6;
        border-bottom: 1px solid #eef1f6;
        padding: 12px;
    }
`