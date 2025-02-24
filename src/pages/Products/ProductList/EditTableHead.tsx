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
import { type } from './../../../../types/index.d';

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
        { id: '1', content: '商品' },
        { id: '2', content: '售价' },
        { id: '3', content: 'SPU' },
        { id: '4', content: '厂商' },
        { id: '5', content: '库存数' },
        { id: '6', content: '创建时间' },
        { id: '7', content: '是否上架' },
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
            <Button>恢复默认</Button>
          </div>
          <div>
            <Button style={{marginRight:"12px"}}>取消</Button>
            <Button type="primary">保存</Button>
          </div>
        </Flex>
      )
    }

    return (
        <Scoped>
            <Button onClick={()=>{setOpen(true)}}>编辑表头</Button>
            <Drawer title='编辑表头' footer={<Footed />} closeIcon={false} open={open}  onClose={()=>{
                setOpen(false);
            }}>
                <div className="color-474F5E">请至少保留 2 个表头项，暂不支持编辑操作栏</div>
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