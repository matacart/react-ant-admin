import DefaultTag from "@/components/Tag/DefaultTag";
import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Form, GetProp, Input, message, Radio, Row, Spin, Upload, UploadProps } from "antd";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

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
import { List } from 'antd';
import { SortableItem } from './SortableItem'; // 自定义组件
import { CopyIcon } from "@/components/Icons/Icons";

interface Item {
  id: string;
  content: string;
}





function NewCustomerAccount() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    const AccountTypeOptions = [
       
    ];

    const DndList = () => {
        const [items, setItems] = useState<Item[]>([
          { id: '1', content: '项目 1' },
          { id: '2', content: '项目 2' },
          { id: '3', content: '项目 3' }
        ]);
      
        const sensors = useSensors(
          useSensor(PointerSensor),
          useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
          })
        );
      
        return (
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
        );
    };

    return (
        <Scoped>
            <Card className="card">
                <div className="color-242833 font-16 font-w-600">新客户账户</div>
                <Divider className="divider" />
                <div style={{marginTop:"20px"}}>
                    <div className="color-242833">登录/注册账号</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>客户在网店登录注册时仅支持邮箱作为账号</div>
                    <div className="flex-item-box">
                    </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    <div className="color-242833">登录验证方式</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>设置客户在网店登录时的验证方式，通过拖拽可以调整默认选项</div>
                    <div className="dnd-list-box">
                        <DndList />
                    </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    <div className="color-242833">登录后跳转页面</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>设置客户在网店登录后跳转的页面，结账页不受本设置影响</div>
                        <Radio.Group
                            style={style}
                            onChange={(e)=>setAccountVersion(e.target.value)}
                            value={accountVersion}
                            options={[
                                {
                                    value: 1,
                                    label: (
                                        <div className="color-474F5E">客户账户个人信息页</div>
                                    ),
                                },
                                {
                                    value: 2,
                                    label: (
                                        <div className="color-474F5E">客户账户订单页</div>
                                    ),
                                },
                                {
                                    value: 2,
                                    label: (
                                        <div className="color-474F5E">登录前页面</div>
                                    ),
                                }
                            ]}
                        />
                    </div>
                <div style={{marginTop:"20px"}}>
                    <div className="color-242833">登录链接</div>
                </div>
                <Flex className="login-link" justify="space-between" align="center">
                  <div>https://66666.demo.hdyshop.cn/account/signIn</div>
                  <div>
                    <Button className="copy-btn" icon={<CopyIcon />}>复制</Button>
                  </div>
                </Flex>
                
            </Card>
        </Scoped>
    )
}

export default NewCustomerAccount

const Scoped = styled.div`
    margin-bottom: 20px;
    .divider{
        margin:20px 0px;
    }
    .dnd-list-box{
        border: 1px solid #eef1f6;
        border-radius: 4px;
    }
    .login-link{
      margin-top: 16px;
      padding: 16px;
      border-radius: 6px;
      background-color: #f7f8fb;
      color: #474f5e;
    }
    
`
