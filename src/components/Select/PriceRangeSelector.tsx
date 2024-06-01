import { Button, Divider, Popover } from 'antd';
import styles from './PriceRangeSelector.module.scss'

import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';
import { wrap } from 'lodash';

const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
};


const content = (
    <div>
        <div className={styles.top} style={{
            flexWrap: 'wrap'
        }}>
            
                <InputNumber<number> className={styles.input}
                    size="large"
                    defaultValue={0}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                    onChange={onChange}

                />
                <div className={styles.line}></div>
                
                <InputNumber<number> className={styles.input}
                    size="large"
                    defaultValue={0}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                    onChange={onChange}
                />
            
        </div>
        <div className={styles.bottom}>
            <Button  type='primary' >确认</Button>

        </div>
    </div>
);

export default function PriceRangeSelector() {
    let startValue = 0
    let endValue = 0
    const onSearch = (value: number) => {
        let max = startValue > endValue ? startValue : endValue
        let min = startValue < endValue ? startValue : endValue
    };
    return (
        <>
            <Popover content={content} placement='bottomRight' trigger="click"
            >
                <Button size='large'>价格区间</Button>
            </Popover>
        </>
    )
}