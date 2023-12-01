import { useRef } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import Intl from '../../locales/Intl';
import { RichTextEditorLanguageMap } from '../../constant/Page';
import { JudgingLanguage } from '../../util/utils';

// state 数据映射
const mapStateToProps = state => {
    const stateLocale = state.page.locale;
    return { stateLocale };
};

/**
 * 富文本编辑器
 */
const RichTextEditor = ({ stateLocale, product, setProduct }) => {
    const { locale, messages } = Intl(JudgingLanguage(stateLocale));
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
                    language: RichTextEditorLanguageMap[locale],
                    // language_url: '/tinymce/langs/zh_HK.js',
                    // content_langs: [
                    //     {
                    //         // title: 'Chinese Traditional, Hong Kong',
                    //         code: 'zh-HK',
                    //     },
                    // ],

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

export default connect(mapStateToProps)(RichTextEditor);
