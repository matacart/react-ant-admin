import DeleteModal from "@/components/Modal/DeleteModal";
import ModifyModal from "@/components/Modal/ModifyModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Form, Input, Modal, Select, Space, Table, TableProps } from "antd";
import { useState } from "react";
import styled from "styled-components";

interface DataType {
    key: string;
    name: string;
    url: string;
    evenVersion: string;
}

function WebHookSubscriptionTable(){

    const [isOpen,setIsOpen] = useState(false);


    const contentForm = (
      <Form style={{padding:"20px 0 10px 0"}} layout="vertical">
        <Form.Item label="事件名称">
          <Select disabled />
        </Form.Item>
        <Form.Item label="通知URL">
          <Input />
        </Form.Item>
        <Form.Item label="事件版本">
          <Select />
        </Form.Item>
      </Form>
    )

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '事件名称',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <div>{text}</div>,
        },
        {
          title: '通知URL',
          dataIndex: 'url',
          key: 'url',
        },
        {
          title: '事件版本',
          dataIndex: 'evenVersion',
          key: 'evenVersion',
        },
        
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                <ModifyModal
                  okFun={()=>{}}
                  title="编辑Webhook"
                  okText="保存"
                  tElement={<div className="cursor-pointer">
                    <EditOutlined className="font-18" />
                  </div>}
                  content={contentForm} 
                />
                <div>
                    <DeleteModal 
                      removeFunc={()=>{}}
                      tElement={<DeleteOutlined className="font-18 color-F86140 cursor-pointer"/>}
                      title={<div className="font-w-600">删除Webhook</div>}
                      content={"请确认是否删除Webhook？"} 
                      okText="删除"
                    />
                </div>
            </Space>
          ),
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          name: '订单删除',
          url: "https://test.matacart.com/order/delete",
          evenVersion:"v20240105"
        },
        {
          key: '2',
          name: '会员系统-店铺等级删除通知',
          url: "https://test.matacart.com/order/delete",
          evenVersion:"v20230105"
        },
        {
          key: '3',
          name: '礼品卡更新',
          url: "https://test.matacart.com/order/delete",
          evenVersion:"v20241125"
        },
    ];


    return(
        <Scoped>
            <Table<DataType> columns={columns} dataSource={data} pagination={false} />
            {/* 编辑 */}
            <Modal title="编辑Webhook" width={620} open={isOpen} centered onOk={()=>setIsOpen(false)} onCancel={()=>setIsOpen(false)}>
              
            </Modal>
        </Scoped>
    )
}

export default WebHookSubscriptionTable

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }

`