import { Flex } from "antd"
import styled from "styled-components"
import noticeEmail, { settingType } from "@/store/settings/notification/noticeEmail";
import { useEffect, useRef, useState } from "react";
import DataSource from "./DataSource";

function VariableInputText({setting,data,setSections,variables,rightRef}:{setting:settingType,data:any,setSections:(id:string,value:any)=>void,variables:any,rightRef:any}) {
    
    // 旧的变量key
    const oldKey = useRef<string>("");

    // 替换的元素
    const replacingElementRef = useRef<HTMLElement | null>(null);

    // 动态源组件引用
    const dataSourceRef = useRef<{ openWithValue: (key: string) => void }>(null);

    // 光标位置
    const [cursorPosition, setCursorPosition] = useState(0);

    // 可编辑区域引用
    const editableRef = useRef<HTMLDivElement>(null);

    const [value,setValue] = useState<string>("");

    // 转换 {{变量名}} 为 【动态源名称】 格式
    const replaceVariables = (str:string) => {
        let displayValue = str;
        const usableVariable = noticeEmail.templateConfig?.usableVariable || [];
        // 遍历所有可用变量，将 {{变量名}} 替换为动态源名称
        usableVariable.forEach((item:any) => {
            const regex = new RegExp(`\\{\\{metafields\\.${item.key}\\}\\}`, 'g');
            displayValue = displayValue.replace(regex, `<div data-key="${item.key}" contentEditable="false" class="variable-item-box"><span class="variable-item">${item.name}</span>
                <div class="mf-item-box">
                    <div class="mf-item mf-item-change">更换动态源</div>
                    <div class="mf-item mf-item-del">删除动态源</div>
                </div>
            </div>`);
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

    // 设置变量 根据光标位置插入变量
    const setVariable = (key:string)=>{
        if(oldKey.current && replacingElementRef.current && editableRef.current){
            // 替换旧变量 为新变量 
            // 1. 生成新变量的 HTML
            const newVariableHtml = replaceVariables(`{{metafields.${key}}}`);
            // 2. 解析成 DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(newVariableHtml, 'text/html');
            const newElement = doc.body.firstChild as HTMLElement;
            // 3. 替换 DOM
            replacingElementRef.current.parentNode?.replaceChild(newElement, replacingElementRef.current);
            // 4. 更新 value
            const currentValue = reverseReplaceVariables(editableRef.current.innerHTML);
            setValue(currentValue);
            setSections(setting.id, { value: currentValue });
        }else{
            // 插入新变量
            // 插入变量到光标位置 -- start != end 时，选中的文本会被变量替换掉
            if (!editableRef.current) return;
            const variable = `{{metafields.${key}}}`;
            const newValue = value.substring(0, cursorPosition) + variable + value.substring(cursorPosition);
            editableRef.current.innerHTML = replaceVariables(newValue);
            setValue(newValue);
            // 更新光标位置
            setCursorPosition(cursorPosition + variable.length);
            // 更新内容
            setSections(setting.id, {value: newValue});
        }
        // 清空
        replacingElementRef.current = null;
        oldKey.current = "";
    }

    // 同步显示层内容到隐藏值 当用户输入或失去焦点时触发
    const onChange = (e: React.FormEvent<HTMLDivElement>)  => {
        const target = e.currentTarget as HTMLElement;
        let displayValue = target.innerHTML;
        // 清空显示层时，浏览器内部可能仍有 <br> 标签，需要手动删除
        if (displayValue === '<br>' && editableRef.current) {
            editableRef.current.innerHTML = "";
            displayValue = "";
        }
        // 将 【动态源名称】 替换为 {{变量名}} 格式
        displayValue = reverseReplaceVariables(displayValue);
        // 同步到隐藏值 -- 
        setValue(displayValue);
        // 更新内容
        setSections(setting.id, {value: displayValue});
    };


    // 根据contentEditable中的range计算纯文本中的光标位置
    // - 遇到变量元素 .variable-item-box → 加上 {{key}} 的长度
    // - 遇到普通文本节点 → 加上文本长度
    // - 遇到其他 contentEditable="false" 元素 → 跳过
    const getTextOffset = (range: Range, editable: HTMLElement): number => {
        let textOffset = 0;
        const processNode = (node: Node): boolean => {
            if (node === range.startContainer) {
                textOffset += range.startOffset;
                return true;
            }
            if (node.nodeType === Node.TEXT_NODE) {
                textOffset += (node as Text).length;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as HTMLElement;
                if (el.classList?.contains('variable-item-box')) {
                    const key = el.getAttribute('data-key');
                    textOffset += key ? `{{metafields.${key}}}`.length : 0;
                } else if (el.contentEditable !== "false") {
                    for (const child of Array.from(el.childNodes)) {
                        if (processNode(child)) return true;
                    }
                }
            }
            return false;
        };
        
        for (const child of Array.from(editable.childNodes)) {
            if (processNode(child)) break;
        }
        
        return textOffset;
    };

    // handleBlur 失去焦点时触发 更新光标位置
    const handleBlur = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0 && editableRef.current) {
            const range = selection.getRangeAt(0);
            const textOffset = getTextOffset(range, editableRef.current);
            setCursorPosition(textOffset);
        }else{
            // 不在区域内，将光标位置设置为文本长度
            setCursorPosition(value.length);
        }
    }

    
    useEffect(()=>{
        setValue(data.value || setting?.default || "");
        // 同步到显示层
        if (editableRef.current) {
            editableRef.current.innerHTML = replaceVariables(data.value || "");
        }

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // 更换动态源
            if(target.classList.contains('mf-item-change')){
                e.stopPropagation();
                const variableBox = target.closest('.variable-item-box') as HTMLElement;
                if (variableBox) {
                    replacingElementRef.current = variableBox;  // 保存DOM引用
                    const key = variableBox.getAttribute('data-key');
                    oldKey.current = key || "";
                    dataSourceRef.current?.openWithValue(key || "");
                }
                // TODO: 执行更换动态源的逻辑
                return;
            }

            // 删除动态源
            if (target.classList.contains('mf-item-del')) {
                e.stopPropagation();
                // TODO: 执行删除动态源的逻辑
                const variableBox = target.closest('.variable-item-box');
                const key = variableBox?.getAttribute('data-key');
                if (key && editableRef.current) {
                    // 1. 从显示层移除变量元素
                    variableBox?.remove();
                    // 2. 从隐藏 input 中获取当前 value
                    const inputEl = editableRef.current.parentElement?.querySelector('.cloudframe-input') as HTMLInputElement;
                    const currentValue = inputEl?.value || '';
                    const newValue = currentValue.replace(`{{metafields.${key}}}`, '');
                    setValue(newValue);
                    // 更新 同步到父组件
                    setSections(setting.id, {value: newValue});
                }
                return;
            }

            const variableItem = target.closest('.variable-item');
            // 点击了动态源按钮
            if (variableItem) {
                const box = variableItem.nextElementSibling as HTMLElement;
                if (box?.classList.contains('mf-item-box')) {
                    // 关闭其他动态源选择框
                    const mfItemBoxes = document.querySelectorAll('.mf-item-box');
                    mfItemBoxes.forEach(b => {
                        b.classList.remove('show');
                    });
                    // 切换显示状态
                    box.classList.toggle('show');
                    
                }
            }
            // 点击其它地方关闭所有动态源选择框
            if (!variableItem && !target.classList.contains('variable-item')) {
                const mfItemBoxes = document.querySelectorAll('.mf-item-box');
                mfItemBoxes.forEach(box => box.classList.remove('show'));
            }
        };
        // 点击事件监听
        const editable = editableRef.current;
        editable?.addEventListener('click', handleClick);

        // 点击外部关闭所有弹窗（新增）
        const handleOutsideClick = (e: MouseEvent) => {
            if (editable && !editable.contains(e.target as Node)) {
                const mfItemBoxes = editable.querySelectorAll('.mf-item-box.show');
                mfItemBoxes.forEach(box => box.classList.remove('show'));
            }
        };
        document.addEventListener('click', handleOutsideClick);
        // 组件卸载时移除事件监听
        return () => {
            editable?.removeEventListener('click', handleClick);
            document.removeEventListener('click', handleOutsideClick);
        };
    },[]);
    
    return (
        <Scoped>
            <Flex className="title" justify="space-between">
                <div className="font-14 color-474F5E">{setting.label}</div>
                {rightRef && variables && <DataSource ref={dataSourceRef} variables={variables} setVariable={setVariable} rightRef={rightRef} />}
            </Flex>
            {/* 变量文本域 */}
            <>
                <input
                    type="hidden"
                    className="cloudframe-input"
                    value={value}
                />
                {/* 可编辑的显示层 */}
                <div
                    ref={editableRef}
                    className={`variable-textarea`}
                    // className={`variable-textarea`}
                    data-placeholder={setting?.placeholder || ""}
                    contentEditable={true}
                    onInput={onChange}
                    onBlur={handleBlur}
                >
                </div>
            </>
        </Scoped>
    )
}

