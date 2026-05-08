import { Flex } from "antd"
import styled from "styled-components"
import noticeEmail, { settingType } from "@/store/settings/notification/noticeEmail";
import { useEffect, useRef, useState } from "react";
import DataSource from "./DataSource";
import VariableMinTinyMce from "@/components/MCE/VariableMinTinyMce";


const style=`
    padding: 4px 6px;
    border-radius: 2px;
    border: none;
    margin: 4px;
    background-color: #f0f3f9;
`


// 富文本编辑器 动态源
function VariableRichText({setting,data,setSections,variables,rightRef}:{setting:settingType,data:any,setSections:(id:string,value:any)=>void,variables:any,rightRef:any}) {

    // 转换 {{变量名}} 为 【动态源名称】 格式
    const replaceVariables = (str:string) => {
        if(!str) return "";
        if (typeof str !== 'string') {  // 非字符串
            return "";  // 
        }
        let displayValue = str;
        const usableVariable = noticeEmail.templateConfig?.usableVariable || [];
        // 遍历所有可用变量，将 {{变量名}} 替换为动态源名称
        usableVariable.forEach((item:any) => {
            const regex = new RegExp(`\\{\\{metafields\\.${item.key}\\}\\}`, 'g');
            displayValue = displayValue.replace(regex, `<span data-key="${item.key}" contentEditable="false" style="${style}" class="variable-item-box">${item.name}</span>`);
        });
        return displayValue;
    }
    // 将 【动态源名称】HTML 替换为 {{变量名}} 格式
    const reverseReplaceVariables = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const boxes = doc.querySelectorAll('.variable-item-box');
        boxes.forEach(box => {
            const key = box.getAttribute('data-key');
            if (key) {
                const textNode = doc.createTextNode(`{{metafields.${key}}}`);
                box.parentNode?.replaceChild(textNode, box);
            }
        });
        return doc.body.innerHTML;
    }
    // 富文本编辑器 内容
    const [value,setValue] = useState(replaceVariables(data.value || setting?.default || ""));
    // TinyMCE 组件引用
    const editorRef = useRef<any>(null);
    // 动态源组件引用
    const dataSourceRef = useRef<{ openWithValue: (key: string) => void }>(null);
    // 设置变量 根据光标位置插入变量
    const setVariable = (key:string)=>{
        editorRef.current?.insertContent(replaceVariables(`{{metafields.${key}}}`));
    }

    useEffect(() => {
        // setValue(replaceVariables(newValue));
    }, []);


    return (
        <Scoped>
            <Flex className="title" justify="space-between">
                <div className="font-14 color-474F5E">{setting.label}</div>
                {rightRef && variables && <DataSource ref={dataSourceRef} variables={variables} setVariable={setVariable} rightRef={rightRef} />}
            </Flex>
            {/* TinyMCE 是独立的编辑器 ：它有自己的内部状态，不会完全受 React props 控制 */}
            <VariableMinTinyMce 
                ref={editorRef}
                content={value || ""} 
                setContent={(newValue:string)=>{
                    // 先更新本地状态：TinyMCE 的内部状态
                    setValue(newValue);
                    const pureValue = reverseReplaceVariables(newValue || "");
                    setSections(setting.id, { value: pureValue });
                }}
            />
        </Scoped>
    )
}

export default VariableRichText

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`
