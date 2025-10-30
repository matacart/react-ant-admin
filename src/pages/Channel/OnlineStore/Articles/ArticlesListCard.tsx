import { history } from "@umijs/max"
import { Card, Flex, MenuProps, message, Space, Table, TableProps, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs"
import SearchInput from "@/components/Input/SearchInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { delArticles, getArticleList } from "@/services/y2/api";
import cookie from 'react-cookies';
import DefaultTag from "@/components/Tag/DefaultTag";
import SuccessTag from "@/components/Tag/SuccessTag";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import shop from "@/store/shops/shop";
import { observer } from "mobx-react-lite";
import articlesList from "@/store/channel/articles/articlesList";
import LangSelect from "@/components/Select/LangSelect";


interface DataType {
    languages_id: string;
    id: string;
    title:string;
    key: string;
    name: string;
    age: number;
    address: string;
    status:string;
    tags: string[];
}

function ArticlesListCard() {

    const [data,setData] = useState([]);

    const [loading,setLoading] = useState(false)

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '博客',
          dataIndex: 'id',
          key: 'name',
          render: (value,record) => (
            <Flex>
                <div className="table-img-wrap">
                    <img className="table-img" src={(record.image && record.image !== "")?record.image+"?x-oss-process=image/resize,w_100":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} alt="" />
                </div>
                <Flex align="center">
                    <div>{record.title}</div>
                </Flex>
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
          title: '作者',
          dataIndex: 'author_name',
          key: 'author_name',
          render: (value,record) => (
            <div>
              {value}
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
          title: '评论',
          dataIndex: 'review',
          key: 'review',
          render: (value,record) => (
           <></>
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
                    window.open(`https://`+cookie.load("domain").domain_name+`/`+record.title.replace(/\s+/g, "-")+`-a`+record.id+`.html`)
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
                        delArticles(record.id).then(()=>{
                          // getArticleList()
                          setData(data.filter(item => item.id !== record.id))
                          message.success("删除成功")
                        }).catch(()=>{
                          console.log("删除失败")
                        })
                    }} 
                    title="博客删除后无法恢复，确认是否继续？" 
                    content={" "}
                    okText="删除"
                  />
              </div>
            </Space>
          ),
        },
    ];

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    // rowSelection object indicates the need for row selection
    const rowSelection: TableProps<DataType>['rowSelection'] = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    // 排序
    const items:MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div>更新时间（由旧到新）</div>
        ),
      },
      {
        key: '2',
        label: (
          <div>更新时间（由新到旧）</div>
        ),
      },
    ];

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    // 获取文章列表
    const fetchArticleList = (page:number,limit:number,lang:string)=>{
      setLoading(true)
      getArticleList(page.toString(),limit.toString(),lang).then((res:any)=>{
        setData(res.data)
        setPagination({
          ...pagination,
          current: page,
          pageSize: limit,
          total: res.count
        })
      }).catch(err=>{
  
      }).finally(()=>{
        setLoading(false)
      })
    }

    // 切换语言
    const setLang = (value:string)=>{
      articlesList.setLanguagesId(value)
    }

    useEffect(()=>{
      fetchArticleList(pagination.current,pagination.pageSize,articlesList.languagesId)
    },[articlesList.languagesId])

    return (
        <Scoped>
            <Card>
                {/*  */}
                <Flex className="inquire" justify="space-between">
                  <Flex gap={16}>
                    <SearchInput placeholder="输入文章标题/内容/url进行搜索" style={{width:"320px"}}  />
                    <DefaultSelect style={{width:"120px"}} value="发布状态" options={[
                      { value: '0', label: '已发布' },
                      { value: '1', label: '隐藏' },
                    ]} />
                    <DefaultSelect style={{width:"120px"}} value="作者" options={[
                      { value: '0', label: 'Admin' },
                      { value: '1', label: 'test1' },
                    ]} onChange={()=>{}} />
                    <DefaultSelect style={{width:"120px"}} value="博客集合" options={[
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                    ]} onChange={()=>{}} />
                  </Flex>
                  <Flex gap={12}>
                    <LangSelect lang={articlesList.languagesId} setLang={setLang} />
                    <DropdownSort items={items} styled={{maxHeight:"290px",overflowY:"auto"}} />
                  </Flex>
                </Flex>
                {/*  */}
                <Table<DataType> columns={columns} dataSource={data} 
                  onRow={(record) => ({
                    onClick: () => {
                      history.push(`/website/articles/edit/${record.id}/${record.languages_id}`);
                    },
                  })}
                  rowSelection={{ type: selectionType, ...rowSelection }}
                  pagination={{
                    ...pagination,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                      fetchArticleList(page,pageSize,shop.language)
                    },
                  }}
                  loading={loading}
                />
            </Card>
        </Scoped>
    )
}

export default observer(ArticlesListCard)

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