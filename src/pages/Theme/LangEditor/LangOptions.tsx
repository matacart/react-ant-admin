import CancelButton from "@/components/Button/CancelButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { getJsonTemplatesLocale } from "@/services/y2/api";
import langEditor from "@/store/theme/langEditor";
import { SwapOutlined } from "@ant-design/icons";
import { Flex, Modal, Radio } from "antd";
import { useState } from "react";
import styled from "styled-components";
import LangContentCard from "./LangContentCard";
import { customOrder } from "./LangEditor";
import { useAbortController } from "@/hooks/customHooks";


const style: React.CSSProperties = {
    marginTop: 20,
    marginBottom:12,
    maxHeight: 300,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

// 语言选择
const options = [
    { value: 'en', label: '英语' },
    { value: 'zh-hans-cn', label: '简体中文' },
    { value: 'zh-hant-tw', label: '繁体中文' },
    { value: 'de', label: '德语' },
    { value: 'ja', label: '日语' },
    { value: 'fr', label: '法语' },
    { value: 'th', label: '泰语' },
    { value: 'es', label: '西班牙语' },
    { value: 'ru', label: '俄语' },
    { value: 'pt', label: '葡萄牙语（巴西）' },
    { value: 'it', label: '意大利语' },
    { value: 'nl', label: '荷兰语' },
    { value: 'pl', label: '波兰语' },
    { value: 'ko', label: '韩语' },
    { value: 'id', label: '印度尼西亚语' },
    { value: 'ar', label: '阿拉伯语' },
    { value: 'el', label: '希腊语' },
    { value: 'bg', label: '保加利亚语' },
    { value: 'ro', label: '罗马尼亚语' },
    { value: 'hu', label: '匈牙利语' },
    { value: 'lt', label: '立陶宛语' },
    { value: 'vi', label: '越南语' },
    { value: 'ms', label: '马来语' },
    { value: 'sv', label: '瑞典语' },
    { value: 'nb', label: '挪威语（博克马尔语）' },
    { value: 'cs', label: '捷克语' },
    { value: 'fi', label: '芬兰语' },
    { value: 'da', label: '丹麦语' },
    { value: 'lv', label: '拉脱维亚语' },
    { value: 'et', label: '爱沙尼亚语' },
    { value: 'hr', label: '克罗地亚语' },
    { value: 'hi', label: '印地语' },
    { value: 'tr', label: '土耳其语' },
    { value: 'sk', label: '斯洛伐克语' },
    { value: 'sl', label: '斯洛文尼亚语' },
    { value: 'pt-pt', label: '葡萄牙语（葡萄牙）' },
];


function LangOptions({templateId,setItems}:{templateId:string,setItems:(items:any)=>void}) {

    const [open,setOpen] = useState<boolean>(false);

    const [lang,setLang] = useState<string>("");

    const [loading,setLoading] = useState(false);

    const { createAbortController } = useAbortController();

    const confirm = ()=>{
        setLoading(true);
        // 创建 AbortController 信号
        const signal = createAbortController();
        getJsonTemplatesLocale({
            themeId: templateId,
            locale: lang,
            mode: langEditor.mode,
        },signal).then((res)=>{
            if(res.code == "SUCCESS"){
                langEditor.setLang(lang);
                langEditor.setJsonEntity(res.data.data);
                const newItems = Object.entries(res.data.data).map(([key,item]:any)=>{
                    return {
                        key: key,
                        label: <span className="font-w-500 font-16">{key}</span>,
                        children: <LangContentCard tabKey={key} />
                    }
                });
                // 按照自定义顺序排序
                newItems.sort((a, b) => {
                    const indexA = customOrder.indexOf(a.key);
                    const indexB = customOrder.indexOf(b.key);
                    // 如果都在自定义顺序中，按自定义顺序排序
                    if (indexA !== -1 && indexB !== -1) {
                        return indexA - indexB;
                    }
                    // 如果只有 A 在自定义顺序中，A 排在前面
                    if (indexA !== -1) {
                        return -1;
                    }
                    // 如果只有 B 在自定义顺序中，B 排在前面
                    if (indexB !== -1) {
                        return 1;
                    }
                    // 如果都不在自定义顺序中，按字母顺序排序
                    return a.key.localeCompare(b.key);
                });
                setItems(newItems);
            }
        }).catch((err)=>{
            if (err.name !== 'CanceledError') {
                console.log(err)
            }
        }).finally(()=>{
            setOpen(false);
            setLoading(false);
        })
    }

    return (
        <Scoped>
            <Flex onClick={()=>{
                setLang(langEditor.lang);
                setOpen(true);
            }} align="center" gap={4} className="swap font-16 color-356DFF">
                <SwapOutlined className="color-356DFF" />
                <div className="font-w-400">切换</div>
            </Flex>
            <Modal title="选择要编辑的网店语言" width={620} centered open={open} onCancel={()=>setOpen(false)}
            footer={
                <Flex gap={12} justify="flex-end">
                    <CancelButton key="back" onClick={()=>{
                        setOpen(false);
                        // 销毁
                    }} />
                    <PrimaryButton text="确定" loading={loading} onClick={()=>confirm()} />
                </Flex>
            }>
                <div>
                    <Radio.Group
                        style={style}
                        value={lang}
                        onChange={(e)=>{
                            setLang(e.target.value);
                        }}
                        options={options}
                    />

                </div>

            </Modal>
        </Scoped>
    );
}

const Scoped = styled.div`
    .swap{
        margin-left: 8px;
        cursor: pointer;
    }
`;

export default LangOptions;