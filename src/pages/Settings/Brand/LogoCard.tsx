import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, GetProp, message, Upload, UploadProps } from "antd"
import { useState } from "react";
import styled from "styled-components"


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function LogoCard() {

    const [loading, setLoading] = useState(false);

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

  return (
    <Scoped>
        <Card>
            <div className="color-242833 font-16 font-w-600">Logo</div>
            <div className="logo-box">
                <div>默认Logo</div>
                <div className="color-474F5E">上传后，将用于在线商店的展示</div>
                <Flex className="logo-img">
                    <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={()=>{}}
                    >
                        {uploadButton}
                    </Upload>
                    </div>
                    <div className="logo-img-info">
                        <div>支持PNG或JPG格式</div>
                        <div>图片最大限制10MB</div>
                        <div>推荐宽度：至少220像素</div>
                    </div>
                </Flex>
            </div>
            <div className="logo-box">
                <div>方形<span>Logo</span></div>
                <div className="color-474F5E">某些社交媒体渠道要求提供此内容，可能会被裁剪为圆形</div>
                <Flex className="logo-img">
                    <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={()=>{}}
                    >
                        {uploadButton}
                    </Upload>
                    </div>
                    <div className="logo-img-info">
                        <div>支持PNG或JPG格式</div>
                        <div>图片最大限制10MB</div>
                        <div>推荐大小：至少220x220像素</div>
                    </div>
                </Flex>
            </div>
        </Card>
    </Scoped>
  )
}

const Scoped = styled.div`
    .logo-box{
        margin-top: 20px;
        .logo-img{
            margin-top: 12px;
            .logo-img-info{
                margin-left: 20px;
                color: #7A8499;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
    }
`