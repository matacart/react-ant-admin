import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { addLanguages } from "@/services/y2/apiAppstore";
import shopLang, { LanguageType } from "@/store/settings/shopLang/shopLang";
import { App, Checkbox, Flex, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';
import { useSleep } from "@/hooks/customHooks";
import { resetLanguagesList } from "@/utils/common";

function AddLanguage() {

    const [open, setOpen] = useState(false);

    const sleep = useSleep();

    const {message} = App.useApp();
    
    const [loading, setLoading] = useState(false);

    const [languages, setLanguages] = useState<LanguageType[]>([]);

    const [isCheckedAll, setIsCheckedAll] = useState(false);

    // 全选
    const onCheckAllChange = ()=>{
        setLanguages(languages.map(item=>({...item,checked:true})))
        setIsCheckedAll(true)
    }
    // 取消全选
    const CancelCheckAllChange = ()=>{
        setLanguages(languages.map(item=>({...item,checked:false})))
        setIsCheckedAll(false)
    }

    // 取消弹窗
    const handleCancel = () => {
        setOpen(false);
    };

    const handleOK = () => {
        setLoading(true);
        const langs = languages.map((item:LanguageType)=>{
            if(item.checked){
                return{
                    domain_id:cookie.load("domain")?.id,
                    languages_id:item.id,
                    name:item.languageName,
                    code:item.languageCode,
                    language_code:item.languageCode,
                    is_default:"0",
                    sort:"",
                    checked:"1"
                }
            }
        }).filter(item=>item!==undefined)
        addLanguages(langs).then(async res=>{
            setOpen(false)
            await sleep(2000);
            message.success("添加成功");
            shopLang.setRefresh();
            resetLanguagesList();
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false)
        })
    }

    const init = ()=>{
        setOpen(true)
        setIsCheckedAll(false)
        setLanguages([...shopLang.unHasLanguages])
    }

    useEffect(()=>{
        setLanguages([...shopLang.unHasLanguages])
    },[shopLang.unHasLanguages])

    return (
        <>
            <DefaultButton text={'添加语言'} onClick={init} />
            <MyModal 
                title="添加语言" 
                centered 
                open={open} 
                onCancel={handleCancel}
                footer={()=><Flex justify="flex-end" gap={12}>
                    <DefaultButton loading={loading} text={'取消'} onClick={handleCancel} />
                    <PrimaryButton loading={loading} text={'保存'} onClick={handleOK} />
                </Flex>}
            >
                {isCheckedAll?<div className='check_all color-356DFF cursor-pointer' onClick={CancelCheckAllChange}>取消全选</div>:<div className='check_all color-356DFF cursor-pointer' onClick={onCheckAllChange}>全选</div>}
                <div className='checkbox_group_list'>
                    {languages.map((item,index)=>(
                        <div style={{margin:"6px 0"}}>
                            <Checkbox checked={item.checked} onChange={(e)=>{
                                const newLanguages = [...languages]
                                e.target.checked ? newLanguages[index].checked=true : newLanguages[index].checked=false
                                setLanguages(newLanguages)
                            }}>{item.languageNameDefault}</Checkbox>
                        </div>
                    )
                    )}
                    {shopLang.hasLanguages.map((item)=>(
                        <div style={{margin:"6px 0"}}>
                            <Checkbox checked disabled>{item.languageNameDefault}</Checkbox>
                        </div>
                    ))}
                </div>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
    .checkbox_group_list{
        height: 240px;
        overflow-y: auto;
    }
`

export default observer(AddLanguage)
