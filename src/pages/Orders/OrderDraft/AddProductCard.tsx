import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import order from "mock/order";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "@/services/y2/order";
import { useIntl } from "@umijs/max";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input

function AddProductCard() {
  const intl = useIntl();
  const translateStatus = (key: string) => {
    return intl.formatMessage({ id: key });
};

    return (
        <Card  style={{ width: '980px' }} 
        title={
          <div>商品</div>
        }
      
    >
        <Form >
       
            <div    style={{
        display: 'flex',
        flexDirection: 'column', // 列方向
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        height: '100%', // 父容器高度设置为 100%，根据实际情况调整
      }}>
         
         
            <Button type="primary"
            
              style={{
                marginTop: "10px",
                width: "200px", height: "36px", fontSize: "16px",background:'#356DFF',

              }}>
             添加商品
            </Button>
            <p
        style={{
          fontSize: "14px",
          color:'#356DFF',
          marginTop: "20px", // 与按钮之间的间距
        }}
      >
        添加自定义商品</p>

             </div>
            
        </Form>

    </Card>
);
}
export default observer(AddProductCard);