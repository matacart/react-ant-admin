import DefaultButton from '@/components/Button/DefaultButton';
import { DomainLangIcon, InventoryIcon, NavShippingIcon, PayIcon, ProductIcon, ReceiveGoodsIcon } from '@/components/Icons/Icons';
import marketsInfo from '@/store/settings/markets/marketsInfo';
import { history } from '@umijs/max';
import { Card, Checkbox, Flex, Radio } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import inventory from "@/store/settings/markets/inventory";
import { InventoryLocation } from './Index';
import { observer } from 'mobx-react-lite';

function LocationList({inventoryLocationList}:{inventoryLocationList:InventoryLocation[]}) {

    return (
        <>
            {inventoryLocationList.length > 0 ? <MyCard>
                <div className='font-16 font-w-500 title'>请选择指定库存地点</div>
                <Checkbox.Group
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"12px"
                    }}
                    value={inventory.inventoryConfig?.locationIds || []}
                    onChange={(value)=>{
                        inventory.setInventoryConfig({
                            ...inventory.inventoryConfig,
                            locationIds:value,
                        });
                    }}
                >
                    {inventoryLocationList.map((item) => (
                        <Checkbox key={item.locationId} value={item.locationId}>
                            <div>{item.locationName}</div>
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </MyCard> : <MyCard>暂无库存地点</MyCard>}
        </>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 12px;
    }
    .ant-radio{
        position: relative;
        top: 4px;
        align-self: start;
    }
`

export default observer(LocationList);
