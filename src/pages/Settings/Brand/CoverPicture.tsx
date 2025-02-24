import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, GetProp, message, Upload, UploadProps } from "antd"
import { useState } from "react";
import styled from "styled-components"


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function CoverPicture() {

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
        <button style={{ border: 0, background: 'none'}} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

  return (
    <Scoped>
        <Card>
            <div className="color-242833">封面图片</div>
            <div className="color-474F5E">资料页和应用中呈现品牌特性的重要图片</div>
            <Flex className="cover-img">
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
                    <div>推荐大小：至少1920x822像素（21:9）</div>
                </div>
            </Flex>
        </Card>
    </Scoped>
  )
}

const Scoped = styled.div`
    margin-top: 20px;
    .cover-img{
        margin-top: 12px;
        .logo-img-info{
            margin-left: 20px;
            color: #7A8499;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        :where(.css-dev-only-do-not-override-no4izc).ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select{

            width: 220px;
        }
        .ant-upload .ant-upload-select{
        }
    }
`