import DefaultButton from "@/components/Button/DefaultButton";
import MyButton from "@/components/Button/MyButton";
import { AddIcon } from "@/components/Icons/Icons";
import editor from "@/store/theme/editor";
import { Flex, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import styled from "styled-components";

function ImagePicker({image,setImage}:{image?:string,setImage:(value:string) => void}){

    // const [imgae,setImage] = useState(componentsData[item.id]?.value || "");

    // 更新图片
    const update = (value:any) => {
        setImage(value)
        editor.updateComponentSettings(editor.component?.id,{
            ...componentsData,
            [item.id]: {value:value}
        })
    }

    const props: UploadProps = {
        name: 'file',
        maxCount: 1,
        showUploadList:false,
        beforeUpload(info) {
            
            update('/img/storeLogo.png')
            console.log(info);

            return false;
        }
    };

    return (
        <Scoped>
            {image ? 
                <div className="preview">
                    <Flex justify="center" className="image-box">
                        <img className="img" src={image} alt="logo" />
                    </Flex>
                    <Flex gap={8} className="button-box">
                        <MyButton style={{flex:1,height:"36px"}} text={"更换"} />
                        <MyButton style={{flex:1,height:"36px"}} text={"删除"} onClick={() => update("")} />
                    </Flex>
                </div>
            : <Dragger {...props}>
                <div style={{padding:"12px 0"}}>
                    <div>
                        <AddIcon className="font-24" />
                    </div>
                    <div>添加图片</div>
                </div>
            </Dragger>}
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
        }
    }
`
// width: 100%;
//   height: 36px;
//   .ant-upload {
//     width: 100%;
//     height: 100%;
//   }
//   .ant-upload-select{
//     width: 100%;
//     height: 100%;
//   }