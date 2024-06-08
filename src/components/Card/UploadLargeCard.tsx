import newStore from "@/store/newStore";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, UploadProps } from "antd";
import styled from "styled-components";


const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    multiple: true,
    action: '/api/ApiAppstore/doUploadPic',
    onChange(info) {
        const { status,response } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            newStore.addSelectedImgList(response?.fileUrl)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        console.log(response?.fileId,response?.fileName,response?.fileUrl);
        
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function UploadLargeCard() {


    return (
        <div>
            <div></div>
            <Dragger {...props}
                height={200}
            >
                <PlusOutlined style={{
                    fontSize: 30,
                    color: "#929292"

                }} />
                <p className="ant-upload-text">添加图片（或把图片拖到框内）</p>
            </Dragger>
        </div>
    )
}


const Scoped = styled.div`
    
`