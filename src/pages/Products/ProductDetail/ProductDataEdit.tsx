import { Card, Flex, Form, Input, message, Select, Tooltip } from "antd";
import { CopyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import { observer } from "mobx-react-lite";
import PTinymce from "@/components/MCE/PTinymce";
import product from "@/store/product/product";
import { useEffect } from "react";
import { CopyIcon } from "@/components/Icons/Icons";

const { TextArea } = Input;

function ProductDataEdit({form}:{form:any}){
    const setContent = (content: string)=>{
      product.setProductInfo({...product.productInfo,content:content})
    }

    useEffect(()=>{
      form.setFieldsValue({
        title: product.productInfo.title,
        content: product.productInfo.content,
        content1: product.productInfo.content1,
      });
    },[])

    return (
      <Card title="商品信息" className='product-data-card' extra={
        <Flex align='center'>
          <div>SPU ID:{product.productInfo.id}</div>
          <div style={{marginLeft:"6px",marginRight:"8px"}}>
            <span style={{cursor:"pointer"}} onClick={()=>{
              copy(product.productInfo.id)
              message.success('复制成功')
            }}><CopyIcon className='color-7A8499 font-20 cursor-pointer' /></span>
          </div>
        </Flex>
      }>
        <Form layout='vertical' className='product-form' form={form}>
        {/* --- 托管给form对象 */}
          <Form.Item
            required
            name='title'
            label="商品标题"
            rules={[
              { required: true, message: '请输入商品标题' }
            ]}
          >
            <Input
              onChange={(e)=>{
                product.setProductInfo({...product.productInfo,title:e.target.value})
              }}
            />
          </Form.Item>
          <Form.Item 
            name="content1"
            label='商品摘要'
          >
            <TextArea
              showCount
              autoSize={{ minRows: 1, maxRows: 6 }}
              maxLength={400}
              onChange={(e)=>{
                product.setProductInfo({...product.productInfo,content1:e.target.value})
              }}
              style={{
                resize: 'none',
              }}
              placeholder='请用简短的文字描述本商品'
            />
          </Form.Item>
          <Form.Item label='商品描述' name="content">
            <PTinymce content={product.productInfo.content} setContent={setContent} />
          </Form.Item>
        </Form>
      </Card>
    );
  }
  
export default observer(ProductDataEdit);