import DefaultButton from "@/components/Button/DefaultButton";
import SimpleCard from "@/components/Card/SimpleCard";
import DefaultTag from "@/components/Tag/DefaultTag";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Input, Radio, Tooltip } from "antd";
import styled from "styled-components";

function EmbeddedPOSCard(){

    const content = (
        <Flex justify="space-between">
            <div>
                <Flex align="center">
                    <div style={{marginRight:"8px"}} className="color-242833">将应用嵌入 MATACART POS</div>
                    <DefaultTag text="未嵌入" />
                </Flex>
                <div style={{marginTop:"4px"}} className="color-474F5E">使用 App Bridge 在 MATACART POS 加载您的应用。</div>
            </div>
            <DefaultButton text={"开启"} />
        </Flex>
    )
    return(
        <Scoped>
            <SimpleCard title={<div className="font-w-500">嵌入 MATACART POS</div>} content={content} />
        </Scoped>
    )
}

export default EmbeddedPOSCard;

const Scoped = styled.div`
    
    
`