import { Button, Card, Divider, Flex, Form, Input, Modal, Select, Space } from "antd"
import styled from "styled-components"
import { layout } from '@/app.bak';
import { useState } from "react";


const { Search } = Input;
function ApplicableGoods() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Flex justify="space-between" align="center">
                    <div className="color-242833 font-16 font-w-600">适用商品</div>
                    <Button style={{height:"36px"}} onClick={()=>setIsModalOpen(true)}>编辑商品</Button>
                </Flex>
                <Flex vertical align="center" className="content-box">
                    <div className="color-474F5E">暂无数据</div>
                    <div style={{marginTop:"12px"}}>
                        <Button type="primary" style={{height:"36px"}} onClick={()=>setIsModalOpen(true)}>添加商品</Button>
                    </div>
                </Flex>
            </Card>
            {/* 商品 */}
            <Modal centered title={false} width={860} open={isModalOpen} onOk={()=>{}} onCancel={()=>setIsModalOpen(false)}>
                <ScopedModal>
                    <div>选择商品</div>
                    {/* select */}
                    <Flex className="select-box">
                        <Space.Compact style={{height:36}}>
                            <Select
                                defaultValue={0}
                                style={{ width: 100 ,height:36}}
                                listHeight={230}
                                options={[
                                    { value: 0, label: '商品名称' },
                                    { value: 1, label: '商品SKU' },
                                    { value: 2, label: '商品厂商' }
                                ]}
                                onChange={()=>{}}
                            />
                            <Search size='large' placeholder="" onSearch={()=>{}} style={{width: 220,height:36}} />
                        </Space.Compact>
                        {/* <Select
                            placeholder={<div className='color-474F5E font-14'>商品分类</div>}
                            showSearch
                            suffixIcon={isFocus?<img src="/icons/Search1.svg" />:<img src="/icons/Suffix1.svg" />}
                            style={{
                                minWidth: 140,
                                height:36,
                                lineHeight:36,
                                fontSize:14
                            }}
                            value={"商品分类"}
                            dropdownStyle={{padding:"6px 0px"}}
                            options={options}
                            onDropdownVisibleChange={(open)=>{
                                open?setIsFocus(true):setIsFocus(false)
                            }}
                            onSelect={()=>{

                            }}
                        ></Select> */}
                        <Button>重置</Button>
                    </Flex>
                </ScopedModal>
                {/* table */}
            </Modal>
        </Scoped>
    )
}

export default ApplicableGoods

const Scoped = styled.div`
    .content-box{
        margin-bottom: 12px;
    }
`

const ScopedModal = styled.div`
    .select-box{
        .ant-input{
        height: 36px;
        }
        .ant-btn{
            height: 36px;
        }
    }
`