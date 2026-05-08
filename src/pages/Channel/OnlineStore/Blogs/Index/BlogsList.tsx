import { history } from "@umijs/max"
import { App, Card, Flex, Space, Table, TableProps, Tooltip } from "antd"
import { useMemo, useRef, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs"
import SearchInput from "@/components/Input/SearchInput";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import cookie from 'react-cookies';
import LangSelect from "@/components/Select/LangSelect";
import { useAbortController } from "@/hooks/customHooks";
import { getArticleCategorys } from "@/services/y2/api";


interface DataType {
  key: string;
  id: string;
  languages_id: string;
  category_name:string;
  article_count: string;
  update_time: string;
  create_time:string;
}

function BlogsList({blogs,langId}:{blogs:any,langId:string}) {
    
    const { message } = App.useApp();

    const [data,setData] = useState(blogs.data ||[]);

    const { createAbortController } = useAbortController();

    const [loading,setLoading] = useState(false);

    const [languagesId,setLanguagesId] = useState(langId);

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    
    // 多选
    const rowSelection: TableProps<DataType>['rowSelection'] = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: DataType) => ({
       
      }),
    };

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '博客集合标题',
          dataIndex: 'category_name',
          key: 'id',
          render: (value,record) => (
            <div>{value}</div>
          ),
        },
        {
          title: '博客数量',
          dataIndex: 'article_count',
          key: 'id',
          render: (value,record) => (
            <div>{value}</div>
          )
        },
        {
          title: '最后更新时间',
          dataIndex: 'update_time',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{(value && value !== "0") ? dayjs(Number(value)*1000).format("YYYY-MM-DD HH:mm:ss"):dayjs(Number(record?.create_time)*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
            </>
          )
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <div className='wrap' onClick={(e) => {
                  e.stopPropagation()
                  if(cookie.load("domain").domain_name && cookie.load("domain").domain_name!==""){
                    window.open(`https://`+cookie.load("domain").domain_name+`/`+record.category_name.replace(/\s+/g, "-")+`-a`+record.id+`.html`)
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
                    }} 
                    title={Number(record.article_count)>0?`确认删除此博客集合及关联的${record.article_count}篇博客吗？`:`确认删除此博客集合吗？`} 
                    content={Number(record.article_count)>0?`删除集合时将同时删除集合中的博客及关联的评论，删除后不可撤销。`:`所选博客集合中暂无博客。`}
                    okText="删除"
                  />
              </div>
            </Space>
          ),
        },
    ];

    // 分页
    const [pagination,setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: blogs.count,
    });

    // 获取分页数据
    const fetchData = (page:number,pageSize:number,languagesId:string)=>{
      setLoading(true);
      const signal = createAbortController();
      getArticleCategorys({
        page:page?.toString(),
        limit:pageSize?.toString(),
        languages_id:languagesId,
      },signal).then((res) => {
        setData(res.data); // 使用过滤后的数据
        setPagination({
          current:page,
          pageSize:pageSize,
          total: res.count,
        });
      }).catch(error => {
        message.error(error?.msg)
      }).finally(() => {
        setLoading(false);
      });
    }

    const isFirstRender = useRef(true);
    useMemo(()=>{
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      fetchData(pagination.current,pagination.pageSize,languagesId);
    },[languagesId,pagination.current,pagination.pageSize])

    return (
        <Scoped>
            <Card>
                <Flex wrap="wrap" gap={16} className="inquire" justify="space-between">
                  <SearchInput placeholder="输入博客集合名称进行搜索" style={{width:"320px"}}  />
                  <LangSelect lang={languagesId} setLang={setLanguagesId} />
                </Flex>
                <Table<DataType> 
                  columns={columns} 
                  dataSource={data} 
                  onRow={(record) => ({
                    onClick: () => {
                      history.push(`/website/blogs/${record.id}/${record.languages_id}`)
                    },
                  })}
                    rowSelection={{ type: selectionType, ...rowSelection }}
                  pagination={{
                    ...pagination,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                      setPagination({
                        ...pagination,
                        current: page,
                        pageSize: pageSize,
                      });
                    },
                  }}
                  loading={loading}
                />
            </Card>
        </Scoped>
    )
}

export default BlogsList;

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