import DefaultButton from "@/components/Button/DefaultButton"
import NumberInput from "@/components/Input/NumberInput"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { Card, Flex, Table, Upload } from "antd"
import { useState } from "react"

function DenominationSettings({form}:{form:any}) {

    const columns = [
        {
            title: '图片',
            dataIndex: 'denomination',
            key: 'denomination',
            render: (text, record) => {
                return <Upload
                    listType="picture-card"
                    style={{width:"60px",height:"60px"}}
                    beforeUpload={(info) => {
                        let formData = new FormData()
                        formData.append("1", info)
                        return false;
                    }}
                >
                    {record.image !== "" ? null : (
                    <div className='img-box'>
                        <PlusOutlined />
                    </div>
                    )}
                    {record.image && <img src={record.image} alt="example" style={{ width: '100%' }} />}
                </Upload>
            }
        },
        {
            title: '面额',
            dataIndex: 'denomination',
            key: 'denomination',
            render: (text, record) => {
                return <NumberInput value={record.denomination} />
            }
        },
        {
            title: '售价',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                return <NumberInput value={record.price} />
            }
        },
        {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            render: (text, record) => {
                return <NumberInput value={record.stock} />
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width:80,
            render: (text, record) => {
                return <span>
                    <DeleteOutlined />
                </span>
            }
        },
    ]

    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            denomination: 100,
            price: 100,
            stock: 100,
        },
    ])

    // 添加面额
    const handleAdd = () => {
        setDataSource([...dataSource, {
            id: dataSource.length + 1,
            denomination: 0,
            price: 0,
            stock: 0,
        }])
    }

    return (
        <Card title={<Flex align="center" justify="space-between">
            <div>款式列表</div>
            <DefaultButton text="添加面额" onClick={handleAdd} />
        </Flex>}>
            <Table
                rowKey={(record,index)=>index}
                columns={columns}
                dataSource={dataSource}
                // onRow={(record) => ({
                //   onClick: () => {
                //     console.log('Row clicked:', record);
                //     if(record.id){
                //       return history.push(`/products/edit/${product.productId}/${product.language}/variants/${record.id}`);
                //     }
                //     message.info("请先保存商品")
                //   },
                // })}
            />
            
        </Card>
    )
}

export default DenominationSettings