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
      { value: '1', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.notpaid' }),checked:false },
      { value: '2', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.paying' }),checked:false },
      { value: '3', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.partpaid' }),checked:false },
      { value: '4', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.paid' }),checked:false },
      { value: '5', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.refunded' }),checked:false },
      { value: '6', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.partrefunded' }),checked:false },
      { value: '7', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.authorized' }),checked:false },
      { value: '8', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.duplicatepayment' }),checked:false }
    ])

    // 发货状态
    const [shippingStatusOptions,setShippingStatusOptions] = useState([
      { value: '1', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.notshipped' }),checked:false },
      { value: '2', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.shipped' }),checked:false },
      { value: '3', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.partshipped' }),checked:false },
    ])

    // 排序
    const items:MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.orderno.asc' })}</div>
        ),
      },
      {
        key: '2',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.orderno.desc' })}</div>
        ),
      },
      {
        key: '3',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.createdate.newtoold' })}</div>
        ),
      },
      {
        key: '4',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.createdate.oldtonew' })}</div>
        ),
      },
      {
        key: '5',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.paydate.newtoold' })}</div>
        ),
      },
      {
        key: '6',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.paydate.oldtonew' })}</div>
        ),
      },
      {
        key: '7',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.customername.atoz' })}</div>
        ),
      },
      {
        key: '8',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.customername.ztoa' })}</div>
        ),
      },
      {
        key: '9',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.paymentstatus.atoz' })}</div>
        ),
      },
      {
        key: '10',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.paymentstatus.ztoa' })}</div>
        ),
      },
      {
        key: '11',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.shippingstatus.atoz' })}</div>
        ),
      },
      {
        key: '12',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.shippingstatus.ztoa' })}</div>
        ),
      },
      {
        key: '13',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.totalprice.hightolow' })}</div>
        ),
      },
      {
        key: '14',
        label: (
          <div>{intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.sort.totalprice.lowtohigh' })}</div>
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
            title: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.paymentstatus' }),
            label: paymentstatusOptions.filter(item=>item.checked).map(item=>item.label).join(","),
            value: paymentstatusOptions.filter(item=>item.checked).map(item=>item.value).join(",")
          },
          {
            id:1,
            title: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.shippingstatus' }),
            label: shippingStatusOptions.filter(item=>item.checked).map(item=>item.label).join(","),
            value: shippingStatusOptions.filter(item=>item.checked).map(item=>item.value).join(",")
          }
        ]
      )
    },[paymentstatusOptions,shippingStatusOptions])

    // 当语言变化时，更新选项
    useMemo(() => {
        setPaymentStatusOptions([
            { value: '1', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.notpaid' }), checked: false },
            { value: '2', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.paying' }), checked: false },
            { value: '3', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.partpaid' }), checked: false },
            { value: '4', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.paid' }), checked: false },
            { value: '5', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.refunded' }), checked: false },
            { value: '6', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.partrefunded' }), checked: false },
            { value: '7', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.authorized' }), checked: false },
            { value: '8', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.duplicatepayment' }), checked: false }
        ]);
        setShippingStatusOptions([
            { value: '1', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.notshipped' }), checked: false },
            { value: '2', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.shipped' }), checked: false },
            { value: '3', label: intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.partshipped' }), checked: false },
        ]);
    }, [intl]);

    return (
        <>
          <div className="Orders-select">
            <div
              className="Orders-select-items-wrap"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px 12px',
                justifyContent: 'flex-start', // 从左开始排列
                marginBottom: '10px',
              }}
            >
              <div style={{flex:1}}>
                <SearchInput placeholder={intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.search' })} />
              </div>
              <CheckSelectClear options={paymentstatusOptions} setStatusOptions={setPaymentStatusOptions} text={intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.paymentstatus' })} style={{width:"180px",height:"36px"}}/>
              <CheckSelectClear options={shippingStatusOptions} setStatusOptions={setShippingStatusOptions} text={intl.formatMessage({ id: 'orders.orderList.ordersSelectCard.shippingstatus' })} style={{width:"180px",height:"36px"}}/>
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