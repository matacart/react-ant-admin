import { addWarehouse, getCityList, getCountryList, getProvinceList } from "@/services/y2/api";
import { Button, Card, Col, Flex, Form, Input, Modal, Row, Select } from "antd"
import { set } from "lodash";
import { useEffect, useState } from "react"
import styled from "styled-components"


function AddWarehouseAddressModal() {

    const [form] = Form.useForm();

    const [isOpen, setIsOpen] = useState(false);

    const [countryList,setCountryList] = useState([])

    const [provinceList,setProvinceList] = useState([])

    const [cityList,setCityList] = useState([])

    const [countryLaber,setCountryLaber] = useState<string>();
    const [provinceLaber,setProvinceLaber] = useState<string>();
    const [cityLaber,setCityLaber] = useState<string>();



    const clearProvince = ()=>{
        setProvinceLaber("")
        form.setFieldValue("province",'')
    }
    const clearCity = ()=>{
        setCityLaber("")
        form.setFieldValue("city",'')
    }


    // 创建仓库地址
    const createWarehouseLocation = ()=>{
        console.log({...form.getFieldsValue(),countryLaber,provinceLaber,cityLaber})
        addWarehouse({...form.getFieldsValue(),countryLaber,provinceLaber,cityLaber})
    }

    // 国家
    const selectedCountry = (value:any,option:any)=>{
        getProvinceList(value).then(res=>{
            let province:any=[];
            res.data.forEach((item:any)=>{
                province.push({
                    label:item.name,
                    value:item.id
                })
            })
            setProvinceList(province)
            setCountryLaber(option.label)
            // 清空地址
            clearProvince()
            clearCity()

            setCityList([])
        })
    }

    const selectedProvince = (value:any,option:any)=>{
        getCityList(value).then(res=>{
            let city:any=[];
            res.data.forEach((item:any)=>{
                city.push({
                    label:item.name,
                    value:item.id
                })
            })
            setProvinceLaber(option.label)
            setCityList(city)

            // 清空地址
            clearCity()
        })
    }

    const selectedCity = (value:any,option:any)=>{
        setCityLaber(option.label)
    }



    useEffect(()=>{
        // 国家
        const country = JSON.parse(sessionStorage.getItem("country") || "[]").map(item=>{
            return {
                label: item.country_name,
                value: item.country_id
            }
        })
        setCountryList(country)
    },[])
 
    return (
        <Scoped>
            <div><Button type="primary" onClick={()=>{setIsOpen(true)}}>添加库存地址</Button></div>
            <Modal open={isOpen} width={620} title="添加库存地址" centered onOk={()=>form.submit()} onCancel={()=>{
                setIsOpen(false)
                form.resetFields()
            }}>
                <div style={{height:"580px",overflowY:"scroll",overflowX:"hidden"}}>
                    <Form layout="vertical" form={form} onFinish={createWarehouseLocation}>
                        <Form.Item name={"warehouseLocationName"} label="仓库名称" rules={[{required: true, message: '仓库名称'}]}>
                            <Input placeholder='供应商名称' />
                        </Form.Item>
                        <Form.Item name={"warehouseLocationCode"} label="仓库编号" tooltip="每个编码对应一个仓库" rules={[{required: true, message: '仓库编号'}]}>
                            <Input placeholder='供应商编号' />
                        </Form.Item>
                        <Row gutter={0}>
                            <Col span={24}>
                                <Form.Item name={"capacity"} label="仓库容量" rules={[]}>
                                    <Input placeholder='仓库容量' />
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item name={"nation"} label="" rules={[]}>
                                    <Select showSearch options={countryList} onChange={selectedCountry} placeholder="国家/地区">
                                    </Select>
                                </Form.Item>
                            </Col> */}
                        </Row>
                        <Form.Item name={"nation"} label="国家/地区" rules={[]}>
                            <Select showSearch options={countryList} onChange={selectedCountry} placeholder="国家/地区">
                            </Select>
                        </Form.Item>
                        {/* 中国 */}
                        <>
                        <Row gutter={16}>
                            <Col span={12}>
                                {provinceList.length>0?<Form.Item name={"province"} label="省份" rules={[]}>
                                    <Select showSearch onChange={selectedProvince} options={provinceList} placeholder="省份">
                                    </Select>
                                </Form.Item>:<Form.Item name={"province"} label="省份" rules={[]}>
                                    <Input placeholder='省份' />
                                </Form.Item>}
                            </Col>
                            <Col span={12}>
                                {cityList.length>0?<Form.Item name={"city"} label="城市" rules={[]}>
                                    <Select showSearch onChange={selectedCity} options={cityList} placeholder="城市">
                                    </Select>
                                </Form.Item>:<Form.Item name={"city"} label="城市" rules={[]}>
                                    <Input placeholder='城市' />
                                </Form.Item>}
                            </Col>
                        </Row>
                        <Form.Item name={"district"} label="区" rules={[]}>
                            <Input placeholder='区' />
                        </Form.Item>
                        </>
                        <Form.Item name={"address"} label="地址" rules={[]}>
                            <Input placeholder='地址' />
                        </Form.Item>
                        <Form.Item name={"detailedAddress"} label="详细地址（公寓、门牌号等）" rules={[]}>
                            <Input placeholder='详细地址' />
                        </Form.Item>
                        {/* 其它 */}
                        <Form.Item name={"postcode"} label="邮编" rules={[]}>
                            <Input placeholder='邮编' />
                        </Form.Item>
                        <Form.Item name={"lastName"} label="联系人姓氏" rules={[]}>
                            <Input placeholder='联系人姓氏' />
                        </Form.Item>
                        <Form.Item name={"name"} label="联系人名称" rules={[]}>
                            <Input placeholder='联系人名称' />
                        </Form.Item>
                        {/*  */}
                        {/* <Form.Item name={"name"} label="联系人姓名" rules={[]}>
                            <Input placeholder='联系人姓名' />
                        </Form.Item> */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name={"email"} label="邮箱" rules={[]}>
                                    <Input placeholder='邮箱地址' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={"phone"} label="电话" rules={[]}>
                                    <Input placeholder='联系人电话' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </Scoped>
    )
}
export default AddWarehouseAddressModal

const Scoped = styled.div`

`