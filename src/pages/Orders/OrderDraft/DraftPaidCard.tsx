import React from 'react';
import { Card, Form, Divider } from 'antd';


function App() {
  return (
    <Card style={{ width: '980px' }} title={<div>收款</div>}>
      <Form>
        <div style={itemStyle}>
          <span style={labelStyle}>成本价</span>
          <span style={amountStyle}>US$0.00</span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>小计</span>
          <span style={amountStyle}>US$0.00</span>
        </div>

        <div style={itemStyle}>
          <span style={discountLabelStyle}>折扣</span>
          <span style={discountAmountStyle}>-US$0.00</span>
        </div>

        <div style={itemStyle}>
          <span style={discountLabelStyle}>运费</span>
          <span style={discountAmountStyle}>US$0.00</span>
        </div>

        <div style={itemStyle}>
          <span style={totalLabelStyle}>税费</span>
          <span style={amountStyle}>US$0.00</span>
        </div>
      </Form>

      <Divider />

      <Form>
        <div style={itemStyle}>
          <span style={totalLabelStyle}>合计</span>
          <span style={totalAmountStyle}>US$0.00</span>
        </div>
      </Form>
    </Card>
  );
}

export default App;
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
