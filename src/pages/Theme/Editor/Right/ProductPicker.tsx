import DefaultButton from "@/components/Button/DefaultButton"
import MyButton from "@/components/Button/MyButton"
import { EditorAddBtnIcon, SearchSecondIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput"
import { CheckCircleFilled } from "@ant-design/icons"
import { Drawer, Flex } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

interface DataType{
    id:string,
    resource:any,
}

function ProductPicker({item,data,setData}:{item:any,data:DataType,setData:(item:any,value:DataType)=>void}){

    const mRef = useRef(null);

    const [open,setOpen] = useState(false);

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(typeof data === 'object' ? data : defaultData);

    const [menu,setMenu] = useState([
        {
            id:'1',
            title: '商品1',
        },
        {
            id:'2',
            title: '商品2',
        },
        {
            id:'3',
            title: '商品3',
        },
    ]);

    // 删除
    const delMenu = () => {
        setData(item,{
            id: "",
            resource: null
        });
        setValue({
            id: "",
            resource: null
        });
    };

    // 完成
    const submit = () => {
        setOpen(false);
        setData(item,value);
        setValue(value);
    }

    // 取消
    const cancel = ()=>{
        setValue(data);
        setOpen(false);
    }

    // 获取商品
    useEffect(()=>{
        setValue(typeof data === 'object' ? data : defaultData);
    },[])


    return (
        <Scoped ref={mRef}>
            {value?.id ? (
                <div className="select_item">
                    <div className="select_item_container">{value?.resource?.title}</div>
                    <Flex gap={12}>
                        <div style={{flex:1}}>
                            <DefaultButton style={{width:"100%"}} text="更换" onClick={() => setOpen(true)} />
                        </div>
                        <div style={{flex:1}}>
                            <DefaultButton style={{width:"100%"}} text="删除" onClick={delMenu} />
                        </div>
                    </Flex>
                </div>
            ):<Flex className="menu-picker cursor-pointer" justify="center" align="center" gap={6} onClick={()=>setOpen(true)}>
                <EditorAddBtnIcon className="font-24 icon" />
                <div className="text">选择商品</div>
            </Flex>}
            

            <Drawer
                getContainer={()=>mRef.current!}
                width={319}
                closeIcon={null}
                title={<div>选择商品</div>}
                mask={false}
                open={open}
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
                <>
                    <Flex style={{padding: '12px'}}>
                        <MyInput placeholder="请输入商品名称" suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    {menu.map((item,index)=>(
                        <Flex key={item.id} className="menu-item" justify="space-between" align="center" onClick={()=>{
                            setValue({
                                id: item.id.toString(),
                                resource: {
                                    title: item.title 
                                }
                            });
                        }}>
                            <div>{item.title}</div>
                            {item.id == value?.id && <CheckCircleFilled className="color-356DFF font-16" />}
                        </Flex>
                    ))}
                    <Flex className="menu-item" align="center" justify="center" gap={6} >
                        <EditorAddBtnIcon className="font-20 color-356DFF" />
                        <div className="color-356DFF">创建商品</div>
                    </Flex>
                </>
            </Drawer>
        </Scoped>
    )
}

const Scoped = styled.div`

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
    }
    

`

export default ProductPicker