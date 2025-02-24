import { Card, Col, Divider, Flex, Form, Input, Modal, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AddIcon } from "@/components/Icons/Icons";


function RemarkCard() {

    return (
            
        <Scoped>
            <Card title={<div className="">备注</div>}>
                <Input style={{height:"36px"}} placeholder="添加备注" />
                <div style={{marginTop:"8px"}} className="font-12 color-7A8499">备注内容不会展示给客户</div>
            </Card>
        </Scoped>
        
    )
}

export default RemarkCard


const Scoped = styled.div`
    
`