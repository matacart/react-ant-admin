import React, { useState } from 'react';

const DropdownLocation = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div>
      <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleDropdownClick}>
        全部地点
      </div>
      {showDropdown && (
        <div style={{ border: '1px solid #ccc', marginTop: '5px', padding: '5px' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => handleOptionClick('全部地点')}>
            <input type="checkbox" checked={selectedOption === '全部地点'} readOnly /> 全部地点
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => handleOptionClick('默认地点')}>
            <input type="checkbox" checked={selectedOption === '默认地点'} readOnly /> 默认地点
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownLocation;
