import { InboxOutlined, PlusOutlined } from "@ant-design/icons"
import { Flex, message, Upload, UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { getTaskStatus, importProductTask } from "@/services/y2/api";
import DefaultButton from "@/components/Button/DefaultButton";
import { useSleep } from "@/hooks/customHooks";
import productList from "@/store/product/productList";
import { observer } from "mobx-react-lite";

// 文件上传--拖拽
 const { Dragger } = Upload;
// 批量导入
const ProductUploadImport = ({size,file,setFile}:{size:number,file:any,setFile:any})=>{

  // 使用 useRef 存储定时器
  const timerRef = useRef<NodeJS.Timeout>()
  // 虚拟进度条
  const [progress,setProgress] = useState(0);

  const sleep = useSleep();

  // 手动上传
  const beforeUpload = (file:any) => {
    if(file.type=="text/csv" || file.type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type=="application/vnd.ms-excel"){
      // 类型 大小
      if(file.size/1024/1024 > size){
        message.error("文件大小不能超过"+size+"M")
        return false;
      }
      setFile(file)
      productList.setTask({
        status:"",
        isBackstage:false,
      })
      return false;
    }else{
      message.error("请上传.xlsx，.xls，.csv 格式文件")
      return false
    }
  }

  useEffect(()=>{
    if (productList.task.status === "done") {
      timerRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 95 : prev + 5))
      }, 100)
    } else {
      setProgress(0)
    }
    return () => {
      clearInterval(timerRef.current) // 清理上一次 effect 的定时器
    }
  },[productList.task.status])
  
    return(
        <Scoped>
            {/* file */}
              {file?
              <div className="file-item-warp">
                  {productList.task?.status=="done" && <div className="progress" style={{width: progress+"%"}}></div>}
                  <Flex className="file-item" justify="space-between">
                  <Flex className="file-info" align="center">
                    <img src="/img/file.png" />
                    <div className="filename">
                      <div>{file.name}</div>
                      {productList.task?.status=="success" && <>
                        <div className="font-12" style={{marginTop: "8px"}}>本次导入<span>{productList.task.total_count} </span>个SKU，导入成功：<span>{productList.task.success_count}</span>，导入失败：<span className="color-F86140">{productList.task.failed_count}</span></div>
                        {parseInt(productList.task.failed_count)>0 && <div className="font-12 color-356DFF font-w-600 cursor-pointer" style={{marginTop: "8px"}}>查看失败原因</div>}
                      </>}
                      {productList.task?.status=="done" && <div className="font-12 color-474F5E">{progress+"%"} 导入中...</div>}
                    </div>
                  </Flex>
                  {productList.task?.status=="done"?<></>:<Upload maxCount={1} showUploadList={false} beforeUpload={beforeUpload}>
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

export default observer(ProductUploadImport)

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