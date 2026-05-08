import { ArrowLeftOutlined } from '@ant-design/icons'
import { App, Flex } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { FormInstance } from 'antd/lib';
import LangSelect from '@/components/Select/LangSelect';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TitleCard from '../Navgate/TitleCard';
import HandleCard from '../Navgate/HandleCard';
import MenuItemCard from '../Navgate/MenuItemCard';
import navgate, { TreeItem } from '@/store/channel/navList/navgate';
import { flattenTree } from '../Navgate/Tree/utilities';
import { batchAddNavgate } from '@/services/y2/api';
import { useSleep } from '@/hooks/customHooks';
import Subnumber from '../Navgate/Subnumber';
import Relevance from '../Navgate/Relevance';

function NewNavgate(){
    
    const { message } = App.useApp();

    const [loading,setLoading] = useState(false);

    const [languagesId,setLanguagesId] = useState("2");
    const sleep = useSleep();
    // 表单1
    const titleCardRef = useRef<FormInstance>(null);
    // 表单2
    const HandleCardRef = useRef<FormInstance>(null);
    // 统一校验方法
    const validateAll = async () => {
        try {
            // 校验标题卡
            await titleCardRef.current?.validateFields();
            // 校验handle卡
            await HandleCardRef.current?.validateFields();

            const title = titleCardRef.current?.getFieldsValue().title;
            const handle = HandleCardRef.current?.getFieldsValue().handle || title.replace(/\s+/g, '-').toLowerCase();

            let data:TreeItem[] = [{
                id:"",
                languages_id:languagesId,
                title:title,
                handle:handle,
                content:"",
                sort:"1000",
                pid:"0",
                status:"1",
                is_url:"0",
	            is_sys:navgate.isSys,
                is_share:navgate.isShare,
                is_bind:navgate.isBind,
            }];
            try {
                flattenTree(navgate.initialItems).forEach((item:any)=>{
                    data.push({
                        id:"",
                        languages_id:item.languagesId,
                        title:item?.title,
                        image:item?.img,
                        page_link:item?.pageLink,
                        handle:(item.id).replace(/\s+/g, '-').toLowerCase(),
                        pid:(item?.parentId??handle).replace(/\s+/g, '-').toLowerCase(),
                        content:"",
                        sort:"1000",
                        status:"1",
                        is_url:"1",
                        is_sys:item.isSys,
                        is_share:item.isShare,
                        open_mode:item.openMode
                    })
                });
            } catch (error) {
                console.error(error);
            }
            // 提交数据
            setLoading(true);
            batchAddNavgate({
                languages_id:navgate.languagesId,
                pages:JSON.stringify(data)
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

    // 初始化
    const init = async ()=>{
        // 状态重置
        await navgate.clear();
    }

    useEffect(()=>{
        init();
    },[])

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
                            <div className="mc-header-left-content">创建菜单导航</div>
                        </div>
                        <Flex className='mc-header-right' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={languagesId} setLang={setLanguagesId} />
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
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} onClick={()=>{validateAll()}} text="创建" />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(NewNavgate);

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