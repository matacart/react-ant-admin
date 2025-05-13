import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
import { useIntl } from "@umijs/max";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function OrdersLabelCard() {
    const intl = useIntl();
    return (
        <Card
        title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{fontSize:'16px',color:'#242833'}}>   
            {intl.formatMessage({ id:'order.detail.orderlabel'})}
                 
                              </div >
                           <p style={{fontSize:'14px',color:'#356DFF'}}>  
                             {intl.formatMessage({ id:'order.detail.manager'})}</p>
                              </div>
        }
      
    >
        <Form >
       
          
        <TextArea placeholder={intl.formatMessage({ id:'order.detail.selecttext'})} style={{width:'245px',height:'36px'}}/>
        </Form>
       
    </Card>
);
}
export default observer( OrdersLabelCard);