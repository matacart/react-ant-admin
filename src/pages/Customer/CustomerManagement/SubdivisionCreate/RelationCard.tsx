import MyButton from "@/components/Button/MyButton";
import { DeleteIcon, EditorAddBtnIcon, WarningIcon } from "@/components/Icons/Icons";
import { SwapOutlined } from "@ant-design/icons";
import { useDndMonitor, useDroppable } from "@dnd-kit/core/dist";
import { Button, Card, Checkbox, ConfigProvider, Flex, Form, Popover, Select } from "antd";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { generateId } from "@/utils/dataStructure";
import MySelect from "@/components/Select/MySelect";
import useClickOutside from "@/hooks/customHooks";
import SelectCheckBox from "./SelectCheckBox";
import { useIntl } from '@umijs/max';


interface RelationCardProps {
    overlayRef: React.RefObject<HTMLElement>;
}

function RelationCard({overlayRef}: RelationCardProps){

    const intl = useIntl();

    const conditionResult = {
        id:"23",
        templateCaseName: "单笔消费金额低的客户",
        templateDesc: "向消费金额较低的客户交叉销售来自品牌或商品分类的高价值商品以提高平均订单金额",
        crowdTemplateCondition:{
            // 条件
            conditions:{
                type:1,
                extInfo:{id:"e3adaf75-703d-42cb-a86c-5410f76aafe6"},
                relation:"and",
                children:[
                    {
                        type:1,
                        extInfo: {id:"f37f5efa-80e5-44f2-831d-547c6effdaa1"},
                        relation:"and",
                        children:[
                            {
                                type:0,
                                key:"rfm",
                                operator:"IN",
                                value:["重要保持客户"],
                                extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b1e6-3dedb715228e"}
                            },
                            {
                                type:0,
                                key:"rfm",
                                operator:"IN",
                                value:["重要挽留客户"],
                                extInfo:{operatorType:"EQ",componentType:"ENUM",id:"6f9b28c2-8249-4aa9-b21e6-3dedb715228e"}
                            },
                        ]
                    }
                ]
            },
            // 除外条件
            not:{
              extInfo:{id:"a27794e7-535b-45eb-8f64-4023443f6f1f"},
              relation: "and",
              children:[
                {
                  extInfo: {id:"6f09771a-1ac9-4167-bd1b-9818cb8db28a"},
                  relation: "and",
                  type: 1,
                  children:[
                    {
                      type:0,
                      key: "status",
                      operator: "IN",
                      value:["黑名单"],
                      extInfo: {operatorType:"EQ",componentType:"ENUM",id:"db89da14-c936-484e-ae33-759e4e5e02ea"}
                    },
                  ]
                },
              ]
            }
        }
    }

    // 选中容器
    const [active,setActive] = useState("")
    // 选中条件
    const [activeCondition,setActiveCondition] = useState("")
    // 使用 hook 并绑定回调
    const clickOutsideRef = useClickOutside(() => {
        setActiveCondition("");
        let newCondition = {...condition}
        newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].children[conditionIndex].value = conditionValue
        setCondition(newCondition)
    });

    // 条件
    const [condition,setCondition] = useState(conditionResult)
    // 条件值
    const [conditionValue,setConditionValue] = useState([]);

    // 条件下标
    const [conditionGroupIndex,setConditionGroupIndex] = useState()
    const [conditionIndex,setConditionIndex] = useState()

    const [popoverOpen,setPopoverOpen] = useState(false);

    // 删除细分条件组
    const deleteCondition = () =>{
        let newCondition = {...condition}
        newCondition.crowdTemplateCondition.conditions.children = newCondition.crowdTemplateCondition.conditions.children.filter(item=>item.extInfo.id !== active)
        setCondition(newCondition)
    }

    // 创建一个 ref 来存储所有 Droppable 容器的节点映射
    const droppableNodes = useRef<Record<string, React.RefObject<HTMLElement>>>({});
    // 注册容器节点的函数
    const registerDroppableNode = (id: string, node: React.RefObject<HTMLElement>) => {
        droppableNodes.current[id] = node;
    };

    // 布局组件
    function Droppable(props:any) {

        const { setNodeRef,node,isOver,over,rect } = useDroppable({
          id: props.id,
        });

        useEffect(() => {
            if (!isOver) {
              // 当不再被悬停时重置样式
              const children = Array.from(node.current?.children ?? []);
              children.forEach((child) => {
                (child as HTMLElement).style.transform = 'translateY(0px)';
              });
            }
        }, [isOver, node]);

        useEffect(() => {
            registerDroppableNode(props.id, node);
            return () => {
              delete droppableNodes.current[props.id];
            };
        }, [props.id, node]);

        return (
            <Flex ref={setNodeRef} style={{width:"100%",position:"relative"}} vertical gap={12}>
                {props.children}
                {(isOver && over) && <>
                    {/* 占位符 */}
                    <Flex id="placeholder" className="dropzone-highlight" style={{position:"absolute"}}>
                        <div className="font-12 color-356DFF">释放以放置</div>
                    </Flex>
                    <Flex id="placeholder-1" style={{width:"100%",height:"46px"}}>
                        <div></div>
                    </Flex>
                </>}
            </Flex>
        )
    }

    let closestIndex:number | undefined = undefined;

    const trigger = ({node,rect}:any)=>{
        const children = Array.from(node.children ?? []);
        children.forEach((child, index) => {
            (child as HTMLElement).style.transform = 'translateY(0px)';
        });
        // 浮层位置
        if(overlayRef && rect?.top){
            const container = Array.from(node.children ?? []);
            let closestElement: HTMLElement | null = null;
            let triggerElement: HTMLElement | null = null;
            let minDiff = Infinity;

            const children = container.slice(0,container.length-2);

            children.forEach((child, index) => {
                const childTop = (child as HTMLElement).getBoundingClientRect().top;
                const diff = Math.abs(childTop - (overlayRef.current?.getBoundingClientRect().top || 0));
                if (diff < minDiff) {
                    minDiff = diff;
                    closestElement = child as HTMLElement;
                    closestIndex = index;
                }
            });

            let nextEl: Element | null = null;
            if (closestElement && container) {
                // 获取 closestElement 的下一个兄弟元素
                (closestElement as HTMLElement).style.transform = 'translateY(46px)';
                nextEl = (closestElement as HTMLElement).nextElementSibling;
                // 给后面的每个元素添加偏移
                while (nextEl) {
                    if (nextEl.id !== "placeholder" && nextEl.id !== "placeholder-1") {
                        (nextEl as HTMLElement).style.transform = 'translateY(46px)';
                    }
                    if(nextEl.id == "placeholder"){
                        triggerElement = nextEl as HTMLElement;
                    }
                    nextEl = (nextEl as HTMLElement).nextElementSibling;
                }
                // 你可以在这里对这个元素做高亮、插入线等操作
                const closestElementTop = (closestElement as HTMLElement).getBoundingClientRect().top ?? 0;
                // 获取容器的位置
                const containerTop = (closestElement as HTMLElement).parentElement?.getBoundingClientRect().top ?? 0;
                // 在拖动过程中，容器位置发生变化
                if(triggerElement){
                    triggerElement.style.top = (closestElementTop - (containerTop || 0) - 46).toString() + "px" ;
                }
            }
        }
    }

    useDndMonitor({
        onDragMove: (event)=>{
            if(event.over){
                const containerId = event.over.id;
                const containerNode = droppableNodes.current[containerId]?.current;
                trigger({node:containerNode,rect:event.over.rect})
            }
        },

        onDragEnd:(event)=>{
            if(event.over){
                // console.log(event.active.data.current?.component)
                const containerId = event.over.id;
                // 创建新条件 (替换为你实际需要插入的数据结构)
                const newCondition = {
                    ...event.active.data.current?.component,
                    extInfo:{
                        ...event.active.data.current?.component.extInfo,
                        id:generateId()
                    }
                };
                // blockType:1
                setCondition(prevCondition => {
                    const updated = {...prevCondition};
                    // 递归查找并插入条件
                    const insertCondition = (node: any) => {
                        if(node.extInfo?.id === containerId) {
                            if(closestIndex !== undefined) {
                                if(node.children[0]){
                                    console.log(node.children[0])
                                    // 判断兄弟元素是否存在子元素,若存在则不是最后一及，需要连带父元素一起插入
                                    if(node.children[0].children && !node.children[0].blockType){
                                        node.children.splice(closestIndex, 0, {
                                            type:1,
                                            extInfo: {id:generateId()},
                                            relation:"and",
                                            children:[
                                                newCondition
                                            ]
                                        });
                                    }else{
                                        node.children.splice(closestIndex, 0, newCondition);
                                    }
                                }else{
                                    node.children.splice(closestIndex, 0, newCondition);
                                }
                            } else {
                                node.children.push(newCondition);
                            }
                            return true;
                        }
                        
                        if(node.children) {
                            for(const child of node.children) {
                                if(insertCondition(child)) return true;
                            }
                        }
                        return false;
                    };
                    // 在主条件和除外条件中查找
                    insertCondition(updated.crowdTemplateCondition.conditions) || insertCondition(updated.crowdTemplateCondition.not);
                    return updated;
                });

                 // 重置索引
                closestIndex = undefined;
            }
        }
    });


    return(
        <Scoped>
            <MyCard title={<div className="font-w-600">细分条件设置</div>} styles={{
                header:{
                    padding:"0 16px"
                },
                body:{
                    height:`calc(100% - 56px)`,
                    padding:0,
                    paddingBottom:"60px"
                }
            }}>
                <div className="container">
                    {/* 筛选条件 */}
                    <div className="condition">  
                        <Flex gap={16} style={{marginTop:"8px"}}>
                            <Flex className="switch cursor-pointer">
                                <>
                                    <div className={condition.crowdTemplateCondition.conditions.relation == "and" ? "line andLine":"line orLine"}></div>
                                    {condition.crowdTemplateCondition.conditions.children.length > 1 && (
                                        <Flex className={condition.crowdTemplateCondition.conditions.relation == "and" ? "switch-condition and font-12":"switch-condition or font-12"} vertical justify="center" align="center" onClick={()=>{
                                            let newCondition = {...condition}
                                            condition.crowdTemplateCondition.conditions.relation == "and" ? newCondition.crowdTemplateCondition.conditions.relation = "or" : newCondition.crowdTemplateCondition.conditions.relation = "and"
                                            setCondition(newCondition)
                                        }}>
                                            {condition.crowdTemplateCondition.conditions.relation == "and" ? <>
                                                <div className="color-35C08E">且</div>
                                                <div className="color-35C08E">
                                                    <SwapOutlined className="font-10 swap" />
                                                </div>
                                            </>:<>
                                                <div className="color-356DFF">或</div>
                                                <div className="color-356DFF">
                                                    <SwapOutlined className="font-10 swap" />
                                                </div>
                                            </>}
                                        </Flex>
                                    )}
                                </>
                            </Flex>
                            <Droppable id={condition.crowdTemplateCondition.conditions.extInfo.id}>
                                {/* 区域一 */}
                                {condition.crowdTemplateCondition.conditions.children?.map((conditionGroup:any,conditionGroupIndex:number)=>{

                                    return(
                                        <div ref={clickOutsideRef} key={conditionGroupIndex} className={conditionGroup.extInfo.id == active ? "conditionGroup cursor-pointer active":"conditionGroup cursor-pointer"} onClick={()=>setActive(conditionGroup.extInfo.id)}>
                                            <Flex gap={16}>
                                                {conditionGroup.children.length > 1 && (
                                                    <Flex className="switch">
                                                        <>
                                                            <div className={conditionGroup.relation == "and" ? "line andLine":"line orLine"}></div>
                                                            <Flex className={conditionGroup.relation == "and" ? "switch-condition and font-12":"switch-condition or font-12"} vertical justify="center" align="center" onClick={()=>{
                                                                let newCondition = {...condition}
                                                                newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].relation == "and" ? newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].relation = "or" : newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].relation = "and"
                                                                setCondition(newCondition)
                                                            }}>
                                                                {conditionGroup.relation == "and" ? <>
                                                                    <div className="color-35C08E">且</div>
                                                                    <div className="color-35C08E">
                                                                        <SwapOutlined className="font-10 swap" />
                                                                    </div>
                                                                </>:<>
                                                                    <div className="color-356DFF">或</div>
                                                                    <div className="color-356DFF">
                                                                        <SwapOutlined className="font-10 swap" />
                                                                    </div>
                                                                </>}
                                                            </Flex>
                                                        </>
                                                    </Flex>
                                                )}
                                                <Droppable id={conditionGroup.extInfo.id}>
                                                    {/* 区域二 */}
                                                    {conditionGroup.children.map((conditionItem:any,index:number)=>{
                                                        // setConditionIndex(index)
                                                        const options = [
                                                            { label : "重要价值客户", value : "重要价值客户",tip:""},
                                                            { label : "重要挽留客户", value : "重要挽留客户",tip:""},
                                                            { label : "重要保持客户", value : "重要保持客户",tip:""},
                                                        ]

                                                        if(conditionItem.extInfo.id == activeCondition){
                                                            return(
                                                                <div key={index} className="conditionEdit">
                                                                    <Form>
                                                                        <Flex justify="space-between" style={{marginBottom:"8px"}}>
                                                                            <div className="font-w-600 color-242833">{intl.formatMessage({ id: "customer.management.subdivision."+conditionItem.key })}</div>
                                                                            <div>
                                                                                <DeleteIcon className="font-20" onClick={()=>{
                                                                                    let newCondition = {...condition}
                                                                                    newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].children = newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].children.filter(item=>item.extInfo.id !== conditionItem.extInfo.id)
                                                                                    setCondition(newCondition)
                                                                                }} />
                                                                            </div>
                                                                        </Flex>
                                                                        <MySelect Ref={clickOutsideRef} value={conditionItem.extInfo.operatorType} style={{width:"100px"}} options={[
                                                                            {
                                                                                label:"等于",
                                                                                value:"EQ"
                                                                            },
                                                                            {
                                                                                label:"不等于",
                                                                                value:"NEQ"
                                                                            }
                                                                        ]}
                                                                        onChange={(value)=>{
                                                                            let newCondition = {...condition}
                                                                            newCondition.crowdTemplateCondition.conditions.children[conditionGroupIndex].children[index].extInfo.operatorType = value
                                                                            setCondition(newCondition)
                                                                        }}
                                                                        />
                                                                        <Form.Item>
                                                                            <MySelect
                                                                                key={conditionItem.extInfo.id}
                                                                                style={{marginTop:"8px"}}
                                                                                mode={"multiple"}
                                                                                tagRender={(props)=>{
                                                                                    return (
                                                                                        <div style={{marginLeft:"10px"}}>{props.label}</div>
                                                                                    )
                                                                                }}
                                                                                options={options}
                                                                                getPopupContainer={()=>clickOutsideRef?.current!}
                                                                                value={conditionValue}
                                                                                dropdownStyle={{padding:"6px 0"}}
                                                                                dropdownRender={(menu) => {
                                                                                    const list = options.map((item,index)=>{
                                                                                        return (
                                                                                            <Checkbox checked={conditionValue.includes(item.value)} className="item" style={{padding:"8px 12px",width:"100%"}}
                                                                                            onChange={(e)=>{
                                                                                                const newValues = conditionValue.includes(item.value) ? conditionValue.filter((v) => v !== item.value) : [...conditionValue, item.value];
                                                                                                setConditionValue([...newValues]);
                                                                                            }}
                                                                                            >{item.label}</Checkbox>
                                                                                        )
                                                                                    })
                                                                                    return (
                                                                                        <div style={{backgroundColor:"#FFF"}}>
                                                                                            {list}
                                                                                        </div>
                                                                                    )
                                                                                }}
                                                                            />
                                                                            {/* <SelectCheckBox Ref={clickOutsideRef} options={[
                                                                                { label : "重要价值客户", value : "重要价值客户",tip:""},
                                                                                { label : "重要挽留客户", value : "重要挽留客户",tip:""},
                                                                                { label : "重要保持客户", value : "重要保持客户",tip:""},
                                                                            ]}
                                                                            values = {conditionItem.value}
                                                                            setConditionValue = {setConditionValue}
                                                                            /> */}
                                                                        </Form.Item>
                                                                    </Form>
                                                                </div>
                                                            )
                                                        }
                                                        return(
                                                            <div key={index} className="conditionItem" onClick={()=>{
                                                                setActiveCondition(conditionItem.extInfo.id)
                                                                setConditionValue(conditionItem.value)
                                                                setConditionIndex(index)
                                                                setConditionGroupIndex(conditionGroupIndex)
                                                            }}>
                                                                {conditionItem.children?.length>0 ? <>
                                                                    <div className="color-7A8499">
                                                                        {intl.formatMessage({ id: "customer.management.subdivision."+conditionItem.key })}
                                                                    </div>
                                                                    <Flex className="color-474F5E" gap={8}>
                                                                        {conditionItem.children.map((conditionItemSub:any,index:number)=>(
                                                                            <div key={index} className="condition-item">
                                                                                <span>{(conditionItemSub.operator == "IN") ? "包含" : ""}</span>
                                                                                <span>{conditionItemSub.value.join(",")}</span>
                                                                            </div>
                                                                        ))}
                                                                    </Flex>
                                                                </> : conditionItem.value == 1 ? <>
                                                                    <div className="color-7A8499">
                                                                        {intl.formatMessage({ id: "customer.management.subdivision."+conditionItem.extInfo.subGroup})}
                                                                    </div>
                                                                    <Flex className="color-474F5E" gap={8}>
                                                                        {intl.formatMessage({ id: "customer.management.subdivision."+conditionItem.key })}
                                                                    </Flex>
                                                                </>:<>
                                                                    <div className="color-7A8499">
                                                                        {intl.formatMessage({ id: "customer.management.subdivision."+conditionItem.key })}
                                                                    </div>
                                                                    <Flex className="color-474F5E" gap={8}>
                                                                        <span>
                                                                        {
                                                                            conditionItem.extInfo.operatorType == "EQ" ? "等于" : 
                                                                            conditionItem.extInfo.operatorType == "NEQ" ? "不等于" : 
                                                                            conditionItem.operator == "IN" ? "包含" : 
                                                                            conditionItem.operator == "NIN" ? "不包含" : ""

                                                                        }
                                                                        </span>
                                                                        {conditionItem.value.join(",")}
                                                                    </Flex>
                                                                </>}
                                                            </div>
                                                        )
                                                    })}
                                                    {conditionGroup.children.length == 0 && (
                                                        <Flex style={{height:"100px"}} className="font-16 color-7A8499 font-w-600" align="center" justify="center">请将左侧条件拖拽至此处</Flex> 
                                                    )}
                                                </Droppable>
                                            </Flex>
                                            {/* 删除条件 */}
                                            {conditionGroup.extInfo.id == active && (
                                                <Flex className="remove" justify="end">
                                                    <Popover
                                                        open={popoverOpen}
                                                        placement="left"
                                                        onOpenChange={(open: boolean)=>setPopoverOpen(open)}
                                                        content={
                                                            <div>
                                                                <Flex gap={8} justify='end'>
                                                                    <MyButton text="取消" autoInsertSpace={false} className='font-12' style={{height:"28px",width:"44px"}} onClick={()=>setPopoverOpen(false)} />
                                                                    <MyButton text="确定" autoInsertSpace={false} className='font-12' color="danger" variant="solid" style={{height:"28px",width:"44px",backgroundColor:"#D33612"}} onClick={()=>{
                                                                        deleteCondition()
                                                                        setPopoverOpen(false)
                                                                    }} />
                                                                </Flex>
                                                            </div>
                                                        } 
                                                        title={
                                                            <Flex gap={8} style={{marginBottom:"20px"}}>
                                                                <WarningIcon className="color-F86140" />
                                                                <div className="font-w-400 color-474F5E">确认删除该条件组吗？</div>
                                                            </Flex>
                                                        } 
                                                        trigger="click"
                                                    >
                                                        <DeleteIcon className="font-20" />
                                                    </Popover>
                                                </Flex>
                                            )}
                                        </div>
                                    )
                                })}
                            </Droppable>
                        </Flex>
                    </div>
                    {/* 新增条件 */}
                    <div className="addCondition">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        /* 这里是你的组件 token */
                                        defaultBorderColor:"#356DFF",
                                        defaultHoverBorderColor:"#356DFF",
                                        defaultHoverBg:"#f7f8fb",
                                        textTextHoverColor:"#356DFF"
                                    },
                                },
                            }}
                        >
                            <Button className="btn-add" variant="outlined" icon={<EditorAddBtnIcon className="font-16" />} onClick={()=>{
                                let newCondition = {...condition}
                                const temp = {
                                    type:2,
                                    extInfo: {id:new Date().getTime().toString()},
                                    relation:"and",
                                    children:[]
                                }
                                newCondition.crowdTemplateCondition.conditions.children.push(temp)
                                setCondition(newCondition)
                            }}>
                                新增条件
                            </Button>
                        </ConfigProvider>
                    </div>
                    {/* 除外条件 */}
                    <div className="notCondition">
                        <Flex gap={16} style={{marginTop:"8px"}}>
                            <Flex className="switch ">
                                <div className="line not"></div>
                                <Flex className="switch-condition not font-12" justify="center" align="center">
                                    <div>除</div>
                                </Flex>
                            </Flex>
                            <Flex gap={8} vertical style={{width:"100%"}}>
                                {condition.crowdTemplateCondition.not.children?.map((not:any,index:number)=>{
                                    return(
                                        <div key={index} className="conditionGroup cursor-pointer">
                                            <Flex gap={16}>
                                                {not.children.length > 1 && (
                                                    <Flex className="switch">
                                                        <>
                                                            <div className={not.relation == "and" ? "line andLine":"line orLine"}></div>
                                                            <Flex className={not.relation == "and" ? "switch-condition and font-12":"switch-condition or font-12"} vertical justify="center" align="center" onClick={()=>{
                                                                let newCondition = {...condition}
                                                                newCondition.crowdTemplateCondition.not.children[index].relation == "and" ? newCondition.crowdTemplateCondition.not.children[index].relation = "or" : newCondition.crowdTemplateCondition.not.children[index].relation = "and"
                                                                setCondition(newCondition)
                                                            }}>
                                                                {not.relation == "and" ? <>
                                                                    <div className="color-35C08E">且</div>
                                                                    <div className="color-35C08E">
                                                                        <SwapOutlined className="font-10 swap" />
                                                                    </div>
                                                                </>:<>
                                                                    <div className="color-356DFF">或</div>
                                                                    <div className="color-356DFF">
                                                                        <SwapOutlined className="font-10 swap" />
                                                                    </div>
                                                                </>}
                                                            </Flex>
                                                        </>
                                                    </Flex>
                                                )}
                                                <Droppable id={not.extInfo.id}>
                                                    {/* <Flex className="conditionGroupItem" gap={8} vertical style={{width:"100%"}}> */}
                                                    {not.children.map((notItem:any,index:number)=>{
                                                    return(
                                                        <div key={index} className="conditionItem">
                                                            <div className="color-7A8499">
                                                                {notItem.key === "status" ? "客户状态" : ""}
                                                            </div>
                                                            <Flex className="color-474F5E" gap={8}>
                                                                <span>{(notItem.operator == "EQ" || notItem.operator == "IN") ? "等于" : ""}</span>
                                                                {notItem.value.join(",")}
                                                            </Flex>
                                                        </div>
                                                    )
                                                    })}
                                                    {/* </Flex> */}
                                                </Droppable>
                                            </Flex>
                                        </div>
                                    )
                                })}
                            </Flex>
                        </Flex>
                    </div>
                </div>
            </MyCard>
            <Flex className="groupCount" align="center" justify="space-between">
                <div className="color-356DFF" style={{backgroundColor:"F0F7FF"}}>客户数量：-</div>
                <MyButton text="计算" autoInsertSpace={false} />
            </Flex>
        </Scoped>
    )
}

