import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Flex } from "antd";
import MyInput from "@/components/Input/MyInput";
import { FillLockIcon, FillUserIcon, MenuIcon } from "@/components/Icons/Icons";
import Main from "./Main";
import styled, { createGlobalStyle } from "styled-components";
import AnnouncementBar from "./AnnouncementBar";
import ComponentViewCard from "./ComponentViewCard";
// 获取数据
function View(){

    const vRef = useRef<HTMLDivElement>(null);

    const [previewComponent,setPreviewComponent] = useState(null);

    const [isComponentReady, setIsComponentReady] = useState(false);

    const [templateData,setTemplateData] = useState<any[]>([]);

    // const data = index.data
    function renderTemplate(data:any[]) {
        // 根据接收到的数据更新页面渲染
        // 具体实现取决于你的预览页面结构
        setTemplateData(data)
    }

    useEffect(()=>{
        // if(preview == "1"){
        //     renderTemplate(pageData.data)
        //     return;
        // }
        // 通知父页面 iframe 已准备就绪 可以发送消息
        window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
        function handleMessage(event: MessageEvent) {
            if (event.data.type === 'TEMPLATE_DATA') {
                const newTemplateData = event.data.data;
                renderTemplate(newTemplateData);
            }
            if (event.data.type === 'SCROLL_TO_COMPONENT') {
                // 滚动到对应的位置
                // console.log(event.data);
                setPreviewComponent(event.data)
            }
        }
        // 在 iframe 页面中监听 message 事件
        window.addEventListener('message', handleMessage);
        // 清理函数
        return () => {
            window.removeEventListener('message', handleMessage);
        };

    },[])

    useEffect(()=>{

        let resizeObserver: ResizeObserver | null = null;
        let timeoutId: NodeJS.Timeout | null = null;
        const sendHeight = () => {
            let height = Math.max(
                vRef.current?.offsetHeight || 0,
            );
            console.log(height);
            // console.log(document.body.scrollHeight);
            // console.log(vRef.current?.offsetHeight);
            window.parent.postMessage({
                type: 'IFRAME_CONTENT_HEIGHT',
                height: height+8
            }, '*');
        };
        
        // 当 previewComponent 存在时
        if (previewComponent && vRef.current) {
            // 延迟执行初始高度计算
            console.log(vRef.current?.scrollWidth);
            const timer = setTimeout(() => {
                sendHeight()
            }, 100); 
            return () => clearTimeout(timer);
        }
    },[previewComponent])

    return (
        <Scoped className="view">
            {templateData.length > 0 && (
                <>
                    {/* announcement-bar */}
                    <AnnouncementBar templateData={templateData[0]} />
                    {/* header */}
                    <div className="header-bar">
                        <div style={{padding:"6px 0"}}>
                            <Flex style={{padding:"0 30px"}} align="center">
                                <div style={{flex:1,flexShrink:"0"}}>
                                    <Flex>
                                        <MenuIcon className="font-28" />
                                    </Flex>
                                </div>
                                <div style={{fontSize:"28px",fontWeight:"500"}}>服饰</div>
                                <Flex style={{flex:1,flexShrink:"0"}} justify="flex-end">
                                    <div style={{padding:"20px 20px 20px 0px"}}>
                                        <MyInput style={{width:"280px",height:"38px"}} placeholder="Enter here and click search" />
                                    </div>
                                    <Flex gap={8}>
                                        <FillUserIcon className="font-28" />
                                        <FillLockIcon className="font-28" />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </div>
                    </div>
                    {/* main */}
                    {/* 模板 */}
                    {templateData[2] && <Main templateData={templateData[2]} />}
                    {/* footer */}
                    <div className="footer">
                        <div className="container">
                            <div className="top">
                                <div className="footer-block">
                                    <div className="title">
                                        Menu title
                                    </div>
                                    <div className="content">
                                        <div>Search</div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-block--newsletter" style={{margin:"40px 0",height:"1px"}}>
                            </div>
                            <Flex className="bottom" gap={8}>
                                <div>© 2025</div>
                                <div>服饰</div>
                            </Flex>
                        </div>
                    </div>
                </>
            )}
            {/* shopline-editor */}
            {/* 组件预览 */}
            {previewComponent && (
                <div ref={vRef} style={{overflow:"hidden"}}>
                    <ComponentViewCard componentData={previewComponent} />
                </div>
            )}
        </Scoped>
    )
}


const Scoped = styled.div`
    .footer{
        background-color:rgb(0, 0, 0);
        color:#FFFFFF;
        .container{
            width: 100%;
            max-width: calc(60px + 1760px);
            margin: auto;
            padding: 20px 30px;
            .top{
                display: flex;
                .footer-block{
                    margin-top: 20px;
                    width: 33.3%;
                    text-align: center;
                    .title{
                        font-size: 16px;
                    }
                    .content{
                        div{
                            margin-top: 14px;
                            font-size: 14px;
                        }
                    }
                }
            }
            .bottom{
                font-size: 12px;
            }
        }
    }

`

export default View