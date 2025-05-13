import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Checkbox, Divider, Flex, Radio, Tooltip} from "antd";
import styled from "styled-components";

function IPAddressAccessCard() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>IP地址访问名单</div>
                    </Flex>
                    <DefaultButton text="添加IP" />
                </Flex>
            </Card>
        </Scoped>
    )
}

export default IPAddressAccessCard

const Scoped = styled.div`
    margin-bottom: 20px;
`