const MyCard = styled(Card)`
    height: 100%;
    .container{
        padding: 16px;
        height: 100%;
        overflow-y: auto;
        .switch{
            width: 24px;
            position: relative;
            justify-content: center;
            .line{
                width: 2px;
                height: 100%;
                border-radius: 1px;
                background-color: #eaedf1;
            }
            .switch-condition{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                height: 24px;
                width: 100%;
                border-radius: 2px;
                color: #7a8499;
                transition: all 0.3s ease;
                .swap{
                    display: none;
                }
            }
            .and{
                background-color: #BEF7DB;
            }
            .or{
                background-color: #C2D3FF;
            }
            .not{
                background-color: #eaedf1;
            }
            .andLine{
                background-color: #BEF7DB;
            }
            .orLine{
                background-color: #C2D3FF;
            }
            .notLine{
                background-color: #eaedf1;
            }
        }
        .condition .switch:hover{
            .switch-condition{
                height: 68px;
                transition: all 0.3s ease;
                .swap{
                    display: block;
                }
            }
            .and:hover{
                background-color: #35c08e;
                div{
                    color:#FFF;
                }
            }
            .or:hover{
                background-color: #356DFF;
                div{
                    color:#FFF;
                }
            }
        }
        .conditionGroup{
            flex:1;
            padding: 12px 16px;
            border-radius: 4px;
            border: 1px solid #d7dbe7;
            .conditionItem{
                padding: 6px;
                width: 100%;
            }
            .conditionItem:hover{
                background-color: #f0f3f7;
            }

            .switch:hover{
                .switch-condition{
                    height: 68px;
                    transition: all 0.3s ease;
                    .swap{
                        display: block;
                    }
                }
                .and:hover{
                    background-color: #35c08e;
                    div{
                        color:#FFF;
                    }
                }
                .or:hover{
                    background-color: #356DFF;
                    div{
                        color:#FFF;
                    }
                }
            }

            .remove{
                padding: 12px 16px 4px;
                margin-top: 16px;
                border-top: 1px solid #eef1f7;
            }

            .conditionEdit{
                padding: 16px;
                background-color: #f7f8fb;
            }

        }
        .active{
            border:2px solid #356DFF;
        }
        .conditionGroup:hover{
            .switch-condition{
                height: 68px;
                transition: all 0.3s ease;
                .swap{
                    display: block;
                }
            }
        }
        .addCondition{
            background-image: linear-gradient(#d7dbe7 33%, #fff 0%);
            background-size: 2px 20%;
            background-repeat: repeat-y;
            background-position: 0 4px;
            margin: 4px 0 4px 10px;
            padding: 12px 0 12px 30px;
            .btn-add{
                width: 100%;
                color:#356DFF
            }
        }

        .dropzone-highlight{
            border:1px solid #356DFF;
            background-color: #F7F8FB;
            width: 100%;
            padding: 7px 14px;
            border-radius: 6px;
        }
    }
`;


const Scoped = styled.div`
    height: 100%;
    position: relative;
    .groupCount{
        height: 68px;
        position: absolute;
        z-index: 99;
        bottom: 1px;
        left: 1px;
        right: 1px;
        padding: 12px 24px;
        box-shadow: 0px 0 32px 0px rgba(16,18,25,.05);
        background-color: #FFF;
        border-bottom-left-radius:6px;
        border-bottom-right-radius:6px;
    }

    .item:hover{
        background-color: #f0f7ff;
    }
`

export default RelationCard