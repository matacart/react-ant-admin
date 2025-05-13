import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { ExportIcon, SuccessIcon } from "@/components/Icons/Icons"
import MyInput from "@/components/Input/MyInput";
import { exportProductTask, JobExecResult } from "@/services/y2/api";
import productList from "@/store/product/productList";
import { CheckCircleFilled, ExclamationCircleFilled, ExclamationCircleOutlined, ExportOutlined } from "@ant-design/icons";
import { Modal, Flex, Radio, Divider, Form, Input, notification, message, Typography } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { clearTimerId, startPolling } from "./timerService";
import { history } from "@umijs/max";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

const { Text,Link } = Typography;

const { confirm } = Modal;

function ExportProductModal(){

    const Ref = useRef(null)

    const [open,setOpen] = useState(false)

    const [exportDone,setExportDone] = useState(true)

    const [loading,setLoading] = useState(false)

    const [isEmail,setIsEmail] = useState(true)

    const [num,setNum] = useState<number>(0)   

    const [form] = Form.useForm();

    const submit = () => {
        form.validateFields().then(values=>{
            setLoading(true)
            let newRes = {}
            if(values.exportRange == 1){
                newRes = {
                    taskType:"product_export",
                    languages_id:productList.languagesId,
                    rangeType:values.exportRange,
                    email:values.email,
                }
            }else if(values.exportRange == 2){
                newRes = {
                    taskType:"product_export",
                    languages_id:productList.languagesId,
                    rangeType:values.exportRange,
                    email:values.email,
                    condition:JSON.stringify(productList.condition),
                }
            }else if(values.exportRange == 3){
                newRes = {
                    taskType:"product_export",
                    languages_id:productList.languagesId,
                    rangeType:values.exportRange,
                    productList:JSON.stringify(productList.productList || []),
                }
            }
            exportProductTask(newRes).then(async res=>{
                let taskId = res.taskId
                let confirmInstance:any;
                // 3 非邮件
                if(values.exportRange == 3){
                    await productList.setExportTask({
                        status:"done",
                        isBackstage:false
                    })
                    confirmInstance = confirm({
                        title: '产品导出正在进行',
                        icon: <ExclamationCircleFilled />,
                        content: '正在将商品导出，完成此过程可能需要一段时间',
                        centered: true,
                        footer: (
                            <Flex gap={12} justify='end' style={{marginTop:"20px"}}>
                                <DefaultButton text="后台运行" onClick={()=>{
                                    productList.setExportTask({
                                        status:"done",
                                        isBackstage:true
                                    })
                                    confirmInstance.destroy();
                                    notification.info({
                                        message: '后台正在导出商品数据',
                                        description: <div className='color-474F5E'>导出可能需要较长时间，请耐心等待，您亦可前往<Text underline className="color-356DFF cursor-pointer" onClick={()=>{
                                            history.push("/analyse/batch")
                                        }}><span>批量处理进度</span></Text>查看进度</div>,
                                    })
                                }} />
                                <PrimaryButton loading={true} text="正在导出" onClick={()=>{}}/>
                            </Flex>
                        )
                    });
                }else{
                    await productList.setExportTask({
                        status:"done",
                        isBackstage:true
                    })
                    message.open({
                        type: 'success',
                        content: '正在导出，请稍后查看邮件',
                    });
                }
                // let i = 0;
                startPolling(taskId, (data) => {
                    if (data.task_status === "completed" || data.task_status === "failed") {
                        clearTimerId();
                        confirmInstance?.destroy();
                        if(productList.exportTask.isBackstage){
                            //后台运行
                            notification.success({
                                message: '导出成功',
                                description: <div className='color-474F5E'>导出商品成功，请查看<Text underline className="color-356DFF cursor-pointer" onClick={()=>{
                                    history.push("/analyse/batch")
                                }}><span>批量处理进度</span></Text></div>,
                            })
                        }else{
                            const confirmCompleted = confirm({
                                title: '导出商品已完成',
                                icon: <CheckCircleFilled className="font-20" style={{color: '#52C41A'}} />,
                                centered: true,
                                footer: (
                                    <Flex gap={12} justify='end' style={{marginTop:"20px"}}>
                                        <DefaultButton text="我知道了" onClick={()=>{
                                            confirmCompleted.destroy();
                                        }} />
                                    </Flex>
                                )
                            })
                            JobExecResult(taskId).then(res=>{
                                // console.log(res)
                                // 转为blob对象
                                const blob = new Blob([res])
                                // 为blob创建URL
                                const csvUrl = URL.createObjectURL(blob);
                                // 创建a标签 触发浏览器触发下载
                                let link = document.createElement('a'); 
                                link.download = `product-export-`+new Date().getTime()+`.csv`; //文件名字 
                                link.href = csvUrl;
                                link.click();
                            }).catch(err=>{
                                console.log(err)
                            })
                        }
                        productList.setExportTask({
                            ...productList.exportTask,
                            status:"",
                        })
                    }else{
                        productList.setExportTask({
                            ...productList.exportTask,
                            status:"done",
                        })
                    }
                });
                
            }).catch(err=>{
                message.error("导出失败，请重试")
            }).finally(()=>{
                setOpen(false)
                setLoading(false)
                form.setFieldsValue({
                    exportRange:1,
                    email:""
                })
                setIsEmail(true)
            })
        }).catch(err=>{

        })
    }

    const cancel = ()=>{
        setOpen(false)
        form.setFieldsValue({
            exportRange:1,
            email:""
        })
        setIsEmail(true)
    }

    useMemo(()=>{
        setNum(productList.productList.length)
    },[productList.productList])

    useEffect(()=>{
        form.setFieldsValue({
            exportRange:1
        })
    },[])

    return(
        <Scoped ref={Ref}>
            <Flex className="cursor-pointer" onClick={()=>setOpen(true)}>
                <div style={{marginRight:"8px"}}><ExportOutlined /></div>
                <div>导出</div>
            </Flex>
            <Modal open={open} getContainer={()=>Ref.current!} width={620} title="导出商品" centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <Flex gap={12} justify='end'>
                        <DefaultButton text="取消" onClick={cancel} />
                        <PrimaryButton loading={loading} text="导出" onClick={submit} />
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" style={{minHeight:"280px"}}>
                    <div className='font-w-600' style={{margin:"20px 0px 8px"}}>导出范围</div>
                    <Form.Item name={"exportRange"}>
                        <Radio.Group
                            style={style}
                            onChange={(e)=>{
                                e.target.value == 3 ? setIsEmail(false):setIsEmail(true)
                            }}
                            options={[
                                { value: 1, label: '全部商品' },
                                { value: 3, label: num>0?'选中的商品（'+num+"项）":'选中的商品',disabled:num<=0 },
                                { value: 2, label: '全部筛选结果'+"（"+productList.count+"项）" }
                            ]}
                        />
                    </Form.Item>
                    <div style={{margin:"12px 0px"}}>表格出现乱码？请查看<a>如何解决 <ExportIcon className='font-14' /></a></div>
                    {isEmail?<>
                        <Divider />
                        <Form.Item label={<>导出到邮箱</>} required={false} name={"email"} style={{marginBottom:"30px"}} 
                            rules={[
                                {
                                    type: 'email',
                                    message: '请输入正确格式的邮箱',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                            ]}
                        >
                            <MyInput placeholder="example@mail.com" style={{width:"100%",height:"36px"}} />
                        </Form.Item>
                    </>:<></>}
                </Form>
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-left: 12px;
    .ant-form-item{
        margin-bottom: 0px;
    }
`

export default observer(ExportProductModal)