import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { styled } from 'styled-components';
import { useIntl } from "@umijs/max";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function OrderNotesLabel() {
    const intl = useIntl();
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
          
           订单备注
                 
                            
                       
                              </div>
        }
      
    >
        <Form >
       
          
        <TextArea placeholder="客户不会看到你输入的内容" style={{width:'245px',height:'36px'}}/>
        </Form>
       
    </Card>
);
}
export default observer(OrderNotesLabel);