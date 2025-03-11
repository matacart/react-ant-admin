import { ExportIcon, PrintIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import styled from "styled-components";
import SwitchingTemplateCard from "./SwitchingTemplateCard";
import MyTemplateCard from "./MyTemplateCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";

const aItems: MenuProps['items'] = [
    {
        key: '1',
        label:<div onClick={()=>history.push("/order_invoice_customization/orderPdfPreview/1001")}>发票</div>,
  
    },
    {
        key: '2',
        label: <div onClick={()=>history.push("/order_invoice_customization/orderPdfPreview/picking/1001")}>拣货单</div>,
    }
];

function PrintOrderInvoice(){

    return (
        <Scoped>
            {/* content */}
            <div className='order-list-content'>
                <Flex style={{height:"64px"}} align='center' justify="space-between">
                    <Flex align='center'>
                        <div className="mc-header-left-secondary" onClick={()=>{
                            history.push('/order_invoice_customization/orderList')
                        }}>
                            <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                        </div>
                        <div style={{marginRight:"16px"}} className='ota-font-20 ota-font-w-600 ota-color-242833'>打印订单</div>
                        <Dropdown menu={{ items: aItems }} trigger={['click']}>
                            <Flex className='cursor-pointer' align='center' style={{position:"relative",top:"2px"}}>
                                <div style={{marginRight:"4px"}}><PrintIcon className="ota-font-20 ota-color-356DFF" /></div>
                                <div style={{marginRight:"4px"}}>发票</div>
                                <UnfoldIcon />
                            </Flex>
                        </Dropdown>
                    </Flex>
                    <Flex gap={10}>
                        <Button style={{height:"36px"}}>导出票据</Button>
                        <Button type="primary" style={{height:"36px"}}>打印</Button>
                    </Flex>
                </Flex>
                
                {/*  */}
                {/* <OrderListCard /> */}
                <Flex gap={20}>
                    <SwitchingTemplateCard />
                    <MyTemplateCard />
                </Flex>
            </div>
        </Scoped>
    )

}


export default PrintOrderInvoice

const Scoped = styled.div`
    display: flex;
    justify-content: center;
    .order-list-content{
        max-width: 1200px;
        flex-grow: 1;
        margin: 0 40px 40px 40px;

        .mc-header-left-secondary{
            margin-right: 12px;
            height: 32px;
            width: 32px;
            border: #d7dbe7 1px solid;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-content: center;
            &:hover{
                background-color:  #eaf0ff;
                cursor: pointer;
            }
            &-icon {
                font-size: 18px;
            }
        }
                    
    }
`