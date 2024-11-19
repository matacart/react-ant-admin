import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "@umijs/max";
import { Button, Card, Checkbox, Divider, Flex, Form, Input, InputRef, Select, SelectProps, Space, Switch, Tag, theme, Tooltip } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import newStore from "@/store/newStore";
import { addTags, removeTags } from "@/services/y2/api";




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

// 重量
const { Option } = Select;
const selectAfter = (
    <Select defaultValue=".com">
        <Option value=".com">千克</Option>
        <Option value=".jp">克</Option>
        <Option value=".cn">磅</Option>
        <Option value=".org">盎司</Option>
    </Select>
);

// 标签

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}



const handleTagChange = (value: string) => {
    // console.log(`selected ${value}`);
    newStore.setTag(value.toString())

};

let index = 0;

const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
};


export default function ProductSettingsCard() {

    const [items, setItems] = useState(['jack', 'lucy']);
    // const [productItems,setProductItems] = useState(['毛衣', '帽子']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const { token } = theme.useToken();
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputTagRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
    
    // 商品状态
    const [productStatus,setProductStatus] = useState(true);
    // 上架商品
    const onPutProduct = (checked: boolean) => {
        // set
        setProductStatus(checked)
        newStore.setOnPutProduct(checked);
    };
    
    // 标签
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
        removeTags(newStore.language,removedTag)
        newStore.setTag(newTags.join(","))
      };
      const showInput = () => {
        setInputVisible(true);
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };
    
      const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
            // 添加标签
            addTags(newStore.language,inputValue)
            newStore.setTag([...tags, inputValue].join(","))
        }
        setInputVisible(false);
        setInputValue('');
      };
      const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
      };
      const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        // console.log(1111);
        // newStore.setTag(newTags.join(","))
        setEditInputIndex(-1);
        setEditInputValue('');
      };
    
      const tagPlusStyle: React.CSSProperties = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: 'dashed',
      };
    

    
    const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        // console.log(event)
    };
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    useEffect(() => {
        if (inputVisible) {
          inputTagRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);

    useEffect(()=>{
        // console.log(newStore.onPutProduct)
        setProductStatus(newStore.onPutProduct);
    },[])


    return (
        <Scoped>
            <Card title='商品设置' className="card">
                <div className="item between">
                    <span>上架商品</span>
                    <Switch checked={productStatus} onChange={onPutProduct} />
                </div>
                <div className="item">
                    <div>发货</div>
                    <Checkbox onChange={(e)=>{
                        console.log(e.target.checked)
                        // newStore.setNeedTax(e.target.checked)
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
                <Form layout="vertical">
                    <Form.Item
                        style={{
                            fontWeight: 600
                        }} label={
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
                            onChange={(e)=>{
                                newStore.setSPU(e.target.value)
                            }}
                            className="ant-input"
                        />
                    </Form.Item>
                    <Form.Item label={
                        <>
                            重量
                        </>
                    } >
                        <Input
                            onChange={(e)=>{
                                newStore.setWeight(e.target.value)
                            }}
                            defaultValue={1000}
                            className="ant-input"
                            addonAfter={selectAfter}
                            style={{
                                padding: "4px 0"
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={
                        <>
                            商品厂商
                        </>
                    } >
                        <Input
                            placeholder="例如：Zara"
                            className="ant-input"
                            onChange={(e)=>{
                                newStore.setManufactuer(e.target.value);
                            }}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        className="moreLink"
                        label={
                            <div className="label-content between">
                                <span>标签</span>
                                <a>查看所有标签</a>
                            </div>
                        }
                    >   
                    
                        {/* <Select
                            mode="tags"
                            style={{ width: '100%', padding: '0' }}
                            placeholder="添加标签（例如：复古/夏季）"
                            onChange={handleTagChange}
                            options={options}
                            className="ant-input"
                        /> */}
                        <Flex gap="4px 0" wrap>
                            {tags.map<React.ReactNode>((tag, index) => {
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
                                    style={{ userSelect: 'none',color: '#000'}}
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
                            {inputVisible ? (
                                <Input
                                ref={inputRef}
                                type="text"
                                size="small"
                                style={tagInputStyle}
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputConfirm}
                                onPressEnter={handleInputConfirm}
                                />
                            ) : (
                                <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                                    标签
                                </Tag>
                            )}
                        </Flex>
                    </Form.Item>
                    <Form.Item
                        className="moreLink"

                        label={
                            <div className="label-content between">
                                <span>商品类型</span>
                                {/* <a>+自定义</a> */}
                            </div>
                        } >
                        <Select
                            style={{ width: "100%", height: "36px" }}
                            placeholder="custom dropdown render"
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Space style={{ padding: '0 8px 4px' }}>
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={name}
                                            onChange={onTypeChange}
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            onChange={(e)=>{
                                newStore.setProductType(e)
                            }}
                            options={items.map((item) => ({ label: item, value: item }))}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{
                            marginBottom: 0
                        }}
                        className="moreLink"
                        label={<div className="label-content between">
                            <span>商品分类</span>
                            <a>选择</a>
                        </div>}
                    >
                        <div className="desc">
                            选择商品所属分类。智能分类将按规则自动匹配，无法手动选择
                        </div>
                    </Form.Item>
                </Form>

            </Card>
        </Scoped>
    )
}


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