import { ArrowLeftOutlined, ExportOutlined, InboxOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Input, List, Modal, TabsProps, Upload, UploadProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useState } from "react";


const { Dragger } = Upload;

function Redirection() {

    const [openAdd, setOpenAdd] = useState(false);
    const [openImport, setOpenImport] = useState(false);

    const addRedirection = ()=>{
        setOpenAdd(true)
    }

    const importRedirection = ()=>{
        setOpenImport(true)
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
    };

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/domain")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">301重定向</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div className='create-content'>
                                    <div className='create-content-flex'>
                                        <img src="/img/blank/redirectionBlank.svg"></img>
                                        <h3>管理重定向</h3>
                                        <div style={{maxWidth:"540px",textAlign:"center"}}>当顾客或搜索引擎向您所设定的网址发出浏览请求时，将会转到您设定的页面。只有失效链接需要被重定向。</div>
                                        <div>
                                            <Button style={{height:"42px",width:"112px"}} onClick={importRedirection}>导入重定向</Button>
                                            <Button style={{marginLeft:"20px",height:"42px",width:"112px"}} type="primary" onClick={addRedirection}>添加重定向</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    {/* 添加重定向 */}
                    <AddModal
                        title="添加重定向地址"
                        open={openAdd}
                        centered
                        onOk={()=>{}}
                        onCancel={()=>setOpenAdd(false)}
                        okText="添加"
                        cancelText="取消"
                    >
                        <div style={{marginTop:"20px"}}>
                            <div>重定向自</div>
                            <div style={{marginTop:"8px"}}>
                                <Input prefix="https://66666.demo.hdyshop.cn" placeholder="/from-url" />
                            </div>
                        </div>
                        <div style={{marginTop:"20px",marginBottom:20}}>
                            <div>重定向至</div>
                            <div style={{marginTop:"8px"}}>
                                <Input placeholder="请输入或粘贴链接" />
                            </div>
                        </div>
                    </AddModal>
                    {/* 导入重定向 */}
                    <ImportModal title="导入重定向"
                        open={openImport}
                        width={620}
                        centered
                        onOk={()=>{}}
                        onCancel={()=>setOpenImport(false)}
                        okText="上传"
                        cancelText="取消"
                    >
                        <div className="color-474F5E">请下载<a style={{margin:"0 2px"}}>批量导入模版</a>并按规范填写重定向信息。</div>
                        <div style={{margin:"10px 0"}}>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">上传文件（或拖拽上传）</p>
                                {/* <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                                </p> */}
                            </Dragger>
                        </div>
                        <div className="color-7A8499">支持CSV文件，大小不能超过10M</div>
                    </ImportModal>
                </div>
            </div>
        </Scoped>
    )
}

export default Redirection

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
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
                    /* display: flex; */
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
            gap:20px;
            .create-content{
                position: relative;
                top: -10px;
                padding: 5px 24px;
                border-radius: 6px;
                width: 100%;
                height: 500px;
                background-color: white;
                .create-content-flex{
                    margin: 60px 0px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    h3{
                        font-weight: 600;
                    }
                    div:nth-child(3){
                        margin-top: 12px;
                        font-size: 14px;
                    }
                    div:nth-child(4){
                        margin-top: 32px;
                        // font-size: 14px;
                    }
                }
            }
        }
      
    }
}
`

const AddModal = styled(Modal)`
`
const ImportModal = styled(Modal)`
`