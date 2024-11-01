import React, { useEffect, useState } from 'react';
import { Card, Divider, Form, Modal, Button, Input, Select, Row, Col } from 'antd';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';
import AutoComplete from 'antd/lib/auto-complete';
import Space from 'antd/lib/space';
import { DeleteOutlined } from '@ant-design/icons/lib/icons';
import { addCustomers,getAddressList,getCustomerList } from '@/services/y2/customer';

export default function CustomInformationEdit() {
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
  const [isBillingModalVisible, setIsBillingModalVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<{
    firstName: string;
    lastName: string; 
    realname: string; 
    familyname:string;
    address: string; 
    address2: string; 
    city: string; 
    province: string; 
    country:string;
    postalCode: string; 
    district: string; 
    company:string;
    tel: string 
  }>({  firstName: '',
    lastName: '',realname: '', familyname: '', address: '', address2: '', city: '', province: '', country: '', postalCode: '', district: '', company: '', tel: '' });
  const [billingAddress, setBillingAddress] = useState<{ 
    realname: string; 
    familyname:string;
    address: string; 
    address2: string; 
    city: string; 
    province: string; 
    country:string;
    postalCode: string; 
    district: string; 
    company:string;
    tel: string 
  }>({ realname: '', familyname: '', address: '', address2: '', city: '', province: '', country: '', postalCode: '', district: '', company: '', tel: '' });

  // 新增状态用于保存原始的收获地址和账单地址
  const [originalDeliveryAddress, setOriginalDeliveryAddress] = useState<{ 
    realname: string; 
    familyname:string;
    address: string; 
    address2: string; 
    city: string; 
    province: string; 
    country:string;
    postalCode: string; 
    district: string; 
    company:string;
    tel: string 
  }>({ realname: '', familyname: '', address: '', address2: '', city: '', province: '', country: '', postalCode: '', district: '', company: '', tel: '' });
  const [originalBillingAddress, setOriginalBillingAddress] = useState<{ 
    realname: string; 
    familyname:string;
    address: string; 
    address2: string; 
    city: string; 
    province: string; 
    country:string;
    postalCode: string; 
    district: string; 
    company:string;
    tel: string 
  }>({ realname: '', familyname: '', address: '', address2: '', city: '', province: '', country: '', postalCode: '', district: '', company: '', tel: '' });

  const [isNewCustomerModalVisible, setNewCustomerModalVisible] = useState(false);
  const [newCustomerInfo, setNewCustomerInfo] = useState<{ realname: string; familyname: string; email: string; tel: string }>({ realname: '', familyname: '', email: '', tel: '' });
  const [isCustomerInfoShown, setIsCustomerInfoShown] = useState(false); // 控制客户信息是否展示
  const [showSearchBox, setShowSearchBox] = useState(true); // 控制搜索框的显示状态
  const [selectedCustomer, setSelectedCustomer] = useState<{ realname: string; familyname: string; email: string; tel: string } | null>(null); // 当前选中的客户信息
  const [historyRecords, setHistoryRecords] = useState<{ realname: string; familyname: string; email: string; tel: string }[]>([]); // 储存客户记录
  useEffect(() => {
    // 在组件挂载时获取历史记录
    const fetchHistoryRecords = async () => {
      try {
        const response = await getCustomerList(1, 10); // 假设每页获取10条记录
        setHistoryRecords(response.data); // 假设响应体中包含一个名为data的数组
      } catch (error) {
        console.error('Error fetching history records:', error);
      }
    };

    fetchHistoryRecords();
  }, []);
  const onCreateNewCustomer = (value: string) => {
    if (value === '+ 创建新客户') {
      setNewCustomerModalVisible(true);
      setShowSearchBox(false); // 隐藏搜索框
    }
  };

  const handleHistoryRecordSelect = (value: string) => {
    const selectedRecord = historyRecords.find(record => `${record.realname} (${record.email})` === value);
    if (selectedRecord) {
      setSelectedCustomer(selectedRecord);
      setIsCustomerInfoShown(true); // 展示选中客户信息

      // 更新收获地址和账单地址
      setOriginalDeliveryAddress({
        realname: selectedRecord.realname,
        familyname: selectedRecord.familyname,
        address: '', // 可以从数据库获取具体的地址
        address2: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        district: '',
        company: '',
        tel: selectedRecord.tel
      });
      setOriginalBillingAddress({
        realname: selectedRecord.realname,
        familyname: selectedRecord.familyname,
        address: '', // 同上
        address2: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        district: '',
        company: '',
        tel: selectedRecord.tel
      });
    }
  };

  const handleNewCustomerOk = async () => {
    try {
      // 确保 newCustomerInfo 有值
      if (!newCustomerInfo.realname || !newCustomerInfo.email || !newCustomerInfo.tel) {
        throw new Error('Please fill in all required fields.');
      }

      await addCustomers(newCustomerInfo);
      setHistoryRecords([...historyRecords, { ...newCustomerInfo }]);
      setNewCustomerModalVisible(false);
      setSelectedCustomer(newCustomerInfo);
      setIsCustomerInfoShown(true);

      // 更新收获地址和账单地址
      setOriginalDeliveryAddress({
        realname: newCustomerInfo.realname,
        familyname: newCustomerInfo.familyname,
        address: '', // 可以从数据库获取具体的地址
        address2: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        district: '',
        company: '',
        tel: newCustomerInfo.tel
      });
      setOriginalBillingAddress({
        realname: newCustomerInfo.realname,
        familyname: newCustomerInfo.familyname,
        address: '', // 同上
        address2: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        district: '',
        company: '',
        tel: newCustomerInfo.tel
      });
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };

  const handleNewCustomerCancel = () => {
    setNewCustomerModalVisible(false);
    setNewCustomerInfo({ realname: '', familyname: '', email: '', tel: '' }); // 重置客户信息
    setIsCustomerInfoShown(false); // 不展示客户信息
    setShowSearchBox(true); // 显示搜索框
  };

  const handleDeleteCustomerInfo = () => {
    // 清除选中的客户信息
    setSelectedCustomer(null);
    setNewCustomerInfo({ realname: '', familyname: '', email: '', tel: '' });
    setIsCustomerInfoShown(false); // 隐藏客户信息
    setShowSearchBox(true); // 显示搜索框

    // 清除相关的收获地址和账单地址
    setOriginalDeliveryAddress({ realname: '', familyname: '', address: '', address2: '', city: '', province: '', country: '', postalCode: '', district: '', company: '', tel: '' });
    setOriginalBillingAddress({ realname: '', familyname: '', address: '', address2: '', city: '', province: '', country: '', postalCode: '', district: '', company: '', tel: '' });
  };
  const saveDeliveryAddress = () => {
    // 这里可以添加保存到服务器的逻辑
    console.log('Saving delivery address:', deliveryAddress);
    setIsDeliveryModalVisible(false); // 关闭模态框
    // 保存收获地址到界面上
    setOriginalDeliveryAddress(deliveryAddress);
  };

  const saveBillingAddress = () => {
    // 这里可以添加保存到服务器的逻辑
    console.log('Saving billing address:', billingAddress);
    setIsBillingModalVisible(false); // 关闭模态框
    // 保存账单地址到界面上
    setOriginalBillingAddress(billingAddress);
  };



  type AddressOption = {
    value: string;
    label: string;
  };
  
  type CountryList = AddressOption[];
  
  type ProvinceList = AddressOption[];
  
  type CityList = AddressOption[];
  
  const [countryOptions, setCountryOptions] = useState<CountryList>([]);
  const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
  const [cityOptions, setCityOptions] = useState<CityList>([]);
  
  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await getAddressList('countries', 100);
        const countryList = response.data.country_option.map((item: any) => ({
          value: item.country_id,
          label: item.country_name,
        }));
  
        setCountryOptions(countryList);
      } catch (error) {
        console.error('Error fetching country list:', error);
      }
    };
  
    fetchCountryList();
  }, []);
  
 
