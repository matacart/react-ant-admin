import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, Switch } from "antd";
import styled from "styled-components";

export default function DualVerification() {
  return(
    <Scoped>
        <Card>
            <div>
                <Flex className="title color-242833 font-w-600"><span>强制开启双重验证</span><Switch /></Flex>
                <div className="color-474F5E">开启此功能后，所有用户（包括店长）必须通过密码+邮箱验证码登录管理后台。</div>
            </div>
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
   .title{
        margin-bottom: 14px;
        span{
            margin-right: 8px;
        }
   }
`