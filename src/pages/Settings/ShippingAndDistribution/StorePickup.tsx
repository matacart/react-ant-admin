import DefaultTag from "@/components/Tag/DefaultTag";
import { EnvironmentOutlined, InfoCircleFilled } from "@ant-design/icons";
import { Button, Card, Flex, Tag } from "antd";
import styled from "styled-components";

function StorePickup() {

    return (
        <Scoped>
            <Card>
                <div className="color-242833 font-16 font-w-600">到店取货</div>
                <div className="color-474F5E font-14" style={{marginTop:"4px"}}>允许本地客户自行取货，同样适用于订阅订单。</div>
                {/* 提示标签 */}
                <Tag
                    className='tag'
                    closable
                >
                    <div className="text-box">
                        <InfoCircleFilled className="color-356DFF" />
                        <span style={{marginLeft:"8px"}}>检测到存在默认初始化的地点数据，请先前往地点设置更新</span>
                        <a className="color-356DFF">地点设置</a>
                    </div>
                </Tag>
                {/*  */}
                <Flex className="location-box">
                    <div className="location" style={{width:"48px",height:"48px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <EnvironmentOutlined className="font-24 color-7A8499" />
                    </div>
                    <div>
                        <Flex className="color-242833" align="center">
                            <div style={{marginRight:"8px"}}>默认地点</div><DefaultTag text="不提供配送服务" />
                        </Flex>
                        <div className="color-7A8499">这是SHOPLINE为您自动创建的地点。为了不影响您的业务，请您自由进行调整修改,东城区,北京市 北京市,中国</div>
                    </div>
                    <Flex align="center" style={{marginLeft:"12px"}}>
                        <Button>编辑</Button>
                    </Flex>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default StorePickup

const Scoped = styled.div`

    margin-bottom: 20px;

    .location-box{
        padding:20px 0;
        .location{
            margin-right: 12px;
            background-color: #F7F8Fb;
            border-radius: 4px;
            border: 1px solid #EEF1F7;
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