const fetchProvinceList = async (countryValue: string) => {
  try {
    const response = await getAddressList(`provinces?country=${countryValue}`, 100);
    const provinceList = JSON.parse(response.data.country_list); // 解析 JSON 字符串
    const parsedProvinceList = Object.values(provinceList).flat().map((item: any) => ({
      value: item.id,
      label: item.base_name,
    }));

    setProvinceOptions(parsedProvinceList);
  } catch (error) {
    console.error('Error fetching province list:', error);
  }
};
  
  const fetchCityList = async (provinceValue: string) => {
    try {
      const response = await getAddressList(`cities?province=${provinceValue}`,100);
      const cityList = Object.values(response.data).flat().map((item: any) => ({
        value: item.id,
        label: item.base_name, 
      }));
  
      setCityOptions(cityList);
    } catch (error) {
      console.error('Error fetching city list:', error);
    }
  };
  
  const handleDeliveryAddressChange = (key: keyof typeof deliveryAddress, value: string) => {
    if (key === 'country') {
      fetchProvinceList(value);
    } else if (key === 'province') {
      fetchCityList(value);
    }
    setDeliveryAddress(prevState => ({ ...prevState, [key]: value }));
  };
  
  const handleBillingAddressChange = (key: keyof typeof billingAddress, value: string) => {
    if (key === 'country') {
      fetchProvinceList(value);
    } else if (key === 'province') {
      fetchCityList(value);
    }
    setBillingAddress(prevState => ({ ...prevState, [key]: value }));
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
                { value: '+ 创建新客户', key: 'createNew' }, // 确保这个选项始终位于列表顶部
                ...historyRecords.map(record => ({
                  value: `${record.realname} (${record.email})`,
                  key: record.email
                })),
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
              {`${selectedCustomer.realname} ${selectedCustomer.familyname}`}
              <DeleteOutlined onClick={handleDeleteCustomerInfo} style={{ fontSize: '16px', color: 'red' }} />
            </p>
            <p style={{ fontSize: '14px', color: '#474F5E', margin: '0 0 2px 0' }}>{selectedCustomer.tel}</p>
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
        {originalDeliveryAddress.address ? (
          <PlaceholderText>
            <div style={{ fontSize: '14px', color: '#474F5E' }}>
              {`${originalDeliveryAddress.realname}${originalDeliveryAddress.familyname}`}<br />
              {originalDeliveryAddress.tel}<br />
              {`${originalDeliveryAddress.company},${originalDeliveryAddress.address},${originalDeliveryAddress.address2} 
              ,${originalDeliveryAddress.district}
              ,${originalDeliveryAddress.city}
              ${originalDeliveryAddress.province}`}<br />
              {`${originalDeliveryAddress.postalCode},${originalDeliveryAddress.country}`}
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
        {originalBillingAddress.address ? (
          <PlaceholderText>
            <div style={{ fontSize: '14px', color: '#474F5E' }}>
              {`${originalBillingAddress.realname}${originalBillingAddress.familyname}`}<br />
              {originalBillingAddress.tel}<br />
              {`${originalBillingAddress.company},${originalBillingAddress.address},${originalBillingAddress.address2} 
              ,${originalBillingAddress.district}
              ,${originalBillingAddress.city}
              ${originalBillingAddress.province}`}<br />
              {`${originalBillingAddress.postalCode},${originalBillingAddress.country}`}
            </div>
          </PlaceholderText>
        ) : (
          <PlaceholderText>暂无地址</PlaceholderText>
        )}
      </Form>
{/* 收货地址模态框 */}
<Modal
  title="收货地址"
  visible={isDeliveryModalVisible}
  onOk={saveDeliveryAddress} // 更新 onOk 为保存函数
  onCancel={() => setIsDeliveryModalVisible(false)}
>
  <Form layout="vertical">
    <Form.Item label="选择地址">
      <Select placeholder="使用新地址">
        <Option value="Yiminghe">使用新地址</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="国家/地区"
      name="country"
      rules={[{  message: '请选择国家/地区!' }]}
    >
      <Select
        showSearch
        optionFilterProp="children"
        style={{ width: '100%' }}
        value={deliveryAddress.country}
        onChange={(value) => handleDeliveryAddressChange('country', value)}
      >
        {countryOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label="名"
      name="firstName"
      rules={[{ message: '请输入您的名!' }]}
    >
      <Input
        placeholder="名"
        style={{ marginTop: '4px' }}
        value={deliveryAddress.firstName}
        onChange={(e) => handleDeliveryAddressChange('firstName', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="姓"
      name="lastName"
      rules={[{ message: '请输入您的姓!' }]}
    >
      <Input
        placeholder="姓"
        style={{ marginTop: '4px' }}
        value={deliveryAddress.lastName}
        onChange={(e) => handleDeliveryAddressChange('lastName', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="省份"
      name="province"
      rules={[{ message: '请选择省份!' }]}
    >
      <Select
        showSearch
        optionFilterProp="children"
        style={{ width: '100%' }}
        value={deliveryAddress.province}
        onChange={(value) => handleDeliveryAddressChange('province', value)}
      >
        {provinceOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label="城市"
      name="city"
      rules={[{  message: '请选择城市!' }]}
    >
      <Select
        showSearch
        optionFilterProp="children"
        style={{ width: '100%' }}
        value={deliveryAddress.city}
        onChange={(value) => handleDeliveryAddressChange('city', value)}
      >
        {cityOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label="区"
      name="district"
      rules={[{  message: '请选择区!' }]}
    >
      <Input
        placeholder="区"
        style={{ width: '100%', height: '32px' }}
        value={deliveryAddress.district}
        onChange={(e) => handleDeliveryAddressChange('district', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="公司"
      name="company"
      rules={[{  message: '请输入公司名称!' }]}
    >
      <Input
        placeholder="公司"
        style={{ width: '100%', height: '32px' }}
        value={deliveryAddress.company}
        onChange={(e) => handleDeliveryAddressChange('company', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="详细地址"
      name="address"
      rules={[{  message: '请输入详细地址!' }]}
    >
      <Input
        placeholder="详细地址"
        style={{ width: '100%', height: '32px' }}
        value={deliveryAddress.address}
        onChange={(e) => handleDeliveryAddressChange('address', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="详细地址2"
      name="address2"
    >
      <Input
        placeholder="详细地址2"
        style={{ width: '100%', height: '32px' }}
        value={deliveryAddress.address2}
        onChange={(e) => handleDeliveryAddressChange('address2', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="邮政"
      name="postalCode"
      rules={[{ message: '请输入邮政编码!' }]}
    >
      <Input
        placeholder="邮政"
        style={{ width: '100%', height: '32px' }}
        value={deliveryAddress.postalCode}
        onChange={(e) => handleDeliveryAddressChange('postalCode', e.target.value)}
      />
    </Form.Item>
    <Form.Item
      label="手机"
      name="tel"
      rules={[{message: '请输入手机号码!' }]}
    >
      <Input
        placeholder="手机"
        style={{ width: '100%', height: '32px' }}
        value={deliveryAddress.tel}
        onChange={(e) => handleDeliveryAddressChange('tel', e.target.value)}
      />
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
    style={{ width: '100%' }}
    value={billingAddress.country}
    onChange={(value) => handleBillingAddressChange('country', value)}
  >
    {countryOptions.map((option) => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))}
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
                    value={billingAddress.realname}
                    onChange={(e) => handleBillingAddressChange('tel', e.target.value)} />
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
               
<Form.Item label="省份">
  <Select
    showSearch
    optionFilterProp="children"
    style={{ width: '100%',}}
    value={billingAddress.province}
    onChange={(value) => handleBillingAddressChange('province', value)}
  >
    {provinceOptions.map((option) => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))}
  </Select>
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
              value={billingAddress.tel}
              onChange={(e) => handleBillingAddressChange('tel', e.target.value)}/>
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
                  value={newCustomerInfo.realname} onChange={e => setNewCustomerInfo(prevState => ({ ...prevState, realname: e.target.value }))} />
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
     value={newCustomerInfo.tel} onChange={e => setNewCustomerInfo(prevState => ({ ...prevState, tel: e.target.value }))} />
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
