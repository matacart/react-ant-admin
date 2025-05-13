import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
function FraudAnalysis() {
    const intl = useIntl();
    return (
        <Card 
            title={
                <span style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.fraudanalysis'})}</span> 
            }>
            <div style={{fontSize:'14px',color:'#474F5E',margin:'0'}}>{intl.formatMessage({ id:'order.detail.fraudtext'})}</div>
        </Card>
    );
}
export default observer (FraudAnalysis);