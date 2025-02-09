import { Button, Card, Checkbox, Divider, Flex } from "antd";
import styled from "styled-components";

function TaxCollectionMethod() {

    return (
        <Scoped>
            <Card>
                <div>
                    <Checkbox><span className="color-242833 font-16 font-w-600">自定义运费</span></Checkbox>
                    <div className="color-474F5E font-14" style={{marginTop:"12px"}}>对运费收的税包含在运费中</div>
                </div>
            </Card>
        </Scoped>
    )
}

export default TaxCollectionMethod

const Scoped = styled.div`
    margin-bottom: 20px;

    .ant-checkbox{
        position: relative;
        top: 1px;
    }
`
