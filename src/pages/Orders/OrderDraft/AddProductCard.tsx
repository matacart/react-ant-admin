import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, Input, message, Select, Table, Space, TableProps, InputNumber } from 'antd';
import { getProductList } from '@/services/y2/api'; // 假设这是你的 API 调用模块
import { ColumnsType } from 'antd/lib/table';
import { Props } from '@/pages/Test/types';
import { ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons/lib/icons';

// 假设的数据类型
interface DataType {
  key: React.Key;
  imgUrl: string;
  name: string;
  price: string;
  state: boolean;
  inventory: number;
  quantity: number; // 新增数量字段
  total: number; // 新增合计金额字段
  selected?: boolean;
}

const AddProductCard: React.FC<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<DataType[]>([]);
  const [showSelectedProducts, setShowSelectedProducts] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shouldHideAddButton, setShouldHideAddButton] = useState(false); // 新增状态
  const [shouldShowBottomAddButton, setShouldShowBottomAddButton] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = (newSelectedProducts: DataType[]) => {
    // 计算总数量和总金额
    const newTotalQty = newSelectedProducts.reduce((acc, product) => acc + product.quantity, 0);
    const newTotalAmt = newSelectedProducts.reduce((acc, product) => acc + product.total, 0);

    // 更新状态
    // 需要检查是否有新商品被添加
    const updatedSelectedProducts = [...selectedProducts, ...newSelectedProducts];
    const uniqueUpdatedSelectedProducts = updatedSelectedProducts.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.key === product.key)
    );

    setSelectedProducts(uniqueUpdatedSelectedProducts);
    setTotalQuantity(newTotalQty);
    setTotalAmount(newTotalAmt);

    // 显示已选商品列表
    setShowSelectedProducts(true);

    setIsModalVisible(false);
    message.success('商品已成功添加！');

  // 隐藏添加按钮
  setShouldHideAddButton(uniqueUpdatedSelectedProducts.length > 0);
  setShouldShowBottomAddButton(uniqueUpdatedSelectedProducts.length > 0);

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
        quantity: 1, // 初始化数量为 1
        total: parseFloat(item.price), // 初始化合计为价格
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


  
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, productKey: React.Key) => {
    const newQuantity = parseInt(event.target.value, 10); // 直接从字符串转换为整数
    const updatedProducts = selectedProducts.map((product) => {
      if (product.key === productKey) {
        return {
          ...product,
          quantity: newQuantity,
          total: newQuantity * parseFloat(product.price),
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };
  function showDeleteConfirmation(productKey: string) {
    Modal.confirm({
      title: '确认要将此商品从订单中移除吗？',
      okText: '移除',
      cancelText: '取消',
      onOk() {
        handleRemoveProduct(productKey);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  function handleRemoveProduct(productKey: string) {
    const updatedProducts = selectedProducts.filter(product => product.key !== productKey);
    setSelectedProducts(updatedProducts);
  
    // 检查移除商品后 selectedProducts 是否为空
    if (updatedProducts.length === 0) {
      setShouldHideAddButton(false);
      setShouldShowBottomAddButton(false);
    }
  }
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
                marginTop: '10px',
                marginLeft: '20px', // 添加左边距
                width: '100%', // 确保整个容器宽度适应
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between', // 两端对齐
                  width: '90%',
                }}
              >
                <div style={{ fontSize: '14px', color: '#474F5E' }}>商品</div>
                <div style={{ fontSize: '14px', color: '#474F5E', marginRight: '-400px' }}>数量</div>
                <div style={{ fontSize: '14px', color: '#474F5E' }}>合计</div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between', // 两端对齐
                  width: '90%',
                  marginTop: '10px',
                }}
              >
                {/* 商品详细信息 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%', // 确保有足够的空间显示商品
                  }}
                >
                  {selectedProducts.map((product) => (
                    <div
                      key={product.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '50px',
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
                        <p style={{ margin: 0 }}>{product.name}</p> {/* 修改为实际的商品名称 */}
                        <span style={{ margin: 0 }}>US${product.price}</span>
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
                    marginRight: '-60px',
                  }}
                >
                   {selectedProducts.map((product) => {
     const isOverstock = product.quantity > product.inventory;
      return (
      <div key={product.key} style={{ marginBottom: '10px' }}>
        <InputNumber
          min={1}
          max={product.inventory}
          value={product.quantity}
          onChange={(value) => handleQuantityChange({ target: { value } }, product.key)}
          style={{ width: '100px', marginBottom: '60px' }}
        />
        {isOverstock && (
          <div style={{ color: 'red', fontSize: '12px' }}>库存未达到起批量，请重新选择或删除</div>
        )}
      </div>
    );
  })}
</div>
                {/* 合计 */}
             <div
         style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end', // 右对齐
    }}
  >
       {selectedProducts.map((product) => (
      <div key={product.key} style={{ marginBottom: '80px', position: 'relative' }}>
        <span style={{ marginRight: '-5px' }}>US${product.total}</span>
        <ClockCircleOutlined 
        style={{ cursor: 'pointer', position: 'absolute', top:'4px',right: '-40px' }}
        />
         <DeleteOutlined
          onClick={() => showDeleteConfirmation(product.key)}
          style={{ cursor: 'pointer', position: 'absolute', top:'4px',right: '-80px' }}
        />
      </div>
                  ))}
                  
                </div>
            
              </div>
              
            </div>
            
          )}

          {/* 添加商品和添加自定义商品按钮移动到左下方 */}
          {showSelectedProducts && shouldShowBottomAddButton && (
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: '20px',
                left: '10px',
                flexDirection: 'row',
                gap: '10px',
              }}
            >
              <Button
                onClick={showModal}
                style={{
                  fontSize: "14px",
                  color: '#474F5E',
                  backgroundColor:'#FFFFF',
                  width:'160px',
                  height:'36px',
                  padding:'7px 15px',
                }}
              >
                添加商品
              </Button>
              <Button
                style={{
                  fontSize: "14px",
                  color: '#356DFF',
                  background:'#FFFFF',
                  border:'none',
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