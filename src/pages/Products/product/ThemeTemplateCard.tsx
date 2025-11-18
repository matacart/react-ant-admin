import DefaultSelect from "@/components/Select/DefaultSelect";
import product from "@/store/product/product";
import { Card, Flex, Select } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const ThemeTemplateCard = () =>{

    const handleChange = (value: string) => {
        // product.setProductInfo({
        //     ...product.productInfo,
        //     template_id:value
        // })
    };

    return (
        <Scoped>
            <Card>
                <div className="title">
                    <Flex justify="space-between">
                        <div>主题模板</div>
                    </Flex>
                </div>
                <DefaultSelect
                    style={{ width: "100%" }}
                    value={'0'}
                    onChange={handleChange}
                    options={[
                        { value: '0', label: '默认模板' },
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