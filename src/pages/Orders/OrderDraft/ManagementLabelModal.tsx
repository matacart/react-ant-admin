import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SearchInput from "@/components/Input/SearchInput";
import MySelectIcon from "@/components/Select/MySelectIcon";
import { batchAddDraftOrderTags, batchAddOrderTags, getDraftOrderTagList, getOrderTagList } from "@/services/y2/api";
import order from "@/store/order/order";
import orderDraft from "@/store/order/orderDraft";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function ManagementLabelModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [optionalTags,setOptionalTags] = useState<any[]>([]);
    const [selectedTags,setSelectedTags] = useState<any[]>([]);

    const Ref = useRef<HTMLDivElement>(null)


    const [customerList,setCustomerList] = useState([]);


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

    function removeElements(arrA:any, arrB:any) {
        const setB = new Set(arrB.map((item:any) => item.tagName));  // 将数组 B 转换为 Set 提高查找效率
        return arrA.filter((item:any) => !setB.has(item.tagName)); // 过滤掉 A 中存在于 B 的元素
    }

    const submit = ()=>{
        setLoading(true);
        batchAddDraftOrderTags({
            draftIds:JSON.stringify([orderDraft.orderInfo.id??""]),
            tagNames:JSON.stringify(selectedTags.map(item=>item.tagName))
        }).then(res=>{
            orderDraft.setOrderInfo({
                ...orderDraft.orderInfo,
                tags:selectedTags.map(item=>item.tagName).join(",")
            })
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
             // 更新订单数据
             setLoading(false);
            setIsModalOpen(false);
        })
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
                getDraftOrderTagList("").then(res=>{
                    // setOptionalTags(res.data.optionalOrderTagList)
                    const newSelectedOrderTagList =  orderDraft.orderInfo.tags ? orderDraft.orderInfo.tags.split(",").map(item=>{
                        return {
                            referenceCount:1,
                            tagName:item,
                            updateTime:new Date().getTime(),
                        }
                    }):[]
                    const newOptionalOrderTagLis = removeElements(res.data.optionalOrderTagList,newSelectedOrderTagList)

                    setSelectedTags(newSelectedOrderTagList)
                    setOptionalTags(newOptionalOrderTagLis)
                }).catch(err=>{
                    console.log(err)
                })
            }}>管理</div>
            <Modal getContainer={()=>Ref.current!} title={<div>管理标签</div>} width={620} centered open={isModalOpen} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} loading={loading} onClick={submit} />
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
                    {selectedTags.length > 0 && <div>
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
                    </div>}
                    {/* 未选 */}
                    {optionalTags.length > 0 && <div>
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
                    </div>}
                    {selectedTags.length == 0 && optionalTags.length == 0 && <Flex className="no-tag color-7A8499" align="center" justify="center">暂无标签</Flex>}
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