import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetProp, Input, Modal, Table, TableProps, Image, Upload, UploadProps, UploadFile, message, Spin } from 'antd';
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
    // 删除的数据
    const [removeData,setRemoveData] = useState([]);
    const [loading, setLoading] = useState(false);
    // 遮罩层
    const [isHovering, setIsHovering] = useState<Boolean[]>([false,false,false]);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    // 上传图片
    const handleChange = (info:any,index:any) => {
        if(info.file.status == "done"){
            setLoading(true)
            // 上传
            let formData = new FormData()
            formData.append("1", info.file.originFileObj as FileType)
            axios.post('/api/ApiAppstore/doUploadPic',formData).then((res: any) => {
                if(res.data.code == 0){
                    let newData = [...data];
                    newData[index].attribute_image = res.data.data.src
                    setData(newData)
                    setLoading(false);
                }else{
                    message.error("上传失败", 1)
                }
            })
        }
        // 添加图片默认移除鼠标效果
        let newIsHovering = [...isHovering]
        newIsHovering[index] = false
        setIsHovering(newIsHovering)
        // setIsHovering(false)
        // imageUrl[0] = ''
        // console.log(index)
        // if (info.file.status === 'uploading') {
        //   setLoading(true);
        //   return;
        // }
        // if (info.file.status === 'done') {
            
        //     // getBase64(info.file.originFileObj as FileType, (url) => {
        //     //     setLoading(false);
        //     // });
        // }
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
                    {/* <Spin> */}
                        {(record.attribute_image == null || record.attribute_image == "") ? <Upload
                            name="avatar"
                            style={{width:"80px"}}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            maxCount={1}
                            action="#"
                            onChange={(info)=>handleChange(info,index)}
                        >
                            {uploadButton}
                        </Upload>:<div className='singleImg' onClick={()=>{
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

                    {/* </Spin> */}
                </>
            ),
        },
        
    ];

    // 提交表格
    const sumit = ()=>{
        setAttributesModal(false)
        setAttributes(false)
        console.log(data)
        console.log(removeData)
        editTagData([...data,...removeData],flag)
    }
    // 重置表格
    const reset = ()=>{
        setAttributesModal(false)
        setAttributes(false)
        setData([])
    }

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
            okText="确认"
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
` 
