import { AppleIcon, FaceBookIcon } from "@/components/Icons/Icons";
import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, List } from "antd";
import styled from "styled-components";


function QuickLoginCard() {


    return (
        <Scoped>
            <Card>
                <div className="color-242833">已连接的登录服务</div>
                <div className="color-7A8499">您还没有连接使用外部登录服务。</div>
                <div>
                    <Flex className="content-item" onClick={()=>window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&redirect_uri=https://www.google.com/&response_type=code&client_id=1078619649323-02qhqfq9vq0vqhqhq")}>
                        <img style={{width:"20px"}} src="/icons/logos/google.svg" />
                        <div className="color-356DFF" style={{marginLeft:"8px"}}>连接到Google</div>
                    </Flex>
                    <Flex className="content-item" onClick={()=>window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&redirect_uri=https://www.google.com/&response_type=code&client_id=1078619649323-02qhqfq9vq0vqhqhq")}>
                        <FaceBookIcon className="font-20" />
                        <div className="color-356DFF" style={{marginLeft:"8px"}}>连接到FaceBook</div>
                    </Flex>
                    <Flex className="content-item" onClick={()=>window.open("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&redirect_uri=https://www.google.com/&response_type=code&client_id=1078619649323-02qhqfq9vq0vqhqhq")}>
                        <AppleIcon className="font-20" />
                        <div className="color-356DFF" style={{marginLeft:"8px"}}>连接到Apple</div>
                    </Flex>
                </div>
                
            </Card>
        </Scoped>
    )

}

export default QuickLoginCard;

const Scoped = styled.div`
    margin-bottom: 20px;
    .content-item{
        margin-top: 20px;
        width: fit-content;
        cursor: pointer;
    }
`
