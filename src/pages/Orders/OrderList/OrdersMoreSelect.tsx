import React, { useEffect, useRef, useState } from 'react';
import { Button, ConfigProvider, Drawer, Flex, Radio } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useIntl } from '@umijs/max';
import CustomizeProductTypeSelector from '@/components/Select/CustomizeProductTypeSelector';
import styled from 'styled-components';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import orderList from '@/store/order/orderList';

// 新增类型定义
interface ConditionType {
  saleStoreHandles?: number;
}

export default function MoreSelect(){

  const Ref = useRef(null);

  const intl = useIntl();
  const [open, setOpen] = useState(false);

  // 条件
  const [condition, setCondition] = useState({});

  // tab
  const [tab, setTab] = useState<any[]>([]);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '精确搜索',
      children: (
        <div>
          {/* <PriceRangeInput /> */}
          <div className={'cleanText'}>清除</div>
        </div>
      ),
    },
    {
      key: '2',
      label: '订单状态',
      children: (
      <>
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
    {
      key: '30',
      label: '店铺',
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
              { value: 0, label: '所有店铺' },
              { value: 1, label: '当前店铺' },
            ]}
            onChange={(e)=>{
              setCondition({
                ...condition,
                saleStoreHandles:e.target.value
              })
              console.log(e.target)
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
          <div className={'cleanText'}>清除</div>
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
  },[])

  return (
    <Scoped ref={Ref}>
      <DefaultButton text={intl.formatMessage({ id: 'order.button.moreselect' })} onClick={showDrawer} />
      <Drawer
        title="筛选"
        open={open}
        onClose={onClose}
        getContainer={() => Ref.current!}
        footer={
          <Flex gap={12} justify='flex-end' style={{padding:"6px 0"}}>
            <DefaultButton text={'重置'} onClick={onReset} />
            <PrimaryButton text={'完成'} onClick={()=>{
              setOpen(false);
              orderList.setCondition({...condition})
              orderList.setTagsStatusList([...tab])
              console.log(condition)
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
    margin-top: 16px;
    color: #7A8499;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
  }

`