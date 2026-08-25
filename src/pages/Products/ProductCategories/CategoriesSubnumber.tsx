
import { Card, Flex, Form, Switch } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import categories from "@/store/product/categories"
import DefaultSelect from "@/components/Select/DefaultSelect"

 function CategoriesSubnumber(){

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">共享信息</span>
                    {/* <Link to='#'>编辑</Link> */}
                </div>
                <Form layout="vertical">
                    <Form.Item
                        label={
                            <div className="label-content between">
                                <span>数据归属</span>
                            </div>
                        } >
                        <DefaultSelect
                            style={{ width: "100%", height: "36px" }}
                            placeholder="数据归属"
                            value={categories.categoriesInfo.is_sys.toString()}
                            options={[
                                { value: "0", label: '商户自建' },
                                { value: "1", label: '平台自建' },
                            ]}
                            onChange={(e)=>{
                                categories.setCategoriesInfo({
                                    ...categories.categoriesInfo,
                                    is_sys:e
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between">
                            <span>子号共享</span>
                            <Switch checked={categories.categoriesInfo.is_share == 1?true:false} onChange={(e)=>{
                                categories.setCategoriesInfo({
                                    ...categories.categoriesInfo,
                                    is_share: e ? 1 : 0
                                })
                            }} />
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}
export default observer(CategoriesSubnumber)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}

.ant-form-item{
    margin-bottom: 20px;
    &:last-child{
        margin-bottom: 0;
    }
}

:where(.css-dev-only-do-not-override-no4izc).ant-form-item {
    margin-bottom: 0;
}

`
