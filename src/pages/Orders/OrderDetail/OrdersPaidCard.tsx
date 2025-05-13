import { Badge, Button, Card, Divider, Flex, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import { SuccessSecondIcon } from "@/components/Icons/Icons";
import orderStore from "@/store/order/orderStore";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function OrdersPaidCard() {
  const intl = useIntl();
  const translateStatus = (key: string) => {
    return intl.formatMessage({ id: key });
};
    return (
      <Card title={
        <Flex align="center" gap={10}>
          <SuccessSecondIcon className="font-28" />
          {orderStore.oldOrder && "已付款"}
        </Flex>
        }
      >
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#474F5E' }}>{intl.formatMessage({ id:'order.detail.subtotal'})}</span>
          <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center' ,transform: 'translateX(-200px)'}}>
          <span style={{ fontSize: '14px', color: '#474F5E'}}>{orderStore.oldOrder?.orders_num}{intl.formatMessage({ id:'order.detail.commodity'})}</span>
          </div>
          <span style={{ fontSize: '14px', color: '#474F5E' }}>US${orderStore.oldOrder?.orders_price}</span>
          </div>
          {/* 运费 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#474F5E' }}>{intl.formatMessage({ id:'order.detail.shiping'})}</span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',transform: 'translateX(-205px)' }}>
          <span style={{ fontSize: '14px', color: '#474F5E'}}>DHL</span>
          </div>
          <span style={{ fontSize: '14px', color: '#474F5E' }}>US${orderStore.oldOrder?.shipping_cost}</span>
          </div>
          {/* 合计 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#242833' }}>{intl.formatMessage({ id:'order.detail.total'})}</span>
          <span style={{ fontSize: '14px', color: '#242833' }}>US${orderStore.oldOrder?.orders_total}</span>
        </div>
      </Form>
      <Divider/>
      <Form>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '14px', color: '#242833' }}>{intl.formatMessage({ id:'order.detail.customerpay'})}</span>
        <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center' ,transform: 'translateX(-220px)'}}>
        <span style={{ fontSize: '14px', color: '#474F5E'}}>COD</span>
        </div>
        <span style={{ fontSize: '14px', color: '#242833' }}>US${orderStore.oldOrder?.orders_total}</span>
        </div>
      </Form>
      <Divider/>
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#242833' }}>{intl.formatMessage({ id:'order.detail.realpayment'})}</span>
          <span style={{ fontSize: '14px', color: '#242833' }}>US${orderStore.oldOrder?.orders_total}</span>
        </div>
      </Form>
      <Divider/>
    </Card>
    );
}
export default observer(OrdersPaidCard);