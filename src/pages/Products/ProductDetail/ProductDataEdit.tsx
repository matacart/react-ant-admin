import { Card, Form, Input, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import oldStore from "@/store/oldStore";
import { getLanguages, getProductDetail } from "@/services/y2/api";
import { CopyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import copy from 'copy-to-clipboard';
import { observer } from "mobx-react-lite";
import TinymceEditor2 from "@/components/MCE/TinymceEditor2";

const { TextArea } = Input;
const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  oldStore.setTitle(e.target.value)
};


function ProductDataEdit(prop:any){
    const [form] = Form.useForm();

    const [language, setLanguage] = useState("2");
    const [languageData, setLanguageData] = useState([]);
    // 语言选择
    const languageChange= (value: string) => {
        // setLanguage(value)
        oldStore.setLanguage(value)
        getProductDetail(oldStore.productId,value).then(res=>{
            oldStore.setProductInfo(res.data)
            oldStore.setTitle(res.data.title)
            oldStore.setContent1(res.data.content1)
            oldStore.setContent(res.data.content)
            // 
            oldStore.setMetaTitle(res.data.meta_title)
            oldStore.setMetaDescription(res.data.meta_description)
            oldStore.setMetaKeyword(res.data.meta_keyword)
            oldStore.setProductUrl(res.data.product_url)
        })
    };
    
    useEffect(()=>{
      let tempList = [];
      if(languageData.length==0){
          getLanguages().then(res=>{
              tempList = res.data.map((item:any)=>{
                  return {
                      value: item.id,
                      label: item.name
                  }
              })
              setLanguageData(tempList)
          })
      }
    },[])

    return (
      <Card title="商品信息" className='product-data-card' extra={
        <>
          <span>ID:{oldStore.productId}</span>
          <span style={{marginLeft:"6px",marginRight:"8px"}}>
            <span style={{cursor:"pointer"}} onClick={()=>{
              copy(oldStore.productId)
              message.success('复制成功')
            }}><CopyOutlined /></span>
          </span>
          <Select
              // size='large'
              defaultValue="English"
              style={{ width: 100,borderStyle:"none" }}
              listHeight={200}
              onChange={languageChange}
              options={languageData}
          />
          <Tooltip title="商品支持多种语言，请选择某种语言后再操作。">
              <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                  <QuestionCircleOutlined />
              </span>
          </Tooltip>
        </>
      }>
        <Form layout='vertical' className='product-form' form={form}>
          <Form.Item
            // name="title"  --- 托管给form对象
            label="商品标题"
            initialValue={oldStore.title}
          >
            <Input
              value={oldStore.title}
              onChange={(e)=>{
                oldStore.setTitle(e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item 
            // name="resume"
            label='商品摘要'
            initialValue={oldStore.content1}
          >
            <TextArea
              showCount
              maxLength={400}
              // onBlur={(e) => {
              //   // newStore.resume = e.target.value;
              //   oldStore.setContent1(e.target.value);
              //   console.log(e.target.value);
              // }}
              onChange={(e)=>{
                oldStore.setContent1(e.target.value);
              }}
              style={{
                resize: 'none',
                height:'35px',
              }}
              value={oldStore.content1}
              placeholder='请用简短的文字描述本商品'
            />
          </Form.Item>
          <Form.Item label='商品描述'>
            <TinymceEditor2 prop={oldStore}/>
          </Form.Item>
        </Form>
      </Card>
    );
  }
  
  export default observer(ProductDataEdit);