import { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetIntl } from '../../locales/utils';
import './UploadImg.scss';

const { Dragger } = Upload;

/**
 * 上传触发后，将图片装换成 base64
 */
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

/**
 * @param {*} file
 * @returns
 */
const beforeUpload = file => {
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

const props = {
    name: 'file',
    multiple: true,
    action: '',
    accept: 'image/gif, image/jpeg, image/png, image/bmp, image/svg, image/svg+xml, image/jpg, image/webp',
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

/**
 * 图片上传
 * @param {{name: string, multiple: string}} props
 */
const UploadImg = ({ props }) => {
    const getIntl = useGetIntl();
    const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    // const handleChange = info => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         getBase64(info.file.originFileObj, url => {
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };

    const uploadButton = (
        <div style={{ height: 122, position: 'static' }}>
            <div
                style={{
                    position: 'relative',
                    top: '50%',
                    transform: 'translate(0, -50%)',
                }}
            >
                <div className="icon">
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                </div>
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    {getIntl.get('ProductNew_Dragger_Text')}
                </div>
            </div>
        </div>
    );
    return (
        <div className="image-show-uploader">
            <Dragger
                {...props}
                style={{ borderWidth: '1.6px', borderRadius: '4px' }}
            >
                {uploadButton}
            </Dragger>
            <p className="uploadTipDesc">
                {getIntl.get('ProductNew_uploadTipDesc')}
            </p>
        </div>
    );
};

export default UploadImg;
