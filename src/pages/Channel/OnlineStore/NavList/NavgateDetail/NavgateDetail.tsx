import { ArrowLeftOutlined } from '@ant-design/icons'
import { Flex, message } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useIntl, useParams } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { FormInstance } from 'antd/lib';
import LangSelect from '@/components/Select/LangSelect';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TitleCard from '../Navgate/TitleCard';
import HandleCard from '../Navgate/HandleCard';
import MenuItemCard from '../Navgate/MenuItemCard';
import navgate, { TreeItem } from '@/store/channel/navList/navgate';
import { flattenTree, transformFields } from '../Navgate/Tree/utilities';
import { batchAddNavgate, getNavList } from '@/services/y2/api';
import DangerButton from '@/components/Button/DangerButton';
import DeleteModal from '@/components/Modal/DeleteModal';
import { useSleep } from '@/hooks/customHooks';
import Subnumber from '../Navgate/Subnumber';
import Relevance from '../Navgate/Relevance';

function NavgateDetail(){

    const intl = useIntl();

    const sleep = useSleep();

    const { id,languagesId } = useParams<{ id: string,languagesId: string }>(); // 获取路径参数中的 id

    const [loading,setLoading] = useState(false);

    const titleCardRef = useRef<FormInstance>(null);

    // 表单2
    const HandleCardRef = useRef<FormInstance>(null);

    // 语言切换
    const setLang = (lang:string)=>{
        // 修改url的参数 languagesId
        history.push(`/website/navList/${id}/${lang}`);
    }
    
    // 获取导航详情
    async function fetch(){
        // 状态重置
        await navgate.clear();
        // 0 获取所有语言的导航数据
        getNavList({
            languages_id:"0",
            pid:id??"0",
            group_by_sys:"0"
        }).then(res=>{
            if(res.code == 0){
                titleCardRef.current?.setFieldsValue({
                    title:res.data.list[0]?.name[languagesId || "2"] || res.data.list[0]?.name?.default
                });
                HandleCardRef.current?.setFieldsValue({
                    handle:res.data.list[0]?.handle || ""
                });
                const newTree = transformFields(res.data.list[0]?.nodeTree, {
                    childNodes: "children",
                    is_sys:"isSys",
                    is_share:"isShare",
                    is_bind:"isBind",
                    languages_id:"languagesId",
                });
                navgate.setLanguagesId(languagesId || "2");
                navgate.setIsSys(res.data.list[0]?.is_sys.toString());
                navgate.setIsShare(res.data.list[0]?.is_share.toString());
                navgate.setIsBind(res.data.list[0]?.is_bind.toString());
                navgate.setInitialItems([...newTree]);
                navgate.setId(id || "");
                // 全部项 -- 用于删除
                navgate.setItemList(res.data.list.map((item:any)=>{
                    return {
                        id:item.id,
                        languages_id:item.languages_id || "2",
                        title:item?.title,
                        image:item?.image?.src,
                        page_link:item?.pageLink,
                        node_type:item?.nodeType,
                        open_mode:item?.openMode,
                        handle:item.handle,
                        pid:item.pid,
                        content:"",
                        sort:"1000",
                        is_url:"1",
                        is_sys:item.is_sys,
                        is_share:item.is_share,
                        is_bind:item.is_bind,
                        status:"-1",
                    }
                }));
            }
        })
    }

    // 初始化导航详情
    useEffect(()=>{
        fetch();
        navgate.setLanguagesId(languagesId || "2");
    },[languagesId])

    // 统一校验方法
    const validateAll = async () => {

        let sort = 1000;
        
        try {
            // 校验标题卡
            await titleCardRef.current?.validateFields();
            // 校验handle卡
            await HandleCardRef.current?.validateFields();
            
            const title = titleCardRef.current?.getFieldsValue().title;
            const handle = HandleCardRef.current?.getFieldsValue().handle || title.replace(/\s+/g, '-').toLowerCase();

            let data:any[] = [{
                id:navgate.isSys == "1"?"":navgate.id,
                languages_id:languagesId,
                title:title,
                handle:handle,
                content:"",
                pid:"0",
                status:"1",
                sort:navgate.isSys?"100":sort+"",
                is_url:"0",
                is_sys:navgate.isSys,
                is_share:navgate.isShare,
                is_bind:navgate.isBind,
            }];
            let removeData:any[] = [];
            try {
                flattenTree(navgate.initialItems).forEach((item:any,index:number)=>{
                    data.push({
                        id:item.isNew?"":item.id,
                        languages_id:item.languagesId,
                        title:item?.title,
                        image:item?.img,
                        page_link:item?.pageLink,
                        node_type:item.nodeType,
                        handle:(item.id).replace(/\s+/g, '-').toLowerCase(),
                        pid:(item?.parentId??(item.depth == 0?navgate.id:handle)).replace(/\s+/g, '-').toLowerCase(),
                        content:"",
                        status:"1",
                        sort:sort+index+1+"",
                        is_url:"1",
                        is_sys:item.isSys || "0",
                        is_share:item.isShare || "0",
                        is_bind:item.isBind,
                        open_mode:item.openMode || "0",
                    })
                });
                flattenTree(navgate.removeItems).forEach((item:any)=>{
                    removeData.push({
                        id:item.id,
                        languages_id:item.languagesId,
                        title:item?.title,
                        image:item?.img,
                        page_link:item?.pageLink,
                        node_type:item.nodeType,
                        handle:item.handle,
                        pid:item?.pid,
                        content:"",
                        sort:"1000",
                        is_url:"1",
                        is_sys:item?.isSys,
                        is_share:item.isShare,
                        is_bind:item.isBind,
                        open_mode:item.openMode,
                        status:"-1",
                    })
                });
            } catch (error) {
                console.error(error);
            }
            console.log([...data,...removeData]);
            setLoading(true);
            // 提交数据
            batchAddNavgate({
                languages_id:navgate.languagesId,
                pages:JSON.stringify([...data,...removeData])
            }).then(res=>{
                if(res.code == 0){
                    // 清空状态
                    navgate.clear();
                    sleep(2000);
                    message.success('success');
                    history.push('/website/navList');
                }
            }).catch(err=>{
                message.error(err?.msg);
            }).finally(()=>{
                setLoading(false);
            });
        } catch (error) {
            // console.error('Validation failed:', "表单验证未通过");
        }
    };

    // 删除菜单
    const deleteMenu = ()=>{
        setLoading(true);
        batchAddNavgate({
            pages:JSON.stringify(navgate.itemList)
        }).then(async res=>{
            if(res.code == 0){
                navgate.clear();
                await sleep(2000);
                message.success('success');
                history.push('/website/navList');
            }
        }).catch(err=>{
            message.error(err?.msg || 'error');
        }).finally(()=>{
            setLoading(false);
        });
    }

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/website/navList')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">编辑菜单导航</div>
                        </div>
                        <Flex className='mc-header-right' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={languagesId || "2"} setLang={setLang} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <TitleCard ref={titleCardRef} />
                            <MenuItemCard />
                        </div>
                        <div className='mc-layout-extra'>
                            <Relevance />
                            <HandleCard ref={HandleCardRef} />
                            <Subnumber />
                        </div>
                    </div>
                    <Divider/>
                    <Flex className='mc-footer' justify='space-between'>
                        <PrimaryButton loading={loading} onClick={()=>{validateAll()}} text={"更新"} />
                        {navgate.isSys == "0" && <DeleteModal
                            tElement={
                                <DangerButton text={"删除导航"} loading={loading} />
                            }
                            removeFunc={deleteMenu} 
                            title="确认要删除此导航吗？" 
                            content={"删除后已应用此导航的页面将不再展示此导航内容。"}
                        />}
                    </Flex>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(NavgateDetail);

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: max(75%,1200px);
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
a{
  font-weight: 400
}
`
