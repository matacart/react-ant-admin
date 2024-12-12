import { DeleteOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetProp, Input, Modal, Table, TableProps, Image, Upload, UploadProps, UploadFile, message, Spin, TabsProps, Tabs } from 'antd';
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
        if(info.file.status == "done"){
            // 上传
            let formData = new FormData()
            formData.append("1", info.file.originFileObj as FileType)
            axios.post('/api/ApiAppstore/doUploadPic',formData).then((res: any) => {
                if(res.data.code == 0){
                    setImageUrl(res.data.data.src)
                    setLoading(false);
                }else{
                    message.error("上传失败", 1)
                }
            })
        }
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
            title: '价格',
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
                        <Image src={record.attribute_image} />
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


    

    // 提交表格
    const sumit = ()=>{
        setAttributesModal(false)
        setAttributes(false)
        editTagData([...data,...removeData],flag)
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
                className="avatar-uploader"
                showUploadList={false}
                action="#"
                onChange={(info)=>handleChange(info)}
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
 
    return (
        <div>
            {/* 款式框 */}
            <Modal
                title="规格编辑"
                centered
                destroyOnClose
                width={800}
                open={attributesModal}
                onOk={sumit}
                onCancel={reset}
                okText="保存"
                cancelText="取消"
                >
                <div style={{color:"#7A8499",marginBottom:"20px"}}>
                    <div>客户可在选择商品规格时看到已上传的图片</div>
                    <div>支持上传.jpg、.png、.gif格式的图片；最大限制4M；建议尺寸：96px * 96px</div>
                </div>
                <div>
                    <Scoped>
                        <Table<DataType> columns={columns} pagination={false} dataSource={data} />
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
                // 添加图片
                let newData = [...data];
                newData[selectImgIndex].attribute_image = imageUrl
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
