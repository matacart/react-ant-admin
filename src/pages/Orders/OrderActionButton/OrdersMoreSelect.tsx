import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import './Drawer.scss'
import { useIntl } from '@umijs/max';
import PriceRangeInput from '@/components/Input/PriceRangeInput';
import ProductTypeSelector from '@/components/Select/ProductTypeSelector';
import CustomizeProductTypeSelector from '@/components/Select/CustomizeProductTypeSelector';


const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '精确搜索',
    children: (
      <div>
        <PriceRangeInput />
        <div className={'cleanText'}>清除</div>
      </div>
    ),
  },
  {
    key: '2',
    label: '订单状态',
    children: (
    <>
      <ProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
    </>)
    ,
  },
  {
    key: '3',
    label: '付款状态',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '4',
    label: '退款订单',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '5',
    label: '发货状态',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '6',
    label: '退货状态',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '7',
    label: '运输方式',
    children: (
      <>
        {/* <TransportMethodSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '8',
    label: '支付方式',
    children: (
      <>
        {/* <PaymentMethodSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '9',
    label: '标签',
    children: (
      <>
        {/* <TagSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '10',
    label: '商品标签',
    children: (
      <>
        {/* <ProductTagSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '11',
    label: '落地页域名（即将下线）',
    children: (
      <>
        {/* <LandingPageDomainSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '12',
    label: '落地页参数（即将下线）',
    children: (
      <>
        {/* <LandingPageParamsSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '13',
    label: '访问来源域名（即将下线）',
    children: (
      <>
        {/* <ReferrerDomainSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '14',
    label: '访问来源参数（即将下线）',
    children: (
      <>
        {/* <ReferrerParamsSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '15',
    label: '订单日期',
    children: (
      <>
        {/* <OrderDateSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '16',
    label: '归档订单',
    children: (
      <>
        {/* <ArchivedOrderSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '17',
    label: '拒付与质询状态',
    children: (
      <>
        {/* <ChargebackInquiryStatusSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '18',
    label: '订单来源',
    children: (
      <>
        {/* <OrderSourceSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '19',
    label: '订单商品编辑状态',
    children: (
      <>
        {/* <OrderProductEditStatusSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '20',
    label: '拣货单导出状态',
    children: (
      <>
        {/* <PickingListExportStatusSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '21',
    label: '订单详情导出状态',
    children: (
      <>
        {/* <OrderDetailsExportStatusSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '22',
    label: '入账付款状态',
    children: (
      <>
        {/* <AccountingPaymentStatusSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '23',
    label: '转账凭证上传状态',
    children: (
      <>
        {/* <TransferProofUploadStatusSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '24',
    label: '折扣码',
    children: (
      <>
        {/* <DiscountCodeSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '25',
    label: '国家/地区',
    children: (
      <>
        {/* <CountryRegionSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '26',
    label: '订单金额',
    children: (
      <>
        {/* <OrderAmountSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '27',
    label: '首次互动来源',
    children: (
      <>
        {/* <FirstInteractionSourceSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '28',
    label: '末次互动来源',
    children: (
      <>
        {/* <LastInteractionSourceSelector /> */}
        <div className={'cleanText'}>清除</div>
      </>
    ),
  },
  {
    key: '29',
    label: '欺诈风险',
    children: (
      <>
        {/* <FraudRiskSelector /> */}
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
    <>
      <Button size="large" onClick={showDrawer}>
        {intl.formatMessage({ id: 'order.button.moreselect' })}
      </Button>
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
    </>
  );
}