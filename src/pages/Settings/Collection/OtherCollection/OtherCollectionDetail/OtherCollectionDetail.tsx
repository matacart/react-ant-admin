import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Flex, Form, Input, List, message, Radio, Select, TabsProps, Upload } from "antd"
import { history, useParams, useSearchParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getAddonsConfigCreditCard, setAddonsConfigs } from "@/services/y2/api";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DeleteModal from "@/components/Modal/DeleteModal";
import DangerButton from "@/components/Button/DangerButton";
import { observer } from "mobx-react-lite";
import LangSelect from "@/pages/components/LangSelect";
import collection from "@/store/settings/collection";
import DefaultButton from "@/components/Button/DefaultButton";

// 新增类型定义
interface FormItem {
    title?: string;
    config: {
      [key: string]: {
        type: string;
        title: string;
        options?: Record<string, any>;
      }
    }
}

const { TextArea } = Input;
function OtherCollectionDetail() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [loading,setLoading] = useState(false)

    const [delLoading,setDelLoading] = useState(false)

    const [form] = Form.useForm()
    // 结构
    const [formItemList,setFormItemList] = useState<FormItem>({
        title: '',
        config: {}
    });

    // 
    const [rawData,setRawData] = useState<any>();

    const fetch = (langId:string)=>{
        getAddonsConfigCreditCard(searchParams.get("id") || "",searchParams.get("addonsId") || "",langId).then(async res=>{
            if(res.data.addon_config){
                setFormItemList(res.data.addon)
                await collection.setOldOtherCollection(res.data.addon_config)
                Object.entries(JSON.parse(res.data.addon_config.config)).forEach(([key, value]) => {
                    collection.setOldOtherCollection({
                        ...collection.oldOtherCollection,
                        ["config["+key+"]"]:value
                    })
                    setRawData({
                        ...collection.oldOtherCollection,
                        ["config["+key+"]"]:value
                    })
                });
                setSearchParams({addonsId:searchParams.get("addonsId")??"",id:searchParams.get("id")??"",lang:langId??""})
            }else{
                await collection.clearNewOtherCollection()
                history.push("/settings/payments/other/add?addonsId="+searchParams.get("addonsId")+"&lang="+langId)
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
        })
    }

    // 更新
    const submit = ()=>{
        setLoading(true)
        setAddonsConfigs(collection.oldOtherCollection).then(res=>{
            message.success("已更新")
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false)
        })
    }
    // 删除
    const setStatus = (status:string)=>{
        setDelLoading(true)
        setAddonsConfigs({...rawData,status:status}).then(res=>{
            collection.setOldOtherCollection({
                ...collection.oldOtherCollection,
                status:status
            })
            message.success("已更新")
        }).catch(()=>{
        }).finally(()=>{
            setDelLoading(false)
        })
    }

    // 语言
    const setLang = (lang:string)=>{
        // 从新请求
        fetch(lang)
    }


    useEffect(()=>{
        getAddonsConfigCreditCard(searchParams.get("id") || "",searchParams.get("addonsId") || "",searchParams.get("lang") || "").then(async res=>{
            setFormItemList(res.data.addon)
            await collection.setOldOtherCollection(res.data.addon_config)
            Object.entries(JSON.parse(res.data.addon_config.config)).forEach(([key, value]) => {
                collection.setOldOtherCollection({
                    ...collection.oldOtherCollection,
                    ["config["+key+"]"]:value
                })
                setRawData({
                    ...collection.oldOtherCollection,
                    ["config["+key+"]"]:value
                })
            });
        }).catch((err)=>{
            console.log(err)
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
                                history.push("/settings/payments/other")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">编辑 {formItemList.title}</div>
                        </div>
                        <div className="mc-header-right">
                            {/* 语言 */}
                            <LangSelect lang={collection.oldOtherCollection.languages_id} setLang={setLang} />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px 20px 0 20px"}}>
                                    <Form form={form} layout="vertical">
                                        {Object.entries(formItemList.config).map(([key, value])=>(
                                            <Form.Item key={key} label={<div className="font-w-600">{value.title}</div>}>
                                                {(()=>{
                                                    switch(value.type){
                                                        case "text":
                                                            return <Input value={(collection.oldOtherCollection as Record<string, any>)["config["+key+"]"] || ""} placeholder={value.title} onChange={(e)=>{
                                                                collection.setOldOtherCollection({
                                                                    ...collection.oldOtherCollection,
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
                                                            return <Select value={(collection.oldOtherCollection as Record<string, any>)["config["+key+"]"] || null} placeholder={value.title} options={options} onChange={(value)=>{
                                                                collection.setOldOtherCollection({
                                                                    ...collection.oldOtherCollection,
                                                                    ["config["+key+"]"]:value
                                                                })
                                                            }} />
                                                        case "textarea":
                                                            return <TextArea placeholder={value.title} />
                                                        case "radio":
                                                            return <Radio.Group
                                                                value={(collection.oldOtherCollection as Record<string, any>)["config["+key+"]"] || "0"}
                                                                options={(value.options || []).map((res:string,index:string)=>{
                                                                    return {
                                                                        label:res,
                                                                        value:index.toString()
                                                                    }
                                                                })}
                                                                onChange={(e)=>{
                                                                    collection.setOldOtherCollection({
                                                                        ...collection.oldOtherCollection,
                                                                        ["config["+key+"]"]:e.target.value
                                                                    })
                                                                }}
                                                            />
                                                    }
                                                })()}
                                            </Form.Item>
                                        ))}
                                        <Form.Item label={<div className="font-w-600">自定义标题</div>}>
                                            <Input value={collection.oldOtherCollection.title} onChange={(e)=>{
                                                collection.setOldOtherCollection({
                                                    ...collection.oldOtherCollection,
                                                    title:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                        <Form.Item label={<div className="font-w-600">自定义描述</div>}>
                                            <TextArea showCount maxLength={500} value={collection.oldOtherCollection.description} rows={5} onChange={(e)=>{
                                                collection.setOldOtherCollection({
                                                    ...collection.oldOtherCollection,
                                                    description:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                        <Form.Item label={<div className="font-w-600">备注</div>}>
                                            <TextArea showCount maxLength={200} value={collection.oldOtherCollection.remark} rows={2} onChange={(e)=>{
                                                collection.setOldOtherCollection({
                                                    ...collection.oldOtherCollection,
                                                    remark:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                        <Form.Item label={<div className="font-w-600">排序</div>}>
                                            <Input value={collection.oldOtherCollection.sort} onChange={(e)=>{
                                                collection.setOldOtherCollection({
                                                    ...collection.oldOtherCollection,
                                                    sort:e.target.value
                                                })
                                            }} />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Card>
                            <Flex justify="space-between">
                                {collection.oldOtherCollection.status == 1?<DeleteModal tElement={
                                    <DangerButton text={"停用"} loading={delLoading} />
                                }
                                removeFunc={()=>{
                                    setStatus("0")
                                }} 
                                title="停用服务商" 
                                content={"停用后，网店客户将不可使用此服务商结账。"}
                                okText="确认停用" />:<DefaultButton text={"启用"} onClick={()=>setStatus("1")} />}
                                <PrimaryButton text={"更新"} loading={loading} onClick={submit} />
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(OtherCollectionDetail)

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