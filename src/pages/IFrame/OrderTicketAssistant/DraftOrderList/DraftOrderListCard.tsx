
import MySelect from '@/components/Select/MySelect';
import { SearchOutlined } from '@ant-design/icons';
import { Card, DatePicker, Flex, Input, Select, Tag } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import DraftOrderListTable from './DraftOrderListTable';
// import OrderListTable from './OrderListTable';


const { RangePicker } = DatePicker;

function DraftOrderListCard(){

    // 
    const [paymentStatus,setPaymentStatusStatus] = useState([
        { value: '1', label: '未结',checked:false },
        { value: '2', label: '已完成',checked:false },
    ])

    return (
        <Scoped>
            {/*  */}
            <Card>
                <Flex gap={16}>
                    {/*  */}
                    <div style={{flexGrow:"1"}}>
                        <Input prefix={<SearchOutlined />} placeholder="支持草稿单号查询" />
                    </div>
                    <Select style={{width:"120px"}} defaultValue={"状态"} options={paymentStatus} />
                </Flex>
                {/* table */}
                <div>
                    <DraftOrderListTable />
                </div>
            </Card>
            
        </Scoped>
    )

}

export default DraftOrderListCard;

const Scoped = styled.div`
   
`