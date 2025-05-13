import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Flex, Tooltip} from "antd";
import styled from "styled-components";

function RobotsFileManagementCard() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>Robots.txt管理</div>
                    </Flex>
                    <DefaultButton text="前往设置" />
                </Flex>
            </Card>
        </Scoped>
    )
}

export default RobotsFileManagementCard

const Scoped = styled.div`
    margin-bottom: 20px;

    /* .content-warp{
        margin-top: 20px;
    } */
`
