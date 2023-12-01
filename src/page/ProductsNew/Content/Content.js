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
import Product from '../../../models/productCreate';
import { useGetIntl } from '../../../locales/utils';
import './Content.scss';

const { TextArea } = Input;

/**
 * 产品信息
 */
const ProductInformation = ({ product, setProduct }) => {
    const getIntl = useGetIntl();
    return (
        <>
            <div>
                <Typography.Title level={5}>
                    {getIntl.get('ProductNew_ProductTitle')}
                </Typography.Title>
                <Form.Item
                    name={getIntl.get('ProductNew_ProductTitle')}
                    rules={[
                        {
                            required: true,
                            message: getIntl.get(
                                'ProductNew_PleaseEnterTheItemTitle',
                            ),
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
                <Typography.Title level={5}>
                    {getIntl.get('ProductNew_CommodityAbstract')}
                </Typography.Title>
                <Form.Item
                    name={getIntl.get('ProductNew_CommodityAbstract')}
                >
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
                <Typography.Title level={5}>
                    {getIntl.get('ProductNew_productDescription')}
                </Typography.Title>
                <RichTextEditor product={product} setProduct={setProduct} />
            </div>
        </>
    );
};

/**
 * 价格/交易，售价、原件、成本价
 */
const Price = ({ product, setProduct }) => {
    const getIntl = useGetIntl();
    const data = [
        {
            title: getIntl.get('ProductNew_Price_Title1'),
            tooltipTitle: getIntl.get('ProductNew_Price_TooltipTitle1'),
            name: '售价',
        },
        {
            title: getIntl.get('ProductNew_Price_Title2'),
            tooltipTitle: getIntl.get('ProductNew_Price_TooltipTitle2'),
            name: '原价',
        },
        {
            title: getIntl.get('ProductNew_Price_Title3'),
            tooltipTitle: getIntl.get('ProductNew_Price_TooltipTitle3'),
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
    const getIntl = useGetIntl();
    const data = [
        {
            title: 'SKU',
            name: 'SKU',
        },
        {
            title: getIntl.get('ProductNew_Stock_BarCode'),
            name: '条形码',
        },
        {
            title: getIntl.get('ProductNew_Stock_QuantityInStock'),
            name: '库存数量',
        },
    ];

    const t = e => {
        let item = e.target;

        switch (item.id) {
            case 'trigger_SKU':
                setProduct({ ...product, sku: item.value });
                break;
            case 'trigger_条形码':
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
                    <Form.Item name={item.name}>
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
    const getIntl = useGetIntl();
    const data = [
        {
            title: getIntl.get('ProductNew_CustomsInformation_title1'),
            tooltipTitle: getIntl.get(
                'ProductNew_CustomsInformation_tooltipTitle',
            ),
            name: '发货国家/地区',
            placeholder: '选择国家',
        },
        {
            title: getIntl.get('ProductNew_CustomsInformation_title2'),
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
    const getIntl = useGetIntl();
    const [product, setProduct] = useState(new Product());

    const cardItems = [
        {
            title: getIntl.get('ProductNew_CommodityInformation'),
            name: getIntl.get('ProductNew_CommodityInformation'),
            child: (
                <ProductInformation product={product} setProduct={setProduct} />
            ),
        },
        {
            title: getIntl.get('ProductNew_CommodityPictureOrVideo'),
            name: getIntl.get('ProductNew_CommodityPictureOrVideo'),
            child: <UploadImg />,
            extra: (
                <>
                    <Button type="link">
                        {getIntl.get('ProductNew_Add')}
                        &nbsp; <strong>URL</strong>
                    </Button>
                    <Button type="link">
                        {getIntl.get('ProductNew_AddAMultimediaFile')}
                    </Button>
                </>
            ),
        },
        {
            title: getIntl.get('ProductNew_PriceOrTrading'),
            name: getIntl.get('ProductNew_PriceOrTrading'),
            child: (
                <>
                    <Row gutter={25}>
                        <Price product={product} setProduct={setProduct} />
                    </Row>

                    <Row gutter={16}>
                        <Col md={12} lg={6}>
                            <p>
                                <span>
                                    {getIntl.get('ProductNew_profit')}{' '}
                                    &nbsp;
                                </span>
                                <Tooltip
                                    title={getIntl.get(
                                        'ProductNew_Profit_Tooltip',
                                    )}
                                >
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
                                <span>
                                    {getIntl.get(
                                        'ProductNew_profitMargin',
                                    )}{' '}
                                    &nbsp;
                                </span>
                                <Tooltip
                                    title={getIntl.get(
                                        'ProductNew_profitMargin_Tooltip',
                                    )}
                                >
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
                        <Checkbox checked>
                            {getIntl.get('ProductNew_Taxes')}
                        </Checkbox>
                    </div>
                </>
            ),
        },
        {
            title: getIntl.get('ProductNew_Stock'),
            name: getIntl.get('ProductNew_Stock'),
            child: (
                <>
                    <Row gutter={25}>
                        <Inventory product={product} setProduct={setProduct} />
                    </Row>
                    <Row>
                        <Checkbox checked>
                            {getIntl.get('ProductNew_Checkbox1_Text')}
                        </Checkbox>
                        <Checkbox>
                            {getIntl.get('ProductNew_Checkbox2_Text')}
                        </Checkbox>
                    </Row>
                </>
            ),
        },
        {
            title: getIntl.get('ProductNew_CustomsInformation'),
            name: getIntl.get('ProductNew_CustomsInformation'),
            child: (
                <Row gutter={25}>
                    <CustomsInformation />
                </Row>
            ),
        },
        {
            title: getIntl.get('ProductNew_MultiStyle'),
            name: getIntl.get('ProductNew_MultiStyle'),
            child: (
                <div>
                    <Checkbox>
                        {getIntl.get('ProductNew_MultipleStyles')}
                    </Checkbox>
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
