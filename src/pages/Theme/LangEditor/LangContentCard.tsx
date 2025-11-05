import { RightIcon } from "@/components/Icons/Icons";
import MyTextArea from "@/components/Input/MyTextArea";
import langEditor from "@/store/theme/langEditor";
import { Flex } from "antd";
import { observer } from "mobx-react-lite";
import { memo, useEffect, useMemo } from "react";
import styled from "styled-components";
import LangTextArea from "./LangTextArea";



// 将snake_case转为Title Case格式的函数
export function formatKey(key: string): string {
    // 只有包含下划线时才转换
    if (key.includes('_')) {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    return key.charAt(0).toUpperCase() + key.slice(1); // 不包含下划线
}

// 创建一个组件，用于渲染单个键值对
const SimpleItemRenderer = memo(({ tabKey, simpleItemKey, item }: { tabKey: string; simpleItemKey: string; item: string }) => {
    return(
        <div key={simpleItemKey}>
            <div className="title font-w-500 font-16">{formatKey(simpleItemKey)}</div>
            <div className="content">
                <div style={{marginBottom:8}}>
                    <div style={{marginBottom:"2px"}}>{formatKey(simpleItemKey)}</div>
                    <Flex gap={12}>
                        {langEditor.lang !== "en" && <>
                            <MyTextArea disabled value={langEditor.defaultJsonEntity?.[tabKey]?.[simpleItemKey]} autoSize={{maxRows:3}} />
                            <RightIcon className="font-24" />
                        </>}
                        <LangTextArea item={item} setItem={(value:string)=>{
                            langEditor.setJsonEntity({
                                ...langEditor.jsonEntity, 
                                [tabKey]:{
                                    ...langEditor.jsonEntity[tabKey],
                                    [simpleItemKey]:value
                                }
                            })
                        }} />
                    </Flex>
                </div>
            </div>
        </div>
    )
});

const ObjectItemRenderer = memo(({ tabKey, objectItemKey, item }: { tabKey: string; objectItemKey: string; item: any }) => {
    // 筛选出字符串类型的属性
    const stringEntries = useMemo(() => 
        Object.entries(item).filter(([,value]) => typeof value === 'string'), 
        [item]
    );
    
    // 筛选出其它类型的属性
    const nonStringEntries = useMemo(() => 
        Object.entries(item).filter(([,value]) => typeof value !== 'string'), 
        [item]
    );

    const renderNonStringEntries = () => {
        if (nonStringEntries.length === 0) return null;
        
        return nonStringEntries.map((values: any[], index) => {
            if (typeof values[1] == 'object') {
                return (
                    <div key={`${objectItemKey}-${index}`}>
                        {Object.entries(values[1]).map(([entrieskey, entriesValue]: any) => {
                            if (typeof entriesValue == 'object') {
                                return (
                                    <div key={`${objectItemKey}-${index}-${entrieskey}`}>
                                        <div className="title font-w-500 font-16">
                                            {formatKey(objectItemKey) + " " + values[0] + " " + entrieskey}
                                        </div>
                                        <div className="content">
                                            {Object.entries(entriesValue).map(([entityItemKey, entityItemValue]: any) => (
                                                <div key={entityItemKey} style={{ marginBottom: 8 }}>
                                                    <div style={{ marginBottom: "2px" }}>{formatKey(entityItemKey)}</div>
                                                    <Flex gap={12}>
                                                        {langEditor.lang !== "en" && <>
                                                            <MyTextArea 
                                                                disabled 
                                                                value={langEditor.defaultJsonEntity?.[tabKey]?.[objectItemKey]?.[values[0]]?.[entrieskey]?.[entityItemKey]} 
                                                                autoSize={{ maxRows: 3 }} 
                                                            />
                                                            <RightIcon className="font-24" />
                                                        </>}
                                                        <LangTextArea 
                                                            item={entityItemValue} 
                                                            setItem={(value: string) => {
                                                                langEditor.setJsonEntity({
                                                                    ...langEditor.jsonEntity,
                                                                    [tabKey]: {
                                                                        ...langEditor.jsonEntity[tabKey],
                                                                        [objectItemKey]: {
                                                                            ...langEditor.jsonEntity[tabKey][objectItemKey],
                                                                            [values[0]]: {
                                                                                ...langEditor.jsonEntity[tabKey][objectItemKey][values[0]],
                                                                                [entrieskey]: {
                                                                                    ...langEditor.jsonEntity[tabKey][objectItemKey][values[0]][entrieskey],
                                                                                    [entityItemKey]: value
                                                                                }
                                                                            }
                                                                        },
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    </Flex>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={`${objectItemKey}-${index}-${entrieskey}`} className="nested-item">
                                        <div className="title font-w-500 font-16">{formatKey(objectItemKey) + " " + values[0]}</div>
                                        <div className="content">
                                            <div style={{ marginBottom: 8 }}>
                                                <div style={{ marginBottom: "2px" }}>{formatKey(entrieskey)}</div>
                                                <Flex gap={12}>
                                                    {langEditor.lang !== "en" && <>
                                                        <MyTextArea 
                                                            disabled 
                                                            value={langEditor.defaultJsonEntity[tabKey][objectItemKey]?.[values[0]]?.[entrieskey]} 
                                                            autoSize={{ maxRows: 3 }} 
                                                        />
                                                        <RightIcon className="font-24" />
                                                    </>}
                                                    <LangTextArea 
                                                        item={entriesValue} 
                                                        setItem={(value: string) => {
                                                            langEditor.setJsonEntity({
                                                                ...langEditor.jsonEntity,
                                                                [tabKey]: {
                                                                    ...langEditor.jsonEntity[tabKey],
                                                                    [objectItemKey]: {
                                                                        ...langEditor.jsonEntity[tabKey][objectItemKey],
                                                                        [values[0]]: {
                                                                            ...langEditor.jsonEntity[tabKey][objectItemKey][values[0]],
                                                                            [entrieskey]: value
                                                                        }
                                                                    },
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </Flex>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                );
            }
            return null;
        });
    };

    const renderStringEntries = () => {
        if (stringEntries.length === 0) return null;
        
        return (
            <div className="title-and-content">
                <div className="title font-w-500 font-16">{formatKey(objectItemKey)}</div>
                <div className="content">
                    {stringEntries.map(([stringEntriesKey, stringEntriesValue]: any) => (
                        <div key={stringEntriesKey} style={{ marginBottom: 8 }}>
                            <div style={{ marginBottom: "2px" }}>{formatKey(stringEntriesKey)}</div>
                            <Flex gap={12}>
                                {langEditor.lang !== "en" && <>
                                    <MyTextArea 
                                        disabled 
                                        value={langEditor.defaultJsonEntity?.[tabKey]?.[objectItemKey]?.[stringEntriesKey]} 
                                        autoSize={{ maxRows: 3 }} 
                                    />
                                    <RightIcon className="font-24" />
                                </>}
                                <LangTextArea 
                                    item={stringEntriesValue} 
                                    setItem={(value: string) => {
                                        langEditor.setJsonEntity({
                                            ...langEditor.jsonEntity,
                                            [tabKey]: {
                                                ...langEditor.jsonEntity[tabKey],
                                                [objectItemKey]: {
                                                    ...langEditor.jsonEntity[tabKey][objectItemKey],
                                                    [stringEntriesKey]: value
                                                },
                                            }
                                        });
                                    }} 
                                />
                            </Flex>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div key={objectItemKey}>
            {renderNonStringEntries()}
            {renderStringEntries()}
        </div>
    );
});

function LangContentCard({tabKey}:{tabKey:string}){

    return (
        <Scoped>
            {langEditor.jsonEntity?.[tabKey] && Object.entries(langEditor.jsonEntity[tabKey]).map(([key,item]:any)=>{
                if(typeof item == 'object'){
                    return (
                        <ObjectItemRenderer 
                            objectItemKey={key}
                            tabKey={tabKey} 
                            item={item}
                        />
                    )
                }else{
                    return (
                        <SimpleItemRenderer 
                            tabKey={tabKey} 
                            simpleItemKey={key}
                            item={item} 
                        />
                    )
                }
            })}
        </Scoped>
    );
}

const Scoped = styled.div`

    .title{
        margin-bottom: 12px;
    }
    .content{
        margin-bottom: 12px;
    }
`
// 使用 memo 包装组件以避免不必要的重渲染
export default observer(LangContentCard);