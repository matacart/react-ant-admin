import { Card, Form, Input, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import CategoriesMCE from "@/components/MCE/CategoriesMCE";
import globalStore from "@/store/globalStore";
import categories from "@/store/product/categories";

function CategoriesInfo({form}:{form:any}) {

    const [treeData,setTreeData] = useState([]);

    // 内容
    const setContent = (content: string)=>{
        categories.setCategoriesInfo({...categories.categoriesInfo,content:content})
    }

    useEffect(()=>{
        globalStore.getCategory().then(res=>{
            setTreeData(res)
        })
        form.setFieldsValue({
            title: categories.categoriesInfo.title,
            parentId: categories.categoriesInfo.pid == "0" ? undefined : categories.categoriesInfo.pid,
            content: categories.categoriesInfo.content,
        });
    },[])
    return (
        <Card title="分类信息" className='product-data-card'>
            <Form layout='vertical' form={form} className='product-form'>
                <Form.Item
                    name="title"
                    label="分类名称"
                    required={false} // 关键属性 隐藏星号但保留验证规则
                    rules={[
                        { required: true, message: '请输入分类名称' }
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            categories.setCategoriesInfo({
                                ...categories.categoriesInfo,
                                title: e.target.value
                            })
                        }}
                        placeholder="例如：冬季，毛衣" />
                    {/* 5 */}
                </Form.Item>
                <Form.Item
                    name="parentId"
                    label="父分类"
                >
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="父分类"
                        allowClear
                        treeDefaultExpandAll
                        onChange={(e)=>{
                            categories.setCategoriesInfo({
                                ...categories.categoriesInfo,
                                pid: e
                            })
                        }}
                        treeData={treeData}
                    />
                </Form.Item>
                <Form.Item label='分类描述'>
                    {/* 富文本编辑器 */}
                    <CategoriesMCE content={categories.categoriesInfo.content} setContent={setContent} />
                </Form.Item>
            </Form>
        </Card>
    )
}
export default CategoriesInfo;
