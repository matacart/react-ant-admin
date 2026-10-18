import DefaultButton from '@/components/Button/DefaultButton';
import { DomainLangIcon, InventoryIcon, NavShippingIcon, PayIcon, ProductIcon, ReceiveGoodsIcon } from '@/components/Icons/Icons';
import marketsInfo from '@/store/settings/markets/marketsInfo';
import { Card, Flex } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from '@umijs/max';
import { observer } from 'mobx-react-lite';

function MarketsConfig() {

    const [list, setList] = useState<{title:string, icon:any, info:string, url:string}[]>([])
    
    useEffect(() => {

        const currencies = JSON.parse(localStorage.getItem("MC_DATA_CURRENCIES") || "[]").find((item: any) => item.code == marketsInfo.marketsInfo.priceRuleInfo?.baseCurrency)

        const list = [
            {
                title: '域名和语言',
                icon: DomainLangIcon,
                info: marketsInfo.marketsInfo.domainLanguage.mainDomain,
                url: `/settings/markets/domainAndLang/${marketsInfo.marketsInfo.marketId}/${marketsInfo.languagesId}`,
            },
            {
                title: '商品与定价',
                icon: ProductIcon,
                info: currencies?.name || "货币",
                url: `/settings/markets/pricing/${marketsInfo.marketsInfo.marketId}/${marketsInfo.languagesId}`,
            },
            {
                title: '库存',
                icon: InventoryIcon,
                info: "管理你的多市场库存",
                url: `/settings/markets/inventory/${marketsInfo.marketsInfo.marketId}/${marketsInfo.languagesId}`,
            },
            {
                title: '发货',
                icon: NavShippingIcon,
                info: marketsInfo.marketsInfo.deliveryStatistic.deliveryPlanNum == 0 ? "暂无发货方案" : `${marketsInfo.marketsInfo.deliveryStatistic.deliveryPlanNum}组方案`,
                url: `/settings/markets/shipping/${marketsInfo.marketsInfo.marketId}/${marketsInfo.languagesId}`,
            },
            {
                title: '支付',
                icon: PayIcon,
                info: "管理客户在该市场下可用的支付方式",
                url: `/settings/markets/payments/${marketsInfo.marketsInfo.marketId}/${marketsInfo.languagesId}`,
            }
        ]

        setList(list)
    }, [])

    return (
        <MyCard>
            <div className='font-w-500'>市场设置</div>
            <div className='font-12 color-7A8499'>仅管理你的商店在此市场中的客户体验</div>
            <div>
                {list.map((item, index) => (
                    <Flex key={index} className='item' justify='space-between' align='center'>
                        <Flex align='center'>
                            <Flex className='item-img-box' align='center' justify='center'>
                                <item.icon />
                            </Flex>
                            <Flex justify='center' gap={8} vertical>
                                <div className='font-w-500'>{item.title}</div>
                                <div className='font-12 color-474F5E'>{item.info}</div>
                            </Flex>
                        </Flex>
                        <DefaultButton text='编辑' onClick={() => item?.url && history.push(item.url)} />
                    </Flex>
                ))}
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .item{
        padding: 20px 0px;
        border-bottom: 1px solid #E5E5E5;
        .item-img-box{
            width: 60px;
            height: 60px;
            border-radius: 4px;
            margin-right: 8px;
            background-color: #F7F8FB;
        }
    }
`

export default observer(MarketsConfig)
