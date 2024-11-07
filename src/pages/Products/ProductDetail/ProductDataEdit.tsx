import { Card, Form, Input } from "antd";
import TinymceEditor from "@/components/MCE/TinymceEditor";
import { useEffect } from "react";
import oldStore from "@/store/oldStore";
import tinymce from "public/tinymce/tinymce";

const { TextArea } = Input;
const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  oldStore.setTitle(e.target.value)
  
};


function ProductDataEdit(){
    const [form] = Form.useForm();
    useEffect(()=>{
      // console.log(oldStore.content1)
      
    },[])

    return (
      <Card title="商品信息" className='product-data-card'>
        <Form layout='vertical' className='product-form' form={form}>
          <Form.Item
            name="title"
            label="商品标题"
            initialValue={oldStore.title}
          >
            <Input
              value={oldStore.title}
              onChange={handleTitleChange}
            />
          </Form.Item>
          <Form.Item 
            name="resume"
            label='商品摘要'
            initialValue={oldStore.content}
          >
            <TextArea
              showCount
              maxLength={400}
              onBlur={(e) => {
                // newStore.resume = e.target.value;
                oldStore.setContent(e.target.value);
              }}
              style={{
                resize: 'none',
                height:'35px',
              }}
              value={oldStore.content}
              placeholder='请用简短的文字描述本商品'
            />
          </Form.Item>
          <Form.Item label='商品描述'>
            <TinymceEditor prop={oldStore}/>
          </Form.Item>
        </Form>
      </Card>
    );
  }
  
  export default ProductDataEdit;