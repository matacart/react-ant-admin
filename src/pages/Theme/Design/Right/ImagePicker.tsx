import DefaultButton from "@/components/Button/DefaultButton";
import MyButton from "@/components/Button/MyButton";
import { AddIcon } from "@/components/Icons/Icons";
import editor from "@/store/theme/editor";
import { Button, Flex, message, Spin, Upload, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

// function ImagePicker({image,setImage}:{image?:string,setImage:(value:string) => void}){

//     // const [imgae,setImage] = useState(componentsData[item.id]?.value || "");

//     // 更新图片
//     const update = (value:any) => {
//         setImage(value)
//         editor.updateComponentSettings(editor.component?.id,{
//             ...componentsData,
//             [item.id]: {value:value}
//         })
//     }

//     const props: UploadProps = {
//         name: 'file',
//         maxCount: 1,
//         showUploadList:false,
//         beforeUpload(info) {
            
//             update('/img/storeLogo.png')
//             console.log(info);

//             return false;
//         }
//     };

//     return (
//         <Scoped>
//             {image ? 
//                 <div className="preview">
//                     <Flex justify="center" className="image-box">
//                         <img className="img" src={image} alt="logo" />
//                     </Flex>
//                     <Flex gap={8} className="button-box">
//                         <MyButton style={{flex:1,height:"36px"}} text={"更换"} />
//                         <MyButton style={{flex:1,height:"36px"}} text={"删除"} onClick={() => update("")} />
//                     </Flex>
//                 </div>
//             : <Dragger {...props}>
//                 <div style={{padding:"12px 0"}}>
//                     <div>
//                         <AddIcon className="font-24" />
//                     </div>
//                     <div>添加图片</div>
//                 </div>
//             </Dragger>}
//         </Scoped>
//     )
// }

interface DataType{
    value:string,
    resource:any,
}

function ImagePicker({item,data,setData}:{item:any,data:DataType,setData:(item:any,value:DataType)=>void}){

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

    const props: UploadProps = {
        name: 'file',
        maxCount: 1,
        showUploadList:false,
        beforeUpload(info) {
            let formData = new FormData()
            formData.append("file", info)
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
                    <Flex className="button-box" gap={12}>
                        <div style={{width:"100%"}}>
                            <Upload {...props} style={{width:"100%"}}>
                                <MyButton style={{width:"100%",height:"36px"}} text={"更换"} />
                            </Upload>
                        </div>
                        <div style={{width:"100%"}}>
                            <MyButton style={{width:"100%",height:"36px"}} text={"删除"} onClick={delImage} />
                        </div>
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

export default ImagePicker;


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
        /* .ant-upload-wrapper{
            width: 100%;
        } */
    }
}
`