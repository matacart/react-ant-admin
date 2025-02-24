import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, GetProp, Input, message, Upload, UploadProps } from "antd"
import { useState } from "react";
import styled from "styled-components"


const { TextArea } = Input;
export default function Slogan() {

  return (
    <Scoped>
        <Card>
            <div className="color-242833">标语</div>
            <div className="color-474F5E">通常与Logo一起使用的品牌主张</div>
            <div className="input-box">
                {/* <Input className="input" showCount maxLength={80} onChange={()=>{}} /> */}
                <TextArea  placeholder="标语" maxLength={80} showCount style={{ height: 70, resize: 'none' }} />
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
    /* .input{
        min-height: 70px;
    } */
`