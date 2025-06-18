import MyButton from "@/components/Button/MyButton";
import MyDropdown from "@/components/Dropdown/MyDropdown"
import { CloseIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { Checkbox, Col, Flex, Form, Input, Modal, Popover, Row, Select, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { getCityList, getProvinceList } from "@/services/y2/api";
import cousomerManagement from "@/store/customer/cousomerManagement";


interface conditionTypeOptions{
    label:string,
    value:string,
    tip:string
}

interface conditionType{
    label:string,
    options?:conditionTypeOptions[],
    selectOptions:string[],
}

interface propsType{
    index:number,
    condition:conditionType[]
}

type AddressOption = {
    value: string;
    label: string;
};
  
type CountryList = AddressOption[];

type ProvinceList = AddressOption[];

type CityList = AddressOption[];

function ConditionModal({condition,index}:propsType){

    const conditionItem = condition[0]

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const [countryOptions, setCountryOptions] = useState<CountryList>([]);
    const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
    const [cityOptions, setCityOptions] = useState<CityList>([]);

    const [isZone,setIsZone] = useState(false);

    const [symbol,setSymbol] = useState("=");

    const myRef = useRef(null);

    // 条件
    const [checkList,setCheckList] = useState<string[]>(conditionItem.selectOptions);

    const submit = ()=>{
        form.validateFields().then((values)=>{
            setCheckList([
                values.country,
                values.state,
                values.city,
                values.zone
            ])
            setOpen(false);
        })
    }


    useEffect(()=>{
        const newCountry = JSON.parse(sessionStorage.getItem("country") || "[]").map((item:any)=>{
            return {
                value: item.country_id,
                label: item.country_name,
                iso_code_2:item.iso_code_2,
                iso_code_3:item.iso_code_3,
            }
        })
        // order.orderInfo.delivery_country_id && getProvinceList(order.orderInfo.delivery_country_id).then(res=>{
        //     setProvinceOptions(res.data.map((item:any)=>{
        //         return {
        //             value: item.id,
        //             label: item.name,
        //         }
        //     }))
        // })
        // order.orderInfo.delivery_state_id && getCityList(order.orderInfo.delivery_state_id).then(res=>{
        //     setCityOptions(res.data.map((item:any)=>{
        //         return {
        //             value: item.id,
        //             label: item.name,
        //         }
        //     }))
        // })
        setCountryOptions(newCountry)
        
    },[])
    
    return(
        <Scoped ref={myRef}>
            <Flex className="select-item color-242833 cursor-pointer" align="center" onClick={()=>setOpen(true)}>
                <Flex gap={8}>
                    {conditionItem.label}
                    {checkList.length > 0 && <MyDropdown
                        tiggerEle={<div className="select-item-conditions" onClick={(e) => e.stopPropagation()}> {symbol} </div>}
                        menu={{
                            items:[
                                {
                                    key: "1", label: (
                                        <a onClick={()=>setSymbol("=")}>等于</a>
                                    )
                                },
                                {
                                    key: "2", label: (
                                        <a onClick={()=>setSymbol("≠")}>不等于</a>
                                    )
                                },
                            ]
                        }}
                    />}
                    {checkList.length>0 && <div className="select-item-text">{checkList.filter(item=>item).join(",")}</div>}
                </Flex>
                {/*  */}
                <UnfoldIcon style={{marginLeft:"4px"}} className={open?"font-18 active":"font-18 no-active"} />
                {/* 移除 */}
                <div className="colse font-12" onClick={(e)=>{
                    e.stopPropagation()
                    const newConditionList = [...cousomerManagement.conditionList]
                    newConditionList.splice(index,1)
                    cousomerManagement.setConditionList(newConditionList)
                }}>
                    <CloseIcon />
                </div>
            </Flex>
            <Modal title={<div className="font-w-500">选择客户地址</div>} width={620} centered open={open}
                onCancel={() => setOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <Flex gap={12} justify="end">
                        <DefaultButton text="取消" onClick={() => setOpen(false)} />
                        <PrimaryButton text="确定" onClick={submit} />
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" style={{marginTop:"20px"}}>
                    <Form.Item label="国家/地区" name="countryId">
                        <MySelect style={{height:"36px"}} placeholder="国家/地区" options={countryOptions} onChange={(value:string,option:any)=>{
                            getProvinceList(value).then(res=>{
                                setProvinceOptions(res.data.map((item:any)=>{
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    }
                                }))
                            })
                            parseInt(value) == 44 ? setIsZone(true) : setIsZone(false)
                            form.setFieldsValue({
                                ...form.getFieldsValue(),
                                country:option.label,
                                countryCode2:option.iso_code_2,
                                countryCode3:option.iso_code_3,
                                stateId:"",
                                state:"",
                                city:"",
                                cityId:""
                            })
                        }} />
                    </Form.Item>
                    {provinceOptions.length>0 ? <Row gutter={[12,12]}>
                        <Col span={12}>
                            <Form.Item label="省份" name="stateId">
                                <MySelect style={{height:"36px"}} placeholder="省份" options={provinceOptions} onChange={(value:string,option:any)=>{
                                    getCityList(value).then(res=>{
                                        setCityOptions(res.data.map((item:any)=>{
                                            return {
                                                value: item.id,
                                                label: item.name,
                                            }
                                        }))
                                    })
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        state:option.label,
                                        city:"",
                                        cityId:""
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="城市" name="cityId">
                                <MySelect style={{height:"36px"}} placeholder="城市" options={cityOptions} onChange={(value:string,option:any)=>{
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        city:option.label,
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row> : <>
                        <Form.Item
                            label="城市"
                            name="city"
                            rules={[{ message: '请选择城市!' }]}
                        >
                            <MyInput style={{height:"36px"}} placeholder="城市" onChange={(e)=>{
                                form.setFieldsValue({
                                    ...form.getFieldsValue(),
                                    cityId:"",
                                })
                            }} />
                        </Form.Item>
                    </>}
                    <Form.Item label="区" name="zone">
                        <MyInput placeholder="区" />
                    </Form.Item>
                    {/* 隐藏表单项 */}
                    <Form.Item name="city" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="state" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="countryCode3" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="countryCode2" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="country" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )
}

export default ConditionModal;

const Scoped = styled.div`
    .select-item{
        position: relative;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        padding: 6px 8px;
        .select-item-conditions{
            padding: 0 4px;
        }
        .select-item-text{
            padding: 0 4px;
        }
        .active{
            color:rgb(0 0 0 / 25%);
            transform: rotate(180deg);
            transition: transform 0.3s;  // 添加旋转动画
        }
        .no-active{
            color:rgb(0 0 0 / 25%);
            transform: rotate(0deg);
            transition: transform 0.3s;  // 添加旋转动画
        }
    }
    .select-item:hover{
        border-color: #356dff;
        box-shadow: 0 0 12px rgba(53, 109, 255, 0.15);
        .select-item-conditions{
            padding: 0 4px;
            background-color: #f0f3f9;
            border-radius: 2px;
        }

        .select-item-text{
            padding: 0 4px;
            background-color: #f0f3f9;
            border-radius: 2px;
        }
    }

    .colse{
        display: none;
        position: absolute;
        top:0;
        right:0;
        padding: 2px;
        color:#FFF;
        background: #b8becc;
        border-radius: 20px;
        transform:translateX(6px) translateY(-6px);
    }
    .select-item:hover .colse{
        display: flex;
    }

`