import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import { deleteSocialPicture, uploadSocialPicture } from "@/services/y2/api";
import preferences from "@/store/channel/preferences/preferences";
import { DeleteOutlined, ExclamationCircleFilled, LoadingOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, GetProp, message, Tooltip, Upload, UploadProps} from "antd";
import modal from "antd/es/modal";
import { useEffect, useState } from "react";
import styled from "styled-components";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function SocialSharingPicturesCard() {

    const [loading, setLoading] = useState(false);

    const [coverImg,setCoverImg] = useState("");

    const [isMaskVisible, setIsMaskVisible] = useState(false);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>添加图片</div>
        </button>
    );

    // 图片上传
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
          message.error('You can only upload jpg/png file!');
          return false;
        }
        // 图片大小无限制
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   message.error('Image must smaller than 2MB!');
        // }
        // let formData = new FormData()
        // formData.append("social_image", file)
        // setLoading(true)
        uploadSocialPicture({
            social_image:file,
        }).then((res) => {
            if(res.code == 0){
                setCoverImg(res.data.picture_url)
            }else{
                message.error(res.msg)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
        return false;
    };

    useEffect(()=>{
        setCoverImg(preferences.socialPicture)
    },[])

    

    return (
        <Scoped>
            <Card>
                <Flex align="center">
                    <div className="font-16 font-w-600">图片上传</div>
                    <Tooltip title="支持.gif、.pjp、.jpg、.pipeg、.jpeg、.jfif、.png、.bmp、.webp、.svg格式。">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </Flex>
                <div className="color-7A8499 font-12 img-size">建议尺寸：1200 x 628</div>
                <Flex className="upload-warp">
                    <div className="img-box">
                        {coverImg == "" ?<Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                            >
                                {uploadButton}
                            </Upload>:<div className="image-container" onMouseEnter={()=>setIsMaskVisible(true)} onMouseLeave={()=>setIsMaskVisible(false)}>
                            <img src={coverImg ? `${coverImg}?x-oss-process=image/resize,w_1200` : ""} style={{width:"100%"}}/>
                            {isMaskVisible && (
                                <div className="mask">
                                    <div className="delete-icon" onClick={(e)=>{
                                        e.stopPropagation()
                                        const confirm = modal.confirm({
                                            title: '确认要删除图片吗？',
                                            icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
                                            content: '删除后将不再使用。',
                                            centered:true,
                                            footer:()=>(
                                                <>
                                                    <Flex justify="flex-end" gap="12px">
                                                        <DefaultButton text="取消" loading={loading} onClick={()=>confirm.destroy()} />
                                                        <DangerButton text="确认" loading={loading} onClick={()=>{
                                                            setLoading(true)
                                                            deleteSocialPicture().then((res) => {
                                                                if(res.code == 0){
                                                                    setCoverImg("")
                                                                    confirm.destroy()
                                                                }else{
                                                                    message.error(res.msg)
                                                                }
                                                            }).catch((err) => {
                                                                console.log(err)
                                                            }).finally(() => {
                                                                setLoading(false)
                                                            })
                                                        }} />
                                                    </Flex>
                                                </>
                                            )
                                        });
                                    }}>
                                        <DeleteOutlined className="font-16" style={{opacity:0.6}} />
                                    </div>
                                </div>
                            )}
                        </div>}
                    </div>
                    <Flex vertical justify="space-between" className="img-text color-474F5E">
                        <div className="font-16 font-w-600">页面标题</div>
                        <div>https://www.demo.matacard.com</div>
                        <div>元描述</div>
                    </Flex>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default SocialSharingPicturesCard

const Scoped = styled.div`
    margin-bottom: 20px;
    .img-size{
        margin:8px 0 12px 0 ;
    }
    .upload-warp{

        background-color: #F7F8FB;
        .img-box{
            margin-right: 20px;
            .ant-upload{
                width: 200px;
                height: 100px;
                /* width: 100% !important; */
                /* height: 230px !important; */
                /* border: 2px dashed #d9d9d9 !important; */
            }
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
                height: 100px;
                width: 200px;
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

        .img-text{
            padding: 12px 0;
        }
    }
`
