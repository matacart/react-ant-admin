import { useIntl } from "@umijs/max";
import { Card, Checkbox, Divider, Flex, Switch, Tooltip } from "antd";
import styled from "styled-components";
import order from "@/store/order/order";
import { observer } from "mobx-react-lite";
import DefaultTag from "@/components/Tag/DefaultTag";

function Subscribe() {
  const intl = useIntl();

  return (
      <Scoped>
          <Card className="card">
            <Flex justify="space-between" style={{ marginBottom: '20px' }}>
                <div className="font-16 color-242833 font-w-600">{"订阅"}</div>
                {/* <MerchantNotes /> */}
            </Flex>
            <Flex align="center" gap={16}>
                <div>邮件</div>
                <DefaultTag text="未订阅" />
            </Flex>
            <Flex align="center" gap={16} style={{marginTop: '20px'}}>
                <div>短信</div>
                <DefaultTag text="未订阅" />
            </Flex>
          </Card>
      </Scoped>
  )
}


export default observer(Subscribe)

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
    .item{
        margin-bottom: 20px;
    }
 
`