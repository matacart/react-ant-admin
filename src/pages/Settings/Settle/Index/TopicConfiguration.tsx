import { App, Card, Flex } from "antd";
import styled from "styled-components";
import settingsInfo, { CheckoutTemplateConfig } from "@/store/settings/settle/settingsInfo";
import { observer } from "mobx-react-lite"
import SuccessTag from "@/components/Tag/SuccessTag";
import { history } from "@umijs/max";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import { EllipsisOutlined, ExclamationCircleFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import DefaultButton from "@/components/Button/DefaultButton";
import DefaultTag from "@/components/Tag/DefaultTag";
import RenameModal from "./RenameModal";
import { copyCheckoutConfig, deleteCheckoutConfig, getCheckoutConfigDrafts, getCheckoutConfigLive, publishCheckoutConfig } from "@/services/y2/apiCheckout";
import DangerButton from "@/components/Button/DangerButton";
import { useState } from "react";

const TopicConfiguration = () => {

    const { message,modal } = App.useApp();

    const [deleteLoading,setDeleteLoading] = useState(false);

    // 删除
    const deleteConfig = (config:CheckoutTemplateConfig | null)=>{
        if(!config) return
        setDeleteLoading(true)
        deleteCheckoutConfig({
            languages_id:settingsInfo?.languagesId || "",
            profile_id:config.profile_id || "",
        }).then(async res=>{
            if(res.code == 0){
                message.success("删除成功");
                await reloadDraft();
            }
        }).finally(()=>{
            setDeleteLoading(false)
        })
    }

    // 复制
    const copyConfig = (config:CheckoutTemplateConfig | null)=>{
        if(!config) return
        copyCheckoutConfig({
            languages_id:settingsInfo?.languagesId || "",
            source_profile_id:config.profile_id || "",
        }).then(res=>{
            if(res.code == 0){
                message.success("复制成功");
                reloadDraft();
            }
        })
    }

    // 发布
    const publishConfig = (config:CheckoutTemplateConfig | null)=>{
        if(!config) return
        publishCheckoutConfig({
            languages_id:settingsInfo?.languagesId || "",
            profile_id:config.profile_id || "",
        }).then(res=>{
            if(res.code == 0){
                message.success("发布成功");
                reloadDraft();
                reloadLive();
            }
        })
    }

    // 重新加载草稿
    const reloadDraft = ()=>{
        getCheckoutConfigDrafts({ languages_id: settingsInfo?.languagesId || "", type: "draft" }).then(res=>{
            if(res.code == 0){
                settingsInfo.setCheckoutConfigDraft(res.data.list || [])
            }
        })
    }

    // 重新加载实时
    const reloadLive = ()=>{
        getCheckoutConfigLive({ languages_id: settingsInfo?.languagesId || "2"}).then(res=>{
            if(res.code == 0){
                settingsInfo.setCheckoutConfigLive(res.data.config || null)
            }
        })
    }

    return(
        <Scoped>
            <Card>
                <div className="color-242833 font-w-600">主题配置</div>
                <div className="font-12 color-474F5E">自定义结账页面流程的主题与应用</div>
                {/* 提示标签 */}
                {/* <Tag
                    className='tag'
                    closable
                >
                    <div className="text-box">
                        <InfoCircleFilled className="color-356DFF" />
                        <span style={{marginLeft:"8px"}}>检测到存在默认初始化的地点数据，请先前往地点设置更新</span>
                        <a className="color-356DFF">地点设置</a>
                    </div>
                </Tag> */}
                <Flex className="list" vertical gap={12}>
                    {settingsInfo.checkoutConfigLive && <Flex className="list-item" justify="space-between" align="center">
                        <div>
                            <Flex gap={8} style={{marginBottom:"4px"}}>
                                <div className="color-242833 font-w-600">{settingsInfo.checkoutConfigLive?.profile_name}</div>
                                <SuccessTag text="实时" />
                            </Flex>
                            <div className="font-12 color-62708D">创建日期：{dayjs(Number(settingsInfo.checkoutConfigLive?.create_time)*1000).format("YYYY/MM/DD HH:mm:ss")}</div>
                        </div>
                        <Flex gap={12}>
                            <MyDropdown menu={{items:[
                                {
                                    label: <a onClick={()=>copyConfig(settingsInfo.checkoutConfigLive)}>复制</a>,
                                    key: 1,
                                },
                                {
                                    label: <RenameModal config={settingsInfo.checkoutConfigLive} success={()=>reloadLive()} />,
                                    key: 2,
                                }
                            ]}} tiggerEle={<Flex justify="center" align="center" className="icon-box cursor-pointer"><EllipsisOutlined className="font-14"/></Flex>} />
                            <DefaultButton text="预览" onClick={()=>{}} />
                            <PrimaryButton text="自定义" onClick={()=>history.push(`/settings/settle/checkout-editor/${settingsInfo.checkoutConfigLive?.profile_id}`)} />
                        </Flex>
                    </Flex>}
                    {settingsInfo.checkoutConfigDraft && settingsInfo.checkoutConfigDraft.map((item,index)=>(
                        <Flex className="list-item" justify="space-between" align="center" key={index}>
                            <div>
                                <Flex gap={8} style={{marginBottom:"4px"}}>
                                    <div className="color-242833 font-w-600">{item.profile_name}</div>
                                    {index == 0 && <DefaultTag text="新草稿" />}
                                </Flex>
                                <div className="font-12 color-62708D">创建日期：{dayjs(Number(item.create_time)*1000).format("YYYY/MM/DD HH:mm:ss")}</div>
                            </div>
                            <Flex gap={12}>
                                <MyDropdown menu={{items:[
                                    {
                                        label: <a onClick={()=>publishConfig(item)}>发布</a>,
                                        key: 1,
                                    },
                                    {
                                        label: <a onClick={()=>copyConfig(item)}>复制</a>,
                                        key: 2,
                                    },
                                    {
                                        label: <RenameModal config={item} success={()=>reloadDraft()} />,
                                        key: 3,
                                    },
                                    {
                                        label: <a style={{color:"#F86140"}} onClick={()=>{
                                            const confirm = modal.confirm({
                                                title:`确认删除${item.profile_name}吗？`,
                                                icon: <ExclamationCircleFilled style={{color:"#F86140"}} />,
                                                centered:true,
                                                content:"所有其品牌营销内容和自定义项都将被删除。此操作无法撤销。",
                                                footer:()=>(<Flex style={{width:"100%"}} justify="flex-end" gap={12}>
                                                    <DefaultButton text="取消" onClick={()=>confirm.destroy()} />
                                                    <DangerButton loading={deleteLoading} text="删除" onClick={async ()=>{
                                                        await deleteConfig(item)
                                                        confirm.destroy()
                                                    }} />
                                                </Flex>)
                                            })
                                        }}>删除</a>,
                                        key: 4,
                                    }
                                ]}} tiggerEle={<Flex justify="center" align="center" className="icon-box cursor-pointer"><EllipsisOutlined className="font-14"/></Flex>} />
                                <DefaultButton text="预览" onClick={()=>{}} />
                                <DefaultButton text="自定义" onClick={()=>history.push(`/settings/settle/checkout-editor/${item.profile_id}`)} />
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Card>
        </Scoped>
        
    );
}

export default observer(TopicConfiguration);

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
    .list{
        margin-top: 12px;
    }
    .list-item{
        padding: 12px;
        background-color: #F7F8Fb;
        .icon-box{
            background-color: #fff;
            border: 1px solid #d7dbe7;
            border-radius: 4px;
            width: 36px;
            height: 36px;
        }
    }
`