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
import styled from "styled-components";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { SortableItem } from "./SortableItem";

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
        { id: '1', content: '弃单号' },
        { id: '2', content: '创建日期' },
        { id: '3', content: '更新时间' },
        { id: '4', content: '客户' },
        { id: '5', content: '运费方案' },
        { id: '6', content: '合计' },
        { id: '7', content: '支付方式' },
        { id: '8', content: '支付渠道' },
        { id: '9', content: '发送状态' },
        { id: '10', content: '召回状态' },
        { id: '11', content: '发送次数' },
        { id: '12', content: '国家/地区' },
        { id: '13', content: '商品数量' },
        { id: '14', content: '首次访问落地页URL' },
        { id: '15', content: '最后一次访问落地页URL' },
        { id: '16', content: '首次互动来源' },
        { id: '17', content: '末次互动来源' },
        { id: '18', content: '操作' },
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