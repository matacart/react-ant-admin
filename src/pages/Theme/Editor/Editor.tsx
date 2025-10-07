import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Left from './Left/Left';
import { Flex, Spin } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import editor from '@/store/theme/editor';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { useSearchParams } from 'react-router-dom';
import { installedSections, languageSchema, settingsSections, templateInfo } from '@/services/y2/api';
import GlobalSettingsRight from './Right/GlobalSettingsRight/GlobalSettingsRight';
import ApplicationRight from './Right/ApplicationRight';
import ComponentRight from './Right/ComponentRight/ComponentRight';

// 全局设置
import zhCN from 'antd/es/locale/zh_CN';
import { addLocale } from '@umijs/max';

function Editor() {

    const [searchParams, setSearchParams] = useSearchParams();

    const templateId = searchParams.get("templateId");
    const languagesId = searchParams.get("languagesId");
    const templateName = searchParams.get("templateName");
    const preview = searchParams.get("preview");

    const [isSkeleton,setIsSkeleton] = useState(true);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    // 将多语言对象转换为扁平键值对的函数
    function flattenObject(obj: any, prefix = ''): Record<string, string> {
      let flattened: Record<string, string> = {};
      
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = prefix ? `${prefix}.${key}` : key;
          
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            // 递归处理嵌套对象
            Object.assign(flattened, flattenObject(obj[key], newKey));
          } else {
            // 直接添加键值对
            flattened['t:'+newKey] = obj[key];
          }
        }
      }
      return flattened;
    }

    // 初始化
    async function installed(){
      document.body.style.height = "100vh !important";
      // 页面设置
      try {
        const installData = await installedSections({
          mode: "auto",
          oseid: "",
          themeId: templateId??"",
          pageName: templateName??'templates/index.json'
        });
        if(installData.code == "SUCCESS"){
          editor.setTemplateData(installData.data.sections)
        }
      } catch (error) {
        console.error('Failed to add page:', error);
      }

      // 全局设置
      try{
        const settingsData = await settingsSections({
          mode: "auto",
          themeId: templateId??"",
          action:"get"
        })
        if(settingsData.code == "SUCCESS"){
          editor.setSettings(settingsData.data);
        }
      }catch (error) {
        console.error('Failed to add settings:', error);
      }

      // 语言
      try {
        const languageSchemaData = await languageSchema({
          mode: "auto",
          themeId: templateId??"",
          language: "zh-hans-cn"
        })
        if(languageSchemaData.code == "SUCCESS"){
          // 将嵌套对象扁平化后再添加到语言包中
          const flattenedSections = flattenObject(languageSchemaData.data.schema);
          // 添加多语言 使用setTimeout确保在组件完全挂载后执行
          setTimeout(() => {
            try {
              addLocale("zh-CN",flattenedSections,
              {
                momentLocale: 'zh-cn',
                antd: zhCN,
              });
            } catch (error) {
              console.error('Failed to add locale:', error);
            }
          }, 0);
        }
      } catch (error) {
        console.error('Failed to add locale:', error);
      }

      // 模板信息
      try{
        const templateInfoData = await templateInfo({
          template_id: templateId??"",
        })
        if(templateInfoData.code == "SUCCESS"){
          console.log("主题信息",templateInfoData);
        }
      }catch (error) {
        console.error('Failed to add templateInfo:', error);
      }

      // 重置
      editor.reset();
      editor.setTemplateInfo({
        templateId:templateId??"",
        templateName:templateName??""
      })

      setIsSkeleton(false);
    }

    useEffect(() => {
      installed();
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
        <Header templateId={templateId??""} templateName={templateName??"templates/index.json"} />
        <Flex>
          {/* left */}
          <div className="left">
            <Left />
          </div>
          <div className="center">
            <div className="viewBox">
              {/* <iframe ref={iframeRef} src={`/theme/preview?templateId=${templateId}&page=index`} width="100%" height="100%" style={{border:"0"}} /> */}
            </div>
          </div>
          {/* right */}
          <div className="right">
            <div style={{ display: editor.toolBar == 0 ? 'block' : 'none' }}>
              <ComponentRight />
            </div>
            <div style={{ display: editor.toolBar == 1 ? 'block' : 'none' }}>
              <GlobalSettingsRight />
            </div>
            <div style={{ display: editor.toolBar == 2 ? 'block' : 'none' }}>
              <ApplicationRight />
            </div>
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