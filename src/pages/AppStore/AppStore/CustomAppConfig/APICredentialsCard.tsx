import { Button, Card, Flex, Input, message } from "antd"
import styled from "styled-components"
import { values } from 'lodash';
import copy from "copy-to-clipboard";

function APICredentialsCard() {

    const appKey = "11q11a1s11b23w12tgga345"

    const aPPSecret = "sadfajsdakjdahkj1jwljkqjeq"

    return (
        <Scoped>
            <Card>
                <div style={{flex:"1"}}>
                    <div className="font-16 color-242833">访问令牌</div>
                    <div className="474F5E" style={{marginTop:"8px",marginBottom:"12px"}}>您还没有任何访问令牌。若要获取访问令牌，请选择您的后台 API 或者店面 API 的访问范围。</div>
                </div>
                <Flex gap={12}>
                    <div>
                        <Button>去配置后台API范围</Button>
                    </div>
                    <div>
                        <Button>去配置店面API范围</Button>
                    </div>
                </Flex>
            </Card>
            <Card title="API凭据" extra={<div className="color-474F5E">创建时间：2025-03-04 22:22:22</div>} className="credentials" style={{marginTop:"20px"}}>
                <h3 className="font-16">App Key</h3>
                <Flex align="center">
                    <Input value={appKey} disabled />
                    <div onClick={()=>{
                        copy(appKey)
                        message.success("复制成功")
                    }} className="color-356DFF cursor-pointer" style={{paddingLeft:"24px",whiteSpace:"nowrap"}}>复制</div>
                </Flex>
                <h3 className="font-16">APP Secret</h3>
                <Flex align="center">
                    <Input.Password value={aPPSecret} readOnly className="disable" />
                    <div onClick={()=>{
                        copy(aPPSecret)
                        message.success("复制成功")
                    }} className="color-356DFF cursor-pointer" style={{paddingLeft:"24px",whiteSpace:"nowrap"}}>复制</div>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default APICredentialsCard

const Scoped = styled.div`
    .credentials{
        h3{
            margin: 8px 0 10px 0;
        }
        h3:first-child{
            margin-top: 0;
        }
        .disable{
            color: rgba(0, 0, 0, 0.25);
            background-color: rgba(0, 0, 0, 0.04);
            border-color: #d9d9d9;
            box-shadow: none;
            opacity: 1;
            input{
                cursor: not-allowed !important;
            }
        }
        .disable:hover{
            /* display: none; */
            
        }
    }
`