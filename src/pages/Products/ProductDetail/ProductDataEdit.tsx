import { Card, Form, Input } from "antd";
import newStore from '@/store/newStore';
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import TinymceEditor from "@/components/MCE/TinymceEditor";

const { TextArea } = Input;

interface Props {
  productDetail: {
    title: string;
    // 其他属性...
  };
}

function ProductDataEdit({ productDetail }: Props) {
  const [form] = Form.useForm();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    form.setFieldsValue({ title: newValue });
    // 更新 store 或其他状态管理
    newStore.title = newValue;
  };

  return (
    <Card title="商品信息" className='product-data-card'>
      <Form layout='vertical' className='product-form' form={form}>
        <Form.Item
          name="title"
          label="商品标题"
          initialValue={productDetail.title}
        >
          <Input
            value={productDetail.title}
            onChange={handleTitleChange}
          />
        </Form.Item>
        <Form.Item 
          name="resume"
          label='商品摘要'
        >
          <TextArea
            showCount
            maxLength={400}
            onBlur={(e) => {
              newStore.resume = e.target.value;
            }}
            style={{
              resize: 'none',
              height:'35px',
            }}
            value={newStore.resume}
            placeholder='请用简短的文字描述本商品'
          />
        </Form.Item>
        <Form.Item label='商品描述'>
          <TinymceEditor />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default observer(ProductDataEdit);