import { PlusOutlined } from "@ant-design/icons"
import { Flex, message, Upload, UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import DefaultButton from "@/components/Button/DefaultButton";
import { observer } from "mobx-react-lite";
import { CompressedFileIcon } from "@/components/Icons/Icons";

// 文件上传--拖拽
 const { Dragger } = Upload;
// 批量导入
const UploadCompressedFile = ({size,file,setFile,status}:{size:number,file:any,setFile:any,status:string})=>{

  // 使用 useRef 存储定时器
  const timerRef = useRef<NodeJS.Timeout>()
  // 虚拟进度条
  const [progress,setProgress] = useState(0);

  // 手动上传
  const beforeUpload = (file:any) => {
    console.log(file)
    if(file.type=="application/zip" || file.type=="application/x-zip-compressed"){
      // 类型 大小
      if(file.size/1024/1024 > size){
        message.error("文件大小不能超过"+size+"M")
        return false;
      }
      setFile(file)
      return false;
    }else{
      message.error("请上传.zip 格式文件")
      return false
    }
  }

  useEffect(()=>{
    if (status === "inProgress") {
      timerRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 95 : prev + 5))
      }, 50)
    } else {
      setProgress(0)
    }
    return () => {
      clearInterval(timerRef.current) // 清理上一次 effect 的定时器
    }
  },[status])
  
  return(
      <Scoped>
          {/* file */}
            {file?
            <div className="file-item-warp">
                {<div className="progress" style={{width: progress+"%"}}></div>}
                <Flex className="file-item" justify="space-between" align="center">
                  <Flex className="file-info" align="center">
                      <CompressedFileIcon className="font-24" />
                      <span>{file.name}</span>
                  </Flex>
                  {<Upload maxCount={1} showUploadList={false} beforeUpload={beforeUpload}>
                      <DefaultButton text="替换文件" />
                  </Upload>}
                  {/*  */}
                  </Flex>
            </div>
            :<Dragger maxCount={1} showUploadList={false} beforeUpload={beforeUpload}>
              <p className="ant-upload-drag-icon">
                <PlusOutlined className="icon" />
              </p>
              <p className="ant-upload-text">上传文件（或拖放上传）</p>
          </Dragger>}
      </Scoped>
  )
}

export default UploadCompressedFile

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
    .file-item-warp{
      position: relative;
      /* min-height: 88px; */
      overflow: hidden;
      border-radius: 4px;
      background-color: #f7f7f8;
      .file-item{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 20px 24px;
        border-radius: 4px;
        .file-info{
          gap:20px;
        }
      }

      .progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        -webkit-transition: 0.3s linear width;
        transition: 0.3s linear width;
        background-color: #e2f0ff;
      }
    }
`