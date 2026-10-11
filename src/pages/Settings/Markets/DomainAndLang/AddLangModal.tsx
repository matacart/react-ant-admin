import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { selectMarketLanguage } from "@/services/y2/apiSaleMarket";
import domainAndLang, { MarketLanguage } from "@/store/settings/markets/domainAndLang";
import { useParams } from "@umijs/max";
import { Checkbox, Flex, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

interface Language {
    language: string;
    languageName: string;
    isAddToMarket: boolean;
    isAddToStore: boolean;
}

function AddLangModal() {

    const { marketId="", langId="" } = useParams();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [hasLanguagesList, setHasLanguagesList] = useState<Language[]>([]);

    const [unhasLanguagesList, setUnhasLanguagesList] = useState<Language[]>([]);

    const handleCancel = () => {
        setOpen(false);
    }

    const handleOK = () => {
        const newMarketLanguageList = unhasLanguagesList.filter((item)=>item.isAddToMarket).map((item)=>({
            iso: item.language,
            marketId: marketId,
            defaultLanguage: false,
        }));
        domainAndLang.setMarketLanguageList([...domainAndLang.marketLanguageList,...newMarketLanguageList]);
        setOpen(false);
    }

    const init = () => {
        setOpen(true);
        setLoading(true);
        selectMarketLanguage({
            languages_id: langId,
            marketId: marketId,
        }).then((res) => {
            let newHasLanguagesList:Language[] = [];
            let newUnhasLanguagesList:Language[] = [];
            res.data.forEach((item:Language)=>{
                const isAddToMarket = domainAndLang.marketLanguageList.some((lang:MarketLanguage)=>lang.iso == item.language)
                if(isAddToMarket){
                    newHasLanguagesList.push(item);
                }else{
                    newUnhasLanguagesList.push({...item,isAddToMarket:false});
                }
            })
            setHasLanguagesList(newHasLanguagesList);
            setUnhasLanguagesList(newUnhasLanguagesList);
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        });
    }

    return (
        <>
            <DefaultButton text="添加语言" onClick={init} />
            <MyModal 
                title="添加语言" 
                centered 
                open={open} 
                loading={loading}
                onCancel={handleCancel}
                footer={()=><Flex justify="flex-end" gap={12}>
                    <DefaultButton loading={loading} text={'取消'} onClick={handleCancel} />
                    <PrimaryButton loading={loading} text={'保存'} onClick={handleOK} />
                </Flex>}
            >
                <div className='checkbox_group_list'>
                    {unhasLanguagesList.map((item,index)=>(
                        <div key={item.language} style={{margin:"6px 0"}}>
                            <Checkbox checked={item.isAddToMarket} onChange={(e)=>{
                                setUnhasLanguagesList(unhasLanguagesList.map((lang)=>{
                                    if(lang.language == item.language){
                                        lang.isAddToMarket = e.target.checked;
                                    }
                                    return lang;
                                }));
                            }}>{item.languageName}</Checkbox>
                        </div>
                    ))}
                    {hasLanguagesList.map((item,index)=>(
                        <div key={item.language} style={{margin:"6px 0"}}>
                            <Checkbox checked={true} disabled>{item.languageName}</Checkbox>
                        </div>
                    ))}
                </div>
            </MyModal>
        </>
    )
}

export default observer(AddLangModal);

const MyModal = styled(Modal)`
    .checkbox_group_list{
        height: 240px;
        overflow-y: auto;
    }
`;

// name:{
//     "zh-hang-cn":"中文",
//     "en":"Chinese",
// }