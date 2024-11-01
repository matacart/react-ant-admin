import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";


function MaketCard() {
    const intl = useIntl();
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#474F5E', justifyContent: 'space-between' }}>
            <div><p style={{ fontSize: '14px', color: '#242833' }}>市场</p></div>
            <button  style={{ fontSize: '14px', color: '#356DFF', border: 'none', background: 'transparent', cursor: 'pointer' }}>
           更换
            </button>
        </div>
        }
      
    >
        <Form >
        <div style={{ fontSize: '14px',color: '#474F5E',textAlign: 'left', }}>United States</div>
        <div style={{ fontSize: '14px',color: '#474F5E',textAlign: 'left', }}>美国 (USD) </div>
            
        </Form>
       
    </Card>
);
}
export default observer(MaketCard);