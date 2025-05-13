
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AddSupplier, getCityList, getCountryList, getProvinceList } from '@/services/y2/api';
import { useForm } from 'antd/es/form/Form';

function AddSupplierModal({selectRef,getSupplierList}:{selectRef:any,getSupplierList:any}) {

    const [addSupplierOpen,setAddSupplierOpen] = useState(false);

    const [countryList,setCountryList] = useState([])

    const [provinceList,setProvinceList] = useState([])

    const [cityList,setCityList] = useState([])

    const [countryLaber,setCountryLaber] = useState<string>();
    const [provinceLaber,setProvinceLaber] = useState<string>();
    const [cityLaber,setCityLaber] = useState<string>();

    const [form] = useForm();

    useEffect(()=>{
        getCountryList().then(res=>{
            console.log(res.date)
            setCountryList(res.data)
            let country:any=[];
            res.data.forEach((item:any)=>{
                country.push({
                    label:item.country_name,
                    value:item.country_id
                })
            })
            setCountryList(country)
        })

        // 单号
        form.setFieldsValue({
            supplierName:"",
            nation:"",
            province:"",
            city:"",
            district:"",
            address:"",
            detailedAddress:"",
            postcode:"",
            lastName:"",
            firstName:"",
            email:"",
            phone:""
        })
    },[])

    const clearProvince = ()=>{
        setProvinceLaber("")
        form.setFieldValue("province",'')
    }
    const clearCity = ()=>{
        setCityLaber("")
        form.setFieldValue("city",'')
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

    // 验证成功 -- 创建供应商
    const createSupplier = ()=>{
        // console.log({...form.getFieldsValue(),countryLaber,provinceLaber,cityLaber})
        AddSupplier({...form.getFieldsValue(),countryLaber,provinceLaber,cityLaber}).then(res=>{
            console.log(res.code)
            if(res.code == 0){
                setAddSupplierOpen(false)
                getSupplierList()
                message.success("创建成功")
            }else{
                message.error("创建失败")
            }
        })
    }

    return(
        <Scoped>
            <div onClick={()=>{
                setAddSupplierOpen(true)
                selectRef.current.blur()
            }} className="color-356DFF add_supplier_btn">
                <span style={{fontSize:"12px",marginRight:"8px"}}><PlusOutlined /></span>创建供应商
            </div>
            {/* 供应商 */}
            <Modal
                width={860}
                title="创建供应商"
                destroyOnClose
                centered
                open={addSupplierOpen}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => {
                    form.resetFields()
                    setAddSupplierOpen(false)
                }}>
                    <div style={{height:"600px",overflowY:"scroll",overflowX:"hidden"}}>
                        <Form layout="vertical" form={form} onFinish={createSupplier}>
                            <Form.Item name={"supplierName"} label="供应商" rules={[{required: true, message: '请填写供应商名称'}]}>
                                <Input placeholder='供应商名称' />
                            </Form.Item>
                            <Form.Item name={"supplierCode"} label="供应商编号" tooltip="每个编码对应一个供应商" rules={[{required: true, message: '请填写供应商编号'}]}>
                                <Input placeholder='供应商编号' />
                            </Form.Item>
                            <Form.Item name={"nation"} label="国家/地区" rules={[]}>
                                <Select showSearch onChange={selectedCountry} options={countryList} placeholder="国家/地区">
                                </Select>
                            </Form.Item>
                            {/*  */}
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
                            <Form.Item name={"postcode"} label="邮编" rules={[]}>
                                <Input placeholder='邮编' />
                            </Form.Item>
                            <Form.Item name={"lastName"} label="联系人姓氏" rules={[]}>
                                <Input placeholder='联系人姓氏' />
                            </Form.Item>
                            <Form.Item name={"firstName"} label="联系人名称" rules={[]}>
                                <Input placeholder='联系人名称' />
                            </Form.Item>
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

export default AddSupplierModal;

const Scoped = styled.div`
    
    .add_supplier_btn{
        padding: 6px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    /* .create_supplier_box{
        height: 600px;
        overflow-y: auto;
    } */

`



