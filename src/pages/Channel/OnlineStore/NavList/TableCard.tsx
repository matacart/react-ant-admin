import { history } from "@umijs/max"
import { Button, Card, Flex, MenuProps, message, Space, Table, TableProps, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs"
import SearchInput from "@/components/Input/SearchInput";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { delArticles, getArticleList } from "@/services/y2/api";
import cookie from 'react-cookies';
import { status } from 'nprogress';
import DefaultTag from "@/components/Tag/DefaultTag";
import SuccessTag from "@/components/Tag/SuccessTag";


interface DataType {
    title:string;
    key: string;
}

export default function TableCard({list,count}:{list:any,count:number}) {

    const [data,setData] = useState([])

    const [loading,setLoading] = useState(false)

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '菜单标题',
          dataIndex: 'title',
          key: 'title',
          width: 300,
          render: (value,record) => (
                <div>{value}</div>
          ),
        },
        {
          title: '菜单一级目录',
          dataIndex: 'nav',
          key: 'nav',
          render: (value,record) => (
            <div>123</div>
          )
        },
    ];
  
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 20,
    })

    useEffect(()=>{
      setData(list)
    },[])

    // 获取文章列表
    const fetchArticleList = (page:number,limit:number)=>{
    //   setLoading(true)
    //   getArticleList(page.toString(),limit.toString()).then(res=>{
    //     setData(res.data)
    //     setPagination({
    //       ...pagination,
    //       current: page,
    //       pageSize: limit,
    //     })
    //   }).catch(err=>{
  
    //   }).finally(()=>{
    //     setLoading(false)
    //   })
    }

    return (
        <Scoped>
            <Card>
                {/*  */}
                <Table<DataType> columns={columns} dataSource={data} 
                  onRow={(record) => ({
                    onClick: () => {
                      console.log('Row clicked:', record);
                    //   history.push(`/website/articles/edit?id=${record.id}&langId=${record.languages_id}`);
                    },
                  })}
                  pagination={{
                    ...pagination,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                      fetchArticleList(page,pageSize)
                    },
                  }}
                  loading={loading}
                />
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-top: 24px;

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }

`