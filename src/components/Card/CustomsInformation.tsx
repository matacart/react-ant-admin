import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input

function CustomsInformation({order}) {
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
           <div>   
               <p style={{fontSize:'16px',color:'#242833'}}>客户</p> 
               
                             </div>
                             <EllipsisOutlined />
                             </div>
        }
      
    >
        <Form >
       
            <div  style={{
          display: 'flex',
            flexDirection: 'column',
               alignItems: 'flex-start',
                  gap: '0px', // Adjust the gap size as needed
}}>
                <p style={{fontSize:'14px',color:'#356DFF'}}>{order?.delivery_name}</p>
               <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>性别：未知</p> 
               <p style={{fontSize:'14px',color:'#7A8499', margin:'0'}}>注册状态：否</p>
               <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>会员优惠：购物时未登录，无优惠</p>
               <p style={{fontSize:'14px',color:'#356DFF'}}>历史购买：2单</p>

             


             </div>
            
        </Form>
        <Divider/>
        <Form>
           <div> 联系信息
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
       
       <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{order?.email}</div>


       < Tooltip title="复制">
                             <CopyOutlined style={{margin:'10PX'}}/>
                             </Tooltip>
                          
        
        </div>
      
       
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
       +86
       <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap',marginLeft: '-80px'}}>{order?.tel}</div>


       < Tooltip title="复制">
                             <CopyOutlined style={{margin:'10PX'}}/>
                             </Tooltip>
                          
        
        </div>
      
       






        </div>
          
        </Form>
        <Divider/>
        <Form>
        <div  style={{
          display: 'flex',
            flexDirection: 'column',
               alignItems: 'flex-start',
                  gap: '0px', // Adjust the gap size as needed
}}>
                <p style={{fontSize:'14px',color:'#242833'}}>收货地址</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.delivery_name}</p> 
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.address}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.city}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.province}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.coutry}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.post}</p>
              
               < Tooltip title="复制">复制
                             <CopyOutlined style={{margin:'10PX'}}/>
                             </Tooltip>

             </div>
        </Form>
        <Divider/>
        <Form>
            <div>
            <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>账单地址</p> 
               <p style={{fontSize:'14px',color:'#7A8499', margin:'0'}}>与收货地址相同</p>
            </div>
        </Form>
         <Divider/>
         <Form>
            <div>
            <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>市场</p> 
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>United States</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>美国 (USD)</p>
            </div>
         </Form>
    </Card>
);
}
export default observer(CustomsInformation);