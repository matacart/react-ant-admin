import { Card, Radio } from "antd";
import styled from "styled-components";
import settingsInfo from "@/store/settings/settle/settingsInfo";
import { observer } from "mobx-react-lite";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
};

const CustomerAccountInformation = () => {
    return(
        <Scoped>
            <Card>
                <Radio.Group
                    style={style}
                    onChange={(e)=>settingsInfo.setConfig({...settingsInfo.config,loginType:e.target.value})}
                    value={settingsInfo?.config?.loginType}
                    options={[
                        {
                            value: "LOGIN_OR_GUEST",
                            label: (
                                <div className="color-474F5E">游客或登录客户均可结账</div>
                            ),
                        },
                        {
                            value: "ONLY_LOGIN",
                            label: (
                                <div className="color-474F5E">仅限登录客户结账</div>
                            ),
                        }
                    ]}
                />
            </Card>
        </Scoped>
    );
}

export default observer(CustomerAccountInformation)

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
    .tag{
        width: 100%;
        font-size: 14px;
        margin-top:12px;
        padding: 8px 16px;
        background-color: #E2F0FF;
        .text-box{
            display: inline-block;
            width: 99%;
        }
    }
    .custom-btn{
        margin-top: 20px;
    }
`