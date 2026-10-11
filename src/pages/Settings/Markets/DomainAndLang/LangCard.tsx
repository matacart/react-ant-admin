import { Card, ConfigProvider, Flex, Table, TableProps, Tag } from "antd";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import domainAndLang, { MarketLanguage } from "@/store/settings/markets/domainAndLang";
import AddLangModal from "./AddLangModal";
import { observer } from "mobx-react-lite";

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
        {
          title: '操作',
          dataIndex: 'currencyName',
          width: 80,
        },
    ];

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
