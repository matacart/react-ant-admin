import { useEffect, useMemo, useRef, useState } from 'react';
import { Flex, App, Spin } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import editor from '@/store/theme/editor';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { useSearchParams } from 'react-router-dom';
import { getGenerateAuthToken, getTemplatePage, installedSections, languageSchema, settingsSections, templateInfo } from '@/services/y2/api';
import { addLocale, useIntl, useParams } from '@umijs/max';
import { useAbortController } from '@/hooks/customHooks';
import Header from '../Header/Header';
import Left from '../Left/Left';
import ComponentRight from '../Right/ComponentRight/ComponentRight';
import GlobalSettingsRight from '../Right/GlobalSettingsRight/GlobalSettingsRight';
import ApplicationRight from '../Right/ApplicationRight';
import { usePreviewCommunication } from '@/components/Communication/ParentWindowCommunicationManager';
import { v4 as uuidv4 } from 'uuid';
import { getPrimaryDomain } from '@/utils/dataStructure';
import { i18n } from '@/components/Lang/Lang';

function Editor() {
    
    const { message } = App.useApp();

    // 预览域名
    const previewDomain = getPrimaryDomain();
    
    const { templateId = '',versionId ='',languageId = "2",mode = 'mapping' }  = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const title = searchParams.get("title");
    const templateName = searchParams.get("templateName") || "";

    // 前台店铺语言的code
    const [languageCode,setLanguageCode] = useState('en');

    const intl = useIntl();

    const { createAbortController } = useAbortController();

    const [navigationData,setNavigationData] = useState<any[]>([]);

    const [isLoading,setIsLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const templateUpdatePromiseRef = useRef<Promise<any> | null>(null);
    
    // 初始化通信管理器
    const {
      sendToIframe
    } = usePreviewCommunication(iframeRef);

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
    const getInstalledSections = async (templateName:string,languagesId:string,versionId:string,mode:string)=>{
      try {
        const signal = createAbortController();
        const installData = await installedSections({
          oseid: "",
          themeId: templateId??"",
          pageName: templateName??'templates/index.json',
          languages_id:languagesId,
          mode: mode,
          versionId:versionId
        },signal);
        if(installData.code == "SUCCESS"){
          editor.setIsAuthor(installData.data.isAuthor);
          editor.setTemplateData(installData.data.sections)
        }
      } catch (error) {
        console.error('Failed to add page:', error);
      }
    }

    // 全局设置
    const getSettingsSections = async (languagesId:string,versionId:string,mode:string)=>{
      try{
        const signal = createAbortController();
        const settingsData = await settingsSections({
          mode: mode,
          themeId: templateId??"",
          action:"get",
          languages_id:languagesId,
          versionId:versionId
        },signal)
        if(settingsData.code == "SUCCESS"){
          editor.setSettings(settingsData.data);
          editor.setMode(settingsData.data.mode)
        }
        if(settingsData.code == 201){
          message.error(settingsData.msg);
        }
      }catch (error) {
        console.error('Failed to add settings:', error);
      }
    }

    // 语言 
    const getLanguageSchema = async (versionId:string,mode:string)=>{
      setIsLoading(true)
      // 动态加载语言包
      const loadAntdLocale = await import(`antd/es/locale/${intl.locale.replace('-','_')}`);
      try {
        const signal = createAbortController();
        const languageSchemaData = await languageSchema({
          mode: mode,
          themeId: templateId??"",
          versionId:versionId,
          language: i18n.find((item:any)=>item.lang == intl.locale)?.language_code || "en-us",
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
    const getTemplateInfo = async (languagesId:string)=>{
      try{
        const signal = createAbortController();
        const templateInfoData = await templateInfo({
          template_id: templateId??"",
          languages_id:languagesId,
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
          languages_id: languageId,            
        },signal);
        if(pages.code == 0){
          const newNavigationData = pages.data.list;
          setNavigationData(newNavigationData);
        }
      }catch (error) {
        console.error('Failed to add templateInfo:', error);
      }
    }

    // 作者令牌
    const getAuthorToken = async ()=>{
      try{
        const signal = createAbortController();
        const authorTokenData = await getGenerateAuthToken(signal)
        authorTokenData.code == 0 && editor.setAuthorToken(authorTokenData.data.auth_token)
      }catch (error) {
        console.error('Failed to add templateInfo:', error);
      }
    }

    // 初始化
    const init = async ()=>{
      document.body.style.height = "100vh !important";

      const oseId = uuidv4();
      editor.setOseId(`oseid_${oseId}`);

      try {
        // 等待所有初始化函数执行完毕
        await Promise.all([
          getInstalledSections(templateName,languageId,versionId,mode),
          getSettingsSections(languageId,versionId,mode),
          getLanguageSchema(versionId,mode),
          getTemplateInfo(languageId),
          getNavigationData(),
          getAuthorToken(),
        ]);
        editor.setLanguagesId(languageId);
        editor.setVersionId(versionId);
        editor.setMode(mode);
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        // 重置
        // editor.reset();
        setIsSkeleton(false);
      }
    }

    // 店铺相关
    const ShopInfo = async ()=>{
      try {
        setIsLoading(true)
        // 等待所有初始化函数执行完毕
        await Promise.all([
          getInstalledSections(templateName,languageId,versionId,mode),
          getSettingsSections(languageId,versionId,mode),
          getTemplateInfo(languageId),
          getNavigationData(),
        ]);
        editor.setLanguagesId(languageId);
        editor.setVersionId(versionId);
        editor.setMode(mode);
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        setIsLoading(false)
      }
    }
    
    useEffect(() => {
      init();
      return () => {
        // 组件卸载时重置
        editor.reset();
      };
    }, [])

    // 国际语言切换
    useMemo(() => {
      if (isSkeleton) {
        return;
      }
      getLanguageSchema(editor.versionId,editor.mode);
    }, [intl.locale,editor.versionId,editor.mode]);

    // 当店铺语言模式切换
    useMemo(() => {
      // 首次加载不执行语言切换逻辑
      if (isSkeleton) {
        return;
      }
      ShopInfo();
      // 获取语言对应的languageCode
    }, [templateName,languageId,mode,versionId])
  
    // 离开提示
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        if (editor.isSaveData) {
          event.preventDefault();
          return;
        }
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
    
    // 监听editor数据变化并发送到iframe
    useEffect(() => {
      if(isLoading) return;
      const updateAndSend = async () => {
        if (!isSkeleton && iframeRef.current && editor.oseId && editor.component?.id) {
          // 如果有正在进行的 templateUpdate，等待它完成
          if (templateUpdatePromiseRef.current) {
            await templateUpdatePromiseRef.current;
          }
          // 发送模板数据更新
          sendToIframe({
            type: 'TEMPLATE_DATA_UPDATE',
            data: {
              preview:"2",
              templateName:templateName,
              templateId:templateId??"",
              oseId:editor.oseId,
              sectionId:editor.component.id,
              language:languageCode,
              mode:editor.mode,
              versionId:editor.versionId,
              isAuthor:editor.isAuthor?"1":"0",
              authorToken:editor.authorToken,
              timestamp: Date.now()
            }
          });
        }
      }
      updateAndSend();
    }, [editor.templateData, isSkeleton]);
    
    // 监听主题设置变化并发送到iframe
    useEffect(() => {
      if (!isSkeleton && iframeRef.current && editor.oseId) {
        console.log({
          preview:"2",
          templateName:templateName,
          templateId:templateId??"",
          oseId:editor.oseId,
          language:languageCode,
          mode:editor.mode,
          versionId:editor.versionId,
          isAuthor:editor.isAuthor?"1":"0",
          authorToken:editor.authorToken,
          timestamp: Date.now()
        })
        // 发送主题设置更新
        // const newUrl = `http://localhost:3000/${languageCode}/?preview=2&themeId=${templateId}&templateId=${templateId}&mode=${editor.mode}&versionId=${editor.versionId}&oseId=${editor.oseId}&isAuthor=${editor.isAuthor?"1":"0"}&authorToken=${editor.authorToken}&timestamp=${Date.now()}`
        // iframeRef.current.src = newUrl
        // sendToIframe({
        //   type: 'THEME_SETTINGS_UPDATE',
        //   data: {
        //     preview:"2",
        //     templateName:templateName,
        //     templateId:templateId??"",
        //     oseId:editor.oseId,
        //     language:languageCode,
        //     mode:editor.mode,
        //     versionId:editor.versionId,
        //     isAuthor:editor.isAuthor?"1":"0",
        //     authorToken:editor.authorToken,
        //     timestamp: Date.now()
        //   }
        // });
      }
    }, [editor.settings.settingsData, isSkeleton]);


    return <Scoped>
      {/* header */}
      {isSkeleton?<SkeletonCard />:<Spin spinning={isLoading}>
        <Header templateId={templateId??""} previewDomain={previewDomain} nvData={navigationData} />
        <Flex>
          {/* left */}
          <div className="left">
            <Left title={title??"Title"} />
          </div>
          <Flex className="center">
            <div className={editor.isMobile ? 'viewBox_Mobile' : 'viewBox_PC'}>
              {/* 模式和语言切换，iframe 应该重新加载 */}
              <iframe ref={iframeRef} src={`${previewDomain}/${languageCode}/?preview=2&templateName=${templateName}&mode=${editor.mode}&versionId=${editor.versionId}&oseId=${editor.oseId}`} width="100%" height="100%" style={{border:"0"}}/>
              {/* dev模式和语言切换，iframe 应该重新加载 */}
              {/* <iframe ref={iframeRef} src={`http://localhost:3000/${languageCode}/?preview=2&templateName=${templateName}&mode=${editor.mode}&versionId=${editor.versionId}&oseId=${editor.oseId}`} width="100%" height="100%" style={{border:"0"}}/> */}
            </div>
          </Flex>
          {/* right */}
          <div style={{ display: editor.toolBar == 0 ? 'block' : 'none' }}>
            <ComponentRight templateUpdatePromiseRef={templateUpdatePromiseRef} />
          </div>
          <div className='theme' style={{ display: editor.toolBar == 1 ? 'block' : 'none' }}>
            <GlobalSettingsRight />
          </div>
          <div className='application' style={{ display: editor.toolBar == 2 ? 'block' : 'none' }}>
            <ApplicationRight />
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
    width: 352px;
    height: 100%;
  }
  .center{
    flex: 1 1 auto;
    box-sizing: border-box;
    background: #eaedf1;
    .viewBox_PC{
      margin: 16px;
      width: 100%;
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
    .viewBox_Mobile{
      margin: 16px auto;
      width: 375px;
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

  .theme,.application{
    position: fixed;
    left: 52px;
    width: 300px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
  }

  @media only screen and (min-width: 1600px) {
    .theme,.application {
      position: relative;
      left: 0;
      width: 300px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
    }

  }
`;

export default observer(Editor);