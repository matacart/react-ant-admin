import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, GetProp, Input, message, Upload, UploadProps } from "antd"
import { useState } from "react";
import styled from "styled-components"


const { TextArea } = Input;
export default function ShortDescription() {

  return (
    <Scoped>
        <Card>
            <div className="color-242833">简短描述</div>
            <div className="color-474F5E">企业介绍和产品页面中使用的描述</div>
            <div className="input-box">
                <TextArea placeholder="简短描述" maxLength={150} showCount style={{ height: 70, resize: 'none' }} />
            </div>
        </Card>
    </Scoped>
  )
}

const Scoped = styled.div`
    margin-top: 20px;
    .input-box{
        margin-top: 12px;
        margin-bottom: 12px;
    }
`