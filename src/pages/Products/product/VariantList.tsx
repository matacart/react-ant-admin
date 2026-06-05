import React, { useEffect, useState } from 'react';
import { App, Card, Table, Upload, Checkbox, Image, Radio, Flex, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import product, { variantsType } from '@/store/product/product';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { ColumnsType } from 'antd/lib/table';
import NumberInput from '@/components/Input/NumberInput';
import _ from 'lodash';
import { DeleteIcon, EditIcon, ImageUploadIcon } from '@/components/Icons/Icons';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { uploadPic } from '@/services/y2/api';

function VariantList(){
  
  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);

  const [isHovering,setIsHovering] = useState<boolean[]>([]);

  const [variantList, setVariantList] = useState<variantsType[]>([]);

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
            option_values_ids:ids,
            option_values_names:t
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
          option_values_names:element.option_values_name,
          option_values_ids:element.option_values_id,
        })
      });
      skus = t
    }
    // 将结果存储起来
    return skus
  }

  const handleChangePrice = (value: string, record: variantsType, index: number) => {
    const newVariantList = _.cloneDeep(variantList);
    newVariantList[index].price = value;
    setVariantList(newVariantList);
    product.setVariantList(newVariantList);
  }

  const handleChangeOriginalPrice = (value: string, record: variantsType, index: number) => {
    const newVariantList = _.cloneDeep(variantList);
    newVariantList[index].original_price = value;
    setVariantList(newVariantList);
    product.setVariantList(newVariantList);
  }

  const handleChangeCostPrice = (value: string, record: variantsType, index: number) => {
    const newVariantList = _.cloneDeep(variantList);
    newVariantList[index].cost_price = value;
    setVariantList(newVariantList);
    product.setVariantList(newVariantList);
  }
  
  const handleChangeQuantity = (value: string, record: variantsType, index: number) => {
    const newVariantList = _.cloneDeep(variantList);
    newVariantList[index].quantity = value;
    setVariantList(newVariantList);
    product.setVariantList(newVariantList);
  }

  // 删除
  const handleRemove = (record: variantsType,index: number) => {
    const myModal = modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '该变体删除后无法恢复，是否要继续',
      centered:true,
      footer:()=><Flex justify="end" gap={12} style={{marginTop:"20px"}}>
        <DefaultButton onClick={()=>{
          myModal.destroy();
        }} text="取消"/>
        <PrimaryButton onClick={()=>{
          const newVariantList = _.cloneDeep(variantList);
          newVariantList.splice(index, 1);
          setVariantList(newVariantList);
          product.setVariantList(newVariantList);
          // 删除变体 -- 将状态设置为9
          if(record?.id){
            const newVariants = product.variants.map(item=>item.id == record.id ?{...item,status:"9"}:item);
            product.setVariants(newVariants)
          }
          myModal.destroy();
        }} text="确认"/>
      </Flex>
    });
  }


  // 上传图片
  const handleImgUpload = (file: any,index: number) => {
      if (file.type.indexOf('image') === -1) {
          message.error('请上传图片文件');
          return false;
      }
      if (file.size > 4 * 1024 * 1024) {
          message.error('图片大小不能超过4MB');
          return false;
      }
      let formData = new FormData()
      formData.append("file", file)
      setLoading(true);
      uploadPic(formData).then((res: any) => {
          if(res.code == 0){
              const newImg = res.data.src;
              const newVariantList = [...variantList];
              newVariantList[index].image = newImg
              setVariantList(newVariantList)
              product.setVariantList(newVariantList)
          }else{
              message.error(res.msg || "err", 1)
          }
      }).catch((err: any) => {
      }).finally(() => {
          setLoading(false);
      })
      return false;
  };

  useEffect(() => {
    const generateStyles = async (sku:variantsType[]) => {
      // 生成变体
      let newVariantList:any = [];
      const newStyles = sku.map((item, index) => ({
          key:"uuid"+index,
          status:"1",
          image: '',
          option_values_ids:item.option_values_ids,
          option_values_names:item.option_values_names,
          price:"",
          original_price:"",
          cost_price:"",
          quantity:"",
          sku: '',
          sort:"1",
          hs_code: '',
          weight: "0",
      }));
      // 与状态同步
      newStyles.map((item) => {
        const variant = product.variants.find((variant) => variant.option_values_ids == item.option_values_ids);
        if(variant && variant.status !== "9"){
          newVariantList.push({
            ...variant,
            option_values_ids:item.option_values_ids,
            option_values_names:item.option_values_names,
          })
        }else{
          newVariantList.push(item);
        }
      })
      // 原始变体
      const newVariants = toJS(product.variants).map((variant) => {
        if(variant.status !== "9" && !newVariantList.some((item:variantsType) => item.id == variant.id)){
          return {
            ...variant,
            status:"9",
          }
        }
        return variant;
      })
      // 格式化后的变体
      setVariantList(newVariantList)
      product.setVariantList(newVariantList)
      product.setVariants(newVariants)
    };
    if(product.attributesMap.length>0) {
      const attrValue = toJS(product.attributesMap).map((attribute:any) => {
        return [
          ...attribute.optionValue.map((value:any) => attribute.options.find((item:any) => item.option_values_id == value))
        ]
      })
      const sku = generateSku(attrValue)
      generateStyles(sku)
    }else{
      setVariantList([])
      product.setVariantList([])
      const newVariants = toJS(product.variants).map((variant) => {
        if(variant.status !== "9"){
          return {
            ...variant,
            status:"9",
          }
        }
        return variant;
      })
      product.setVariants(newVariants)
    }
  }, [product.attributesMap]);

  const columns: ColumnsType<variantsType> = [
    {
      title: '图片',
      dataIndex: 'image',
      fixed: 'left', // 固定左侧
      width: 60, // 设置宽度以适应图片
      render: (value: string, record: variantsType,index:number) => (
        <>  
          {(record.image == null || record.image == "") ? <Upload
              showUploadList={false} 
              beforeUpload={(file) => handleImgUpload(file,index)}
          >
              <div className='imgBox'><ImageUploadIcon /></div>
          </Upload>:<div className='singleImg' 
              onClick={()=>{
                  let newVariantList = [...variantList]
                  newVariantList[index].image = ''
                  setVariantList(newVariantList)
                  product.setVariantList(newVariantList)
              }}
              onMouseOver={() => {
                  let newIsHovering = [...isHovering]
                  newIsHovering[index] = true
                  setIsHovering(newIsHovering)
              }} onMouseOut={() => {
                  let newIsHovering = [...isHovering]
                  newIsHovering[index] = false
                  setIsHovering(newIsHovering)
              }}
          >
              <Image src={record.image ? record.image+"?x-oss-process=image/resize,w_100" : ""} style={{width:"100%",height:"100%"}} />
              <div className="overlay"
                  style={{
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovering[index] ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      cursor:"pointer"
                  }}
              >
                  <span style={{color:"#fff"}}>
                      <DeleteOutlined />
                  </span>
              </div>
          </div>}
        </>
      ),
    },
    {
      title: '款式',
      fixed: 'left', // 固定左侧
      dataIndex: 'option_values_names',
      width: 100, // 设置宽度以适应文字
    },
    {
      title: '售价',
      dataIndex: 'price',
      width: 80, // 设置宽度以适应文字
      render: (value: string, record: variantsType,index: number) => (
        <NumberInput style={{width:'100%'}} value={value} onChange={(value:string) => handleChangePrice(value,record,index)}  />
      ),
    },
    {
      title: '原价',
      dataIndex: 'original_price',
      width: 80, // 设置宽度以适应文字
      render: (value: string, record: variantsType,index: number) => (
        <NumberInput style={{width:'100%'}} value={value} onChange={(value:string) => handleChangeOriginalPrice(value,record,index)} />
      ),
    },
    {
      title: '成本价',
      dataIndex: 'cost_price',
      width: 80, // 设置宽度以适应文字
      render: (value: string, record: variantsType,index: number) => (
        <NumberInput style={{width:'100%'}} value={value} onChange={(value:string) => handleChangeCostPrice(value,record,index)}  />
      ),
    },
    {
      title: '库存',
      dataIndex: 'quantity',
      width: 80, // 设置宽度以适应文字
      render: (value: string, record: variantsType,index: number) => (
        <NumberInput style={{width:'100%'}} value={value} onChange={(value:string) => handleChangeQuantity(value,record,index)}  />
      ),
    },
    {
      title: '元字段',
      dataIndex: 'metaFields',
      render: (metaFields: string, record: variantsType) => (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {metaFields}
          <EditIcon className="font-20" />
        </span>
      ),
      width: 30,
    },
    {
      title: '',
      dataIndex: 'delete',
      width: 28,
      fixed: 'right', // 将列固定在右侧
      render: (metaFields: string,record: variantsType,index:number) => (
        <Flex justify="center">
          <Tooltip title="删除">
            <DeleteIcon className='font-20 color-D33612 cursor-pointer' onClick={()=> handleRemove(record,index)} />
          </Tooltip>
        </Flex>
      )
    },
  ];

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
            loading={loading}
            rowKey={(record,index)=>record?.id || record?.key || ""}
            columns={columns}
            dataSource={variantList}
            scroll={{ x: 1360 }}
          />
        </div>
      </Scoped>
    </Card>
  );
}

export default observer(VariantList);

const Scoped = styled.div`
  .imgBox{
    width: 60px;
    height: 60px;
    border: 1px dashed #D9D9D9;
    border-radius: 4px;
    cursor:pointer;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .imgBox:hover{
    color: #1890ff;
    border: 1px dashed #1890ff;
  }
  .singleImg{
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }
  .overlay{
    position: 'absolute';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: 'rgba(0, 0, 0, 0.5)';
    display: 'flex';
    align-items: 'center';
    justify-content: 'center';
    opacity: 1 ;
    transition: 'opacity 0.3s ease';
  }
`