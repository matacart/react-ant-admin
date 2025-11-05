import SearchInput from "@/components/Input/SearchInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex, message, Tabs, TabsProps } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import LangContentCard, { formatKey } from "./LangContentCard";

import { getJsonTemplatesLocale, updateLocale } from "@/services/y2/api";
import { history, useParams } from "@umijs/max";
import MySelect from "@/components/Select/MySelect";
import LangOptions from "./LangOptions";
import langEditor from "@/store/theme/langEditor";
import { observer } from "mobx-react-lite";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Overlay from "@/components/Overlay/Overlay";
import { useAbortController } from "@/hooks/customHooks";

// 定义自定义顺序
export const customOrder = ['general', 'blog', 'products', 'customer', 'sales', 'cart', 'transaction', 'trade', 'order', 'onboarding', 'reduction_code', 'checkout&system'];

function LangEditor() {

    const { templateId }  = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [loading,setLoading] = useState(false);

    const [isOverlay,setIsOverlay] = useState(false);
      
    const [items,setItems] = useState<TabsProps['items']>([]);

    const { createAbortController } = useAbortController();

    // 提交
    const submit = ()=>{
        setLoading(true);
        updateLocale({
            themeId: templateId??"",
            locale: langEditor.lang,
            mode: langEditor.mode,
            locale_data:JSON.stringify(langEditor.jsonEntity),
        }).then((res)=>{
            if(res.code == 0){
                message.success("ok");
            }
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
            setIsOverlay(false);
        })
    }

    useEffect(()=>{
        langEditor.reset();
        // 创建 AbortController 信号
        const signal = createAbortController();
        getJsonTemplatesLocale({
            themeId: templateId??"",
            locale: langEditor.lang,
            mode: langEditor.mode,
        },signal).then(async (res)=>{
            if(res.code == "SUCCESS"){
                langEditor.setDefaultJsonEntity(res.data.data);
                langEditor.setJsonEntity(res.data.data);
                const newItems = Object.entries(res.data.data).map(([key,item]:any)=>{
                    return {
                        key: key,
                        label: <span className="font-w-500 font-16">{formatKey(key)}</span>,
                        children: <LangContentCard tabKey={key} />
                    }
                });
                // 按照自定义顺序排序
                newItems.sort((a, b) => {
                    const indexA = customOrder.indexOf(a.key);
                    const indexB = customOrder.indexOf(b.key);
                    // 如果都在自定义顺序中，按自定义顺序排序
                    if (indexA !== -1 && indexB !== -1) {
                        return indexA - indexB;
                    }
                    // 如果只有 A 在自定义顺序中，A 排在前面
                    if (indexA !== -1) {
                        return -1;
                    }
                    // 如果只有 B 在自定义顺序中，B 排在前面
                    if (indexB !== -1) {
                        return 1;
                    }
                    // 如果都不在自定义顺序中，按字母顺序排序
                    return a.key.localeCompare(b.key);
                });
                setItems(newItems);
            }
        }).catch((err)=>{
            if (err.name !== 'CanceledError') {
                console.log(err)
            } 
        }).finally(()=>{
            setIsSkeleton(false);
        });
    },[])

    // 使用 ref 跟踪变化来源
    const prevLangRef = useRef(langEditor.lang);
    useMemo(()=>{
        if (isSkeleton) {
            return;
        }
        // 检查是否是语言切换导致的变化
        if (prevLangRef.current !== langEditor.lang) {
            // 语言切换导致的 jsonEntity 更新，不需要执行特殊逻辑
            prevLangRef.current = langEditor.lang;
        } else {
            // 用户手动修改了 jsonEntity，执行相应逻辑
            setIsOverlay(true);
        }
    },[langEditor.jsonEntity,langEditor.lang])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push(`/website/shopSetting`);
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">编辑语言</div>
                            <LangOptions templateId={templateId || ""} setItems={setItems} />
                        </div>
                        <Flex className='mc-header-right' align='center' gap={12}>
                            <div className="font-14">模式:</div>
                            <MySelect 
                                value={langEditor.mode} 
                                options={[
                                    { value: 'auto', label: '智能模式' },
                                    { value: 'original', label: '开发模式' },
                                    { value: 'mapping', label: '用户模式' },
                                ]}
                                style={{height:"36px"}}
                                onChange={(value)=>{
                                    langEditor.setMode(value);
                                }}
                            />
                        </Flex>
                    </div>
                    <div className='mc-layout-main' style={{backgroundColor:"#FFFFFF"}}>
                        <Flex className="mc-layout-main-condition" justify="space-between" gap={20}>
                            <div className='mc-layout-main-search'>
                                <SearchInput placeholder='搜索语言名称' />
                            </div>
                            <Flex align="center">
                                筛选内容：
                                <DefaultSelect value={'0'} options={[
                                    { value: '0', label: '全部内容' },
                                    { value: '1', label: '空白内容' },
                                ]} />
                            </Flex>
                        </Flex>
                        <Tabs defaultActiveKey="1" items={items} />
                    </div>
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} onClick={submit} text='保存' />
                    </div>
                </div>
                {isOverlay && <Overlay status={loading} okText='保存' onExit={()=>{
                    history.push(`/website/shopSetting`);
                }} onSubmit={submit} />}
            </div>}
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
            /* max-width: 1200px; */
            margin: '0 auto';
            .mc-header {
                color: rgb(36, 40, 51);
                font-size: 30px;
                height: 42px;
                font-weight: bold;
                margin: 8px 0px 24px;
                display: flex;
                justify-content: space-between;
                align-content: center;
                &-left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
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
                padding: 20px 24px;
                &-condition{
                    margin-bottom: 20px;
                }
                &-search{
                    width: 100%;
                    max-width: 600px;
                }
            }
           
            .mc-footer{
                margin-top: 20px;
                display:flex;
                flex-direction: row-reverse;
            }
        }
    }
`;

export default observer(LangEditor);

