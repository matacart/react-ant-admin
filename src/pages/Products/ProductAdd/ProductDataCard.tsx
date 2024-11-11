import { Card, Form, Input, Select } from "antd";
import newStore from '@/store/newStore'
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import TinymceEditor from "@/components/MCE/TinymceEditor";
import { useEffect, useState } from "react";
import { getLanguages } from "@/services/y2/api";
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const {TextArea} = Input
function ProductDataCard() {
    const [language, setLanguage] = useState("2");
    const [languageData, setLanguageData] = useState([]);
    // 语言选择
    const languageChange= (value: string) => {
        // setLanguage(value)
        newStore.setLanguage(value)
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
    })
    return (
        <Card title="商品信息" className='product-data-card' extra={
            <Select
                // size='large'
                defaultValue="English"
                style={{ width: 100 }}
                listHeight={200}
                onChange={languageChange}
                options={languageData}
            />
        }>
            
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
                    {/* 5 */}
                </Form.Item>
                <Form.Item 
                name="resume"
                required
                label='商品摘要'>
                    <TextArea showCount maxLength={400} onBlur={(e)=>{
                        newStore.content=e.target.value;
                    }}
                        style={{
                            resize: 'none'
                        }}
                        value={newStore.content}
                        placeholder='请用简短的文字描述本商品'
                    >
                    </TextArea>
                </Form.Item>
                <Form.Item label='商品描述'>
                    {/* 富文本编辑器 */}
                    <TinymceEditor prop={newStore} />
                </Form.Item>
            </Form>


        </Card>
    )
}

export default observer(ProductDataCard);