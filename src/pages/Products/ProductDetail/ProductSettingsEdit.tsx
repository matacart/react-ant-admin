import { ClockCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
// import { Link } from "@umijs/max";
import { Button, Card, Checkbox, Divider, Form, Input, InputRef, message, Modal, Select, SelectProps, Space, Switch, Tooltip } from "antd";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import newStore from "@/store/newStore";
import { Link } from "react-router-dom";
import oldStore from "@/store/oldStore";
import { upDateProductStatus } from "@/services/y2/api";
import { observer } from "mobx-react";

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



const handleTagChange = (value: string) => {
    console.log(`selected ${value}`);
    oldStore.setTag(value.toString())
};


let index = 0;

function ProductSettingsEdit(props:any) {
    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const [status,setStatus] = useState("");
    
    let [productType,setProductType] = useState(oldStore.productType);
    // let [productStatus,setProductStatus] = useState(oldStore.onPutProduct)
    let tag:any=[];
    if(oldStore.tag){
        tag = oldStore.tag.split(",")
    }
    // 
    // let productType = oldStore.productType.split(",")
    console.log(tag)

    const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name)
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };


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
        setStatus(props.productStatus)
    },[props.productStatus])


    return (
        <Scoped>
            <Card title='商品设置' className="card">
                {/* 对话窗 */}
                <Modal centered title="取消商品存档" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>取消存档后商品将变为下架状态，您可以进行上架售卖</p>
                </Modal>
                {status == "-1"?<div>
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
                    <Form.Item
                        className="moreLink"
                        label={
                            <div className="label-content between">
                                <span>标签</span>
                                <a>查看所有标签</a>
                            </div>
                        }
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%', padding: '0' }}
                            placeholder="添加标签（例如：复古/夏季）"
                            onChange={handleTagChange}
                            options={options}
                            className="ant-input"
                            defaultValue={tag}
                        />
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