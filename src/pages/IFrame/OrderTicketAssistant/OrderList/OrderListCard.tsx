
import MySelect from '@/components/Select/MySelect';
import { SearchOutlined } from '@ant-design/icons';
import { Card, DatePicker, Flex, Input, Select, Tag } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import OrderListTable from './OrderListTable';


const { RangePicker } = DatePicker;

function OrderListCard(){

    // 
    const [paymentStatus,setPaymentStatusStatus] = useState([
        { value: '1', label: '待付款',checked:false },
        { value: '2', label: '部分付款',checked:false },
        { value: '3', label: '已付款',checked:false },
        { value: '4', label: '部分退款',checked:false },
        { value: '0', label: '已退款',checked:false }
    ])

    return (
        <Scoped>
            {/*  */}
            <Card>
                <Flex gap={8}>
                    {/*  */}
                    <div style={{flexGrow:"1"}}>
                        <Input prefix={<SearchOutlined />} placeholder="支持订单编号、商品名称、SKU、用户邮箱、标签等快速搜索" />
                    </div>
                    {/*  */}
                    <div>
                        <RangePicker />
                    </div>
                    <Select style={{width:"100px"}} defaultValue={"付款状态"} options={paymentStatus} />
                    <Select style={{width:"100px"}} defaultValue={"付款状态"} options={paymentStatus} />
                    <Select style={{width:"100px"}} defaultValue={"付款状态"} options={paymentStatus} />
                </Flex>
                {/* 标签 */}
                <Flex style={{marginBottom:"10px",marginTop:"10px"}}>
                  {<Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{}}>
                      <span className="color-474F5E font-14">
                        付款状态: {"待付款"}
                      </span>
                  </Tag>}
                </Flex>
                {/* table */}
                <div>
                    <OrderListTable />
                </div>
            </Card>
            
        </Scoped>
    )

}

export default OrderListCard;

const Scoped = styled.div`
   
`