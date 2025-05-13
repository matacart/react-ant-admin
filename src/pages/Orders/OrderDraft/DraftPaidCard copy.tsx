// DraftPaidCard.js
import React, { useEffect } from 'react';
import { Card, Form, InputNumber, Divider, Flex } from 'antd';
import SimpleCard from '@/components/Card/SimpleCard';

function DraftPaidCard(props: { products: any; discount: any; shippingFee: any; tax: any; onUpdateDiscount: any; onUpdateShippingFee: any; onUpdateTax: any; }) {
  const { products, discount, shippingFee, tax, onUpdateDiscount, onUpdateShippingFee, onUpdateTax } = props;

  const calculateSubtotal = () => {
    return products.reduce((acc: any, product: { total: any; }) => acc + product.total, 0);
  };

  const calculateCostPrice = () => {
    return products.reduce((acc: number, product: { quantity: number; price: number; }) => acc + product.quantity * product.price, 0);
  };

  const subtotal = calculateSubtotal();
  const costPrice = calculateCostPrice();
  const total = subtotal - discount + shippingFee + tax;

  // 初始状态为不可编辑
  const [isDiscountEditable, setIsDiscountEditable] = React.useState(false);
  const [isShippingFeeEditable, setIsShippingFeeEditable] = React.useState(false);
  const [isTaxEditable, setIsTaxEditable] = React.useState(false);

  useEffect(() => {
    // 检查 products 是否有变化
    if (products.length > 0) {
      // 假设只要 products 有变化就设置为可编辑
      setIsDiscountEditable(true);
      setIsShippingFeeEditable(true);
      setIsTaxEditable(true);
    }
  }, [products]);

  // 初始状态为 US$0.00
  const initialDiscountValue = isDiscountEditable ? discount : 0;
  const initialShippingFeeValue = isShippingFeeEditable ? shippingFee : 0;
  const initialTaxValue = isTaxEditable ? tax : 0;

  return (
    <SimpleCard title={<div>收款</div>} content={
      <>
        <Flex gap={8} vertical>
          <Flex justify="space-between">
            <div>成本价</div>
            <div>US$0.00</div>
          </Flex>
          <Flex justify="space-between">
            <div>小计</div>
            <div>US$0.00</div>
          </Flex>
          <Flex justify="space-between">
            <div style={{width:"20%"}}>编辑折扣</div>
            <div style={{flex:1}}>22222</div>
            <div>-US$0.00</div>
          </Flex>
          <Flex justify="space-between">
            <div style={{width:"20%"}}>编辑运费</div>
            <div style={{flex:1}}>22222</div>
            <div>-US$0.00</div>
          </Flex>
          <Flex justify="space-between">
            <div style={{width:"20%"}}>税费</div>
            <div style={{flex:1}}>22222</div>
            <div>-US$0.00</div>
          </Flex>
          <Flex justify="space-between">
            <div>合计</div>
            <div>US$0.00</div>
          </Flex>
        </Flex>
        <Divider />

      </>
    } />
  );
}

export default DraftPaidCard;
