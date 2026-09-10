import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { addOrderRemark } from "@/services/y2/api";
import order, { RemarkType } from "@/store/order/order";
import { App, Flex, Form, Input, Modal } from "antd";
import { useState } from "react";
import dayjs from 'dayjs';
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import MyButton from "@/components/Button/MyButton";
import { updateOrderRemark } from "@/services/y2/apiStore";

const { TextArea } = Input;

function MerchantNotes() {

    const [open,setOpen] = useState(false);

    const { message } = App.useApp();

    const editIndex = new Map<number,boolean>();

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingNotes,setEditingNotes] = useState<string>("");

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const cancel = ()=>{
        setOpen(false)
    }

    // 添加提交
    const submit = ()=>{
        form.validateFields().then((values)=>{
            setLoading(true)
            addOrderRemark({
                orderId:order.orderInfo.orderSeq,
                remark:values.notes
            }).then(res=>{
                order.triggerRefresh()
                form.resetFields();
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)
                setOpen(false);
            })
        }).catch(err=>{
        })
    }

    // 更新提交
    const updateHandle = (id:string)=>{
        setLoading(true)
        updateOrderRemark({
            remark_id:id,
            languages_id:order.languages,
            remark:editingNotes
        }).then(res=>{
            setEditingIndex(null);
            setEditingNotes("");
            order.triggerRefresh()
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <>
            <span className="color-356DFF cursor-pointer" onClick={() =>setOpen(true)}>编辑</span>
            <ScopedModal title="商家备注" width={620} open={open} onCancel={cancel} centered 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton loading={loading} text={"添加"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Flex className="warp" gap={12} vertical>
                {order.orderInfo?.orderRemarks?.length > 0 && order.orderInfo?.orderRemarks.map((item:RemarkType,index)=>(
                    editingIndex == index?<>
                        <TextArea
                            defaultValue={item.remark}
                            onChange={(e)=>setEditingNotes(e.target.value)}
                            maxLength={1000}
                            showCount 
                            placeholder="输入备注内容"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                        <Flex justify="end" gap={12} style={{marginTop:"12px"}}>
                            <MyButton className="font-12" autoInsertSpace={false} text={"取消"} onClick={()=>{setEditingIndex(null);setEditingNotes("")}} />
                            <MyButton className="font-12" disabled={editingNotes == ""} autoInsertSpace={false} type="primary" loading={loading} text={"更新"} onClick={()=>updateHandle(item.id)}  />
                        </Flex>
                    </>:<Flex className="item" key={index} align="center">
                        <div style={{flex:1,minWidth:0}}>
                            <div style={{marginBottom:"4px",whiteSpace:"pre-wrap"}} className="color-474F5E">{item.remark}</div>
                            <div className="color-7A8499 font-12">更新于{item.updateTime ? dayjs(item.updateTime*1000).format("YYYY/MM/DD HH:mm:ss") : ""}</div>
                        </div>
                        <EditOutlined className="font-16 cursor-pointer" onClick={()=>setEditingIndex(index)} />
                    </Flex>
                ))}
                </Flex>
                <Form form={form} layout="vertical" className="warp">
                    <div style={{marginBottom:"8px"}}>添加备注</div>
                    <Form.Item required={false} name={"notes"} rules={[{ required: true, message: '请输入备注' }]}>
                        <TextArea
                            maxLength={1000}
                            showCount 
                            placeholder="输入备注内容"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                </Form>
            </ScopedModal>
        </>
    );
}

const ScopedModal = styled(Modal)`
    .warp{
        margin-top: 12px;
        max-height: 280px;
        overflow-y: auto;
        /* overflow-x: hidden; */
        .item{
            padding: 8px 12px;
            border: 1px solid #d7dbe7;
            border-radius: 6px;
        }
    }

`

export default MerchantNotes