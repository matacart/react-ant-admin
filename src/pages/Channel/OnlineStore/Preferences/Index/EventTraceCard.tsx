import DefaultButton from "@/components/Button/DefaultButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Checkbox, Divider, Flex, Radio, Tooltip} from "antd";
import styled from "styled-components";

function EventTraceCard() {


    const IconBox = (
        <div className="iconBox">
            <div className="icon"></div>
        </div>
    )

    return (
        <Scoped>
            <Card className="card1">
                <Flex justify="space-between">
                    <Flex>
                        <div>{IconBox}</div>
                        <Flex align="center">
                            <div>Facebook Pixel 和 Conversion API</div>
                            <Tooltip title="Conversions API 允许广告商将网络事件从他们的服务器直接发送到 Facebook。服务器事件链接到像素并像浏览器像素事件一样进行处理。">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </Flex>
                    </Flex>
                    <DefaultButton text="前往设置" />
                </Flex>
            </Card>
            <Card className="card2">
                <Flex justify="space-between">
                    <Flex>
                        <div>{IconBox}</div>
                        <Flex align="center">
                            <div>Google Ads、Google Analytics、Google 代码管理工具、Google 再营销工具</div>
                            {/* <Tooltip title="Conversions API 允许广告商将网络事件从他们的服务器直接发送到 Facebook。服务器事件链接到像素并像浏览器像素事件一样进行处理。">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip> */}
                        </Flex>
                    </Flex>
                    <DefaultButton text="前往设置" />
                </Flex>
            </Card>
        </Scoped>
    )
}

export default EventTraceCard

const Scoped = styled.div`
    margin-bottom: 20px;
    .card1{
        .iconBox{
            width: 40px;
            height: 40px;
            margin-right: 14px;
            padding: 4px;
            border: 1px solid #dbdbdb;
            border-radius: 4px;
            .icon{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                background-image:url("https://cdn.myshopline.cn/sl/admin/ec2-admin-onlineshop/20250311110516973/imgs/facebook-pixel.53315.svg")
            }
        }
    }
    .card2{
        margin-top: 20px;
        .iconBox{
            width: 40px;
            height: 40px;
            margin-right: 14px;
            padding: 4px;
            border: 1px solid #dbdbdb;
            border-radius: 4px;
            .icon{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                background-image:url("https://cdn.myshopline.cn/sl/admin/ec2-admin-onlineshop/20250311110516973/imgs/google-pst.e20c2.svg")
            }
        }
    }
    
`
