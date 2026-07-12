import DefaultButton from "@/components/Button/DefaultButton"
import MyButton from "@/components/Button/MyButton"
import { EditorAddBtnIcon, EditorNavigationIcon, ExportIcon } from "@/components/Icons/Icons"
import { useAbortController } from "@/hooks/customHooks"
import { getNavList } from "@/services/y2/api"
import editor from "@/store/theme/editor"
import { CheckCircleFilled } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Drawer, Flex, Pagination, Spin } from "antd"
import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"


interface DataType{
    value:string,
    resource:any,
}

interface MenuType{
    id:string,
    name:any,
}

function MenuPicker({item,data,setData}:{item:any,data:DataType,setData:(item:any,value:DataType)=>void}){

    const mRef = useRef(null);

    const { createAbortController } = useAbortController();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    // 检测屏幕宽度并决定Drawer的位置
    const [isSmallScreen, setIsSmallScreen] = useState("right");

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(typeof data === 'object' ? data : defaultData);

    const [menu,setMenu] = useState([]);

    const [languagesId, setLanguagesId] = useState("2");

    const [pagination, setPagination] = useState({ total: 0, currentPage: 0 });

    // 删除
    const delMenu = () => {
        setData(item,{
            value: "",
            resource: null
        });
        setValue({
            value: "",
            resource: null
        });
    };

    // 完成
    const submit = () => {
        setOpen(false);
        setData(item,value)
        setValue(value);
    }

    // 取消
    const cancel = ()=>{
        setValue(data);
        setOpen(false);
    }

    // 获取菜单数据
    const getMenus = async (page:number,languagesId:string) => {
        const signal = createAbortController();
        setLoading(true);
        getNavList({
            page:page.toString(),
            limit:"10",
            languages_id:languagesId,
            pid:"0",
        },signal).then(res=>{
            if(res.code == 0){
                setMenu(res.data.list);
                setPagination({ total: res.data.total, currentPage: page });
            }
        }).catch((err)=>{

        }).finally(()=>{
            setLoading(false);
        })
    };

    const firstRef = useRef(true); // Initialize ref with a default value
    useEffect(()=>{
        if (firstRef.current) {
            firstRef.current = false;
            return;
        }
        getMenus(pagination.currentPage,languagesId);
    },[pagination.currentPage,languagesId])

    // 
    useMemo(()=>{
        setValue(typeof data === 'object' ? data : defaultData);
    },[data])

    useEffect(() => {
        const updatePlacement = () => {
            setIsSmallScreen(window.innerWidth < 1600 ? 'left' : 'right');
        };
        // 初始化
        updatePlacement();
        // 监听窗口大小变化
        window.addEventListener('resize', updatePlacement);
        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', updatePlacement);
        };
    }, []);


    return (
        <Scoped ref={mRef}>
            {value?.value ? (
                <div className="select_item">
                    <Flex align="center">
                        <Flex align="center" justify="center" className="icon"><EditorNavigationIcon /></Flex>
                        <div className="select_item_container" onClick={()=>history.push(`/website/navList/${value.id}/${editor.languagesId}`)}>{value?.resource?.name[languagesId]}</div>
                        <ExportIcon style={{marginLeft:"8px"}} className="font-16" />
                    </Flex>
                    <Flex gap={12} style={{marginTop:"12px"}}>
                        <div style={{flex:1}}>
                            <DefaultButton style={{width:"100%"}} text="更换" onClick={() => {
                                setOpen(true);
                                setLanguagesId("2");
                                setPagination({ ...pagination, currentPage: 1 });
                            }} />
                        </div>
                        <div style={{flex:1}}>
                            <DefaultButton style={{width:"100%"}} text="删除" onClick={delMenu} />
                        </div>
                    </Flex>
                </div>
            ):<Flex className="menu-picker cursor-pointer" justify="center" align="center" gap={6} onClick={()=>{
                setOpen(true);
                setLanguagesId("2");
                setPagination({ ...pagination,currentPage: 1 });
            }}>
                <EditorAddBtnIcon className="font-24 icon" />
                <div className="text">选择菜单导航</div>
            </Flex>}
            <Drawer
                getContainer={()=>mRef.current!}
                width={300}
                placement={isSmallScreen as 'left' | 'right'}
                closeIcon={null}
                title={<div>选择菜单导航</div>}
                mask={false}
                open={open}
                className="menu-picker-drawer"
                classNames={{
                    body: 'menu-box'
                }}
                onClose={cancel}
                footer={
                    <Flex justify="end">
                        <Flex gap={8}>
                            <MyButton text="取消" onClick={cancel}/>
                            <MyButton color="primary" variant="solid" text="完成" onClick={submit}/>
                        </Flex>
                    </Flex>
                }
            >
                <Spin spinning={loading}>
                    <div className="menu-list">
                        {menu.map((item:MenuType,index:number)=>(
                            <Flex key={item.id} className="menu-item" justify="space-between" align="center" onClick={()=>{
                                setValue({
                                    value: item.id.toString(),
                                    resource: {
                                        ...item
                                    }
                                });
                            }}>
                                <div>{item.name[languagesId]}</div>
                                {item.id == value?.value && <CheckCircleFilled className="color-356DFF font-16" />}
                            </Flex>
                        ))}
                        <Flex className="menu-item" align="center" justify="center" gap={6} >
                            <EditorAddBtnIcon className="font-20 color-356DFF" />
                            <div className="color-356DFF">创建导航菜单</div>
                        </Flex>
                    </div>
                    <Pagination style={{marginTop:"12px"}} align="center" simple current={pagination.currentPage} total={pagination.total} onChange={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))} />
                </Spin>
            </Drawer>
        </Scoped>
    )
}

const Scoped = styled.div`

    .select_item{
        border-radius: 4px;
        padding: 16px;
        background-color: #f7f8fb;
        .icon{
            height: 36px;
            width: 36px;
            border: 1px solid #d7dbe7;
            border-radius: 2px;
            margin-right: 12px;
        }
        .select_item_container{
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }

    .menu-picker{
        border: 1px dashed #d7dbe7;
        border-radius: 6px;
        height: 48px;
        background-color: #f7f8fb
    }

    .ant-drawer-content-wrapper{
        top: 52px;
        box-shadow:none;
    }

    .menu-box{
        padding: 0;
        .menu-item{
            padding: 18px 16px;
            border-bottom: 1px solid #eef1f7;
            cursor: pointer;
            &:hover{
                background-color: #f7f8fb;
            }
        }

        .menu-list{
            max-height: calc(100% - 60px);
            overflow-y: auto;
        }
    }

    .menu-picker-drawer{
        position: relative;
        left: 52px;
    }
    
    @media only screen and (min-width: 1600px) {
        .menu-picker-drawer{
            position: relative;
            left: 0;
        }
    }

`

export default MenuPicker