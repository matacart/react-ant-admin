import MyAutoComplete from "@/components/AutoComplete/MyAutoComplete";
import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ButtonDropdownSecondary from "@/components/Dropdown/ButtonDropdownSecondary";
import DefaultInput from "@/components/Input/DefaultInput";
import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";
import SearchInput from "@/components/Input/SearchInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import MySelect from "@/components/Select/MySelect";
import MySelectIcon from "@/components/Select/MySelectIcon";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import FormItem from "antd/es/form/FormItem";
import { useRef, useState } from "react";
import { styled } from 'styled-components';


function ManagementLabelModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

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
        form.submit()
        console.log(form.getFieldsValue())
        // 更新订单数据
        setIsModalOpen(false);
    }

    const cancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <Scoped ref={Ref}>
            <div className="font-14 color-356DFF font-w-500 cursor-pointer" onClick={()=>setIsModalOpen(true)}>管理</div>
            <Modal getContainer={()=>Ref.current!} title={<div>管理标签</div>} width={620} centered open={isModalOpen} onOk={handleOk} onCancel={cancel} 
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
                <Flex className="tags-box">
                    <Flex className="no-tag color-7A8499" align="center" justify="center">暂无标签</Flex>
                </Flex>
            </Modal>
        </Scoped>
    )
}


const Scoped = styled.div`
    .tags-box{
        min-height: 400px;
        .no-tag{
            width: 100%;
            font-weight: 500;
        }
    }
`



export default ManagementLabelModal