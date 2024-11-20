import { Card, Form, Input, Select, Tooltip } from "antd";
import TinymceEditor from "@/components/MCE/TinymceEditor2";
import { useEffect, useState } from "react";
import oldStore from "@/store/oldStore";
import tinymce from "public/tinymce/tinymce";
import { getLanguages } from "@/services/y2/api";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  oldStore.setTitle(e.target.value)
  
};


function ProductDataEdit(){
    const [form] = Form.useForm();

    const [language, setLanguage] = useState("2");
    const [languageData, setLanguageData] = useState([]);
    // 语言选择
    const languageChange= (value: string) => {
        // setLanguage(value)
        oldStore.setLanguage(value)
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