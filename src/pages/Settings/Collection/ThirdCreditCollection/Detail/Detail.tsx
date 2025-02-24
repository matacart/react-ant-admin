import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Flex, Form, Input, List, message, Select, TabsProps, Upload } from "antd"
import { history, useParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getAddonsConfigCreditCard, setAddonsConfig } from "@/services/y2/api";
import { useForm } from "antd/es/form/Form";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";

const { TextArea } = Input;
function Detail() {

    const params = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [form] = Form.useForm()
    // 结构
    const [formItemList,setFormItemList] = useState({});

    // 

    const [thirdCreditCollection,setThirdCreditCollection] = useState();

    // const [config,setConfig] = useState<any>({
    //     item:[
    //         {name: "MerchantId",value:""},
    //         {name: "SecretKey",value:""},
    //     ]
    // });

    const submit = ()=>{
        // console.log({...form.getFieldsValue(),config})
        // setAddonsConfig({...form.getFieldsValue(),config}).then(res=>{
        //     message.success("添加成功")
        //     history.push("/settings/payments")
        // })
        // getAddonsConfigArray()
    }

    useEffect(()=>{
        getAddonsConfigCreditCard(params.id).then(res=>{
            console.log(res)
            setFormItemList(res.data.addon)
            setIsSkeleton(false)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />: <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/payments/thirdCreditCard")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">添加 {formItemList.title}</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px 20px 0 20px"}}>
                                    <Form form={form} layout="vertical">
                                        {Object.entries(formItemList.config).map(([key, value])=>(
                                            <Form.Item key={key} name={key} label={<div className="font-w-600">{value.title}</div>}>
                                                {(()=>{
                                                    switch(value.type){
                                                        case "text":
                                                            return <Input placeholder={value.title} />;
                                                        case "select":
                                                            const options = Object.entries(value.options).map(([key, value])=>{
                                                                return {
                                                                    label:value,
                                                                    value:key
                                                                }
                                                            })
                                                            return <Select placeholder={value.title} options={options} />
                                                        case "textarea":
                                                            return <TextArea placeholder={value.title} />
                                                    }
                                                })()}
                                            </Form.Item>
                                        ))}
                                        {/* {formItemList?.map(item=>{
                                            console.log(item)
                                        })} */}
                                        {/* <Form.Item name="name" label={<div className="font-w-600">{config.item[0].name}</div>}>
                                            <Input value={config.item[0].value} placeholder="输入付款方式名称" />
                                        </Form.Item> */}
                                    </Form>
                                </div>
                            </Card>
                            <div style={{textAlign:"right"}}>
                                <Button onClick={submit} type="primary" style={{height:36}}>添加</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default Detail

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 880px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    /* display: flex; */
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                padding: 0;
                .credentials-left-box{
                    flex: 1;
                    min-height: 150px;
                }
                .credentials-right-box{
                    margin-left: 8px;
                    .ant-upload{
                        width: 180px;
                        min-height: 150px;
                    }
                    .upload-img{
                        background-color: #f7f8fb;
                        border-radius: 4px;
                        width: 180px;
                        min-height: 150px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        /*  */
                        position: relative;
                        border: 1px solid #eef1f6;
                        border-radius: 4px;
                    }
                    .mask{
                        position: absolute;
                        z-index: 99;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(36,40,51,0.4);
                        /* opacity: 0; */
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: opacity 0.3s ease;
                    }

                    .upload-img:hover.mask {
                        opacity: 1;
                    }

                    .delete-icon {
                        color: white;
                        font-size: 16px;
                        width: 40px;
                        height: 40px;
                        border: 1px solid rgba(255, 255, 255, 0.15);
                        border-radius: 50%;
                        /* opacity: 0.8; */
                        display: flex;
                        justify-content: center;
                        align-items:center;
                        cursor: pointer;
                    }
                }
            }
            

        }
        
    }
}
`