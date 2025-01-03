import { addProductOptionValues, getProductStyleValueList } from '@/services/y2/api';
import oldStore from '@/store/product/oldStore';
// import oldStore from '@/store/product/oldStore';
import { DeleteOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetProp, Input, Modal, Table, TableProps, Image, Upload, UploadProps, UploadFile, message, Spin, TabsProps, Tabs, Select } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import axios from 'axios';
import { set } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const _ = require('lodash');
 

interface DataType {
    key: string;
    option_values_name: string;
    option_values_price:string;
    attribute_image:string;
    price:number;
    status:string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function AttributesModal({tagData,flag,editTagData,attributes,setAttributes}:any){
    
    const [attributesModal,setAttributesModal] = useState(false);
    const [imgModal,setImgModal] = useState(false);


    const [languages,setLanguages] = useState([]);
    const [language,setLanguage] = useState("2");

    // 弹窗图片
    const [imageUrl,setImageUrl] = useState("");
    // 弹窗图片下标
    const [selectImgIndex,setSelectImgIndex] = useState(0);
    // 删除的数据
    const [removeData,setRemoveData] = useState([]);
    const [loading, setLoading] = useState(false);
    // 遮罩层
    const [isHovering, setIsHovering] = useState<Boolean[]>([false,false,false]);
        
    // 上传图片
    const handleChange = async (info:any) => {
        // 添加图片默认移除鼠标效果
        setLoading(true)
        // 上传
        let formData = new FormData()
        formData.append("1", info as FileType)
        axios.post('/api/ApiAppstore/doUploadPic',formData).then((res: any) => {
            if(res.data.code == 0){
                setImageUrl(res.data.data.src)
                setLoading(false);
            }else{
                message.error("上传失败", 1)
            }
        })
        let newIsHovering = [...isHovering]
        newIsHovering[selectImgIndex] = false
        await setIsHovering(newIsHovering)
    };

    const [data,setData] = useState<DataType[]>([])
  
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '规格名称',
            dataIndex: 'name',
            key: 'name',
            render: (text,record,index) => <Input value={record.option_values_name} onChange={(e)=>{
                let newData = [...data]
                newData[index].option_values_name = e.target.value
                setData(newData)
            }} style={{width:"200px"}} />,
        },
        {
            title: '加价',
            dataIndex: 'price',
            key: 'price',
            render: (text,record,index) => <Input value={record.option_values_price} onChange={(e)=>{
                let newData = [...data]
                newData[index].option_values_price = e.target.value
                setData(newData)
            }} style={{width:"200px"}} />,
        },
        {
            title: '规格图片',
            key: 'tags',
            dataIndex: 'tags',
            render: (text,record,index) => (
                <>  
                    {(record.attribute_image == null || record.attribute_image == "") ? <div className='imgBox' onClick={()=>{
                        setImgModal(true)
                        setSelectImgIndex(index)
                    }}>
                        {<PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>:<div className='singleImg' onClick={()=>{
                        let newData = [...data]
                        newData[index].attribute_image = ''
                        setData(newData)
                    }} onMouseOver={() => {
                        let newIsHovering = [...isHovering]
                        newIsHovering[index] = true
                        setIsHovering(newIsHovering)
                    }} onMouseOut={() => {
                        let newIsHovering = [...isHovering]
                        newIsHovering[index] = false
                        setIsHovering(newIsHovering)
                    }}>
                        <Image src={JSON.parse(record.attribute_image)[0]} />
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
        },
        
    ];

    // 使用函数进行替换
    function replaceOptionValuesNames(source, target) {
        // 创建一个 Map 来快速查找 targetArray 中的值
        const targetMap = new Map(target.map(item => [item.option_values_id, item.option_values_name]));
        // 返回一个新的数组，其中 sourceArray 的值根据 targetMap 进行了更新
        return source.map(item => ({
            ...item,
            option_values_name: targetMap.get(item.option_values_id) || item.option_values_name // 如果找不到对应的 id，则使用原始值
        }));
    }

    // 判断数组中的对象是否存在相同的option_values_name
    function hasDuplicateOptionValuesName(options) {
        const seenNames = new Set();
        for (const option of options) {
          if (seenNames.has(option.option_values_name)) {
            // 如果已经遇到过这个 name，则返回 true
            return true;
          }
          // 将这个 name 添加到集合中
          seenNames.add(option.option_values_name);
        }
       
        // 如果遍历完整个数组都没有发现重复，则返回 false
        return false;
      }

    // 切换语言
    const handlLanguageClick = async (value:string)=>{
        let updatedArray;
        setLoading(true)
        if(tagData.length>0){
            await getProductStyleValueList(tagData[0].option_id,value).then(res=>{
                if(res.code == 0){
                    updatedArray = replaceOptionValuesNames(data,res.data)
                }
                setData(updatedArray)
            })
        }
        setLoading(false)
    }
    // // 提交表格
    const submit = async ()=>{
        if(hasDuplicateOptionValuesName(data)){
            return message.error('规格名称不能重复')
        }
        let success = false;
        setLoading(true)
        const promises = data.map(async item=>{
            await addProductOptionValues(item.option_values_id,language,item.option_id,item.option_values_name).then(res=>{
                if(res.code == 0){
                    success = true
                }
            })
        })
       Promise.all(promises).then(()=>{
            if(success){
                message.success('产品款式值更新成功');
            }else{
                message.error('产品款式值更新失败');
            }
            if(oldStore.language == language){
                // setAttributesModal(false)
                // setAttributes(false)
                console.log(data)
                editTagData([...data],flag)
            }
            setLoading(false)
       })
    }
    // 重置表格
    const reset = ()=>{
        setAttributesModal(false)
        setAttributes(false)
        setData([])
    }


    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '从电脑上传',
          children: 
            <Spin spinning={loading}>
            <div>
            {/* {...props} */}
            {imageUrl == ""?<Dragger 
                listType="picture-card"
                beforeUpload={(info)=>{
                    // 手动上传
                    handleChange(info)
                    return false
                }}
                className="avatar-uploader"
                showUploadList={false}
            >
                <div style={{padding:"60px 0"}}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text"><span style={{fontSize:"14px"}}>添加图片(或把图片拖到框内)</span></p>
                    <p className="ant-upload-hint">支持上传jpg、png、webp、GIF格式的图片；最大限制4M；</p>
                </div>
            </Dragger>:
                <div style={{position:"relative",width:"732px",height:"500px"}}
                onMouseOver={() => {
                    let newIsHovering = [...isHovering]
                    newIsHovering[0] = true
                    setIsHovering(newIsHovering)
                }} onMouseOut={() => {
                    let newIsHovering = [...isHovering]
                    newIsHovering[0] = false
                    setIsHovering(newIsHovering)
                }}
                onClick={()=>{
                    setImageUrl("")
                }}
            >
                <img style={{width:"100%",height:"100%", objectFit:"contain"}} src={imageUrl} />
                <div className="overlay" style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isHovering[selectImgIndex] ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        cursor:"pointer"
                    }}
                >
                <span style={{color:"#fff"}}>
                    <DeleteOutlined />
                </span>
                </div>
            </div>
            
            }
          </div>
          </Spin>
        }
    ];

    useEffect(() => {
        setAttributesModal(attributes)
        // 表格
        const temp = _.cloneDeep(tagData)
        // temp.filter((v:any)=>v.status !== 9)
        let rdata:any = [];
        let vdata:any = [];
        temp.forEach((element:any) => {
            if(element.status == "9"){
                rdata.push(element)
            }else{
                vdata.push(element)
            }
        });
        setRemoveData(rdata)
        setData(vdata)
    }, [attributes]);
    

    useEffect(() => {
        let tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
            return {
                value: item.id,
                label: item.name
            }
        })
        setLanguages(tempList)
    }, [])


    return (
        <div>
            {/* 款式框 */}
            <Modal
                title="规格编辑"
                centered
                destroyOnClose
                width={800}
                open={attributesModal}
                onOk={submit}
                onCancel={reset}
                okText="更新"
                cancelText="取消"
            >
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{color:"#7A8499",marginBottom:"20px"}}>
                        <div>客户可在选择商品规格时看到已上传的图片</div>
                        <div>支持上传.jpg、.png、.gif格式的图片；最大限制4M；建议尺寸：96px * 96px</div>
                    </div>
                    <div>语言翻译：<Select
                        defaultValue={oldStore.language}
                        onChange={(value)=>{
                            setLanguage(value)
                            handlLanguageClick(value);
                        }}
                        style={{ width: 120 }}
                        options={languages}
                    /></div>
                </div>
                <div>
                    <Scoped>
                        <Table<DataType> columns={columns} loading={loading} pagination={false} dataSource={data} />
                    </Scoped>
                </div>
            </Modal>
            {/* {图片上传} */}
            <Modal
            open={imgModal}
            width={800}
            destroyOnClose
            centered
            okText="选择"
            cancelText="取消"
            onOk={()=>{
                setImgModal(false)
                // 添加图片 --- 数组类型的JSON对象
                let newData = [...data];
                newData[selectImgIndex].attribute_image = JSON.stringify([imageUrl])
                setData(newData)
                setImageUrl("")
            }}
            onCancel={()=>{
                setImgModal(false)
                // 删除图片
                setImageUrl("")
            }}
            >
                <div style={{padding:"0 10px"}}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </Modal>
        </div>
    );
};
 
export default AttributesModal;

const Scoped = styled.div`
    .singleImg{
        position: relative;
        width: 80px;
        height: 80px;
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
    /* .ant-upload */
    .ant-upload-select{
        width: 80px !important;
        height: 80px !important;
    }
    .imgBox{
        width: 80px;
        height: 80px;
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
` 
