import DefaultSelect from "@/components/Select/DefaultSelect";
import { Card } from "antd";
import styled from "styled-components";


const handleChange = (value: string) => {
    
};


export default function ThemeTemplate() {
    return (
        <Scoped>
            <Card>
                <div className="title">
                    主题模板
                </div>
                <DefaultSelect
                    value={'0'}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={[
                        { value: '0', label: '默认模板' },
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