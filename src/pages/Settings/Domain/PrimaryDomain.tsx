import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex } from "antd";
import styled from "styled-components";
import cookie from 'react-cookies';
import { history } from 'umi';
import domain from "@/store/settings/domain"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function PrimaryDomain() {

    useEffect(()=>{
    },[])
    
  return(
    <Scoped>
        <Card>
            <Flex justify="space-between">
                <div>
                    <div className="color-242833">主域名</div>
                    <Flex align="center" className="font-12 color-474F5E"><span style={{marginRight:"4px"}}>{"https://"+domain.domain?.domain_name}</span><SuccessTag text="已连接" /></Flex>
                </div>
                <Button type="primary" onClick={()=>history.push("/settings/manage")}>管理域名</Button>
            </Flex>
            <Divider className="divider" />
            <div>多域名管理  (0/20)</div>
        </Card>
    </Scoped>
    
  );
}

export default observer(PrimaryDomain);

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
`