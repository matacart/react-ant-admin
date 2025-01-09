
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import './BlankPage.scss';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { editSupplier, getCityList, getCountryList, getProvinceList, getSupplier } from '@/services/y2/api';
import { useForm } from 'antd/es/form/Form';

function EditSupplierModal({supplier,getSupplierList,editSupplierRef}:{supplier:any,getSupplierList:any,editSupplierRef:any}) {

    const [supplierOpen,setSupplierOpen] = useState(false);

    const [countryList,setCountryList] = useState();

    // 供应商信息
    const [supplierInfo,setSupplierInfo] = useState();

    // 中国地区
    const [isChina,setIsChina] = useState(false);
    // 省份
    const [provinceList,setProvinceList] = useState();
    // 城市
    const [cityList,setCityList] = useState();


    const [form] = useForm();

    useEffect(()=>{
        // 国家
        getCountryList().then(res=>{
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
        // 供应商信息
        upplierInfoFun()
    },[supplier])

    // 
    const upplierInfoFun = async ()=>{
        console.log(supplier)
        const data = await getSupplier(supplier.id).then(async res=>{
            if(res.code == 0){
                setSupplierInfo(res.data)
                if(res.data.country_id == "44"){
                    getProvinceLists(res.data.country_id)
                    selectProvince(res.data.state)
                    setIsChina(true)
                }
                return res.data
            }
        })
        console.log(provinceList)
        formInit(data)
    }

    // 表单初始化
    const formInit = (res:any)=>{
        form.setFieldsValue({
            // id:res.id,
            // code:res.code,
            supplierName:res.name,
            nation:res.country_id,
            province:res.state,
            city:res.city,
            district:res.district,
            address:res.address,
            detailedAddress:res.detailed_address,
            postcode:res.postcode,
            // name:res.linkman,
            email:res.email_address,
            phone:res.telephone,
        })
    }

    // 选择国家
    const selectedCountry = (value:any)=>{
        if(value == "44"){
            getProvinceLists(value)
            form.setFieldValue("city",'')
            setIsChina(true)
        }else{
            setIsChina(false)
        }
    }

    // 获取省份
    const getProvinceLists = (countryId:string)=>{
        getProvinceList(countryId).then(res=>{
            if(res.code == 0){
                let newProvinceList:any = [];
                res.data.forEach((item:any)=>{
                    newProvinceList.push({
                        label:item.name,
                        value:item.id
                    })
                })
                form.setFieldValue("province",'')
                setProvinceList(newProvinceList)
            }
        })
    }
    // 选择省份
    const selectProvince = (value:string)=>{
        getCityList(value).then(res=>{
            if(res.code == 0){
                let newCityList:any = [];
                res.data.forEach((item:any)=>{
                    newCityList.push({
                        label:item.name,
                        value:item.id
                    })
                })
                form.setFieldValue("city",'')
                setCityList(newCityList)
            }
        })
    }

    // 选择城市
    const selectedCity = (provinceId:any)=>{

    }

    // 验证成功
    const createSupplier = ()=>{
        console.log(form.getFieldsValue())
        editSupplier({...form.getFieldsValue(),id:supplierInfo.id,code:supplierInfo.code}).then(res=>{
            console.log(res.code)
            if(res.code == 0){
                setSupplierOpen(false)
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
                setSupplierOpen(true)
                editSupplierRef.current.blur()
            }} className="color-356DFF add_supplier_btn">
                编辑供应商
            </div>
            {/* 供应商 */}
            <Modal
                width={860}
                title="编辑供应商"
                centered
                open={supplierOpen}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => {
                    formInit(supplierInfo)
                    setSupplierOpen(false)
                }}>
                    <div style={{height:"600px",overflowY:"scroll",overflowX:"hidden"}}>
                        <Form layout="vertical" form={form} onFinish={createSupplier}>
                            <Form.Item name={"supplierName"} label="供应商" rules={[{required: true, message: '请填写供应商名称'}]}>
                                <Input placeholder='供应商名称' />
                            </Form.Item>
                            <Form.Item name={"nation"} label="国家/地区" rules={[]}>
                                <Select showSearch onChange={selectedCountry} options={countryList} placeholder="国家/地区">
                                </Select>
                            </Form.Item>
                            {isChina && <div>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={"province"} label="省份" rules={[]}>
                                            <Select showSearch onChange={selectProvince} options={provinceList} placeholder="省份">
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={"city"} label="城市" rules={[]}>
                                            <Select showSearch onChange={()=>{}} options={cityList} placeholder="城市">
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* <Form.Item name={"district"} label="区" rules={[]}>
                                    <Select showSearch onChange={selectedCountry} options={countryList} placeholder="区">
                                    </Select>
                                </Form.Item> */}
                                <Form.Item name={"district"} label="区" rules={[]}>
                                    <Input placeholder="区">
                                    </Input>
                                </Form.Item>
                            </div>}
                            <Form.Item name={"address"} label="地址" rules={[]}>
                                <Input placeholder='地址' />
                            </Form.Item>
                            <Form.Item name={"detailedAddress"} label="详细地址（公寓、门牌号等）" rules={[]}>
                                <Input placeholder='详细地址' />
                            </Form.Item>
                            {!isChina && <Form.Item name={"city"} label="城市" rules={[]}>
                                <Input placeholder='城市' />
                            </Form.Item>}
                            <Form.Item name={"postcode"} label="邮编" rules={[]}>
                                <Input placeholder='邮编' />
                            </Form.Item>
                            <Form.Item name={"name"} label="联系人姓名" rules={[]}>
                                <Input placeholder='联系人姓名' />
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

export default EditSupplierModal;

const Scoped = styled.div`
    
    .add_supplier_btn{
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    /* .create_supplier_box{
        height: 600px;
        overflow-y: auto;
    } */

`



