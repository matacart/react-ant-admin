import { Button, Card, Divider, Flex, Form, GetProp, Input, message, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

function PlatformPopularChannels() {

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600">平台热门渠道推荐</div>
                <div className="color-474F5E font-14" style={{marginTop:"4px"}}>如需获取报价请扫描下方二维码或发送邮件到Logistics.cn@matacart.com</div>
                {/* 无运费 */}
                <Flex className="no-box" justify="space-between">
                    <div className="no-box-left">
                        <div className="font-w-600 font-16" style={{marginBottom:"12px"}}>OnePost 欧无忧</div>
                        <p className="color-474F5E font-14">欧盟多国覆盖，支持代征代缴</p>
                        <p className="color-474F5E font-14">参考时效(8-10个工作日)</p>
                        <p className="color-474F5E font-14">支持普货、带电、特货等多种产品</p>
                    </div>
                    <div className="no-box-right">
                        <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-logistics/20250123175658261/imgs/QRcodeFrame.3694a.svg" />
                        <img className="qrcode" src="/img/qrcode.jpg"></img>
                    </div>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default PlatformPopularChannels

const Scoped = styled.div`
    margin-bottom: 20px;
    .divider{
        margin:20px 0px;
    }
    .no-box{
        margin-top: 20px;
        padding:20px;
        background-color: #f0f3f9;
        border-radius: 6px;
        .no-box-left{
            div{
                margin-bottom: 16px;
            }
            p{
                margin-bottom: 4px;
                line-height: 20px;
            }
        }
        .no-box-right{
            position: relative;
            .qrcode{
                width: 113px;
                height: 113px;
                position: absolute;
                top:3.5px;
                left: 59px;
            }
        }
    }
`
