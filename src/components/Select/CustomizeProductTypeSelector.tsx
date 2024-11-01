import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

export default function CustomizeProductTypeSelector(){
    return (
        <>
            <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="搜索自定义商品类型"
                onChange={handleChange}
                options={options}
            />
        </>
    )
}