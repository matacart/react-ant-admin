import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Flex, Form, Input, List, message, Radio, Select, TabsProps, Upload } from "antd"
import { history, useSearchParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getAddonsConfigCreditCard, setAddonsConfig, setAddonsConfigs } from "@/services/y2/api";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import PrimaryButton from "@/components/Button/PrimaryButton";
import collection from "@/store/settings/collection";

// 修改FormItem接口增加value类型
interface FormItem {
    title?: string;
    config: {
      [key: string]: {
        type: string;
        title: string;
        value?: string;  // 新增value类型声明
        options?: Record<string, any>;
      }
    }
}

const { TextArea } = Input;
function ThirdCreditCollectionAdd() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [loading,setLoading] = useState(false)

    const [form] = Form.useForm()
    // 结构
    const [formItemList,setFormItemList] = useState<FormItem>({
        title: '',
        config: {}
    });

    // 创建
    const submit = ()=>{
        setLoading(true)
        setAddonsConfigs(collection.newThirdCreditCollection).then(res=>{
            message.success("添加成功")
            collection.clearThirdCreditCollection()
            history.push("/settings/payments/thirdCreditCard")
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        getAddonsConfigCreditCard("",searchParams.get("addonsId") || "" ,searchParams.get("lang") || "").then(async res=>{
            setFormItemList(res.data.addon)
            let newObj: Record<string, any> = {};
            Object.entries(res.data.addon.config).forEach(([key, value]) => {
                newObj["config["+key+"]"] = (value as FormItem['config'][string]).value??""
            });
            collection.setNewThirdCreditCollection({
                ...collection.newThirdCreditCollection,
                addons_id:searchParams.get("addonsId"),
                languages_id:searchParams.get("lang"),
                title:res.data.addon.title,
                ...newObj
            })
        }).catch(()=>{
            // message.error("获取失败")
        }).finally(()=>{
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
                                                            return <Input defaultValue={(collection.newThirdCreditCollection as Record<string, any>)["config["+key+"]"] || ""} placeholder={value.title} onChange={(e)=>{
                                                                collection.setNewThirdCreditCollection({
                                                                    ...collection.newThirdCreditCollection,
                                                                    ["config["+key+"]"]:e.target.value
                                                                })
                                                            }} />;
                                                        case "select":
                                                            const options = Object.entries(value.options || {}).map(([key, value])=>{
                                                                return {
                                                                    label:value,
                                                                    value:key
                                                                }
                                                            })
                                                            return <Select defaultValue={(collection.newThirdCreditCollection as Record<string, any>)["config["+key+"]"] || ""} placeholder={value.title} options={options} onChange={(value)=>{
                                                                collection.setNewThirdCreditCollection({
                                                                    ...collection.newThirdCreditCollection,
                                                                    ["config["+key+"]"]:value
                                                                })
                                                            }} />
                                                        case "textarea":
                                                            return <TextArea placeholder={value.title} />
                                                        case "radio":
                                                            return <Radio.Group
                                                                defaultValue={"0"}
                                                                options={(value.options || []).map((res:string,index:string)=>{
                                                                    return {
                                                                        label:res,
                                                                        value:index.toString()
                                                                    }
                                                                })}
                                                                onChange={(e)=>{
                                                                    collection.setNewThirdCreditCollection({
                                                                        ...collection.newThirdCreditCollection,
                                                                        ["config["+key+"]"]:e.target.value
                                                                    })
                                                                }}
                                                            />
                                                    }
                                                })()}
                                            </Form.Item>
                                        ))}
                                        <Form.Item label={<div className="font-w-600">自定义标题</div>}>
                                            <Input placeholder="标题" onChange={(e)=>{
                                                collection.setNewThirdCreditCollection({
                                                    ...collection.newThirdCreditCollection,
                                                    title:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                        <Form.Item label={<div className="font-w-600">自定义描述</div>}>
                                            <TextArea placeholder="描述" showCount maxLength={500} rows={5} onChange={(e)=>{
                                                collection.setNewThirdCreditCollection({
                                                    ...collection.newThirdCreditCollection,
                                                    description:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                        <Form.Item label={<div className="font-w-600">备注</div>}>
                                            <TextArea placeholder="备注" showCount maxLength={200} rows={2} onChange={(e)=>{
                                                collection.setNewThirdCreditCollection({
                                                    ...collection.newThirdCreditCollection,
                                                    remark:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                        <Form.Item label={<div className="font-w-600">排序</div>}>
                                            <Input defaultValue={collection.newThirdCreditCollection.sort} onChange={(e)=>{
                                                collection.setNewThirdCreditCollection({
                                                    ...collection.newThirdCreditCollection,
                                                    sort:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Card>
                            <Flex justify="end">
                                <PrimaryButton text={"添加"+formItemList.title} loading={loading} onClick={submit} />
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default ThirdCreditCollectionAdd

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