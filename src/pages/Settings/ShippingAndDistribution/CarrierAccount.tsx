import DefaultTag from "@/components/Tag/DefaultTag";
import { EnvironmentOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Card, Flex, Tag } from "antd";
import styled from "styled-components";

function CarrierAccount() {

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600">承运商账户</div>
                <div className="color-474F5E font-14" style={{marginTop:"4px",marginBottom:"20px"}}>通过以下承运商应用，在结账时启用第三方计算的运费</div>
                {/*  */}
                <Flex justify="space-between" className="location-box">
                    <Flex>
                        <div className="location" style={{width:"48px",height:"48px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <img style={{width:"100%"}} src="https://img.myshopline.com/image/devcenter/8888/b5219bdc63164b229ede22d9bb3c3ffc.png?w=120&h=120" />
                        </div>
                        <div>
                            <div className="font-w-600" style={{marginRight:"8px"}}>OneShip</div>
                            <div className="color-7A8499">未安装</div>
                        </div>
                    </Flex>
                    <Flex align="center" style={{marginLeft:"12px"}}>
                        <Button>安装</Button>
                    </Flex>
                </Flex>
                <Flex justify="space-between" className="location-box">
                    <Flex>
                        <div className="location" style={{width:"48px",height:"48px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <img style={{width:"100%"}} src="https://img.myshopline.com/image/devcenter/9999/8888/2d01c58287b547bbb3379ee07760e648.png?w=120&h=120" />
                        </div>
                        <div>
                            <div className="font-w-600" style={{marginRight:"8px"}}>PT. Shippindo Teknologi Logistik</div>
                            <div className="color-7A8499">未安装</div>
                        </div>
                    </Flex>
                    <Flex align="center" style={{marginLeft:"12px"}}>
                        <Button>安装</Button>
                    </Flex>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default CarrierAccount

const Scoped = styled.div`

    margin-bottom: 20px;

    .location-box{
        padding:20px 0;
        border-top: 1px solid #eef1f6;
        .location{
            margin-right: 12px;
            img{
                border: 1px solid #eef1f7;
                border-radius: 4px;
            }
        }
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

`
