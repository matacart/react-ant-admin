import CategoriesTable from "@/components/Table/CategoriesTable";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Space, Select, Input, Tag, Button, Dropdown, theme, Divider } from "antd";
import type { MenuProps, SelectProps } from 'antd';
import React from "react";
import { useEffect, useState } from "react"


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
    {
        key: '4',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item
          </a>
        ),
      },
];

const { useToken } = theme;

export default function CategoriesSelect(){
    
    const { token } = useToken();
    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    
    const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
    };



    useEffect(()=>{
        // 添加语言
        
    },[])
   
    return (
        <> 
            <div className="products-select" >
                <div className="products-select-items-wrap" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                }}>
                    <div className="products-select-items-left" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                        <Input placeholder="default size" style={{width:"320px",height:"36px"}} prefix={<SearchOutlined />} />
                        <Select
                            placeholder="类型"
                            style={{ width: 120,height: 36 }}
                            options={[{ value: '1', label: 'Lucy' },{ value: '2', label: 'Lucy2' }]}
                        />
                    </div>
                    <div className="products-select-items-right"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px 12px',
                        }}>
                        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight"
                        dropdownRender={(menu) => (
                            <div style={contentStyle}>
                            <div style={{padding:"8px 16px 4px 16px",color:"#BEB8CC",fontSize:"12px"}}>排序</div>
                            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                            </div>
                        )}>
                            <Button style={{height:"36px"}}>排序</Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <CategoriesTable />
            {/* <ProductListAjax selectProps={{language:language,title:title,model:model,tags:tags}}  /> */}
        </>
    );
}