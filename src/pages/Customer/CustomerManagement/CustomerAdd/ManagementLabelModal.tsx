import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SearchInput from "@/components/Input/SearchInput";
import MySelectIcon from "@/components/Select/MySelectIcon";
import { batchAddOrderTags, getOrderTagList } from "@/services/y2/api";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function ManagementLabelModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const Ref = useRef<HTMLDivElement>(null)

    const submit = ()=>{
      
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
                <Flex className="tags-box" vertical justify="center">
                    <Flex className="no-tag color-7A8499" align="center" justify="center">暂无标签</Flex>
                </Flex>
            </Modal>
        </Scoped>
    )
}


const Scoped = styled.div`
    .tags-box{
        padding: 12px;
        min-height: 200px;
        .no-tag{
            width: 100%;
            font-weight: 500;
        }
    }
`



export default ManagementLabelModal