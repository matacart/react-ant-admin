import { Card, Radio } from 'antd';
import styled from 'styled-components';
import inventory from "@/store/settings/markets/inventory";
import { observer } from 'mobx-react-lite';

function InventoryCard() {

    return (
        <MyCard>
            <div className='font-16 font-w-500 title'>市场库存</div>
            <div>
                <Radio.Group
                    value={inventory.inventoryConfig.status}
                    onChange={(e) => {
                        inventory.setInventoryConfig({
                            ...inventory.inventoryConfig,
                            status:e.target.value
                        });
                    }}
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'12px',
                    }}
                >
                    <Radio value={0}>
                        <div>关闭市场库存</div>
                        <div className='color-7A8499'>该市场「商品与定价」中的商品，使用所有可用地点以计算其可售的库存数量</div>
                    </Radio>
                    <Radio value={1}>
                        <div>开启市场库存</div>
                        <div className='color-7A8499'>该市场「商品与定价」中的商品，根据每个可用地点的库存数量，计算其可售的库存数量</div>
                    </Radio>
                </Radio.Group>
            </div>
        </MyCard>
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

export default observer(InventoryCard);
