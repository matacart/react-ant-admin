import { Space, Select, Input, Tag, Button } from "antd";
import type { MenuProps, SelectProps } from 'antd';
import { useMemo, useState } from "react";
import { useIntl } from "@umijs/max";
import SearchInput from "@/components/Input/SearchInput";
import CheckSelectClear from "@/components/Select/CheckSelectClear";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import orderList from "@/store/order/orderList";
import { observer } from "mobx-react-lite";
import EditTableHead from "./EditTableHead";
import OrdersMoreSelect from "./OrdersMoreSelect";
import LangSelect from "@/components/Select/LangSelect";


function OrdersSelectCard() {
    const intl = useIntl();

    // 付款状态
    const [paymentstatusOptions,setPaymentStatusOptions] = useState([
      { value: '1', label: '未付款',checked:false },
      { value: '2', label: '付款中',checked:false },
      { value: '3', label: '部分付款',checked:false },
      { value: '4', label: '已付款',checked:false },
      { value: '5', label: '已退款',checked:false },
      { value: '6', label: '部分退款',checked:false },
      { value: '7', label: '已授权',checked:false },
      { value: '8', label: '重复支付',checked:false }
    ])

    // 发货状态
    const [shippingStatusOptions,setShippingStatusOptions] = useState([
      { value: '1', label: '待发货',checked:false },
      { value: '2', label: '已发货',checked:false },
      { value: '3', label: '部分发货',checked:false },
    ])

    // 排序
    const items:MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div>订单号（升序）</div>
        ),
      },
      {
        key: '2',
        label: (
          <div>订单号（降序）</div>
        ),
      },
      {
        key: '3',
        label: (
          <div>成单时间（最新到最旧）</div>
        ),
      },
      {
        key: '4',
        label: (
          <div>成单时间（最旧到最新）</div>
        ),
      },
      {
        key: '5',
        label: (
          <div>支付时间（最新到最旧）</div>
        ),
      },
      {
        key: '6',
        label: (
          <div>支付时间（最旧到最新）</div>
        ),
      },
      {
        key: '7',
        label: (
          <div>客户名称（A-Z）</div>
        ),
      },
      {
        key: '8',
        label: (
          <div>客户名称（Z-A）</div>
        ),
      },
      {
        key: '9',
        label: (
          <div>付款状态（A-Z）</div>
        ),
      },
      {
        key: '10',
        label: (
          <div>付款状态（Z-A）</div>
        ),
      },
      {
        key: '11',
        label: (
          <div>发货状态（A-Z）</div>
        ),
      },
      {
        key: '12',
        label: (
          <div>发货状态（Z-A）</div>
        ),
      },
      {
        key: '13',
        label: (
          <div>总价（高至低）</div>
        ),
      },
      {
        key: '14',
        label: (
          <div>总价（低至高）</div>
        ),
      },
    ];

    const setLang = (lang:string)=>{
      orderList.setLanguages(lang)
    }

    useMemo(()=>{
      orderList.setTagsStatusList(
        [
          {
            id:0,
            title: "付款状态",
            label: paymentstatusOptions.filter(item=>item.checked).map(item=>item.label).join(","),
            value: paymentstatusOptions.filter(item=>item.checked).map(item=>item.value).join(",")
          },
          {
            id:1,
            title: "发货状态",
            label: shippingStatusOptions.filter(item=>item.checked).map(item=>item.label).join(","),
            value: shippingStatusOptions.filter(item=>item.checked).map(item=>item.value).join(",")
          }
        ]
      )
      
    },[paymentstatusOptions,shippingStatusOptions])

    return (
        <>
          <div className="Orders-select">
              <div
                className="Orders-select-items-wrap"
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap', // 不换行
                  gap: '12px 12px',
                  justifyContent: 'flex-start', // 从左开始排列
                  marginBottom: '10px',
                }}
              >
              <div style={{flex:1}}><SearchInput placeholder={intl.formatMessage({ id: 'order.select.text' })} /></div>
              <CheckSelectClear options={paymentstatusOptions} setStatusOptions={setPaymentStatusOptions} text="付款状态" style={{width:"180px",height:"36px"}}/>
              <CheckSelectClear options={shippingStatusOptions} setStatusOptions={setShippingStatusOptions} text="发货状态" style={{width:"180px",height:"36px"}}/>
              <LangSelect lang={orderList.languages} setLang={setLang} />
              <OrdersMoreSelect />
              <EditTableHead />
              {/* <TableEdit/> */}
              {/* 修改的 Select 组件 */}
              <DropdownSort items={items} styled={{maxHeight:"290px",overflowY:"auto"}} />
            </div>
          </div>
        </>
    );
}

export default observer(OrdersSelectCard)