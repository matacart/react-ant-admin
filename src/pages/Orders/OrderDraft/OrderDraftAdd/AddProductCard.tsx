import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, Input, message, Select, Table, Space, TableProps, InputNumber, Flex, Col, Row, Popconfirm } from 'antd';
import { getProductList } from '@/services/y2/api'; 
import { ColumnsType } from 'antd/lib/table';
import { Props } from '@/pages/Test/types';
import { ClockCircleOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons/lib/icons';
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import styled from 'styled-components';
import DefaultButtonSecondary from '@/components/Button/DefaultButtonSecondary';
import { WarningIcon } from '@/components/Icons/Icons';
import SimpleCard from '@/components/Card/SimpleCard';
import ProductTableModal from '../ProductTableModal';
import order from '@/store/order/order';
import { observer } from 'mobx-react-lite';
import cookie from 'react-cookies';

const AddProductCard = ()=> {

  const [form] = Form.useForm();

  // 校验规则
  const [quantityRules,setQuantityRules] = useState<any>({});

  useEffect(() => {
    if (order.productInfo.length > 0) {
      // 初始化进行校验
      form.submit();
    }
  }, [order.productInfo.length]);

  return (
    <Scoped>
      <SimpleCard title={<div>商品</div>} content={
        <Form form={form}>
          {order.productInfo.length == 0 && <Flex vertical align='center' justify='center'>
            <>
              <ProductTableModal />
              <span
                style={{
                  fontSize: "14px",
                  color: '#356DFF',
                  marginTop: "20px",
                }}
              >
                添加自定义商品
              </span>
            </>
          </Flex>}
          {order.productInfo.length > 0 && <div>
            {/* 商品 head */}
            <Flex>
              <Flex style={{flex:1}}><span className='font-w-600'>商品</span></Flex>
              <Flex style={{width:"90px"}}><span className='font-w-600'>数量</span></Flex>
              <Flex style={{width:"120px",marginRight:"20px"}} justify='end'><span className='font-w-600'>合计</span></Flex>
              <Flex style={{width:"90px"}} justify='center'><div></div></Flex>
            </Flex>
            {/* body */}
            {order.productInfo.map(item=>{
              // console.log(item)
              return(
                <Flex className='table-item'>
                  <Flex style={{flex:1}}>
                    <div className="product-img-warp">
                      <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-shell/20250408150846734/imgs/empty.79f7a.svg" alt="empty" />
                    </div>
                    <Flex vertical style={{marginLeft:"12px"}} gap={6}>
                      <div className='font-w-600'>{item.title}</div>
                      <div className='color-242833'>成本价：{cookie.load("symbolLeft") || ""}{item.cost_price}</div>
                      <div className='color-356DFF'>{cookie.load("symbolLeft") || ""}{item.specialprice}</div>
                    </Flex>
                  </Flex>
                  <Form.Item style={{width:"90px"}} initialValue={item.quantity} name={[item.id, 'quantity']} rules={[
                    {
                      validator: (_, value) => {
                        if (item.quantity == 0 || quantityRules[item.id] == false) {
                          setQuantityRules((prev:any)=>{
                            return {
                              ...prev,
                              [item.id]:false
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
                      onChange={(value)=>{
                        order.setProductInfo(
                          order.productInfo.map(product => {
                            if (product.id === item.id) {
                              return {
                                ...product,
                                quantity: value,
                              };
                            }
                            return product;
                          })
                        );
                      }}
                    />
                  </Form.Item>
                  <Flex style={{width:"120px",marginRight:"20px"}} justify='end'>{cookie.load("symbolLeft") || ""}{item.specialprice * item.quantity}</Flex>
                  <Flex gap={20} style={{width:"90px"}} justify='center' align='flex-start'>
                    <ClockCircleOutlined className='font-18 color-B8BECC' />
                    <Popconfirm
                      title="确认要将此商品从订单中移除吗？"
                      icon={<WarningIcon style={{ color: '#F86140' }} />}
                      cancelButtonProps={{style: { fontSize: '12px' }}}
                      okButtonProps={{style: { fontSize: '12px',backgroundColor:"#F86140" }}}
                      onConfirm={() => {
                        order.setProductInfo(
                          order.productInfo.filter(product => product.id !== item.id)
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
          {order.productInfo.length>0 && (
            <Flex style={{marginTop:"16px"}} align='center' gap={20}>
              <ProductTableModal />
              <div className='color-356DFF cursor-pointer'>
                添加自定义商品
              </div>
            </Flex>
          )}
        </Form>
      } />
    </Scoped>
    
  );
};


export default observer(AddProductCard)

const Scoped = styled.div`
  
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

