import { useIntl } from "@/.umi/plugin-locale/localeExports";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { Checkbox, Flex, Form, Modal } from "antd";
import { useState } from "react";

function PackageTrackingModal(){
    
    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [logistics,setLogistics] = useState([
        {value:'0',label:"其它"},
        {value:'1',label:"顺丰"},
    ])

    const [logisticsValue,setLogisticsValue] = useState('0');

    const submit = () => {
        setOpen(false);
    }

    const cancel = () => {
        setOpen(false);
    };


    return(
        <>
            <PrimaryButton text={intl.formatMessage({ id: "order.detail.addtracking" })} onClick={()=>setOpen(true)} />
            <Modal open={open} width={520} title="更新运单号" centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify='end' align='center'>
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={cancel} />
                                <PrimaryButton text={"更新"} onClick={submit} />
                            </Flex>
                        </Flex>
                    </>
                )}
            >
                <Form layout="vertical" style={{marginTop:"28px"}}>
                    <Form.Item label="运单号">
                        <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>} />
                    </Form.Item>
                    <Form.Item label="物流服务商">
                        <MySelect placeholder="请填写快递公司名称" showSearch 
                        value={logisticsValue}
                        options={logistics} style={{height:"36px"}} onChange={(value:string)=>{
                            setLogisticsValue(value)
                        }} />
                        {logisticsValue !== "0" && <div style={{marginTop:"8px"}} className="font-12 color-7A8499">没有找到服务商？<span className="color-356DFF cursor-pointer" onClick={()=>{
                            setLogisticsValue("0")
                        }}>选择其他</span></div>}
                    </Form.Item>
                    {logisticsValue == "0" && <>
                        <Form.Item label="公司名称">
                            <MyInput style={{height:"36px"}} placeholder="请输入公司名称" />
                        </Form.Item>
                        <Form.Item label="货件追踪链接URL">
                            <MyInput style={{height:"36px"}} placeholder="https://" />
                        </Form.Item>
                    </>}
                    <Form.Item label={null}>
                        <Checkbox>向客户发送通知</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PackageTrackingModal;