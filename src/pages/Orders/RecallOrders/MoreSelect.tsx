import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useIntl } from '@umijs/max';
import CustomizeProductTypeSelector from '@/components/Select/CustomizeProductTypeSelector';
import styled from 'styled-components';
import DefaultButton from '@/components/Button/DefaultButton';


const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '更新时间',
    children: (
      <div>
        {/* <PriceRangeInput /> */}
        <div className={'cleanText'}>清除</div>
      </div>
    ),
  },
  {
    key: '2',
    label: '弃单金额',
    children: (
    <>
      <div className={'cleanText'}>清除</div>
    </>)
    ,
  },
  {
    key: '3',
    label: '发送次数',
    children: (
      <>
      {/* <CustomizeProductTypeSelector/> */}
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '4',
    label: '国家/地区',
    children: (
      <>
      {/* <CustomizeProductTypeSelector/> */}
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '5',
    label: '首次互动来源',
    children: (
      <>
      {/* <CustomizeProductTypeSelector/> */}
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '6',
    label: '末次互动来源',
    children: (
      <>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '7',
    label: '归档状态',
    children: (
      <>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },
];

export default function MoreSelect(){
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Scoped>
      <DefaultButton text={intl.formatMessage({ id: 'order.button.moreselect' })} onClick={showDrawer} />
      <Drawer
        title="筛选"
        open={open}
        onClose={onClose}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '16px',
            }}
          >
            <Button type="default" onClick={onClose}>
              重置
            </Button>
            <Button type="primary" onClick={onClose} style={{ marginLeft: '8px' }}>
              完成
            </Button>
          </div>
        }
      >
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerPadding: '12px 40px 12px 16px',
                contentPadding: '0 40px 0 16px',
                headerBg: '',
              },
            },
          }}
        >
          <Collapse
            style={{
              color: '#242833',
              lineHeight: 1.5715,
              fontSize: '16px',
              fontWeight: 500,
              paddingBlock: 0,
            }}
            expandIconPosition={'end'}
            defaultActiveKey={['1']}
            ghost
            items={items}
            size="small"
          />
        </ConfigProvider>
      </Drawer>
    </Scoped>
  );
}

const Scoped = styled.div`
  .cleanText{
    margin-top: 10px;
    color: #7a8499;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
  }

`