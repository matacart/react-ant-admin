import { Badge, Card, Flex, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useMemo, useState } from 'react';
import { InboxOutlined, LoadingOutlined, PlusOutlined, SearchOutlined, ShopOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message, Upload, Image } from 'antd';
import styled from 'styled-components';
import { values } from "lodash";
import axios from "axios";
import UploadCard from "./UploadLargeCard";
import newStore from "@/store/newStore";
const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ProductImgCard() {

  // youtubeUrl
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const [addUrlModalOpen, setAddUrlModalOpen] = useState(false)
  const [addImgModalOpen, setAddImgModalOpen] = useState(false)
  const [form] = Form.useForm();



// ##################### 添加多媒体文件 ###############################

  // 从文件库中选择
  const [fileLibrary, setFileLibrary] = useState<any>([]);

  // Modal被选中的图片列表
  const [tempSelectedImg, setSelectedImg] = useState<any>([]);

  // 文件库
  const getImgList = () => {
    axios.post('/api/cloudImgList').then((req: any) => {
      console.log(req.data)
      setFileLibrary(req.data);
    })
  }

  // Modal 中选中顺序
  const getTempSelectedImgIndex = (img: any) => {
    return tempSelectedImg.indexOf(img);
  }
  // 是否已被之前选中
  const isBeforeSelected = (img: any) => {
    return newStore.isIncludeSelectedImgList(img);
  }
  // 是否现在被选中
  const isCurrentSelected = (img: any) => {
    return tempSelectedImg.indexOf(img) > -1
  }
  // 图片选中
  const imgClass = (img: any) => {
    if (isBeforeSelected(img)) {
      return "img-selected-band";
    } else if (isCurrentSelected(img)) {
      return "img-selected img-mask"
    } else {
      return "img-mask"
    }
  }


// ###########   图片上传  ######################

  const { Dragger } = Upload;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
    console.log(newFileList);
    setFileList(newFileList);
    newStore.setSelectedImgList(newFileList);
  }


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const props: UploadProps = {
    name: 'file',
    listType: "picture-card",
    fileList: fileList,
    showUploadList: false,
    multiple: true,
    action: '/api/ApiAppstore/doUploadPic',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        newStore.addSelectedImgList(response?.fileUrl)
        console.log('llllllllllllllll' +
          '    id:' +
          response?.fileId,
          '    name:' + response?.fileName,
          '     url:' + response?.fileUrl);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }


    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };



  return (
    <Scoped>
      <Card title="商品图片/视频" className="product-img-card"
        extra={<>
          <a onClick={() => {
            setAddUrlModalOpen(true);
          }}>添加URL</a>
          <a style={{
            marginLeft: 20
          }}
            onClick={() => {
              setAddImgModalOpen(true);
              getImgList();
            }}
          >添加多媒体图片</a>
        </>}
      >
        <div className="content" style={{
          display: "flex",
          height: "auto",
        }}>
          {/* 图片展示 */}
          {/* {
            newStore.getSelectedImgList()?.map((img: any, index: any) => {
              let tempSelectedImgIndex = tempSelectedImg.indexOf(img);
             return (
                <div style={{
                  height: 150,
                  width: 128,
                  borderRadius: 8,
                  overflow: "hidden"
                }}>
                  <img
                    style={{
                      height: 128,
                      width: 128,
                      overflow: 'hidden',
                      objectFit: "contain",
                      background: "rgb(247, 248, 251)",
                      cursor: "default",
                    }}
                    src={img?.fileUrl} key={img?.fileId} />
                </div>)
            })
          } */}
          <Upload
            action="/appstore/ApiAppstore/doUploadPic"
            listType="picture-card"
            multiple={true}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}


        </div>
        {/* 图片上传-外 */}
        {/* <Dragger {...props} height={200} >
          <PlusOutlined style={{
            fontSize: 30,
            color: "#929292"
          }} />
          <p className="ant-upload-text">添加图片（或把图片拖到框内）</p>
        </Dragger>

        <UploadTipDesc>
          支持上传jpg、png、webp、SVG格式图片，最大限制为10M（4M为最佳店铺浏览体验）；支持上传GIF格式动图，最大限制8M
        </UploadTipDesc> */}

        {/* 添加url Modal */}
        <Modal
          title="YouTube视频"
          centered
          width="90vw"

          open={addUrlModalOpen}
          onOk={() => setAddUrlModalOpen(false)}
          onCancel={() => setAddUrlModalOpen(false)}
          styles={{
            body: {
              height: "120px",
            }
          }}
          style={{
            maxWidth: "860px"
          }}
        >
          <Form layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label={<div style={{ fontWeight: 500, fontSize: "14px" }}>复制 YouTube 视频URL到下面输入框</div>}
              name='youTubeUrl'
              rules={[{
                validator: (rule, value) => {
                  // 校验逻辑保持不变  
                  const regexYouTube = /^https?:\/\/(?:www\.)?youtu(be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9_-]{11})(?:&|#|\?)*$/;
                  if (!regexYouTube.test(value)) {
                    return Promise.reject(new Error('请输入正确的YouTube视频链接！'));
                  }
                  return Promise.resolve();
                }
              }]}
            >
              <Input />
            </Form.Item>
            <div style={{
              color: "rgb(122, 132, 153)"
            }}>目前只支持YouTube视频</div>
          </Form>

        </Modal>

        {/* 添加多媒体图片 Modal */}
        <Modal
          width="90vw" style={{ maxWidth: "860px" }}
          styles={{
            body: {
              height: "700px",
              padding: 0
            }
          }}
          centered
          title='从文件库中选择'
          open={addImgModalOpen}
          onOk={() => {
            setAddImgModalOpen(false)
            newStore.setSelectedImgList([...newStore.getSelectedImgList(), ...tempSelectedImg]);
            tempSelectedImg.length = 0;
          }}
          onCancel={() => setAddImgModalOpen(false)}
        >
          {/* 图片搜索 */}
          <div className="img-modal-header" style={{
            display: "flex",
            alignContent: "center",
            marginTop: '20px',
            marginBottom: '8px'
          }}>
            <Input
              placeholder="搜索文件名/文件格式"
              prefix={<SearchOutlined style={{ color: "rgba(0,0,0,0.25" }} />}
              style={{
                height: "36px",
                width: "300px",
                marginRight: "20px"
              }}

            />

            <Select
              placeholder="文件类型"
              style={{ width: 120, height: 36 }}
              // onChange={}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </div>
          {/* 图片列表wrap */}
          <div className="content" style={{ display: "flex", flexWrap: "wrap", gap: "8px"
          }}>
            {/* 列表 */}
            <div>
              {/* 上传 */}
              <div>

              </div>
              {/* 图片 */}
              <div>

              </div>
            </div>
            {/* 分页 */}
            <div></div>

          </div>
        </Modal>

      </Card>
    </Scoped>

  )
}


const UploadTipDesc = styled.div`
  margin-top: 12px;
  margin-bottom: 0;
  color: #7a8499;
`

const Scoped = styled.div`



.product-img-card{
  .ant-card-head-title{
      font-weight: 400;
  }
}

.content{
  height:40px;
}
.footer{

}


`
const Mask = styled.div`
.img-mask{
  position:absolute;
  border-radius:6px;
  height: 128px;
  width: 128px;
  z-index: 20;
  &:hover{
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.img-selected{

  border: 3px solid rgba(0, 132, 255, 0.5);
}
.img-selected-band{
  background-color: rgb(184, 14, 14);
} 
`
