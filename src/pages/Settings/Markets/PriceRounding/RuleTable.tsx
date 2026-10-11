import { Table, TableProps } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";
import { DataType } from "./PriceRounding";
import { RuleCell } from "./RuleCell";


function RuleTable({currencyRoundingRules,setCurrencyRoundingRules}: {currencyRoundingRules: DataType[],setCurrencyRoundingRules: (value: DataType[]) => void}) {

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


  const columns: TableProps<DataType>['columns'] = [
    {
      title: '币种',
      dataIndex: 'currencyName',
      width: 200,
    },
    {
      title: '尾数规则',
      dataIndex: 'roundingRule',
      width: 150,
      render: (text, record) => {
        return (
          <RuleCell
            currencyCode={record.currencyCode}
            value={text}
            onCommit={(currencyCode, value) => {
              const newRules = currencyRoundingRules.map((item) => {
                if (item.currencyCode === currencyCode) {
                  return {...item, roundingRule: value.toString()};
                }
                return item;
              });
              setCurrencyRoundingRules(newRules);
            }}
          />
        )
      }
    }
  ];

  return (
    <Scoped>
      <Table 
        columns={columns} 
        components={{header:{ cell: CustomHeaderCell }}} 
        pagination={false} 
        dataSource={currencyRoundingRules}
        scroll={{
          y: 560
        }} 
      />
    </Scoped>
  );
}

const Scoped = styled.div`
    .ant-table{
      border: 1px solid #eef1f7;
      border-radius: 6px;
      border-bottom: none;
    }
`

export default RuleTable;