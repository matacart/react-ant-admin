
import { AddIcon, BackIcon, DownIcon, EditorCategoryIcon, EditorHomeIcon, EditorRedoIcon, EditorRevokeIcon, RightIcon } from '@/components/Icons/Icons';
import SuccessTag from '@/components/Tag/SuccessTag';
import { getJsonTemplates, settingsSections, templateUpdate } from '@/services/y2/api';
import editor from '@/store/theme/editor';
import { Button, Dropdown, Flex, Space, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LangSelect from '@/components/Select/LangSelect';
import DefaultTag from '@/components/Tag/DefaultTag';
import { SelectLang } from '@/components';
import { history, useIntl } from '@umijs/max';
import { useAbortController } from '@/hooks/customHooks';
import NewTemplateModal from './NewTemplateModal';
import MySelect from '@/components/Select/MySelect';


interface pageType{
    id:string,
    name:string,
    title:string,
    template:{
        directory:string | null,
        name:string,
        suffix:string | null,
    },
}

export interface jsonTemplate{
    templateName:string;
    pageName:string;
}

const style: React.CSSProperties = {
    width: 220,
    padding: "6px 0",
    maxHeight:"350px",
};

// 从模板路径中提取模板名称
const extractTemplateName = (templatePath: string) => {
    // 使用正则表达式匹配 templates/ 和 最后一个. 之间的内容
    const match = templatePath.match(/templates\/(.+)\./);
    if (match && match[1]) {
      return match[1];
    }
    return "";
}

function Header({templateId,templateName,nvData}:{templateId:string,templateName:string,nvData:any[]}) {

    const intl = useIntl();

    const navigate = useNavigate();

    const isNavigating = useRef(false);

    const { createAbortController } = useAbortController();

    const [loading,setLoading] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const [actionItem,setActionItem] = useState<any>();

    const [parentItems, setParentItems] = useState<any[]>([]); // 原始主菜单数据

    const [submenuData, setSubmenuData] = useState<any[]>([]); // 子菜单数据

    const [items,setItems] = useState<any[]>([]); //菜单数据

    const [currentMenu, setCurrentMenu] = useState('main'); // 当前显示的菜单 'main' 表示主菜单

    const [navigationData,setNavigationData] = useState<any[]>(nvData); // 导航数据

    // 根据当前菜单状态生成菜单项
    const generateMenuItems = () => {
        // 如果是主菜单
        if (currentMenu === 'main') {
            return parentItems;
        }
        // 如果是子菜单，生成返回按钮,添加,子菜单项
        const backItem = {
            key: 'back',
            label: (
                <a onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // 返回主菜单
                    setCurrentMenu('main');
                }}>
                    <Flex align='center' gap={8} style={{padding:"4px 0"}}>
                        <RightIcon className='font-16' style={{transform: 'rotate(180deg)'}} />
                        返回
                    </Flex>
                </a>
            )
        };
        

        // 生成子菜单项
        const submenuStructure = [backItem, ...submenuData];
        return submenuStructure;
    };

    // 获取子菜单数据
    const getTemplates = async (templateName:string)=>{
        return await getJsonTemplates({
            template_id: templateId,
            languages_id: editor.languagesId,
            layout_code:templateName,
            version:editor.templateInfo.themeInstanceInfo.themeOS,
            mode:editor.mode,
        })
    }

    // 根据数据生成菜单项
    const MainItems = (data:any[])=>{
        // 将页面数据转换为菜单数据
        const pageList = data.reduce((result:any, currentValue:pageType) => {
            const groupKey = currentValue.name;
            // 创建分组
            if(
                currentValue.template.directory == "customers" ||
                currentValue.template.directory == "customers/order"
            ){
                result['Customers'].some((item:any)=>item.name == groupKey) || result['Customers'].push(currentValue);
                return result;
            }

            if(
                groupKey == "templates/404.json" ||
                groupKey == "templates/password.json"
            ){
                result['Features'].some((item:any)=>item.name == groupKey) || result['Features'].push(currentValue);
                return result;
            }

            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            // 标题不为空
            if(currentValue.title){
                result[groupKey].push(currentValue);
            }
            return result;
        },{
            'Customers':[],
            'Features':[],
        });
        setActionItem(data.filter((item:any)=>item.name == templateName)[0])
        // 调整键的顺序，使 Customers 和 Features 在最后
        const orderedKeys = Object.keys(pageList).filter(key => key !== 'Customers' && key !== 'Features');
        if (pageList['Customers']) orderedKeys.push('Customers');
        if (pageList['Features']) orderedKeys.push('Features');
        const newItems = orderedKeys.map((groupKey,index)=>{
            if (pageList[groupKey].length == 1) {
                const item = pageList[groupKey][0];
                // 获取名称
                const templateItemName = extractTemplateName(item.name);
                return {
                    key: `${index}`,
                    label: (
                        templateItemName == "collection" || templateItemName == "products/detail"
                        ?(
                            <a onClick={async (e)=>{
                                e.preventDefault();
                                // 阻止下拉菜单关闭
                                e.stopPropagation();
                                const templateList = await getTemplates(item.id);
                                const newSubmenuData = templateList.data.list.map((submenu:jsonTemplate,index:number)=>{
                                    return {
                                        key: `submenu-${index}`,
                                        label: (
                                            <div onClick={()=>{
                                                isNavigating.current = false;
                                                history.push(`/theme/editor?templateId=${templateId}&languagesId=${"2"}&templateName=${submenu.templateName}`)
                                            }}>
                                                <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                                    <Flex gap={8} align='center'>
                                                        <EditorCategoryIcon className='font-24' />
                                                        {submenu.pageName}
                                                    </Flex>
                                                </Flex>
                                            </div>
                                        )
                                    }
                                })

                                // 添加项
                                const newItem = {
                                    key: 'new',
                                    label: <NewTemplateModal templateInfo={{templateId:templateId,templateName:templateName}} templateList={templateList.data.list} />
                                }
                                setSubmenuData([...newSubmenuData,newItem]);
                                setCurrentMenu(templateItemName);
                            }}>
                                <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                    <Flex gap={8} align='center'>
                                        <EditorCategoryIcon className='font-24' />
                                        <span className={item.name == templateName ? 'color-356DFF':''}>{intl.formatMessage({id:`theme.header.navigation.${item.id}`})}</span>
                                    </Flex>
                                    <RightIcon className='font-16 color-474F5E' />
                                </Flex>
                            </a>
                        ):(
                            <div onClick={()=>{
                                isNavigating.current = false;
                                history.push(`/theme/editor?templateId=${templateId}&languagesId=${"2"}&templateName=${item.name}`)
                            }}>
                                <Flex style={{height:"30px"}} align='center' gap={8}>
                                    <EditorCategoryIcon className='font-24' />
                                    <span className={item.name == templateName ? 'color-356DFF':''}>{intl.formatMessage({id:`theme.header.navigation.${item.id}`})}</span>
                                </Flex>
                            </div>
                        )
                    )
                }
            }
            if(groupKey == "Customers"){
                const active = pageList[groupKey].some((item:any)=>item.name == templateName)
                return {
                    key: `${index}`,
                    label: (
                        <a onClick={(e)=>{
                            e.preventDefault();
                            // 阻止下拉菜单关闭
                            e.stopPropagation();
                            const newSubmenuData = pageList[groupKey].map((submenu:any,index:number)=>{
                                return {
                                    key: `submenu-${index}`,
                                    label: (
                                        <div onClick={()=>{
                                            isNavigating.current = false;
                                            history.push(`/theme/editor?templateId=${templateId}&languagesId=${"2"}&templateName=${submenu.name}`)
                                        }}>
                                            <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                                <Flex gap={8} align='center'>
                                                    <EditorCategoryIcon className='font-24' />
                                                    <span style={{maxWidth:'140px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{intl.formatMessage({id:`theme.header.navigation.${submenu.id}`})}</span>
                                                </Flex>
                                            </Flex>
                                        </div>
                                    )
                                }
                            })
                            setSubmenuData(newSubmenuData);
                            setCurrentMenu('customers');
                        }}>
                            <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                <Flex gap={8} align='center'>
                                    <EditorCategoryIcon className='font-24' />
                                    <span className={active ? 'color-356DFF':''}>{intl.formatMessage({id:`theme.header.navigation.${groupKey}`})}</span>
                                </Flex>
                                <RightIcon className='font-16 color-474F5E' />
                            </Flex>
                        </a>
                    )
                }
            }

            if(groupKey == "Features"){
                const active = pageList[groupKey].some((item:any)=>item.name == templateName)
                return {
                    key: `${index}`,
                    label: (
                        <a onClick={(e)=>{
                            e.preventDefault();
                            // 阻止下拉菜单关闭
                            e.stopPropagation();
                            const newSubmenuData = pageList[groupKey].map((submenu:any,index:number)=>{
                                return {
                                    key: `submenu-${index}`,
                                    label: (
                                        <div onClick={()=>{
                                            isNavigating.current = false;
                                            history.push(`/theme/editor?templateId=${templateId}&languagesId=${"2"}&templateName=${submenu.name}`);
                                        }}>
                                            <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                                <Flex gap={8} align='center'>
                                                    <EditorCategoryIcon className='font-24' />
                                                    <span style={{maxWidth:'140px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{intl.formatMessage({id:`theme.header.navigation.${submenu.id}`})}</span>
                                                </Flex>
                                            </Flex>
                                        </div>
                                    )
                                }
                            })
                            setSubmenuData(newSubmenuData);
                            setCurrentMenu('features');
                        }}>
                            <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                <Flex gap={8} align='center'>
                                    <EditorCategoryIcon className='font-24' />
                                    <span className={active ? 'color-356DFF':''}>{intl.formatMessage({id:`theme.header.navigation.${groupKey}`})}</span>
                                </Flex>
                                <RightIcon className='font-16 color-474F5E' />
                            </Flex>
                        </a>
                    )
                }
            }
        });

        return newItems;
    }

    // 店铺语言切换
    const setLang = (lang:string)=>{
        editor.setLanguagesId(lang);
    }

    // 更新 Dropdown 菜单项
    const isFirstRender = useRef(true); // 添加一个 ref 来跟踪是否是首次渲染
    useMemo(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if(!isNavigating.current){
            const newItems = generateMenuItems();
            setItems(newItems || []);
        }else{
            isNavigating.current = true;
        }
    }, [currentMenu]);

    // 当国际语言发生变化时
    useEffect(()=>{
        const newItems = MainItems(navigationData);
        setItems([...newItems]); // 初始显示主菜单
        setParentItems([...newItems]); // 保存原始主菜单
    },[intl.locale,templateName])

    return(
        <Scoped className='font-14'>
            {/* left */}
            <Tooltip title={intl.formatMessage({id:'theme.header.backToAdmin'})} placement="right">
                <div className='header-left cursor-pointer' onClick={()=>navigate(`/website/shopSetting`)}>
                    <BackIcon className='font-20' />
                </div>
            </Tooltip>
            <Flex className='header-main' justify='space-between'>
                {/* left */}
                <Flex gap={8} align='center'>
                    <div className='font-w-600' style={{marginLeft:"16px"}}>{editor.templateInfo.themeInfo?.name}<span style={{marginLeft:"6px"}}>{editor.templateInfo.themeInfo?.theme_version}</span></div>
                    {editor.templateInfo.themeInstanceInfo?.status == "1" ? <SuccessTag text={intl.formatMessage({id:'theme.header.live'})} />:<DefaultTag text={intl.formatMessage({id:'theme.header.draft'})} />}
                </Flex>
                <Flex align='center' gap={20}>
                    <Flex align='center'>
                        <div>{intl.formatMessage({id:'theme.header.mode'})}：</div>
                        <MySelect
                            defaultValue={editor.mode}
                            options={[
                                { value: 'auto', label: intl.formatMessage({id:'theme.header.mode.auto'}) },
                                { value: 'original', label: intl.formatMessage({id:'theme.header.mode.original'}) },
                                { value: 'mapping', label: intl.formatMessage({id:'theme.header.mode.mapping'}) },
                            ]} style={{height:"36px",width:"100px"}} 
                            onChange={(value)=>{
                                editor.setMode(value)
                            }} 
                        />
                    </Flex>
                    <Dropdown open={menuOpen} menu={{ items,style }} trigger={["click"]} onOpenChange={(open) => {
                        if(!open){
                            // 只有当不是在子菜单中点击项目时才重置到主菜单
                            if (currentMenu !== 'main') {
                                // 延迟重置，给子菜单项的点击事件留出时间
                                setTimeout(() => {
                                    setCurrentMenu('main');
                                }, 0);
                            }
                        }
                        setMenuOpen(open)
                    }}>
                        <Space>
                            <Flex align='center' gap={8} className='cursor-pointer'>
                                <Flex align='center' className='font-24'><EditorHomeIcon/></Flex>
                                {/* templateName */}
                                <div>{actionItem?.id && intl.formatMessage({id:`theme.header.navigation.${actionItem.id}`})}</div>
                                <DownIcon className={menuOpen?'rotated-up':'rotated-down'} />
                            </Flex>
                        </Space>
                    </Dropdown>
                    <LangSelect lang={editor.languagesId} setLang={setLang} />
                </Flex>
                {/* 语言 */}
                <Flex className='header-main-right' align='center'>
                    {/*  */}
                    <Flex style={{marginRight:"20px"}}><SelectLang key="SelectLang" /></Flex>
                    <Flex className='operation_warp' style={{marginRight:"20px"}} gap={12} align='center'>
                        <Tooltip title={intl.formatMessage({id:'theme.header.undo'})} placement="right">
                            <EditorRevokeIcon className={`font-20 cursor-pointer ${editor.operationHistory.length == 0 ? 'opacity_6':''}`} onClick={async ()=>{
                                // 获取最近一次撤销操作
                                const lastOperation = editor.getLastOperation();
                                if(lastOperation){
                                    // 执行操作
                                    const newData = await templateUpdate(lastOperation.undoData);
                                    if(newData){
                                        if(lastOperation.undoData.sections && lastOperation.undoData.pageName == ""){
                                        }
                                        // 设置
                                        if(lastOperation.undoData.settings){
                                            console.log(JSON.parse(lastOperation.undoData.settings))
                                            editor.setSettings({
                                                ...editor.settings,
                                                settingsData:JSON.parse(lastOperation.undoData.settings)
                                            })
                                        }
                                        // 从历史记录中移除该操作（会自动添加到重做历史中）
                                        editor.removeLastOperation();
                                    }
                                }
                                
                            }} />
                        </Tooltip>
                        <Tooltip title={intl.formatMessage({id:'theme.header.redo'})} placement="right">
                            <EditorRedoIcon className={`font-20 cursor-pointer ${editor.redoHistory.length == 0 ? 'opacity_6':''}`} onClick={async ()=>{
                                // 获取最近一次重做操作
                                const lastRedoOperation = editor.getLastRedoOperation();
                                if(lastRedoOperation){
                                    console.log(JSON.parse(lastRedoOperation.redoData.settings))
                                    // 执行操作
                                    const newData = await templateUpdate(lastRedoOperation.redoData);
                                    if(newData){
                                        if(lastRedoOperation.redoData.sections && lastRedoOperation.redoData.pageName == ""){
                                        }
                                        // 设置
                                        if(lastRedoOperation.redoData.settings){
                                            editor.setSettings({
                                                ...editor.settings,
                                                settingsData:JSON.parse(lastRedoOperation.redoData.settings)
                                            })
                                        }
                                        editor.removeLastRedoOperation();
                                    }
                                }
                            }} />
                        </Tooltip>
                    </Flex>
                    <div className='prev-btn'>{intl.formatMessage({id:'theme.header.preview'})}</div>
                    <Button type="primary" className='font-14 save-btn' loading={loading} onClick={async ()=>{
                        console.log(editor.templateData)
                        const result = await settingsSections({
                            mode: "auto",
                            themeId: templateId??"",
                            action:"save",
                            oseid: editor.oseId??"",
                        })
                    }}>{intl.formatMessage({id:'theme.header.save'})}</Button>
                </Flex>
            </Flex>
        </Scoped>
    )
}

export default observer(Header);

const Scoped = styled.div`
    display: flex;
    height: 52px;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    .header-left{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        border-right: 1px solid rgba(5, 5, 5, 0.06);
    }
    .header-main{
        flex: 1;
        .rotated-up{
            transform: rotate(180deg);
            transition: transform 0.3s ease;
        }
        .rotated-down{
            transform: rotate(0deg);
            transition: transform 0.3s ease;
        }

        .header-main-right{
            .operation_warp{
                .opacity_6{
                    opacity: 0.6;
                }
            }
            .prev-btn{
                align-items: center;
                border-left: 1px solid #eaedf1;
                cursor: pointer;
                display: flex;
                height: 100%;
                justify-content: center;
                padding-left: 30px;
                padding-right: 30px;
                /* padding: 8px 12px 8px 8px; */
                transition: .3s;
                white-space: nowrap;
            }
            .save-btn{
                border: 0;
                border-radius: 0;
                height: 100%;
                padding-left: 20px;
                padding-right: 20px;
            }
        }
    }
`