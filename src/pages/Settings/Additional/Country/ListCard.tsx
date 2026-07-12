import { App, Card, Flex, Space, Switch, Table, TableProps, Tag, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import DefaultSelect from "@/components/Select/DefaultSelect";
import DeleteModal from "@/components/Modal/DeleteModal";
import { DeleteOutlined } from "@ant-design/icons";
import { delArticles } from "@/services/y2/api";
import { observer } from "mobx-react-lite";
import country from "@/store/settings/additional/country";
import { changeCountryStatus, delCountry, getList } from "@/services/y2/ApiCheckoutAdditional";
import MySearch from "@/components/Input/MySearch";
import AddCountry from "./AddCountry";
import EditCountry from "./EditCountry";


export interface DataType {
  id: string;
  languages_id: string;
  country_name:string;
  country_code: string;
  additional_title: string;
  required: string;
  status:string;
}

function ListCard() {

  const { message } = App.useApp();

  const [data,setData] = useState<DataType[]>([]);

  const [loading,setLoading] = useState(false);

  // 搜索类型
  const [searchType,setSearchType] = useState("2");

  // 搜索内容
  const [searchText,setSearchText] = useState("");

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '国家/地区',
      dataIndex: 'country_name',
      key: 'country_name',
      render: (value,record) => (
        <Flex>{value}</Flex>
      ),
    },
    {
      title: '附加信息名称',
      dataIndex: 'additional_title',
      key: 'additional_title',
      render: (value,record) => (
        <div>{value}</div>
      )
    },
    {
      title: '填写要求',
      dataIndex: 'required',
      key: 'required',
      render: (value,record) => (
        <div>
          {value == "1" ? "必填" : "选填"}
        </div>
      )
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      key: 'status',
      render: (value,record) => (
        <Switch
          checked={value == "1"}
          onChange={(checked) => {
            changeCountryStatus({
              id:record.id,
              languages_id:country.languagesId,
              status:checked ? "1" : "0",
            }).then(()=>{
              const newData = [...data]
              newData.forEach((item:DataType) => {
                if(item.id == record.id){
                  item.status = checked ? "1" : "0"
                }
              })
              setData(newData)
            }).catch(()=>{
              console.log("修改状态失败")
            })
          }}
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditCountry countryInfo={record} data={data} setData={setData} />
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
                    delCountry({
                      id:record.id,
                      languages_id:country.languagesId,
                    }).then(()=>{
                      message.success("删除成功")
                      fetchCountryList(1,10,country.languagesId)
                    }).catch(()=>{
                      message.error("删除失败")
                    })
                  }} 
                  title="确定要删除该国家/地区的附加信息？" 
                  content={"删除后，该国家/地区的顾客在结账时，将不会显示此附加信息"}
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
    total: 0
  });

  // 获取国家列表
  const fetchCountryList = (page:number,limit:number,lang:string)=>{
    setLoading(true)
    getList({
      page:page.toString(),
      limit:limit.toString(),
      languages_id:lang,
      ...country.condition,
    }).then((res:any)=>{
      setPagination({
        current:page,
        pageSize:limit,
        total:res.data.total,
      })
      setData(res.data.list)
    }).catch(err=>{

    }).finally(()=>{
        setLoading(false)
    })
  }

  useEffect(()=>{
    fetchCountryList(1,10,country.languagesId)
  },[country.languagesId,country.condition])

  return (
    <Scoped>
      <Card>
        <Flex wrap="wrap" gap={16} className="inquire" justify="space-between">
          <Flex gap={16}>
            <Space.Compact style={{width:"420px"}}>
              <DefaultSelect 
                value={searchType} 
                style={{height:"36px",width:"110px"}}
                options={[
                    { value: "2", label: '国家编码' },
                    { value: "3", label: '附加信息名称' },
                ]} 
                onChange={(value:string)=>{
                  setSearchType(value)
                  setSearchText("")
                }}
              />
              <MySearch 
                placeholder="搜索"
                value={searchText}
                onChange={(e:any)=>{
                  setSearchText(e.target.value)
                }}
                onSearch={(value:string)=>{
                  switch(searchType){
                    case "2":
                      country.setCondition({
                        ...country.condition,
                        keyword:"",
                        country_code:value,
                      })
                      break;
                    case "3":
                      country.setCondition({
                        ...country.condition,
                        country_code:"",
                        keyword:value,
                      })
                      break;
                  }
                }} 
              />
            </Space.Compact>
            <DefaultSelect style={{width:"120px"}} value="启用状态" options={[
              { value: '0', label: '关闭' },
              { value: '1', label: '开启' }
            ]} onChange={(value:string)=>{
              country.setCondition({
                ...country.condition,
                status:value,
              })
            }} />
            <DefaultSelect style={{width:"120px"}} value="填写要求" options={[
              { value: '0', label: '选填' },
              { value: '1', label: '必填' }
            ]} onChange={(value:string)=>{
              country.setCondition({
                ...country.condition,
                required:value,
              })
            }} />
          </Flex>
          <AddCountry refreshCountryList={fetchCountryList} />
        </Flex>
        <Flex className="condition-box" wrap gap={8} style={{marginTop:"12px",marginBottom:"12px"}}>
          {country.condition.required !== "-1" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
            country.setCondition({
                ...country.condition,
                required:"-1",
            })
          }}>
              <span className="color-474F5E font-14">
                填写要求：{country.condition.required == "1" ? "必填" : "选填"}
              </span>
          </Tag>}
          {country.condition.status !== "-1" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
            country.setCondition({
                ...country.condition,
                status:"-1",
            })
          }}>
              <span className="color-474F5E font-14">
                启用状态：{country.condition.status == "1" ? "开启" : "关闭"}
              </span>
          </Tag>}
          {country.condition.country_code !== "" && (<Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
            country.setCondition({
                ...country.condition,
                country_code:"",
            })
          }}>
              <span className="color-474F5E font-14">
                国家编码：{country.condition.country_code}
              </span>
          </Tag>)}
          {country.condition.keyword !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
            country.setCondition({
                ...country.condition,
                keyword:"",
            })
          }}>
              <span className="color-474F5E font-14">
                附加信息名称：{country.condition.keyword}
              </span>
          </Tag>}
        </Flex>
        {/*  */}
        <Table<DataType>
          columns={columns}
          dataSource={data}
          pagination={{
              ...pagination,
              showSizeChanger: true,
              onChange: (page, pageSize) => {
                fetchCountryList(page,pageSize,country.languagesId);
              },
          }}
          loading={loading}
        />
      </Card>
    </Scoped>
  )
}

export default observer(ListCard)

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