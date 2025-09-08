import MyDropdown from "@/components/Dropdown/MyDropdown"
import { CloseIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { Flex, Form, Input, InputNumber, Modal, Popover, Row, Select, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cousomerManagement from "@/store/customer/cousomerManagement";


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

function ConditionInputNumber({condition,index}:propsType){

    const conditionItem = condition[0]

    const [open,setOpen] = useState(false);

    // BETWEEN
    const [operator,setOperator] = useState("EQ");
    const myRef = useRef(null);

    const [firstInput,setFirstInput] = useState(false);
    const [secondInput,setSecondInput] = useState(false);
    // 条件
    const [checkList,setCheckList] = useState<(string)[]>(conditionItem.selectOptions);

    const getSymbol = (value:string)=>{
        switch(value){
            case "EQ":
                return "="
            case "NE":
                return "≠"
            case "GT":
                return ">"
            case "LT":
                return "<"
            case "BETWEEN":
                return "≤"
        }
    }

    useEffect(()=>{
        
    },[])
    
    return(
        <Scoped ref={myRef}>
            <Flex className="select-item color-242833 cursor-pointer" align="center" onClick={()=>setOpen(true)}>
                <Flex gap={8} align="center">
                    {operator == "BETWEEN" ? <>
                        <div>
                            {firstInput?<InputNumber controls={false} autoFocus defaultValue={checkList[0]} onBlur={(e)=>{
                                setFirstInput(false)
                                setCheckList([e.target.value,checkList[1]])
                            }} />:<div className="select-item-text" onClick={()=>{
                                setFirstInput(true)
                            }}>{checkList[0]?checkList[0]:"无限"}</div>}
                        </div>
                        <MyDropdown
                            tiggerEle={<div className="select-item-conditions" onClick={(e) => e.stopPropagation()}> {getSymbol(operator)} </div>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <a onClick={()=>setOperator("EQ")}>等于</a>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <a onClick={()=>setOperator("NE")}>不等于</a>
                                        )
                                    },
                                    {
                                        key: "3", label: (
                                            <a onClick={()=>setOperator("GT")}>大于</a>
                                        )
                                    },
                                    {
                                        key: "4", label: (
                                            <a onClick={()=>setOperator("LT")}>小于</a>
                                        )
                                    },
                                    {
                                        key: "5", label: (
                                            <a onClick={()=>setOperator("BETWEEN")}>区间</a>
                                        )
                                    }
                                ]
                            }}
                        />
                        {conditionItem.label}
                        <MyDropdown
                            tiggerEle={<div className="select-item-conditions" onClick={(e) => e.stopPropagation()}> {getSymbol(operator)} </div>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <a onClick={()=>setOperator("EQ")}>等于</a>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <a onClick={()=>setOperator("NE")}>不等于</a>
                                        )
                                    },
                                    {
                                        key: "3", label: (
                                            <a onClick={()=>setOperator("GT")}>大于</a>
                                        )
                                    },
                                    {
                                        key: "4", label: (
                                            <a onClick={()=>setOperator("LT")}>小于</a>
                                        )
                                    },
                                    {
                                        key: "5", label: (
                                            <a onClick={()=>setOperator("BETWEEN")}>区间</a>
                                        )
                                    }
                                ]
                            }}
                        />
                        <div>
                            {secondInput?<InputNumber controls={false} autoFocus defaultValue={checkList[1]} onBlur={(e)=>{
                                setSecondInput(false)
                                setCheckList([checkList[0],e.target.value])
                            }} />:<div className="select-item-text" onClick={()=>{
                                setSecondInput(true)
                            }}>{checkList[1]?checkList[1]:"无限"}</div>}
                        </div>
                    </>:<>
                        {conditionItem.label}
                        <MyDropdown
                            tiggerEle={<div className="select-item-conditions" onClick={(e) => e.stopPropagation()}> {getSymbol(operator)} </div>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <a onClick={()=>setOperator("EQ")}>等于</a>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <a onClick={()=>setOperator("NE")}>不等于</a>
                                        )
                                    },
                                    {
                                        key: "3", label: (
                                            <a onClick={()=>setOperator("GT")}>大于</a>
                                        )
                                    },
                                    {
                                        key: "4", label: (
                                            <a onClick={()=>setOperator("LT")}>小于</a>
                                        )
                                    },
                                    {
                                        key: "5", label: (
                                            <a onClick={()=>setOperator("BETWEEN")}>区间</a>
                                        )
                                    }
                                ]
                            }}
                        />
                        <div>
                            {firstInput?<InputNumber controls={false} autoFocus defaultValue={checkList[0]} onBlur={(e)=>{
                                setFirstInput(false)
                                setCheckList([e.target.value])
                            }} />:<div className="select-item-text" onClick={()=>{
                                setFirstInput(true)
                            }}>{checkList[0]?checkList[0]:"无限"}</div>}
                        </div>
                    </>}
                </Flex>
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
        </Scoped>
    )
}

export default ConditionInputNumber;

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

`