export default VariableInputText

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
    .variable-limit{
        font-size: 12px;
        color: #b8becc;
        text-align: right;
    }
    .limit-exceeded{
        color: #FF4D4F;
    }
    .variable-textarea {
        background-color: #fff;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        box-sizing: border-box;
        color: #474f5e;
        display: block;
        font-size: 14px;
        line-height: 24px;
        min-height: 36px;
        outline: none;
        padding: 8px 12px;
        width: 100%;
        white-space: pre-wrap;
        word-break: break-all;
        &:focus {
            border-color: #356DFF;
        }
        &:hover {
            border-color: #356DFF;
        }

        &:empty:before {
            color: #b8becc;
            content: attr(data-placeholder);
            cursor: text;
        }

        .variable-item-box{
            display:inline-flex;
            align-items:center;
            font-size:12px;
            height:22px;
            padding:0 2px;
            position:relative;
            z-index: 2;
            .variable-item{
                height:100%;
                padding:0 4px;
                cursor: pointer;
                background: #f0f3f9;
                z-index: 2;
            }
            .mf-item-box{
                display: none;
                flex-direction: column;
                position: absolute;
                background-color: #fff;
                border: 1px solid #d7dbe7;
                border-radius: 4px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                -ms-border-radius: 4px;
                -o-border-radius: 4px;
                left: 0;
                top: 100%;
                z-index: 22;
                min-width: 60px;
                padding: 8px 0;
                .mf-item{
                    color: #474f5e;
                    cursor: pointer;
                    display: block;
                    font-size: 14px;
                    height: 28px;
                    line-height: 28px;
                    padding: 0 10px;
                    text-align: center;
                    white-space: nowrap;
                    &:hover{
                        background-color: #f0f7ff;
                    }
                }
                &.show{
                    display: flex;
                }
            }
        }
    }
`
