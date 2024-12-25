import { Card, Form, Input, Select, Tooltip } from "antd";
import newStore from '@/store/newStore'
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import TinymceEditor from "@/components/MCE/TinymceEditor";
import { useEffect, useState } from "react";
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
            tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setLanguageData(tempList)
        }
    })
    return (
        <Card title="商品信息" className='product-data-card' extra={
            <>
                语言翻译：
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
            <Form layout='vertical' className='product-form'>
                <Form.Item
                name="title"
                required
                label="商品标题"
                validateStatus={newStore.validate.title as any}
                help={newStore.validate.title == "success"?"":<span style={{ color: '#F86140' }}>请输入商品标题</span>}
                >
                    <Input
                    defaultValue={newStore.title}
                    onChange={(e) => {
                        // 清除
                        newStore.validate.title = "success"
                        newStore.setTitle(e.target.value);
                        newStore.setEditStatus(true);
                    }}
                    placeholder="例如：冬季，毛衣" />
                    {/* 5 */}
                </Form.Item>
                <Form.Item 
                    name="resume"
                    required
                    label='商品摘要'>
                    <TextArea showCount maxLength={400} onBlur={(e)=>{
                        newStore.setContent1(e.target.value);
                    }}
                    style={{
                        resize: 'none'
                    }}
                    onChange={()=>{
                        newStore.setEditStatus(true);
                    }}
                    defaultValue={newStore.content1}
                    value={newStore.content1}
                    placeholder='请用简短的文字描述本商品'
                    />
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