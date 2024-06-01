import { Button, Divider, Popover } from 'antd';
import styles from './PriceRangeInput.module.scss'

import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';
import { wrap } from 'lodash';

export default function PriceRangeInput() {
    return (
<div className={styles.top} style={{
            flexWrap: 'wrap'
        }}>
            
                <InputNumber<number> className={styles.input}
                    defaultValue={0}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}

                />
                <div className={styles.line}></div>
                
                <InputNumber<number> className={styles.input}
                    defaultValue={0}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                />
            
        </div>
    )
}