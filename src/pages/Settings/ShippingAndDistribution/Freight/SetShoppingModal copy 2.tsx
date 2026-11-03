// import DefaultButton from "@/components/Button/DefaultButton";
// import PrimaryButton from "@/components/Button/PrimaryButton"
// import { AddIcon } from "@/components/Icons/Icons";
// import MyInput from "@/components/Input/MyInput";
// import MyTextArea from "@/components/Input/MyTextArea";
// import NumberInput from "@/components/Input/NumberInput";
// import DefaultSelect from "@/components/Select/DefaultSelect";
// import MySelect from "@/components/Select/MySelect";
// import { useSleep } from "@/hooks/customHooks";
// import { getDeliveryList, setAddonsConfigs } from "@/services/y2/apiAppstore";
// import generalFreight, { AreaPlan } from "@/store/settings/ShippingAndDistribution/generalFreight";
// import { MinusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
// import { App, Button, Checkbox, Col, ConfigProvider, Flex, Form, Input, InputNumber, Modal, Row, Select, Spin, Tooltip } from "antd"
// import { useEffect, useState } from "react"
// import styled from "styled-components"
// import { updateAreaPlan } from "./area";

// const { TextArea } = Input;

// // 步骤1：在组件顶部定义类型
// type FieldConfig = {
//     label: string;
//     name:string;
//     type: 'input' | 'inputNumber' | 'currency';
//     suffix?: string;
//     colSpan?: number;
// };

//  // 步骤2：添加配置映射
// const billingConfig = {
//     1: { // 价格
//         title: '价格区间',
//         unit: '元',
//         fields: ['运费金额']
//     },
//     2: { // 数量
//         title: '数量区间',
//         unit: '件',
//         fields: ['运费金额']
//     },
//     3: { // 重量
//         title: '重量区间',
//         unit: 'kg',
//         fields: ['运费金额']
//     }
// };

// const billingMethodOptions = [
//     {
//         label: '固定运费',
//         value: '1'
//     },
//     {
//         label: '首续件',
//         value: '2'
//     },
//     {
//         label: '首续重',
//         value: '3'
//     }
// ]

// function SetShoppingModal({deliveryLocationGroupSeq,areaPlan}:{deliveryLocationGroupSeq:string,areaPlan:AreaPlan}){

//     const { message } = App.useApp();

//     const [form] = Form.useForm();

//     const [open,setOpen] = useState(false);

//     const [currencyList,setCurrencyList] = useState([]);

//     const [btnLoading,setBtnLoading] = useState(false)

//     const sleep = useSleep();

//     const submit = ()=>{
//         // shippingPlans 运费方案

//         // customerDeliveryAddressRequired
//         // deliveryDescription
//         // deliveryName
//         // expressTypeName
//         // expressTypeSource
//         // operationReason
//         // shippingPlans
//         // status
//         // supportedCheckoutTypes

//         form.validateFields().then((values:any)=>{
//             const delivery = {
//                 customerDeliveryAddressRequired:true,
//                 deliveryId:"ZDY"+Date.now().toString(),
//                 deliveryName:values.deliveryName,
//                 deliveryDescription:values.deliveryDescription,
//                 expressTypeName:"custom name",
//                 expressTypeSource:"2",
//                 operationReason:"0",
//                 shippingPlans:{
//                     // 运费模式 1 固定运费 2 首续件 3 首续重
//                     chargeMode:values.billingMethod,
//                     // 条件区间类型 按商品总价 按订单总价 按包裹重量 按商品件数
//                     conditionalInterval:1,
//                     // 区间
//                     intervals:null,
//                     currencyCode:values.currency,
//                     customAmount:values.amount,
//                     shippingType:2
//                 },
//                 status:1,
//                 // 支持的支付方式 1 在线支付 2 货到付款
//                 supportedCheckoutTypes:[1]
//             }
//             const newAreaPlan = {
//                 ...areaPlan,
//                 deliveryPlans: [...areaPlan.deliveryPlans, delivery]
//             }
//             updateAreaPlan(deliveryLocationGroupSeq,newAreaPlan)
//             setOpen(false)
//             // generalFreight.addDeliveryPlans(deliveryLocationGroupSeq,shippingRegionSeq,delivery)
//         })
//     }

