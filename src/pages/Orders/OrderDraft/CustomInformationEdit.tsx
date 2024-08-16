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
// 新增的状态
const [isNewCustomerModalVisible, setNewCustomerModalVisible] = useState(false);
  const [newCustomerInfo, setNewCustomerInfo] = useState<{ name: string; familyname: string; email: string; phone: string }>({ name: '', familyname: '', email: '', phone: '' });
  const [isCustomerInfoShown, setIsCustomerInfoShown] = useState(false); // 控制客户信息是否展示
  const [showSearchBox, setShowSearchBox] = useState(true); // 控制搜索框的显示状态
  const [selectedCustomer, setSelectedCustomer] = useState<{ name: string; familyname: string; email: string; phone: string } | null>(null); // 当前选中的客户信息
  const [historyRecords, setHistoryRecords] = useState<{ name: string; familyname: string; email: string; phone: string }[]>([]); // 储存客户记录

  const onCreateNewCustomer = (value: string) => {
    if (value === '+ 创建新客户') {
      setNewCustomerModalVisible(true);
      setShowSearchBox(false); // 隐藏搜索框
    }
  };

  // 选择历史记录中客户信息
  const handleHistoryRecordSelect = (value: string) => {
    const selectedRecord = historyRecords.find(record => `${record.name} (${record.email})` === value);
    if (selectedRecord) {
      setSelectedCustomer(selectedRecord);
      setIsCustomerInfoShown(true); // 展示选中客户信息
    }
  };

  // 保存新客户信息并添加到历史记录
  const handleNewCustomerOk = () => {
    setHistoryRecords([...historyRecords, { ...newCustomerInfo }]);
    setNewCustomerModalVisible(false);
    setSelectedCustomer(newCustomerInfo); // 同时展示刚创建的客户信息
  };

  const handleNewCustomerCancel = () => {
    setNewCustomerModalVisible(false);
    setNewCustomerInfo({ name: '', familyname: '', email: '', phone: '' }); // 重置客户信息
    setIsCustomerInfoShown(false); // 不展示客户信息
    setShowSearchBox(true); // 显示搜索框
  };

  // 新增删除客户信息的处理函数
  const handleDeleteCustomerInfo = () => {
    setSelectedCustomer(null); // 清除选中的客户
    setNewCustomerInfo({ name: '', familyname: '', email: '', phone: '' });
    setIsCustomerInfoShown(false); // 隐藏客户信息
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
                  ...historyRecords.map(record => ({ value: `${record.name} (${record.email})`, key: record.email })),
                  { value: '+ 创建新客户', key: 'createNew' },
                ]}
                onSelect={(value, option) => {
                  if (option.key === 'createNew') {
                    onCreateNewCustomer(value);
                  } else {
                    handleHistoryRecordSelect(value);
                  }
                }}
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
        {selectedCustomer && (
          <div style={{ marginTop: '10px' }}> {/* 添加外层 div 并设置样式 */}
            <p style={{ fontSize: '14px', color: '#356DFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              {`${selectedCustomer.name} ${selectedCustomer.familyname}`}
              <DeleteOutlined onClick={handleDeleteCustomerInfo} style={{ fontSize: '16px', color: 'red' }} />
            </p>
            <p style={{ fontSize: '14px', color: '#474F5E', margin: '0 0 2px 0' }}>{selectedCustomer.phone}</p>
            <p style={{ fontSize: '14px', color: '#356DFF', margin: '0' }}>{selectedCustomer.email}</p>
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
      <div style={{fontSize:'14px',color:'#474F5E'}}>
     { `${deliveryAddress.name}${deliveryAddress.familyname}`}<br />
      {deliveryAddress.phone}<br />
      { `${deliveryAddress.company},${deliveryAddress.address},${deliveryAddress.address2} 
      ,${deliveryAddress.district}
      ,${deliveryAddress.city}
      ${deliveryAddress.province}`}<br />
      {`${deliveryAddress.postalCode},${deliveryAddress.country}`}
      </div>
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
      <div style={{fontSize:'14px',color:'#474F5E'}}>
     { `${billingAddress.name}${billingAddress.familyname}`}<br />
      {billingAddress.phone}<br />
      { `${billingAddress.company},${billingAddress.address},${billingAddress.address2} 
      ,${billingAddress.district}
      ,${billingAddress.city}
      ${billingAddress.province}`}<br />
      {`${billingAddress.postalCode},${billingAddress.country}`}
      </div>
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
                  value={newCustomerInfo.name} onChange={e => setNewCustomerInfo(prevState => ({ ...prevState, name: e.target.value }))} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">姓氏</label>
                  <Input placeholder="请填写姓氏" style={{ marginTop: '4px' }} 
                   value={newCustomerInfo.familyname} onChange={e => setNewCustomerInfo(prevState => ({ ...prevState, familyname: e.target.value }))} />
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
      value={newCustomerInfo.email} onChange={e => setNewCustomerInfo(prevState => ({ ...prevState, email: e.target.value }))} />
    </Form.Item>

    <Form.Item
      name="lastName"
      rules={[{ required: true, message: 'Please input your last name!' }]}
    >
      <label htmlFor="lastName">手机</label>
      <Input placeholder="请填写手机号" style={{ marginTop: '4px' }} 
     value={newCustomerInfo.phone} onChange={e => setNewCustomerInfo(prevState => ({ ...prevState, phone: e.target.value }))} />
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
