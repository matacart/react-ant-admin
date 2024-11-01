import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input

function CustomsInformation({order}) {
    const intl = useIntl();
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
           <div>   
               <p style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.customer'})}</p> 
               
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
                <p style={{fontSize:'14px',color:'#356DFF'}}>{order?.customer_name}</p>
               <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>{intl.formatMessage({ id:'order.detail.sex'})}：
               {intl.formatMessage({ id:'order.detail.sex_0'})}</p> 
             
               <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>{intl.formatMessage({ id:'order.detail.benefitstext'})}</p>
               <p style={{fontSize:'14px',color:'#356DFF'}}>{intl.formatMessage({ id:'order.detail.historypurchase'})}
               ：2{intl.formatMessage({ id:'order.detail.numberpurchase'})}</p>

             


             </div>
            
        </Form>
        <Divider/>
        <Form>
           <div> {intl.formatMessage({ id:'order.detail.contact'})}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
       
       <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{order?.customer_email_address}</div>


       < Tooltip title="复制">
                             <CopyOutlined style={{margin:'10PX'}}/>
                             </Tooltip>
                          
        
        </div>
      
       
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
       +86
       <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap',marginLeft: '-80px'}}>{order?.customer_telephone}</div>


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
                <p style={{fontSize:'14px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.deliveryaddress'})}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.delivery_name}</p> 
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.delivery_street_address}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.delivery_city}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.delivery_country_code_2}</p>
               <p style={{fontSize:'14px',color:'#474F5E', margin:'0'}}>{order?.delivery_postcode}</p>
              
               < Tooltip title="复制">{intl.formatMessage({ id:'order.detail.copy'})}
                             <CopyOutlined style={{margin:'10PX'}}/>
                             </Tooltip>

             </div>
        </Form>
        <Divider/>
        <Form>
            <div>
            <p style={{fontSize:'14px',color:'#242833', margin:'0'}}>{intl.formatMessage({ id:'order.detail.billingaddress'})}</p> 
               <p style={{fontSize:'14px',color:'#7A8499', margin:'0'}}>{intl.formatMessage({ id:'order.detail.billingtext'})}</p>
            </div>
        </Form>
         
    </Card>
);
}
export default observer(CustomsInformation);