import { useIntl } from "@umijs/max";
import { Card, Divider, Flex } from "antd";
import styled from "styled-components";
import MerchantNotes from "./Modal/MerchantNotes";
import order from "@/store/order/order";
import { observer } from "mobx-react-lite";
import dayjs from 'dayjs';

function OrdersNotesCard() {
  const intl = useIntl();

  return (
      <Scoped>
          <Card className="card">
            <Flex justify="space-between" style={{ marginBottom: '20px' }}>
                <div className="font-16 color-242833 font-w-600">{intl.formatMessage({ id:'order.orderDetail.notes'})}</div>
                <MerchantNotes />
            </Flex>
            {order.orderInfo.orderRemarks.length>0 ? <Flex gap={8} vertical>
                {order.orderInfo.orderRemarks.map((item:any)=>{
                    return(
                        <div key={item.id}>
                            <div className="font-14 color-242833 font-w-500">{item.remark}</div>
                            <div className="font-12 color-62708D font-w-500">{dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </div>
                    )
                })}
            </Flex>:<div style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id:'order.orderDetail.empitynotes'})}</div>}
          </Card>
      </Scoped>
  )
}


export default observer(OrdersNotesCard)

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`