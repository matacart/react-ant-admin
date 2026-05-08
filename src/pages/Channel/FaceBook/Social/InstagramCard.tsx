import PrimaryButton from "@/components/Button/PrimaryButton"
import { UserNoIcon } from "@/components/Icons/Icons"
import { ExportOutlined } from "@ant-design/icons"
import { Card, Flex, Form, Modal, Tooltip } from "antd"
import { useState } from "react"
import styled from "styled-components"

function InstagramCard() {

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const cancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const submit = ()=>{
        form.validateFields().then(res=>{
            console.log(res);
        }).catch(err=>{
            // console.log(err);
        })
    }


    return (
        <MyCard>
            <div>
                <div style={{marginRight:"20px"}}>
                    <div className="font-16 font-w-500 title">
                        Instagram账号
                    </div>
                    <div className="font-14 color-474F5E desc line-h-20">连接后可通过消息中心收发Instagram Direct 消息。</div>
                </div>
                {/*  */}
                <Flex gap={12} justify="space-between" className="userBox">
                    <Flex align="center" gap={12}>
                        <UserNoIcon />
                        <div className="color-474F5E">未连接</div>
                    </Flex>
                    <PrimaryButton text="开始连接" />
                </Flex>
                {/*  */}
                <Flex gap={8} vertical className="content">
                    <div className="color-474F5E">连接您的Instagram专业账户前，请确保您已做好如下准备:</div>
                    <div className="font-w-500">1. 确保您拥有 Instagram 专业账户</div>
                    <div className="color-474F5E">您需要具有 Instagram 专业账户资料才能连接至 MataCart</div>
                    <div className="font-w-500">2. 在Facebook粉丝专页中关联此 Instagram 账号</div>
                    <div className="color-474F5E">如需帮助，请参考: <a target="_blank" href="https://www.facebook.com/help/1148909221857370">连接 Instagram FAQ<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                </Flex>
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
    }
    .userBox{
        margin:20px 0;
    }
`

const MyModal = styled(Modal)`
    .form{
        max-height: calc(100vh - 60px - 60px);
        overflow-y: auto;
        padding-top: 20px;
    }
`


export default InstagramCard
