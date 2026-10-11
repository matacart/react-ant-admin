import { Card, ConfigProvider, Flex, Table, TableProps, Tag } from "antd";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import domainAndLang, { MarketLanguage } from "@/store/settings/markets/domainAndLang";
import AddLangModal from "./AddLangModal";
import { observer } from "mobx-react-lite";
import { MoreOutlined } from "@ant-design/icons";
import MyButton from "@/components/Button/MyButton";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import { toJS } from "mobx";

function LangCard() {

    const [data,setData] = useState<MarketLanguage[]>([]);

    const CustomHeaderCell = ({children,...restProps}: {children: ReactNode}) => {
        return (
          <th
            {...restProps}
            style={{
              background: '#FFFFFF',
              color: '#333',
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 16px',
              borderBottom: '1px solid #e8e8e8',
            }}
          >
            {children}
          </th>
        )
    }

    const columns: TableProps<any>['columns'] = [
        {
          title: '语言',
          dataIndex: 'iso',
          width: 300,
          render: (text, record) => {
            return (
              <div>
                <span>{text}</span>
                {record.defaultLanguage && <Tag color="default" style={{borderRadius:"12px",marginLeft:"10px"}}>默认语言</Tag>}
              </div>
            )
          }
        },
        {
          title: 'URL名称',
          dataIndex: 'iso',
          width: 300,
          render: (text, record) => {
            return (
              <div>{domainAndLang.otherInfo.mainDomain}/{text}</div>
            )
          }
        },
        // 只有多于一种语言时才展示操作列
        ...(data.length > 1 ? [
          {
            title: '操作',
            dataIndex: 'iso',
            width: 80,
            render: (text:string, record:MarketLanguage) => {
              return (
                <MyDropdown
                  tiggerEle={<MyButton text={<MoreOutlined />} style={{width:"32px",height:"32px",padding:"0",transform:"rotate(90deg)"}} />}
                  menu={{
                    items:record.defaultLanguage ? [
                      {key:"2",label:(
                        <div onClick={()=>removeLang(record)} className="color-D33612">从市场中移除</div>
                      )},
                    ] : [
                      {key:"1",label:(
                        <div onClick={()=>setDefaultLang(record)}>设为默认语言</div>
                      )},
                      {key:"2",label:(
                        <div onClick={()=>removeLang(record)} className="color-D33612">从市场中移除</div>
                      )},
                    ]
                  }}
                  placement={"bottomLeft"}
                />
              )
            }
          }
        ] : []),
    ];

    // 移除语言
    const removeLang = (record: MarketLanguage) => {
      const newMarketLanguageList = toJS(domainAndLang.marketLanguageList).filter((item) => item.iso !== record.iso);
      // 将下一个语言设为默认语言
      if(record.defaultLanguage && newMarketLanguageList.length > 0){
        newMarketLanguageList[0].defaultLanguage = true;
      }
      domainAndLang.setMarketLanguageList(newMarketLanguageList);
    }


    // 设为默认语言
    const setDefaultLang = (record: MarketLanguage) => {
      const newMarketLanguageList = toJS(domainAndLang.marketLanguageList).map((item) => item.iso === record.iso ? {...item,defaultLanguage:true} : {...item,defaultLanguage:false});
      domainAndLang.setMarketLanguageList(newMarketLanguageList);
    }

    useEffect(() => {
      setData(domainAndLang.marketLanguageList);
    }, [domainAndLang.marketLanguageList])

    return (
        <MyCard>
            <>
              <Flex style={{marginBottom:12}} justify="space-between" align="center">
                  <div>
                      <div className="font-w-500">市场语言</div>
                      <div className="font-12 color-62708D" style={{marginTop:4}}>客户访问该市场时可以使用的语言</div>
                  </div>
                  <AddLangModal />
              </Flex>
              <ConfigProvider
                  theme={{
                      components: {
                      Table: {
                          headerSplitColor: 'transparent',
                      },
                      },
                  }}
                  >
                  <Table 
                      dataSource={data}
                      columns={columns}
                      components={{header:{ cell: CustomHeaderCell }}} 
                      pagination={false}  
                  />
              </ConfigProvider>
            </>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .ant-table{
      border: 1px solid #eef1f7;
      border-radius: 6px;
      border-bottom: none;
    }
`;

export default observer(LangCard);
