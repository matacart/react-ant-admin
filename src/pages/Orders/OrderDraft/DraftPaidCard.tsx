import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function DraftPaidCard() {
  const intl = useIntl();
  const translateStatus = (key: string) => {
    return intl.formatMessage({ id: key });
};
    return (
        <Card  style={{ width: '980px' }} 
        title={
           <div>收款</div>
        }
      
    >
        <Form >
     
      </Form>
    
     <Divider/>
     <Form>
   
      </Form>
     
    </Card>
);
}
export default observer(DraftPaidCard);