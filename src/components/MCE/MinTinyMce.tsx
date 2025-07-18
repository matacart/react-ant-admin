import React, { useRef } from 'react';  
import { Editor } from '@tinymce/tinymce-react';  
import axios from 'axios';
// 假设这是TinyMCE实例的正确类型，您可能需要从@tinymce/tinymce-react包中导入它  
// 如果包没有直接导出类型，您可能需要自己定义或使用any作为临时解决方案  
type EditorInstance = any; // 替换为实际的类型  
  
export default function App({content,setContent}:{content:string,setContent:any}){  
  const editorRef = useRef<EditorInstance>(null); 
  // 初始化回调函数
  const initData = () => {
    editorRef.current?.setContent(content)
  };

  return (  
    <>  
      <Editor  
        tinymceScriptSrc='/tinymce/tinymce.min.js'  
        licenseKey='gpl'
        onChange={(e)=>{
          setContent(e.target.getContent())
        }}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        onEditorChange={(newValue, editor) => {
          // prop.refundPolicyText = editor
        }}
        init={{
            language_url: '/langs/zh_CN.js',
            language: 'zh_CN',
            height: 240, //高度
            menubar: false,  // 显示菜单栏
            // 工具栏是否换行
            toolbar_mode: 'wrap',
            icons: 'thin', // 使用更小的图标
            branding: false,
            // 插件
            plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'preview',
                'wordcount',
                'fontsize',
            ],
            toolbar:
            'bold italic link forecolor bullist |' +
            'fontsize | fullscreen',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

            // images_upload_url:"/api/ApiAppstore/doUploadPic", 
            // 自定义上传文件函数 --- 版本：5.0,  ---优化：自定义插件 添加其它高级设置
            images_upload_handler:async (blobInfo, progress)=>{
                const formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                try {
                const response = await axios.post('/api/ApiAppstore/doUploadPic', formData)
                if (response.data.code === 0) {
                    // console.log(response.data.data.src);
                    return Promise.resolve("https:"+response.data.data.src);
                } else {
                    return Promise.reject(response.data.msg);
                }
                } catch (error) {
                return Promise.reject('上传失败');
                }
            },
            promotion:false, //去除upgrade按钮
            // 
            init_instance_callback:initData,
        }}  
      />  
    </>  
  );  
}