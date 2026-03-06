import { Flex, Table, TableProps } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs"
import { getUserMessage } from "@/services/y2/api";
import { observer } from "mobx-react-lite";
import innerMsg from "@/store/message/innerMsg/innerMsg";
import SelectedActions from "./SelectedActions";
import { useIntl } from '@umijs/max';


interface DataType {
    languages_id: string;
    id: string;
    title:string;
    key: string;
    name: string;
    age: number;
    address: string;
    status:string;
    tags: string[];
}

function InnerMsgTable() {

    const [data,setData] = useState([]);

    const [loading,setLoading] = useState(false)
    const intl = useIntl();

    const columns: TableProps<DataType>['columns'] = [
        {
          title: intl.formatMessage({ id: 'innerMsg.innerMsgTable.table.title' }),
          dataIndex: 'title',
          key: 'name',
          render: (value,record) => (
            <Flex>{value}</Flex>
          ),
        },
        {
          title: intl.formatMessage({ id: 'innerMsg.innerMsgTable.table.time' }),
          dataIndex: 'create_time',
          key: 'create_time',
          width: 220,
          render: (value,record) => (
              <div>{dayjs(value*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
          )
        }
    ];

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const rowSelection: TableProps<DataType>['rowSelection'] = {
      selectedRowKeys: innerMsg.selectedRowKeys,
      onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        innerMsg.setSelectedRowKeys(selectedRowKeys)
      },
    };

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    // 获取列表
    const fetchMessageList = ()=>{
      setLoading(true)
      getUserMessage({
        page: pagination.current,
        limit: pagination.pageSize,
        is_read: innerMsg.actionType,
        msg_type: innerMsg.msgType,
      }).then((res:any)=>{
        setData(res.data)
        setPagination({
          ...pagination,
          total: res.count
        })
      }).catch(err=>{
  
      }).finally(()=>{
        setLoading(false)
      })
    }

    // 首次不运行
    useEffect(() => {
      fetchMessageList();
      innerMsg.setSelectedRowKeys([]);
    }, [pagination.current, pagination.pageSize, innerMsg.actionType]);

    return (
        <Scoped>
            {/*  */}
            <Table<DataType>
              rowKey={(record) => record.id}
              columns={columns}
              components={
                innerMsg.selectedRowKeys.length !== 0 ? {
                  header: {
                    wrapper:()=>{
                      return (
                        <thead>
                          <tr>
                            <th colSpan={columns.length}>
                              {/* 显示选择的数量和操作按钮 */}
                              <SelectedActions fetchMessageList={fetchMessageList} />
                            </th>
                          </tr>
                        </thead>
                      )
                    }
                  },
                } : undefined
              }
              dataSource={data} 
              rowSelection={{ type: selectionType, ...rowSelection }}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                  setPagination({
                    ...pagination,
                    current: page,
                    pageSize: pageSize,
                  });
                },
              }}
              loading={loading}
            />
        </Scoped>
    )
}

export default observer(InnerMsgTable)

const Scoped = styled.div`
  .inquire{
    margin-bottom: 12px;
  }
  .ant-table{
      border: 1px solid #eef1f7;
      border-radius: 6px;
      border-bottom: none;
  }
  .table-img-wrap{
    width: 60px;
    height: 60px;
    margin-right: 10px;
    .table-img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: #f7f8fb;
      border-radius: 4px;
    }
  }
`