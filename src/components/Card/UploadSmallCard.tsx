import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, UploadProps } from "antd";
import styled from "styled-components";


const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    showUploadList:false,
    onChange(info) {
        const { status } = info.file
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    }
}

export default function UploadCard() {


    return (
        <Scoped>
            <Dragger {...props} 
            height={150}
            
            style={{
                width:128, 
            }}
            >
                    <PlusOutlined style={{
                        fontSize: 30,
                        
                    }}/>
                    <div>上传文件</div>
            </Dragger>
        </Scoped>
    )
}


const Scoped = styled.div`
`