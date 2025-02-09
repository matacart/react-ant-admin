import { Card, Checkbox, Divider} from "antd";
import { useState } from "react";
import styled from "styled-components";

function GeneralSetting() {

    const [loading, setLoading] = useState(false);

    return (
        <Scoped>
            <Card className="card">
                <div className="color-242833 font-16 font-w-600">身份验证</div>
                <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>客户注册时系统会发送邮件/短信验证信，客户必须验证才能完成注册</div>
                <Divider className="divider" />
                <Checkbox className="color-474F5E" value={1}>客户需要验证才能完成注册</Checkbox>
            </Card>
        </Scoped>
    )
}

export default GeneralSetting

const Scoped = styled.div`
    margin-bottom: 20px;
    .divider{
        margin:20px 0px;
    }
    
`
