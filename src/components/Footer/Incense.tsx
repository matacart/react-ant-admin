import React from 'react';  
import './Incense.css';  
  
interface IncenseProps {  
  // 可以在这里添加额外的props，例如控制燃烧进度的prop  
}  
  
const Incense: React.FC<IncenseProps> = () => {  
  return (  
    <div className="incense">  
      <div className="stick" />  
      <div className="ash" />  
    </div>  
  );  
};  
  
export default Incense;