import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, Input, message, Select, Table, Space, TableProps } from 'antd';
import { getProductList } from '@/services/y2/api'; // 假设这是你的 API 调用模块
import { ColumnsType } from 'antd/lib/table';
import { Props } from '@/pages/Test/types';

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

const AddProductCard: React.FC<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<DataType[]>([]);
  const [showSelectedProducts, setShowSelectedProducts] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shouldHideAddButton, setShouldHideAddButton] = useState(false); // 新增状态

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (selectedProducts: DataType[]) => {
    // 计算总数量和总金额
    const totalQty = selectedProducts.reduce((acc, product) => acc + product.inventory, 0);
    const totalAmt = selectedProducts.reduce((acc, product) => acc + parseFloat(product.price), 0);

    // 更新状态
    setSelectedProducts(selectedProducts);
    setTotalQuantity(totalQty);
    setTotalAmount(totalAmt);

    // 显示已选商品列表
    setShowSelectedProducts(true);

    setIsModalVisible(false);
    message.success('商品已成功添加！');

    // 隐藏添加按钮
    setShouldHideAddButton(true);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProductList(1, 8); // 默认获取第一页前 8 条数据
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
          {/* 添加商品和添加自定义商品按钮根据 shouldHideAddButton 的状态显示或隐藏 */}
          {!shouldHideAddButton && (
            <>
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
            </>
          )}




{showSelectedProducts && selectedProducts.length > 0 && (

<div
style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // 左对齐
  marginTop: '0px',
  marginLeft: '20px', // 添加左边距
  width: '100%', // 确保整个容器宽度适应
}}
>
<div
  style={{
    display: 'flex',
    justifyContent: 'space-between', // 两端对齐
    width: '100%',
  }}
>
  <div style={{ fontSize: '18px', color: '#474F5E' }}>商品</div>
  <div style={{ fontSize: '18px', color: '#474F5E' }}>数量</div>
  <div style={{ fontSize: '18px', color: '#474F5E' }}>合计</div>
</div>

<div
  style={{
    display: 'flex',
    justifyContent: 'space-between', // 两端对齐
    width: '100%',
    marginTop: '0px',
  }}
>
  {/* 商品详细信息 */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '60%', // 确保有足够的空间显示商品
    }}
  >
    {selectedProducts.map((product) => (
      <div
        key={product.key}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <img
          src={product.imgUrl}
          alt=""
          style={{
            width: '50px',
            height: '50px',
            marginRight: '10px',
            objectFit: 'cover',
          }}
        />
        <div>
          <p style={{ margin: 0 }}>{11}</p> {/* 修改为实际的商品名称 */}
          <p style={{ margin: 0 }}>{`价格: US$ ${parseFloat(product.price).toFixed(2)}`}</p>
        </div>
      </div>
    ))}
  </div>

  {/* 数量 */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // 中间居中
     
    }}
  >
    <span>{`${totalQuantity} 件`}</span>
  </div>

  {/* 合计 */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end', // 右对齐
   
    }}
  >
    <span>{`US$ ${totalAmount.toFixed(2)}`}</span>
  </div>
</div>
</div>
)}

          {/* 添加商品和添加自定义商品按钮移动到左下方 */}
          {showSelectedProducts && (
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                flexDirection: 'row',
                gap: '10px',
              
              }}
            >
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  width: "120px",
                  height: "36px",
                  fontSize: "14px",
                  background: '#356DFF',
                }}
              >
                添加商品
              </Button>
              <Button
                style={{
                  fontSize: "14px",
                  color: '#356DFF',
                }}
              >
                添加自定义商品
              </Button>
            </div>
          )}

        </div>

      </Form>



      {/* 渲染 AddProductModal 组件 */}
      <Modal
        title="选择商品/款式 (0/100)"
        visible={isModalVisible}
        width={850}
        height={850}
        onOk={(e) => {
          if (dataSource.some(item => item.selected)) {
            handleOk(dataSource.filter(item => item.selected));
          } else {
            e.preventDefault();
            message.warning('请选择至少一个商品！');
          }
        }}
        onCancel={handleCancel}
        okText="选择"
        cancelText="取消"
        headerClassName="custom-header-class"
        bodyStyle={{ padding: '20px', backgroundColor: '#FFFFFF' }}
        footerStyle={{ padding: '20px', textAlign: 'right' }}
      >
        <Form name="add-product-form">
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
        </Form>
      </Modal>
    </Card>
  );
};

export default AddProductCard;