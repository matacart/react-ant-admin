import MyButton from "@/components/Button/MyButton";
import { AddIcon } from "@/components/Icons/Icons";
import { Flex, message, Spin, Upload, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

interface DataType{
    value:string,
    resource:any,
}

function FaviconPicker({item,data,setData}:{item:any,data:DataType,setData:(item:any,value:DataType)=>void}){

    const [loading,setLoading] = useState(false);

    // 默认数据
    const defaultData = item.default || undefined;

    const [imgData,setImgData] = useState(typeof data === 'object' ? data : defaultData);

    // 删除图片
    const delImage = () => {
        setImgData({
            value: "",
            resource: null
        })
        setData(item,{
            value: "",
            resource: null
        });
    }

    // 验证图片尺寸
    const validateImageSize = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width === 32 && img.height === 32) {
                        resolve(true);
                    } else {
                        message.error("图片尺寸必须为32 x 32");
                        resolve(false);
                    }
                };
                img.onerror = () => {
                    message.error("无法读取图片文件");
                    resolve(false);
                };
                img.src = e.target?.result as string;
            };
            reader.onerror = () => {
                message.error("无法读取图片文件");
                resolve(false);
            };
            reader.readAsDataURL(file);
        });
    };

    const props: UploadProps = {
        name: 'file',
        maxCount: 1,
        showUploadList:false,
        async beforeUpload(info) {
            if (info.type !== 'image/jpeg' && info.type !== 'image/png') {
                message.error('请上传JPEG 或 PNG图片');
                return false; // 阻止上传
            }
            // 验证图片尺寸为32px * 32px
            const isValidSize = await validateImageSize(info);
            if (!isValidSize) {
                return false; // 阻止上传
            }
            let formData = new FormData();
            formData.append("file", info);
            setLoading(true);
            axios.post('/api/ApiAppstore/doUploadPic',formData).then((res: any) => {
                if(res.data.code == 0){
                    setImgData({
                        value: res.data.data.src,
                        resource: {
                            name:info.name
                        }
                    })
                    setData(item,{
                        value: res.data.data.src,
                        resource: {
                            name:info.name
                        }
                    });
                }else{
                  message.error("上传失败", 1)
                }
            }).catch((err: any) => {
            
            }).finally(() => {
                setLoading(false);
            })
            return false;
        }
    };

    useMemo(()=>{
        setImgData(typeof data === 'object' ? data : defaultData);
    },[data])

    return (
        <Scoped>
            <Spin spinning={loading}>
            {imgData?.value ? 
                <div className="preview">
                    <Flex justify="center" className="image-box">
                        <img className="img" src={imgData.value} alt="logo" />
                    </Flex>
                    <Flex gap={8} className="button-box">
                        <Upload {...props} style={{width:"100%"}} >
                            <MyButton style={{width:"100%",height:"36px"}} text={"更换"} />
                        </Upload>
                        <MyButton style={{width:"100%",height:"36px"}} text={"删除"} onClick={delImage} />
                    </Flex>
                </div>
            : <div><Dragger {...props}>
                    <div style={{padding:"12px 0"}}>
                        <div>
                            <AddIcon className="font-24" />
                        </div>
                        <div>添加图片</div>
                    </div>
            </Dragger></div>}
            </Spin>
        </Scoped>
    )
}

export default FaviconPicker;


const Scoped = styled.div`

.preview{
    padding: 16px;
    background: #f7f8fb;
    border-radius: 4px;
    .image-box{
        img{
            object-fit: contain;
            height: 100px;
        }
    }
    .button-box{
        margin-top: 12px;
        .ant-upload-wrapper{
            width: 100%;
        }
    }
}
`