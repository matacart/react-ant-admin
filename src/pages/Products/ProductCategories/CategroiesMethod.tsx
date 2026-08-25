import categories from "@/store/product/categories";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Form, Radio, Tooltip } from "antd";
import { observer } from "mobx-react-lite";


const style: React.CSSProperties = {
    display: 'flex',
    gap: 12,
};

function CategroiesMethod() {

    return (
        <Card title="请选择商品分类的方式" className='product-data-card'>
            <Radio.Group
                style={style}
                value={categories.method}
                onChange={(e)=>{
                    categories.setMethod(e.target.value)
                }}
                options={[
                    { value: 0, label: '手动分类' },
                    { value: 1, label: <div>
                        <span>智能分类</span>
                        <Tooltip title="可设定自定义条件将商品自动添加至分类中">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined className="font-16" />
                            </span>
                        </Tooltip>
                    </div> },
                ]}
            />
        </Card>
    )
}
export default observer(CategroiesMethod)
