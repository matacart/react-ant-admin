import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Divider, Flex, Input, InputRef } from "antd";
import styled from "styled-components";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "@/components/Icons/Icons";
import { useEffect, useRef, useState } from "react";
import ConditionCard from "./ConditionCard";
import RelationCard from "./RelationCard";
import { DndContext, DragOverlay } from "@dnd-kit/core/dist";
import { useIntl } from "@umijs/max";

// 新增客户
export default function SubdivisionCreate() {

    const intl = useIntl();

    const navigate = useNavigate();

    const overlayRef = useRef<HTMLDivElement>(null);

    const [editTitle,setEditTitle] = useState(false);

    const [activeTarget,setActiveTarget] = useState<any>(null);

    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (editTitle && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editTitle]);

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <Flex className="mc-header-left" align="center">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                navigate('/customer/management')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            
                            <div className="mc-header-left-content">
                                {!editTitle && <span>访问未成单客户</span>}
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            /* 这里是你的全局 token */
                                            borderRadius:4
                                        },
                                    }}
                                    >
                                    <Input ref={inputRef} value={"访问未成单客户"} style={{width:"300px",height:"36px",display:editTitle?"":"none"}} onBlur={()=>setEditTitle(false)} />
                                </ConfigProvider>
                            </div>
                            <Flex gap={4} className="font-14 font-w-400 color-242833 cursor-pointer" style={{marginLeft: '20px'}} onClick={()=>{
                                setEditTitle(true)
                            }}>
                                <EditIcon />
                                <div>重命名</div>
                            </Flex>
                        </Flex>
                    </div>
                    <DndContext onDragStart={({active})=>{
                        setActiveTarget(active)
                    }} onDragEnd={(event)=>{
                        setActiveTarget(null)
                    }}>
                        <Flex gap={12} style={{height:`calc(100vh - 230px)`}}>
                            <div style={{flexShrink: 0}}>
                                <ConditionCard />
                                <DragOverlay>
                                    {activeTarget ? <div ref={overlayRef} style={{...activeTarget.data.current?.style,backgroundColor:"#FFF",opacity:"0.6"}} className="listItem" >
                                        <div>{intl.formatMessage({ id: "customer.management.subdivision."+activeTarget.data.current.key })}</div>
                                    </div>: null}
                                </DragOverlay>
                            </div>
                            <div style={{flexGrow:1}}>
                                <RelationCard overlayRef={overlayRef} />
                            </div>
                        </Flex>
                    </DndContext>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton text="创建" onClick={async ()=>{
                        }} />
                    </div>
                </div>
            </div>
        </Scoped>
    );
}

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 20px;

            display: flex;
            justify-content: space-between;
            align-content: center;
    
            &-left {
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }
                }
                &-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }

        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }

        &-content {
            flex: 9;
            min-width: 510px;

            display: flex;
            flex-direction: column;
            gap:20px

        }

        &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        }
        .mc-footer{
            display:flex;
            flex-direction: row-reverse;
        }
    }
}
`
















