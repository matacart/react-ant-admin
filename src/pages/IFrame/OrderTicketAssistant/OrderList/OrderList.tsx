
import { ExportIcon, UnfoldIcon } from '@/components/Icons/Icons';
import { ImportOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Space } from 'antd';
import { styled } from 'styled-components';
import OrderListCard from './OrderListCard';

const aItems: MenuProps['items'] = [
    {
      key: '1',
      label:"发票",

    },
    {
      key: '2',
      label: "拣货单",
    }
];

function OrderList(){

    return (
        <Scoped>
            {/* content */}
            <div className='order-list-content'>
                <Flex style={{height:"64px"}} align='center'>
                    <div style={{marginRight:"20px"}} className='ota-font-24 ota-font-w-600 ota-color-242833'>订单列表</div>
                    <div>
                        <Dropdown menu={{ items: aItems }} trigger={['hover']}>
                            <Flex className='cursor-pointer' align='center'>
                                <div style={{marginRight:"8px"}}><ExportIcon className='font-20' /></div>
                                <div>导出订单</div>    
                            </Flex>
                        </Dropdown>
                    </div>
                </Flex>
                {/*  */}
                <OrderListCard />
            </div>
        </Scoped>
    )

}

export default OrderList;

const Scoped = styled.div`
    display: flex;
    justify-content: center;
    .order-list-content{
        max-width: 1200px;
        flex-grow: 1;
        margin: 0 40px 40px 40px;
        /* height: 1200px; */
    }
`