import React, { useState } from 'react';  
import { Select } from 'antd';  
import { OptionProps } from 'antd/lib/select';  
  
const { Option } = Select;  
  
const CurrencySelector: React.FC = () => {  
  const [selectedCurrency, setSelectedCurrency] = useState('USD');  
  
  const currencyOptions: Array<{ value: string; label: string }> = [  
    { value: 'USD', label: 'USD' },  
    { value: 'EUR', label: 'EUR' },  
    { value: 'GBP', label: 'GBP' },  
    { value: 'JPY', label: 'JPY' },  
    { value: 'CAD', label: 'CAD' },  
    { value: 'AUD', label: 'AUD' },  
    { value: 'CNY', label: 'CNY' }  
  ];
  
  const handleChange = (value: string) => {  
    setSelectedCurrency(value);  
  };  
  
  return (  
    <Select className='input' 
    value={selectedCurrency} style={{ width: 480, marginLeft: 20 }} onChange={handleChange}>  
      {currencyOptions.map((option) => (  
        <Option key={option.value} value={option.value}>  
          {option.label}  
        </Option>  
      ))}  
    </Select>  
  );  
};  
  
export default CurrencySelector;