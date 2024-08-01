import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";


function OrdersIdCard({order}) {
    const intl = useIntl();
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
           <div>   
               <p style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.orderid'})}</p> 
               
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
                <p style={{fontSize:'14px',color:'#474F5E',margin:'0'}}>{order?.id}</p>
                < Tooltip title="复制">{intl.formatMessage({ id:'order.detail.copy'})}
                             <CopyOutlined style={{margin:'10PX'}}/>
                             </Tooltip>

              
             </div>
            
        </Form>
       
    </Card>
);
}
export default observer(OrdersIdCard);