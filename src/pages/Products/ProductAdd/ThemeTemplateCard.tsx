import { Card, Select } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const ThemeTemplateCard = () =>{
    return (
        <Scoped>
            <Card>
                <div className="title">
                    主题模板
                </div>
                <Select
                    style={{ width: "100%" }}
                    defaultValue={"0"}
                    options={[
                        { value: '0', label: '默认模板' },
                        { value: '1', label: 'v1' },
                        { value: '2', label: 'v2' },
                        { value: '3', label: 'v3' },
                    ]}
                />
            </Card>
        </Scoped>
    )
}

export default observer(ThemeTemplateCard)

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px
}
`