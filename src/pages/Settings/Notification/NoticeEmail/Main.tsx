import styled from "styled-components"
import noticeEmail from '@/store/settings/notification/noticeEmail';
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import cookie from 'react-cookies';
import { getPrimaryDomain } from "@/utils/dataStructure";

function Main({setSpinning}:{setSpinning:(spinning:boolean)=>void}) {

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // 预览域名
    const previewDomain = getPrimaryDomain();

    // 获取预览 url
    const getPreviewUrl = () => {
        // 模拟数据
        const domain = cookie.load('domain');

        return `${previewDomain}/pigeon/editor/preview?languages_id=${noticeEmail.languagesId}&template_code=${noticeEmail.templateCode}&oseid=${noticeEmail.oseId}&store_name=${domain?.store_name || ''}&store_general_name=${domain?.store_name || ''}&store_logo=${domain?.store_logo || ''}&store_general_logo=${domain?.store_logo || ''}&store_email=matacart@email.com&store_custom_email=matacart@email.com`;
        // return `http://localhost:3000/pigeon/editor/preview?languages_id=${noticeEmail.languagesId}&template_code=${noticeEmail.templateCode}&oseid=${noticeEmail.oseId}&store_name=${domain?.store_name || ''}&store_general_name=${domain?.store_name || ''}&store_logo=${domain?.store_logo || ''}&store_general_logo=${domain?.store_logo || ''}&store_email=matacart@email.com&store_custom_email=matacart@email.com`;
    };

    // 监听 sections 店铺语言 template_code
    useEffect(()=>{
        if(!iframeRef.current){
            return;
        }
        setSpinning(true);
        iframeRef.current.src = getPreviewUrl();
        iframeRef.current!.onload = () => {
            setSpinning(false);
        };
    }, [noticeEmail.lastSavedAt,noticeEmail.languagesId,noticeEmail.templateCode,noticeEmail.oseId]);

    return (
        <Scoped $device={noticeEmail.device}>
            <div className="preview">
                <iframe 
                    ref={iframeRef} 
                    width="100%" 
                    height="100%" 
                    style={{ border:"0"}}
                />
            </div>
        </Scoped>
        
    )
}
export default observer(Main);


const Scoped = styled.div<{$device: 'pc'|'mobile'}>`
    flex: 1;
    display: flex;
    justify-content: center;
    height: calc(100% - 12px);
    .preview{
        position: relative;
        height: 100%;
        background-color: #fff;
        width: ${props=>props.$device === 'mobile' ? '375px' : '100%'};
        .ant-spin-nested-loading{
            height: 100%;
            .ant-spin-container{
                height: 100%;
            }
        }
    }
    
`