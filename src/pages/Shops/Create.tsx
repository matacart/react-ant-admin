import { Divider, Form, Cascader, Input, Select, Space,Button, message } from 'antd'
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone } from '@ant-design/icons'
import SelectCountry from '../../components/Stores/SelectCountry'
import SelectCurrency from '../../components/Stores/SelectCurrency'
import SelectContryCode from '../../components/Stores/SelectCountryCode'
import { useEffect, useState } from 'react'
import { createStore } from '@/services/y2/api'
import styled from 'styled-components'
import { history } from '@umijs/max'


interface SelectListType {
    label: string;
    value: string;
}

export default function Create() {

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const [countryList,setCountryList] = useState<SelectListType[]>();

    const [currencieList,setCurrencieList] = useState<SelectListType[]>();

    useEffect(()=>{
        // console.log(JSON.parse(sessionStorage["country"]))
        const countrys = JSON.parse(sessionStorage["country"]).map(
            (item:any)=>{
                return {
                    label: item.country_name,
                    value: item.country_id
                }
            }
        )
        setCountryList(countrys)
        
        const currencies = JSON.parse(sessionStorage["currencies"]).map(
            (item:any)=>{
                return {
                    label: item.title,
                    value: item.code
                }
            }
        )
        setCurrencieList(currencies)
    },[])

    const createStoreFinish = ()=>{
        setLoading(true)
        console.log(form.getFieldsValue())
        createStore(form.getFieldsValue()).then(res=>{
            console.log(res)
            if(res.code == 0){
                message.success("创建成功")
                history.push("/stores/list")
            }
            res.code == 201 && message.error(res.msg)
            setLoading(false)
        })
    }
    return (
        <Scoped>
            <div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <h3>创建店铺</h3>
                </div>
                <div className='create-content'>
                    <div>完成以下基本店铺设定，轻松运营属于您的店铺</div>
                    <Divider />
                    <Form form={form} onFinish={createStoreFinish}>
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
                            <div className='form-item-box'>
                                <Form.Item required name="name" rules={[{ required: true, message: '请输入店铺名称' }]}>
                                    <Input
                                        className='input'
                                        placeholder="请输入店铺名称"
                                    />
                                </Form.Item>
                            </div>
                        </div>
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
                            <div className='form-item-box'>
                                <Form.Item name="url" rules={[
                                    { required: true, message: '请输入网址' },
                                    { min: 4, max: 15 ,message:"URL长度需在4-15个字符之间"}
                                ]}>
                                    <Input className='input' placeholder="网址" suffix={<div className='color-7A8499 font-w-400'>.demo.hdyshop.cn</div>} />
                                </Form.Item>
                            </div>
                        </div>
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
                            {/* 选择国家 */}
                            <div className='form-item-box'>
                                <Form.Item name="country" rules={[{ required: true, message: '请选择国家' }]}>
                                    <Select className="input" placeholder={"国家"} options={countryList} onChange={(value)=>{
                                        form.setFieldValue("country",value)
                                    }} />
                                </Form.Item>
                            </div>
                            {/* 选择州和国家 */}
                            {/* <SelectCountry className="input" /> */}
                        </div>
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
                            <div className='form-item-box'>
                                <Form.Item name="currencie" rules={[{ required: true, message: '请选择货币' }]}>
                                {/* 选择币种 */}
                                <Select className="input" placeholder={"结算货币"} options={currencieList} onChange={(value)=>{
                                    form.setFieldValue("currencie",value)
                                }} />
                                </Form.Item>
                            </div>
                            {/* <SelectCurrency className="input" /> */}
                        </div>
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
                            <div className='form-item-box'>
                                <Form.Item name="email" rules={[
                                    { required: true, message: '请输入邮箱' },
                                    { type: 'email',message:"请输入正确的邮箱格式"}
                                ]}>
                                    <Input  
                                        className='input'
                                        placeholder="请输入邮箱"
                                        required
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        {/* <Form.Item name="phone">
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
                        </Form.Item> */}
                    </Form>
                </div>
                <div className='create-footer' style={{ display:"flex",flexDirection:"row-reverse" }}>
                    <Button onClick={()=>form.submit()} loading={loading} type="primary" style={{marginTop: "10px",height: "36px"}}>
                        创建店铺
                    </Button>
                </div>
            </div>
        </div>
        </Scoped>
        
    )
}

const Scoped = styled.div`
    .create-warp-flex{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #474f5e;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        .desc{
            margin-top: 8px;
            color: #7a8499;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
        .litle-title{
            font-size: 16px;
            line-height: 22px;
            font-weight: 600;
        }
        .create-warp{
            max-width: 967px;
            min-width: 700px;
            width: 100%;
            .create-title{
                padding-bottom: 0px;
                color: #474f5e;
                font-size: 14px;
                font-weight: 500;
                line-height: 20px;
                h3 {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin: 0 24px 24px 0;
                    overflow: hidden;
                    color: #242833;
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }
            }
            .create-content{
                padding: 20px 24px 30px 24px;
                border-radius: 6px;
                width: 100%;
                background-color: white;
                .create-item-warp{
                    margin-top: 40px;
                    .form-item-box{
                        margin-left: 20px;
                    }
                    .input{
                        width: 480px;
                        height: 36px;
                    }
                    display: flex;
                    .icon{
                        width: 40px;
                        height: 40px;
                    }
                    .create-item-text{
                        flex:1;
                        .litle-title{
                            color: black;
                        }
                    }

                }
            }
        }
    }
`