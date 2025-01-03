import { Input, Button, Select, Dropdown, MenuProps } from "antd";
import ProductListAjax from "@/pages/Products/ProductList/ProductListAjax";

import { useEffect, useState } from "react"
import { SearchOutlined } from "@ant-design/icons";
import TableListCard from "./TableListCard";
import MySelect from "@/components/Select/MySelect";

const { Search } = Input;

export default function SelectCard(){
    const [language, setLanguage] = useState("2");
    
    // 状态
    const statusOptions = [
        { value: '1', label: '草稿' },
        { value: '2', label: '已订购' },
        { value: '3', label: '部分收货' },
        { value: '4', label: '收货完成' },
        { value: '0', label: '已关闭' }
    ]

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
    ];

    useEffect(()=>{
        
    },[])

    return (
        <> 
            <div className="products-select" >
                <div className="products-select-items-wrap" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px',justifyContent:'space-between',marginBottom:'12px'}}>
                    <div className="products-select-items-left" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px'}}>
                        <div><Input prefix={<SearchOutlined />} placeholder="Basic usage" /></div>
                        <MySelect options={statusOptions} text="状态" style={{width:"180px"}}/>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                            ]}
                        />
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                            ]}
                        />
                    </div>
                    <div className="products-select-items-right" style={{display:'flex',flexWrap:'wrap',gap:'12px 12px'}}>
                        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
                            <Button>排序</Button>
                        </Dropdown>
                    </div>
                </div>
                <TableListCard/>
            </div>
        </>
    );
}
