import OrderTicketAssistantApp from "@/pages/IFrame/OrderTicketAssistant/OrderTicketAssistantApp"
import { PageContainer, PageHeader, ProCard, ProLayout } from "@ant-design/pro-components"
import { Outlet } from "@umijs/max"
import { Flex, Menu, MenuProps } from "antd"
import styled from "styled-components"

function OrderInvoiceCustomization() {
  
  return (
    <Scoped>
      <Flex className="header" align="center" justify="space-between">
        <Flex align="center">
          <img width={"32px"} src="https://img.myshopline.com/image/devcenter/9999/8888/406ab03a38ad41b0b6bbd4e42734b4ee.png?w=120&h=120" />
          <div style={{marginLeft:"15px"}} className="color-242833 font-16 font-w-600">订单票据定制助手</div>
        </Flex>
        <div>开发人员：MataCart</div>
      </Flex>
      <div className="content">
        <iframe className="iframe" src="https://app1.matacart.com/">
        </iframe>
        {/* <div className="iframe" src="">
          <OrderTicketAssistantApp />
        </div> */}
        {/* <iframe  src="https://weiwu2.myshopline.com/admin/apps/order_invoice_customization"> */}
        {/* </iframe> */}
      </div>
    </Scoped>
  )
}


export default OrderInvoiceCustomization

const Scoped = styled.div`
  /* background: #FF0; */
  /* position: relative; */
  height: 100%;
  .header{
    position: absolute;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background-color: #F7F8FB;
    padding: 0 40px;
    border-bottom: 1px solid #eef1f6;
  }

  .content{
    position: absolute;
    left: 0;
    top: 60px;
    width: 100%;
    height: calc(100vh - 120px);
    /* overflow-y: auto; */
    overflow: hidden;
    .iframe{
      width: 100%;
      height: 100%;
      border:none;
    }
  }
`