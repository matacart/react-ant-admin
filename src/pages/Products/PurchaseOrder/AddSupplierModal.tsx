
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import './BlankPage.scss';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { getCountryList } from '@/services/y2/api';
import { select } from 'react-cookies';

function AddSupplierModal({selectRef}:{selectRef:any}) {

    const [addSupplierOpen,setAddSupplierOpen] = useState(false);

    const [countryList,setCountryList] = useState();

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
    },[])


    // 国家
    const selectedCountry = (value:any)=>{
        console.log(value)
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
                centered
                open={addSupplierOpen}
                onOk={() => {
                }}
                onCancel={() => {
                    setAddSupplierOpen(false)
                }}>
                    <div style={{height:"600px",overflowY:"scroll",overflowX:"hidden"}}>
                        <Form layout="vertical">
                            <Form.Item name={['user', 'name']} label="供应商" rules={[]}>
                                <Input placeholder='供应商名称' />
                            </Form.Item>
                            <Form.Item name={['user', 'name']} label="国家/地区" rules={[]}>
                                <Select showSearch onChange={selectedCountry} options={countryList} placeholder="国家/地区">
                                </Select>
                            </Form.Item>

                            <div>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={['user', 'name']} label="省份" rules={[]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={['user', 'name']} label="城市" rules={[]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item name={['user', 'name']} label="区" rules={[]}>
                                    <Input placeholder='地址' />
                                </Form.Item>
                            </div>
                            
                            {/* <Form.Item name={['user', 'name']} label="地址" rules={[]}>
                                <Input placeholder='地址' />
                            </Form.Item> */}
                            <Form.Item name={['user', 'name']} label="详细地址（公寓、门牌号等）" rules={[]}>
                                <Input placeholder='地址' />
                            </Form.Item>
                            {/* <Form.Item name={['user', 'name']} label="城市" rules={[]}>
                                <Input />
                            </Form.Item> */}
                            <Form.Item name={['user', 'name']} label="邮编" rules={[]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'name']} label="联系人姓名" rules={[]}>
                                <Input />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name={['user', 'name']} label="邮箱" rules={[]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={['user', 'name']} label="电话" rules={[]}>
                                        <Input />
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



