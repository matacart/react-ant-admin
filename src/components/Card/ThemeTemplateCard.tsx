import { Card, Select } from "antd";
import styled from "styled-components";


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };


  export default function ThemeTemplateCard() {
    return (
        <Scoped>
            <Card>
                <div className="title">
                    主题模板
                </div>
                <Select
                    defaultValue="默认模板"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={[
                        { value: 'default', label: '默认模板' },

                    ]}
                />
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px
}
`