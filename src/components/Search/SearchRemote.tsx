import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin, Avatar, ConfigProvider } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
    avatar?: string;
  } = any,
>({ fetchOptions, debounceTimeout = 300, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin indicator={<LoadingOutlined spin />} style={{padding:"4px 0"}} /> : <div style={{padding:"4px 0"}}>No results found</div>}
      {...props}
      options={options}
      optionRender={(option) => (
        <div style={{ display: 'flex', alignItems: 'center',height:"28px" }}>
          {option.label}
        </div>
      )}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
  avatar?: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  console.log('fetching user', username);
  return fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?search=${username}`)
    .then((res) => res.json())
    .then((res) => {
      const results = Array.isArray(res) ? res : [];
      return results.map((user) => ({
        label: user.name,
        value: user.id,
        avatar: user.avatar,
      }));
    });
}

const SearchRemote = (props:any) => {
  const [value, setValue] = useState<UserValue[]>([]);

  return (
    <Scoped>
      <ConfigProvider
        theme={{
            token: {
            /* 这里是你的全局 token */
              borderRadius:4,
              paddingXXS:0,
            },
        }}
      >
        <DebounceSelect
          mode="multiple"
          value={value}
          {...props}
          fetchOptions={fetchUserList}
          onChange={(newValue) => {
            if (Array.isArray(newValue)) {
              setValue(newValue);
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