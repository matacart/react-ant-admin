import React, { useRef } from 'react';  
import { Editor } from '@tinymce/tinymce-react';  
import axios from 'axios';

// 产品富文本编辑器
  
// 假设这是TinyMCE实例的正确类型，您可能需要从@tinymce/tinymce-react包中导入它  
// 如果包没有直接导出类型，您可能需要自己定义或使用any作为临时解决方案  
type EditorInstance = any; // 替换为实际的类型  

// 过滤emoji
function removeEmojis(str:string) {
  // Regular expression to match emojis.
  // Note: This regex is not exhaustive and may miss some edge cases.
  const emojiRegex = /[\uD83C\uDC00-\uD83C\uDFFF]|[\uD83D\uDC00-\uD83D\uDFFF]|[\u2600-\u27FF]|[\uF000-\uF8FF]|\u200D|\u200E/ug;
  // Replace matched emojis with an empty string.
  return str.replace(emojiRegex, '');
}
  
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
        // 获取内容
        onChange={(e)=>setContent(e.target.getContent())}
        onInit={(_evt, editor) => (editorRef.current = editor)}  
        initialValue={content}
        init={{
          language_url: '/langs/zh_CN.js',
          language: 'zh_CN',
          height: 650,
          min_height: 400, //没内容时的高度
          menubar: false,  // 显示菜单栏
          // 工具栏是否换行
          toolbar_mode: 'wrap',
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
          ],
          toolbar:
          'undo redo | blocks fontsize | ' +
          'bold italic strikethrough underline removeformat | forecolor backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'lineheight bullist numlist outdent indent | ' +
          'link image imageupload media table | ' +
          'blockquote hr code superscript subscript | fullscreen ', 
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          // toolbar_sticky: true,
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
          init_instance_callback:initData
        }}  
      />  
    </>  
  );  
}