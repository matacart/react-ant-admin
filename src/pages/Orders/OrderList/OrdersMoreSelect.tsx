import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, ConfigProvider, Drawer, Flex, Radio } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useIntl } from '@umijs/max';
import CustomizeProductTypeSelector from '@/components/Select/CustomizeProductTypeSelector';
import styled from 'styled-components';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import orderList from '@/store/order/orderList';

export default function MoreSelect(){

  const Ref = useRef(null);

  const intl = useIntl();
  const [open, setOpen] = useState(false);

  // 条件
  const [condition, setCondition] = useState<{[key: string]: any}>({});

  // 
  const [bizOrderStatuses,setBizOrderStatuses] = useState<string[]>([]);

  // tab
  const [tab, setTab] = useState<any[]>([]);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.exactSearch' }),
      children: (
        <div>
          {/* <PriceRangeInput /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </div>
      ),
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.orderStatus' }),
      children: (
      <>
        <Checkbox.Group value={bizOrderStatuses} style={{ display:"flex",flexDirection:"column",gap:"12px" }} options={[
          { label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.processing' }), value: '1' },
          { label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.cancelled' }), value: '0' },
          { label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.archived' }), value: '-1' },
        ]} onChange={(e)=>{
          setBizOrderStatuses(e)
        }} />
        <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
      </>),
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.paymentStatus' }),
      children: (
        <>
        <CustomizeProductTypeSelector/>
        <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },{
      key: '4',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.refundOrder' }),
      children: (
        <>
        <CustomizeProductTypeSelector/>
        <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },{
      key: '5',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.shippingStatus' }),
      children: (
        <>
        <CustomizeProductTypeSelector/>
        <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },{
      key: '6',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.returnStatus' }),
      children: (
        <>
        <CustomizeProductTypeSelector/>
        <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '7',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.shippingMethod' }),
      children: (
        <>
          {/* <TransportMethodSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '8',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.paymentMethod' }),
      children: (
        <>
          {/* <PaymentMethodSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '9',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.tag' }),
      children: (
        <>
          {/* <TagSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '10',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.productTag' }),
      children: (
        <>
          {/* <ProductTagSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '11',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.landingPageDomain' }),
      children: (
        <>
          {/* <LandingPageDomainSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '12',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.landingPageParams' }),
      children: (
        <>
          {/* <LandingPageParamsSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '13',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.referrerDomain' }),
      children: (
        <>
          {/* <ReferrerDomainSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '14',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.referrerParams' }),
      children: (
        <>
          {/* <ReferrerParamsSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '15',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.orderDate' }),
      children: (
        <>
          {/* <OrderDateSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '16',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.archiveOrder' }),
      children: (
        <>
          {/* <ArchivedOrderSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '17',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.chargebackStatus' }),
      children: (
        <>
          {/* <ChargebackInquiryStatusSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '18',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.orderSource' }),
      children: (
        <>
          {/* <OrderSourceSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '19',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.orderProductEditStatus' }),
      children: (
        <>
          {/* <OrderProductEditStatusSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '20',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.pickingListExportStatus' }),
      children: (
        <>
          {/* <PickingListExportStatusSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '21',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.orderDetailsExportStatus' }),
      children: (
        <>
          {/* <OrderDetailsExportStatusSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '22',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.accountingPaymentStatus' }),
      children: (
        <>
          {/* <AccountingPaymentStatusSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '23',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.transferProofUploadStatus' }),
      children: (
        <>
          {/* <TransferProofUploadStatusSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '24',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.discountCode' }),
      children: (
        <>
          {/* <DiscountCodeSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '25',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.countryRegion' }),
      children: (
        <>
          {/* <CountryRegionSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '26',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.orderAmount' }),
      children: (
        <>
          {/* <OrderAmountSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '27',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.firstInteractionSource' }),
      children: (
        <>
          {/* <FirstInteractionSourceSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '28',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.lastInteractionSource' }),
      children: (
        <>
          {/* <LastInteractionSourceSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '29',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.fraudRisk' }),
      children: (
        <>
          {/* <FraudRiskSelector /> */}
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
    {
      key: '30',
      label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.shop' }),
      children: (
        <>
          <Radio.Group
            value={condition.saleStoreHandles??undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
            options={[
              { value: 0, label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.allShops' }) },
              { value: 1, label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.currentShop' }) },
            ]}
            onChange={(e)=>{
              setCondition({
                ...condition,
                saleStoreHandles:e.target.value
              })
              // 
              // let newTab = [...tab]
              // newTab.forEach((item)=>{
              //   if(item.id == 30){
              //     item.label = e.target.value == 0 ? "所有店铺" : "当前店铺"
              //     item.value = e.target.value == 0 ? "所有店铺" : "当前店铺"
              //   }
              // })
              // setTab(newTab)
            }}
          />
          <div className={'cleanText'}>{intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.clear' })}</div>
        </>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onReset = () => {
    setCondition({});
  };

  useEffect(()=>{
    setCondition({...orderList.condition})
    setTab([...orderList.tagsStatusList])
    setBizOrderStatuses([...orderList.bizOrderStatuses])
  },[orderList.bizOrderStatuses])

  return (
    <Scoped ref={Ref}>
      <DefaultButton text={intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.moreselect' })} onClick={showDrawer} />
      <Drawer
        title={intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.filterTitle' })}
        open={open}
        onClose={onClose}
        getContainer={() => Ref.current!}
        footer={
          <Flex gap={12} justify='flex-end' style={{padding:"6px 0"}}>
            <DefaultButton text={intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.reset' })} onClick={onReset} />
            <PrimaryButton text={intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.done' })} onClick={()=>{
              setOpen(false);
              orderList.setCondition({...condition})
              orderList.setTagsStatusList([...tab])
              orderList.setBizOrderStatuses([...bizOrderStatuses])
            }} />
          </Flex>
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
    margin-top: 12px;
    color: #7A8499;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
  }

`