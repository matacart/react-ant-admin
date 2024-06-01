import { Space, Select, Input, Tag, Button } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import PriceRangeSelector from "../Select/PriceRangeSelector";
import MoreSelect from "../Select/MoreSelect";
import { result } from "lodash";
import { useState } from 'react';
import Nothing from "../Info/Nothing";
import type { TableColumnsType, TableProps } from 'antd'
import ProductList from "../List/ProductList";
import ProductListAjax from "../List/ProductListAjax";


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
type TagRender = SelectProps['tagRender'];


const options: SelectProps['options'] = [
    {
        value: 'gold',
        label: undefined
    },
    {
        value: 'lime',
        label: undefined
    },
    {
        value: 'green',
        label: undefined
    },
    {
        value: 'cyan',
        label: undefined
    },
];





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
export default function ProductsSelectCard() {
    const resultList=useState([]);

    return (
        <>
            <div className="products-select">
                <div className="products-select-items-wrap" style={{
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
                        <Space.Compact>
                            <Select
                                size='large'
                                defaultValue="全部"
                                style={{ width: 100 }}
                                listHeight={230}
                                options={[
                                    { value: '全部', label: '全部' },
                                    { value: '商品名称', label: '商品名称' },
                                    { value: '商品SPU', label: '商品SPU' },
                                    { value: '商品SKU', label: '商品SKU' },
                                    { value: '商品厂商', label: '商品厂商' },
                                    { value: '商品条码', label: '商品条码' },
                                    { value: '规格名称', label: '规格名称' },
                                    { value: '商品描述', label: '商品描述' },
                                ]}
                            />
                            <Search
                                size='large'
                                placeholder="" onSearch={onSearch} style={{ width: 200 }} />
                        </Space.Compact>
                        {/* 2 */}
                        <Select
                            size='large'
                            showSearch
                            style={{
                                minWidth: 140,
                            }}
                            placeholder="商品分类"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                {
                                    value: '2',
                                    label: 'Closed',
                                },
                                {
                                    value: '3',
                                    label: 'Communicated',
                                },
                                {
                                    value: '4',
                                    label: 'Identified',
                                },
                                {
                                    value: '5',
                                    label: 'Resolved',
                                },
                                {
                                    value: '6',
                                    label: 'Cancelled',
                                },
                            ]}
                        />
                        {/* 3 */}
                        <Select
                            size="large"
                            placeholder='标签'
                            mode="multiple"
                            tagRender={tagRender}
                            defaultValue={['gold', 'cyan']}
                            style={{
                                minWidth: 140
                            }}
                            options={options}
                        />
                        {/* 4 */}
                        <PriceRangeSelector />
                    </div>
                    <div
                        className="products-select-items-right"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px 12px',
                        }}>
                        {/* 5 */}
                        <MoreSelect />
                        {/* 6 */}
                        <Button size="large">编辑表头</Button>
                        {/* 7 */}
                        <Select
                            size='large'
                            defaultValue="全部"
                            style={{ width: 100 }}
                            listHeight={230}
                            options={[
                                { value: '全部', label: '全部' },
                                { value: '商品名称（A-Z）', label: '商品名称（A-Z）' },
                                { value: '商品名称（Z-A）', label: '商品名称（Z-A）' },
                                { value: '库存（从低到高）', label: '库存（从低到高）' },
                                { value: '库存（从高到低）', label: '库存（从高到低）' },
                                { value: '售价（从低到高）', label: '售价（从低到高）' },
                                { value: '售价（从高到低）', label: '售价（从高到低）' },
                                { value: '创建时间（从远到近）', label: '创建时间（从远到近）' },
                                { value: '创建时间（从近到远）', label: '创建时间（从近到远）' },
                            ]}
                        />
                    </div>
                </div>
            </div>
            {/* {(resultList.length > 0 ? 
            <div className="products-result-list">
                <div className="products-result-list-item">
                    
                </div>
            </div>:<Nothing/>)} */}
            {/* <Nothing/> */}

            {/* <ProductList/> */}
            <ProductListAjax/>

        </>
    );
}