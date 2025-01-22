import { InboxOutlined, PlusOutlined } from "@ant-design/icons"
import { message, Upload, UploadProps } from "antd";
import styled from "styled-components"

// 文件上传--拖拽

const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


export default function UploadDrag(){ 
    return(
        <Scoped>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <PlusOutlined className="icon" />
                </p>
                <p className="ant-upload-text">上传文件（或拖放上传）</p>
            </Dragger>
        </Scoped>
    )
}

const Scoped = styled.div`
    .ant-upload-drag-icon{
        .icon{
            color: #474f5e !important;
            font-size: 32px !important;
        }
    }
    .ant-upload-text{
        color: #474f5e !important;
        font-size: 14px !important;
    }
    :where(.css-dev-only-do-not-override-no4izc).ant-upload-wrapper .ant-upload-drag{
        height: 150px;
    }

`