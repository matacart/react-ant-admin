import PrimaryButton from "@/components/Button/PrimaryButton";
import { Card, Flex } from "antd";
import styled from "styled-components";
import { history } from 'umi';

export default function RedirectPage() {
  return(
    <Scoped>
        <Card>
            <Flex justify="space-between">
                <div>
                    <div className="title color-242833"><span className="font-w-600">301</span>重定向</div>
                    <div className="font-12 color-474F5E">已有0条重定向记录</div>
                    {/* <Flex align="center" className="font-12 color-474F5E"><span style={{marginRight:"4px"}}>https://yier-260i.myshopline.com</span><SuccessTag text="已连接" /></Flex> */}
                </div>
                <PrimaryButton type="primary" text="管理重定向" onClick={()=>history.push("/settings/redirection")} />
            </Flex>
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
    .title{
        margin-bottom: 8px;
    }
`