import MyButton from "@/components/Button/MyButton";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Checkbox, Flex, Modal, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { getLanguageMarketsList, setLanguageMarketsList } from "@/services/y2/apiSaleMarket";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { LanguageType } from "@/store/settings/shopLang/shopLang";

interface Market{
    marketId: string;
    marketName: string;
    mainMarket: boolean;
    alreadyAdd: boolean;
}

function SetMarkets({ langObj, setLanguageMarketsConfig }: { langObj: LanguageType, setLanguageMarketsConfig: (langId: string,assigned: boolean) => void }) {

    const [open, setOpen] = useState(false);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    const [btnLoading, setBtnLoading] = useState(false);

    const [marketsList,setMarketsList] = useState<Market[]>([]);

    const [selectedMarketsIds, setSelectedMarketsIds] = useState<any[]>([]);

    const cancel = () => {
        setOpen(false);
    }

    const submit = () => {
        setBtnLoading(true);
        const bindList = marketsList.map((item)=>{
            const isSelected = selectedMarketsIds.includes(item.marketId);
            if (isSelected) {
                return {
                    marketId:item.marketId,
                    check:true,
                }
            } else {
                return {
                    marketId:item.marketId,
                    check:false,
                }
            }
        })
        setLanguageMarketsList({
            language:langObj.languageCode,
            bindList:JSON.stringify(bindList),
        }).then(res=>{
            message.success("成功");
            // 是否有选择的市场
            const hasSelected = selectedMarketsIds.length > 0;
            setLanguageMarketsConfig(langObj.id,hasSelected);
            setOpen(false);
        }).catch(()=>{
        }).finally(()=>{
            setBtnLoading(false);
        })
    }

    const init = () => {
        setOpen(true);
        setLoading(true);
        getLanguageMarketsList({language:langObj.id}).then(res=>{
            setMarketsList(res.data?.marketList || []);
            const selectedIds = res.data?.marketList?.map((item:Market)=>{
                if(item.alreadyAdd){
                    return item.marketId;
                }
                return null;
            }).filter((item:string)=>item) || [];
            setSelectedMarketsIds(selectedIds)
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    return (
        <>
            { langObj.assigned ? <MyButton text="调整市场" onClick={init} /> : <MyButton onClick={init} text="分配市场" icon={<ExclamationCircleFilled style={{color:"#e07000"}} />} /> }
            <MyModal
                loading={loading}
                title={`将${langObj.languageNameDefault}分配到市场`}
                open={open}
                centered
                width={620}
                onCancel={cancel}
                footer={<Flex justify="end" gap={12}>
                    <DefaultButton text="取消" onClick={cancel} />
                    <PrimaryButton loading={btnLoading} text="确认" onClick={submit} />
                </Flex>}
            >
                <div style={{padding:"12px 0"}}>
                    <div style={{marginBottom:"12px"}}>若您经营多市场，您需要在添加语言后对语言进行市场分配，保证语言对顾客可见。了解市场语言</div>
                    <Checkbox.Group style={{
                        display: "flex",
                        flexDirection: "column",
                    }} 
                    value={selectedMarketsIds} 
                    onChange={(e)=>setSelectedMarketsIds(e)}>
                        {marketsList.map((item,index)=>(
                            <div key={index} className="item">
                                <Checkbox value={item.marketId} style={{width:"100%"}}>
                                    <Flex align="center" gap={12}>
                                        <div className="item-icon">
                                            <span className="item-icon-text">{item.marketName?.slice(0, 2) || ""}</span>
                                        </div>
                                        <div>
                                            {item.marketName}
                                            {item.mainMarket && <Tag color="default" style={{borderRadius:"12px",marginLeft:"10px"}}>主要市场</Tag>}
                                        </div>
                                    </Flex>
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                </div>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
    .item{
        padding: 12px 0;
        border-bottom: 1px solid #e0e0e0;
        .item-icon{
            width: 36px;
            height: 24px;
            line-height: 24px;
            background: linear-gradient(111.34deg, rgb(56, 88, 201) 0%, rgb(89, 55, 188) 100%);
            font-size: 12px;
            min-width: 36px;
            color: #FFFFFF;
            text-align: center;
            align-items: center;
            border-radius: 4px;
        }
    }
`;

export default SetMarkets;