//     const cancel = ()=>{
//         setOpen(false)
//     }

//     useEffect(()=>{
//         const currencies = JSON.parse(localStorage.getItem('MC_DATA_CURRENCIES') || '[]').map((item:any)=>({
//             label: item.name,
//             value: item.code
//         }))
//         setCurrencyList(currencies)
//     },[])

//     return (
//         <Scoped>
//             <DefaultButton text="添加运费" onClick={()=>setOpen(true)} />
//             <Modal open={open} title="添加运费" centered width={960} okText="保存" onCancel={cancel} footer={
//                 (_, { OkBtn, CancelBtn }) => (
//                     <Flex justify="end" gap={8}>
//                       <DefaultButton text="取消" onClick={cancel} />
//                       <PrimaryButton loading={btnLoading} text="保存" onClick={submit} />
//                     </Flex>
//                 )
//             }>
//                 <MyForm layout="vertical" form={form}>
//                     <Form.Item className="mb-20" name="deliveryName" label={<div>运费名称（客户选择物流方案时展示）</div>} 
//                         rules={[{ required: true, message: '请输入运费名称' }]}
//                     >
//                         <MyInput style={{height:"36px"}} placeholder="请输入运费名称" />
//                     </Form.Item>
//                     <Form.Item className="mb-20" name="deliveryDescription" label="补充说明">
//                         <MyTextArea 
//                             placeholder="补充说明物流时效，送货注意事项等信息（可选，如有填写，将在无运费合并时进行展示）"
//                             showCount
//                             maxLength={300}
//                             autoSize={{ minRows: 4, maxRows: 4 }}
//                         />
//                     </Form.Item>
//                     <Form.Item className="mb-20" name="cashOnDelivery" label={false} valuePropName="checked">
//                         <Checkbox>支持货到付款</Checkbox>
//                     </Form.Item>
//                     {/*  */}
//                     <Flex>
//                         <div style={{height:"36px",lineHeight:"36px"}} className="font-w-500">计费方式：</div>
//                         <Form.Item className="mb-20" name="billingMethod" label={false} initialValue="1">
//                             <MySelect style={{height:"36px",width:"220px"}} options={billingMethodOptions} />
//                         </Form.Item>
//                     </Flex>
//                     <Flex>
//                         <div style={{height:"36px",lineHeight:"36px"}} className="font-w-500">计费货币：</div>
//                         <Form.Item className="mb-20" name="currency" label={false} initialValue="USD">
//                             <MySelect style={{height:"36px",width:"220px"}} options={currencyList} />
//                         </Form.Item>
//                     </Flex>
//                     <Flex>
//                         <div style={{height:"36px",lineHeight:"36px"}} className="font-w-500">运费价格：</div>
//                         <Form.Item className="mb-20" name="amount" label={false}>
//                             <NumberInput style={{height:"36px",width:"220px"}} />
//                         </Form.Item>
//                     </Flex>
//                     <div className="color-356DFF cursor-pointer">添加条件</div>
//                 </MyForm>
//             </Modal>
//         </Scoped>
//     )

// }


// export default SetShoppingModal

// const Scoped = styled.div`
    
// `

// const MyForm = styled(Form)`
//     .ant-form-item{
//         margin-bottom: 0;
//     }
  
//     .ant-form-item-required::before {
//         display: none !important;
//     }
//     .setting-title{
//         margin-bottom: 12px;
//         padding-bottom: 12px;
//         border-bottom: 1px solid #d7dbe7;
//     }
//     .setting-item{
//         margin-bottom: 12px;
//         padding-top: 20px;
//         border-top: 1px solid #d7dbe7;
//     }
//     .mb-20{
//         margin-bottom: 20px;
//     }
//     .mb-12{
//         margin-bottom: 12px;
//     }
//     .mb-8{
//         margin-bottom: 8px;
//     }
//     .default-btn{
//         /* margin-top:12px */
//     }
// `