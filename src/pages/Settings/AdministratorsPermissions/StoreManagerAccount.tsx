import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex } from "antd";
import styled from "styled-components";

export default function StoreManagerAccount() {
  return(
    <Scoped>
        <Card>
            <Flex justify="space-between">
                <div>
                    <div className="color-242833 font-w-600">店长账号</div>
                    <div className="color-474F5E">+8611001234567</div>
                    {/* <Flex align="center" className="font-12 color-474F5E"><span style={{marginRight:"4px"}}>https://yier-260i.myshopline.com</span><SuccessTag text="已连接" /></Flex> */}
                </div>
                <Button>换店长</Button>
            </Flex>
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
   
`