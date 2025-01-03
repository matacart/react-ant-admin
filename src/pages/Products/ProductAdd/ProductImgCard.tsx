import { Badge, Button, Card, Flex, Form, Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useMemo, useState } from 'react';
import { InboxOutlined, LoadingOutlined, PlusOutlined, SearchOutlined, ShopOutlined, UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message, Upload, Image } from 'antd';
import styled from 'styled-components';
import { values } from "lodash";
import axios from "axios";
import newStore from "@/store/newStore";
import FileList from "../components/FileList";
import { observer } from "mobx-react-lite";
const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ProductImgCard() {


  const [loading,setLoading] = useState(false);
  // 视频弹窗加载
  const [videoLoading, setVideoLoading] = useState(false);
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

  let imageMap = new Map();
  // 图片集合

  useEffect(() => {
    let tempList = Array.from(newStore.getSelectedImgList(),(res,index)=>{
      return {
        uid:index,
        url:res,
      }
    })
    setFileList(tempList as any)
  }, [])

  const [selectFileCount,setSelectFileCount] = useState(0);

  useEffect(()=>{
    newStore.fileUpload.selectFileList.length>0?setSelectFileCount(newStore.fileUpload.selectFileList.length):null
  },[newStore.fileUpload.selectFileList])
  
  // 
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  // 上传
  // const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
  //   console.log(newFileList);
  //   // console.log(file);
  //   // console.log(newFileList);
  //   // formData.append('file', fileList);
  //   if(newFileList.length>0){
  //     for (let i = 0; i < newFileList.length; i++) {
  //       let formData = new FormData()
  //       formData.append(i.toString(), newFileList[i].originFileObj as FileType);
  //       axios.post('/api/ApiAppstore/doUploadPic', formData).then((req: any) => {
  //         console.log(req)
  //       })
  //     }
  //   }
  //   setFileList(newFileList); 
  //   // console.log(formData.get("file"))
  //   newStore.setSelectedImgList(newFileList);
  // }
  const handleChange = async (info: any) => {

    // console.log(info)
    // 删除
    if(info.file.status == "removed"){
      setFileList(info.fileList);
      newStore.temp.delete(info.file.uid)
      return
    }
    // 上传
    setLoading(true)
    let formData = new FormData()
    formData.append("1", info.file as FileType)
    axios.post('/api/ApiAppstore/doUploadPic',formData).then((req: any) => {
      if(req.data.code == 0){
        // uid --- src  
        message.success("上传成功", 1)
        setLoading(false)
        newStore.temp.set(info.file.uid, req.data.data.src)
      }else{
        message.error("上传失败", 1)
      }
    })
    // }else if(info.file.status == "removed"){
    //   newStore.temp.delete(info.file.uid)
    //   // 移除
    // }else if(info.file.status == "done"){
    //   // 失败
    // }else{
    //   // 其它
    // }
    setFileList(info.fileList);
  };

  // 从文件库添加文件
  const addFileLibrary = (items:any)=>{
    let newFileList = [...fileList];
    items.forEach((item:any)=>{
      newFileList.push({
        uid:item.id,
        name:item.id,
        status:"done",
        url:item.url
      })
      newStore.temp.set(item.id, item.url)
    })
    setFileList(newFileList);
  }


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const videoProps: UploadProps = {
    name: 'file',
    showUploadList:false,
    maxCount:1,
    headers: {
      authorization: 'authorization-text',
    },
    // 手动上传
    beforeUpload:(file)=>{
      setVideoLoading(true)
      if(file.type.slice(0,5)=="video"){
        // 上传
        let formData = new FormData()
        formData.append("1", file)
        axios.post('/api/ApiAppstore/doUploadVideo',formData).then((req: any) => {
          if(req.data.code == 0){
            form.setFieldValue('youTubeUrl', req.data.data.src)
            setVideoLoading(false);
          }else{
            setVideoLoading(false);
            message.error("上传失败", 1)
          }
        })
      }else{
        message.error("文件格式错误")
      }
      return false
    },
  };

  return (
    <Scoped>
      <Card title="商品图片/视频" className="product-img-card"
        extra={<>
          <a onClick={() => {
            setAddUrlModalOpen(true);
            // 表单
            form.setFieldValue("youTubeUrl",newStore.productVideo);
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
          <Spin spinning={loading}>
            <Upload
              listType="picture-card"
              beforeUpload={()=>{
                return false
              }}
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
          </Spin>
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
          onOk={() => {
            // 手动效验
            form.validateFields({validateOnly:true}).then((values) => {
              if(values.youTubeUrl){
                newStore.setProductVideo(values.youTubeUrl)
                setAddUrlModalOpen(false)
              }
            }).catch(error=>{
              console.log(1111)
            })
          }}
          onCancel={() => {
            form.resetFields()
            // form.setFieldValue("youTubeUrl", oldStore.productVideo)
            setAddUrlModalOpen(false)
          }}
          styles={{
            body: {
              height: "120px",
            }
          }}
          style={{
            maxWidth: "860px"
          }}
        >
          <Spin spinning={videoLoading}>
            <Form layout="vertical"
              form={form}
              clearOnDestroy
            >
              <Form.Item
                label={<div style={{ fontWeight: 500, fontSize: "14px" }}>复制 YouTube 视频URL到下面输入框</div>}
                name='youTubeUrl'
                rules={[{
                  validator: (rule, value,callback) => {
                    // 校验逻辑保持不变  
                    const regexYouTube = /^https?:\/\/(?:www\.)?youtu(be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9_-]{11})(?:&|#|\?)*$/;
                    // 本地视频
                    if("img1.s.handingcdn.com" == value.slice(2,23)){
                      return Promise.resolve();
                    }
                    if (!regexYouTube.test(value)) {
                      return Promise.reject('请输入正确的视频链接！');
                    }
                    return Promise.resolve();
                  }
                }]}
              >
                <Input defaultValue={newStore.productVideo} />
              </Form.Item>
              <div style={{
                color: "rgb(122, 132, 153)"
              }}>目前只支持YouTube视频和本地上传视频</div>
              <div style={{margin:"20px 0"}}>
                <Upload {...videoProps}>
                  <Button icon={<UploadOutlined />}>上传本地视频</Button>
                </Upload>
              </div>
            </Form>
          </Spin>
        </Modal>

        {/* 添加多媒体图片 Modal */}
        <Modal
          width="90vw" style={{ maxWidth: "860px" }}
          styles={{
            body: {
              height: "710px",
              padding: 0
            }
          }}
          destroyOnClose
          centered
          title='从文件库中选择'
          open={addImgModalOpen}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Flex justify="space-between">
                <div style={{lineHeight:"32px"}}>已选<span style={{margin:"0 4px"}}>{selectFileCount}</span>个文件</div>
                <div>
                  <CancelBtn />
                  <span style={{ margin: "0 6px" }}></span>
                  <OkBtn />
                </div>
              </Flex>
            </>
          )}
          onOk={() => {
            setAddImgModalOpen(false)
            // 从文件库中添加文件
            addFileLibrary(newStore.fileUpload.selectFileList)
            newStore.fileUpload.setSelectFileIndex({});
            newStore.fileUpload.setSelectFileList([]);
            setSelectFileCount(0)
          }}
          onCancel={() => {
            newStore.fileUpload.setSelectFileIndex({});
            newStore.fileUpload.setSelectFileList([]);
            setAddImgModalOpen(false);
            setSelectFileCount(0)
          }}
        >
          <FileList />
        </Modal>
      </Card>
    </Scoped>

  )
}


export default observer(ProductImgCard)


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
