import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySelect from "@/components/Select/MySelect";
import { getProductStyleValueList } from "@/services/y2/api";
import product from "@/store/product/product";
import { App, Flex, Modal, Table, TableProps, Tooltip } from "antd"
import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';
import { DeleteOutlined } from "@ant-design/icons";
import MyInput from "@/components/Input/MyInput";


// 替换函数
function replaceOptionNames(originalArray:any, replacements:any) {
  // 构建 id -> 新 name 的映射
  const replacementMap = new Map(
    replacements.map(item => [item.option_values_id, item.option_values_name])
  );
  // 遍历原始数组，如果 id 命中映射则替换 name，否则保留原值
  return originalArray.map(item => {
    if (replacementMap.has(item.option_values_id)) {
      return {
        ...item,
        option_values_name: replacementMap.get(item.option_values_id)
      };
    }
    return item;
  });
}

interface DataType {
    key: string;
    option_values_name: string;
    option_values_price:string;
    attribute_image:string;
    price:number;
    status:string;
}



function AttributesTagModal({attributes,attributesMap,setAttributesMap}: {attributes:any,attributesMap:any,setAttributesMap:any}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const { message } = App.useApp();

    const [lang,setLang] = useState(cookie.load("shop_lang") || '2');

    // 语言
    const [languages,setLanguages] = useState([]);

    const [data,setData] = useState<DataType[]>([])

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '规格名称',
            dataIndex: 'name',
            key: 'name',
            width:200,
            render: (text,record,index) => <MyInput value={record.option_values_name} onChange={(e)=>{
                let newData = [...data]
                newData[index].option_values_name = e.target.value
                setData(newData)
            }} 
            />,
        },
        {
            title: '加价',
            dataIndex: 'price',
            key: 'price',
            width:200,
            render: (text,record,index) => <MyInput value={record.option_values_price} onChange={(e)=>{
                let newData = [...data]
                newData[index].option_values_price = e.target.value
                setData(newData)
            }} />,
        },
        {
            title: '规格图片',
            key: 'tags',
            dataIndex: 'tags',
            width:100,
            render: (text,record,index) => (
                <>  
                    {(record.attribute_image == null || record.attribute_image == "") ? <div className='imgBox' onClick={()=>{
                    }}>
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>:<div className='singleImg' onClick={()=>{
                        let newData = [...data]
                        newData[index].attribute_image = ''
                        setData(newData)
                    }} onMouseOver={() => {
                    }} onMouseOut={() => {
                    }}>
                        {/* <Image src={JSON.parse(record.attribute_image)[0]} /> */}
                        <div className="overlay"
                            style={{
                                width: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'opacity 0.3s ease',
                                cursor:"pointer"
                            }}
                        >
                            <span style={{color:"#fff"}}>
                                <DeleteOutlined />
                            </span>
                        </div>
                    </div>}
                </>
            ),
        }
    ];

    // 提交表单
    const submit = ()=>{
        // 更新
        // data.forEach(item=>{
        //     addProductOptionValues(item.option_values_id,lang,attributes.value,item.option_values_name).then(res=>{
        //         if(res !== 0){
        //             console.log("失败")
        //         }
        //     }).catch(err=>{

        //     }).finally();
        // })
        const newAtt = {
            ...attributes,
            options:replaceOptionNames(attributes.options,data)
        }
        setAttributesMap(attributesMap.map(item => {
            return item.value == newAtt.value ? newAtt : item
        }))
        setIsModalOpen(false)
    }

    // 取消
    const cancel = () => {
        setIsModalOpen(false);
    };

    // 编辑
    const handleEdit = ()=>{
        setIsModalOpen(true);
        setLangs(product.productInfo.languages_id);
    }

    const setLangs = (lang:string)=>{
        getProductStyleValueList(attributes.value,lang).then(res=>{
            const newAttributesOptions = attributes.optionValue.map(value=>{
                return res.data.find(item=>item.option_values_id == value)
            })
            setLang(lang)
            setData(newAttributesOptions)
        }).catch(err=>{
            message.error("err");
        })
    }

    useEffect(()=>{
        // 语言
        let tempList = JSON.parse(sessionStorage["languages"] || '[]').map((item:any)=>{
            return {
                value: item.id,
                label: item.name
            }
        })
        setLanguages(tempList)
    },[])

    return (
        <Scoped>
            <span className="edit-icon btn-icon__1h8Qx edit__3TiEz" style={{cursor: "pointer"}} onClick={()=>handleEdit()}>
                <Tooltip title="编辑">
                <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconEdit" font-size="20">
                    <path d="M13.551 2.47a.75.75 0 0 0-1.06 0l-9.9 9.9a.75.75 0 0 0-.22.53v4.242c0 .414.336.75.75.75h4.243a.75.75 0 0 0 .53-.22l9.9-9.899a.75.75 0 0 0 0-1.06L13.551 2.47Zm-9.68 10.74 9.15-9.15 3.182 3.183-9.15 9.15H3.873V13.21Zm13.807 4.682a.1.1 0 0 0 .1-.1v-1.3a.1.1 0 0 0-.1-.1h-6.8a.1.1 0 0 0-.1.1v1.3a.1.1 0 0 0 .1.1h6.8Z" fill="#474F5E"></path>
                </svg>
                </Tooltip>
            </span>
            <MyModal title={<div>{"编辑规格"}</div>} width={620} centered open={isModalOpen} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"确认"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Flex className="header" justify="space-between">
                    <div className="color-7A8499">
                        <div>客户可在选择商品规格时看到已上传的图片</div>
                        <div>支持上传.jpg、.png、.gif格式的图片；最大限制4M；建议尺寸：96px * 96px</div>
                    </div>
                    <Flex>
                        {/* 语言翻译： */}
                        <MySelect
                            value={lang}
                            onChange={(value)=>setLangs(value)}
                            style={{ width: 120 }}
                            options={languages}
                        />
                    </Flex>
                </Flex>
                <Table<DataType> columns={columns} loading={loading} pagination={false} dataSource={data} />
            </MyModal>
        </Scoped>
    )
}


const Scoped = styled.div`
    
`


const MyModal = styled(Modal)`
    padding-bottom: 12px;
    .header{
        margin-bottom: 20px;
    }
`


export default AttributesTagModal