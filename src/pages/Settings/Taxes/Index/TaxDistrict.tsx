import MyInput from "@/components/Input/MyInput";
import { updateCountryTaxStatus } from "@/services/y2/apiTax";
import taxesList, { TaxCountry } from "@/store/settings/taxes/taxesList";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Input, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";


function TaxDistrict({loading}:{loading:boolean}) {

  const [keyWord,setKeyWord] = useState('');

  // 存储每行的 loading 状态，key 为 country_id
  const [switching, setSwitching] = useState<Record<string, boolean>>({});

  const [data,setData] = useState<TaxCountry[]>([])

  const handleChange = (page:any)=>{
    taxesList.setPagination({
        ...taxesList.pagination,
        current:page.current,
    })
  }

  const columns: TableProps<TaxCountry>['columns'] = [
      {
        title: '征收',
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => <span onClick={(e)=>e.stopPropagation()}>
          <Switch loading={switching[record.country_id]} checked={text} onChange={(checked)=>{
            setSwitching({...switching,[record.country_id]:true})
            updateCountryTaxStatus({
              langId:taxesList.languagesId,
              countryId:record.country_id,
              status:checked?"1":"0",
            }).then((res)=>{
              if(res.code != "SUCCESS"){
                return
              }
              const newCountry = taxesList.taxCountryList.map(item=>{
                if(item.country_id == record.country_id){
                    return {...item,status:checked}
                }
                return item
              })
              taxesList.setTaxCountryList(newCountry)
            }).finally(()=>{
              setSwitching({...switching,[record.country_id]:false})
            })
          }} />
        </span>,
      },
      {
        title: '国家/地区',
        dataIndex: 'country_name',
        key: 'country_name',
        render: (text) => <div>{text}</div>
      },
      // {
      //   title: '操作',
      //   dataIndex: 'country_id',
      //   key: 'country_id',
      //   render: (_, record) => (
      //     <Space size="middle">
      //         {/* <EditOutlined style={{fontSize:"18px",cursor:"pointer"}} /> */}
      //         <DeleteOutlined style={{color:"red",fontSize:"18px",cursor:"pointer"}} />
      //     </Space>
      //   ),
      // },
  ];

  useEffect(()=>{
    setData(taxesList.taxCountryList)
  },[taxesList.taxCountryList])

  return (
      <Scoped>
          <Card>
              <MyInput className="input-search" value={keyWord} onChange={(e:any)=>setKeyWord(e.target.value)} suffix={<SearchOutlined onClick={()=>taxesList.setKeyWord(keyWord)} />} placeholder="按名称或代码搜索国家或地区" />
              <Table<TaxCountry> 
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={{...taxesList.pagination,showSizeChanger:false}} 
                onChange={handleChange}
                onRow={(record) => ({
                  onClick: () => {
                    history.push(`/settings/taxes/${record.country_id}/${taxesList.languagesId}`)
                  },
                })}
              />
          </Card>
      </Scoped>
  )
}

export default observer(TaxDistrict)

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
        margin-bottom: 20px;
    }
    .input-search{
        margin-bottom: 20px;
    }
   
`
