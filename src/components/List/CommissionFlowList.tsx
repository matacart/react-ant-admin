import { QuestionCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Dropdown, Flex, GetProp, Input, MenuProps, message, Row, Table, TableColumnsType, TableProps, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"


type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项账号数据类型
interface DataType {
  key: React.Key;
  imgUrl?: string;
  name?: string;
  price?: number;
  inventory?: number;
  state?: boolean;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

// 账单类型
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

export default function CommissionFlowList() {
    const { RangePicker } = DatePicker;
    
  const [loading, setLoading] = useState(false);

  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  //列表数据
  const [data, setData] = useState<DataType[]>([]);

  // 状态
  const onChangeSwich = (index: number) => {
    let oldDataItem = data[index]
    let newDataItem = {
      ...oldDataItem,
      state: !oldDataItem.state
    }
    let newData = [...data];
    newData[index].state = !oldDataItem.state
    setData(newData);
  };

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: '账单编号',
      dataIndex: 'name',
      width: 130,
    },
    {
      title: '账单类型',
      dataIndex: 'price',
      width: 120,
    },
    {
      title: '项目',
      dataIndex: 'inventory',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'state',
      width: 120,
    },
    {
      title: '账单总额',
      dataIndex: 'state',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'total',
      width: 150
    }
  ];

  const fetchData = () => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
    return (
        <Scoped>
            <Row className="statisticBox" align="middle" justify={'space-around'}>
                <Col >
                    <div className="statisticData">
                        2%
                    </div>
                    <span className="statisticSpan">当前佣金比例
                        <Tooltip title="佣金比例">
                            <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
                        </Tooltip>
                    </span>
                </Col>
                <Col >
                    <div className="statisticData">
                        US$ 0
                    </div>
                    <span className="statisticSpan">本月累计佣金</span>
                </Col>
                <Col>
                    <div className="statisticData">
                        US$ 100
                    </div>
                    <span className="statisticSpan">剩余免佣额度</span>
                </Col>
            </Row>

            {/* 搜索 */}
            <Flex gap={20} style={{ marginBottom: "20px", marginTop: "10px" }}>
                <Input placeholder='搜索流水编号' suffix={<SearchOutlined />}
                    style={{ width: 320 }}
                />
                <RangePicker />
                <Dropdown
                    menu={menuProps}>
                    <Button style={{ width: 160, height: 36 }}>
                        是否已生成账单
                    </Button>
                </Dropdown>
                <Dropdown
                    menu={menuProps}>
                    <Button style={{ width: 160, height: 36 }}>
                        账单支付状态
                    </Button>
                </Dropdown>
            </Flex>

            {/* 列表 */}
            <Table
                columns={columns}
                rowKey={(record) => record.key}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ x: 1300 }}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                    },
                }}
            />
        </Scoped>
    )
}

const Scoped = styled.div`
.statisticBox{
    height: 160px;
    margin-bottom: 10px;
    border-radius: 5px;
    background: #f5f8fc;
    color: #242833;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
}
.statisticData{
    margin-bottom: 12px;
    font-size: 40px;
    font-weight: bold;
    line-height: 38px;
}
.statisticSpan{
    font-size: 16px;
}
`