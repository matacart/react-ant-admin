import { Button, Card, Checkbox, DatePicker, Divider, Flex, Form, Input, InputNumber, InputRef, message, Modal, Radio, Select, SelectProps, Space, Switch, Tag, theme, Tooltip, TreeSelect } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import articles from "@/store/channel/website/articles";
import { PlusOutlined } from "@ant-design/icons";
import LangSelect from "@/pages/components/LangSelect";
import { set } from 'lodash';
import { addArticleCollection, getArticleCollection } from "@/services/y2/api";
import { convertToTree } from "@/utils/dataStructure";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

export default function TissueCard() {

    const [items, setItems] = useState(['jack', 'lucy']);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const [groupList,setGroupList] = useState([]);

    const [treeGroup,setTreeGroup] = useState([]);

    const [lang,setLang] = useState("2");

    // 提交表单
    const onFinish = ()=>{
        // console.log(form.getFieldsValue())
        addArticleCollection({...form.getFieldsValue(),lang:lang}).then(res=>{
            message.success("添加成功")
            form.resetFields()
            setLang("2")
            setIsModalOpen(false)

            getArticleCollection().then(res=>{
                const data = convertToTree(res.data);
                // console.log(data)
                setGroupList(res.data)
                setTreeGroup(data)
            }).catch(err=>{
            })

        }).catch(err=>{
        })
    }

    useEffect(()=>{
        getArticleCollection().then(res=>{
            const data = convertToTree(res.data);
            console.log(data)
            setGroupList(res.data)
            setTreeGroup(data)
        }).catch(err=>{
        })
    },[])

    return (
        <Scoped>
            <Card className="card">
                <div className="title font-w-600 font-16">组织</div>
                <Form layout="vertical">
                    <Form.Item
                        label={<div className="font-w-600">作者</div>} >
                        <Input placeholder="请输入" defaultValue={articles.oldArticles.author_name?articles.oldArticles.author_name:""} onChange={(e) =>articles.setOldArticles({
                            ...articles.oldArticles,
                            author_name: e.target.value
                        })} />
                    </Form.Item>
                    <Form.Item
                        label={<div className="font-w-600">所属博客集合</div>} >
                        <Select
                            defaultValue={articles.oldArticles.category_id}
                            placeholder="请选择"
                            dropdownRender={(menu) => (
                                <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space style={{ padding: '0 8px 4px' }}>
                                    <Button type="text" icon={<PlusOutlined />} onClick={()=>setIsModalOpen(true)}>
                                        创建新的博客集合
                                    </Button>
                                </Space>
                                </>
                            )}
                            options={groupList.map((item) => ({ label: item.name, value: item.id }))}
                            onChange={(e)=>{
                                articles.setOldArticles({
                                    ...articles.oldArticles,
                                    category_id: e
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<div className="font-w-600">标签</div>} >
                        <Input placeholder="添加标签" />
                    </Form.Item>
                </Form>
                {/*  */}
                <Modal destroyOnClose title={<Flex justify="space-between">
                    <div>创建博客集合</div>
                    <div style={{marginRight: '20px'}}>
                        <LangSelect lang={lang} setLang={setLang} />
                    </div>          
                </Flex>} width={620} centered open={isModalOpen} onOk={()=>form.submit()} onCancel={()=>{
                    form.resetFields()
                    setLang("2")
                    setIsModalOpen(false)
                }}>
                    <Form form={form} onFinish={onFinish} layout="vertical"
                        initialValues={{
                            name:'',
                            parentId:'',
                            sort:'',
                            description:'',
                            seoTitle:'',
                            seoDescription:'',
                            seoKeywords:'',
                            groupId:''
                            // 其他初始值...
                        }}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: '请输入名称' },
                            ]}
                            label={<div className="font-w-600">名称</div>} >
                            <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item
                            name="parentId"
                            label={<div className="font-w-600">父集合</div>} >
                            <TreeSelect
                                style={{ width: '100%' }}
                                // value={value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={treeGroup}
                                placeholder="请选择"
                                treeDefaultExpandAll
                                onChange={()=>{}}
                            />
                        </Form.Item>
                        <Form.Item
                            name="sort"
                            label={<div className="font-w-600">排序</div>} >
                            <Input placeholder="请输入" onChange={(e) =>{}} />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label={<div className="font-w-600">描述</div>} >
                            <Input placeholder="请输入" onChange={(e) =>{}} />
                        </Form.Item>
                        <Form.Item
                            name="seoTitle"
                            label={<div className="font-w-600">SEO标题</div>} >
                            <Input placeholder="请输入" onChange={(e) =>{}} />
                        </Form.Item>
                        <Form.Item
                            name="seoDescription"
                            label={<div className="font-w-600">SEO描述</div>} >
                            <Input placeholder="请输入" onChange={(e) =>{}} />
                        </Form.Item>
                        <Form.Item
                            name="seoKeywords"
                            label={<div className="font-w-600">SEO关键词</div>} >
                            <Input placeholder="请输入" onChange={(e) =>{}} />
                        </Form.Item>
                        <Form.Item
                            name="groupId"
                            label={<div className="font-w-600">分组</div>} >
                            <Select placeholder="请选择" options={[
                                {label:"1正",value:"1"},
                                {label:"2组",value:"2"},
                                {label:"3正",value:"3"},
                                {label:"4组",value:"4"},
                                {label:"5正",value:"5"},
                                {label:"6组",value:"6"}
                            ]} />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </Scoped>
    )
}


const Scoped = styled.div`
    .card{
        .title{
            margin-bottom: 20px;
        }
    }

`