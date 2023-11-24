import Header from '../../layout/component/Header/Header';
import { Button, Card, Form, Select } from 'antd';

const Create = [
    {
        title: '1. 请简单介绍售卖产品，我们将推荐更合适您的店铺方案',
        lists: [
            {
                title: '您已经在销售商品了吗？',
                options: [
                    {
                        label: '还没决定，先试用一下',
                        value: '还没决定，先试用一下',
                    },
                    { label: '已在做准备', value: '已在做准备' },
                    {
                        label: '已经在线上平台工具销售商品',
                        value: '已经在线上平台工具销售商品',
                    },
                    {
                        label: '暂时在线下销售商品',
                        value: '暂时在线下销售商品',
                    },
                ],
            },
            {
                title: '您准备通过什么渠道销售商品？(可多选)',
                options: [
                    { label: '在线商店', value: '在线商店' },
                    { label: 'Facebook', value: 'Facebook' },
                    { label: 'Instagram', value: 'Instagram' },
                    { label: 'Google', value: 'Google' },
                    { label: 'Whatsapp', value: 'Whatsapp' },
                    { label: 'Telegram', value: 'Telegram' },
                    { label: 'Lazada', value: 'Lazada' },
                    { label: 'Shopee', value: 'Shopee' },
                    { label: 'POS', value: 'POS' },
                    { label: 'B2B', value: 'B2B' },
                    { label: '还不确定', value: '还不确定' },
                ],
            },
            {
                title: '您每月的销售额是？',
                options: [
                    { label: '$0', value: '$0' },
                    { label: '$0-$10000USD', value: '$0-$10000USD' },
                    { label: '$10000-$50000USD', value: '$10000-$50000USD' },
                    { label: '$50000-$100000USD', value: '$50000-$100000USD' },
                    { label: '$100000+USD', value: '$100000+USD' },
                ],
            },
            {
                title: '您销售的商品类目是？',
                options: [
                    { label: '全类日', value: '全类日' },
                    { label: '生活家居', value: '生活家居' },
                    { label: '流行衣饰', value: '流行衣饰' },
                    { label: '美妆保养', value: '美妆保养' },
                    { label: '3C家电', value: '3C家电' },
                    { label: '户外运动', value: '户外运动' },
                    { label: '食品饮料', value: '食品饮料' },
                    { label: '图书文具', value: '图书文具' },
                    { label: '亲子用品', value: '亲子用品' },
                    { label: '宠物用品', value: '宠物用品' },
                    { label: '暂未填写', value: '暂未填写' },
                ],
            },
        ],
    },
    {
        title: '2. 完成以下基本店铺设定，轻松运营属于您的店铺',
        lists: [
            {
                title: '你的店铺名称是',
                sub: '一个响亮的店铺名称是您生意成功的第一步',
                type: 'input',
                tstext: '请输入店铺名称',
            },
            {
                title: '你的网店地址是',
                sub: '设定一个店铺URL,开启您的SHOPLINET商店',
                type: 'input',
                tstext: '请输入地址前缀,   .myshopline.com',
            },
            {
                title: '商品销往的国家地区',
                sub: '店铺的主要销售地区，能主要优化这部分区域客户的访问加载速度',
                type: 'select',
                tstext: '请输入大洲/国家进行快速搜索',
            },
            {
                title: '您与客户进行结算的货币是',
                sub: '客户下单时会使用该货币进行结算',
                type: 'select',
                tstext: 'USD',
                tis: '已为您的商店默认选择USD，您也可自行调整为其他币种。',
            },
            {
                title: '商店联系邮箱',
                sub: '用于发店铺账单、顾客信息的邮箱，可随时修改',
                type: 'input',
                tstext: 'moyvfan@gmail.com',
            },
            {
                title: '店铺联系手机号',
                sub: '客服团队将为您提供专属服务，可随时修改',
                type: 'input',
                tstext: '请输入店铺名称',
            },
        ],
    },
];

const CreateAStore = () => {
    return (
        <>
            <Header></Header>
            <div>
                <div className="header">
                    <h1>
                        创建店铺<span>（第一步，共两步）</span>
                    </h1>
                </div>
                <div className="content">
                    <Card title={Create[0].title}>
                        <Form>
                            {Create[0].lists.map(item => (
                                <>
                                    <h3>{item.title}</h3>
                                    <Select
                                        options={item.options}
                                        defaultValue="请选择"
                                    ></Select>
                                </>
                            ))}
                        </Form>
                    </Card>
                </div>
            </div>
            <div className="footer">
                <Button>跳过</Button>
                <Button>下一步</Button>
            </div>
        </>
    );
};
export default CreateAStore;
