import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useIntl } from "@umijs/max";
import { App, Flex, Modal, Upload } from "antd";
import { useState } from "react";
import BatchDeliveryUpload from "./BatchDeliveryUpload";
import { importShipmentTask } from "@/services/y2/apiShipment";
import { useSleep } from "@/hooks/customHooks";

{/* 模态框：批量发货 */}

function BatchDeliveryModal() {

    const [open, setOpen] = useState(false);

    const { message } = App.useApp();

    const intl = useIntl();

    const [loading, setLoading] = useState(false);

    const sleep = useSleep();

    const [file, setFile] = useState<File>();

    const [task,setTask] = useState({
        status:"",
        isBackstage:false,
        failed_count:0,
        success_count:0,
        total_count:0
    });

    // 上传并导入--轮询查询进度
    const handleOk = async () => {
        if(!file){
            message.error("请选择文件");
            return
        }
        // setLoading(true)
        await setTask({
            ...task,
            status:"done",
        })

        await sleep(3000)

        await setTask({
            ...task,
            status:"success",
        })

        // importShipmentTask({
        //     languages_id:"1",
        //     file:file,
        //     send_notify:false
        // }).then(async res=>{
        //     console.log(res)
            
        //     // let taskId = res.taskId
           
        //     // startPolling(taskId, (data) => {
        //     //     if (data.task_status === "completed" || data.task_status === "failed") {
        //     //         clearTimerId();
        //     //         if(productList.task.isBackstage){
        //     //             notification.success({
        //     //                 message: '导入商品已完成',
        //     //                 description: <div className='color-474F5E'>本次导入{data.total_count}个商品，成功{data.success_count}个，失败{data.failed_count}个，请刷新商品列表查看</div>,
        //     //             })
        //     //             productList.setTask({
        //     //                 status:"",
        //     //                 isBackstage:false,
        //     //             })
        //     //         }else{
        //     //             productList.setTask({
        //     //                 status:"success",
        //     //                 isBackstage:false,
        //     //                 failed_count: data.failed_count,
        //     //                 success_count: data.success_count,
        //     //                 total_count: data.total_count
        //     //             })
        //     //         }
        //     //     }else{
        //     //         productList.setTask({
        //     //             ...productList.task,
        //     //             status:"done",
        //     //         })
        //     //     }
        //     // });
        // }).catch(err=>{
        //     // message.error("上传失败，请重试")
        // }).finally(()=>{
        //     setLoading(false)
        // })
    };

    const handleCancel = () => {
        setFile(undefined);
        setTask({
            status:"",
            isBackstage:false,
            failed_count:0,
            success_count:0,
            total_count:0
        })
        setOpen(false);
    };

    return(
        <>
            <DefaultButton onClick={()=>setOpen(true)} text={intl.formatMessage({ id: 'orders.orderList.index.batchDelivery' })} />
            <Modal
                title={intl.formatMessage({ id: 'orders.orderList.index.bulkDelivery' })}
                width={620}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                footer={()=>{

                    if(task.status === "success"){
                        return <Flex justify='end' align='center' gap={12}>
                        <DefaultButton text={intl.formatMessage({ id: 'orders.orderList.index.importRecord' })} onClick={handleCancel} />
                    </Flex>
                    }
                    return <Flex justify='end' align='center' gap={12}>
                        <DefaultButton text={intl.formatMessage({ id: 'orders.orderList.index.cancel' })} onClick={handleCancel} />
                        <PrimaryButton text={intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' })} onClick={() => handleOk()} />
                    </Flex>
                }}
            >
                <>
                    <div style={{margin:"8px 0px"}}>
                        请先下载<a href='/templateFile/template_product_matacart.csv' download={'template_product_matacart.csv'}>批量导入模版</a>，并按导入模版规范填写订单相关信息，再在本页导入表格，以更新订单包裹的发货状态。
                    </div>
                    <BatchDeliveryUpload size={40} file={file} setFile={setFile} task={task} />
                    <div style={{margin:"8px 0px 12px 0px"}}>支持 .xlsx,.xls 格式文件，大小不能超过40M</div>
                    <div>每次最多上传1000行数据。</div>
                </>
            </Modal>
        </>
        
    )
}


export default BatchDeliveryModal;
        