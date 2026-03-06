import { Button, Drawer, Flex, List } from "antd";
import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from "./SortableItem";
import styled from "styled-components";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useIntl } from "@umijs/max";

interface Item {
  id: string;
  content: string;
}

// 
export default function EditTableHead(){

  const intl = useIntl();
    
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
      setOpen(true);
  };

  // const onClose = () => {
  //     setOpen(false);
  // };
  const DndList = () => {
    const [items, setItems] = useState<Item[]>([
      { id: '1', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.orderNo' }) },
      { id: '2', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.orderId' }) },
      { id: '3', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.orderDate' }) },
      { id: '4', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.orderSource' }) },
      { id: '5', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.orderStatus' }) },
      { id: '6', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.paymentStatus' }) },
      { id: '7', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.shippingStatus' }) },
      { id: '8', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.returnStatus' }) },
      { id: '9', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.paymentMethod' }) },
      { id: '10', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.paymentChannel' }) },
      { id: '11', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.paymentCompleteTime' }) },
      { id: '12', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.transferCertificateStatus' }) },
      { id: '13', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.recipient' }) },
      { id: '14', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.recipientPhone' }) },
      { id: '15', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.paymentTransactionId' }) },
      { id: '16', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.orderTag' }) },
      { id: '17', content: intl.formatMessage({ id: 'orders.orderList.editTableHead.trackingNumber' }) },
    ]);
  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    return (
      <DndScoped className="dnd-list-box">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              setItems((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <List
              dataSource={items}
              renderItem={(item) => <SortableItem key={item.id} id={item.id} content={item.content} />}
            />
          </SortableContext>
        </DndContext>
      </DndScoped>
    );
  };
    
  const Footed = () => {
    return (
      <Flex justify="space-between" style={{padding:"12px 0"}}>
        <div>
          <DefaultButton text={intl.formatMessage({ id: 'orders.orderList.editTableHead.restoreDefault' })} />
        </div>
        <Flex gap={12}>
          <DefaultButton text={intl.formatMessage({ id: 'orders.orderList.editTableHead.cancel' })} />
          <PrimaryButton text={intl.formatMessage({ id: 'orders.orderList.editTableHead.save' })} />
        </Flex>
      </Flex>
    )
  }

  return (
    <Scoped>
        <DefaultButton onClick={()=>{setOpen(true)}} text={intl.formatMessage({ id: 'orders.orderList.editTableHead.text' })} />
        <Drawer title={intl.formatMessage({ id: 'orders.orderList.editTableHead.title' })} footer={<Footed />} closeIcon={false} open={open}  onClose={()=>{
            setOpen(false);
        }}>
            <div className="color-474F5E">{intl.formatMessage({ id: 'orders.orderList.editTableHead.atLeastFive' })}</div>
            <DndList />
        </Drawer>
    </Scoped>
  )
}

const Scoped = styled.div`
  
`

const DndScoped = styled.div`
  margin-top: 20px;
  border: 1px solid #eef1f6;
  border-radius: 4px;
`