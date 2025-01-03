import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Upload, Modal, Checkbox, Input, Select, InputNumber, Tag, message, Radio, Space } from 'antd';
import { deleteProductStyle, getProductStyleList } from '@/services/y2/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import e from 'express';
import { set } from 'lodash';
import oldStore from '@/store/product/oldStore';
// import _ from 'lodash';


// 默认数据
// 
// setStyles([...oldData,...filteredArray])
// setCopyStyles([...oldData,...filteredArray])
// oldStore.setVariants([...oldData,...filteredArray])

interface StyleItem {
  keyId: number;
  imageUrl: string;
  style: string;
  sku: string;
  price: string;
  salePrice: number;
  originalPrice: number;
  costPrice: number;
  tax: boolean;
  inventoryPolicy: string;
  hsCode: string;
  country: string;
  stock: number;
  weight: number;
  weightUnit: string;
  shipping: boolean;
  barcode: string;
  metaFields: string;
}



function ProductStyleListEdit (props:any){

  const [isLoading, setIsLoading] = useState(false);

  const [styles, setStyles] = useState<StyleItem[]>([]);
  // 
  const [copyStyles, setCopyStyles] = useState<StyleItem[]>([]);

  const [modal, contextHolder] = Modal.useModal();
  function generateSku(attrValue){
    // 开始构建sku 
    // let attrValue: any[] = []
    // skuAttribute.map((item) => attrValue.push(item.option_values_name)) // 获取所有属性名称 => [['S','M'], ['白','黑']]
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
    console.log('props',props.style)
    const generateStyles = async (sku:any) => {
      setIsLoading(true);
      console.log('sku',sku)
      const newStyles = sku.map((item, index) => ({
          image: '',
          option_values_ids:item.option_values_id,
          option_values_names:item.option_values_name,
          price:"",
          status:"1",
          sort:"1",
          sku: '',
          originalPrice: 0,
          costPrice: 0,
          tax: true,
          inventoryPolicy: '',
          hsCode: '',
          country: '',
          stock: 0,
          weight: 0,
          weightUnit: '克',
          shipping: true,
          barcode: '',
          metaFields: '',
      }));
      console.log('newStyles',newStyles)
      // setStyles(newStyles)
      // oldStore.variants
      // setStyles([...newStyles,...oldStore.variants])
      let temp = [...newStyles]
      console.log('oldStore.variants',oldStore.variants)
      if(oldStore.variants.length<newStyles.length){
        // 增加
        temp.forEach((res,index) => {
          oldStore.variants.forEach(element => {
            if(JSON.stringify(element.option_values_names.split(',').sort()) == JSON.stringify(res.option_values_names.split(',').sort())){
              temp[index] = element
            }
          })
        })
      }else{
        const commonElements = oldStore.variants.filter(item1 => 
          temp.some(item2 => JSON.stringify(item1.option_values_names.split(',').sort()) == JSON.stringify(item2.option_values_names.split(',').sort()))
        )
        const commonElementsRemove = oldStore.variants.filter(item1 => 
          !temp.some(item2 => JSON.stringify(item1.option_values_names.split(',').sort()) == JSON.stringify(item2.option_values_names.split(',').sort()))
        )
        console.log('commonElements',commonElements)
        console.log('commonElementsRemove',commonElementsRemove)
        temp.forEach((res,index) => {
          commonElements.forEach(element => {
            if(JSON.stringify(element.option_values_names.split(',').sort()) == JSON.stringify(res.option_values_names.split(',').sort())){
              temp[index] = element
            }
          })
        })
        commonElementsRemove.forEach(res=>{
          if(res.id!==undefined){
            oldStore.removeVariantData.push({...res,status:"9"})
          }
        })
      }
      // else if(oldStore.variants.length == newStyles.length){
      //   console.log('oldStore.variants',oldStore.variants)
      //   const commonElements = oldStore.variants.filter(item1 => 
      //     temp.some(item2 => JSON.stringify(item1.option_values_names.split(',').sort()) == JSON.stringify(item2.option_values_names.split(',').sort()))
      //   )
      //   console.log('commonElements',commonElements)
      //   oldStore.variants.forEach(element => {

      //     // if(JSON.stringify(element.option_values_names.split(',').sort()) == JSON.stringify(res.option_values_names.split(',').sort())){
      //     //   temp[index] = element
      //     // }
      //     if(element.id!==undefined){
      //       oldStore.removeVariantData.push({...element,status:"9"})
      //     }
      //   })
      // }
      setStyles(temp)
      console.log('temp',temp)
      oldStore.setVariants(temp)
      setIsLoading(false);
      // temp.forEach((res,index) => {
      //   oldStore.variants.forEach(element => {
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
    if(props.style.length>0) {
      let sku = generateSku(props.style)
      generateStyles(sku)
    }else{
      // generateStyles([])
      setStyles([])
      // let reVariants = []
      // oldStore.variants.forEach(item=>{
      //   if(item.id!==undefined){
      //     reVariants.push({...item,status:"9"})
      //   }
      // })
      // oldStore.setVariants([])
      // oldStore.removeVariantData.push(...reVariants)
      
    }
  }, [props.style]);

  // 默认数据
  useEffect(()=>{
    setStyles(oldStore.variants)
    setCopyStyles(oldStore.variants)
  },[oldStore.productId])


  // 添加处理 SKU 变化的函数
  const handleSkuChange = (id: number, newValue: string) => {
    const updatedStyles = styles.map((style) => {
      if (style.keyId === id) {
        return { ...style, sku: newValue };
      }
      return style;
    });
    setStyles(updatedStyles);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const columns = [
    {
      title: '图片',
      dataIndex: 'image',
      fixed: 'left', // 固定左侧
      width: 130, // 设置宽度以适应图片
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
      dataIndex: 'option_values_names',
      width: 80, // 设置宽度以适应文字
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (sku: string, record: StyleItem) => (
        <Input
          value={sku}
          onChange={(e) => handleSkuChange(record.id, e.target.value)}
          style={{ width: 150}}
        />
      ),
      width:152,
    },
    {
      title: '售价',
      dataIndex: 'price',
      render: (price: number, record: StyleItem,index:number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 4 }}>US$</span>
          <Input
            value={price === 0 ? '' : price.toString()}
            onChange={(e) => handleSalePriceChange(index,record,e.target.value)}
            placeholder="售价"
            style={{ width: 150}}
          />
        </div>
      ),
      width: 152,
    },
    // {
    //   title: '原价',
    //   dataIndex: 'originalPrice',
    //   render: (originalPrice: number, record: StyleItem) => (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <span style={{ marginRight: 4 }}>US$</span>
    //       <Input
    //         value={originalPrice === 0 ? '' : originalPrice.toString()}
    //         onChange={(e) => handleOriginalPriceChange(record.id, e.target.value)}
    //         placeholder="原价"
    //         style={{ width: 150 }}
    //       />
    //     </div>
    //   ),
    //   width: 152,
    // },
    // {
    //   title: '成本价',
    //   dataIndex: 'costPrice',
    //   render: (costPrice: number, record: StyleItem) => (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <span style={{ marginRight: 4 }}>US$</span>
    //       <Input
    //         value={costPrice === 0 ? '' : costPrice.toString()}
    //         onChange={(e) => handleCostPriceChange(record.id, e.target.value)}
    //         placeholder="成本价"
    //         style={{ width: 150}}
    //       />
    //     </div>
    //   ),
    //   width: 132,
    // },
    // {
    //   title: '税收',
    //   dataIndex: 'tax',
    //   render: (tax: boolean, record: StyleItem) => (
    //     <span style={{ whiteSpace: 'nowrap' }}>
    //       <Checkbox
    //         checked={tax}
    //         onChange={(e) => handleTaxChange(record.id, e.target.checked)}
    //       />
    //   需要收取税费
    //     </span>
    //   ),
    //   width:130,
    // },
  //   {
  //     title: '库存策略',
  //     dataIndex: 'inventoryPolicy',
  //     render: (tax: boolean, record: StyleItem) => (
  //       <span style={{ whiteSpace: 'nowrap' }}>
  //         <Checkbox
  //           checked={tax}
  //         />
  //  开启库存策略
  //       </span>
  //     ),
  //     width:130,
  //   },
  //   {
  //     title: 'HS（协调制度）代码',
  //     dataIndex: 'hsCode',
  //     render: (hsCode: string, record: StyleItem) => (
  //       <div style={{ display: 'flex', alignItems: 'center' }}>
  //         <Input
  //           value={hsCode || ''} 
  //           onChange={(e) => handleHsCodeChange(record.id, e.target.value)}
  //           placeholder="请输入HS编码"
  //           style={{ width: 150,  }}
  //         />
  //       </div>
  //     ),
  //     width:152,
  //   },
    {
      title: '国家',
      dataIndex: 'country',
      render: (country: string) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          className="ant-select-selector"
          placeholder="选择国家"
          value={country}
          onChange={(value) => handleCountryChange(value)}
          style={{ width: 100, }}
        >
            <Select.Option value="China" >中国</Select.Option>
          {/* 其他选项... */}
        </Select>
        </div>
      ),
      width:122,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      render: (stock: number, record: StyleItem) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            value={stock || '0'} 
            placeholder="请输入库存数量"
            style={{ width: 130 }}
            onChange={(e) => {
              const newValue = e.target.value;
              record.stock = newValue ? parseInt(newValue, 10) : 0;
             handleStockChange(record);
            }}
          />
        </div>
      ),
      width: 132,
    },
    // {
    //   title: '重量',
    //   dataIndex: 'weight',
    //   render: (weight: number, record: StyleItem) => (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <InputNumber
    //         value={weight}
    //         onChange={(newValue) => handleWeightChange(record.id, Math.max(0, newValue))}
    //         min={0} // 设置最小值为0
    //         style={{ width: 160 }}
    //       />
    //       <Select
    //         value={record.weightUnit}
    //         onChange={(unit) => handleWeightUnitChange(record.id, unit)}
    //         style={{ width: 70 }}
    //       >
    //         <Select.Option value="克">克</Select.Option>
    //         <Select.Option value="千克">千克</Select.Option>
    //         <Select.Option value="磅">磅</Select.Option>
    //         <Select.Option value="蛊司">蛊司</Select.Option>
    //       </Select>
    //     </div>
    //   ),
    //   width: 162,
    // },
    // {
    //   title: '发货',
    //   dataIndex: 'shipping',
    //   render: (shipping: boolean, record: StyleItem) => (
    //     <span style={{ whiteSpace: 'nowrap' }}>
    //       <Checkbox
    //         checked={shipping}
    //         onChange={(e) => handleShippingChange(record.id, e.target.checked)}
    //       >
    //         需要运输发货
    //       </Checkbox>
    //     </span>
    //   ),
    //   width: 150,
    // },
    {
      title: '条码',
      dataIndex: 'barcode',
      render: (sku: string, record: StyleItem) => (
        <Input
          value={sku}
          style={{ width: 100}}
        />
      ),
      width:122,
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
      width: 50,
      fixed: 'right', // 将列固定在右侧
    },
  ];

  // 添加处理售价变化的函数
  const handleSalePriceChange = (index: number,item:any,newValue: string) => {
    let newStyles = [...styles]
    newStyles[index].price = newValue
    setStyles(newStyles)

    let newCopyStyles = [...copyStyles]
    newCopyStyles.forEach(res=>{
      if(item.option_values_names == res.option_values_names){
        res.price = newValue
      }
    })
    setCopyStyles(newCopyStyles)
    oldStore.setVariants(newCopyStyles)
    // const updatedStyles = styles.map((style) => {
    //   if (style.keyId === id) {
    //     // 如果输入为空字符串，则设置为 0
    //     const price = newValue.trim() === '' ? 0 : parseFloat(newValue);
    //     return { ...style, price };
    //   }
    //   return style;
    // });
    // setStyles(updatedStyles);
    // oldStore.setVariants(updatedStyles);
  };
  // 添加处理发货状态变化的函数
