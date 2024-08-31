import { Card, Checkbox, Button, AutoComplete, Input, Tag, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 定义样式
const Scoped = styled.div`
  .ant-card-body {
    padding: 20px;
  }

  .select-input {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 25px;
  position: relative; /* 添加相对定位 */
}

.error-message {
  position: absolute;
  bottom: -24px; /* 调整距离 */
  left: 0;
  color: red;
}

  .input-text-area {
    display: inline-block;
    width: 100%;
    padding-left: 24px; /* 调整此值以适应标签的宽度 */
    padding-right: 8px; /* 添加右侧内边距 */
  }

  .ant-select-selection--single,
  .ant-autocomplete {
    width: 100%;
  }

  .ant-select-selection__rendered {
    line-height: normal;
  }

  .add-specification-button {
    background-color: #FFFFFF;
    color: #474F5E;
    padding: 7px 15px;
    margin-top: 25px;
    font-size: 14px;
    width: 140px;
    height: 36px;
    border: 1px solid #ccc;
  }

  .custom-input {
    position: relative;
  }

  .custom-input .ant-input {
    padding-left: 24px; /* 调整此值以适应标签的宽度 */
    padding-right: 8px; /* 添加右侧内边距 */
    width: calc(100% - 88px); /* 动态计算宽度 */
  }

  .icon-container {
    position: relative;
  }

  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .hide-option-checkbox {
    position: absolute;
    left: 190px; /* 第一个输入框的宽度 */
    top: 44px; /* 第二个输入框的顶部位置 */
  }
  .edit-icon {
    margin-right: 10px;
    background-color: #fff;
  }
`;

const options = [
  {
    value: "Color",
    label: "Color",
  },
  {
    value: "Size",
    label: "Size",
  },
  {
    value: "Material",
    label: "Material",
  },
  {
    value: "Style",
    label: "Style",
  },
];

interface MultipleStylesCardProps {
  onSecondInputChange?: (value: string) => void;
}
export default function MultipleStylesCard(props: MultipleStylesCardProps) {
  const [checked, setChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState([{ id: 1 }]);
  const [values, setValues] = useState<string[]>([]);
  const [tags, setTags] = useState<string[][]>([]); // 用于存储每个规格组的标签
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 // 收集所有输入值后调用父组件提供的回调函数
 const allTagsFlat = tags.flat();
 const styleId = allTagsFlat.join(',');
 useEffect(() => {
  props.onSecondInputChange?.(styleId);
}, [styleId, props.onSecondInputChange]);

  // 处理回车键事件
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'Enter') {
      const newTags = [...tags];
      const currentTags = newTags[index] || [];
      const newValue = values[index].trim();

      if (newValue !== '') {
        newTags[index] = [...currentTags, newValue];
        setTags(newTags);
        const newValues = [...values];
        newValues[index] = ''; // 清空输入框
        setValues(newValues);

        // 收集所有输入值后调用父组件提供的回调函数
        const allTagsFlat = newTags.flat();
        props.onSecondInputChange?.(allTagsFlat.join('.'));

        // 确保光标在输入框末尾
        const inputRef = inputRefs.current[index];
        if (inputRef) {
          inputRef.setSelectionRange(newValue.length, newValue.length);
        }
      }
    }
  }

  // 添加 useRef 来保存输入框的引用
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  inputRefs.current = Array(values.length).fill(null);

  return (
    <Scoped>
      <Card title="多款式">
        <Checkbox value="1" onChange={handleCheckboxChange}>
          此商品有多个款式
        </Checkbox>
        {checked && (
          <>
           {specifications.map((spec, index) => (
  <div key={spec.id} className="select-input icon-container">
    <AutoComplete
      placeholder="请输入属性"
      style={{ width: "160px", height: "44px" }}
      options={options.map(opt => ({ value: opt.value, label: opt.label }))}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().includes(inputValue.toUpperCase())
      }
      onChange={(value) => handleChange(value, index)}
    />
      {errors[index] && (
      <div className="error-message">
        {errors[index]}
      </div>
    )}
    <div className="custom-input">
      <Select
        mode="tags"
        allowClear
        style={{ width: "580px", height: "44px" }}
        placeholder={tags[index]?.length > 0 ? "" : "请输入多个选项，使用回车键添加新标签"}
        value={tags[index]}
        onChange={(value) => handleTagChange(value, index)}
        onSearch={(searchText) => handleSearch(searchText, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        className="input-text-area"
      />
    </div>
    {index === 0 && ( // 只在第一个规格组中显示复选框
      <div className="hide-option-checkbox">
        <Checkbox onChange={(e) => handleHideOptionCheckboxChange(e)}>购买时隐藏此选项</Checkbox>
      </div>
    )}
    {/* 添加图标 */}
    <span className="edit-icon btn-icon__1h8Qx edit__3TiEz">
      <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconEdit" font-size="20">
        <path d="M13.551 2.47a.75.75 0 0 0-1.06 0l-9.9 9.9a.75.75 0 0 0-.22.53v4.242c0 .414.336.75.75.75h4.243a.75.75 0 0 0 .53-.22l9.9-9.899a.75.75 0 0 0 0-1.06L13.551 2.47Zm-9.68 10.74 9.15-9.15 3.182 3.183-9.15 9.15H3.873V13.21Zm13.807 4.682a.1.1 0 0 0 .1-.1v-1.3a.1.1 0 0 0-.1-.1h-6.8a.1.1 0 0 0-.1.1v1.3a.1.1 0 0 0 .1.1h6.8Z" fill="#474F5E"></path>
      </svg>
    </span>
    <span className="delete-icon btn-icon__1h8Qx delete__3TiEz" onClick={() => handleRemove(index)}>
      <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconDelete" font-size="20">
        <path d="M18 4.25h-4.325a3.751 3.751 0 0 0-7.35 0H2v1.5h1.305l.947 12.308A.75.75 0 0 0 5 18.75h10a.75.75 0 0 0 .748-.692l.947-12.308H18v-1.5Zm-2.81 1.5-.884 11.5H5.694L4.81 5.75h10.38Zm-5.19-3c.98 0 1.813.626 2.122 1.5H7.878A2.25 2.25 0 0 1 10 2.75Z" fill="#F86140"></path>
      </svg>
    </span>
  </div>
))}
            
            {specifications.length < 5 && ( // 限制最多添加四个规格组
              <Button
                type="primary"
                className="add-specification-button"
                onClick={addSpecification}
              >
                添加商品规格
              </Button>
            )}
          </>
        )}
        
              </Card>
    </Scoped>
  );
// 新增处理复选框变化的函数
function handleHideOptionCheckboxChange(e: { target: { checked: boolean; }; }) {
  console.log('复选框状态:', e.target.checked);
  // 这里可以添加更多的逻辑来处理复选框的变化
}
  // 处理复选框变化
  function handleCheckboxChange(e: { target: { checked: boolean; }; }) {
    setChecked(e.target.checked);
  }

  // 处理第一个搜索框的选择变化
  function handleChange(value: string, index: number) {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  
    // 检查是否有重复值
    const hasDuplicate = new Set(newValues).size !== newValues.length;
    if (hasDuplicate) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [index]: '属性/款式不能重复'
      }));
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[index];
        return newErrors;
      });
    }
  
    // 更新其他逻辑...
  }
  // 处理搜索框的搜索事件
  function handleSearch(searchText: string, index: number) {
    const newValues = [...values];
    newValues[index] = searchText;
    setValues(newValues);
  }

  // 处理标签选择或输入变化
  function handleTagChange(value: string[], index: number) {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  }

  // 移除标签
  function handleRemoveTag(index: number, tag: string) {
    const newTags = [...tags];
    newTags[index] = newTags[index].filter(t => t !== tag);
    setTags(newTags);
  }

  // 删除整个规格组
  function handleRemove(index: number) {
    const newSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecifications);

    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);

    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  }

  // 添加新的规格组
  function addSpecification() {
    const newId = specifications.length + 1;
    setSpecifications([...specifications, { id: newId }]);
    setValues([...values, ""]);
    setTags([...tags, []]); // 添加一个新的空数组作为新的标签集合
    // 更新输入框引用
    inputRefs.current = [...inputRefs.current, null];
  }
}







