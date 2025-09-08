import { useIntl } from "@/.umi/plugin-locale/localeExports"
import { EditorBlogIcon, EditorCarouselImgIcon, EditorCollectionListIcon, EditorFeaturedCollectionIcon, EditorFeaturedProductIcon, EditorIconListIcon, EditorMultilevelFilterIcon, EditorRichTextIcon, EditorShoppableImageIcon, EditorSignUpAndSaveIcon, EditorTextImgIcon, EditorVideoIcon } from "@/components/Icons/Icons"
import { Flex } from "antd"
import { ReactNode, useEffect, useRef, useState } from "react"
import styled from "styled-components"


type schemaType = {
    name:string,
    presets:any[],
}

type childrenType = {
    key: string,
    schema:schemaType,
    type:string
}

type simpleCustomMenuType = {
    groupTitle:string,
    children:childrenType[]
}

type simpleCustomMenuProps = {
    items:simpleCustomMenuType[]
}

function SimpleCustomMenu({items}:simpleCustomMenuProps){

    const intl = useIntl();

    // 添加状态来跟踪 iframe 内容高度
    const [iframeHeight, setIframeHeight] = useState<number>(0);

    // 添加状态来跟踪选中的菜单项
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // 监听 iframe 加载完成并发送消息
    const handleIframeLoad = (type:string) => {
        if (iframeRef.current) {
            // 向 iframe 内部发送消息，指示需要显示的组件
            iframeRef.current.contentWindow?.postMessage({
                type: 'SCROLL_TO_COMPONENT',
                componentType:type
            }, '*');
        }
    };

    const handleMouseEnter = (id:string)=>{
        handleIframeLoad(id)
    }

    // 监听来自 iframe 的消息
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {

            // 确保消息来自正确的源
            if (event.data.type === 'IFRAME_CONTENT_HEIGHT') {
                console.log(event.data);
                // 根据内容高度和缩放比例计算实际高度
                const scaledHeight = event.data.height;
                setIframeHeight(scaledHeight);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <Scoped iframeHeight={iframeHeight}>
            <div className="menu">
                {items.map((item:simpleCustomMenuType,index)=><div key={index}>
                        <div className="menu-group-title">
                            {item.groupTitle}
                        </div>
                        {item.children.map((child:childrenType,dataIndex:number)=>{
                            return(
                                <Flex key={child.key} gap={8} align="center" className="menu-group-item" onMouseEnter={()=>handleMouseEnter(child.type)}>
                                    {   
                                        (   
                                            child.type == "text-columns-with-image" || 
                                            child.type == "multi-media-splicing" || 
                                            child.type == "picture-promotion" ||
                                            child.type == "picture-floating" ||
                                            child.type == "image-with-text" ||
                                            child.type == "image-banner" ||
                                            child.type == "text-with-image" ||
                                            child.type == "collection-list-new" ||
                                            child.type == "featured-recommend-products" ||
                                            child.type == "product-recently-viewed" ||
                                            child.type == "count-down" ||
                                            child.type == "contact-form" ||
                                            child.type == "collapsible-content" ||
                                            child.type == "dividing-line" ||
                                            child.type == "spacing" ||
                                            child.type == "custom-html" ||
                                            child.type == "custom-page"
                                        ) ? <EditorTextImgIcon className="font-24" /> :
                                        child.type == "slideshow" ? <EditorCarouselImgIcon className="font-24" /> : 
                                        child.type == "rich-text" ? <EditorRichTextIcon className="font-24" /> :
                                        child.type == "featured-slideshow" ? <EditorRichTextIcon className="font-24" /> :
                                        child.type == "video" ? <EditorVideoIcon className="font-24" /> :
                                        child.type == "multilevel-filter" ? <EditorMultilevelFilterIcon className="font-24" /> :
                                        child.type == "collection-list" ? <EditorCollectionListIcon className="font-24" /> :
                                        child.type == "featured-collection" ? <EditorFeaturedCollectionIcon className="font-24" /> :
                                        child.type == "featured-product" ? <EditorFeaturedProductIcon className="font-24" /> :
                                        child.type == "shoppable-image" ? <EditorShoppableImageIcon className="font-24" /> :
                                        child.type == "sign-up-and-save" ? <EditorSignUpAndSaveIcon className="font-24" /> :
                                        child.type == "icon-list" ? <EditorIconListIcon className="font-24" /> :
                                        child.type == "blog" ? <EditorBlogIcon className="font-24" /> :
                                        child.type == "picture-floating" ? <EditorTextImgIcon className="font-24" /> : <></>
                                    }
                                    <div className="menu-group-item-text">{intl.formatMessage({id: child.schema.name})}</div>
                                </Flex>
                            )
                        })}
                    </div>
                )}
            </div>
            <Flex className="menu-preview" align="center" justify="center">
                <iframe ref={iframeRef} src={`/theme/preview?themeId=10011&page=index`} width="1330px" />
            </Flex>
        </Scoped>
    )
}

const Scoped = styled.div<{ iframeHeight: number }>`
    display: flex;
    height: 100%;
    .menu{
        width: 240px;
        height: 100%;
        overflow-y: auto;
        &-group-title{
            padding: 8px 12px;
            font-size: 12px;
            color: #474F5E;
        }
        &-group-item{
            padding: 8px 12px;
            font-size: 14px;
            color: #474F5E;
            cursor: pointer;
            &:hover{
                background: #F5F5F5;
            }
        }
    }

    .menu-preview{
        flex: 1;
        padding: 16px;
        background-color: #f7f8fb;
        position: relative;
        /* 高度 */
        /* 偏移量 */
        iframe{
            height: ${props => props.iframeHeight}px;
            width: 1330px;
            position: absolute;
            background-color: #fff;
            border: none;
            border-radius: 4px;
            box-shadow: 0 1px 4px 0 #00000029;
            max-height: 1600px;
            overflow-y: auto;
            pointer-events: none;
            z-index: 99;
            transform: scale(.286) translate(0,0);

        }
    }

`


export default SimpleCustomMenu;