const handleShippingChange = (id: number, newShipping: boolean) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === id) {
      return { ...style, shipping: newShipping };
    }
    return style;
  });
  setStyles(updatedStyles);
};
  // 添加处理原价变化的函数
const handleOriginalPriceChange = (id: number, newValue: string) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === id) {
      // 如果输入为空字符串，则设置为 0
      const originalPrice = newValue.trim() === '' ? 0 : parseFloat(newValue);
      return { ...style, originalPrice };
    }
    return style;
  });
  setStyles(updatedStyles);
};
// 添加处理库存变化的函数
const handleStockChange = (record: StyleItem) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === record.id) {
      return { ...style, stock: record.stock };
    }
    return style;
  });
  setStyles(updatedStyles);
};
// 添加处理删除的函数
const handleRemove = (item:any,index:number) => {
  let newStyles = [...styles]
  newStyles.splice(index,1)
  setStyles(newStyles)
  let newCopyStyles = [...copyStyles]
  if(item.id){
    console.log(item.id)
    newCopyStyles.forEach(res=>{
      if(res.id && item.id == res.id){
        res.status = "9"
      }
    })
    setCopyStyles(newCopyStyles)
    oldStore.setVariants(newCopyStyles)
  }else{
    setCopyStyles(newCopyStyles.filter(res=>item.option_values_names !== res.option_values_names))
    oldStore.setVariants(newCopyStyles.filter(res=>item.option_values_names !== res.option_values_names))
    console.log(newCopyStyles.filter(res=>item.option_values_names !== res.option_values_names))
  }
  // const updatedStyles = styles.filter((style) => style.id !== id);
  // setStyles(updatedStyles);
  // deleteProductStyle(id).then(res=>{
  //   if(res.code == 0){
  //     message.success('款式删除成功')
  //   }else{
  //     message.error('款式删除失败')
  //   }
  // })
  // console.log(updatedStyles)
  // if(updatedStyles.length==0){
  //   props.setStyle(updatedStyles)
  // }
};

