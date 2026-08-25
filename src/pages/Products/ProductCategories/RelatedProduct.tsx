import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Flex } from "antd";
import { observer } from "mobx-react-lite";

function RelatedProduct() {

    return (
        <Card title="关联商品" className='product-data-card'>
            <Flex style={{margin:"80px 0"}} align="center" justify="center" gap={12} vertical >
                <h3 className="font-20 font-w-600" style={{ marginBottom: 0 }}>添加和管理分类下的关联商品</h3>
                <div className="color-666666">已添加的商品会在分类的页面中展示。</div>
                <DefaultButton text="选择商品" />
            </Flex>
        </Card>
    )
}
export default observer(RelatedProduct)
