import React, { useState } from 'react';  
import orders from './../../pages/Orders/index';
function TagManager() {  
  // 初始化一个状态数组来存储所有的标签  
  const [tags, setTags] = useState(['TabsProps1', 'Tag 2']); // 假设初始时有两个标签  
  
  // 添加新标签的函数  
  const addNewTag = () => {  
    // 这里只是简单地添加一个默认的新标签，你可以根据需求修改  
    const newTag = `Tag ${tags.length + 1}`;  
    setTags([...tags, newTag]); // 使用展开运算符添加新标签到数组  
  };  
  
  // 渲染所有的标签和添加新标签的按钮  
  return (  
    <div>  
      {tags.map((tag, index) => (  
        <span key={index} className="tag">  
          {tag}  
          {/* 这里可以添加删除标签的逻辑，如果需要的话 */}  
          {/* <button onClick={() => handleRemoveTag(index)}>Remove</button> */}  
        </span>  
      ))}  
      <button onClick={addNewTag} className="add-button">  
        Add New Tag  
      </button>  
    </div>  
  );  
}  
  
export default TagManager;
