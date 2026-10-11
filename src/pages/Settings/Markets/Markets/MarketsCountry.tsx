import MyInput from "@/components/Input/MyInput";
import { Card, Flex, Form } from "antd";
import styled from "styled-components";
import { DeleteIcon } from "@/components/Icons/Icons";
import markets from "@/store/settings/markets/markets";
import { observer } from "mobx-react-lite";
import MarketsEdit from "./MarketsEdit";
import { useEffect } from "react";


function MarketsCountry() {


    useEffect(() => {
        console.log(markets.marketName);
    }, []);

    // 删除国家/地区
    const handleDelete = (code: string) => {
        markets.setCountryList(markets.countryList.filter(item => item.countryCode !== code));
    }

    return (
        <MyCard>
            <Form layout="vertical">
                <Form.Item label={<span className="font-w-500">市场名称</span>}>
                    <MyInput placeholder="例如：中国市场" value={markets.marketName} onChange={(e:any) => markets.setMarketName(e.target.value)} />
                </Form.Item>
            </Form>
            <Flex justify="space-between">
                <div className="font-w-500">国家/地区</div>
                <MarketsEdit />
            </Flex>
            {markets.countryList.length > 0 ? (
                <>
                    {markets.countryList.map((item) => (
                        <Flex key={item.countryCode} className="country" align="center" justify="space-between">
                            <Flex align="center" gap={12}>
                                <div className="item-icon">
                                    <span className="item-icon-text">{item.countryCode?.slice(0, 2) || ""}</span>
                                </div>
                                <div>{item.countryCnName}</div>
                            </Flex>
                            <DeleteIcon className="cursor-pointer color-D33612 font-20" onClick={()=>handleDelete(item.countryCode)} />
                        </Flex>
                    ))}
                </>
            ) : (
                <Flex justify="center" align="center" className="color-474F5E" style={{height:"200px"}}>暂无国家/地区</Flex>
            )}
        </MyCard>
    )
}


const MyCard = styled(Card)`
    width: 100%;
    .country {
        padding: 20px 0;
        border-bottom: 1px solid #eef1f6;
        .item-icon{
            width: 54px;
            height: 36px;
            line-height: 36px;
            background: linear-gradient(111.34deg, rgb(56, 88, 201) 0%, rgb(89, 55, 188) 100%);
            font-size: 18px;
            min-width: 54px;
            color: #FFFFFF;
            text-align: center;
            align-items: center;
            border-radius: 4px;
        }
    }
`;


export default observer(MarketsCountry);