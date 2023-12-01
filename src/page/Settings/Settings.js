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
import { GetIntl } from '../../locales/utils';

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

/**
 * 设置 Page
 */
const Settings = () => {
    const data = [
        {
            icon: <BasicSettings />,
            title: GetIntl('Setting_title_BasicSettings'),
            subTitle: GetIntl('Setting_subTitle_BasicSettings'),
        },
        {
            icon: <Wallet />,
            title: GetIntl('Setting_title_MakeCollections'),
            subTitle: GetIntl('Setting_subTitle_MakeCollections'),
        },
        {
            icon: <Distribution />,
            title: GetIntl('Setting_title_DeliveryAndDistribution'),
            subTitle: GetIntl('Setting_subTitle_DeliveryAndDistribution'),
        },
        {
            icon: <Location />,
            title: GetIntl('Setting_title_Place'),
            subTitle: GetIntl('Setting_subTitle_Place'),
        },
        {
            icon: <Taxation />,
            title: GetIntl('Setting_title_ExpenseOfTaxation'),
            subTitle: GetIntl('Setting_subTitle_ExpenseOfTaxation'),
        },
        {
            icon: <Language />,
            title: GetIntl('Setting_title_Language'),
            subTitle: GetIntl('Setting_subTitle_Language'),
        },
        {
            icon: <Customer />,
            title: GetIntl('Setting_title_CustomerAccount'),
            subTitle: GetIntl('Setting_subTitle_CustomerAccount'),
        },
        {
            icon: <Administrators />,
            title: GetIntl('Setting_title_AdministratorsAndPermissions'),
            subTitle: GetIntl('Setting_subTitle_AdministratorsAndPermissions'),
        },
        {
            icon: <FileLibrary />,
            title: GetIntl('Setting_title_DocumentLibrary'),
            subTitle: GetIntl('Setting_subTitle_DocumentLibrary'),
        },
        {
            icon: <Notice />,
            title: GetIntl('Setting_title_Inform'),
            subTitle: GetIntl('Setting_subTitle_Inform'),
        },
        {
            icon: <DomainName />,
            title: GetIntl('Setting_title_DomainName'),
            subTitle: GetIntl('Setting_subTitle_DomainName'),
        },
        {
            icon: <ShoppingBags />,
            title: GetIntl('Setting_title_BalanceTheBooks'),
            subTitle: GetIntl('Setting_subTitle_BalanceTheBooks'),
        },
        {
            icon: <Package />,
            title: GetIntl('Setting_title_SetMeal'),
            subTitle: GetIntl('Setting_subTitle_SetMeal'),
        },
        {
            icon: <Information />,
            title: GetIntl('Setting_title_Rule'),
            subTitle: GetIntl('Setting_subTitle_Rule'),
        },
        {
            icon: <Journal />,
            title: GetIntl('Setting_title_OperationLog'),
            subTitle: GetIntl('Setting_subTitle_OperationLog'),
        },
        {
            icon: <Metafield />,
            title: GetIntl('Setting_title_MetaField'),
            subTitle: GetIntl('Setting_subTitle_MetaField'),
        },
        {
            icon: <GiftCard />,
            title: GetIntl('Setting_title_GiftCard'),
            subTitle: GetIntl('Setting_subTitle_GiftCard'),
        },
        {
            icon: <Brand />,
            title: GetIntl('Setting_title_Brand'),
            subTitle: GetIntl('Setting_subTitle_Brand'),
        },
        {
            icon: <Market />,
            title: GetIntl('Setting_title_Agora'),
            subTitle: GetIntl('Setting_subTitle_Agora'),
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
