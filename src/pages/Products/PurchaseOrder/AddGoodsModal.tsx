
import { Button, Col, ConfigProvider, Flex, Form, Input, message, Modal, Row, Select, Space } from 'antd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AddSupplier, getCountryList } from '@/services/y2/api';
import { useForm } from 'antd/es/form/Form';

const { Search } = Input;

function AddGoodsModal() {

    const [addGoodsOpen,setAddSupplierOpen] = useState(false);



    return(
        <Scoped>
            <div onClick={()=>{
                setAddSupplierOpen(true)
            }}>
                <Button color="default" variant="outlined">选择商品</Button>
            </div>
            {/* 供应商 */}
            <Modal
                width={860}
                title="选择商品/款式"
                destroyOnClose
                centered
                open={addGoodsOpen}
                onOk={() => {
                }}
                onCancel={() => {
                    setAddSupplierOpen(false)
                }}>
                    <div style={{height:"600px",overflowY:"scroll",overflowX:"hidden"}}>
                        <Flex>
                            <Space.Compact>
                                <Select
                                    size='large'
                                    defaultValue={0}
                                    style={{ width: 100}}
                                    listHeight={230}
                                    options={[
                                        { value: 0, label: '全部' },
                                        { value: 1, label: '商品名称' },
                                        { value: 2, label: '商品SPU' },
                                        { value: 3, label: '商品SKU' },
                                        { value: 4, label: '商品厂商' },
                                        { value: 5, label: '商品条码' },
                                        { value: 6, label: '规格名称' },
                                        { value: 7, label: '商品描述' },
                                    ]}
                                />
                                <Search
                                    size='large'
                                    placeholder=""  style={{ width: 200 }} />
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
                                dropdownMatchSelectWidth={false}
                                dropdownStyle={{ width: 190 }}
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: '无分类商品',
                                        style: { width: '100%' }, // 设置 option 宽度
                                    },
                                
                                ]}
                            />
                            {/* 3 */}
                            <ConfigProvider
                                theme={{
                                    // 2. 组合使用暗色算法与紧凑算法
                                    // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                                    components: {
                                        Select: {
                                            // optionPadding: '0px 0px',
                                            // showArrowPaddingInlineEnd: '0px',
                                        }
                                    },
                                }}>
                                <Select
                                    size="large"
                                    placeholder='标签'
                                    mode="multiple"
                                    style={{
                                        minWidth: 200
                                    }}
                                    // open={openTagsList}
                                    dropdownStyle={{padding:"0px"}}
                                    dropdownRender={(menu) => (
                                        <>
                                        {menu}
                                        {/* 1px solid #d7dbe7 */}
                                            <div style={{width:"100%",height:"1px",backgroundColor:"#d7dbe7"}}></div>
                                            <div style={{textAlign:"right",padding:"10px"}}>
                                                {/* 解决失去焦点事件优先级较高的问题 */}
                                                <Button onMouseDown={()=>{
                                                    // setOpenTagsList(false)
                                                    // setTags(str.slice(1))
                                                }} type="primary">
                                                确认
                                                </Button>
                                            </div>
                                            
                                        </>
                                    )}
                                    // options={options}
                                    // onChange={handleTagChange}
                                    // onFocus={()=>{setOpenTagsList(true)}}
                                    // onBlur={()=>{setOpenTagsList(false)}}
                                ></Select>
                            </ConfigProvider>
                        </Flex>
                        <div>
                            
                        </div>
                    </div>
            </Modal>
        </Scoped>
    )
}

export default AddGoodsModal;

const Scoped = styled.div`
    
    .add_supplier_btn{
        padding: 6px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

`



