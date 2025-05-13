import { history } from "@umijs/max"
import { Button, Card, Flex, MenuProps, message, Space, Table, TableProps, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs"
import SearchInput from "@/components/Input/SearchInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { delArticles, delCustomerPage, getArticleList, getCustomerPageList } from "@/services/y2/api";
import cookie from 'react-cookies';
import DefaultTag from "@/components/Tag/DefaultTag";
import SuccessTag from "@/components/Tag/SuccessTag";


interface DataType {
    title:string;
    key: string;
    name: string;
    age: number;
    address: string;
    status:string;
    tags: string[];
}

export default function CustomPageListCard({list,count}) {

    const [data,setData] = useState(list)

    const [loading,setLoading] = useState(false)

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '页面标题',
          dataIndex: 'id',
          key: 'title',
          render: (value,record) => (
            <Flex align="center">
                <div>{record.title}</div>
            </Flex>
          ),
        },
        {
          title: '发布状态',
          dataIndex: 'status',
          key: 'status',
          render: (value,record) => (
            <div>
              {value == "0" && <DefaultTag text="隐藏" />}
              {value == "1" && <SuccessTag text="已发布" />}
            </div>
          )
        },
        {
            title: '最后更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
            render: (value,record) => (
                <div>{dayjs(value*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
            )
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <div className='wrap' onClick={(e) => {
                  e.stopPropagation()
                  if(cookie.load("domain").domainName && cookie.load("domain").domainName!==""){
                    window.open(`https://`+cookie.load("domain").domainName+`/`+record.title.replace(/\s+/g, "-")+`-n`+record.id+`.html`)
                  }else{
                    message.error("请先设置店铺")
                  }
                }}>
                <Tooltip title="预览">
                  <EyeOutlined className="font-16 cursor-pointer" />
                </Tooltip>
              </div>
              <div>
                  <DeleteModal
                    tElement={
                      <Tooltip title="删除">
                        <div className='wrap' onClick={(e) => {
                          // e.stopPropagation()
                        }}>
                          <DeleteOutlined className="font-16 color-F86140 cursor-pointer" />
                        </div>
                      </Tooltip>
                    }
                    removeFunc={()=>{
                        // UninstallApp(record.id)
                        delCustomerPage(record.id).then(()=>{
                          // getArticleList()
                          setData(data.filter(item => item.id !== record.id))
                          message.success("删除成功")
                        }).catch(()=>{
                          console.log("删除失败")
                        })
                    }} 
                    title="自定义页面删除后无法恢复，确认是否继续？" 
                    content={" "}
                    okText="删除"
                  />
              </div>
            </Space>
          ),
        },
    ];

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: count,
    })

    // 获取自定义页面列表
    const fetchArticleList = (page:number,limit:number)=>{
      setLoading(true)
      getCustomerPageList(page.toString(),limit.toString()).then(res=>{
        setData(res.data)
        setPagination({
          ...pagination,
          current: page,
          pageSize: limit,
        })
      }).catch(err=>{
  
      }).finally(()=>{
        setLoading(false)
      })
    }

    return (
        <Scoped>
            <Card>
                {/*  */}
                <Flex className="inquire" justify="space-between">
                  <Flex gap={16}>
                    <SearchInput placeholder="输入页面标题/内容/url进行搜索" style={{width:"320px"}}  />
                    <DefaultSelect value="发布状态" options={[
                      { value: '0', label: '已发布' },
                      { value: '1', label: '隐藏' },
                    ]} onChange={()=>{}} />
                  </Flex>
                </Flex>
                {/*  */}
                <Table<DataType> columns={columns} dataSource={data} 
                  onRow={(record) => ({
                    onClick: () => {
                    //   console.log('Row clicked:', record);
                      history.push(`/website/page/edit?id=${record.id}&langId=${record.languages_id}`);
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

  .inquire{
    margin-bottom: 12px;
  }

  .ant-table{
      border: 1px solid #eef1f7;
      border-radius: 6px;
      border-bottom: none;
  }

  .table-img-wrap{
    width: 60px;
    height: 60px;
    margin-right: 10px;
    .table-img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      background-color: #f7f8fb;
      border-radius: 4px;
    }
  }
`