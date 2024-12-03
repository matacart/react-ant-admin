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

const {TextArea} = Input



function CategoriesInfo() {
    const [language, setLanguage] = useState("2");
    const [languageData, setLanguageData] = useState([]);

    const [value, setValue] = useState<string>();

    const [treeData,setTreeData] = useState([]);

    const onChange = (newValue: string) => {
        setValue(newValue);
        newCategories.setCategoryPid(newValue)
    };

    // 语言选择
    const languageChange= (value: string) => {
        // setLanguage(value)
        // newCategories.setLanguage(value)
    };

    useEffect(()=>{
        let tempList = [];
        // if(languageData.length==0){
        //     getLanguages().then(res=>{
        //         tempList = res.data.map((item:any)=>{
        //             return {
        //                 value: item.id,
        //                 label: item.name
        //             }
        //         })
        //         setLanguageData(tempList)
        //     })
        // }

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
            <Form layout='vertical' className='product-form'>
                <Form.Item
                    name="parentName"
                    label="父分类"
                >
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={value}
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
                    // validateStatus={newStore.validate.title as any}
                    // help={newStore.validate.title == "success"?"":<span style={{ color: '#F86140' }}>请输入商品标题</span>}
                >
                    <Input
                        defaultValue={newCategories.title}
                        onChange={(e) => {
                            // 清除
                            // newStore.validate.title = "success"
                            newCategories.setTitle(e.target.value);
                            // newStore.setTitle(e.target.value);
                        }}
                        placeholder="例如：冬季，毛衣" />
                    {/* 5 */}
                </Form.Item>
                <Form.Item label='分类描述'>
                    {/* 富文本编辑器 */}
                    <CategoriesMCE prop={newCategories} />
                </Form.Item>
            </Form>
        </Card>
    )
}
export default CategoriesInfo;
