import React, { useState } from 'react';  
import { Select } from 'antd';  
  
const { Option } = Select;  
  
// 定义洲和国家的类型  
type Continent = {  
  value: string;  
  label: string;  
  countries: string[];  
};  
  
// 定义洲和国家的数据  
const continents: Continent[] = [  
  {  
    value: 'Asia',  
    label: '亚洲',  
    countries: [    "China",  
    "Japan",  
    "Korea, North",  
    "Korea, South",  
    "Mongolia",  
    "Brunei",  
    "Cambodia",  
    "Indonesia",  
    "Laos",  
    "Malaysia",  
    "Myanmar",  
    "Philippines",  
    "Singapore",  
    "Thailand",  
    "Timor-Leste",  
    "Vietnam",  
    "Kazakhstan",  
    "Kyrgyzstan",  
    "Tajikistan",  
    "Turkmenistan",  
    "Uzbekistan",  
    "Bangladesh",  
    "Bhutan",  
    "India",  
    "Maldives",  
    "Nepal",  
    "Pakistan",  
    "Sri Lanka",  
    "Afghanistan",  
    "Armenia",  
    "Azerbaijan",  
    "Bahrain",  
    "Cyprus",  
    "Georgia",  
    "Iran",  
    "Iraq",  
    "Israel",  
    "Jordan",  
    "Kuwait",  
    "Lebanon",  
    "Oman",  
    "Palestine",  
    "Qatar",  
    "Saudi Arabia",  
    "Syria",  
    "Turkey",  
    "United Arab Emirates",  
    "Yemen" ],  
  },  
  {  
    value: 'Europe',  
    label: '欧洲',  
    countries: ['Germany', 'France', 'United Kingdom'],  
  },  
  // ... 其他洲  
];  
  
const CountrySelector: React.FC = () => {  
  const [selectedContinent, setSelectedContinent] = useState('');  
  const [selectedCountry, setSelectedCountry] = useState('');  
  
  // 洲改变时的事件处理器  
  const handleContinentChange = (value: string) => {  
    setSelectedContinent(value);  
    setSelectedCountry(''); // 清除国家选择  
  };  
  
  // 国家改变时的事件处理器  
  const handleCountryChange = (value: string) => {  
    setSelectedCountry(value);  
  };  
  
  // 获取当前洲下的国家选项  
  const getCountryOptions = () => {  
    const continent = continents.find((c) => c.value === selectedContinent);  
    return continent?.countries.map((country) => (  
      <Option key={country} value={country}>  
        {country}  
      </Option>  
    ));
  };  
  
  return (  
    <div>  
      <Select  
        style={{ width: 235 ,marginLeft: "80px" }} className='input' 
        placeholder="选择洲"  
        onChange={handleContinentChange}  
        value={selectedContinent}  
      >  
        {continents.map((continent) => (  
          <Option key={continent.value} value={continent.value}>  
            {continent.label}  
          </Option>  
        ))}  
      </Select>  
      <Select  className='input' 
        style={{ width: 235, marginLeft: 10 }}  
        // placeholder={selectedContinent ? '选择国家' : '请先选择洲'}  
        onChange={handleCountryChange}  
        value={selectedCountry}  
        disabled={!selectedContinent}  
      >  
        {getCountryOptions()}  
      </Select>  
    </div>  
  );  
};  
  
export default CountrySelector;