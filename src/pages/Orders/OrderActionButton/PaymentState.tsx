import React, { useEffect, useState } from 'react';  
import '@/components/Card/DropdownList.scss';
import { useIntl } from '@umijs/max';
  
const PaymentState = () => {  
  const [isOpen, setIsOpen] = useState(false); // 控制下拉框的显示状态  
  const [selectedValues, setSelectedValues] = useState([]); // 存储选中的值  
  const intl = useIntl();
  const toggleDropdown = () => {  
    setIsOpen(!isOpen); // 切换下拉框的显示状态  
  };  
  
  const handleOptionChange = (option: string) => {
    // 处理单个选项变化的函数
    // if (selectedValues.includes(option)) {
    //   setSelectedValues(selectedValues.filter(val => val !== option));
    // } else {
    //   setSelectedValues([...selectedValues, option]);
    // }
  };  
  
  const handleClear = () => {  
    setSelectedValues([]); // 清空选中的值  
    setIsOpen(false); // 可以选择同时关闭下拉框  
  };  
  
  // 假设的Option组件渲染函数（实际中您可能需要一个单独的Option组件）  
  const renderOptions = () => (
    <div className="dropdown-content scrollable-options">
      {/* 假设的选项列表 */}
      {['未付款', '付款中', '部分付款', '已付款', '已退款', '部分退款', '已授权','重复授权'].map((option, index) => (
        <div key={index} className="dropdown-item" onClick={() => handleOptionChange(option)}>
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => handleOptionChange(option)}
          />
          {option}
        </div>
      ))}
      <button className="Clear-button" onClick={handleClear}>
        清除
      </button>
    </div>
  );
  const handleClickOutside = (event: MouseEvent) => {
    const buttonRef = document.querySelector('.dropdown-button');
    const dropdownContentRef = document.querySelector('.dropdown-content');
  
    if (!buttonRef?.contains(event.target as Node) && !dropdownContentRef?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpen]);
  return (  
    <div >  
      
      <button ref={(ref) => {}} className='dropdown-button' onClick={toggleDropdown}>
  {intl.formatMessage({ id: 'order.button.paymenstate' })}
</button>
      {isOpen && renderOptions()}  
    </div>  
  );  
};  
  
export default PaymentState;