const handleHsCodeChange = (recordId: number, value: string) => {
  // 处理输入框变化的回调，根据id更新styles中的hsCode
  setStyles(styles.map(style => 
    style.id === recordId ? { ...style, hsCode: value } : style
  ));
};
// 添加处理成本价变化的函数
const handleCostPriceChange = (id: number, newValue: string) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === id) {
      // 如果输入为空字符串，则设置为 0
      const costPrice = newValue.trim() === '' ? 0 : parseFloat(newValue);
      return { ...style, costPrice };
    }
    return style;
  });
  setStyles(updatedStyles);
};
// 添加处理国家变化的函数
const handleCountryChange = (value: string) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === selectedRowKeys[0]) {
      return { ...style, country: value };
    }
    return style;
  });
  setStyles(updatedStyles);
};
// 添加处理税收状态改变的函数
const handleTaxChange = (id: number, checked: boolean) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === id) {
      return { ...style, tax: checked };
    }
    return style;
  });
  setStyles(updatedStyles);
};
// 添加处理重量变化的函数
const handleWeightChange = (id: number, newValue: number) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === id) {
      return { ...style, weight: Math.max(0, newValue) }; // 确保值不小于0
    }
    return style;
  });
  setStyles(updatedStyles);
};

// 添加处理重量单位变化的函数
const handleWeightUnitChange = (id: number, unit: string) => {
  const updatedStyles = styles.map((style) => {
    if (style.id === id) {
      return { ...style, weightUnit: unit };
    }
    return style;
  });
  setStyles(updatedStyles);
};
  const onSelectChange = (newSelectedRowKeys: number[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
  const handleModifyPrice = () => {
    // 实现更改价格的逻辑
   
  };

  const handleMoreActions = () => {
    // 实现更多操作的逻辑
   
  };

  const handleDelete = () => {
    // 实现删除的逻辑
    message.info('删除');
  };

  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStyleCount] = useState(1); // 假设已选择的款式数量
  const [newInventory] = useState<number | null>(null); // 新库存数量

  // 模态框显示与隐藏的控制
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 处理提交逻辑
    console.log('新库存数量:', newInventory);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [adjustmentType, setAdjustmentType] = useState('0'); // 用户选择的调整类型


  const [selectedValue, setSelectedValue] = useState('or');
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleCheckboxChange = (checkedValues: string[]) => {
    setCheckedList(checkedValues);
  };
  return (
  <Card
    title={
      <>
        款式列表
      </>
    }
  >
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
          {selectedValue === 'or' ? (
            <span style={{marginTop:'5px'}}>全部</span>
          ) : (
            <Button  style={{ marginTop: '1rem',width:'148px',height:'36px' }}>
              选择规格
            </Button>
          )}
          {selectedRowKeys.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <Checkbox checked={selectedRowKeys.length > 0} disabled>
                已选择 {selectedRowKeys.length} 项
              </Checkbox>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button  style={{marginRight:'10px'}} onClick={showModal}>
            修改库存
          </Button>
          <Modal
            title="修改库存"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>已选择{selectedStyleCount}个款式</p>
            <span style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="radio" 
              value="0" 
              checked={adjustmentType === '0'} 
              onChange={() => setAdjustmentType('0')} 
              style={{ marginRight: '8px' }} 
            />
            <p style={{ margin: 0 }}>修改为指定库存数量</p>
          </span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="radio" 
            value="1" 
            checked={adjustmentType === '1'} 
            onChange={() => setAdjustmentType('1')} 
            style={{ marginRight: '8px' }}
          />
          <p style={{ margin: 0 }}>基于原库存调整</p>
          </span>
            <Input
            
              width={400}
            />
          </Modal>
                <Select
              placeholder="更改价格"
              onClick={handleModifyPrice} style={{marginRight:'10px'}}
              dropdownMatchSelectWidth={false}
              dropdownStyle={{ width: 120 }}
            >
              <Option >修改售价</Option>
              <Option >修改原价</Option>
              <Option >修改成本价</Option>
            
            </Select>
            <Select
              placeholder="更多操作"
              onClick={handleMoreActions}   style={{  marginRight: '10px' }}
              dropdownMatchSelectWidth={false}
              dropdownStyle={{ width: 150 }}
            >
              <Option >修改重量</Option>
              <Option >设置图片</Option>
              <Option >库存追踪</Option>
              <Option >税费</Option>
              <Option >缺货后继续销售</Option>
              <Option >修改SKU</Option>
              <Option >修改HS编码</Option>
              <Option >修改发货国家</Option>
            </Select>
                <Button danger onClick={handleDelete}>删除</Button>
              </div>
            </div>
          )}
        </div>
      </Checkbox.Group>
      <Table
        loading={isLoading}
        rowKey={(record,index)=>index}
        columns={columns}
        dataSource={styles}
        rowSelection={rowSelection}
        scroll={{ x: 2000 }}
      />
      {contextHolder}
    </div>
</Card>
  );
}

export default ProductStyleListEdit