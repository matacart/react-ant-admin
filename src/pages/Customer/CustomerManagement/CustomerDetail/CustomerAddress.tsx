import { Badge, Button, Card, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect } from "react";
import orderDelivery from "@/store/order/orderDelivery";
import AddressModal from "./Modal/AddressModal";

function CustomerAddress() {

    useEffect(()=>{
        console.log(orderDelivery.deliveryAddress)
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">收货地址</div>
                </Flex>
                <Form>
                    <>
                        <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                            <AddressModal />
                            {/* <Flex gap={4} className="cursor-pointer" style={{border:"1px dashed #d7dbe7",padding:"4px 8px",borderRadius:"4px",backgroundColor:"#FFF",width:"100%"}}>
                                <AddIcon className="font-16" />
                                <div>添加收货地址</div>
                            </Flex> */}
                            {/* <CreateAddressModal /> */}
                        </Flex>
                    </>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(CustomerAddress);