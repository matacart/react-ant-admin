import PrimaryButton from "@/components/Button/PrimaryButton";
import { CopyIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import { StarOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Space } from "antd";
import styled from "styled-components";

const RecallOfMail = () => {


    return (
        <MyCard>
            <div className='title'>
                发送链接给客户，以便于继续购买
            </div>
            <Flex gap={12}>
                <Space.Compact block className="input-space">
                    <MyInput style={{ width: '100%' }} disabled defaultValue="https://ant.design" />
                    <Button className="input-space-icon" icon={<CopyIcon />} />
                </Space.Compact>
                <PrimaryButton  text="发送召回邮件" />
            </Flex>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title {
        margin-bottom: 12px;
        font-weight: 700;
    }

    .input-space-icon{
        width: 36px;
        height: 36px;
    }
`


export default RecallOfMail;