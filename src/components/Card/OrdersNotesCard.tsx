import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link, useIntl } from "@umijs/max";
import { Button, Card, Divider, Form, Input, InputRef, Select, SelectProps, Space, Switch, Tooltip } from "antd";
import styled from "styled-components";
import MoreSelect from './../Select/MoreSelect';
import Product from './../../pages/Products/index';
import { useRef, useState } from "react";
import newStore from "@/store/newStore";
import OrdersNoteField from "./OrdersNoteField";

// 上架商品

let index = 0;

export default function ProductSettingsCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [initialValue, setInitialValue] = useState<string | undefined>(undefined);
  const intl = useIntl();
  const onEditClick = () => {
      // Set initial value here if needed
      setIsEditing(true);
  };

  const onSave = (value: string) => {
      // Do something with the saved value, e.g., update state or database
      console.log('Saved value:', value);
      setIsEditing(false);
  };

  const onClose = () => {
      // Reset any changes and close the modal
      setIsEditing(false);
  };

  return (
      <Scoped>
          <Card  style={{ width: '300px' }}
                 title={<div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#474F5E', justifyContent: 'space-between' }}>
                         <div><p style={{ fontSize: '16px', color: '#242833' }}>{intl.formatMessage({ id:'order.detail.notes'})}</p></div>
                         <button onClick={onEditClick} style={{ fontSize: '14px', color: '#356DFF', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                         {intl.formatMessage({ id:'order.detail.edit'})}
                         </button>
                     </div>}
          >
              {isEditing ? (
                  <OrdersNoteField isEditing={isEditing} initialValue={initialValue} onSave={onSave} onClose={onClose} />
              ) : (
                  <div style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id:'order.detail.empitynotes'})}</div>
              )}
          </Card>
      </Scoped>
  )
}


const Scoped = styled.div`
    .card{
        background-color: #f7f8fb;
    }
    .item{
        margin-bottom: 20px;
    }
 
`

function setIsEditing(arg0: boolean) {
    throw new Error("Function not implemented.");
}
