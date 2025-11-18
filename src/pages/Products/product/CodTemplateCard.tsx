import product from "@/store/product/product";
import { Card, Flex } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ThemeTemplateManagement from "./ThemeTemplateManagement";
import DefaultSelect from "@/components/Select/DefaultSelect";

const CodTemplateCard = () =>{
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
                        <div>单页模板</div>
                        <ThemeTemplateManagement />
                    </Flex>
                </div>
                <DefaultSelect
                    style={{ width: "100%" }}
                    value={product.productInfo.template_id}
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

export default observer(CodTemplateCard)

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px
}
`