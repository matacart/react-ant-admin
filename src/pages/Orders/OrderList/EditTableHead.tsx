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

interface Item {
  id: string;
  content: string;
}

// 
export default function EditTableHead(){
    
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    // const onClose = () => {
    //     setOpen(false);
    // };
    const DndList = () => {
      const [items, setItems] = useState<Item[]>([
        { id: '1', content: '订单编号' },
        { id: '2', content: '订单ID' },
        { id: '3', content: '订单日期' },
        { id: '4', content: '订单来源' },
        { id: '5', content: '订单状态' },
        { id: '6', content: '付款状态' },
        { id: '7', content: '发货状态' },
        { id: '8', content: '退货状态' },
        { id: '9', content: '支付方式' },
        { id: '10', content: '支付渠道' },
        { id: '11', content: '付款完成时间' },
        { id: '12', content: '转账凭证上传状态' },
        { id: '13', content: '收件人' },
        { id: '14', content: '收件人手机号' },
        { id: '15', content: '支付流水号' },
        { id: '16', content: '订单标签' },
        { id: '17', content: '追踪编号' },
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
            <DefaultButton text="恢复默认" />
          </div>
          <Flex gap={12}>
            <DefaultButton text="取消" />
            <PrimaryButton text="保存" />
          </Flex>
        </Flex>
      )
    }

    return (
        <Scoped>
            <DefaultButton onClick={()=>{setOpen(true)}} text={"编辑表头"} />
            <Drawer title='编辑表头' footer={<Footed />} closeIcon={false} open={open}  onClose={()=>{
                setOpen(false);
            }}>
                <div className="color-474F5E">请至少保留 5 个表头项</div>
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