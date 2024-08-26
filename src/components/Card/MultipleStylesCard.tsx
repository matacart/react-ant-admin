import { Card, Checkbox, Cascader, AutoComplete } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

// 定义样式
const Scoped = styled.div`
  .ant-card-body {
    padding: 20px;
  }

  .cascader-input {
    margin-top: 16px;
  }
`;

const options = [
  {
    value: 'color',
    label: 'Color',
  
  },
  {
    value: 'size',
    label: 'Size',
   
  },
  {
    value: 'material',
    label: 'Material',
 
  },
  {
    value: 'style',
    label: 'Style',
 
  },
];

export default function MultipleStylesCard() {
  const [checked, setChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Scoped>
      <Card title="多款式">
        <Checkbox value="1" onChange={handleCheckboxChange}>
          此商品有多个款式
        </Checkbox>
        {checked && (
          <>
            <Cascader
              options={options}
              placeholder="请选择属性"
              onChange={handleChange}
            />
            <div className="cascader-input">
              <AutoComplete
                placeholder="请用逗号隔开各个选项"
                options={selectedOptions}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().startsWith(inputValue.toUpperCase())
                }
                onSearch={onSearch}
              />
            </div>
          </>
        )}
      </Card>
    </Scoped>
  );

  // 处理复选框变化
  function handleCheckboxChange(e: { target: { checked: boolean; }; }) {
    setChecked(e.target.checked);
  }

  // 处理级联选择器的变化
  function handleChange(value: string[]) {
    setSelectedOptions(options.filter(option => option.value === value[0])[0]?.children || []);
  }

  // 处理搜索框的搜索事件
  function onSearch(value: any) {
    console.log('search:', value);
  }
}