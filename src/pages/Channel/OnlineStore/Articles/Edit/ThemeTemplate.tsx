import articles from "@/store/channel/website/articles";
import { Card, Select } from "antd";
import styled from "styled-components";


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    articles.setOldArticles({
        ...articles.oldArticles,
        template_id: value
    })
  };


  export default function ThemeTemplate() {
    return (
        <Scoped>
            <Card>
                <div className="title">
                    主题模板
                </div>
                <Select
                    defaultValue={articles.oldArticles.template_id??=""}
                    style={{ width: "100%" }}
                    onChange={handleChange}
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

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px
}
`