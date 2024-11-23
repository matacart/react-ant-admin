import { ClockCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
// import { Link } from "@umijs/max";
import { Button, Card, Checkbox, Divider, Flex, Form, Input, InputRef, message, Modal, Select, SelectProps, Space, Switch, Tag, theme, Tooltip } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import oldStore from "@/store/oldStore";
import { selectTags, upDateProductStatus } from "@/services/y2/api";
import { observer } from "mobx-react";
import TagsModal from "@/components/Modal/TagsModal";
import { lang_bnBD0 } from 'C:/Users/Administrator/Desktop/react-ant-admin-main/src/locales/bn-BD.ts';

// 上架商品
const onPutProduct = (checked: boolean) => {
    // oldStore.setOnPutProduct(!oldStore.onPutProduct);
};

// type WebChannel = {
//     name: string;
//     linkText?: string;
//     url?: string;
// }

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






let index = 0;

const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
};


function ProductSettingsEdit(props:any) {
    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const [status,setStatus] = useState("");
    
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    // const inputTagRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

    const [tagName, setTagName] = useState('');
    const inputTagRef = useRef<InputRef>(null);
   
    const [options, setOptions] = useState([
        '标签一','标签二'
    ]);
    
    let [productType,setProductType] = useState(oldStore.productType);
    let tag:any=[];
    if(oldStore.tags){
        tag = oldStore.tags.split(",")
    }
    // let productType = oldStore.productType.split(",")
    // console.log(tag)

    // 标签
    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
        oldStore.setTags(newTags.join(","))
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
    const handleTagChange = (value: string[]) => {
        setTags(value)
        oldStore.setTags(value.join(","))
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
    // 
    const updatetags = (tag:string[]) =>{
        setTags(tag)
    } 


    // 取消弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    // 待优化
    const handleOk = () => {
        upDateProductStatus(oldStore.productId,"0").then(res=>{
            if(res.code == 0){
                setStatus("0");
                props.upProductStatus("0")
                oldStore.setProductStatus("0")
                message.success('取消商品存档成功');
            }else{
                message.error('取消商品存档失败');
            }
        })
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(()=>{
        // 获取标签
        selectTags(oldStore.language).then(res=>{
            console.log(res)
            let tempList:any = [];
            res.data.forEach((element:any) => {
                tempList.push(element.tag)
            });
            setOptions(tempList);
        })
        setStatus(props.productStatus)
        setTags(oldStore.tags.split(','))
    },[props.productStatus])
    useEffect(() => {
        if (inputVisible) {
          inputTagRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);

    


    return (
        <Scoped>
            <Card title='商品设置' className="card">
                {/* 对话窗 */}
                <Modal centered title="取消商品存档" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>取消存档后商品将变为下架状态，您可以进行上架售卖</p>
                </Modal>
                {status == "2"?<div>
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
                    <Switch defaultChecked={oldStore.productStatus=="1"?true:false} onChange={(checked)=>{
                        checked?oldStore.setProductStatus("1"):oldStore.setProductStatus("0")
                    }} />
                </div>}
                <div className="item">
                    <div style={{marginBottom:"4px"}}>发货</div>
                    <Checkbox onChange={(e)=>{
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
                                oldStore.setSPU(e.target.value)
                            }}
                            defaultValue={oldStore.SPU}
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
                                oldStore.setWeight(e.target.value)
                            }}
                            defaultValue={oldStore.weight}
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
                            // value={oldStore.manufactuer}
                            defaultValue={oldStore.manufactuer}
                            onChange={(e)=>{
                                oldStore.setManufactuer(e.target.value);
                            }}
                        ></Input>
                    </Form.Item>
                    {/*  */}
                    <Form.Item
                        className="moreLink"
                        label={
                            <div className="label-content between">
                                <span>标签</span>
                                <TagsModal tags={tags} language={oldStore.language} updatetag={updatetags}/>
                            </div>
                        }
                    >   
                        <Select
                            mode="tags"
                            // style={{ width: '100%', padding: '0' }}
                            placeholder="添加标签（例如：复古/夏季）"
                            onChange={handleTagChange}
                            showSearch={false}
                            tagRender={(props) => <></>}
                            value={tags}
                            options={options.map((item) => ({ label: item, value: item }))}
                        />
                        <div style={{height:"10px"}}></div>
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
                            options={items.map((item) => ({ label: item, value: item }))}
                            onChange={(e)=>{
                                // console.log(e)
                                // console.log() 
                                // oldStore.setTag(e)
                                oldStore.setProductType(e)
                            }}
                            defaultValue={oldStore.productType}
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

export default ProductSettingsEdit

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