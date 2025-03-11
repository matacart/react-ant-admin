import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Modal, Space, Table, TableProps } from "antd";
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
                <div className="cursor-pointer" onClick={()=>setIsOpen(true)}>
                    <EditOutlined className="font-18" />
                </div>
                <div>
                    <DeleteOutlined className="font-18 color-F86140" />
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
            <Modal title="编辑Webhook" open={isOpen} centered onOk={()=>setIsOpen(false)} onCancel={()=>setIsOpen(false)}>
                <div></div>
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