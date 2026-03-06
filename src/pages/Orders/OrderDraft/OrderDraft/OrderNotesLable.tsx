import { Badge, Button, Card } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import MyTextArea from "@/components/Input/MyTextArea";
import orderDraft from "@/store/order/orderDraft";


function OrderNotesLabel() {
    return (
        <Scoped>
            <Card>
                <div className='title font-16 font-w-600 color-242833'>订单备注</div>
                <MyTextArea placeholder="客户不会看到你输入的备注内容" style={{width:"100%"}} autoSize={{ minRows: 2, maxRows: 6 }} value={orderDraft.orderInfo.remark} onChange={(e:any)=>{
                  orderDraft.setOrderInfo({...orderDraft.orderInfo,remark:e.target.value})
                }} />
            </Card>
        </Scoped>
        
    )
}

const Scoped = styled.div`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
  .search-input-warp{
    margin:20px 0;
  }
`

export default observer(OrderNotesLabel);