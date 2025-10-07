
import { BackIcon, DownIcon, EditorCategoryIcon, EditorHomeIcon, EditorRedoIcon, EditorRevokeIcon, RightIcon } from '@/components/Icons/Icons';
import SuccessTag from '@/components/Tag/SuccessTag';
import { settingsSections, templateUpdate } from '@/services/y2/api';
import editor from '@/store/theme/editor';
import { Button, Dropdown, Flex, MenuProps, Space, Tag, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 
import pages from '../Editor/data/pages.json';
import MySelect from '@/components/Select/MySelect';

const style: React.CSSProperties = {
    width: 200,
    padding: "6px 0",
    maxHeight:"350px",
};

function Header({templateId,templateName}:{templateId:string,templateName:string}) {

    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const [actItem,setActItem] = useState({
        icon:<EditorHomeIcon/>,
        title:"首页",
        key:"1",
    });

    const [parentItems, setParentItems] = useState([]); // 原始主菜单数据

    const [submenuData, setSubmenuData] = useState<any[]>([]); // 子菜单数据

    const [items,setItems] = useState([]); //菜单数据

    const [currentMenu, setCurrentMenu] = useState('main'); // 当前显示的菜单 'main' 表示主菜单

    // 根据当前菜单状态生成菜单项
    const generateMenuItems = () => {
        // 如果是主菜单
        if (currentMenu === 'main') {
            return parentItems;
        }
        
        // 如果是子菜单，生成返回按钮和子菜单项
        const backItem = {
            key: 'back',
            label: (
                <a onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // 返回主菜单
                    setCurrentMenu('main');
                }}>
                    <Flex align='center' gap={8}>
                        <div className='font-16' style={{transform: 'rotate(180deg)'}}>
                            <RightIcon />
                        </div>
                        返回
                    </Flex>
                </a>
            )
        };
        
        // 生成子菜单项
        const submenuStructure = [backItem, ...submenuData];
        return submenuStructure;
    };


    useEffect(() => {

        const languages = JSON.parse(sessionStorage['languages'] || "[]")

        if(pages.code == "SUCCESS"){
            const pageList = pages.data.list.reduce((result:any, currentValue) => {
                const groupKey = currentValue.template.directory || currentValue.template.name;
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                // 标题不为空
                if(currentValue.title){
                    result[groupKey].push(currentValue);
                }
                return result;
            },{});
            const newItems = Object.keys(pageList).map((groupKey,index)=>{
                // 如果只有一组，可以直接显示这些项目
                if (pageList[groupKey].length === 1) {
                    const item = pageList[groupKey][0];
                    return {
                        key: `${index}`,
                        label: (
                            (item.name == "templates/collection.json" ||
                             item.name == "templates/product.json" ||
                             item.name == "templates/page.json" ||
                             item.name == "templates/article.json" ||
                             item.name == "templates/blog.json"
                            ) ?<a>
                                <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                    <Flex gap={8} align='center'>
                                        <EditorCategoryIcon className='font-24' />
                                        {item.title}
                                    </Flex>
                                    <RightIcon className='font-16 color-474F5E' />
                                </Flex>
                            </a>:<Link to={`/theme/editor?templateId=${templateId}&templateName=${item.name}`}>
                                <Flex style={{height:"30px"}} align='center' gap={8}>
                                    <EditorCategoryIcon className='font-24' />
                                    {item.title}
                                </Flex>
                            </Link>
                        )
                    }
                }
                if(pageList[groupKey][0].template.directory == "customers"){
                    return {
                        key: `${index}`,
                        label: (
                            <a>
                                <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                    <Flex gap={8} align='center'>
                                        <EditorCategoryIcon className='font-24' />
                                        {"客户账户"}
                                    </Flex>
                                    <RightIcon className='font-16 color-474F5E' />
                                </Flex>
                            </a>
                        )
                    }
                }
                if(pageList[groupKey][0].template.directory == "function"){
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
                                            <Link to={`/theme/editor?templateId=${templateId}&templateName=${submenu.name}`}>
                                                <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                                    <Flex gap={8} align='center'>
                                                        <EditorCategoryIcon className='font-24' />
                                                        {submenu.title}
                                                    </Flex>
                                                </Flex>
                                            </Link>
                                        )
                                    }
                                })
                                setSubmenuData(newSubmenuData);
                                setCurrentMenu('function');
                            }}>
                                <Flex style={{height:"30px"}} align='center' justify='space-between'>
                                    <Flex gap={8} align='center'>
                                        <EditorCategoryIcon className='font-24' />
                                        {"功能页面"}
                                    </Flex>
                                    <RightIcon className='font-16 color-474F5E' />
                                </Flex>
                            </a>
                        )
                    }
                }
            });

            setParentItems([...newItems]); // 保存原始主菜单数据
            setItems([...newItems]); // 初始显示主菜单
        }

    }, []);

    // 更新 Dropdown 菜单项
    const isFirstRender = useRef(true); // 添加一个 ref 来跟踪是否是首次渲染
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const newItems = generateMenuItems();
        console.log("更新 Dropdown 菜单项",newItems);
        setItems(newItems);
    }, [currentMenu]);

    return(
        <Scoped className='font-14'>
            {/* left */}
            <Tooltip title="返回管理后台" placement="right">
                <div className='header-left cursor-pointer' onClick={()=>navigate(`/website/shopSetting`)}>
                    <BackIcon className='font-20' />
                </div>
            </Tooltip>
            <Flex className='header-main' justify='space-between'>
                {/* left */}
                <Flex gap={8} align='center'>
                    <div className='font-w-600' style={{marginLeft:"16px"}}>Modern1<span style={{marginLeft:"6px"}}>1.4.37</span></div>
                    <SuccessTag text="已启用" />
                </Flex>
                <Flex align='center' gap={20}>
                    
                    <Flex align='center'>
                        店铺语言：
                        <MySelect value={editor.languages} options={[
                            { value: '1', label: 'English' },
                            { value: '2', label: 'English' },
                        ]} onChange={(value:any)=>{
                            
                        }} />
                    </Flex>

                    
                    <Dropdown open={menuOpen} menu={{ items,style }} trigger={["click"]} onOpenChange={(open) => setMenuOpen(open)}>
                        <Space>
                            <Flex align='center' gap={8} className='cursor-pointer'>
                                <Flex align='center' className='font-24'>{actItem.icon}</Flex>
                                <div>{actItem.title}</div>
                                <DownIcon className={menuOpen?'rotated-up':'rotated-down'} />
                            </Flex>
                        </Space>
                    </Dropdown>

                    {/* 编辑器语言 */}
                    <Flex align='center'>
                        编辑器：
                        <MySelect value={editor.languages} options={[
                            { value: '1', label: 'English' },
                            { value: '2', label: 'English' },
                        ]} onChange={(value:any)=>{
                            
                        }} />
                    </Flex>
                </Flex>
                <Flex className='header-main-right'>
                    <Flex className='operation_warp' style={{marginRight:"20px"}} gap={12} align='center'>
                        <Tooltip title="撤销" placement="right">
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
                        <Tooltip title="重做" placement="right">
                            <EditorRedoIcon className={`font-20 cursor-pointer ${editor.redoHistory.length == 0 ? 'opacity_6':''}`} onClick={async ()=>{
                                console.log("重做")
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
                    <div className='prev-btn'>预览</div>
                    <Button type="primary" className='font-14 save-btn' loading={loading} onClick={async ()=>{
                        console.log(editor.templateData)
                        const result = await settingsSections({
                            mode: "auto",
                            themeId: templateId??"",
                            action:"save",
                            oseid: editor.oseId??"",
                        })

                        // if(result){

                        // }

                    }}>保存</Button>
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