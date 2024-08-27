import React, { useState } from 'react';
import { Card, Table, Button, Upload, Modal } from 'antd';

interface StyleItem {
  id: number;
  imageUrl: string;
  style: string;
  sku: string;
  salePrice: number;
  originalPrice: number;
  costPrice: number;
  tax: boolean;
  inventoryPolicy: string;
  hsCode: string;
  country: string;
  stock: number;
  weight: number;
  shipping: boolean;
  barcode: string;
  metaFields: string;
}

const ProductStyleList: React.FC = () => {
  const [styles, setStyles] = useState<StyleItem[]>([
    {
      id: 1,
      imageUrl: '',
      style: 'Red',
      sku: 'SKU123',
      salePrice: 99.99,
      originalPrice: 120.00,
      costPrice: 70.00,
      tax: true,
      inventoryPolicy: 'track',
      hsCode: '12345678',
      country: 'China',
      stock: 10,
      weight: 0.5,
      shipping: true,
      barcode: '1234567890123',
      metaFields: 'extra info',
    },
    // 更多款式数据...
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const columns = [
    {
      title: '图片',
      dataIndex: 'imageUrl',
      fixed: 'left', // 固定左侧
      width: 150, // 设置宽度以适应图片
      render: (imageUrl: string, record: StyleItem) => (
        <Upload
          action="/appstore/ApiAppstore/doUploadPic"
          listType="picture-card"
          multiple={true}
          fileList={fileList.filter((file) => file.uid === record.id)}
          onPreview={handlePreview}
          onChange={(info) => handleChange(info, record.id)}
        >
          {fileList.filter((file) => file.uid === record.id).length >= 8 ? null : (
            <div>
              <div className="ant-upload-picture-card-wrapper">
                <div className="ant-upload-picture-card">
                  <div>+</div>
                </div>
              </div>
              <div className="ant-upload-text">上传图片</div>
            </div>
          )}
          {imageUrl && <img src={imageUrl} alt="example" style={{ width: '100%' }} />}
        </Upload>
      ),
    },
    {
      title: '款式',
      dataIndex: 'style',
      fixed: 'left', // 固定左侧
      width: 100, // 设置宽度以适应文字
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
    },
    {
      title: '售价',
      dataIndex: 'salePrice',
      sorter: (a: StyleItem, b: StyleItem) => a.salePrice - b.salePrice,
    },
    {
      title: '原价',
      dataIndex: 'originalPrice',
      sorter: (a: StyleItem, b: StyleItem) => a.originalPrice - b.originalPrice,
    },
    {
      title: '成本价',
      dataIndex: 'costPrice',
      sorter: (a: StyleItem, b: StyleItem) => a.costPrice - b.costPrice,
    },
    {
      title: '税收',
      dataIndex: 'tax',
      render: (tax: boolean) => (tax ? '需要收取税费' : '不需要收取税费'),
    },
    {
      title: '库存策略',
      dataIndex: 'inventoryPolicy',
      filters: [
        { text: 'track', value: 'track' },
        { text: 'no_track', value: 'no_track' },
      ],
      onFilter: (value: string, record: StyleItem) => record.inventoryPolicy === value,
    },
    {
      title: 'HS（协调制度）代码',
      dataIndex: 'hsCode',
    },
    {
      title: '国家',
      dataIndex: 'country',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      sorter: (a: StyleItem, b: StyleItem) => a.stock - b.stock,
    },
    {
      title: '重量',
      dataIndex: 'weight',
      sorter: (a: StyleItem, b: StyleItem) => a.weight - b.weight,
    },
    {
      title: '发货',
      dataIndex: 'shipping',
      render: (shipping: boolean) => (shipping ? '需要运输发货' : '不需要运输发货'),
    },
    {
      title: '条码',
      dataIndex: 'barcode',
    },
    {
      title: '元字段',
      dataIndex: 'metaFields',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: StyleItem) => (
        <span>
          <a>编辑</a>
          <a style={{ marginLeft: 8 }}>删除</a>
        </span>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleUploadClick = (id: number) => {
    setSelectedRowKeys([id]); // 选择当前行
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }: { fileList: any[]; }, id?: number) => {
    setFileList(fileList);
  };

  return (
    <Card
    title={
      <>
        款式列表
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <Button type="primary">批量选择（满足任意一个条件）</Button>
          <Button type="primary">条件筛选（满足以下全部条件）</Button>
        </div>
      </>
    }
  >
    <div style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}> {/* 添加溢出滚动 */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={styles} // 直接使用原始数据
        rowSelection={rowSelection}
        scroll={{ x: 2000 }} // 设置滚动宽度
      />
    </div>

    <Modal
      visible={previewOpen}
      footer={null}
      onCancel={() => setPreviewOpen(false)}
    >
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </Card>
  );
};

export default ProductStyleList;