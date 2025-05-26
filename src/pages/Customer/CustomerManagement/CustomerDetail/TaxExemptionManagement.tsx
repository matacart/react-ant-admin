import { useIntl } from "@umijs/max";
import { Card, Divider, Flex, Switch, Tooltip } from "antd";
import styled from "styled-components";
import order from "@/store/order/order";
import { observer } from "mobx-react-lite";

function TaxExemptionManagement() {
  const intl = useIntl();

  return (
      <Scoped>
          <Card className="card">
            <Flex justify="space-between" style={{ marginBottom: '20px' }}>
                <div className="font-16 color-242833 font-w-600">{"免税管理"}</div>
                {/* <MerchantNotes /> */}
            </Flex>
            {order.merchantNotes.length>0 ? <>
                <div className="color-474F5E">{123123}</div>
            </>:<div style={{ fontSize: '14px', color: '#7A8499' }}>{"对所有地区收税"}</div>}
          </Card>
      </Scoped>
  )
}


export default observer(TaxExemptionManagement)

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
    .item{
        margin-bottom: 20px;
    }
 
`