import { Space, Select, Input, Tag, Button } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import { useState } from "react";
import OrdersListAjax from "../List/OrderListAjax";
import PriceRangeSelector from "../Select/PriceRangeSelector";
import MoreSelect from "../Select/MoreSelect";
import Icon from "@ant-design/icons";

// import OrderSelectComponent from "./SelectCeck";
import orders from './../../pages/Orders/PascalCase';





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
                  <div className="products-select-items-left" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                        {/* 1 */}
                        <Search  
  size="large" // 如果您想要一个较大的搜索框，这里可以保留；如果想要更紧凑的，可以改为 'small' 或 'middle'  
  placeholder="支持商品名称、SKU、用户邮箱、标签等快捷搜索"  
  onSearch={onSearch}  
  style={{ width: 920  }} // 控制搜索框的宽度  
/>
                      {/* 搜索功能 */}
                      {/* <OrderSelectComponent /> */}
                        
                    </div>
                    <div
                        className="products-select-items-right"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px 12px',
                        }}>
                         
                        {/* 7 */}
                        
                       




                        {/* <Select
                            size='large'
                            defaultValue="付款状态"
                            style={{ width: 96 }}
                            listHeight={300}                        
                            options={[
                                { value: '未付款', label: '未付款' },
                                { value: '付款中', label: '付款中' },
                                { value: '部分付款', label: '部分付款' },
                                { value: '已付款', label: '已付款' },
                                { value: '已退款', label: '已退款' },
                                { value: '部分退款', label: '部分退款' },
                                { value: '已授权', label: '已授权' },
                            ]}
                        />
                        <Select
                            size='large'
                            defaultValue="发货状态"
                            style={{ width: 96 }}
                            listHeight={300}                        
                            options={[
                                { value: '待发货', label: '待发货' },
                                { value: '已发货', label: '已发货' },
                                { value: '部分发货', label: '部分发货' },
                            ]}
                        /> */}
                        {/* 5 */}
                        <MoreSelect />
                        {/* 6 */}
                        <Button size="large">编辑表头</Button>
                        {/* 7 */}
                        <Select
                            size='large'
                            defaultValue="排序"
                            style={{ width: 96 }}
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
