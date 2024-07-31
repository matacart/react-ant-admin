import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function OrdersLabelCard() {
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{fontSize:'16px',color:'#242833'}}>   
                  订单标签
                 
                              </div >
                           <p style={{fontSize:'14px',color:'#356DFF'}}>管理</p>
                              </div>
        }
      
    >
        <Form >
       
          
        <TextArea placeholder="输入标签，按enter确认" style={{width:'245px',height:'36px'}}/>
        </Form>
       
    </Card>
);
}
export default observer( OrdersLabelCard);