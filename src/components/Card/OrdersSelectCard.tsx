import { Space, Select, Input, Tag, Button } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import { useState } from "react";
import OrdersListAjax from "../List/OrderListAjax";
import PriceRangeSelector from "../Select/PriceRangeSelector";
import MoreSelect from "../Select/MoreSelect";
import Icon from "@ant-design/icons";
import DropdownState from "./PaymentState";

// import OrderSelectComponent from "./SelectCeck";
import orders from './../../pages/Orders/PascalCase';
import PaymentState from "./PaymentState";
import DeliveryState from './DeliveryState';
import { useIntl } from "@umijs/max";





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
    const resultList=useState([]);
    return (
        <>
            <div className="Orders-select">
                <div className="Orders-select-items-wrap" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                }}>
                 
                  <div className="orider-select-items-title" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                     
                        <Search  
                size="large" // 如果您想要一个较大的搜索框，这里可以保留；如果想要更紧凑的，可以改为 'small' 或 'middle'  
                 placeholder={intl.formatMessage({ id:'order.select.text'})}
                 onSearch={onSearch}  
                 style={{ width: 920  }} // 控制搜索框的宽度  
/>
                     
                      <PaymentState /> 
                      <DeliveryState />
                      <MoreSelect />
                        
                     
                      <Button size="large"> {intl.formatMessage({ id:'order.button.edittable'})}</Button>
                     
                     <Select
                         size='large'
                         defaultValue={intl.formatMessage({ id:'order.button.sorting'})}
                         style={{ width: 75}}
                         listHeight={300}                        
                         options={[
                             { value: '订单号（升序）', label: '订单号（降序）' },
                             { value: '成单时间（最新到最旧）', label: '成单时间（最旧到最新）' },
                             { value: '支付时间（最新到最旧）', label: '支付时间（最旧到最新）' },
                             { value: '客服名称（A-Z)', label: '客服名称（Z-A)' },
                             { value: '付款状态（A-Z）', label: '付款状态（Z-A）' },
                             { value: '发货状态（A-Z）', label: '发货状态（Z-A）' },
                             { value: '售价（从高到低）', label: '售价（从高到低）' },
                             { value: '总价（高至低）', label: '总价（低至高）' },
                         ]}
                     />
                       
                    </div>
                    
                </div>
                
            </div>
            <OrdersListAjax />
             
        </>
    );
}
