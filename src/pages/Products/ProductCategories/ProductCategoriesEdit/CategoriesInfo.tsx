import { Card, Form, Input, Select, Tooltip, TreeSelect } from "antd";
import { ConsoleSqlOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import TinymceEditor from "@/components/MCE/TinymceEditor";
import { useEffect, useState } from "react";
import styled from "styled-components";
import newCategories from "@/store/categories/newCategories";
import CategoriesMCE from "@/components/MCE/CategoriesMCE";
// const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     console.log('Change:', e.target.value);
// };
// 清除ant 样式
import '@/components/Modal/index.scss'
import globalStore from "@/store/globalStore";
import editCategories from "@/store/categories/editCategories";
import { observer } from "mobx-react-lite";

const {TextArea} = Input



function CategoriesInfo() {
    const [language, setLanguage] = useState("2");

    const [form] = Form.useForm();

    const [languageData, setLanguageData] = useState([]);

    const [value, setValue] = useState<string>();

    const [treeData,setTreeData] = useState([]);

    const onChange = (newValue: string) => {
        // setValue(newValue);
        editCategories.setCategoryPid(newValue)
    };

    // 语言选择
    const languageChange= (value: string) => {
        // setLanguage(value)
        // newCategories.setLanguage(value)
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

        if(globalStore.categorylist.length==0){
            globalStore.getCategory().then(res=>{
                globalStore.setCategoryList(res)
                setTreeData(res)
            })
            // console.log(globalStore.categorylist)
        }else{
            setTreeData(globalStore.categorylist)
        }
    },[])
    return (
        <Card title="分类信息" className='product-data-card' extra={
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
            <Form layout='vertical' form={form} className='product-form'>
                <Form.Item
                    // name="parentName"
                    label="父分类"
                    // initialValue={treeData.length>0?(editCategories.categoryPid=="0"?"":editCategories.categoryPid):""}
                >
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={treeData.length>0?(editCategories.categoryPid=="0"?"":editCategories.categoryPid):""}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={treeData}
                        // onPopupScroll={onPopupScroll}
                    />
                    
                </Form.Item>
                <Form.Item
                    name="title"
                    label="分类名称"
                    initialValue={editCategories.title}
                    // validateStatus={newStore.validate.title as any}
                    // help={newStore.validate.title == "success"?"":<span style={{ color: '#F86140' }}>请输入商品标题</span>}
                >
                    <Input
                        // defaultValue={editCategories.title}
                        value={editCategories.title}
                        onChange={(e) => {
                            // 清除
                            // newStore.validate.title = "success"
                            // console.log(editCategories.title)
                            editCategories.setTitle(e.target.value);
                            // newStore.setTitle(e.target.value);
                        }}
                        placeholder="例如：冬季，毛衣" />
                    {/* 5 */}
                </Form.Item>
                <Form.Item label='分类描述'>
                    {/* 富文本编辑器 */}
                    <CategoriesMCE prop={editCategories} />
                </Form.Item>
            </Form>
            
        </Card>
    )
}
export default observer(CategoriesInfo);
