import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

/**
 * 富文本编辑器
 */
const RichTextEditor = ({ product, setProduct }) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setProduct({ ...product, content: editorRef.current.getContent() });
        }
    };

    return (
        <>
            <Editor
                onChange={log}
                tinymceScriptSrc={
                    process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'
                }
                onInit={(evt, editor) => (editorRef.current = editor)}
                // 初始化配置项
                init={{
                    // selector: 'input',
                    height: 500,

                    // 不显示标题栏
                    menubar: false,
                    // 不显示状态栏
                    statusbar: false,

                    // 主题
                    skin: 'oxide',

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

                    // 语言
                    language_url: '/tinymce/langs/zh-Hans.js',
                    language: 'zh-Hans',
                    content_langs: [
                        {
                            title: 'Chinese',
                            code: 'zh-Hans',
                        },
                    ],

                    // 工具栏是否换行
                    toolbar_mode: 'wrap',
                    // 工具栏
                    toolbar:
                        'undo redo | blocks fontsize | ' +
                        'bold italic strikethrough underline removeformat | forecolor backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'lineheight bullist numlist outdent indent | ' +
                        'link image imageupload media table | ' +
                        'blockquote hr code superscript subscript | fullscreen ',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
};

export default RichTextEditor;
