import { history } from "@umijs/max"
import { Card, Flex, message, Space, Table, TableProps, Tooltip } from "antd"
import { useMemo, useRef, useState } from "react";
import styled from "styled-components"
import SearchInput from "@/components/Input/SearchInput";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import cookie from 'react-cookies';
import LangSelect from "@/components/Select/LangSelect";
import { useAbortController } from "@/hooks/customHooks";
import DefaultTag from "@/components/Tag/DefaultTag";
import SuccessTag from "@/components/Tag/SuccessTag";
import ErrorTag from "@/components/Tag/ErrorTag";
import { getRechargeList } from "@/services/y2/api";
import ProcessingTag from "@/components/Tag/ProcessingTag";


interface DataType {
  key: string;
  id: string;
  languages_id: string;
  category_name:string;
  article_count: string;
  update_time: string;
  create_time:string;
}

function PaymentList({payList}:{payList:any}) {

    const [data,setData] = useState(payList.data ||[]);

    const { createAbortController } = useAbortController();

    const [loading,setLoading] = useState(false);

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    
    // 多选
    const rowSelection: TableProps<DataType>['rowSelection'] = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: DataType) => ({
       
      }),
    };

    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          render: (value,record) => (
            <div>{value}</div>
          ),
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{value}</div>
            </>
          )
        },
        {
          title: '充值方式',
          dataIndex: 'method',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{value}</div>
            </>
          )
        },
        {
          title: '充值商户',
          dataIndex: 'merchant_realname',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{value}</div>
            </>
          )
        },
        {
          title: '币种',
          dataIndex: 'currency_code',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{value}</div>
            </>
          )
        },
        {
          title: '支付状态',
          dataIndex: 'payok',
          key: 'id',
          render: (value,record) => (
            <Flex align="center">
                {value == "0" && <ProcessingTag text="等待支付" />}
                {value == "1" && <SuccessTag text="支付成功" />}
                {value == "-1" && <ErrorTag text="取消支付" />}
            </Flex>
          )
        },
        {
          title: '金额',
          dataIndex: 'amount',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{value}</div>
            </>
          )
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <div>
                  <DeleteModal
                    tElement={
                      <Tooltip title="删除">
                        <div className='wrap' onClick={(e) => {
                          // e.stopPropagation()
                        }}>
                          <DeleteOutlined className="font-16 color-F86140 cursor-pointer" />
                        </div>
                      </Tooltip>
                    }
                    removeFunc={()=>{
                      // UninstallApp(record.id)
                    }} 
                    title={`确认删除此记录吗？`} 
                    content={``}
                    okText="删除"
                  />
              </div>
            </Space>
          ),
        },
    ];

    // 分页
    const [pagination,setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: payList.count,
    });

    // 获取分页数据
    const fetchData = (page:number,pageSize:number)=>{
      setLoading(true);
      const signal = createAbortController();
      getRechargeList({
        page:page?.toString(),
        limit:pageSize?.toString(),
      },signal).then((res) => {
        setData(res.data); // 使用过滤后的数据
        setPagination({
          current:page,
          pageSize:pageSize,
          total: res.count,
        });
      }).catch(error => {
        message.error(error?.msg)
      }).finally(() => {
        setLoading(false);
      });
    }

    const isFirstRender = useRef(true);
    useMemo(()=>{
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      fetchData(pagination.current,pagination.pageSize);
    },[pagination.current,pagination.pageSize])

    return (
        <Scoped>
            <Card>
                <Flex wrap="wrap" gap={16} className="inquire" justify="space-between">
                  <SearchInput placeholder="输入ID进行搜索" style={{width:"320px"}}  />
                </Flex>
                <Table<DataType> 
                  columns={columns} 
                  dataSource={data} 
                  onRow={(record) => ({
                    onClick: () => {
                      // history.push(`/website/blogs/${record.id}/${record.languages_id}`)
                    },
                  })}
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
            </Card>
        </Scoped>
    )
}

export default PaymentList;

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