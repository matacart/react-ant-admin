import MyButton from "@/components/Button/MyButton";
import MyDropdown from "@/components/Dropdown/MyDropdown"
import { CloseIcon, UnfoldIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import cousomerManagement from "@/store/customer/cousomerManagement";
import { Checkbox, Flex, Popover, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface conditionTypeOptions{
    label:string;
    value:string;
    tip:string;
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


function ConditionCheckedGroupSearch({condition,index}:propsType){

    const conditionItem = condition[0]

    const [open,setOpen] = useState(false);

    const [symbol,setSymbol] = useState("=");

    const [isInput,setIsInput] = useState(false);

    const myRef = useRef(null);

    // 条件
    const [checkList,setCheckList] = useState<string[]>(conditionItem.selectOptions);

    const content = (
        <div style={{minWidth:"128px"}}>
            <div style={{padding:"12px 12px 8px"}}>
                <MyInput style={{height:"36px"}} placeholder="搜索" />
            </div>
            <Flex gap={8}>
                <div style={{width:"100%"}}>
                    {conditionItem?.options && conditionItem.options.length > 0 ? <Checkbox.Group className="check-group" style={{ width: '100%',display:"flex",flexDirection:"column" }} value={checkList} onChange={(e:string[])=>{
                        setCheckList(e)
                    }}>
                        {conditionItem.options?.map((item,index)=>(
                            <Checkbox key={index} className="check-item" value={item.value}>
                                <Tooltip placement="top" title={item.tip}>
                                    {item.label}
                                </Tooltip>
                            </Checkbox>
                        ))}
                    </Checkbox.Group>:<>
                        <div className="color-7A8499" style={{padding:"8px 12px"}}>暂无数据</div>
                    </>}
                </div>
            </Flex>
            <div></div>
            <Flex align="center" justify="space-between" className="font-12" style={{padding:"12px",borderTop: "1px solid #eef1f6"}}>
                <div className="color-474F5E cursor-pointer" onClick={()=>setCheckList([])}>重置</div>
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
                        {conditionItem.label}
                        {checkList.length > 0 && <div onClick={(e)=>e.stopPropagation()}>
                            <MyDropdown
                                onOpenChange={(open:boolean)=>{
                                    if (open) setOpen(false); // 关闭Popover当Dropdown打开时
                                }}
                                tiggerEle={<div className="select-item-conditions"> {symbol} </div>}
                                menu={{
                                    items:[
                                        {
                                            key: "1", label: (
                                                <a onClick={()=>setSymbol("=")}>等于</a>
                                            )
                                        },
                                        {
                                            key: "2", label: (
                                                <a onClick={()=>setSymbol("≠")}>不等于</a>
                                            )
                                        },
                                    ]
                                }}
                            />
                        </div>}
                        {checkList.length > 0 && (checkList.length > 1 ? <>
                            <Tooltip placement="top" title={checkList.join("、")}>
                                <div className="select-item-text">{checkList[0]+"...共"+checkList.length+"项"}</div>
                            </Tooltip>
                        </>:<>
                            <Tooltip placement="top" title={checkList[0]}>
                                <div className="select-item-text">{checkList[0]}</div>
                            </Tooltip>
                        </>)}
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

export default ConditionCheckedGroupSearch;

const Scoped = styled.div`
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

    .select-prefix{
        .ant-select-selector::before{
            content:"重点运营";
            margin-right: 12px;
            position: relative;
            top: 6px;
            font-weight: 400;
            color: #242833;
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

    .ant-popover-inner {
        padding: 0;
    }
    .check-group{
        .check-item{
            padding: 8px 12px;
        }
        .check-item:hover{
            background-color: #f7f8fb;
        }
    }
`