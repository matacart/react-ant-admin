import { useIntl } from "@umijs/max";
import { Card, Divider, Flex, Switch, Tooltip } from "antd";
import styled from "styled-components";
import order from "@/store/order/order";
import { observer } from "mobx-react-lite";

function Remarks() {
  const intl = useIntl();

  return (
      <Scoped>
          <Card className="card">
            <Flex justify="space-between" style={{ marginBottom: '20px' }}>
                <div className="font-16 color-242833 font-w-600">{intl.formatMessage({ id:'order.detail.notes'})}</div>
                {/* <MerchantNotes /> */}
            </Flex>
            {order.merchantNotes.length>0 ? <>
                <div className="color-474F5E">{123123}</div>
            </>:<div style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id:'order.detail.empitynotes'})}</div>}
          </Card>
      </Scoped>
  )
}


export default observer(Remarks)

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
    .item{
        margin-bottom: 20px;
    }
 
`