import MyCard from "@/components/Card/MyCard";
import { RightIcon } from "@/components/Icons/Icons";
import { Flex } from "antd";
import styled from "styled-components";

function CheckoutLayoutCard() {
    return (
        <Scoped styles={{
            body: {
                padding: '16px',
            }
        }}>
            <div>结账布局</div>
            <div className="font-12 color-7A8499 desc">设置您的客户在结账时看到的页面数</div>
            <Flex className="checkout-layout" justify="space-between">
                <Flex gap={12} flex="1">
                    <img src={"/images/settings/empty_layout_page.jpg"} alt="" />
                    <div>
                        <div>单页结账</div>
                        <div className="font-12 color-7A8499">更简化更快捷</div>
                    </div>
                </Flex>
                <Flex>
                    <RightIcon />
                </Flex>
            </Flex>
        </Scoped>
    )
}


const Scoped = styled(MyCard)`
    .desc{
        margin: 8px 0px;
    }
    .checkout-layout{
        cursor: pointer;
        padding: 12px;
        background: #f7f8fb;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
    }
`

export default CheckoutLayoutCard;