import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './Header';
import Left from './Left/Left';
import { Flex, Spin } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import editor from '@/store/theme/editor';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { useSearchParams } from 'react-router-dom';
import { getTemplatePage, installedSections, languageSchema, settingsSections, templateInfo } from '@/services/y2/api';
import GlobalSettingsRight from './Right/GlobalSettingsRight/GlobalSettingsRight';
import ApplicationRight from './Right/ApplicationRight';
import ComponentRight from './Right/ComponentRight/ComponentRight';
import { addLocale, useIntl } from '@umijs/max';
import { useAbortController } from '@/hooks/customHooks';

function Editor() {

    const [searchParams, setSearchParams] = useSearchParams();

    const templateId = searchParams.get("templateId");
    const languagesId = searchParams.get("languagesId");
    const templateName = searchParams.get("templateName");
    const preview = searchParams.get("preview");

    const intl = useIntl();

    const { createAbortController } = useAbortController();

    const [navigationData,setNavigationData] = useState<any[]>([]);

    const [isLoading,setIsLoading] = useState(false);

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

    // 页面
    const getInstalledSections = async ()=>{
      try {
        const signal = createAbortController();
        const installData = await installedSections({
          oseid: "",
          themeId: templateId??"",
          pageName: templateName??'templates/index.json',
          mode: editor.mode,
          languages_id:editor.languagesId,
        },signal);
        if(installData.code == "SUCCESS"){
          editor.setTemplateData(installData.data.sections)
        }
      } catch (error) {
        console.error('Failed to add page:', error);
      }
    }

    // 全局设置
    const getSettingsSections = async ()=>{
      try{
        const signal = createAbortController();
        const settingsData = await settingsSections({
          mode: editor.mode,
          themeId: templateId??"",
          action:"get",
          languages_id:editor.languagesId,
        },signal)
        if(settingsData.code == "SUCCESS"){
          editor.setSettings(settingsData.data);
        }
      }catch (error) {
        console.error('Failed to add settings:', error);
      }
    }

    // 语言 
    const getLanguageSchema = async ()=>{
      setIsLoading(true)
      // 动态加载语言包
      const loadAntdLocale = await import(`antd/es/locale/${intl.locale.replace('-','_')}`);
      try {
        const signal = createAbortController();
        const languageSchemaData = await languageSchema({
          mode: editor.mode,
          themeId: templateId??"",
          language: (intl as any)?.momentLocale == "zh-cn"?"zh-hans-cn":(intl as any)?.momentLocale == "zh-tw"?"zh-hant-tw":(intl as any)?.momentLocale
        },signal)
        if(languageSchemaData.code == "SUCCESS"){
          // 将嵌套对象扁平化后再添加到语言包中
          const flattenedSections = flattenObject(languageSchemaData.data.schema);
          // 添加多语言 使用setTimeout确保在组件完全挂载后执行
          setTimeout(() => {
            try {
              addLocale(intl.locale,flattenedSections,
              {
                momentLocale: (intl as any)?.momentLocale,
                antd: loadAntdLocale,
              });
            } catch (error) {
              console.error('Failed to add locale:', error);
            }
          }, 0);
        }
      } catch (error) {
        console.error('Failed to add locale:', error);
      }finally{
        setIsLoading(false)
      }
    }

    // 模板信息
    const getTemplateInfo = async ()=>{
      try{
        const signal = createAbortController();
        const templateInfoData = await templateInfo({
          template_id: templateId??"",
          languages_id:editor.languagesId,
        },signal)
        if(templateInfoData.code == "SUCCESS"){
          editor.setTemplateInfo({
            themeName: templateName,
            ...templateInfoData.data
          })
        }
      }catch (error) {
        console.error('Failed to add templateInfo:', error);
      }
    }

    // 导航信息
    const getNavigationData = async ()=>{
      try{
        const signal = createAbortController();
        const pages = await getTemplatePage({
          themeId: templateId || "",
          languages_id: editor.languagesId,            
        },signal);
        if(pages.code == 0){
          const newNavigationData = pages.data.list;
          setNavigationData(newNavigationData);
        }
      }catch (error) {
        console.error('Failed to add templateInfo:', error);
      }
    }

    // 初始化
    const init = async ()=>{
      document.body.style.height = "100vh !important";
      try {
        // 等待所有初始化函数执行完毕
        await Promise.all([
          getInstalledSections(),
          getSettingsSections(),
          getLanguageSchema(),
          getTemplateInfo(),
          getNavigationData(),
        ]);
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        // 重置
        editor.reset();
        setIsSkeleton(false);
      }
    }

    // 店铺相关
    const ShopInfo = async ()=>{
      try {
        setIsLoading(true)
        // 等待所有初始化函数执行完毕
        await Promise.all([
          getInstalledSections(),
          getSettingsSections(),
          getTemplateInfo(),
          getNavigationData(),
        ]);
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        setIsLoading(false)
      }
    }
    
    // 监听模板
    useEffect(() => {
      init();
    }, [templateName])

    // 国际语言切换
    const isFirstLoad = useRef(true);
    useMemo(() => {
      // 首次加载不执行语言切换逻辑
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return;
      }
      getLanguageSchema();
    }, [intl.locale]);

    const isFirstLanguages = useRef(true);
    // 当店铺语言切换
    useMemo(() => {
      // 首次加载不执行语言切换逻辑
      if (isFirstLanguages.current) {
        isFirstLanguages.current = false;
        return;
      }
      ShopInfo();
    }, [editor.languagesId])

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
      {isSkeleton?<SkeletonCard />:<Spin spinning={isLoading}>
        <Header templateId={templateId??""} templateName={templateName??"templates/index.json"} nvData={navigationData} />
        <Flex>
          {/* left */}
          <div className="left">
            <Left />
          </div>
          <div className="center">
            <div className="viewBox">
              <iframe ref={iframeRef} src={`https://store.matacart.com/?templateId=${templateId}&page=index`} width="100%" height="100%" style={{border:"0"}} />
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
      </Spin>}
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