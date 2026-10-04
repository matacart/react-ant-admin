import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import { Card, Flex, Form } from "antd";
import styled from "styled-components";
import MarketsEdit from "./MarketsEdit";

function MarketsCountry() {
    return (
        <MyCard>
            <Form layout="vertical">
                <Form.Item label={<span className="font-w-500">市场名称</span>} name="marketName">
                    <MyInput placeholder="例如：中国市场" />
                </Form.Item>
            </Form>
            <Flex justify="space-between">
                <div className="font-w-500">国家/地区</div>
                <MarketsEdit />
            </Flex>
            <Flex justify="center" align="center" className="color-474F5E" style={{height:"200px"}}>暂无国家/地区</Flex>
        </MyCard>
    )
}


const MyCard = styled(Card)`
    width: 100%;
    
`;


export default MarketsCountry;