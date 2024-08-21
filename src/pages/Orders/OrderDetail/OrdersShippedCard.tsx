import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "@/services/y2/order";
import { useIntl } from "@umijs/max";

const { TextArea } = Input;

function OrdersShippedCard() {
  const intl = useIntl();
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);

  const translateStatus = (key: string) => {
    return intl.formatMessage({ id: key });
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const data = await getOrderDetail(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      style={{ width: '980px' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#474F5E', justifyContent: 'space-between' }}>
          <div>
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ margin: '10px' }} />
            {translateStatus(`order.status.name_${order.delivery_status_id}`)} #{order.id}-F1
            <Tooltip title="复制">
              <CopyOutlined style={{ margin: '10px' }} />
            </Tooltip>
          </div>
          <EllipsisOutlined />
        </div>
      }
    >
      <Form>
        <div>
          <p style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id: 'order.detail.location' })}</p>
          <p style={{ fontSize: '14px', color: '#242833' }}>{intl.formatMessage({ id: 'order.detail.defaultlocation' })}</p>
          <p style={{ fontSize: '14px', color: '#7A8499' }}>{order.delivery_status_id}</p>
          <p style={{ fontSize: '14px', color: '#242833' }}>{order.delivery_time}</p>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', marginRight: '10px' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '14px', color: '#474F5E' }}>{order.orders_name}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: '14px', color: '#474F5E' }}>US${order.orders_price} X {order.orders_num}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '14px', color: '#474F5E' }}>US${order.orders_total}</p>
            </div>
          </div>
        </div>
      </Form>
      <Divider />
      <Form>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id: 'order.detail.tracking' })}: 无</div>
          <Button
            className="my-button"
            style={{
              marginTop: "10px",
              backgroundColor: '#356DFF',
              width: "116px",
              height: "36px",
              fontSize: "14px",
              color: 'white'
            }}
          >
            {intl.formatMessage({ id: 'order.detail.addtracking' })}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default observer(OrdersShippedCard);