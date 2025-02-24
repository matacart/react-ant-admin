import { Table, TableProps } from "antd";
import { set } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";


interface DataType {
    key: string;
    name: string;
    age: number;
}

export default function SuccessfulTable({domainName,otherDomain}) {

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '域名',
          key: 'name',
          dataIndex: 'name',
          render: (text) => <div>{text}</div>,
          width:100
        },
        {
          title: '状态',
          key: 'age',
          dataIndex: 'age',
          render: (text) => <div>已绑定</div>,
          width:100
        },
    ];

    

    const [data,setData] = useState([]);
    // DataType[] = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //     },
    // ];

    useEffect(()=>{
      let newData = [
        { key: 0,
          name: domainName,
          age: 32,
        },
      ]
      if(otherDomain){
        otherDomain.split(",").forEach((element,index) => {
          newData.push({
            key: index,
            name: element,
            age: 32,
          })
        });
      }
      setData(newData)
    },[])

    return (
        <Scoped>
            <Table<DataType> columns={columns} dataSource={data} pagination={false} />
        </Scoped>
    );
}

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`