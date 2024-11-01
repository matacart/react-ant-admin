// DraftPaidCard.js
import React, { useEffect } from 'react';
import { Card, Form, InputNumber, Divider } from 'antd';

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
    <Card style={{ width: '980px' }} title={<div>收款</div>}>
      <Form>
        <div style={itemStyle}>
          <span style={labelStyle}>成本价</span>
          <span style={amountStyle}>{`US$${costPrice.toFixed(2)}`}</span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>小计</span>
          <span style={amountStyle}>{`US$${subtotal.toFixed(2)}`}</span>
        </div>

        <div style={itemStyle}>
          <span style={discountLabelStyle}>{isDiscountEditable ? '折扣编辑' : '折扣'}</span>
          <InputNumber
            value={initialDiscountValue}
            disabled={!isDiscountEditable}
            onChange={(value) => onUpdateDiscount(value)}
          />
        </div>

        <div style={itemStyle}>
          <span style={discountLabelStyle}>{isShippingFeeEditable ? '运费编辑' : '运费'}</span>
          <InputNumber
            value={initialShippingFeeValue}
            disabled={!isShippingFeeEditable}
            onChange={(value) => onUpdateShippingFee(value)}
          />
        </div>

        <div style={itemStyle}>
          <span style={totalLabelStyle}>{isTaxEditable ? '税费编辑' : '税费'}</span>
          <InputNumber
            value={initialTaxValue}
            disabled={!isTaxEditable}
            onChange={(value) => onUpdateTax(value)}
          />
        </div>
      </Form>

      <Divider />

      <Form>
        <div style={itemStyle}>
          <span style={totalLabelStyle}>合计</span>
          <span style={totalAmountStyle}>{`US$${total.toFixed(2)}`}</span>
        </div>
      </Form>
    </Card>
  );
}

export default DraftPaidCard;

// 定义样式
const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const labelStyle = {
  fontSize: '14px',
  color: '#474F5E',
};

const discountLabelStyle = {
  fontSize: '14px',
  color: '#B8BECC',
};

const totalLabelStyle = {
  fontSize: '14px',
  color: '#242833',
};

const amountStyle = {
  fontSize: '14px',
  color: '#474F5E',
};

const discountAmountStyle = {
  fontSize: '14px',
  color: '#B8BECC',
};

const totalAmountStyle = {
  fontSize: '14px',
  color: '#242833',
};