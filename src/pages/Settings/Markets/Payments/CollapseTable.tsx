import MySelect from "@/components/Select/MySelect";
import payments, { CountryPaymentInfo, Payment } from "@/store/settings/markets/payments";
import { Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";


interface DataType {
  channelCode: string;
  channelName: any;
  methodCode: string;
  methodName: any;
  useMarketCurrency: boolean;
}



function CollapseTable({item}:{item:CountryPaymentInfo}) {

  const [data, setData] = useState<DataType[]>([]);

  const [options,setOptions] = useState<{label:string,value:number}[]>([]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '支付服务商',
      dataIndex: 'channelCode',
      key: 'channelCode',
      width: 200,
      render: (value, record) => <div>{record.channelName?.value || '-'}</div>,
    },
    {
      title: '支付方式',
      dataIndex: 'methodCode',
      key: 'methodCode',
      width: 200,
      render: (value, record) => <div>{record.methodName?.value || '-'}</div>,
    },
    {
      title: '支付币种',
      dataIndex: 'useMarketCurrency',
      key: 'useMarketCurrency',
      align: 'right',
      width: 100,
      render: (value, record) => <>
        <MySelect
          style={{height:"36px"}}
          value={getUseMarketCurrency(record) ? 1 : 0}
          options={options}
          onChange={(value)=>handleChange(record,value)}
        />
      </>,
    },
  ];

  // 从 store 里取当前国家的 paymentList，建 channelCode → Payment 的索引
  const currentPaymentMap = (() => {
    const country = payments.newCountryPaymentInfos.find(
      (c) => c.countryCode === item.countryCode
    );
    return new Map(
      (country?.paymentList ?? []).map((p: Payment) => [p.channelCode, p])
    );
  })();

  const getUseMarketCurrency = (record: DataType): boolean => (currentPaymentMap.get(record.channelCode) as Payment)?.useMarketCurrency ?? record.useMarketCurrency;

   const handleChange = (record: DataType, value: number) => {

    const country = payments.newCountryPaymentInfos.find((c) => c.countryCode === item.countryCode);
   
    const baseList: Payment[] = country?.paymentList ?? item.paymentList;

    const newList = baseList.map((p:any) =>{
      const {channelName,methodName,supportMarketCurrency,supportStoreCurrency,...rest} = p;
      if(rest.channelCode === record.channelCode){
        return {
          ...rest,
          useMarketCurrency: value === 1,
        }
      }
      return rest
    })

    payments.updateCountryPaymentInfos({
      countryCode: item.countryCode,
      originalSystemPayment: country?.originalSystemPayment ?? false,
      paymentList: newList,
    });
  };

  useEffect(()=>{
     item && setData(item.paymentList)
  },[item])

  useEffect(()=>{
    const newOptions = payments.otherInfo.useLocalCurrency ? [
      {
        label: `当地币种：${payments.otherInfo.baseCurrency}`,
        value: 1,
      },
      {
        label: `店铺币种：${payments.otherInfo.storeCurrency}`,
        value: 0,
      },
    ] : [
      {
        label: `基准币种：${payments.otherInfo.baseCurrency}`,
        value: 1,
      },
      {
        label: `店铺币种：${payments.otherInfo.storeCurrency}`,
        value: 0,
      },
    ]
    setOptions(newOptions)
  },[payments.otherInfo.useLocalCurrency])

  return (
    <Scoped>
      <Table<DataType> 
        rowKey={(record) => record.channelCode}
        columns={columns} 
        dataSource={data}
        pagination={false}
      />
    </Scoped>
  )
}

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 4px;
        border-bottom: none;
    }
`;


export default observer(CollapseTable);
