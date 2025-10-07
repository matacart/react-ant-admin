/* eslint-disable compat/compat */
import React, { useState } from 'react';
import { ConfigProvider, Flex, Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import { selectTags } from '@/services/y2/api';
import product from '@/store/product/product';
import { LoadingOutlined } from '@ant-design/icons';

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const toURLSearchParams = <T extends AnyObject>(record: T) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    params.append(key, value);
  }
  return params;
};

const fetchData = (value: string, callback: (data: { value: string; text: string }[]) => void,setLoading: (loading: boolean) => void,setOpen: (open: boolean) => void) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  // const params = toURLSearchParams({ code: 'utf-8', q: value });
  const fake = () => {
    setLoading(true);
    setOpen(true); // 确保在加载时打开下拉菜单
    callback([]);
    selectTags({
      languages_id:product.productInfo.languages_id,
      tagName:value
    }).then((res) => {
      if (currentValue === value) {
        const data = res.data.map((item: any) => ({ value: item.id, text: item.tag}));
        callback(data);
      }
    }).finally(() => {
      setLoading(false);
    });
  };
  if (value) {
    timeout = setTimeout(fake, 500);
  } else {
    callback([]);
  }
};

const SearchRemote: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (newValue: string) => {
    fetchData(newValue, setData,setLoading,setOpen);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  // 自定义下拉菜单内容，显示加载状态
  const popupRender  = (menu: React.ReactNode) => (
    <div style={{padding:"8px 0"}}>
      {loading ? (
        <Flex justify="center" align="center" style={{ padding: '8px 0' }}>
          <Spin indicator={<LoadingOutlined spin />} />
        </Flex>
      ):menu}
    </div>
  );

  return (
    <ConfigProvider
        theme={{
            token: {
            /* 这里是你的全局 token */
              borderRadius:4,
              paddingXXS:0,
            },
        }}
        >
        <Select
            open={open}
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
            popupRender={popupRender}
            onOpenChange={handleOpenChange}
        />
    </ConfigProvider>
    
  );
};


export default SearchRemote;