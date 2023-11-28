import {
    Button,
    Input,
    Typography,
    Tooltip,
    Form,
    Checkbox,
    Row,
    Col,
} from 'antd';
import { useState } from 'react';
import { QuestionMark } from '../../../component/Icon/Icon';
import RichTextEditor from '../../../component/RichTextEditor/RichTextEditor';
import UploadImg from '../../../component/UploadImg/UploadImg';
import Card from '../../../component/Card/Card';
import Extra from './Extra';
import './Content.scss';
import Product from '../../../models/productCreate';

const { TextArea } = Input;

/**
 * 产品信息
 */
const ProductInformation = ({ product, setProduct }) => {
    return (
        <>
            <div>
                <Typography.Title level={5}>商品标题</Typography.Title>
                <Form.Item
                    name="商品标题"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品标题',
                        },
                    ]}
                >
                    <Input
                        placeholder="例如：冬季，毛衣"
                        onChange={e => {
                            setProduct({ ...product, title: e.target.value });
                        }}
                    />
                </Form.Item>
            </div>
            <div>
                <Typography.Title level={5}>商品摘要</Typography.Title>
                <Form.Item name="商品摘要">
                    <TextArea
                        placeholder="请用简短的文字描述本商品"
                        showCount
                        maxLength={400}
                        autoSize={{
                            minRows: 1,
                            maxRows: 8,
                        }}
                        onChange={e => {
                            setProduct({
                                ...product,
                                content1: e.target.value,
                            });
                        }}
                    />
                </Form.Item>
            </div>
            <div>
                <Typography.Title level={5}>商品描述</Typography.Title>
                <RichTextEditor product={product} setProduct={setProduct} />
            </div>
        </>
    );
};

/**
 * 价格/交易，售价、原件、成本价
 */
const Price = ({ product, setProduct }) => {
    const data = [
        {
            title: '售价',
            tooltipTitle: '当商品参与限时促销活动时，商品售价将修改无效',
            name: '售价',
        },
        {
            title: '原价',
            tooltipTitle: '原价为0或小于等于售价时，网店将隐藏原价展示',
            name: '原价',
        },
        {
            title: '成本价',
            tooltipTitle: '成本价信息不会展示给消费者',
            name: '成本价',
        },
    ];

    const setValue = e => {
        const item = e.target;

        switch (item.id) {
            case 'trigger_售价':
                setProduct({ ...product, specialprice: item.value });
                break;
            case 'trigger_原价':
                setProduct({ ...product, price: item.value });
                break;
            default:
                break;
        }
    };

    return (
        <>
            {data.map((item, index) => (
                <Col key={index} md={24} lg={12}>
                    <Typography.Title level={5}>
                        <span>{item.title} &nbsp;</span>
                        <Tooltip title={item.tooltipTitle}>
                            <QuestionMark style={{ width: 20, height: 20 }} />
                        </Tooltip>
                    </Typography.Title>
                    <Form.Item name={item.name}>
                        <Input addonBefore="US$" onChange={setValue} />
                    </Form.Item>
                </Col>
            ))}
        </>
    );
};

/**
 * 库存
 */
const Inventory = ({ product, setProduct }) => {
    const data = [
        {
            title: 'SKU',
        },
        {
            title: '条形码(ISBN、UPC、GTIN等)',
        },
        {
            title: '库存数量',
        },
    ];

    const t = e => {
        let item = e.target;

        switch (item.id) {
            case 'trigger_SKU':
                setProduct({ ...product, sku: item.value });
                break;
            case 'trigger_条形码(ISBN、UPC、GTIN等)':
                break;
            case 'trigger_库存数量':
                setProduct({ ...product, quantity: item.value });
                break;
            default:
                break;
        }
    };

    return (
        <>
            {data.map((item, index) => (
                <Col key={index} md={24} lg={12}>
                    <Typography.Title level={5}>{item.title}</Typography.Title>
                    <Form.Item name={item.title}>
                        <Input onChange={t} />
                    </Form.Item>
                </Col>
            ))}
        </>
    );
};

