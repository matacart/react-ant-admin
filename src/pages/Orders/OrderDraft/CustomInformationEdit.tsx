import React, { useState } from 'react';
import { Card, Divider, Form, Modal, Button, Input, Select, Row, Col } from 'antd';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';
import AutoComplete from 'antd/lib/auto-complete';
import Space from 'antd/lib/space';
import { DeleteOutlined } from '@ant-design/icons/lib/icons';


export default function CustomInformationEdit() {   
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
  const [isBillingModalVisible, setIsBillingModalVisible] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(true); // 控制搜索框是否显示
  const [deliveryAddress, setDeliveryAddress] = useState<{ 
    name: string; 
    familyname:string;
    address: string; 
    address2: string; 
    city: string; 
    province: string; 
    country:string;
    postalCode: string; 
    district: string; 
    company:string;
    phone: string 
  }>({ name: '', country:' ',familyname:' ',address: '', address2: '',city: '', province: '',company:' ', postalCode: '', district: '', phone: '' });
  const [billingAddress, setBillingAddress] = useState<{ 
    name: string; 
    familyname:string;
    address: string; 
    address2: string; 
    city: string; 
    province: string; 
    country:string;
    postalCode: string; 
    district: string; 
    company:string;
    phone: string 
  }>({ name: '', country:' ',familyname:' ',address: '', address2: '',city: '', province: '',company:' ', postalCode: '', district: '', phone: '' });
  // 模态框内的处理
  const handleDeliveryAddressChange = (key: keyof typeof deliveryAddress, value: string) => {
    setDeliveryAddress(prevState => ({ ...prevState, [key]: value }));
  };

  const handleBillingAddressChange = (key: keyof typeof billingAddress, value: string) => {
    setBillingAddress(prevState => ({ ...prevState, [key]: value }));
  };
 // 新增保存函数
 const saveDeliveryAddress = () => {
  // 这里可以添加保存到服务器的逻辑
  console.log('Saving delivery address:', deliveryAddress);
  setIsDeliveryModalVisible(false); // 关闭模态框
};

const saveBillingAddress = () => {
  // 这里可以添加保存到服务器的逻辑
  console.log('Saving billing address:', billingAddress);
  setIsBillingModalVisible(false); // 关闭模态框
};
const [isNewCustomerModalVisible, setNewCustomerModalVisible] = useState(false);  
const [newCustomerInfo, setNewCustomerInfo] = useState<{ name: string; familyname:string;email: string; phone: string }>({ name: '', familyname:' ',email: '', phone: '' });
    const onCreateNewCustomer = (value: string) => {  
    if (value === '+ 创建新客户') {  
      setNewCustomerModalVisible(true);  
      // 可以在这里添加代码来清空搜索框，如果使用了受控组件的话  
    }  
  };  
  
  const handleNewCustomerOk = () => {  
    setNewCustomerModalVisible(false);
    setShowSearchBox(false); // 隐藏搜索框  
    setNewCustomerInfo({ name: newCustomerInfo.name,familyname:newCustomerInfo.familyname, email: newCustomerInfo.email, phone: newCustomerInfo.phone });  
  };  
  
  const handleNewCustomerCancel = () => {  
    setNewCustomerModalVisible(false);  
  };  
  // 新增删除客户信息的处理函数
  const handleDeleteCustomerInfo = () => {
    setNewCustomerInfo({ name: '', familyname: '', email: '', phone: '' });
    setShowSearchBox(true); // 显示搜索框
  };

  return (  
<StyledCard
      style={{ width: '300px' }}
      title={
        <TitleWrapper>
          <div>
            <Label>客户</Label>
            {showSearchBox && ( // 根据状态控制搜索框的显示与隐藏
              <AutoComplete
                style={{ width: '110%' }}
                placeholder="搜索或创建客户"
                options={[
                  { value: '+ 创建新客户', key: 'createNew' },
                ]}
                onSelect={onCreateNewCustomer}
              >
                <SearchInput />
              </AutoComplete>
            )}
          </div>
          
        </TitleWrapper>
        
      }
    >
      <Form>
          {/* 新客户信息展示 */}
          {newCustomerInfo.name && (
            <div style={{ marginTop: '10px' }}> {/* 添加外层 div 并设置样式 */}
              <p style={{ fontSize: '14px', color: '#356DFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                {`${newCustomerInfo.name} ${newCustomerInfo.familyname}`}
                <DeleteOutlined onClick={handleDeleteCustomerInfo} style={{ fontSize: '16px',color:'red' }} />
              </p>
              <p style={{ fontSize: '14px', color: '#474F5E', margin: '0 0 2px 0' }}>{newCustomerInfo.phone}</p>
              <p style={{ fontSize: '14px', color: '#356DFF', margin: '0' }}>{newCustomerInfo.email}</p>
            </div>
          )}
      </Form>
      <Divider />
      <Form>
        <TitleWrapper>
          <Label>收获地址</Label>
          <EditButton onClick={() => setIsDeliveryModalVisible(true)}>编辑</EditButton>
          </TitleWrapper>
  {/* Render the address if it exists */}
  {deliveryAddress.address ? (
    <PlaceholderText>
      地址: {deliveryAddress.address}<br />
      城市: {deliveryAddress.city}<br />
      省份: {deliveryAddress.province}<br />
      邮政编码: {deliveryAddress.postalCode}<br />
      区: {deliveryAddress.district}<br />
      手机: {deliveryAddress.phone}
    </PlaceholderText>
  ) : (
    <PlaceholderText>暂无地址</PlaceholderText>
  )}
      </Form>
      <Divider />
      <Form>
        <TitleWrapper>
          <Label>账单地址</Label>
          <EditButton onClick={() => setIsBillingModalVisible(true)}>编辑</EditButton>
        </TitleWrapper>
       {/* Render the address if it exists */}
       {billingAddress.address ? (
          <PlaceholderText>
            地址: {billingAddress.address}<br />
            城市: {billingAddress.city}<br />
            省份: {billingAddress.province}<br />
            邮政编码: {billingAddress.postalCode}<br />
            区: {billingAddress.district}<br />
            手机: {billingAddress.phone}
          </PlaceholderText>
        ) : (
          <PlaceholderText>暂无地址</PlaceholderText>
        )}
      </Form>
 {/* 收获地址模态框 */}
      <Modal
        title="收获地址"
        visible={isDeliveryModalVisible}
        onOk={saveDeliveryAddress} // 更新 onOk 为保存函数
        onCancel={() => setIsDeliveryModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="选择地址">
            <Select placeholder="使用新地址" 
           >
              <Option value="Yiminghe">使用新地址</Option>
            </Select>
          </Form.Item>
          <Form.Item label="国家/地区">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
              value={deliveryAddress.country}
              onChange={(value) => handleDeliveryAddressChange('country', value)}
            >
              <Option value="中国" key="中国">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">名</label>
                  <Input placeholder="名" style={{ marginTop: '4px' }} 
                    value={deliveryAddress.name}
                    onChange={(e) => handleDeliveryAddressChange('name', e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">姓</label>
                  <Input placeholder="姓" style={{ marginTop: '4px' }}
                   value={deliveryAddress.familyname}
                   onChange={(e) => handleDeliveryAddressChange('familyname', e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">省份</label>
                  <Input placeholder="省份" style={{ marginTop: '4px' }} 
                   value={deliveryAddress.province}
                  onChange={(e) => handleDeliveryAddressChange('province', e.target.value)}/>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">城市</label>
                  <Input placeholder="城市" style={{ marginTop: '4px' }} 
                    value={deliveryAddress.city}
                    onChange={(e) => handleDeliveryAddressChange('city', e.target.value)}/>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="区">
            <Input placeholder="区" style={{ width: '100%', height: '32px' }} 
              value={deliveryAddress. district}
              onChange={(e) => handleDeliveryAddressChange('district', e.target.value)}/>
          </Form.Item>
          <Form.Item label="公司">
            <Input placeholder="公司" style={{ width: '100%', height: '32px' }} 
            value={deliveryAddress.company}
            onChange={(e) => handleDeliveryAddressChange('company', e.target.value)}
             />
          </Form.Item>
          <Form.Item label="详细地址">
            <Input placeholder="详细地址" style={{ width: '100%', height: '32px' }}
             value={deliveryAddress.address}
             onChange={(e) => handleDeliveryAddressChange('address', e.target.value)} />
          </Form.Item>
          <Form.Item label="详细地址2">
            <Input placeholder="详细地址2" style={{ width: '100%', height: '32px' }} 
             value={deliveryAddress.address2}
            onChange={(e) => handleDeliveryAddressChange('address2', e.target.value)}/>
          </Form.Item>
          <Form.Item label="邮政">
            <Input placeholder="邮政" style={{ width: '100%', height: '32px' }} 
              value={deliveryAddress.postalCode}
              onChange={(e) => handleDeliveryAddressChange('postalCode', e.target.value)}/>
          </Form.Item>
          <Form.Item label="手机">
            <Input placeholder="手机" style={{ width: '100%', height: '32px' }} 
              value={deliveryAddress.phone}
              onChange={(e) => handleDeliveryAddressChange('phone', e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>






        {/* 账单地址模态框 */}
        <Modal
        title="账单地址"
        visible={isBillingModalVisible}
        onOk={saveBillingAddress} // 更新 onOk 为保存函数
        onCancel={() => setIsBillingModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="选择地址">
            <Select placeholder="使用新地址" 
           >
              <Option value="Yiminghe">使用新地址</Option>
            </Select>
          </Form.Item>
          <Form.Item label="国家/地区">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
              value={billingAddress.country}
              onChange={(value) => handleBillingAddressChange('country', value)}
            >
              <Option value="中国" key="中国">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">名</label>
                  <Input placeholder="名" style={{ marginTop: '4px' }} 
                    value={billingAddress.name}
                    onChange={(e) => handleBillingAddressChange('name', e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">姓</label>
                  <Input placeholder="姓" style={{ marginTop: '4px' }}
                   value={billingAddress.familyname}
                   onChange={(e) => handleBillingAddressChange('familyname', e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">省份</label>
                  <Input placeholder="省份" style={{ marginTop: '4px' }} 
                   value={billingAddress.province}
                  onChange={(e) => handleBillingAddressChange('province', e.target.value)}/>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">城市</label>
                  <Input placeholder="城市" style={{ marginTop: '4px' }} 
                    value={billingAddress.city}
                    onChange={(e) => handleBillingAddressChange('city', e.target.value)}/>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="区">
            <Input placeholder="区" style={{ width: '100%', height: '32px' }} 
              value={billingAddress. district}
              onChange={(e) => handleBillingAddressChange('district', e.target.value)}/>
          </Form.Item>
          <Form.Item label="公司">
            <Input placeholder="公司" style={{ width: '100%', height: '32px' }} 
            value={billingAddress.company}
            onChange={(e) => handleBillingAddressChange('company', e.target.value)}
             />
          </Form.Item>
          <Form.Item label="详细地址">
            <Input placeholder="详细地址" style={{ width: '100%', height: '32px' }}
             value={billingAddress.address}
             onChange={(e) => handleBillingAddressChange('address', e.target.value)} />
          </Form.Item>
          <Form.Item label="详细地址2">
            <Input placeholder="详细地址2" style={{ width: '100%', height: '32px' }} 
             value={billingAddress.address2}
            onChange={(e) => handleBillingAddressChange('address2', e.target.value)}/>
          </Form.Item>
          <Form.Item label="邮政">
            <Input placeholder="邮政" style={{ width: '100%', height: '32px' }} 
              value={billingAddress.postalCode}
              onChange={(e) => handleBillingAddressChange('postalCode', e.target.value)}/>
          </Form.Item>
          <Form.Item label="手机">
            <Input placeholder="手机" style={{ width: '100%', height: '32px' }} 
              value={billingAddress.phone}
              onChange={(e) => handleBillingAddressChange('phone', e.target.value)}/>
          </Form.Item>
        </Form>
      </Modal>


      {/* 创建客户模态框 */}
      <Modal
        title="创建客户"
        visible={isNewCustomerModalVisible}
        onOk={handleNewCustomerOk}
        onCancel={handleNewCustomerCancel}
      >
        <Form>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">名字</label>
                  <Input placeholder="请填写名字" style={{ marginTop: '4px' }} 
                   onChange={(e) => setNewCustomerInfo({ ...newCustomerInfo, name: e.target.value })}/>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">姓氏</label>
                  <Input placeholder="请填写姓氏" style={{ marginTop: '4px' }} 
                     onChange={(e) => setNewCustomerInfo({ ...newCustomerInfo, familyname: e.target.value })}/>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
      name="firstName"
      rules={[{ required: true, message: 'Please input your first name!' }]}
    >
      <label htmlFor="firstName">邮箱</label>
      <Input placeholder="请填写邮箱" style={{ marginTop: '4px' }} 
       onChange={(e) => setNewCustomerInfo({ ...newCustomerInfo, email: e.target.value })}/>
    </Form.Item>

    <Form.Item
      name="lastName"
      rules={[{ required: true, message: 'Please input your last name!' }]}
    >
      <label htmlFor="lastName">手机</label>
      <Input placeholder="请填写手机号" style={{ marginTop: '4px' }} 
       onChange={(e) => setNewCustomerInfo({ ...newCustomerInfo, phone: e.target.value })}/>
    </Form.Item>
        </Form>
      </Modal>
      
    </StyledCard>
  );
}

const { Option } = Select;

// 定义样式
const StyledCard = styled(Card)`
  background-color: #f7f8fb;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: #474F5E;
`;

const SearchInput = styled(Search)`
  width: 250px;
`;

const EditButton = styled.button`
  font-size: 14px;
  color: #356DFF;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Label = styled.p`
  font-size: 14px;
  color: #242833;
`;

const PlaceholderText = styled.div`
  font-size: 14px;
  color: #B8BECC;
  text-align: left;
`;
