import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySelect from "@/components/Select/MySelect";
import { getProductStyleValueList, uploadPic } from "@/services/y2/api";
import product from "@/store/product/product";
import { App, Flex, Modal, Table, TableProps, Tooltip, Upload, Image } from "antd"
import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';
import { DeleteOutlined } from "@ant-design/icons";
import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";
import { EditIcon, ImageUploadIcon } from "@/components/Icons/Icons";


// 替换函数
function replaceOptionNames(originalArray:any, replacements:any) {
  // 构建 id -> 新 name 的映射
  const replacementMap = new Map(
    replacements.map((item:any) => [item.option_values_id, item])
  );
  // 遍历原始数组，如果 id 命中映射则替换所有字段，否则保留原值
  return originalArray.map((item:any) => {
    const replacement = replacementMap.get(item.option_values_id);
    if (replacement && typeof replacement === 'object') {
      return {
        ...item,
        ...replacement
      };
    }
    return item;
  });
}

interface DataType {
    key: string;
    option_values_id: string;
    option_values_name: string;
    option_values_price:string;
    attribute_image:string;
    price:number;
    status:string;
}


function AttributesTagModal({attributes,attributesMap,setAttributesMap}: {attributes:any,attributesMap:any,setAttributesMap:any}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [isHovering,setIsHovering] = useState<boolean[]>([]);

    const { message } = App.useApp();

    const [lang,setLang] = useState(cookie.load("shop_lang") || '2');

    // 语言
    const [languages,setLanguages] = useState([]);

    const [data,setData] = useState<DataType[]>([]);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '规格名称',
            dataIndex: 'name',
            key: 'name',
            width:180,
            render: (text,record,index) => <MyInput style={{ width:"100%",height:"36px" }} value={record.option_values_name} onChange={(e)=>{
                let newData = [...data]
                newData[index].option_values_name = e.target.value
                setData(newData)
            }} 
            />,
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width:180,
            render: (value: string, record: DataType,index: number) => (    
                <NumberInput style={{width:'100%'}} value={value} onChange={(value:string) => handleChangePrice(value,record,index)}  />
            ),
        },
        {
            title: '规格图片',
            key: 'tags',
            dataIndex: 'tags',
            width:100,
            render: (text,record,index) => (
                <>  
                    {(record.attribute_image == null || record.attribute_image == "") ? <Upload
                        showUploadList={false} 
                        beforeUpload={(file) => handleImgUpload(file,index)}
                    >
                        <div className='imgBox'><ImageUploadIcon /></div>
                    </Upload>:<div className='singleImg' 
                        onClick={()=>{
                            let newData = [...data]
                            newData[index].attribute_image = ''
                            setData(newData)
                        }}
                        onMouseOver={() => {
                            let newIsHovering = [...isHovering]
                            newIsHovering[index] = true
                            setIsHovering(newIsHovering)
                        }} onMouseOut={() => {
                            let newIsHovering = [...isHovering]
                            newIsHovering[index] = false
                            setIsHovering(newIsHovering)
                        }}
                    >
                        <Image src={record.attribute_image ? record.attribute_image+"?x-oss-process=image/resize,w_100" : ""} style={{width:"100%",height:"100%"}} />
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
                                opacity: isHovering[index] ? 1 : 0,
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

    // 上传图片
    const handleImgUpload = (file: any,index: number) => {
        if (file.type.indexOf('image') === -1) {
            message.error('请上传图片文件');
            return false;
        }
        if (file.size > 4 * 1024 * 1024) {
            message.error('图片大小不能超过4MB');
            return false;
        }
        let formData = new FormData()
        formData.append("file", file)
        setLoading(true);
        uploadPic(formData).then((res: any) => {
            if(res.code == 0){
                const newImg = res.data.src;
                const newData = [...data];
                newData[index].attribute_image = newImg
                setData(newData)
            }else{
                message.error(res.msg || "err", 1)
            }
        }).catch((err: any) => {
        }).finally(() => {
            setLoading(false);
        })
        return false;
    };

    // 价格
    const handleChangePrice = (value: string, record: DataType, index: number) => {
        let newData = [...data];
        newData[index].option_values_price = value.toString();
        setData(newData);
    }

    // 提交表单
    const submit = ()=>{
        // 更新
        const newAtt = {
            ...attributes,
            options:replaceOptionNames(attributes.options,data)
        }
        setAttributesMap(attributesMap.map((item:any) => {
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
        setLoading(true)
        getProductStyleValueList(attributes.value,lang).then(res=>{
            // 先过滤出需要的数据 补充
            const newOptions = attributes.optionValue.map((option:string) => {
                const item = attributes.options.find((i:any) => i.option_values_id == option)
                return item ? item : undefined
            })
            // 获取到需要的属性 多语言 翻译
            const newAttributesOptions = newOptions.map((value:any)=>{
                const item = res.data.find((item:any)=>item.option_values_id == value.option_values_id);
                return item ? {
                    ...value,
                    option_values_name: item.option_values_name
                } : value
            })
            setLang(lang)
            setData(newAttributesOptions)
        }).catch(err=>{
            message.error("err");
        }).finally(()=>{
            setLoading(false)
        });
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
            <span style={{cursor: "pointer"}} onClick={()=>handleEdit()}>
                <Tooltip title="编辑">
                    <EditIcon className="font-20" />
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
                <Table<DataType> rowKey={(record) => record.option_values_id} columns={columns} loading={loading} pagination={false} dataSource={data} />
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
    .imgBox{
        width: 60px;
        height: 60px;
        border: 1px dashed #D9D9D9;
        border-radius: 4px;
        cursor:pointer;
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

    }
    .imgBox:hover{
        color: #1890ff;
        border: 1px dashed #1890ff;
    }
    .singleImg{
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 4px;
    }
    .overlay{
        position: 'absolute';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: 'rgba(0, 0, 0, 0.5)';
        display: 'flex';
        align-items: 'center';
        justify-content: 'center';
        opacity: 1 ;
        transition: 'opacity 0.3s ease';
    }
`


export default AttributesTagModal