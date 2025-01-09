import { PlusOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Form, Modal, Popover, Row, Select } from "antd";
import styled from "styled-components";
import AddSupplierModal from "./AddSupplierModal";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { getAddWarehouseList, getPurchaseCurrencyList, getSupplier, selectSupplier } from "@/services/y2/api";
import { set } from 'lodash';
import EditSupplierModal from "./EditSupplierModal";
import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";


interface supplierOptions{
    label:string,
    value:string
}

function LocationsCard() {

    const selectRef = useRef(null);

    const editSupplierRef = useRef(null);
    // 
    const [supplierOptions,setSupplierOptions] = useState<supplierOptions[]>();

    const [supplierList,setSupplierList] = useState([]);

    const [warehouseAddressList,setWarehouseAddressList] = useState([]);
    const [warehouseAddressListCopy,setWarehouseAddressListCopy] = useState([]);

    const [supplier,setSupplier] = useState({});

    const [purchaseCurrencyList,setPurchaseCurrencyList] = useState([]);



    // 供应商--列表
    function getSupplierList(){
        selectSupplier().then(res=>{
            let options:supplierOptions[] = []
            if(res.code == 0){
                setSupplierList(res.data);
                res.data.forEach((e:any) => {
                    options.push({
                        label:e.name,
                        value:e.id
                    })
                });
            }
            setSupplierOptions(options)
        })
    }
    // 目的地
    function getWarehouseAddressList(){
        getAddWarehouseList().then(res=>{
            if(res.code == 0){
                setWarehouseAddressListCopy(res.data)
                let newList:any = []
                res.data.forEach((e:any) => {
                    newList.push({
                        label:e.name,
                        value:e.id
                    })
                });
                setWarehouseAddressList(newList);
            }
        })
    }

    


    // 供应商
    const handleSupplierChange = (value:string)=>{
        let supplier = supplierList.filter(item=>value == item.id)[0]
        setSupplier(supplier)
        purchaseOrderStore.purchaseOrder.supplierId = supplier.id
        purchaseOrderStore.purchaseOrder.supplierName = supplier.name
    }

    // 
    const handleWarehouseAddressChange = (value:string,option:any)=>{

        purchaseOrderStore.purchaseOrder.warehouseId = option.value
        purchaseOrderStore.purchaseOrder.warehouseName = option.label
        
        let warehouseAddress = warehouseAddressListCopy.filter(item=>value == item.id)[0]
        console.log(warehouseAddress)

        purchaseOrderStore.purchaseOrder.lastName = warehouseAddress.lastname
        purchaseOrderStore.purchaseOrder.firstName = warehouseAddress.firstname

        purchaseOrderStore.purchaseOrder.address = warehouseAddress.address
        purchaseOrderStore.purchaseOrder.detailedAddress = warehouseAddress.detailed_address
        purchaseOrderStore.purchaseOrder.district = warehouseAddress.district
        purchaseOrderStore.purchaseOrder.postcode = warehouseAddress.postcode

        purchaseOrderStore.purchaseOrder.country = warehouseAddress.country
        purchaseOrderStore.purchaseOrder.countryId = warehouseAddress.country_id
        purchaseOrderStore.purchaseOrder.state = warehouseAddress.state
        purchaseOrderStore.purchaseOrder.stateId = warehouseAddress.state_id
        purchaseOrderStore.purchaseOrder.city = warehouseAddress.city
        purchaseOrderStore.purchaseOrder.cityId = warehouseAddress.city_id
    }

    const handlePaymentTermsChange = (value:string,option:any)=>{
        purchaseOrderStore.purchaseOrder.paymentTermsId = option.value
        purchaseOrderStore.purchaseOrder.paymentTerms = option.label
    }

    const handleCurrencyChange = (value:string,option:any)=>{
        purchaseOrderStore.purchaseOrder.currencyId = option.value
        purchaseOrderStore.purchaseOrder.currency = option.label
    }


    
    // 供应商内容
    const supplierContent = (
        <div>
            <div className="color-474F5E">地址</div>
            <div className="color-7A8499">荔城区后廖 贵阳市 贵州省</div>
            {/* <div className="color-356DFF" style={{marginTop:"20px",cursor:"pointer"}}> */}
            <EditSupplierModal supplier={supplier} getSupplierList={getSupplierList} editSupplierRef={editSupplierRef}/>
            {/* </div> */}
        </div>
    );
    useEffect(()=>{
        getSupplierList()
        getWarehouseAddressList()


        // 供应商货币
    getPurchaseCurrencyList().then(res=>{
        if(res.code == 0){
            let newList:any = []
            res.data.forEach((e:any) => {
                newList.push({
                    label:e.title,
                    value:e.id
                })
            });
            setPurchaseCurrencyList(newList)
        }
    })
    },[])

    return(
        <Scoped>
            <Card bordered={false} title="添加地点">
                <Form layout={"vertical"}>
                    <div className="firstItem">
                    <Row gutter={[24,0]}>
                        <Col span={12}>
                            <Form.Item
                                // name="username"
                                help={JSON.stringify(supplier)!=="{}" && <div style={{marginTop:"4px"}}>
                                    <Flex justify="space-between">
                                        <div>
                                            · {supplier.address}
                                        </div>
                                        <div>
                                            <Popover content={supplierContent} placement="bottomRight" trigger="hover">
                                                <span ref={editSupplierRef} className="color-356DFF" style={{cursor:"pointer"}}>供应商详细信息</span>
                                            </Popover>
                                        </div>
                                    </Flex>
                                </div>}
                                label={<div className="color-242833 font-w-600 font-16">供应商</div>}
                            >
                                <Select
                                    ref={selectRef}
                                    showSearch
                                    placeholder="选择供应商"
                                    optionFilterProp="label"
                                    options={supplierOptions}
                                    onChange={handleSupplierChange}
                                    dropdownRender={(menu)=>(
                                        <>
                                            {menu}
                                            <AddSupplierModal selectRef={selectRef} getSupplierList={getSupplierList} />
                                        </>
                                    )}
                                />
                                
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                            // name="username"
                            label={<div className="color-242833 font-w-600 font-16">目的地</div>}
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择目的地"
                                optionFilterProp="label"
                                onChange={handleWarehouseAddressChange}
                                options={warehouseAddressList}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    </div>
                    <div className="border_solid"></div>
                    <div>
                        <Row gutter={[24,0]}>
                            <Col span={12}>
                            <Form.Item
                                // name="username"
                                label={<div className="color-242833 font-w-600 font-16">支付条款</div>}
                                rules={[{ required: true, message: 'Please input your name' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    defaultValue={"0"}
                                    optionFilterProp="label"
                                    onChange={handlePaymentTermsChange}
                                    options={[
                                        {
                                            value: '0',
                                            label: '无',
                                        },
                                        {
                                            value: '1',
                                            label: '货到付款',
                                        },
                                        {
                                            value: '2',
                                            label: '收到收据时支付',
                                        },
                                        {
                                            value: '3',
                                            label: '提前支付',
                                        },
                                        {
                                            value: '4',
                                            label: '7天内全额付款',
                                        },
                                        {
                                            value: '5',
                                            label: '15天内全额付款',
                                        },
                                        {
                                            value: '6',
                                            label: '30天内全额付款',
                                        },
                                        {
                                            value: '7',
                                            label: '45天内全额付款',
                                        },
                                        {
                                            value: '8',
                                            label: '60天内全额付款',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item
                                // name="username"
                                label={<div className="color-242833 font-w-600 font-16">采购货币</div>}
                                rules={[{ required: true, message: 'Please input your name' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="采购货币"
                                    optionFilterProp="label"
                                    onChange={handleCurrencyChange}
                                    options={purchaseCurrencyList}
                                />
                            </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Card>

            
        </Scoped>
    )
}

export default LocationsCard;

const Scoped = styled.div`
    .border_solid{
        margin:20px 0;
        border-top:1px solid #eef1f6;
    }

`

