import {
  Divider, Form, Cascader, Input, Select, Space, Button,
  Dropdown,
  Tabs,
} from 'antd'
import './index.scss'
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, DownOutlined } from '@ant-design/icons'
import SelectCountry from '../../components/Stores/SelectCountry'
import SelectCurrency from '../../components/Stores/SelectCurrency'
import SelectContryCode from '../../components/Stores/SelectCountryCode'
import { ImportOutlined, PlusOutlined, } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useState, useRef } from 'react'
import ProductsSelectCard from '@/components/Card/ProductsSelectCard'
import { history } from '@umijs/max';
import styled from 'styled-components'


const TabLabel = styled.div`
   font-size: 18px;
`

const aItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <>本地导入</>
    ),
  },
  {
    key: '2',
    label: (
      <>Shopify表格导入
      </>
    )
  },
  {
    key: '3',
    label: (
      <>Shopify一键搬家
      </>
    ),
  },
];


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  {
    label: <TabLabel>
      全部
    </TabLabel>

    ,
    children: (<ProductsSelectCard />),
    key: '1',
    closable: false,
  },
  {
    label: <TabLabel>已上架</TabLabel>,
    children: 'Content of Tab 2',
    key: '2',
    closable: false,
  },
  {
    label: <TabLabel>已下架</TabLabel>,
    children: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
  {
    label: <TabLabel>已存档</TabLabel>,
    children: '123',
    key: '4',
    closable: false,
  }
];







export default function Product() {

  const [items, setItems] = useState(initialItems);


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
            }}>商品</h3>
            <ImportOutlined style={{
              position: 'relative',
              top: -24,
              left: -10,
            }} />
            <div style={{
              position: 'relative',
              top: -44,
              left: 83,
            }}>
              <Dropdown menu={{ items: aItems }} >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    导入商品
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <div className='create-title-right'>
            <Button type="primary"
              onClick={() => { history.push('/products/new') }}
              style={{
                marginTop: "10px",
                width: "88px", height: "36px", fontSize: "16px",

              }}>
              创建商品
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

