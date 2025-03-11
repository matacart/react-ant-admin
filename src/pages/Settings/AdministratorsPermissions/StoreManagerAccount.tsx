import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, Form, Input, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

export default function StoreManagerAccount() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return(
    <Scoped>
        <Card>
            <Flex justify="space-between">
                <div>
                    <div className="color-242833 font-w-600">店长账号</div>
                    <div className="color-474F5E">+8611001234567</div>
                    {/* <Flex align="center" className="font-12 color-474F5E"><span style={{marginRight:"4px"}}>https://yier-260i.myshopline.com</span><SuccessTag text="已连接" /></Flex> */}
                </div>
                <Button onClick={() => setIsModalOpen(true)}>换店长</Button>
            </Flex>
        </Card>
        {/*  */}
        <Modal title="店长账号" open={isModalOpen} onCancel={() => setIsModalOpen(false)} centered>
          <Form layout="vertical" style={{marginTop:"24px"}}>
            <Form.Item label={<div className="font-w-600 color-242833">当前店长</div>}>
              <div>008615107000736</div>
            </Form.Item>
            <Form.Item label={<div className="font-w-600 color-242833">新店长</div>}>
              <Input placeholder="请输入员工的邮箱或手机号" />
            </Form.Item>
          </Form>
        </Modal>
    </Scoped>
    
  );
}

const Scoped = styled.div`
   
`