import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import { DownloadIcon, ExportIcon, SuccessIcon } from "@/components/Icons/Icons"
import { importProductTask } from "@/services/y2/api"
import { Modal, Flex, Checkbox, App } from "antd"
import { useEffect, useRef, useState } from "react"
import ProductUploadImport from "./ProductUploadImport"
import productList from "@/store/product/productList"
import { clearTimerId, startPolling, stopPolling } from "./timerService"
import { observer } from "mobx-react-lite"
function ImportProductModal() {

    const { notification,message } = App.useApp();

    const [file, setFile] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const [loading, setLoading] = useState(false)

    const [coverHandle, setCoverHandle] = useState(false)

    // 上传并导入--轮询查询进度
    const UploadImport = (files:File)=>{
        setLoading(true)
        importProductTask(files,"product_import",coverHandle).then(async res=>{
            let taskId = res.taskId
            await productList.setTask({
                status:"done",
                isBackstage:false
            })
            startPolling(taskId, (data) => {
                if (data.task_status === "completed" || data.task_status === "failed") {
                    clearTimerId();
                    if(productList.task.isBackstage){
                        notification.success({
                            message: '导入商品已完成',
                            description: <div className='color-474F5E'>本次导入{data.total_count}个商品，成功{data.success_count}个，失败{data.failed_count}个，请刷新商品列表查看</div>,
                        })
                        productList.setTask({
                            status:"",
                            isBackstage:false,
                        })
                    }else{
                        productList.setTask({
                            status:"success",
                            isBackstage:false,
                            failed_count: data.failed_count,
                            success_count: data.success_count,
                            total_count: data.total_count
                        })
                    }
                }else{
                    productList.setTask({
                        ...productList.task,
                        status:"done",
                    })
                }
            });
        }).catch(err=>{
            message.error("上传失败，请重试")
        }).finally(()=>{
            setLoading(false)
        })
    }

    const closeModal = ()=>{
        clearTimerId();
        setIsOpen(false)
        // 清空
        productList.setTask({
            status:"",
            isBackstage:false
        })
        setFile(null)
    }
    return (<>
        <a onClick={()=>setIsOpen(true)}>本地导入</a>
        <Modal open={isOpen} width={620} title="导入商品" destroyOnClose={true} centered onCancel={closeModal}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <Flex justify='space-between' align='center'>
                  <div>
                    <a>常见问题 <ExportIcon className='font-14' /></a>
                  </div>
                  {productList.task?.status == "success"?(
                    <Flex gap={12}>
                        <DefaultButton text={"完成"} onClick={closeModal} />
                    </Flex>
                  ):productList.task?.status == "done"?(
                    <Flex gap={12}>
                        <DefaultButton text={"后台运行"} onClick={()=>{
                            productList.setTask({
                                status:"done",
                                isBackstage:true
                            })
                            setFile(null)
                            setIsOpen(false)
                        }} />
                        <PrimaryButton text={"导入中"} loading={true} />
                    </Flex>
                  ):(
                    <Flex gap={12}>
                        <DefaultButton text={"取消"} onClick={closeModal} />
                        <PrimaryButton loading={loading} text={"上传并导入"} onClick={() => { file && UploadImport(file) }} />
                    </Flex>
                  )}
              </Flex>
              </>
            )}
          >
            <div style={{padding:"10px 0px"}}>
              <div style={{margin:"8px 0px"}}>
                {productList.task?.status=="done"?
                    <>正在将商品导入商店，完成此过程可能需要一段时间</>
                :productList.task?.status=="success"?
                    <Flex align="center" gap={4}><SuccessIcon className="color-08AB70 font-20" />导入完成，你可以在商品列表中查看成功导入的商品</Flex>
                :<>
                    请<a href='/templateFile/template_product_matacart.csv' download={'template_product_matacart.csv'}>下载模板<DownloadIcon /></a>并按规范填写商品信息，若表格出现乱码，可查看<a>如何解决 <ExportIcon className='font-14' /> </a>
                </>}
              </div>
                <div>
                    <ProductUploadImport size={40} file={file} setFile={setFile} />
                </div>
                <div style={{margin:"8px 0px"}}>支持 .xlsx，.xls，.csv 格式文件，大小不能超过40M</div>
                <div style={{margin:"8px 0px"}}>
                    <Checkbox checked={coverHandle} disabled={productList.task?.status=="done"?true:false} onChange={(e)=>{
                        setCoverHandle(e.target.checked)
                    }}>覆盖相同v_products_model商品（表格无v_products_model列将会新增商品）</Checkbox>
                    {coverHandle && <Checkbox disabled={productList.task.status=="done"?true:false} style={{marginTop:"8px",marginLeft:"24px"}}>忽略空白字段 （未勾选时清除原有数据）</Checkbox>}
                </div>
            </div>
        </Modal>
    </>
        
    )

}

export default observer(ImportProductModal)
{/* 本地导入 */}
