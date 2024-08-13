import { Space, Select, Input, Tag, Button } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import { useState } from "react";
import PriceRangeSelector from "../Select/PriceRangeSelector";
import MoreSelect from "../Select/MoreSelect";
import Icon from "@ant-design/icons";

// import OrderSelectComponent from "./SelectCeck";
import orders from './../../pages/Orders/PascalCase';
import { useIntl } from "@umijs/max";
import DeliveryState from "@/pages/Orders/OrderActionButton/DeliveryState";
import PaymentState from "@/pages/Orders/OrderActionButton/PaymentState";



const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
type TagRender = SelectProps['tagRender'];



const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
        >
            {label}
        </Tag>
    );
};

export default function OrdersSelectCard() {
    const intl = useIntl();
    const [resultList, setResultList] = useState([]); // 初始化状态
    
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
          marginBottom: '12px',
        }}
      >
        <Search
          size="large"
          placeholder={intl.formatMessage({ id: 'order.select.text' })}
          onSearch={onSearch}
          style={{ width: 1200,  }}
        />
        <PaymentState />
        <DeliveryState />
        <MoreSelect />
        <Button size="large">{intl.formatMessage({ id: 'order.button.edittable' })}</Button>
        <Select
          size="large"
          defaultValue={intl.formatMessage({ id: 'order.button.sorting' })}
          style={{ width: 75 }}
          listHeight={300}
          options={[
            { value: '订单号（升序）', label: '订单号（升序）' },
            { value: '成单时间（最新到最旧）', label: '成单时间（最新到最旧）' },
            { value: '支付时间（最新到最旧）', label: '支付时间（最新到最旧）' },
            { value: '客服名称（A-Z)', label: '客服名称（A-Z)' },
            { value: '付款状态（A-Z）', label: '付款状态（A-Z）' },
            { value: '发货状态（A-Z）', label: '发货状态（A-Z）' },
            { value: '售价（从高到低）', label: '售价（从高到低）' },
            { value: '总价（高至低）', label: '总价（高至低）' },
          ]}
        />
      </div>
    </div>
             
        </>
    );
}
