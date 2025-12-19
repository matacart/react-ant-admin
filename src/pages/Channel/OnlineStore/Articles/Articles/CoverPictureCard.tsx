import { AddIcon } from "@/components/Icons/Icons";
import DocumentLibrary from "@/pages/Components/DocumentLibrary";
import documentLibrary from "@/store/components/documentLibrary";
import { Card, Flex, Modal, Upload } from "antd"
import { useState } from "react";
import styled from "styled-components"
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import modal from "antd/es/modal";
import articles from "@/store/channel/articles/articles";

export default function CoverPictureCard(){

    const [addImgModalOpen, setAddImgModalOpen] = useState(false)

    const [selectFileCount,setSelectFileCount] = useState(0);

    const [coverImg,setCoverImg] = useState("");

    const [isMaskVisible, setIsMaskVisible] = useState(false);

      // 从文件库添加文件
    const addFileLibrary = (items:any)=>{
      
    }

    return (
        <Scoped>
            <Card className="card">
                <div className="title font-w-600 font-16">封面图片</div>
                <div className="tip font-12 color-7A8499">支持上传jpg、png、GIF格式的图片；最大限制4M</div>
                <div className="img-box">
                    {coverImg == "" ?<Flex onClick={()=>setAddImgModalOpen(true)} className="img color-474F5E cursor-pointer" justify="center" align="center" vertical={true}>
                        <div>
                            <AddIcon className="font-24" />
                        </div>
                        <div>添加图片</div>
                    </Flex>:<div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                        <img src={coverImg} style={{width:"100%"}}/>
                        {isMaskVisible && (
                            <div className="mask">
                                <div className="delete-icon" onClick={(e)=>{
                                    e.stopPropagation()
                                    modal.confirm({
                                        title: '确定要删除吗？',
                                        icon: <ExclamationCircleOutlined />,
                                        content: '删除后不可恢复。',
                                        centered:true,
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk:()=>{
                                            setCoverImg("")
                                        }
                                    });
                                }}>
                                    <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                                </div>
                            </div>
                        )}
                    </div>}
                </div>
            </Card>
            {/* 添加多媒体图片 Modal */}
            <Modal
                width="90vw" style={{ maxWidth: "860px" }}
                styles={{
                    body: {
                    height: "710px",
                    padding: 0
                    }
                }}
                destroyOnClose
                centered
                title='从文件库中选择'
                open={addImgModalOpen}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                    <Flex justify="space-between">
                        <div style={{lineHeight:"32px"}}>已选<span style={{margin:"0 4px"}}>{selectFileCount}</span>个文件</div>
                        <div>
                        <CancelBtn />
                        <span style={{ margin: "0 6px" }}></span>
                        <OkBtn />
                        </div>
                    </Flex>
                    </>
                )}
                onOk={() => {
                    // console.log(documentLibrary.selectFileList[0].url)
                    setCoverImg(documentLibrary.selectFileList[0].url)
                    articles.setArticles({
                        ...articles.articles,
                        image: documentLibrary.selectFileList[0].url
                    })
                    setAddImgModalOpen(false)
                    setSelectFileCount(0)
                    documentLibrary.clear()
                }}
                onCancel={() => {
                    setAddImgModalOpen(false);
                    setSelectFileCount(0)
                    documentLibrary.clear()
                }}
                >
                    <DocumentLibrary />
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    .card{
        .title{
            margin-bottom: 16px;
        }
        .tip{
            margin-bottom: 12px;
        }
        .img-box{
            .img{
                width: 100%;
                height: 100px;
                border-radius: 4px;
                border: 1px dashed #d7dbe7;
            }
            .img:hover{
                color:#356DFF;
                border: 1px dashed #356DFF;
            }
            .image-container {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100px;
                border: 1px solid #eef1f6;
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .mask{
                    position: absolute;
                    z-index: 99;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    /* opacity: 0; */
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: opacity 0.3s ease;
                }

                .image-container:hover.mask {
                    opacity: 1;
                }

                .delete-icon {
                    color: white;
                    font-size: 16px;
                    width: 40px;
                    height: 40px;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 50%;
                    /* opacity: 0.8; */
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    cursor: pointer;
                }
            }
        }
    }
`