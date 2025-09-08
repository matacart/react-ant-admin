import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function AnnouncementBar({templateData}:{templateData:any}){

    useEffect(()=>{
        console.log(templateData)

        if (announcementRef.current && templateData?.config?.settingsData?.settings?.enable_sticky?.value) {
            // 获取公告栏的实际高度
            const height = announcementRef.current.offsetHeight;
            setPlaceholderHeight(height);
        }
    },[templateData])

    const isSticky = templateData?.config?.settingsData?.settings?.enable_sticky?.value;

    const announcementRef = useRef<HTMLDivElement>(null);

    const [placeholderHeight, setPlaceholderHeight] = useState(0);

    return (
        <>
            <Scoped ref={announcementRef} className="announcement-bar-list" templateStyle={templateData?.config?.settingsData.settings}>
                {templateData?.config?.settingsData.block_order.map((blockOrder:string,index:number)=>{
                    const announcement = templateData?.config.settingsData.blocks[blockOrder]
                    return(
                        <div key={index} className="announcement-bar" dangerouslySetInnerHTML={{ __html: announcement.settings.notice_link_text.value || ''}} style={{fontSize:"12px"}}>
                        </div>
                    )
                })}
            </Scoped>
            {/* 占位符 */}
            {isSticky && <Placeholder style={{ height: `${placeholderHeight}px` }} />}
        </>
        
    )
}

export default AnnouncementBar;

const Scoped = styled.div<{templateStyle:any}>`
    width: 100%;
    position: ${props => props.templateStyle?.enable_sticky?.value ? 'fixed':'static'};
    top: ${props => props.templateStyle?.enable_sticky?.value ? '0':'auto'};
    z-index: ${props => props.templateStyle?.enable_sticky?.value ? '999':'0'};
    .announcement-bar{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:#000000;
        color:#FFFFFF;
        padding-top: ${props => props.templateStyle?.padding_top?.value || '6'}px;
        padding-bottom: ${props => props.templateStyle?.padding_bottom?.value || '6'}px;
        p{
            margin: 0;
        }
    }
`

const Placeholder = styled.div`
    width: 100%;
`;