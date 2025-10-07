import { ClockCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Flex, Form, Input, InputNumber, InputRef, message, Modal, Select, SelectProps, Space, Switch, Tag, theme, Tooltip } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCategorySelect, getPlatformCategorySelect, selectTags, upDateProductStatus } from "@/services/y2/api";
import TagsModal from "@/components/Modal/TagsModal";
import ProductCategoryModal from "@/components/Modal/ProductCategoryModal";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/es/form/Form";
import product from "@/store/product/product";
import SearchRemote from "@/components/Search/SearchRemote";

type WebChannel = {
    name: string;
    linkText?: string;
    url?: string;
}

const WebChannelArray: WebChannel[] = [
    {
        name: '在线商店',
        linkText: '指定上线时间',
        url: '#'
    }, {
        name: '贴文销售',
    }, {
        name: '消息中心',
    }, {
        name: 'Google',
    }, {
        name: 'WhatsApp'
    }, {
        name: 'Facebook',
    }, {
        name: 'Telegram'
    }, {
        name: '直播销售'
    }
]


type market = {
    name: string;
    linkText?: string;
    url?: string;
}

const managerArray: market[] = [
    {
        name: '新加坡'
    }
]

// 标签

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}
let index = 0;
const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
};


function ProductSettingsEdit() {

    const [form] = useForm();

    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);
    
    const [tags, setTags] = useState<string[]>([]);
    
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    // const inputTagRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
   
    // 商品类型 -- 平台
    const [productTypeOptions,setProductTypeOptions] = useState<any>();

    // 店铺分类
    const [categoryTags, setCategoryTags] = useState<any[]>([]);
    
    // 重量 单位
    const { Option } = Select;
    const selectAfter = (
        <Select value={product.productInfo.weight_class_id} onSelect={(value)=>{
            product.setProductInfo({
                ...product.productInfo,
                weight_class_id:value
            })
        }}>
            <Option value="1">千克</Option>
            <Option value="2">克</Option>
            <Option value="5">磅</Option>
            <Option value="6">盎司</Option>
        </Select>
    );

    // 店铺分类
    const upDateCategoryTags = (tag:any[]) =>{
        setCategoryTags(tag)
        product.setProductInfo({
            ...product.productInfo,
            categoryIds:Array.from(tag,(e)=>{return e.id}).join(",")
        })
    }
    // 标签
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
        product.setProductInfo({
            ...product.productInfo,
            tag:newTags.join(",")
        })
    };

    const handleTypeClose = (removedTag: any) => {
        const newTags = categoryTags.filter((tag) => tag.id !== removedTag.id);
        setCategoryTags(newTags);
        product.setProductInfo({
            ...product.productInfo,
            categoryIds:Array.from(newTags,(e)=>{return e.id}).join(",")
        })
    };
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        console.log(newTags)
        setEditInputIndex(-1);
        setEditInputValue('');
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name)
    };
    // 更新标签
    const updatetags = (tag:string[]) =>{
    } 
    

    // 取消弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const getTagsList = (langId:string)=>{
        selectTags(langId).then(res=>{
            // console.log(res)
        }).catch((err)=>{

        }
        ).finally(()=>{

        })
    }

    // 平台类型
    // const getPlatformCategoryList = async (langId:string)=>{
    //     const temp = await getPlatformCategorySelect(langId).then(res=>{
    //         return Array.from(res.data,(obj:any)=>{
    //             return {
    //                 value: obj.id,
    //                 label: obj.category_name
    //             }
    //         })
    //     })
    //     return temp
    // }

    // 店铺商品类型
    const getCategoryList = async ()=>{
        const temp = await getCategorySelect().then(res=>{
            return Array.from(res.data,(obj:any)=>{
                return {
                    value: obj.id,
                    label: obj.category_name
                }
            })
        })
        return temp
    }
    // // 分类
    // useEffect(() => {
    //     let temp:any = [];
        // getCategorySelect().then(res=>{
        //     res.data.forEach((res:any)=>{
        //         if(oldStore.productCategories.split(",").includes(res.id)){
        //             temp.push({
        //                 id:res.id,
        //                 name:res.category_name
        //             })
        //         }
        //     })
        //     setCategoryTags(temp)
        // })
    // }, [oldStore.productId]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);


    useEffect(() => {

        // getTagsList(product.productInfo.languages_id)

        // getPlatformCategoryList(product.productInfo.languages_id).then(res=>{
        //     setProductTypeOptions(res)
        // })

        // getCategoryList().then(res=>{
        //     let temp:any = [];
        //     res.forEach((item:any)=>{
        //         if(product.productInfo.categoryIds.split(",").includes(item.value)){
        //             temp.push({
        //                 id:item.value,
        //                 name:item.label
        //             })
        //         }
        //     })
        //     setCategoryTags(temp)
        // })

        form.setFieldsValue({
            SPU: product.productInfo.spu,
            weight:product.productInfo.weight,
            manufactuer:product.productInfo.manufactuer,
            tags:product.productInfo.tag,
            platformCategory:product.productInfo.platform_category_id == "0" ? undefined : product.productInfo.platform_category_id
        });
    }, []);

    return (
        <Scoped>
            <Card title='商品设置' className="card">
                {/* 取消存档 */}
                <Modal centered title="取消商品存档" open={isModalOpen} onCancel={()=>setIsModalOpen(false)} onOk={()=>{
                    upDateProductStatus(product.productInfo.id,"0").then(res=>{
                        message.success("成功")
                        product.setProductInfo({
                            ...product.productInfo,
                            status:"0"
                        })
                    }).catch(err=>{
                        message.error("失败")
                    }).finally(()=>{
                        setIsModalOpen(false)
                    })
                }}>
                    <p>取消存档后商品将变为下架状态，您可以进行上架售卖</p>
                </Modal>
                {product.productInfo.status == "2"?<div>
                    <div style={{backgroundColor:"#EEF1F6",display:'flex',justifyContent:"space-between",padding:"8px"}}>
                        <div>
                            <ClockCircleOutlined /><span style={{marginLeft:"8px"}}>已存档</span>
                        </div>
                        <div style={{color:"#1677FF",cursor:"pointer"}} onClick={showModal}>取消</div>
                    </div>
                    <div style={{marginTop:"6px",color:"#7A8499"}}>取消存档后商品将变为下架状态，您可以进行上架售卖</div>
                </div>:
                <div className="item between">
                    <span>上架商品</span>
                    <Switch checked={product.productInfo.status=="1"?true:false} onChange={(checked)=>{
                        product.setProductInfo({
                            ...product.productInfo,
                            status:checked?"1":"0"
                        })
                    }} />
                </div>}
                <div className="item">
                    <div style={{marginBottom:"4px"}}>发货</div>
                    <Checkbox checked={product.productInfo.shipping == 1?true:false} onChange={(e)=>{
                        product.setProductInfo({
                            ...product.productInfo,
                            shipping:e.target.checked?1:0
                        })
                        
                    }}>需要运输</Checkbox>
                </div>
                <div className="item webChannelContent" >
                    <div className="between">
                        <div>销售渠道</div>
                        <Link to='#'>管理</Link>
                    </div>
                    {
                        WebChannelArray.map((item, index) => (
                            <div key={index} className="between">
                                <div>·&nbsp;&nbsp;{item.name}</div>
                                <Link to={item.url || '#'}>{item.linkText}</Link>
                            </div>
                        ))
                    }
                </div>
                <div className="market item">
                    <div className="title between">
                        <div>市场</div>
                        <Link to='#'>管理</Link>
                    </div>
                    {
                        managerArray.map((item, index) => (
                            <div key={index} className="between">
                                <div>·&nbsp;&nbsp;{item.name}</div>
                                <Link to={item.url || '#'}>{item.linkText}</Link>
                            </div>
                        ))
                    }
                </div>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="SPU"
                        style={{ fontWeight: 600 }} label={
                            <>
                                SPU
                                <Tooltip title="标准化产品单元，如：属性值、特性相同的商品可以称为一个 SPU">
                                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                        <QuestionCircleOutlined />
                                    </span>
                                </Tooltip>
                            </>
                        } >
                        <Input
                            className="ant-input"
                            onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    spu:e.target.value
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="weight" label={<>重量</>} >
                        <InputNumber<number>
                            className="ant-input"
                            style={{padding: "4px 0"}}
                            onChange={(value)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    weight:value || 0
                                })
                            }}
                            addonAfter={selectAfter}
                        />
                    </Form.Item>
                    <Form.Item label={<>商品厂商</>
                    } >
                        <Input
                            className="ant-input"
                            name="manufactuer"
                            placeholder="例如：Zara"
                            onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    manufactuer:e.target.value
                                })
                            }}
                        ></Input>
                    </Form.Item>


                    

                    {/* 标签问题 */}
                    <Form.Item
                        className="moreLink"
                        name="tags"
                        label={
                            <div className="label-content between">
                                <span>标签</span>
                                <TagsModal tags={tags} language={product.productInfo.languages_id} updatetag={(value)=>{
                                    product.setProductInfo({
                                        ...product.productInfo,
                                        tag:value.join(",")
                                    })
                                }}/>
                            </div>
                        }
                    >   
                        <SearchRemote placeholder="添加标签（例如：复古/夏季）" style={{height:"36px"}} />
                        <div style={{height:"10px"}}></div>
                        {/* <Flex gap="4px 0" wrap>
                            {product.productInfo.tag.split(",").map<React.ReactNode>((tag, index) => {
                                if (editInputIndex === index) {
                                    return (
                                        <Input
                                            ref={editInputRef}
                                            key={tag}
                                            size="small"
                                            style={tagInputStyle}
                                            value={editInputValue}
                                            onChange={handleEditInputChange}
                                            onBlur={handleEditInputConfirm}
                                            onPressEnter={handleEditInputConfirm}
                                        />
                                    );
                                }
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                <Tag
                                    key={tag}
                                    closable
                                    color= "processing"
                                    bordered={false}
                                    style={{ userSelect: 'none',color: '#000',padding: '2px 6px'}}
                                    onClose={() => handleClose(tag)}
                                >
                                    <span
                                    onDoubleClick={(e) => {
                                        if (index !== 0) {
                                        setEditInputIndex(index);
                                        setEditInputValue(tag);
                                        e.preventDefault();
                                        }
                                    }}
                                    >
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </span>
                                </Tag>
                                );
                                return isLongTag ? (
                                <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                </Tooltip>
                                ) : (
                                tagElem
                                );
                            })}
                        </Flex> */}
                    </Form.Item>
                    <Form.Item
                        name="platformCategory"
                        className="moreLink"
                        label={
                            <div className="label-content between">
                                <span>商品大类</span>
                            </div>
                        } >
                        <Select
                            style={{ width: "100%", height: "36px" }}
                            placeholder="搜索类型"
                            options={productTypeOptions}
                            onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    platform_category_id:e
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        className="moreLink"
                        style={{
                            marginBottom: 0
                        }}
                        label={<div className="label-content between">
                            <span>商品分类</span>
                            {/* <ProductCategoryModal tags={categoryTags} language={product.productInfo.languages_id} upDateCategoryTags={upDateCategoryTags} /> */}
                        </div>}
                    >
                        <div className="desc">
                            选择商品所属分类。智能分类将按规则自动匹配，无法手动选择
                        </div>
                        <div style={{height:"10px"}}></div>
                        <Flex gap="4px 0" wrap>
                            {categoryTags.map((tag) => (
                                <Tag
                                    color="processing"
                                    style={{color:"#000",padding:"2px 6px"}}
                                    key={tag.id}
                                    bordered={false}
                                    closable
                                    onClose={() => handleTypeClose(tag)}
                                    >
                                    {tag.name}
                                </Tag>
                            ))}
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(ProductSettingsEdit)

const Scoped = styled.div`
    .card{
        background-color: #f7f8fb;
    }
    .item{
        margin-bottom: 20px;
    }
    .between{
        display: flex;
        justify-content: space-between;
    }
    a{
        font-weight: 400;
    }
    .webChannelContent{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .market{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .ant-input{
        height: 36px;
        /* padding: 4px 0px; */
    }
    .moreLink{
        label{
            width:100%;
            .label-content{
                width:100%;
            }
        }
    }
    .desc{
        color: #7A8499;
        font-size: 14px;
    }
    .ant-form-item{
        .ant-form-item-label{
            >label::after{
                margin-inline-end: 0px;
            }
        }
    }
`