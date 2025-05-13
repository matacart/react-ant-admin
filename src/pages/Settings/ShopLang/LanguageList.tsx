import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ExclamationCircleOutlined, HolderOutlined, MoreOutlined } from '@ant-design/icons';
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
import { Button, Checkbox, Col, Empty, Flex, message, Modal, Skeleton, Spin, Table, Tag } from 'antd';
import type { CheckboxProps, GetProp, TableColumnsType } from 'antd';
import MyDropdown from '@/components/Dropdown/MyDropdown';
import styled from 'styled-components';
import { addLanguages, delLanguages, getLanguagesList } from '@/services/y2/api';
import _ from 'lodash';
import cookie from 'react-cookies';
import globalStore from '@/store/globalStore';
import modal from 'antd/es/modal';

interface DataType {
    key: string;
    language: any;
}
  
interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
}

const CheckboxGroup = Checkbox.Group;
  
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
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
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

export default function LanguageList() {

    const [isLoading, setIsLoading] = useState(false);

    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    const [dataSource, setDataSource] = React.useState<DataType[]>([
        
    ]);

    const [hasLanguages,setHasLanguages] = useState<any[]>([]);
    const [languages,setLanguages] = useState<any[]>([]);
    // const [checkLanguages,setCheckLanguages] = useState<string[]>([]);

    const [isCheckedAll,setIsCheckedAll] = useState(false);


    const columns: TableColumnsType<DataType> = [
        { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
        { title: 'Lang', dataIndex: 'language',render: (value, record, index) => {
            return (
                <Flex style={{width:"100%",justifyContent:"space-between",alignItems:"center"}}>
                    <div>{value.name}
                        {value.is_default == 1 && <Tag color="default" style={{borderRadius:"12px",marginLeft:"10px"}}>默认语言</Tag>}
                    </div>
                    <MyDropdown
                        tiggerEle={<Button style={{width:"28px",height:"28px",padding:"0",transform:"rotate(90deg)"}}><MoreOutlined /></Button>}
                        menu={{
                            items:value.is_default !== 1?[
                                {key:"1",label:(
                                    <div onClick={()=>setDefaultLanguage(record)}>设置为默认语言</div>
                                )},
                                {key:"2",label:(<div className='color-F86140' onClick={()=>{
                                    modal.confirm({
                                        title: '确认要删除该语言吗？',
                                        icon: <ExclamationCircleOutlined />,
                                        content: '删除后，客户将无法浏览该语言版本店铺。',
                                        centered:true,
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk:()=>{
                                            deleteLanguages(record)
                                        }
                                    });
                                }}>删除语言</div>)}
                            ]:[
                                {key:"1",label:(
                                    <div onClick={()=>setDefaultLanguage(record)}>修改默认语言</div>
                                )},
                            ]
                        }}
                        position={"bottomRight"}
                    />
                    {/* <Button style={{width:"28px",height:"28px",padding:"0",transform:"rotate(90deg)"}}><MoreOutlined /></Button> */}
                </Flex>
            )
        }},
    ];

    // 删除语言
    const deleteLanguages = (record:any)=>{
        delLanguages(record.language.id).then(res=>{
            let newDataSource = [...dataSource]
            newDataSource = newDataSource.filter((item:any)=>item.language.id !== record.language.id)
            setDataSource(newDataSource)
        })
    }
    // 设置默认语言
    const setDefaultLanguage = (record:any)=>{
        console.log(record)
        addLanguages([{
            domain_id:cookie.load("domain")?.id,
            languages_id:record.language.id,
            is_default:"1",
            sort:"0",
            checked:"1"
        }]).then(res=>{
            getLanguages();
            cookie.save('default_lang', record.language.code, { path: '/' });
        })
    }
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            let afterDataSource:any = [];
            let befortDataSource:any = [...dataSource];
            const activeIndex = befortDataSource.findIndex((record) => record.key === active?.id);
            const overIndex = befortDataSource.findIndex((record) => record.key === over?.id);
            afterDataSource = arrayMove(befortDataSource, activeIndex, overIndex);
            setDataSource(afterDataSource);

            addLanguages(afterDataSource.map((item:any,index:number)=>{
                return{
                    domain_id:cookie.load("domain")?.id,
                    languages_id:item.language.id,
                    is_default:item.language.is_default,
                    checked:item.language.checked,
                    sort:index+1
                }
            })).then(res=>{
                // return res
                // console.log(res)
                if(res == null){
                    message.success("更新失败")
                    setDataSource(befortDataSource)
                }else{
                    message.success("更新成功")
                }
            })
            // setDataSource((prevState) => {
            //     const activeIndex = prevState.findIndex((record) => record.key === active?.id);
            //     const overIndex = prevState.findIndex((record) => record.key === over?.id);
            //     addLanguages(prevState.map((item:any,index:number)=>{
            //         return{
            //             domain_id:cookie.load("domain")?.id,
            //             languages_id:item.language.id,
            //             is_default:item.language.is_default,
            //             checked:item.language.checked,
            //             sort:index+1
            //         }
            //     })).then(res=>{
            //         // return res
                    
            //     })
            //     // 更新排序
            //     return arrayMove(prevState, activeIndex, overIndex);
            // });
        }
    };
    // 全选
    const onCheckAllChange = ()=>{
        // setCheckLanguages(languages.map((item:any)=>item.code))
        setLanguages(languages.map(item=>({...item,checked:"1"})))
        setIsCheckedAll(true)
    }
    // 取消全选
    const CancelCheckAllChange = ()=>{
        setLanguages(languages.map(item=>({...item,checked:"0"})))
        setIsCheckedAll(false)
    }
    // 选择
    const checkHandleChange = (e,index)=>{
        let newLanguages = [...languages]
        e.target.checked ? newLanguages[index].checked="1" : newLanguages[index].checked="0"
        setLanguages(newLanguages)
    }
    // 保存
    const handleOK = ()=>{
        // 更新
        const langs = languages.map((item:any)=>{
            if(item.checked=="1"){
                return{
                    domain_id:cookie.load("domain")?.id,
                    languages_id:item.id,
                    is_default:"0",
                    sort:"",
                    checked:"1"
                }
            }
        }).filter(item=>item!==undefined)
        console.log(langs)
        addLanguages(langs).then(async res=>{
            setIsCheckedAll(false)
            setIsLangModalOpen(false)

            // 更新表格
            // let newDataSource = [...dataSource]
            // languages.forEach((item,index)=>{
            //     newDataSource.push({key:(dataSource.length+index).toString(),language:item})
            // })
            // console.log(newDataSource)
            // setDataSource(newDataSource)
            await globalStore.sleep(2000)
            getLanguages()
        })
    }
    // 取消弹窗
    const handleCancel = () => {
        setLanguages(languages.map(item=>({...item,checked:"0"})))
        setIsLangModalOpen(false)
        setIsCheckedAll(false)
    };
    // 获取语言列表
    const getLanguages = async ()=>{
        setIsLoading(true)
        await getLanguagesList().then((res)=>{
            setLanguages(res.filter((item:any)=>item.checked!=="1"))
            // 已有语言不可添加
            setHasLanguages(res.filter((item:any)=>item.checked=="1"))
            // 将数据根据sort排序
            const languages = res.filter((item:any)=>item.checked=="1").sort((a:any,b:any)=>a.sort-b.sort)
            setDataSource(languages.map((item:any)=>({key:item.id.toString(),language:item})))
        })
        setIsLoading(false)
    }

    useEffect(() => {
        getLanguages()
    }, [])

    return (
        <Scoped>
            {dataSource.length>0 ? <div className='drag_box'><DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
                    <Table<DataType>
                        showHeader={false}
                        pagination={false}
                        rowKey="key"
                        components={{ body: { row: Row } }}
                        columns={columns}
                        dataSource={dataSource}
                    />
                </SortableContext>
            </DndContext></div>:<div style={{padding:"20px"}}></div>}
            {/* 添加语言 */}
            <div className='add_language'>
                <Button onClick={()=>{
                    setIsLangModalOpen(true)
                }}>添加语言</Button>
            </div>
            <Modal title="添加语言" centered open={isLangModalOpen} onOk={handleOK} onCancel={handleCancel} okText="保存">
            {!isLoading?<ScopedModal>
                {isCheckedAll?<div className='check_all color-356DFF cursor-pointer' onClick={CancelCheckAllChange}>全不选</div>:<div className='check_all color-356DFF cursor-pointer' onClick={onCheckAllChange}>全选</div>}
                <div className='checkbox_group_list'>
                    {languages.map((item,index)=>(
                        <div style={{margin:"6px 0"}}>
                            <Checkbox checked={item.checked == "1"} onChange={(e)=>checkHandleChange(e,index)}>{item.name}</Checkbox>
                        </div>
                    )
                    )}
                    {hasLanguages.map((item)=>(
                        <div style={{margin:"6px 0"}}>
                            <Checkbox checked disabled>{item.name}</Checkbox>
                        </div>
                    ))}
                </div>
            </ScopedModal>:<Spin spinning={isLoading}><div style={{height:"240px"}}></div></Spin>}
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    .drag_box{
        border: 1px solid #eef1f7;
        border-bottom: 0;
        border-radius: 4px;
    }
    .add_language{
        margin-top: 12px;
    }
`

const ScopedModal = styled.div`
    .checkbox_group_list{
        height: 240px;
        overflow-y: auto;
    }
`
function sleep(arg0: number) {
    throw new Error('Function not implemented.');
}

