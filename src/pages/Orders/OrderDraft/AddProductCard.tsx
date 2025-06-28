import React, { useState, useEffect } from 'react';
import { Card, Form, Modal, Input, message, Select, Table, Space, TableProps, InputNumber, Flex, Col, Row, Popconfirm } from 'antd';
import { ClockCircleOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons/lib/icons';
import styled from 'styled-components';
import { WarningIcon } from '@/components/Icons/Icons';
import SimpleCard from '@/components/Card/SimpleCard';
import { observer } from 'mobx-react-lite';
import cookie from 'react-cookies';
import orderDraft from '@/store/order/orderDraft';
import ProductTableModal from './ProductTableModal';
import EditDiscount from './EditDiscount';
import AddCustomProducts from './AddCustomProducts';

const AddProductCard = ()=> {

  const [form] = Form.useForm();

  // 校验规则
  const [quantityRules,setQuantityRules] = useState<any>({});

  useEffect(() => {
    if (orderDraft.productInfo.length > 0) {
      // 初始化进行校验
      form.submit();
    }
  }, [orderDraft.productInfo.length]);

  return (
    <Scoped>
      <SimpleCard title={<Flex justify='space-between'>
        <div>商品</div>
        <Flex align='center' gap={8}>
          <ClockCircleOutlined className='font-18 color-474F5E' />
          <span className='font-14 font-w-400 cursor-pointer card-title-text'>保留商品</span>
        </Flex>
      </Flex>} content={
        <Form form={form}>
          {orderDraft.productInfo.length == 0 && <Flex vertical align='center' justify='center' gap={12}>
            <>
              <ProductTableModal />
              <AddCustomProducts />
            </>
          </Flex>}
          {orderDraft.productInfo.length > 0 && <div>
            {/* 商品 head */}
            <Flex>
              <Flex style={{flex:1}}><span className='font-w-600'>商品</span></Flex>
              <Flex style={{width:"90px"}}><span className='font-w-600'>数量</span></Flex>
              <Flex style={{width:"120px",marginRight:"20px"}} justify='end'><span className='font-w-600'>合计</span></Flex>
              <Flex style={{width:"90px"}} justify='center'><div></div></Flex>
            </Flex>
            {/* body */}
            {orderDraft.productInfo.map((item,index)=>{
              // console.log(item)
              // console.log(item.product_quantity)
              return(
                <Flex key={index} className='table-item'>
                  <Flex style={{flex:1}}>
                    <div className="product-img-warp">
                      <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-shell/20250408150846734/imgs/empty.79f7a.svg" alt="empty" />
                    </div>
                    <Flex vertical style={{marginLeft:"12px"}} gap={6}>
                      <div className='font-w-600'>{item.product_name}</div>
                      <div className='color-242833'>成本价：{cookie.load("symbolLeft") || ""}{Number(item.product_cost_price).toFixed(2)}</div>
                      <EditDiscount index={index} />
                    </Flex>
                  </Flex>
                  <Form.Item style={{width:"90px"}} initialValue={item.product_quantity} name={[index, 'quantity']} rules={[
                    {
                      validator: (_, value) => {
                        if (item.product_quantity == 0 || quantityRules[index] == false) {
                          setQuantityRules((prev:any)=>{
                            return {
                              ...prev,
                              [index]:false
                            }
                          })
                          return Promise.reject(<span style={{ fontSize: '12px' }}>库存未达到起批量，请重新选择或删除</span>)
                        }
                      }
                    },
                  ]}>
                    <InputNumber
                      style={{ width: '100%' }}
                      min={1}
                      max={99999}
                      onChange={(value)=>{
                        console.log(item.product_quantity)
                        orderDraft.setProductInfo(
                          orderDraft.productInfo.map((product:any) => {
                            if(product.product_id ? product.product_id == item.product_id : product.vid == item.vid) {
                              return {
                                ...product,
                                product_quantity: value,
                              };
                            }
                            return product;
                          })
                        );
                      }}
                    />
                  </Form.Item>
                  <Flex style={{width:"120px",marginRight:"20px"}} justify='end'>{cookie.load("symbolLeft") || ""}{Number(item.final_price * item.product_quantity).toFixed(2)}</Flex>
                  <Flex gap={20} style={{width:"90px"}} justify='center' align='flex-start'>
                    <ClockCircleOutlined className='font-18 color-B8BECC' />
                    <Popconfirm
                      title="确认要将此商品从订单中移除吗？"
                      icon={<WarningIcon style={{ color: '#F86140' }} />}
                      cancelButtonProps={{style: { fontSize: '12px' }}}
                      okButtonProps={{style: { fontSize: '12px',backgroundColor:"#F86140" }}}
                      onConfirm={() => {
                        orderDraft.setProductInfo(
                          orderDraft.productInfo.filter(product => (product.product_id ? product.product_id != item.product_id : product.vid != item.vid))
                        );
                      }}
                    >
                      <DeleteOutlined className='font-18 color-F86140' />
                    </Popconfirm>
                  </Flex>
                </Flex>
              )
            })}
          </div>}
          {/* 添加商品和添加自定义商品按钮移动到左下方 */}
          {orderDraft.productInfo.length>0 && (
            <Flex style={{marginTop:"16px"}} align='center' gap={20}>
              <ProductTableModal />
              <AddCustomProducts />
            </Flex>
          )}
        </Form>
      } />
    </Scoped>
    
  );
};


export default observer(AddProductCard)

const Scoped = styled.div`

  .card-title-text:hover{
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color:#474F5E;
  }
  
  .table-item{
    margin-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eef1f6;
    &:last-child{
      border-bottom: none;
    }
    .product-img-warp{
      width: 60px;
      height: 60px;
      background: #f7f8fb;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 40px;
      }
    }
  }

`

