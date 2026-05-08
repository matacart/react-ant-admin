import styled from "styled-components"
import Header from "./Header"
import { Flex, message, Spin } from "antd"
import Left from "./Left"
import Main from "./Main"
import Right from "./Right"
import { useEffect, useState } from "react"
import noticeEmail from "@/store/settings/notification/noticeEmail"
import { useIntl, useParams } from "@umijs/max"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { LoadingOutlined } from "@ant-design/icons"
import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from 'uuid';
import { App } from 'antd';
import { getEmailTemplateConfig, getEmailTemplateDetail, getEmailTemplateTheme } from "@/services/y2/apiEmail"

function Notification() {
    
    const intl = useIntl();
    
    const params = useParams<{key:string}>();
    const template_code = params.key || "";

    const [isSkeleton, setIsSkeleton] = useState(true);

    const [spinning, setSpinning] = useState(false);

    const getEmail = async (oseId:string)=>{
        const emailTemplateConfig = await getEmailTemplateConfig({
            template_code:template_code,
            languages_id:noticeEmail.languagesId,
            user_languages_id:noticeEmail.useLanguagesId,
            oseid:oseId,
        })
        const emailTemplateDetail = await getEmailTemplateDetail({
            template_code:template_code,
            languages_id:noticeEmail.languagesId,
            user_languages_id:noticeEmail.useLanguagesId,
            oseid:oseId,
        })
        const emailTemplateSettings = await getEmailTemplateTheme({
            template_code:template_code,
            languages_id:noticeEmail.languagesId,
            user_languages_id:noticeEmail.useLanguagesId,
            oseid:oseId,
        });

        return {
            emailTemplateConfig:emailTemplateConfig,
            emailTemplateDetail:emailTemplateDetail,
            emailTemplateSettings:emailTemplateSettings,
        };
    }

    useEffect(()=>{
        const fetchData =  async ()=>{
            // 生成临时编号
            const oseId = uuidv4();
            noticeEmail.setOseId(`oseid_${oseId}`);
            try{
                const {emailTemplateConfig,emailTemplateDetail,emailTemplateSettings} = await getEmail(`oseid_${oseId}`);
                noticeEmail.setSections(emailTemplateDetail?.data?.sections);
                noticeEmail.setOrder(emailTemplateDetail?.data?.order);
                noticeEmail.setDynamicOrder(emailTemplateDetail?.data?.dynamicOrder);
                noticeEmail.setTemplateCode(template_code);
                // 更新主题设置
                noticeEmail.setSettings(emailTemplateSettings?.data);
                // 更新模板动态源
                noticeEmail.setTemplateConfig(emailTemplateConfig?.data);
            }catch(err:any){
                message.error(intl.formatMessage({ id: 'components.message.error' }));
            }finally{
                setIsSkeleton(false);
            }
        }
        fetchData();
        return () => {
            // 组件卸载时重置
            noticeEmail.reset();
        };
    },[])

    

    // 店铺语言变化，重新获取数据
    useEffect(()=>{
        if(isSkeleton){
            return;
        }
        setSpinning(true);
        getEmail(noticeEmail.oseId).then(({emailTemplateConfig,emailTemplateDetail,emailTemplateSettings})=>{
            noticeEmail.setSections(emailTemplateDetail?.data?.sections);
            noticeEmail.setOrder(emailTemplateDetail?.data?.order);
            noticeEmail.setDynamicOrder(emailTemplateDetail?.data?.dynamicOrder);
            noticeEmail.setTemplateCode(template_code);
            // 更新主题设置
            noticeEmail.setSettings(emailTemplateSettings?.data);
            // 更新模板动态源
            noticeEmail.setTemplateConfig(emailTemplateConfig?.data);
        }).catch(err=>{
            message.error(intl.formatMessage({ id: 'components.message.error' }));
        }).finally(()=>{
            setSpinning(false);
        })
    },[noticeEmail.languagesId,noticeEmail.useLanguagesId])
    
    return (
        <Scoped>
            <App>
            {isSkeleton?<SkeletonCard />:<Spin spinning={spinning} indicator={<LoadingOutlined spin />}>
                <Header spinning={spinning} setSpinning={setSpinning} />
                <Flex style={{marginTop:"12px",height:"calc(100vh - 72px)"}}>
                    <Left />
                    <Main />
                    <Right />
                </Flex>
            </Spin>}
            </App>
        </Scoped>
    )
}
export default observer(Notification);

const Scoped = styled.div`
    background-color: #eaedf1;
    height: 100vh;
`