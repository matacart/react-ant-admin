
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Form, FormInstance, Input, InputNumber, InputRef, Modal, Popconfirm, Row, Select, Table, TableProps } from "antd";
import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { values } from 'lodash';


const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}


const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;
  
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
  
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    key: React.Key;
    name: string;
    nameCode: string;
    price: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

function CostSummaryModal({data,setData}) {
 
    const [isOpen,setIsOpen] = useState(false)

    const [dataSource, setDataSource] = useState<DataType[]>(data);

    // 
    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
    };

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
          title: '调整',
          dataIndex: 'nameCode',
          width:"320px",
          render(value, record, index) {
                console.log(record)
              return(
                <div>
                    <Select style={{height:"36px",width:"100%"}} value={value} placeholder="选择类型" options={[
                        { value: '1', label: '关税' },
                        { value: '2', label: '折扣' },
                        { value: '3', label: '国外交易费' },
                        { value: '4', label: '货运费' },
                        { value: '5', label: '保险' },
                        { value: '6', label: '加急费' },
                        { value: '7', label: '附加' },
                        { value: '8', label: '其它' }
                    ]} onChange={(value,option)=>{
                        let newData = [...dataSource]
                        newData[index].nameCode = value
                        newData[index].name = option.label 
                        setDataSource(newData)
                    }} />
                </div>
              )
          },
        },
        {
          title: '价格',
          dataIndex: 'price',
          width:"180px",
          render(value, record, index) {
            return(
              <div>
                  <InputNumber onChange={(value)=>{
                    
                  }} onBlur={(e)=>{
                    console.log(e.target.value)
                    let newData = [...dataSource]
                    newData[index].price = Number(e.target.value).toFixed(2)
                    setDataSource(newData)
                  }} style={{height:"36px",width:"100%"}} defaultValue={value} controls={false} prefix={<span className="color-474F5E">US$</span>} placeholder="Basic usage" />
              </div>
            )
        },
        },
        {
        //   title: '',
          dataIndex: 'operation',
          render: (_, record) =>
            dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <div className="font-20 color-FF0000 cursor-pointer">
                    <DeleteOutlined />
                </div>
              </Popconfirm>
            ) : null
        },
    ];
    
    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
    };

    const handleAdd = () => {
        const newData: DataType = {
          key: count,
          name: `Edward King ${count}`,
          price: '32',
          nameCode: `London, Park Lane no. ${count}`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: DataType) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
    });

    const handleOk = ()=>{
        setData(dataSource)
        setIsOpen(false)
    }


    // footer
    const tableFooter = () => {
        return(
            <div onClick={handleAdd} className="font-14 color-356DFF cursor-pointer" style={{alignItems:"center",display:"flex",padding:"8px 12px"}}>
                <PlusOutlined style={{fontSize:"10px",marginRight:"6px"}} /> 调整
            </div>
        )
    }

    return(
        <>
            <div onClick={()=>setIsOpen(true)} className="color-356DFF cursor-pointer">编辑</div>
            {/*  */}
            <Modal
                width={620}
                title="管理成本摘要"
                destroyOnClose
                centered
                open={isOpen}
                onOk={handleOk}
                onCancel={() => {
                    setIsOpen(false)
                }}>
                <Scoped>
                    <div>
                        <Table<DataType>
                            components={components}
                            rowClassName={() => 'editable-row'}
                            pagination={false}
                            dataSource={dataSource}
                            columns={columns as ColumnTypes}
                            footer={tableFooter}
                        />
                    </div>
                </Scoped>
            </Modal>
        </>
            
    )
}

export default CostSummaryModal;

const Scoped = styled.div`
    border: 1px solid #eef1f7;
    border-radius: 4px;
    .ant-table-footer{
        padding: 0;
    }
`


