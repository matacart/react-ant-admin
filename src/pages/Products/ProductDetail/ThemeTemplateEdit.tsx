import product from "@/store/product/product";
import { Card, Flex, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import ThemeTemplateManagement from "./ThemeTemplateManagement";

const ThemeTemplateEdit = () =>{
    const handleChange = (value: string) => {
        product.setProductInfo({
            ...product.productInfo,
            template_id:value
        })
    };

    return (
        <Scoped>
            <Card>
                <div className="title">
                    <Flex justify="space-between">
                        <div>主题模板</div>
                        <ThemeTemplateManagement />
                    </Flex>
                </div>
                <Select
                    value={product.productInfo.template_id}
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

export default observer(ThemeTemplateEdit)

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px
}
`