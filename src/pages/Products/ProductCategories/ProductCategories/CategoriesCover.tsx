
import categories from "@/store/product/categories";
import { PlusOutlined } from "@ant-design/icons";
import { Card,Image, GetProp, Upload, UploadFile, UploadProps, Spin, message } from "antd"
import axios from "axios";
import { useState } from "react";
import styled from "styled-components"

 function CategoriesCover(){

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const [isUpload,setIsUpload] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        
    ]);

      const getBase64 = (file: FileType): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const handleChange: UploadProps['onChange'] = (info) => {
        // 删除
        if(info.file.status == "removed"){
            setFileList(info.fileList);
            categories.setCategoriesInfo({
                ...categories.categoriesInfo,
                category_image: ""
            })
            return
        }
        // 上传图片
        setIsUpload(true)
        let formData = new FormData()
        formData.append("1", info.file as FileType)
        axios.post('/api/ApiAppstore/doUploadPic',formData).then(res=>{
            if(res.data.code == 0){
                categories.setCategoriesInfo({
                    ...categories.categoriesInfo,
                    category_image: res.data.data.src
                })
            }
            setIsUpload(false)
        })
        setFileList(info.fileList);
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
      };
    
    const uploadButton= (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined style={{ fontSize: "20px" }} />
            <div style={{ marginTop: 8 }}><div>上传图片</div>(或把图片拖拽到框内)</div>
        </button>
    )

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">分类封面</span>
                </div>
                <div className="webUrl">
                    <Spin spinning={isUpload}>
                        {<>
                            <Upload
                                beforeUpload={()=>{
                                    return false
                                }}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                maxCount={1}
                                className="avatar-uploader"
                                onRemove={()=>{setPreviewOpen(false)}}
                            >
                                {fileList.length!==0?null:uploadButton}
                            </Upload>
                            {fileList.length == 0 && <div className="color-7A8499" style={{marginTop:"12px"}}>支持上传jpg、png、webp、SVG格式图片，最大限制4M；支持上传GIF格式动图，最大限制8M；</div>}
                        </>}
                        <Image
                            style={{width: '100%'}}
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    </Spin>
                </div>
            </Card>
        </Scoped>
    )
}
export default CategoriesCover

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
a{
    font-weight: 400;
}
.webUrl{
    font-size: 12px;
    span{
       .ant-upload{
            width: 100% !important;
            height: 230px !important;
            border: 1px dashed #d9d9d9 !important;
       }
       .ant-upload-list-item-container{
            width: 100% !important;
            height: 230px !important;
       }

    }
}
.webTitle{
    margin-top: 4px;
    margin-bottom: 0;
    color: #101aa4;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    -webkit-line-clamp: 2;
}
.webDesc{
    margin-top: 4px;
    margin-bottom: 0;
    color: #474f5e;
    font-size: 12px;
    -webkit-line-clamp: 3;
}`

