import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";


const { TextArea } = Input;
export default function Remark() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Scoped>
            <Card title="备注">
                <div className="button-box">
                    <Button onClick={()=>setIsModalOpen(true)} className="button-box-item"><PlusOutlined />添加备注</Button>
                </div>
            </Card>

            {/*  */}
            <ScopedModal title="添加备注" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="remark-label color-242833">客户备注:</div>
                <div>
                    <TextArea rows={6} showCount placeholder="备注" maxLength={1000} />
                </div>
                <div className="remark-tip color-7A8499">仅后台管理员可见，将不会展示给客户</div>
            </ScopedModal>
        </Scoped>
    )
}

const Scoped = styled.div`
    .button-box{
        .button-box-item{
            width: 100%;

        }
    }
`

const ScopedModal = styled(Modal)`
    .remark-label{
        margin: 6px 0;
        margin-top: 12px;
    }
    .remark-tip{
        margin-top: 12px;
    }
`