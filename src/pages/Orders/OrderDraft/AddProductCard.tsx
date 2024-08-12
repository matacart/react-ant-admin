import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal, Input, message, Select, Table, TableProps } from 'antd';
import { getProductList } from '@/services/y2/api';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

// 假设的数据类型
interface DataType {
  key: React.Key;
  imgUrl: string;
  name: string;
  price: string;
  state: boolean;
  inventory: number;
  selected?: boolean;
}

const AddProductModal = ({ visible, onCancel, onOk, headerClassName, bodyClassName, footerClassName }) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProductList(1, 8); // 默认获取第一页前 10 条数据
      const newData: DataType[] = response.data.map((item: any) => ({
        key: item.id,
        imgUrl: item.product_image,
        name: item.title,
        price: item.price,
        state: item.status === 1,
        inventory: item.quantity,
      }));
      setDataSource(newData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleFinish = (values: any) => {
    console.log('Received values of form: ', values);
    onOk(dataSource.filter(item => item.selected)); // 传递选中的商品数据
    form.resetFields();
  };

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    // 使用 Ant Design 的 Table 组件自带的分页功能
    fetchData(); // 重新加载数据
  };

  const handleSelectChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    const newDataSource = dataSource.map((item) => ({
      ...item,
      selected: selectedRowKeys.includes(item.key),
    }));
    setDataSource(newDataSource);
  };

  const rowSelection = {
    onChange: handleSelectChange,
    getCheckboxProps: (record: DataType) => ({
      // disabled: !record.state, // 禁用状态为 false 的商品
      name: 'rowSelection',
    }),
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '商品/款式',
      dataIndex: 'name',
      width: 250,
      render: (value: any, record: DataType) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.imgUrl}
            alt=""
            style={{
              width: '30px',
              height: '30px',
              marginRight: '10px',
              objectFit: 'cover',
            }}
          />
          <span style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: "200px"
          }}>{record.name}</span>
        </div>
      ),
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      width: 100,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 100,
      render: (value: any) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

  return (
    <Modal
      title="选择商品/款式 (0/100)"
      visible={visible}
      width={850}
      height={850}
      onOk={(e) => {
        if (dataSource.some(item => item.selected)) {
          onOk(dataSource.filter(item => item.selected));
        } else {
          e.preventDefault();
          message.warning('请选择至少一个商品！');
        }
      }}
      onCancel={onCancel}
      okText="选择"
      cancelText="取消"
      headerClassName={headerClassName}
      bodyStyle={{ ...bodyClassName }}
      footerStyle={footerClassName}
    >
      <Form
        form={form}
        name="add-product-form"
        onFinish={handleFinish}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Select
            defaultValue="商品名称"
            style={{ width: 101, height: 36, borderRadius: 0, marginRight: '-15px' }}
            options={[
              { value: '商品名称', label: '商品名称' },
              { value: '商品SKU', label: '商品SKU' },
            ]}
          />
          <Input
            style={{
              width: '200px',
              height: '36px',
              borderRadius: 0,
              marginLeft: '0px',
            }}
          />
          <Input
            placeholder="商品分类"
            style={{
              width: '170px',
              height: '36px',
              borderRadius: 0,
              marginLeft: '5px',
            }}
          />
          <Input
            placeholder="标签"
            style={{
              width: '170px',
              height: '36px',
              borderRadius: 0,
              marginLeft: '5px',
            }}
          />
          <div>
            <Button
              type="primary"
              onClick={() => {
                // 重置功能实现
              }}
              style={{
                height: '36px',
                backgroundColor: '#FFFFFF',
                color: '#474F5E',
                borderColor: '#CCCCCC',
              }}
            >
              重置
            </Button>
          </div>
        </div>

        {/* 添加表格 */}
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          scroll={{ x: 300 }} // 设置水平滚动条宽度
          rowSelection={rowSelection}
          onChange={handleTableChange}
        />

        {/* 可以添加更多表单字段 */}
      </Form>
    </Modal>
  );
};

function AddProductCard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (selectedProducts: DataType[]) => {
    // 处理保存逻辑
    console.log("Selected products:", selectedProducts); // 打印选中的商品
    setIsModalVisible(false);
    message.success('商品已成功添加！');
  };

  return (
    <Card style={{ width: '980px' }} title={<div>商品</div>}>
      <Form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Button
            type="primary"
            onClick={showModal}
            style={{
              marginTop: "10px",
              width: "200px",
              height: "36px",
              fontSize: "16px",
              background: '#356DFF',
            }}
          >
            添加商品
          </Button>
          <p
            style={{
              fontSize: "14px",
              color: '#356DFF',
              marginTop: "20px",
            }}
          >
            添加自定义商品
          </p>
        </div>
      </Form>

      {/* 渲染 AddProductModal 组件 */}
      <AddProductModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        headerClassName="custom-header-class"
        bodyClassName={{ padding: '20px', backgroundColor: '#FFFFFF' }}
        footerClassName={{ padding: '20px', textAlign: 'right' }}
      />
    </Card>
  );
}

export default AddProductCard;