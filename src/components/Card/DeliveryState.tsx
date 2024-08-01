import React, { useState } from 'react';  
import './DropdownState.scss'; // 假设您有一个CSS文件来处理样式  
import { useIntl } from '@umijs/max';
  
const DeliveryState = () => {  
  const [isOpen, setIsOpen] = useState(false); // 控制下拉框的显示状态  
  const [selectedValues, setSelectedValues] = useState([]); // 存储选中的值  
  const intl = useIntl();
  const toggleDropdown = () => {  
    setIsOpen(!isOpen); // 切换下拉框的显示状态  
  };  
  
  const handleOptionChange = (option: string) => {  
    // 这里假设handleOptionChange是处理单个选项变化的函数  
    // 但在这个例子中，我们不会直接在这里修改selectedValues，因为通常这是由Option组件处理的  
    // 这里只是为了说明如何可能处理选项变化  
  };  
  
  const handleClear = () => {  
    setSelectedValues([]); // 清空选中的值  
    setIsOpen(false); // 可以选择同时关闭下拉框  
  };  
  
  // 假设的Option组件渲染函数（实际中您可能需要一个单独的Option组件）  
  const renderOptions = () => (  
    <div className="dropdown-content">  
      {/* 假设的选项列表 */}  
      {['代发货','已发货','发货中'].map((option, index) => (  
        <div key={index} className="dropdown-item" onClick={() => handleOptionChange(option)}>  
          <input  
            type="checkbox"  
           
            onChange={() => {  
              // 这里应该有更复杂的逻辑来处理选中状态  
              // 但为了简化，我们不会在这里直接修改selectedValues  
            }}  
          />  
          {option}  
        </div>  
      ))}  
      <button  className="Clear-button" onClick={handleClear} >清除</button>  
    </div>  
  );  
  
  return (  
    <div className="dropdown">  
      <button className='dropdown-button' onClick={toggleDropdown}> {intl.formatMessage({ id:'order.button.deliverystate'})}</button>  
      {isOpen && renderOptions()}  
    </div>  
  );  
};  
  
export default DeliveryState;