import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import orders from './../../pages/Orders/PascalCase';
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function OrdersPaidCard({order}) {
    return (
        <Card  style={{ width: '980px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
           <div>    <CheckCircleTwoTone twoToneColor="#52c41a" style={{margin:'10px'}}/>
                   {order?.payment_status_id}
                             </div>
                             
                             </div>
        }
      
    >
        <Form >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
    >
      
      <span style={{ fontSize: '14px', color: '#474F5E' }}>小计</span>
      <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center' ,transform: 'translateX(-200px)'}}>
      <span style={{ fontSize: '14px', color: '#474F5E'}}>{order?.orders_num}件商品</span>
      </div>
      <span style={{ fontSize: '14px', color: '#474F5E' }}>US${order?.orders_price}</span>
      </div>

    {/* 运费 */}
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
    >
      
      <span style={{ fontSize: '14px', color: '#474F5E' }}>运费</span>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',transform: 'translateX(-205px)' }}>
      <span style={{ fontSize: '14px', color: '#474F5E'}}>DHL</span>
      </div>
      <span style={{ fontSize: '14px', color: '#474F5E' }}>US${order?.shipping_cost}</span>
      </div>
    {/* 合计 */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
    >
      
      <span style={{ fontSize: '14px', color: '#242833' }}>合计</span>
      
      <span style={{ fontSize: '14px', color: '#242833' }}>US${order?.orders_total}</span>
      </div>
      </Form>
      <Divider/>
     <Form>
      
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
    >
      
      <span style={{ fontSize: '14px', color: '#242833' }}>客户付款</span>
      <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center' ,transform: 'translateX(-220px)'}}>
      <span style={{ fontSize: '14px', color: '#474F5E'}}>COD</span>
      </div>
      <span style={{ fontSize: '14px', color: '#242833' }}>US${order?.orders_total}</span>
      </div>

     </Form>
     <Divider/>
     <Form>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
    >
      
      <span style={{ fontSize: '14px', color: '#242833' }}>实际付款</span>
      
      <span style={{ fontSize: '14px', color: '#242833' }}>US${order?.orders_total}</span>
      </div>
      
      </Form>
      <Divider/>
    </Card>
);
}
export default observer(OrdersPaidCard);