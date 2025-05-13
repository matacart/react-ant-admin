import { Button, Card, Col, Flex, Form, Input, message, Row, Select } from "antd"
import styled from "styled-components"
import { RightIcon } from "@/components/Icons/Icons";
import { Link } from "react-router-dom";

function AppSettingsCard() {

    return (
        <Scoped>
            {/* <Card title="应用信息" extra={<PrimaryBurron text="保存" />} className="credentials">
                <Form layout="vertical">
                    <Form.Item label="应用名称">
                        <Input defaultValue={customAppConfig.appInfo.app_info.app_name} />
                    </Form.Item>
                    <Form.Item label="语言">
                        <Select />
                    </Form.Item>
                    <Form.Item label="描述">
                        <Input  />
                    </Form.Item>
                    <Form.Item label="应用开发者">
                        <Select />
                    </Form.Item>
                    <Form.Item label="应用联系人邮箱">
                        <Input  />
                    </Form.Item>
                </Form>
            </Card> */}
            {/* 自定义应用 */}
            {/* <Card>
                <div style={{marginBottom:"12px"}} className="font-16 color-242833">自定义应用</div>
                <div style={{marginBottom:"4px"}} className="color-474F5E">为客户定制开发。</div>
                <div className="color-474F5E">自定义应用不能在应用市场、搜索或推荐等场合展示。</div>
            </Card> */}
            {/* 基础设置 */}
            <div style={{margin:"0px 0 12px 0"}} className="font-16">基础设置</div>
            <Row gutter={16}>
                <Col span={8}>
                    <Link to={"/app-store/custom-app-config/setting/32"}>
                        <Card>
                            <Flex align="center" className="font-16 color-242833">
                                <div>应用设置</div>
                                <RightIcon className="font-18" />
                            </Flex>
                            <div className="color-474F5E" style={{marginTop:"12px"}}>包括应用名称、应用地址、回调地址以及联系人信息设置等。</div>
                        </Card>
                    </Link>
                </Col>
                <Col span={8} className="cursor-pointer">
                    <Card style={{height:"100%"}}>
                        <Flex align="center" className="font-16 color-242833">
                            <div>网站导航</div>
                            <RightIcon className="font-18" />
                        </Flex>
                        <div className="color-474F5E" style={{marginTop:"12px"}}>在商家后台支持显示应用的导航项。</div>
                    </Card>
                </Col>
            </Row>
            {/* 高阶设置 */}
            <div style={{margin:"16px 0 12px 0"}} className="font-16">高阶设置</div>
            <Row gutter={16}>
                <Col span={8} className="cursor-pointer">
                    <Card>
                        <Flex align="center" className="font-16 color-242833">
                            <div>商家使用</div>
                            <RightIcon className="font-18" />
                        </Flex>
                        <div className="color-474F5E" style={{marginTop:"12px"}}>设置可使用自定义应用的商家。</div>
                    </Card>
                </Col>
            </Row>
            {/* 洞察 */}
            <div style={{margin:"16px 0 12px 0"}} className="font-16">洞察</div>
            <Row gutter={16}>
                <Col span={8} className="cursor-pointer">
                    <Card>
                        <Flex align="center" className="font-16 color-242833">
                            <div>Webhook 数据看板</div>
                            <RightIcon className="font-18" />
                        </Flex>
                        <div className="color-474F5E" style={{marginTop:"12px"}}>支持浏览应用配置 Webhook 的运行数据。</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Flex align="center" className="font-16 color-242833">
                            <div>扩展异常日志</div>
                            <RightIcon className="font-18" />
                        </Flex>
                        <div className="color-474F5E" style={{marginTop:"12px"}}>在商家后台支持显示应用。</div>
                    </Card>
                </Col>
            </Row>
        </Scoped>
    )
}

export default AppSettingsCard

const Scoped = styled.div`
    
`