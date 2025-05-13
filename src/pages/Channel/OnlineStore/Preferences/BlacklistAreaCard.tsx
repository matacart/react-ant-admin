import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Flex, Tooltip} from "antd";
import styled from "styled-components";

function BlacklistAreaCard() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div>访问限制地区黑名单</div>
                    </Flex>
                    <DefaultButton text="添加限制地区" />
                </Flex>

                {/* content */}
                <div className="content-warp">
                    暂无数据

                </div>
            </Card>
        </Scoped>
    )
}

export default BlacklistAreaCard

const Scoped = styled.div`
    margin-bottom: 20px;

    .content-warp{
        margin-top: 20px;
    }
`
