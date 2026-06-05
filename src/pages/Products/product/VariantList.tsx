import React, { useEffect, useState } from 'react';
import { App, Card, Table, Button, Upload, Modal, Checkbox, Input, Select, InputNumber, Radio, Space, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import cookie from 'react-cookies';
import product from '@/store/product/product';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

interface StyleItem {
  keyId: number;
  image: string;
  style: string;
  sku: string;
  price: number;
  original_price: number;
  cost_price: number;
  quantity: number;
  tax: boolean;
  inventoryPolicy: string;
  hsCode: string;
  country: string;
  weight: number;
  weightUnit: string;
  shipping: boolean;
  barcode: string;
  metaFields: string;
}

function VariantList(){
  
  const { message } = App.useApp();

  const [isLoading, setIsLoading] = useState(false);

  const [variantList, setVariantList] = useState<StyleItem[]>([]);

  const { modal } = App.useApp();  // 获取带有上下文的 modal 对象
  
  function generateSku(attrValue:any[]){
    // 开始构建sku 
    let skus: any[] = []
    // 笛卡尔积算法（注意，我们的reduce没有指定第二个参数，则第一次循环中，col是数组第一位，set是数组第二位）
    skus = attrValue.reduce((col: any[], set) => {
      let res: any[] = []
      // 对于每个属性值集合，依次与当前已有的结果集做笛卡尔积
      col.forEach((c) => {
        set.forEach((s) => {
          // 将两个属性值合并为一个字符串，并存入结果集中
          let t = c.option_values_name + ',' + s.option_values_name
          let ids = c.option_values_id + ',' + s.option_values_id
          // let t = c.option_values_name + ',' + s.option_values_name
          // 寻找销售属性指定的图片
          res.push({
            option_values_id:ids,
            option_values_name:t
          })
        })
      })
      // 将笛卡尔积后的结果集返回，作为下一轮的结果集
      return res
    })
    if(attrValue.length == 1){
      let t = [];
      attrValue[0].forEach(element => {
        t.push({
          option_values_name:element.option_values_name,
          option_values_id:element.option_values_id,
        })
      });
      skus = t
    }
    // 将结果存储起来
    return skus
  }

  useEffect(() => {
    const generateStyles = async (sku:any) => {
      setIsLoading(true);
      // 
      const newStyles = sku.map((item, index) => ({
          image: '',
          option_values_ids:item.option_values_id,
          option_values_names:item.option_values_name,
          sku: '',
          price:"",
          original_price:0,
          cost_price:0,
          quantity:0,
          status:"1",
          sort:"1",
          // -----
          // tax: true,
          // inventoryPolicy: '',
          hsCode: '',
          country: '',
          weight: 0,
          // weightUnit: '克',
          // shipping: true,
          // barcode: '',
          // metaFields: '',
      }));
      let temp = [...newStyles]
      // if(product.variants.length<newStyles.length){
      //   // 增加
      //   temp.forEach((res,index) => {
      //     product.variants.forEach(element => {
      //       if(JSON.stringify(element.option_values_names.split(',').sort()) == JSON.stringify(res.option_values_names.split(',').sort())){
      //         temp[index] = element
      //       }
      //     })
      //   })
      // }else{
      //   const commonElements = product.variants.filter(item1 => 
      //     temp.some(item2 => JSON.stringify(item1.option_values_names.split(',').sort()) == JSON.stringify(item2.option_values_names.split(',').sort()))
      //   )
      //   const commonElementsRemove = product.variants.filter(item1 => 
      //     !temp.some(item2 => JSON.stringify(item1.option_values_names.split(',').sort()) == JSON.stringify(item2.option_values_names.split(',').sort()))
      //   )
      //   console.log('commonElements',commonElements)
      //   console.log('commonElementsRemove',commonElementsRemove)
      //   temp.forEach((res,index) => {
      //     commonElements.forEach(element => {
      //       if(JSON.stringify(element.option_values_names.split(',').sort()) == JSON.stringify(res.option_values_names.split(',').sort())){
      //         temp[index] = element
      //       }
      //     })
      //   })
      //   commonElementsRemove.forEach(res=>{
      //     if(res.id!==undefined){
      //       product.tempVariants.push({...res,status:"9"})
      //     }
      //   })
      // }
      setVariantList(temp)
      // product.setVariants(temp)
      setIsLoading(false);
      // temp.forEach((res,index) => {
      //   product.variants.forEach(element => {
      //     if(element.status !== "9" && element.option_values_names == res.option_values_names){
      //       temp[index] = element
      //     }else{
      //       // 状态
      //       // removeData()
      //       temp.push({...element,status:"9"})
      //     }
      //   })
      // });
      // console.log('temp',temp)
      // setStyles(temp)
    };
    if(product.attributesMap.length>0) {
      const attrValue = toJS(product.attributesMap).map(attribute => {
        return [
          ...attribute.optionValue.map((value:any) => attribute.options.find((item:any) => item.option_values_id == value))
        ]
      })
      const sku = generateSku(attrValue)
      generateStyles(sku)
    }else{
      setVariantList([])
    }
  }, [product.attributesMap]);

  
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const columns = [
    {
      title: '图片',
      dataIndex: 'image',
      fixed: 'left', // 固定左侧
      width: 100, // 设置宽度以适应图片
      render: (image: string, record: StyleItem,index:number) => (
        <div className='image-container'>
          <Upload
            listType="picture-card"
            // multiple={true}
            fileList={fileList.filter((file) => file.uid === record.id)}
            onPreview={handlePreview}
            beforeUpload={(info) => {
              let formData = new FormData()
              formData.append("1", info)
              setIsLoading(true)
              axios.post('/api/ApiAppstore/doUploadPic',formData).then((req: any) => {
                if(req.data.code == 0){
                  let newStyles = [...styles]
                  newStyles[index].image = req.data.data.src
                  console.log(req.data.data.src)
                  setStyles(newStyles)
                  product.setVariants(newStyles)
                  setIsLoading(false)
                }else{
                  setIsLoading(false)
                  message.error("上传失败", 1)
                }
              })
              return false;
            }}
          >
            {image !== "" ? null : (
              <div className='img-box'>
                <PlusOutlined />
              </div>
            )}
            {image && <img src={image} alt="example" style={{ width: '100%' }} />}
          </Upload>
        </div>
      ),
    },
    {
      title: '款式',
      fixed: 'left', // 固定左侧
      dataIndex: 'option_values_names',
      width: 160, // 设置宽度以适应文字
    },
    {
      title: '元字段',
      dataIndex: 'metaFields',
      render: (metaFields: string, record: StyleItem) => (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {metaFields}
          <span className="edit-icon btn-icon__1h8Qx edit__3TiEz">
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconEdit" font-size="20">
              <path d="M13.551 2.47a.75.75 0 0 0-1.06 0l-9.9 9.9a.75.75 0 0 0-.22.53v4.242c0 .414.336.75.75.75h4.243a.75.75 0 0 0 .53-.22l9.9-9.899a.75.75 0 0 0 0-1.06L13.551 2.47Zm-9.68 10.74 9.15-9.15 3.182 3.183-9.15 9.15H3.873V13.21Zm13.807 4.682a.1.1 0 0 0 .1-.1v-1.3a.1.1 0 0 0-.1-.1h-6.8a.1.1 0 0 0-.1.1v1.3a.1.1 0 0 0 .1.1h6.8Z" fill="#474F5E"></path>
            </svg>
          </span>
        </span>
      ),
      width: 100,
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (metaFields: string,record: StyleItem,index:number) => (
        <Space>
          {/* <LocalizedModal /> */}
          {/* <span className="delete-icon btn-icon__1h8Qx delete__3TiEz" onClick={()=> handleRemove(record.id)}> */}
          <span className="delete-icon btn-icon__1h8Qx delete__3TiEz" onClick={()=>{
            modal.confirm({
              title: '确认删除',
              icon: <ExclamationCircleOutlined />,
              content: '该多属性删除后无法恢复，是否要继续',
              okText: '确认',
              cancelText: '取消',
              centered:true,
              destroyOnClose:true,
              onOk:()=>{
                handleRemove(record,index)
              }
            });
            // console.log(111111)
          }}>
            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconDelete" font-size="20" title="删除">
              <path d="M18 4.25h-4.325a3.751 3.751 0 0 0-7.35 0H2v1.5h1.305l.947 12.308A.75.75 0 0 0 5 18.75h10a.75.75 0 0 0 .748-.692l.947-12.308H18v-1.5Zm-2.81 1.5-.884 11.5H5.694L4.81 5.75h10.38Zm-5.19-3c.98 0 1.813.626 2.122 1.5H7.878A2.25 2.25 0 0 1 10 2.75Z" fill="#F86140"></path>
            </svg>
          </span>
        </Space>
      ),
      width: 60,
      fixed: 'right', // 将列固定在右侧
    },
  ];

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePreview = async (file: any) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file.originFileObj);
    //     reader.onload = () => resolve(reader.result);
    //   });
    // }
    // setPreviewImage(file.url || (file.preview as string));
    // setPreviewOpen(true);
  };

  const [selectedValue, setSelectedValue] = useState('or');

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Card
      title={
        <>
          款式列表
        </>
      }
    >
      <Scoped>
        <div style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
          <Checkbox.Group>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Radio.Group onChange={handleRadioChange} value={selectedValue}>
                  <Radio value="or">
                    批量选择（满足任意一个条件）
                  </Radio>
                  <Radio value="and">
                    条件筛选（满足以下全部条件）
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </Checkbox.Group>
          <Table
            loading={isLoading}
            rowKey={(record,index)=>index}
            columns={columns}
            dataSource={variantList}
            // rowSelection={rowSelection}
            scroll={{ x: 1360 }}
            // onRow={(record) => ({
            //   onClick: () => {
            //     console.log('Row clicked:', record);
            //     if(record.id){
            //       return history.push(`/products/edit/${product.productId}/${product.language}/variants/${record.id}`);
            //     }
            //     message.info("请先保存商品")
            //   },
            // })}
          />
        </div>
      </Scoped>
    </Card>
  );
}

export default observer(VariantList);

const Scoped = styled.div`
  .image-container{
    :where(.css-dev-only-do-not-override-no4izc).ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select, :where(.css-dev-only-do-not-override-no4izc).ant-upload-wrapper.ant-upload-picture-circle-wrapper .ant-upload.ant-upload-select {
      width: 62px;
      height: 60px;
    }
    .img-box{
      font-size: 16px;
    }
  }
`