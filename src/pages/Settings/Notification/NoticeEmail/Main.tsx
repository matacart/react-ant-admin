import styled from "styled-components"
import noticeEmail from '@/store/settings/notification/noticeEmail';
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { i18n } from "@/components/Lang/Lang";

function Main() {

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // 监听 sections 店铺语言 template_code
    useEffect(()=>{
        if(!iframeRef.current){
            return;
        }
        const lang = i18n.find(item=>item.id === noticeEmail.languagesId)?.language_code || 'en';
        const newUrl = `http://localhost:3000/pigeon/editor/preview?lang=${lang}&template_code=${noticeEmail.templateCode}&oseid=${noticeEmail.oseId}`;

        console.log(newUrl);
        iframeRef.current.src = newUrl;
    }, [noticeEmail.sections,noticeEmail.settings,noticeEmail.languagesId,noticeEmail.templateCode,noticeEmail.oseId]);

    return (
        <Scoped $device={noticeEmail.device}>
            <div className="preview">
                {/* <iframe ref={iframeRef} src={`${previewDomain}/${languageCode}/?preview=2&templateName=${templateName}&mode=${editor.mode}&versionId=${editor.versionId}&oseId=${editor.oseId}`} width="100%" height="100%" style={{border:"0"}}/> */}
                <iframe ref={iframeRef} width="100%" height="100%" style={{border:"0"}}/>
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
        background-color: #fff;
        width: ${props=>props.$device === 'mobile' ? '375px' : '100%'};
    }
    
`