/**
 * 海关信息
 */
const CustomsInformation = ({ product, setProduct }) => {
    const data = [
        {
            title: '发货国家/地区',
            tooltipTitle: '绝大多数情况下是产品制造或组装的地点',
            name: '发货国家/地区',
            placeholder: '选择国家',
        },
        {
            title: 'HS（协调制度）代码',
            name: 'HS（协调制度）代码',
            placeholder: '请输入HS编码',
        },
    ];

    return (
        <>
            {data.map((item, index) => (
                <Col key={index} md={24} lg={12}>
                    <Typography.Title level={5}>
                        <span>{item.title} &nbsp;</span>
                        {item.tooltipTitle && (
                            <Tooltip title={item.tooltipTitle}>
                                <QuestionMark
                                    style={{ width: 20, height: 20 }}
                                />
                            </Tooltip>
                        )}
                    </Typography.Title>
                    <Form.Item name={item.name}>
                        <Input placeholder={item.placeholder} />
                    </Form.Item>
                </Col>
            ))}
        </>
    );
};

const Content = () => {
    const [product, setProduct] = useState(new Product());

    const cardItems = [
        {
            title: '商品信息',
            name: '商品信息',
            child: (
                <ProductInformation product={product} setProduct={setProduct} />
            ),
        },
        {
            title: '商品图片/视频',
            name: '商品图片/视频',
            child: <UploadImg />,
            extra: (
                <>
                    <Button type="link">
                        添加<strong>URL</strong>
                    </Button>
                    <Button type="link">添加多媒体文件</Button>
                </>
            ),
        },
        {
            title: '价格/交易',
            name: '价格/交易',
            child: (
                <>
                    <Row gutter={25}>
                        <Price product={product} setProduct={setProduct} />
                    </Row>

                    <Row gutter={16}>
                        <Col md={12} lg={6}>
                            <p>
                                <span>利润 &nbsp;</span>
                                <Tooltip title="利润=售价 - 成本价">
                                    <QuestionMark
                                        style={{ width: 20, height: 20 }}
                                    />
                                </Tooltip>
                            </p>
                            <div>
                                <Input
                                    addonBefore="US$"
                                    disabled
                                    value={
                                        Number(product.specialprice) -
                                        Number(product.price)
                                    }
                                />
                            </div>
                        </Col>
                        <Col md={12} lg={6}>
                            <p>
                                <span>利润率 &nbsp;</span>
                                <Tooltip title="利润率=利润 / 售价">
                                    <QuestionMark
                                        style={{ width: 20, height: 20 }}
                                        value={
                                            (Number(product.specialprice) -
                                                Number(product.price)) /
                                            (1.0 * Number(product.specialprice))
                                        }
                                    />
                                </Tooltip>
                            </p>
                            <div>
                                <Input disabled />
                            </div>
                        </Col>
                    </Row>

                    <div style={{ marginTop: 15 }}>
                        <Checkbox checked>需要收取税费</Checkbox>
                    </div>
                </>
            ),
        },
        {
            title: '库存',
            name: '库存',
            child: (
                <>
                    <Row gutter={25}>
                        <Inventory product={product} setProduct={setProduct} />
                    </Row>
                    <Row>
                        <Checkbox checked>开启库存追踪</Checkbox>
                        <Checkbox>缺货后继续销售</Checkbox>
                    </Row>
                </>
            ),
        },
        {
            title: '海关信息',
            name: '海关信息',
            child: (
                <Row gutter={25}>
                    <CustomsInformation />
                </Row>
            ),
        },
        {
            title: '多款式',
            name: '多款式',
            child: (
                <div>
                    <Checkbox>此商品有多个款式</Checkbox>
                </div>
            ),
        },
    ];

    return (
        <div className="mc-layout-main">
            <div className="mc-layout-content">
                {cardItems.map((item, index) => (
                    <Card props={item} key={index} />
                ))}
            </div>

            <div className="mc-layout-extra">
                <Extra />
            </div>
        </div>
    );
};

export default Content;
