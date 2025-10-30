import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin, Avatar, ConfigProvider, Flex, Checkbox, message } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { addTags, selectTags } from '@/services/y2/api';
import product from '@/store/product/product';
import { AddIcon } from '../Icons/Icons';
import { set } from 'mobx';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string,value:any[]) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
    title?: string;
    checked: boolean;
  } = any,
>({ fetchOptions, debounceTimeout = 300, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const selectRef = useRef<any>(null);
  const [open,setOpen] = useState(false);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      // 提取当前选中的值并传递给fetchOptions
      const selectedValues = Array.isArray(props.value) 
        ? props.value.map(item => typeof item === 'object' && item.value !== undefined ? item.label : item)
        : [];
      console.log(selectedValues);

      fetchOptions(value,selectedValues).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout,props.value]);

  // 处理选项点击事件
  const handleOptionClick = (optionValue: string | number, optionData: any) => {
    // 更新选项的选中状态
    setOptions(options.map(opt => 
      opt.value === optionValue ? { ...opt, checked: !opt.checked } : opt
    ));
    
    // 更新Select的值
    if (props.mode === 'multiple') {
      // 多选模式
      const currentValue = Array.isArray(props.value) ? props.value : [];
      const isSelected = currentValue.some(item => 
        typeof item === 'object' ? item.value === optionValue : item === optionValue
      );
      let newValue;
      if (isSelected) {
        // 如果已选中，则移除
        newValue = currentValue.filter(item => 
          typeof item === 'object' ? item.value !== optionValue : item !== optionValue
        );
      } else {
        // 如果未选中，则添加
        newValue = [...currentValue, optionData];
      }
      // 调用onChange事件更新父组件的值
      if (props.onChange) {
        props.onChange(newValue, []);
      }
    } else {
      // 单选模式
      if (props.onChange) {
        props.onChange(optionData, []);
      }
    }
  };

  // 处理下拉菜单关闭事件
  const handleDropdownVisibleChange = (open: boolean) => {
    if (!open) {
      // 下拉菜单关闭时清空options
      setOptions([]);
    }
    setOpen(open)
  };

  return (
    <Select
      open={open}
      ref={selectRef}
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      onOpenChange={handleDropdownVisibleChange}
      notFoundContent={fetching ? <Spin indicator={<LoadingOutlined spin />} style={{padding:"8px 12px"}} /> : <div style={{padding:"8px 12px"}}>No results found</div>}
      {...props}
      styles={{
        popup: {
          root: {
            padding:"6px 0"
          }
        }
      }}
      value={null}
      options={options}
      optionRender={(option) =>{
        if(option.data.value === 0){
          return (
            <Flex style={{padding:"6px 12px"}} onClick={(e)=>{
              e.stopPropagation()
              // 添加标签
              if(option.data.title){
                addTags(product.productInfo.languages_id,option.data.title).then(res=>{
                  if(res.code == 0){
                    product.setProductInfo({
                      ...product.productInfo,
                      tag:product.productInfo.tag + "," + option.data.title
                    })
                  }else{
                    message.error("err")
                  }
                }).finally(()=>{
                  selectRef.current.blur();
                })
              }
            }}>
              {option.label}
            </Flex>
          )
        }
        return (
          <Flex style={{padding:"6px 12px"}} onClick={(e)=>{
            e.stopPropagation()
            // 更新Select的值
            handleOptionClick(option.data.value, option.data);
          }}>
            <Checkbox checked={option.data.checked}>
              {option.label}
            </Checkbox>
          </Flex>
        )
      }}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string,selectedValues:any[]): Promise<UserValue[]> {
  const results = await selectTags({
    languages_id:product.productInfo.languages_id,
    tagName:username
  }).then(res=>{
    if(res.code == 0){
      return res.data.map((item:any)=>{
        return {
          label:item.tag,
          value:item.id,
          checked:selectedValues.includes(item.tag)
        }
      })
    }
  }).catch((err)=>{
  }).finally(()=>{
  })

  if(results?.some((item:any)=>item.label === username) || username == ""){
    return results;
  }else{
    return [
      {
        label:<Flex className='color-356DFF' gap={6}>
          <div>
            <AddIcon />
          </div>
          <div>添加<span style={{marginLeft:"6px"}}>{username}</span></div>
        </Flex>,
        value:0,
        title:username,
      },
      ...(results || []) 
    ]
  }
}

const SearchRemote = ({tags,setTags,...props}:any) => {

  return (
    <Scoped>
      <ConfigProvider
        theme={{
            token: {
            /* 这里是你的全局 token */
              borderRadius:4,
              paddingXXS:0,
            },
            components: {
              Select: {
                optionPadding:0,
              },
            },
        }}
      >
        <DebounceSelect
          mode="multiple"
          value={tags}
          {...props}
          fetchOptions={fetchUserList}
          onChange={(newValue) => {
            if (Array.isArray(newValue)) {
              setTags(newValue);
              // 更新商品标签
              product.setProductInfo({
                ...product.productInfo,
                tag:newValue.map((item:any)=>item.label).join(",")
              })
            }
          }}
        />
      </ConfigProvider>
    </Scoped>
    
  );
};

export default SearchRemote;

const Scoped = styled.div`
  .ant-select-selection-wrap{
    height: 100%;
  }
`