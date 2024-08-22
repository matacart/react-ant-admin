import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "@/services/y2/order";
import { useIntl } from "@umijs/max";

interface productinfo {
  id: string;
  orders_id: string;
  product_id: string;
  productModel: string;
  productImage: string;
  productName: string;
  productNum: string;
  product_prid: string;
  productOption: null | any;
}

interface OrderDetail {
  id: string; // 订单ID
  date_purchased: string; // 订单日期
  orders_status_id: string; // 订单状态
  delivery_status_id: string; // 发货状态
  payment_status_id: string; // 支付状态
  orders_name: string;
  orders_price: string;
  orders_total: string;
  orders_num: string;
  shipping_cost: string;
  delivery_name: string;
  email: string;
  tel: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postcode: string;
  delivery_time: string;
  productinfo: productinfo[];
}

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log("Change:", e.target.value);
};

const { TextArea } = Input;

interface OrdersShippedCardProps {
  order: OrderDetail;
  productinfo: productinfo[];
}

function OrdersShippedCard({ order, productinfo }: OrdersShippedCardProps) {
  const intl = useIntl();

  const translateStatus = (key: string) => {
    return intl.formatMessage({ id: key });
  };
    // 添加调试输出
    useEffect(() => {
      console.log("order:", order);
      console.log("productinfo:", productinfo);
    }, [order, productinfo]);
  

  return (
    <Card
      style={{ width: "980px" }}
      title={
        <div style={{ display: "flex", alignItems: "center", fontSize: "16px", color: "#474F5E", justifyContent: "space-between" }}>
          <div>
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ margin: "10px" }} />
            {order && translateStatus(`order.status.name_${order.delivery_status_id}`)} #{order?.id}-F1
            <Tooltip title="复制">
              <CopyOutlined style={{ margin: "10px" }} />
            </Tooltip>
          </div>
          <EllipsisOutlined />
        </div>
      }
    >
    <Form>
        <div>
          <p style={{ fontSize: "14px", color: "#7A8499" }}>{intl.formatMessage({ id: "order.detail.location" })}</p>
          <p style={{ fontSize: "14px", color: "#242833" }}>{intl.formatMessage({ id: "order.detail.defaultlocation" })}</p>
          <p style={{ fontSize: "14px", color: "#7A8499" }}>{order?.delivery_status_id}</p>
          <p style={{ fontSize: "14px", color: "#242833" }}>{order?.delivery_time}</p>

          {/* 处理 productinfo 为 undefined 的情况 */}
          {productinfo === undefined ? (
            <p style={{ fontSize: "14px", color: "#7A8499", marginTop: "10px" }}>Loading product information...</p>
          ) : (
            Array.isArray(productinfo) && productinfo.length > 0 && (
              <>
                {productinfo.map((product) => (
                  <div key={product.id} style={{ display: "flex", alignItems: "center", marginTop: "10px", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={product.productImage} alt={product.productName} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: "14px", color: "#474F5E" }}>{product.productName}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: "14px", color: "#474F5E" }}>US${order?.orders_price}X {product.productNum}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "14px", color: "#474F5E" }}>US${order?.orders_total}</p>
                    </div>
                  </div>
                ))}
              </>
            )
          )}
        </div>
      </Form>
      <Divider />
      <Form>
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px", justifyContent: "space-between" }}>
          <div style={{ fontSize: "14px", color: "#7A8499" }}>{intl.formatMessage({ id: "order.detail.tracking" })}: 无</div>
          <Button
            className="my-button"
            style={{
              marginTop: "10px",
              backgroundColor: "#356DFF",
              width: "116px",
              height: "36px",
              fontSize: "14px",
              color: "white",
            }}
          >
            {intl.formatMessage({ id: "order.detail.addtracking" })}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default observer(OrdersShippedCard);