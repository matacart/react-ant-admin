import { Divider, Form, Cascader, Input, Select, Space,Button } from 'antd'
import './create.scss'
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone } from '@ant-design/icons'
import SelectCountry from '../../components/Stores/SelectCountry'
import SelectCurrency from '../../components/Stores/SelectCurrency'
import SelectContryCode from '../../components/Stores/SelectCountryCode'


export default function Create() {

    return (
        <div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <h3>创建店铺</h3>
                    <></>
                </div>
                <div className='create-content'>
                    <div>完成以下基本店铺设定，轻松运营属于您的店铺</div>
                    <Divider />
                    <Form>
                        <Form.Item
                            required
                        >
                            <div className='create-item-warp' style={{ marginTop: "0px" }}>
                                <div className='icon'>
                                    <ShopTwoTone style={{
                                        fontSize: "24px"
                                    }} />
                                </div>
                                <div className='create-item-text'>
                                    <div className='litle-title' >你的店铺名称是</div>
                                    <div className='desc'>一个响亮的店铺名称是您生意成功的第一步</div>
                                </div>
                                <Input
                                    className="input"
                                    placeholder="请输入店铺名称"
                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                        >
                            <div className='create-item-warp' >
                                <div className='icon'>
                                    <GlobalOutlined style={{
                                        fontSize: "24px",
                                        color: "#1890ff"
                                    }} />
                                </div>
                                <div className='create-item-text'>
                                    <div className='litle-title' >你的网店地址是</div>
                                    <div className='desc'>设定一个店铺URL，开启您的MATACART商店</div>
                                </div>
                                <Space direction="vertical" >
                                    <Input className='input' addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
                                </Space>
                            </div>
                        </Form.Item>
                        <Form.Item
                        >
                            <div className='create-item-warp'>
                                <div className='icon'>
                                    <NodeIndexOutlined style={{
                                        fontSize: "24px",
                                        color: "#1890ff"
                                    }} />
                                </div>
                                <div className='create-item-text'>
                                    <div className='litle-title' >商品销往的国家地区</div>
                                    <div className='desc'>店铺的主要销售地区，能主要优化这部分区域客户的访问加载速度</div>
                                </div>
                                {/* 选择州和国家 */}
                                <SelectCountry className="input" />
                            </div>
                        </Form.Item>
                        <Form.Item
                        >
                            <div className='create-item-warp' >
                                <div className='icon'>
                                    <PayCircleOutlined style={{
                                        fontSize: "24px",
                                        color: "#1890ff"
                                    }} />
                                </div>
                                <div className='create-item-text'>
                                    <div className='litle-title' >您与客户进行结算的货币是</div>
                                    <div className='desc'>客户下单时会使用该货币进行结算</div>
                                </div>
                                {/* 选择币种 */}
                                <SelectCurrency className="input" />
                            </div>
                        </Form.Item>
                        <Form.Item
                        >
                            <div className='create-item-warp' >
                                <div className='icon'>
                                    <MailTwoTone style={{
                                        fontSize: "24px",
                                        color: "#1890ff"
                                    }} />
                                </div>
                                <div className='create-item-text'>
                                    <div className='litle-title' >商店联系邮箱</div>
                                    <div className='desc'>用于收发店铺账单、顾客信息的邮箱，可随时修改</div>
                                </div>
                                <Input  
                                    className='input'
                                    placeholder="请输入邮箱"
                                    required

                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                        >
                            <div className='create-item-warp'>
                                <div className='icon'>
                                    <PhoneTwoTone style={{
                                        fontSize: "24px",
                                    }} />
                                </div>
                                <div className='create-item-text'>
                                    <div className='litle-title' >店铺联系手机号</div>
                                    <div className='desc'>客服团队将为您提供专属服务，可随时修改</div>
                                </div>
                                {/* 输入手机号 */}
                                <div style={{
                                    width: "480px",
                                    marginLeft: "20px"
                                }}>
                                    <SelectContryCode />
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignContent: 'center',
                                            marginTop: "10px",
                                        }}
                                    >
                                        <Input className='input'
                                            style={{
                                                width: '100%',
                                                flex: 2,
                                                marginLeft: '0px',
                                            }}
                                            placeholder="请输入验证码"
                                            type="password"
                                            // placeholder={intl.formatMessage({ id: 'pages.captcha.label', defaultMessage: '验证码' })}
                                        />
                                        <Button  className='input' 
                                        type="primary" ghost style={{
                                            flex: 1,
                                            marginRight: 0
                                        }}
                                        >获取验证码</Button>
                                    </div>
                                </div>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div className='create-footer' style={{ display:"flex",flexDirection:"row-reverse" }}>
                    <Button type="primary" style={{ 
                        marginTop: "10px",
                        width: "88px",height: "36px",fontSize: "16px"}}>
                        创建店铺
                    </Button>
                </div>
            </div>
        </div>
    )
}