import MyButton from "@/components/Button/MyButton"
import { EditorAddBtnIcon, SearchSecondIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput"
import { Drawer, Flex } from "antd"
import { useRef, useState } from "react"
import styled from "styled-components"


function FontFamily({item,componentsData}:any){

    const mRef = useRef(null)

    const [open,setOpen] = useState(false)

    const [menu,setMenu] = useState([
        {
            title: 'ABeeZee',
        },
        {
            title: 'AR One Sans',
        },
        {
            title: 'Abel',
        },
        {
            title: 'Abhaya Libre',
        },
    ])


    return (
        <Scoped ref={mRef}>  
            <div className="select cursor-pointer">
                <div className="title">Poppins</div>
                <div className="desc">600</div>
                <Flex gap={12}>
                    <MyButton text={"恢复默认"} style={{height:"36px",flex:1}} />
                    <MyButton text={"更换"} style={{height:"36px",flex:1}} onClick={()=>setOpen(true)} />
                </Flex>
            </div>

            <Drawer
                getContainer={()=>mRef.current!}
                width={319}
                closeIcon={null}
                title={<div>请选择字体</div>}
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
                        <MyInput placeholder="搜索名称" suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    <div className="menu-box">
                        {menu.map((item,index)=>(
                            <Flex className="menu-item">
                                {item.title}
                            </Flex>
                        ))}
                    </div>
                </>
            </Drawer>
        </Scoped>
    )
}

const Scoped = styled.div`

    .ant-drawer-content-wrapper{
        top: 52px;
        box-shadow:none;
    }

    .select{
        border-radius: 4px;
        background-color: #f7f8fb;
        border: 1px dashed #d7dbe7;
        padding: 12px;

        .title{
            font-weight: 600;
            font-size: 18px;
            color:#242633;
            margin-bottom: 4px;
        }
        .desc{
            font-size: 12px;
            color:#7A8499;
            margin-bottom: 12px;
        }

    }
    .menu-box{
        padding: 0;
        height: calc(100% - 60px);
        overflow-y: auto;
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

export default FontFamily