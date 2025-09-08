import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Left from './Left/Left';
import Right from './Right.tsx/Right';
import { Flex, Spin } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import home from "./data/InstalledSections/home.json"
import editor from '@/store/theme/editor';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { useSearchParams } from 'react-router-dom';


function Editor() {

    const [searchParams, setSearchParams] = useSearchParams();

    const templateId = searchParams.get("templateId");

    const [isSkeleton,setIsSkeleton] = useState(true);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
      // 获取组件数据
      document.body.style.height = "100vh !important";
        editor.setTemplateData(home.data);
        setIsSkeleton(false);
    }, [])

    const [iframeReady, setIframeReady] = useState(false);

    // 监听iframe就绪消息
    useEffect(() => {
      function handleMessage(event: MessageEvent) {
        if (event.data.type === 'IFRAME_READY') {
          setIframeReady(true);
          console.log("准备通讯");
        }
      }
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);

    useEffect(() => {
      // 更新组件数据
      if(!isSkeleton && editor.templateData && iframeRef.current && iframeReady){
        const data = toJS(editor.templateData);
        iframeRef.current.contentWindow?.postMessage({
          type: 'TEMPLATE_DATA',
          data: data
        }, '*');
      }
    }, [editor.templateData,iframeReady])

    return <Scoped>
      <GlobalStyle />
      {/* header */}
      {isSkeleton?<SkeletonCard />:<>
        <Header />
        <Flex>
          {/* left */}
          <div className="left">
            <Left />
          </div>
          <div className="center">
              <div className="viewBox">
                <iframe ref={iframeRef} src={`/theme/preview?templateId=${templateId}&page=index`} width="100%" height="100%" style={{border:"0"}} />
              </div>
          </div>
          {/* right */}
          <div className="right">
              <Right />
          </div>
        </Flex>
      </>}
    </Scoped>
}

// 修改全局样式
const GlobalStyle = createGlobalStyle`
    body {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
      font-size: 14px;
      height: 100vh !important;
      overflow: hidden;
    }
`;


const Scoped = styled.div`

  .left{
    width: 372px;
    height: 100%;
  }
  .center{
    flex: 1;
    box-sizing: border-box;
    .viewBox{
        margin: 16px;
        background-color: #FFF;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, .1), 0 4px 20px 0 rgba(0, 0, 0, .15);
        height: calc(100% - 32px);
        .ant-spin-nested-loading{
            height: 100%;
            .ant-spin-container{
                height: 100%;
            }
        }
    }
  }
  .right{
    width: 320px;
    height: 100%;
  }
`;

export default observer(Editor);