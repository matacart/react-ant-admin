import React, { useRef } from 'react';  
import { Editor } from '@tinymce/tinymce-react';  
import oldStore from '@/store/oldStore';

  
// 假设这是TinyMCE实例的正确类型，您可能需要从@tinymce/tinymce-react包中导入它  
// 如果包没有直接导出类型，您可能需要自己定义或使用any作为临时解决方案  
type EditorInstance = any; // 替换为实际的类型  
  
export default function App(prop: any){  
  const editorRef = useRef<EditorInstance>(null); 
  // console.log(prop.prop)
  // 初始化回调函数
  const initData = () => {
    if(oldStore.content1){
      // console.log(oldStore.desc)
      editorRef.current.setContent(oldStore.content1)
    }
  };
  return (  
    <>  
      <Editor  
        tinymceScriptSrc='/tinymce/tinymce.min.js'  
        licenseKey='gpl'
        // 获取内容
        onBlur={()=>{
          prop.prop.content1 = editorRef.current?.getContent()
        }}
        onInit={(_evt, editor) => (editorRef.current = editor)}  
        initialValue=''  
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
          promotion:false, //去除upgrade按钮
          // 
          init_instance_callback:initData
        }}  
      />  
      {/* <button onClick={log}>Log editor content</button>   */}
    </>  
  );  
}