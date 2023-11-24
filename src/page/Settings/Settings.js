import Header from '../../component/MainHeader/MainHeader';
import {
    BasicSettings,
    Wallet,
    Distribution,
    Location,
    Taxation,
    Language,
    Customer,
    Administrators,
    FileLibrary,
    Notice,
    DomainName,
    ShoppingBags,
    Package,
    Information,
    Journal,
    Metafield,
    GiftCard,
    Brand,
    Market,
} from '../../component/Icon/Icon';
import { Row, Col } from 'antd';
import './Settings.scss';
import { Link } from 'react-router-dom';

/**
 * 卡片
 */
const Card = ({ icon, title, subTitle }) => {
    return (
        <div className="item">
            <div className="item-icon">{icon}</div>
            <div className="item-body">
                <div className="title">{title}</div>
                <div className="description">{subTitle}</div>
            </div>
        </div>
    );
};

const Settings = () => {
    const data = [
        {
            icon: <BasicSettings />,
            title: '基本设置',
            subTitle: '设置并更新你的商店详细信息',
        },
        {
            icon: <Wallet />,
            title: '收款',
            subTitle: '管理商店的支付服务',
        },
        {
            icon: <Distribution />,
            title: '发货与配送',
            subTitle: '管理你向客户发送商品的物流方式',
        },
        {
            icon: <Location />,
            title: '地点',
            subTitle: '管理店铺的地点信息',
        },
        {
            icon: <Taxation />,
            title: '税费',
            subTitle: '商店购物税费相关设定',
        },
        {
            icon: <Language />,
            title: '语言',
            subTitle: '管理客户可以在商店中使用的语言',
        },
        {
            icon: <Customer />,
            title: '客户账户',
            subTitle: '管理网店客户的登录注册方式',
        },
        {
            icon: <Administrators />,
            title: '管理员和权限',
            subTitle: '管理你的员工，以及员工可查看的内容或可执行的操作',
        },
        {
            icon: <FileLibrary />,
            title: '文件库',
            subTitle: '管理你上传的所有文件素材',
        },
        {
            icon: <Notice />,
            title: '通知',
            subTitle: '编辑你的邮件通知模板',
        },
        {
            icon: <DomainName />,
            title: '域名',
            subTitle: '管理商店域名',
        },
        {
            icon: <ShoppingBags />,
            title: '结账',
            subTitle: '自定义你的网点结账流程',
        },
        {
            icon: <Package />,
            title: '套餐',
            subTitle: '管理你的店铺套餐，并查看账单',
        },
        {
            icon: <Information />,
            title: '规则',
            subTitle: '管理你店铺的规则页面',
        },
        {
            icon: <Journal />,
            title: '操作日志',
            subTitle: '展示员工在店内的操作记录',
        },
        {
            icon: <Metafield />,
            title: '元字段',
            subTitle: '利用元字段扩展你的店铺',
        },
        {
            icon: <GiftCard />,
            title: '礼品卡',
            subTitle: '设置礼品卡的有效时间',
        },
        {
            icon: <Brand />,
            title: '品牌',
            subTitle: '管理你的品牌资产',
        },
        {
            icon: <Market />,
            title: '市场',
            subTitle: '管理你的国际市场',
        },
    ];

    return (
        <div>
            <Header props=""></Header>
            <Row gutter={[24, 24]}>
                {data.map((item, index) => (
                    <Col span={8} key={index}>
                        <Link>
                            <Card {...item} />
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Settings;
