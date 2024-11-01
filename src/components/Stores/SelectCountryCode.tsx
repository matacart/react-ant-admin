import React, { useState } from 'react';  
import { Select, Input, Space } from 'antd';  
  
const countryCodes = [  
  { value: '+86', label: 'China' },  
  { value: '+1', label: 'United States' },  
  // ... 其他国家的数据  
];  
  
const { Option } = Select;  
  
const PhoneNumberInput = () => {  
  const [phoneNumber, setPhoneNumber] = useState('');  
  const [selectedCountryCode, setSelectedCountryCode] = useState('+86');  
  
  // 自定义过滤函数  
  const filterOption = (input: string, option: any) => {  
    // 确保 option.props.children 是字符串类型  
    const childrenContent = String(option.props.children);  
    return childrenContent.toLowerCase().indexOf(input.toLowerCase()) >= 0;  
  };
  const handleCountryCodeChange = (value: string) => {  
    setSelectedCountryCode(value);  
  };  
  
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setPhoneNumber(event.target.value);  
  };  
  
  return (  
    <Space  style={{ width: 480,display: 'flex' }}>  
      <Select  className='input' 
        style={{ width: 150,marginLeft: 0 }}  
        placeholder="Please select a country code"  
        value={selectedCountryCode}  
        onChange={handleCountryCodeChange}  
        showSearch  
        filterOption={filterOption}  
        notFoundContent={null}  
      >  
        {countryCodes.map((countryCode) => (  
          <Option 
          key={countryCode.value} value={countryCode.value}>  
            {countryCode.label} ({countryCode.value})  
          </Option>  
        ))}  
      </Select>  
      <Input className='input' 
        placeholder="Please enter your phone number"  
        value={phoneNumber}  
        onChange={handlePhoneNumberChange}  
        style={{ width: 320 ,marginLeft: 0 }}  
      />  
    </Space>  
  );  
};  
  
export default PhoneNumberInput;