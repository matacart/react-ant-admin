import MyButton from "@/components/Button/MyButton"
import { EditorAddBtnIcon, SearchSecondIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Col, Drawer, Flex, GetProp, Row, Upload, UploadProps } from "antd"
import { useRef, useState } from "react"
import styled from "styled-components"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function Video(){

    const mRef = useRef(null)

    const [open,setOpen] = useState(false)

    const [menu,setMenu] = useState([])

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const beforeUpload = (file: FileType) => {
        return false;
    };


    return (
        <Scoped ref={mRef}>  
            <Flex className="menu-picker cursor-pointer" justify="center" align="center" gap={6} onClick={()=>setOpen(true)}>
                <EditorAddBtnIcon className="font-24 icon" />
                <div className="text">选择视频文件</div>
            </Flex>

            <Drawer
                getContainer={()=>mRef.current!}
                width={319}
                closeIcon={null}
                title={<div>从文件库中选择</div>}
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
                        <MyInput placeholder="搜索文件名/文件格式" suffix={<SearchSecondIcon />} style={{height:"36px"}} />
                    </Flex>
                    <Flex style={{padding: '0 12px'}}>
                        <Upload
                            name="file"
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            beforeUpload={beforeUpload}
                        >
                            <button className="upload_btn" type="button">
                                {loading ? <LoadingOutlined className="font-20" /> : <PlusOutlined className="font-20" />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                        <Flex className="img_box" align="center" justify="center">
                            <img src="https://img.myshopline.com/image/store/1751683868702/1cb7feec77604fe88e65eb6489aa3ff9_130x.png?w=544&h=960" />
                        </Flex>
                    </Flex>
                    
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

    .menu-box{
        padding: 0;
        .upload_btn{
            width: 140px;
            height: 140px;
            background: #FAFAFA;
            border-radius: 6px;
            border: 1px dashed #d7dbe7;
            cursor: pointer;
            &:hover{
                border-color: #5e91ff;
                color: #356dff;
            }
        }

        .img_box{
            width: 140px;
            height: 140px;
            margin-left: 12px;
            background-color: #eaedf1;
            border-radius: 6px;
            border: 1px solid #eaedf1;
            cursor: pointer;
            &:hover{
                border-color: #5e91ff;
            }
            img{
                height: auto;
                width: auto;
                margin: auto;
                max-height: 100%;
                max-width: 100%;
                object-fit: contain;
            }
        }
    }
    

`

export default Video