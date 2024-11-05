import { Card, Form, Input } from "antd";
import newStore from '@/store/newStore';
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import TinymceEditor from "@/components/MCE/TinymceEditor";
import { values } from 'lodash';

const { TextArea } = Input;

interface Props {
  productDetail: {
    title: string;
    meta_title:string;
    meta_description:string;
    // 其他属性...
  };
}

function ProductDataEdit() {
    const [form] = Form.useForm();
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      newStore.title = e.target.value;
      // console.log(e.target.value);
      // form.setFieldsValue({ title: newValue });
      // 更新 store 或其他状态管理
      //  = newValue;
      // newStore.desc = 
      console.log(newStore)
    };
  
    return (
      <Card title="商品信息" className='product-data-card'>
        <Form layout='vertical' className='product-form' form={form}>
          <Form.Item
            name="title"
            label="商品标题"
            initialValue={newStore.title}
          >
            <Input
              value={newStore.title}
              onChange={handleTitleChange}
            />
          </Form.Item>
          <Form.Item 
            name="resume"
            label='商品摘要'
            initialValue={newStore.resume}
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
            <TinymceEditor/>
          </Form.Item>
        </Form>
      </Card>
    );
  }
  
  export default observer(ProductDataEdit);



//  
// function ProductDataEdit({ productDetail }: Props) {
//   const [form] = Form.useForm();


//   console.log(productDetail);

//   newStore.desc = productDetail.meta_description;

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;

//     console.log(e.target.value);
//     form.setFieldsValue({ title: newValue });

//     // 更新 store 或其他状态管理
//     newStore.title = newValue;
//     // newStore.desc = 
//   };

//   return (
//     <Card title="商品信息" className='product-data-card'>
//       <Form layout='vertical' className='product-form' form={form}>
//         <Form.Item
//           name="title"
//           label="商品标题"
//           initialValue={productDetail.title}
//         >
//           <Input
//             value={productDetail.title}
//             onChange={handleTitleChange}
//           />
//         </Form.Item>
//         <Form.Item 
//           name="resume"
//           label='商品摘要'
//           initialValue={productDetail.meta_title}
//         >
//           <TextArea
//             showCount
//             maxLength={400}
//             onBlur={(e) => {
//               newStore.resume = e.target.value;
//             }}
//             style={{
//               resize: 'none',
//               height:'35px',
//             }}
//             value={productDetail.meta_title}
//             placeholder='请用简短的文字描述本商品'
//           />
//         </Form.Item>
//         <Form.Item label='商品描述'>
//           <TinymceEditor/>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// }

// export default observer(ProductDataEdit);