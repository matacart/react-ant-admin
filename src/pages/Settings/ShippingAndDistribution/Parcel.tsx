import { Button, Card, Divider, Flex } from "antd";
import styled from "styled-components";

function Parcel() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between" align="center">
                    <div>
                        <div className="color-242833 font-16 font-w-600">已保存的包裹</div>
                        <div className="color-474F5E font-14" style={{marginTop:"4px"}}>使用包裹尺寸和重量，以便第三方承运商更准确的计算费率</div>
                    </div>
                    <div>
                        <Button className="submit-btn">添加包裹</Button>
                    </div>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default Parcel

const Scoped = styled.div`
    margin-bottom: 20px;
`
