import { App, Card, Flex, Space, Table, TableProps, Tooltip } from "antd"
import { useMemo, useRef, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs"
import SearchInput from "@/components/Input/SearchInput";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined } from "@ant-design/icons";
import LangSelect from "@/components/Select/LangSelect";
import { useAbortController } from "@/hooks/customHooks";
import { getArticleComments } from "@/services/y2/api";
import { ExportIcon } from "@/components/Icons/Icons";
import { getPrimaryDomain } from "@/utils/dataStructure";


interface DataType {
  key: string;
  id: string;
  languages_id: string;
  content:string;
  customer_name: string;
  article_title:string;
  handle:string;
  update_time: string;
  create_time:string;
  status:string;
  status_text:string;
}

function ArticlesCommentList({comments,langId}:{comments:any,langId:string}) {
    
    const { message } = App.useApp();

    const [data,setData] = useState(comments.data ||[]);

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
          title: '评论内容',
          dataIndex: 'content',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{value}</div>
              <Flex className="color-7A8499 font-12">
                来自博客：
                <Flex className="color-356DFF cursor-pointer" gap={6} onClick={()=>{
                  const primaryDomain = getPrimaryDomain();
                  primaryDomain && window.open(`${primaryDomain}/blogs/${record.handle}`)
                }}>
                  {record.article_title}
                  <ExportIcon />
                </Flex>
              </Flex>
            </>
          ),
        },
        {
          title: '评论者',
          dataIndex: 'customer_name',
          key: 'id',
          render: (value,record) => (
            <div>{value}</div>
          )
        },
        {
          title: '评论时间',
          dataIndex: 'update_time',
          key: 'id',
          render: (value,record) => (
            <>
              <div>{(value && value !== "0") ? dayjs(Number(value)*1000).format("YYYY-MM-DD HH:mm:ss"):dayjs(Number(record?.create_time)*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
            </>
          )
        },
        {
          title: '审核状态',
          dataIndex: 'status',
          key: 'id',
          render: (value,record) => (
            <div>{record.status_text}</div>
          )
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <div>
                  <DeleteModal
                    tElement={
                      <Tooltip title="删除">
                        <div className='wrap'>
                          <DeleteOutlined className="font-16 color-F86140 cursor-pointer" />
                        </div>
                      </Tooltip>
                    }
                    removeFunc={()=>{
                      // UninstallApp(record.id)
                    }} 
                    title={`确认删除此评论吗？`} 
                    content={``}
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
      total: comments.count,
    });

    // 获取分页数据
    const fetchData = (page:number,pageSize:number,languagesId:string)=>{
      setLoading(true);
      const signal = createAbortController();
      getArticleComments({
        page:page?.toString(),
        limit:pageSize?.toString(),
        languages_id:languagesId,
      },signal).then((res) => {
        setData(res.data.list); // 使用过滤后的数据
        setPagination({
          current:page,
          pageSize:pageSize,
          total: res.data.total,
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

export default ArticlesCommentList;

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