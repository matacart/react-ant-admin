import { Divider, Form, Cascader, Input, Select, Space, Button, 
    Dropdown,
    Tabs,
} from 'antd'
import './index.scss'
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone } from '@ant-design/icons'
import SelectCountry from '../../components/Stores/SelectCountry'
import SelectCurrency from '../../components/Stores/SelectCurrency'
import SelectContryCode from '../../components/Stores/SelectCountryCode'
import { ImportOutlined,PlusOutlined, } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useState, useRef } from 'react'
import ProductsSelectCard from '@/components/Card/ProductsSelectCard'
import { history, Link } from '@umijs/max';

const items: MenuProps['items'] = [
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
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: '全部', children: (<ProductsSelectCard/>), key: '1' },
  { label: 'Tab 2', children: 'Content of Tab 2', key: '2' },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];




export default function Product() {

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
      };
    
      const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
      };
    
      const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
          if (item.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
          } else {
            newActiveKey = newPanes[0].key;
          }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
      };
    
      const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
      ) => {
        if (action === 'add') {
          add();
        } else {
          remove(targetKey);
        }
      };

    return (
        <div className='create-warp-flex'>
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
                            <Dropdown menu={{items}} >
                                <a onClick={(e) => e.preventDefault()}>
                                    导入商品
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='create-title-right'>
                        <Button type="primary" 
                        onClick={()=>{history.push('/products/new')}}
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
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                    items={items}
                    />
                </div>
            </div>
        </div>
    )
}