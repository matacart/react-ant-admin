import { InboxOutlined, PlusOutlined } from "@ant-design/icons"
import { Flex, message, Upload, UploadProps } from "antd";
import { useState } from "react";
import styled from "styled-components"
import DefaultButton from "../Button/DefaultButton";
import { getTaskStatus, importProductTask } from "@/services/y2/api";

// 文件上传--拖拽
 const { Dragger } = Upload;
// 批量导入
export default function UploadImportDrag({size,file,setFile,status,setStatus}:{size:number,file:any,setFile:any,status?:any,setStatus?:any}){

  // 手动上传
  const beforeUpload = (file:any) => {
    if(file.type=="text/csv" || file.type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type=="application/vnd.ms-excel"){
      // 类型 大小
      if(file.size/1024/1024 > size){
        message.error("文件大小不能超过"+size+"M")
        return false;
      }
      setFile(file)
      setStatus(null)
      return false;
    }else{
      message.error("请上传.xlsx，.xls，.csv 格式文件")
      return false
    }
  }
  
    return(
        <Scoped>
            {/* file */}
              {file?
              <div className="file-item-warp">
                  {status && <div className="progress" style={{width: status.progress+"%"}}></div>}
                  <Flex className="file-item" justify="space-between">
                  <Flex className="file-info" align="center">
                    <img src="/img/file.png" />
                    <div className="filename">
                      <div>{file.name}</div>
                      {status?.status=="success" && <>
                        <div className="font-12" style={{marginTop: "8px"}}>本次导入<span> 1 </span>个SKU，导入成功：<span>0</span>，导入失败：<span className="color-F86140">1</span></div>
                        <div className="font-12 color-356DFF font-w-600 cursor-pointer" style={{marginTop: "8px"}}>查看失败原因</div>
                      </>}
                      {status?.status=="done" && <div className="font-12 color-474F5E">{status.progress+"%"} 导入中...</div>}
                    </div>
                  </Flex>
                  {status?.status=="done"?<></>:<Upload maxCount={1} showUploadList={false} beforeUpload={beforeUpload}>
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
      min-height: 88px;
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
          .filename{
          }
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