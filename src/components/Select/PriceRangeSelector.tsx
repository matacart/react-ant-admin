import { Button, Divider, Dropdown, Flex, Popover, Select } from 'antd';
import React, { useRef, useState } from 'react';
import type { InputNumberProps, MenuProps } from 'antd';
import { InputNumber, Space } from 'antd';
import { wrap } from 'lodash';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import cookie from 'react-cookies';

const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
};




const items: MenuProps['items'] = [
    {
      label: <>
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} /> - <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
      </>,
      key: '1',
    },
];

export default function PriceRangeSelector() {
    let startValue = 0
    let endValue = 0
    const onSearch = (value: number) => {
        let max = startValue > endValue ? startValue : endValue
        let min = startValue < endValue ? startValue : endValue
    };

    const menuProps = {
        items,
    };

    const content = (
        <PopoverContent>
            <div className='top'>
                <div>
                    <InputNumber<number>
                        className="input"
                        placeholder='最小值'
                        prefix={cookie.load("symbolLeft")}
                        // defaultValue={0}
                        // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        onChange={onChange}
                    />
                </div>
                <div className="line"></div>
                <div>
                    <InputNumber<number>
                        className="input"
                        placeholder='最大值'
                        prefix={cookie.load("symbolLeft")}
                        // defaultValue={0}
                        // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        onChange={onChange}
                    />
                </div>
                
            </div>
            <div className='bottom'>
                <Button type='primary' onClick={()=>inputRef.current && inputRef.current?.click()}>确认</Button>
            </div>
        </PopoverContent>
    );

    const inputRef = useRef<HTMLButtonElement | null>(null)


    return (
        <Scoped>
            <Popover
                arrow={false}
                placement="bottomLeft"
                content={content}
                title={false}
                trigger="click"
                // 卡片内容区域样式
                overlayInnerStyle={{padding:0,width:436}}
                // onOpenChange={handleOpenChange}
            >
                <Button ref={inputRef} style={{width:140}}>
                    <Flex justify='space-between' align='center' style={{width:"100%"}}>
                        <div className='color-474F5E'>价格区间</div>
                        <img src="/icons/Suffix1.svg" />
                    </Flex>
                </Button>
            </Popover>
        </Scoped>
    )
}

const Scoped = styled.div`

`


const PopoverContent = styled.div`
    .top{
        border-bottom: 1px solid #eaedf5;
        display: flex;
        width: 100%;
        padding: 20px;
        height: 76px;
        justify-content: center;
        align-content: center;
        .input{
            flex: 1;
            width: 100%;
            height: 36px;
            line-height: 36px;
        }
        .line{
            position: relative;
            top: 20px;
            background-color: #d7dbe7;
            margin: 0 12px;
            display: inline-block;
            width: 12px;
            height: 1px;
            -ms-flex-negative: 0;
            flex-shrink: 0;
        }
    }
    .bottom{
        display: flex;
        height: 50px;
        justify-content: right;
        padding: 10px 24px;
    }

`



