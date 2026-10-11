import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ExclamationCircleFilled, HolderOutlined, MoreOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { App, Button, Flex, Space, Spin, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import MyDropdown from '@/components/Dropdown/MyDropdown';
import styled from 'styled-components';
import { addLanguages, delLanguages } from '@/services/y2/apiAppstore';
import _ from 'lodash';
import cookie from 'react-cookies';
import DefaultButton from '@/components/Button/DefaultButton';
import { useSleep } from '@/hooks/customHooks';
import MyButton from '@/components/Button/MyButton';
import SetMarkets from './SetMarkets';
import shopLang, { LanguageType } from '@/store/settings/shopLang/shopLang';
import { observer } from 'mobx-react-lite';
import AddLanguage from './AddLanguage';
import DangerButton from '@/components/Button/DangerButton';
import { resetLanguagesList } from '@/utils/common';

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
}
  
const RowContext = React.createContext<RowContextProps>({});
  
const DragHandle: React.FC = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
      <Button
        type="text"
        size="small"
        icon={<HolderOutlined />}
        style={{ cursor: 'move' }}
        ref={setActivatorNodeRef}
        {...listeners}
      />
    );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}
  
const Row: React.FC<RowProps> = (props) => {
    const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    } = useSortable({ id: props['data-row-key'] });

    const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 99 } : {}),
    };

    const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
    );

    return (
    <RowContext.Provider value={contextValue}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
    );
};

 function LanguageList() {

    const sleep = useSleep();

    const {modal,message} = App.useApp();

    const [loading,setLoading] = useState(false);

    const [data, setData] = React.useState<LanguageType[]>([]);

    const columns: TableColumnsType<LanguageType> = [
        { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
        { title: 'Lang', dataIndex: 'id',render: (value, record, index) => {
            return (
                <Flex style={{width:"100%",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                        {record.languageNameDefault}
                        {record.isDefault && <Tag color="default" style={{borderRadius:"12px",marginLeft:"10px"}}>默认语言</Tag>}
                    </div>
                    <Space.Compact>
                        <SetMarkets langObj={record} setLanguageMarketsConfig={setLanguageMarketsConfig} />
                        {record.isDefault ? <MyDropdown
                            tiggerEle={<MyButton text={<MoreOutlined />} style={{width:"32px",height:"32px",padding:"0",transform:"rotate(90deg)"}} />}
                            menu={{
                                items:[
                                    {key:"1",label:(
                                        <div onClick={()=>{}}>修改默认语言</div>
                                    )},
                                ]
                            }}
                            placement={"bottomRight"}
                        />:<MyDropdown
                            tiggerEle={<MyButton text={<MoreOutlined />} style={{width:"32px",height:"32px",padding:"0",transform:"rotate(90deg)"}} />}
                            menu={{
                                items:[
                                    {key:"1",label:(
                                        <div onClick={()=>setDefaultLanguage(record)}>设为默认语言</div>
                                    )},
                                    {key:"2",label:(<div className='color-F86140' onClick={()=>{
                                        const delModal = modal.confirm({
                                            title: '确认要删除该语言吗？',
                                            icon: <ExclamationCircleFilled />,
                                            content: '删除后，客户将无法浏览该语言版本店铺。',
                                            centered:true,
                                            footer:()=><Flex justify="flex-end" gap={12}>
                                                <DefaultButton loading={loading} text="取消" onClick={()=>{
                                                    delModal.destroy();
                                                }}/>
                                                <DangerButton loading={loading} text="删除" onClick={()=>{
                                                    deleteLanguages(delModal,record)
                                                }}/>
                                            </Flex>,
                                        });
                                    }}>删除语言</div>)}
                                ]
                            }}
                            placement={"bottomRight"}
                        />}
                    </Space.Compact>
                </Flex>
            )
        }},
    ];

    // 删除语言
    const deleteLanguages = (delModel:any,record:any)=>{
        setLoading(true)
        delLanguages(record.id).then(res=>{
            message.success("删除成功")
            shopLang.setRefresh();
            resetLanguagesList();
        }).catch(()=>{
        }).finally(()=>{
            delModel.destroy();
            setLoading(false)
        })
    }
    // 设置默认语言
    const setDefaultLanguage = (record:any)=>{
        addLanguages([{
            domain_id:cookie.load("domain")?.id,
            languages_id:record.id,
            is_default:"1",
            sort:"0",
            checked:"1"
        }]).then(async res=>{
            await sleep(2000);
            message.success("成功");
            shopLang.setRefresh();
        }).catch(()=>{});
    }
    // 排序
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            let afterDataSource:any = [];
            let befortDataSource:any = [...data];
            const activeIndex = befortDataSource.findIndex((record:any) => record.key === active?.id);
            const overIndex = befortDataSource.findIndex((record:any) => record.key === over?.id);
            afterDataSource = arrayMove(befortDataSource, activeIndex, overIndex);
            setData(afterDataSource);
            addLanguages(afterDataSource.map((item:any,index:number)=>{
                return{
                    domain_id:cookie.load("domain")?.id,
                    languages_id:item.language.id,
                    is_default:item.language.is_default,
                    checked:item.language.checked,
                    sort:index+1
                }
            })).then(res=>{
                message.success("更新成功")
                setData(befortDataSource)
            }).catch(()=>{})
        }
    };
    // 更新语言市场配置
    const setLanguageMarketsConfig = (langId:string,assigned:boolean)=>{
        let newDataSource = [...data]
        newDataSource.forEach((item:any)=>{
            if(item.id==langId){
                item.assigned = assigned
            }
        })
        setData(newDataSource)
    }

    useEffect(()=>{
        setData(shopLang.hasLanguages)
    },[shopLang.hasLanguages])
    

    return (
        <Scoped>
            {data.length>0 ? <div className='drag_box'><DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext items={data.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    <Table<LanguageType>
                        showHeader={false}
                        pagination={false}
                        rowKey="key"
                        components={{ body: { row: Row } }}
                        columns={columns}
                        dataSource={data}
                    />
                </SortableContext>
            </DndContext></div>:<div style={{padding:"20px"}}></div>}
            {/* 添加语言 */}
            <div style={{marginTop:"12px"}}>
                <AddLanguage />
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    .drag_box{
        border: 1px solid #eef1f7;
        border-bottom: 0;
        border-radius: 4px;
    }

`

export default observer(LanguageList)
