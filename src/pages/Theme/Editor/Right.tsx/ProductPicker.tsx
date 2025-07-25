import MyButton from "@/components/Button/MyButton"
import { EditorAddBtnIcon, SearchSecondIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput"
import { Drawer, Flex } from "antd"
import { useRef, useState } from "react"
import styled from "styled-components"


function ProductPicker({item,componentsData}:any){

    const mRef = useRef(null)

    const [open,setOpen] = useState(false)

    const [menu,setMenu] = useState([
        {
            title: '商品1',
        },
        {
            title: '商品2',
        },
        {
            title: '商品3',
        },
    ])


    return (
        <Scoped ref={mRef}>  
            <Flex className="menu-picker cursor-pointer" justify="center" align="center" gap={6} onClick={()=>setOpen(true)}>
                <EditorAddBtnIcon className="font-24 icon" />
                <div className="text">选择商品</div>
            </Flex>

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
                onClose={()=>setOpen(false)}
                footer={
                    <Flex justify="end">
                        <Flex gap={8}>
                            <MyButton text="取消" onClick={()=>setOpen(false)}/>
                            <MyButton color="primary" variant="solid" text="完成" onClick={()=>setOpen(false)}/>
                        </Flex>
                    </Flex>
                }
            >
                <>
                    <Flex style={{padding: '12px'}}>
                        <MyInput placeholder="请输入商品名称" suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    {menu.map((item,index)=>(
                        <Flex className="menu-item">
                            {item.title}
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

    .preview{
        
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