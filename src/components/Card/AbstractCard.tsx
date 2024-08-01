import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function AbstractCard() {
    const intl = useIntl();
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
           <div>   
               <p style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.convertedabstract'})}</p> 
               
                             </div>
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
                <p style={{fontSize:'14px',color:'#474F5E',margin:'0'}}>{intl.formatMessage({ id:'order.detail.convertedtext_1'})}</p>
                <p style={{fontSize:'14px',color:'#474F5E',margin:'0'}}>{intl.formatMessage({ id:'order.detail.convertedtext_2'})}</p>
                <p style={{fontSize:'14px',color:'#356DFF',margin:'0'}}>{intl.formatMessage({ id:'order.detail.abstractdetail'})}</p>
              
             </div>
            
        </Form>
       
    </Card>
);
}
export default observer( AbstractCard);