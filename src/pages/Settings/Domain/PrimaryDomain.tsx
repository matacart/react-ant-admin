import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex } from "antd";
import styled from "styled-components";
import cookie from 'react-cookies';

export default function PrimaryDomain() {
  return(
    <Scoped>
        <Card>
            <Flex justify="space-between">
                <div>
                    <div className="color-242833">主域名</div>
                    <Flex align="center" className="font-12 color-474F5E"><span style={{marginRight:"4px"}}>{"https://"+cookie.load("domain")?.domainName}</span><SuccessTag text="已连接" /></Flex>
                </div>
                <Button type="primary">管理域名</Button>
            </Flex>
            <Divider className="divider" />
            <div>多域名管理  (0/20)</div>
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
`