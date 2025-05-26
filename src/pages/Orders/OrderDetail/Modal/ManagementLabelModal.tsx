import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SearchInput from "@/components/Input/SearchInput";
import MySelectIcon from "@/components/Select/MySelectIcon";
import { batchAddOrderTags, getOrderTagList } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function ManagementLabelModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [optionalTags,setOptionalTags] = useState<any[]>([]);
    const [selectedTags,setSelectedTags] = useState<any[]>([]);

    const Ref = useRef<HTMLDivElement>(null)


    const [customerList,setCustomerList] = useState([
        { label: 'John', value: 'Doe', email: 'john@example.com', tel: '123-456-7890' },
        { label: 'John1', value: 'Doe1', email: 'john@example.com', tel: '123-456-7890' },
        { label: 'John2', value: 'Doe2', email: 'john@example.com', tel: '123-456-7890' },
        { label: 'John3', value: 'Doe3', email: 'john@example.com', tel: '123-456-7890' },
    ]);


    const options = [
        {
          value: '1',
          label: '默认排序',
        },
        {
          value: '2',
          label: '按热度排序',
        },
    ];

    const submit = ()=>{
        // console.log(selectedTags.map(item=>item.tagName))
        batchAddOrderTags({
            orderIds:JSON.stringify([order.orderInfo.order_id]),
            tagNames:JSON.stringify(selectedTags.map(item=>item.tagName))
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{

        })
        // 更新订单数据
        setIsModalOpen(false);
    }

    const cancel = () => {
        setIsModalOpen(false);
    };


    useEffect(()=>{
        // 获取标签列表
    },[])

    return (
        <Scoped ref={Ref}>
            <div className="font-14 color-356DFF font-w-500 cursor-pointer" onClick={()=>{
                setIsModalOpen(true)
                getOrderTagList(order.orderInfo.order_id).then(res=>{
                    setOptionalTags(res.data.optionalOrderTagList)
                    setSelectedTags(res.data.selectedOrderTagList)
                }).catch(err=>{
                    console.log(err)
                })
            }}>管理</div>
            <Modal getContainer={()=>Ref.current!} title={<div>管理标签</div>} width={620} centered open={isModalOpen} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Flex gap={6} style={{marginTop:"20px"}}>
                    <SearchInput style={{width:"100%"}} placeholder={"创建或搜索标签"} />
                    <MySelectIcon options={options} value={"1"} style={{height:"36px"}} />
                </Flex>
                <Flex className="tags-box" vertical>
                    {/* 已选 */}
                    <div>
                        <div style={{marginBottom:"8px"}}>已选</div>
                            
                        <Row gutter={[0,8]}>
                        {selectedTags.map((item:any)=>{
                            return(
                                <Col span={24}>
                                    <Checkbox style={{width:"100%"}} checked={true} onClick={()=>{
                                        setOptionalTags([...optionalTags,item])
                                        setSelectedTags(selectedTags.filter((tag:any)=>tag.tagName !== item.tagName))
                                    }}>{item.tagName}</Checkbox>
                                </Col>
                            )
                        })}
                        </Row>
                    </div>
                    {/* 未选 */}
                    <div>
                        <div style={{marginBottom:"8px",marginTop:"20px"}}>可选</div>
                        <Row gutter={[0,8]}>
                            {optionalTags.map((item:any)=>{
                                return(
                                    <Col span={24}>
                                        <Checkbox style={{width:"100%"}} checked={false} onClick={()=>{
                                            setSelectedTags([...selectedTags,item])
                                            setOptionalTags(optionalTags.filter((tag:any)=>tag.tagName !== item.tagName))
                                        }}>{item.tagName}</Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                    {/* <Flex className="no-tag color-7A8499" align="center" justify="center">暂无标签</Flex> */}
                </Flex>
            </Modal>
        </Scoped>
    )
}


const Scoped = styled.div`
    .tags-box{
        padding: 12px;
        min-height: 400px;
        .no-tag{
            width: 100%;
            font-weight: 500;
        }
    }
`



export default ManagementLabelModal