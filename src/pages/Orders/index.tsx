
import React, { useRef, useState } from 'react'
import { Button, Dropdown, Flex, Space } from 'antd';
import { Tabs } from 'antd'
import type { MenuProps, TabsProps } from 'antd'
import OrdersSelectCard from '@/components/Card/OrdersSelectCard'
import './index.scss'
import styled from 'styled-components'
import { ImportOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import tabs from 'antd/es/tabs';
import { Card } from 'antd';

const TabLabel = styled.div`
   font-size: 18px;
`
const onChange = (key: string) => {
  console.log(key);
};

const OrdersTabsitems: TabsProps['items'] = [
  {
    key: '1',
    label: '全部',
    children: (<OrdersSelectCard />),
  },
  {
    key: '2',
    label: '代发货',
    children: (<OrdersSelectCard />),
  },
  {
    key: '3',
    label: '已取消',
    children: (<OrdersSelectCard />),
  },
  {
    key: '4',
    label: '处理中',
    children: (<OrdersSelectCard />),
  },
  {
    key: '5',
    label: '今日新订单',
    children: (<OrdersSelectCard />),
  },
];

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;









const aItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <>练货单</>
    ),
  },
  {
    key: '2',
    label: (
      <>订单明细
      </>
    )
  },
  {
    key: '3',
    label: (
      <>出货表
      </>
    ),
  },
  {
    key: '4',
    label: (
      <>订单明细
      </>
    ),
  },
  {
    key: '5',
    label: (
      <>订单报表
      </>
    ),
  },
];




export default function orders() {
  const [items, setItems] = useState(OrdersTabsitems);
  return (
    
   
    <div className='create-warp-flex' style={{
      width: "100%"
    }}>
      <div className="create-warp">
        <div className='create-title'>
          <div className='create-title-left'>
            <h3 style={{
              position: 'relative',
              top: 10,
              display: 'inline-block',
            }}>订单列表</h3>
            <ImportOutlined style={{
              position: 'relative',
              top: -24,
              left: -10,


            }} />
            <div style={{
              position: 'relative',
              top: -44,
              left: 130,
            }}>

              <Dropdown menu={{ items: aItems }} >
                <a onClick={(e) => e.preventDefault()} style={{ color: '#242833' }}>
                  <Space>
                    导入订单
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          
          <div className='"button-container"'>
            < Button className="my-button1"
              
              style={{
                marginTop: "10px",
                backgroundColor: 'WHITE',
                marginRight: '12px',
                width: "90px", height: "36px", fontSize: "14px",

              }}>
              批量发货
            </Button>

            <Button className='my-button2'
             
              style={{
                marginTop: "10px",
                marginRight: '12px',
                backgroundColor: 'white',
                width: "118px", height: "36px", fontSize: "14px",


              }}>
              更新追踪编号
            </Button>



            <Button className='my-button3'
              
              style={{
                marginTop: "10px",
                backgroundColor: '#356DFF',
                width: "88px", height: "34px", fontSize: "14px", color: 'white',


              }}>
              创建订单
            </Button>
           

          </div>
        </div>
        <div className='create-content'>
          <Tabs
            defaultActiveKey='1'
            items={items}
          />
        </div>
        
      </div>
     
     





      </div>

  )


}













// function setTabs(arg0: any[]) {
//   throw new Error('Function not implemented.');
// }



