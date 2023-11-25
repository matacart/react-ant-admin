import {
    Card,
    Switch,
    Checkbox,
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Typography,
    Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import { QuestionMark } from '../../../component/Icon/Icon';
import './Extra.scss';

/**
 * 商品设置
 */
const ProductSettings = () => {
    const data = {
        title: '商品设置',
        children: [
            {
                title: (
                    <>
                        <span>上架商品</span>
                        <Switch />
                    </>
                ),
            },
            {
                title: '发货',
                children: <Checkbox checked>需要运输</Checkbox>,
            },
            {
                title: (
                    <>
                        <span>销售渠道</span>
                        <Button type="link" block>
                            管理
                        </Button>
                    </>
                ),
                children: [
                    <div className="mc-card-title">
                        <div className="mc-title">
                            <span>.</span>
                            <span>在线商店</span>
                        </div>
                        <Button type="link" block>
                            指定上线时间
                        </Button>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>贴文销售</span>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>消息</span>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>Google</span>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>WhatsApp</span>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>Facebook</span>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>Telegram</span>
                    </div>,
                    <div className="mc-title">
                        <span>.</span>
                        <span>直播销售</span>
                    </div>,
                ],
            },
            {
                title: (
                    <Typography.Title level={5}>
                        <span>SPU &nbsp;</span>
                        <Tooltip title="标准化产品单元，如：属性值、特性相同的商品可以称为一个 SPU">
                            <QuestionMark style={{ width: 20, height: 20 }} />
                        </Tooltip>
                    </Typography.Title>
                ),
                children: (
                    <Form.Item name="SPU">
                        <Input placeholder="添加SPU" />
                    </Form.Item>
                ),
            },
            {
                title: '重量',
                children: (
                    <Form.Item name="重量">
                        <InputNumber
                            addonAfter={
                                <Select
                                    defaultValue="克"
                                    style={{
                                        width: 60,
                                        // backgroundColor: '#fff',
                                    }}
                                    options={[
                                        {
                                            label: '千克',
                                            value: '千克',
                                        },
                                        {
                                            label: '克',
                                            value: '克',
                                        },
                                        {
                                            label: '磅',
                                            value: '磅',
                                        },
                                        {
                                            label: '盎司',
                                            value: '盎司',
                                        },
                                    ]}
                                />
                            }
                            placeholder="0"
                        />
                    </Form.Item>
                ),
            },
            {
                title: '商品厂商',
                children: (
                    <Form.Item name="商品厂商">
                        <Input placeholder="例如：Zara" />
                    </Form.Item>
                ),
            },
            {
                title: (
                    <>
                        <span>标签</span>
                        <Button type="link" block>
                            查看所有标签
                        </Button>
                    </>
                ),
                children: (
                    <Form.Item name="标签">
                        <Input placeholder="添加标签（例如：复古/夏季）" />
                    </Form.Item>
                ),
            },
            {
                title: (
                    <>
                        <span>商品类型</span>
                        <Button type="link" block>
                            + 自定义
                        </Button>
                    </>
                ),
                children: (
                    <Form.Item name="商品类型">
                        <Input placeholder="搜索类型" />
                    </Form.Item>
                ),
            },
            {
                title: (
                    <>
                        <span>商品分类</span>
                        <Button type="link" block>
                            选择
                        </Button>
                    </>
                ),
                children: (
                    <div style={{ color: '#7A8499' }}>
                        选择商品所属分类。智能分类将按规则自动匹配，无法手动选择
                    </div>
                ),
            },
        ],
    };

    return (
        <Card
            title={data.title}
            headStyle={{ border: 0 }}
            bodyStyle={{ padding: '0px 24px 24px' }}
            style={{ marginBottom: 20, backgroundColor: '#F7F7F7' }}
        >
            {data.children.map((item, index) => (
                <div key={index} style={{ margin: '20px 0' }}>
                    <div className="mc-card-title">{item.title}</div>
                    <div>
                        {item.children && item.children instanceof Array
                            ? item.children.map((item, index) => (
                                  <div key={index}>{item}</div>
                              ))
                            : item.children}
                    </div>
                </div>
            ))}
        </Card>
    );
};

/**
 * 搜索引擎优化
 *
 */
const EngineOptimization = () => {
    const data = {
        title: '搜索引擎优化',
        extra: <Link>编辑</Link>,
        hostText: 'https://yimov.myshopline.com/products/',
        h2: '未填写标题',
        desc: '未填写描述',
    };

    return (
        <Card
            title={data.title}
            extra={data.extra}
            headStyle={{ border: 0 }}
            bodyStyle={{ padding: '0px 24px 24px' }}
            style={{ marginBottom: 20, backgroundColor: '#F7F7F7' }}
        >
            <div className="mc-seo-card-hostText">{data.hostText}</div>
            <p className="mc-seo-card-title">{data.h2}</p>
            <p className="mc-seo-card-desc">{data.desc}</p>
        </Card>
    );
};

/**
 * 绑定第三方商品
 *
 */
const BindingThirdPartyProducts = () => {
    const data = {
        title: (
            <Typography.Title level={5}>
                <span>绑定第三方商品 &nbsp;</span>
                <Tooltip title="客户可以从商品详情页访问已绑定的第三方商品链接">
                    <QuestionMark style={{ width: 20, height: 20 }} />
                </Tooltip>
            </Typography.Title>
        ),
        children: [
            {
                title: (
                    <>
                        <span>亚马逊</span>
                        <Button type="link" block>
                            编辑
                        </Button>
                    </>
                ),
                subTitle: '未绑定',
            },
            {
                title: (
                    <>
                        <span>乐天</span>
                        <Button type="link" block>
                            编辑
                        </Button>
                    </>
                ),
                subTitle: '未绑定',
            },
            {
                title: (
                    <>
                        <span>雅虎</span>
                        <Button type="link" block>
                            编辑
                        </Button>
                    </>
                ),
                subTitle: '未绑定',
            },
        ],
    };

    return (
        <Card
            title={data.title}
            headStyle={{ border: 0 }}
            bodyStyle={{ padding: '0px 24px 24px' }}
            style={{ marginBottom: 20, backgroundColor: '#F7F7F7' }}
        >
            {data.children.map((item, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                    <div className="smallTitle">{item.title}</div>
                    <div className="twoLineUrl">{item.subTitle}</div>
                </div>
            ))}
        </Card>
    );
};

/**
 * 主题模板
 *
 */
const ThemeTemplate = () => {
    const data = {
        title: '主题模板',
        children: {
            options: [
                {
                    label: '默认模板',
                    value: '默认模板',
                },
            ],
            text: '选择一个当前店铺或主题自带的模板文件来定义页面的样式',
        },
    };

    return (
        <Card
            title={data.title}
            headStyle={{ border: 0 }}
            bodyStyle={{ padding: '0px 24px 24px' }}
            style={{ marginBottom: 20, backgroundColor: '#F7F7F7' }}
        >
            <Select
                options={data.children.options}
                defaultValue="默认模板"
                style={{ width: '100%' }}
            />
            <p className="template-desc">{data.children.text}</p>
        </Card>
    );
};

/**
 * 右侧 卡片
 * @returns
 */
const Extra = () => {
    return (
        <>
            <ProductSettings />
            <EngineOptimization />
            <BindingThirdPartyProducts />
            <ThemeTemplate />
        </>
    );
};

export default Extra;
