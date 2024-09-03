import React, { useState, useEffect, useRef } from 'react';
import '@/components/Card/DropdownList.scss';
import { useIntl } from '@umijs/max';

const DeliveryState = () => {
  const [isOpen, setIsOpen] = useState(false); // 控制下拉框的显示状态
  const [selectedValues, setSelectedValues] = useState<string[]>([]); // 存储选中的值
  const buttonRef = useRef<HTMLButtonElement>(null); // 引用按钮元素
  const dropdownContentRef = useRef<HTMLDivElement>(null); // 引用下拉菜单元素
  const intl = useIntl();

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 切换下拉框的显示状态
  };

  const handleOptionChange = (option: string) => {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter(val => val !== option));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  const handleClear = () => {
    setSelectedValues([]);
    setIsOpen(false); // 清空选中的值并关闭下拉框
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && dropdownContentRef.current) {
      if (!buttonRef.current.contains(event.target as Node) && !dropdownContentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
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

  const renderOptions = () => (
    <div className={`dropdown-content ${isOpen ? 'show' : ''}`} ref={dropdownContentRef}>
      {['待发货', '已发货', '发货中'].map((option, index) => (
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

  return (
    <div className="dropdown">
      <button className='dropdown-button' onClick={toggleDropdown} ref={buttonRef}>
        {intl.formatMessage({ id: 'order.button.deliverystate' })}
      </button>
      {isOpen && renderOptions()}
    </div>
  );
};

export default DeliveryState;