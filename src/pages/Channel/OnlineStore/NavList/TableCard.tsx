import { history } from "@umijs/max"
import { Card, Flex, Table, TableProps } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { getNavList } from "@/services/y2/api";
import LangSelect from "@/components/Select/LangSelect";
import MyInput from "@/components/Input/MyInput";
import { SearchSecondIcon } from "@/components/Icons/Icons";
import { useAbortController } from "@/hooks/customHooks";
import navgate, { TreeItem } from "@/store/channel/navList/navgate";


interface DataType {
    title:string;
    key: string;
    id:string;
    name:any;
    nodeTree:any;
}

export default function TableCard({navData}:{navData:any}) {

    const [languagesId,setLanguagesId] = useState("2");

    const { createAbortController } = useAbortController();

    const [data, setData] = useState(navData.list.map((item: any) => ({
        ...item,
        key: item.id // 使用数据中的 id 作为 key，或者用其他唯一标识符
    })));

    const [loading,setLoading] = useState(false);

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '菜单标题',
          dataIndex: 'name',
          key: 'name',
          width: 300,
          render: (value,record) => (
            <div>{record?.name[languagesId] || record?.name?.default}</div>
          ),
        },
        {
          title: '菜单一级目录',
          dataIndex: 'id',
          key: 'id',
          render: (value,record) => {
            const validItems = record?.nodeTree?.filter((item: any) => item.name.default?.trim());
            const content = validItems?.length > 0 ? validItems.map((item: any) => item.name.default).join(' | ') : <span className="font-12 color-8F96AE font-w-400">尚未添加菜单项</span>;
            return <Flex>{content}</Flex>;
          }
        },
    ];
  
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: navData.count,
    });
    
    // 获取分页数据
    const fetchData = (page:number,pageSize:number,languagesId:string)=>{
      setLoading(true);
      const signal = createAbortController();
      getNavList({
        page: page.toString(),
        limit: pageSize.toString(),
        languagesId: languagesId,
        pid: "0",
      },signal).then((res) => {
        const newData: DataType[] = res.data?.list?.map((item: any) => ({
          ...item,
          key: item.id
        }));
        setData(newData); // 使用过滤后的数据
        setPagination({
          current:page,
          pageSize: pageSize,
          total: res.data.total,
        });
      }).catch(error => {
        // console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      });
    }

    // 一级导航
    // 添加一个 ref 来跟踪是否是首次渲染
    const isFirstRender = useRef(true);
    useEffect(()=>{
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      fetchData(pagination.current!,pagination.pageSize!,languagesId)
    },[languagesId])

    return (
        <Scoped>
            <Card>
                {/* 自定义语言 */}
                <Flex justify="space-between" align="center" style={{ marginBottom: "12px" }}>
                  <MyInput prefix={<SearchSecondIcon />} placeholder="请输入菜单标题" style={{ height: "36px",maxWidth:"420px" }} />
                  <LangSelect lang={languagesId} setLang={setLanguagesId} />
                </Flex>
                {/*  */}
                <Table<DataType>
                  columns={columns}
                  dataSource={data} 
                  onRow={(record) => ({
                    onClick: () => {
                      history.push(`/website/navList/${record.id}/${languagesId}`)
                    },
                  })}
                  pagination={{
                    ...pagination,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                      fetchData(page,pageSize,languagesId);
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