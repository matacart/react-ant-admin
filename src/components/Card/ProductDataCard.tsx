import { Card, Form, Input } from "antd";
import './ProductDataCard.scss'
import TinymceEditor from '../MCE/TinymceEditor'
import newStore from '@/store/newStore'
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function ProductDataCard() {
    return (
        <Card title="商品信息" className='product-data-card'>
            <Form layout='vertical' className='product-form'>
                <Form.Item
                name="title"
                required
                label="商品标题"
                    rules={[
                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('请输入商品标题')) },
                    ]}
                >
                    <Input 
                    onChange={(e) => {
                        newStore.setTitle(e.target.value);
                    }}
                    placeholder="例如：冬季，毛衣" />
                </Form.Item>
                <Form.Item 
                name="resume"
                required
                label='商品摘要'>
                    <TextArea showCount maxLength={400} onBlur={(e)=>{
                        newStore.resume=e.target.value;
                    }}
                        style={{
                            resize: 'none'
                        }}
                        value={newStore.resume}
                        placeholder='请用简短的文字描述本商品'
                    >
                    </TextArea>
                </Form.Item>
                <Form.Item label='商品描述'>
                    {/* 富文本编辑器 */}
                    <TinymceEditor/>
                </Form.Item>
            </Form>


        </Card>
    )
}

export default observer(ProductDataCard);