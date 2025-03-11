import LittleLayout from "@/components/Layout/LittleLayout";
import { Link, useIntl } from "@umijs/max";
import { Col, Row } from "antd";
import { urlencoded } from "express";
import styled from "styled-components";
import cookie from 'react-cookies';


export default function Settings() {

    const intl = useIntl();

    // 语言
    const lang = (langCode:string)=>{
        switch (langCode) {
            case 'zh-cn':
                return intl.formatMessage({ id: 'settings.index.zh-cn' });
            case 'zh-tw':
                return intl.formatMessage({ id: 'settings.index.zh-tw' });
            case 'en-us':
                return intl.formatMessage({ id: 'settings.index.en-us' });
            case 'ja-jp':
                return intl.formatMessage({ id: 'settings.index.ja-jp' });
            case 'ko-kr':
                return intl.formatMessage({ id: 'settings.index.ko-kr' });
            case 'de-de':
                return intl.formatMessage({ id: 'settings.index.de-de' });
            case 'ru-ru':
                return intl.formatMessage({ id: 'settings.index.ru-ru' });
            case 'fr-fr':
                return intl.formatMessage({ id: 'settings.index.fr-fr' });
            case 'es-es':
                return intl.formatMessage({ id: 'settings.index.es-es' });
            case 'pt-pt':
                return intl.formatMessage({ id: 'settings.index.pt-pt' });
            case 'th-th':
                return intl.formatMessage({ id: 'settings.index.th-th' });
            case 'ms-my':
                return intl.formatMessage({ id: 'settings.index.ms-my' });
            case 'bn-bd':
                return intl.formatMessage({ id: 'settings.index.bn-bd' });
            case 'vi-vn':
                return intl.formatMessage({ id: 'settings.index.vi-vn' });
            case 'en-au':
                return intl.formatMessage({ id: 'settings.index.en-au' });
            case 'id-id':
                return intl.formatMessage({ id: 'settings.index.id-id' });
            case 'es-mx':
                return intl.formatMessage({ id: 'settings.index.es-mx' });
            case 'ar':
                return intl.formatMessage({ id: 'settings.index.ar' });
            case 'it-it':
                return intl.formatMessage({ id: 'settings.index.it-it' });
            default:
                return langCode;
        }
    }

    const settingArray = [
        {
            icon: '/icons/set.svg',
            title: intl.formatMessage({ id: 'settings.index.basic' }),
            desc: intl.formatMessage({ id: 'settings.index.basicDesc' }),
            url: '/settings/base',
        }, {
            icon: '/icons/set/pay.svg',
            title: intl.formatMessage({ id: 'settings.index.Payments' }),
            desc: intl.formatMessage({ id: 'settings.index.PaymentsDesc' }),
            url:"/settings/payments",
        }, {
            icon: '/icons/set/send.svg',
            title: intl.formatMessage({ id: 'settings.index.ShippingAndDelivery' }),
            desc: intl.formatMessage({ id: 'settings.index.ShippingAndDeliveryDesc' }),
            url:"/settings/delivery",
        }, {
            icon: '/icons/set/place.svg',
            title: intl.formatMessage({ id: 'settings.index.Location' }),
            desc: intl.formatMessage({ id: 'settings.index.LocationDesc' }),
            url:"/settings/location",
        }, {
            icon: '/icons/set/tax.svg',
            title: intl.formatMessage({ id: 'settings.index.TaxesAndFees' }),
            desc: intl.formatMessage({ id: 'settings.index.TaxesAndFeesDesc' }),
            url:"/settings/taxes",
        }, {
            icon: '/icons/set/lang.svg',
            title: intl.formatMessage({ id: 'settings.index.Language' }),
            desc: intl.formatMessage({ id: 'settings.index.LanguageDesc' }),
            more: intl.formatMessage({ id: 'settings.index.currentLanguage' })+lang(cookie.load("default_lang")),
            url:"/settings/lang",
        },{
            icon: '/icons/set/account.svg',
            title: intl.formatMessage({ id: 'settings.index.CustomerAccount' }),
            desc: intl.formatMessage({ id: 'settings.index.CustomerAccountDesc' }),
            url:"/settings/customer"
        },{
            icon: '/icons/set/authority.svg',
            title: intl.formatMessage({ id: 'settings.index.AdministratorAndPermissions' }),
            desc: intl.formatMessage({ id: 'settings.index.AdministratorAndPermissionsDesc' }),
            url:"/settings/adminpermission"
        },{
            icon: '/icons/set/file.svg',
            title: intl.formatMessage({ id: 'settings.index.FileLibrary' }),
            desc: intl.formatMessage({ id: 'settings.index.FileLibraryDesc' }),
            url:"/settings/fileManage",
        },{
            icon: '/icons/set/notice.svg',
            title: intl.formatMessage({ id: 'settings.index.Notifications' }),
            desc: intl.formatMessage({ id: 'settings.index.NotificationsDesc' }),
            url:"/settings/notice"
        },{
            icon: '/icons/set/domain.svg',
            title: intl.formatMessage({ id: 'settings.index.Domain' }),
            desc: intl.formatMessage({ id: 'settings.index.DomainDesc' }),
            url:"/settings/domain"
        },{
            icon: '/icons/set/settle.svg',
            title: intl.formatMessage({ id: 'settings.index.CheckoutSettings' }),
            desc: intl.formatMessage({ id: 'settings.index.CheckoutSettingsDesc' }),
            url:"/settings/settle"
        },{
            icon: '/icons/set/package.svg',
            title: intl.formatMessage({ id: 'settings.index.Plan' }),
            desc: intl.formatMessage({ id: 'settings.index.PlanDesc' }),
            url: '/settings/package'
        },{
            icon: '/icons/set/rules.svg',
            title: intl.formatMessage({ id: 'settings.index.TermsAndPolicies' }),
            desc: intl.formatMessage({ id: 'settings.index.TermsAndPoliciesDesc' }),
            url:"/settings/rules"
        },{
            icon: '/icons/set/operation.svg',
            title: intl.formatMessage({ id: 'settings.index.OperationLog' }),
            desc: intl.formatMessage({ id: 'settings.index.OperationLogDesc' }),
            url:"/settings/operationLog"
        },{
            icon: '/icons/set/metafields.svg',
            title: intl.formatMessage({ id: 'settings.index.Metafields' }),
            desc: intl.formatMessage({ id: 'settings.index.MetafieldsDesc' }),
            url:"/settings/metafields"
        },{
            icon: '/icons/set/gift-card.svg',
            title: intl.formatMessage({ id: 'settings.index.GiftCard' }),
            desc: intl.formatMessage({ id: 'settings.index.GiftCardDesc' }),
            url:"/settings/giftCards"
        },{
            icon: '/icons/set/brand.svg',
            title: intl.formatMessage({ id: 'settings.index.Brand' }),
            desc: intl.formatMessage({ id: 'settings.index.BrandDesc' }),
            url:"/settings/brand"
        },{
            icon: '/icons/set/markets.svg',
            title: intl.formatMessage({ id: 'settings.index.Markets' }),
            desc: intl.formatMessage({ id: 'settings.index.MarketsDesc' }),
            url:"/settings/markets"
        },{
            icon: '/icons/set/merchantSetup.svg',
            title: '商户设置',
            desc: '管理你的商户信息',
        }
    ]

    return (
        <Scoped>
            <LittleLayout title={intl.formatMessage({ id: 'settings.title' })}>
                <Row className="settings-body" gutter={[20, 20]} >
                    {settingArray.map((item) => (
                        <Col span={8}>
                            <Link className="settings-item" to={item.url?item.url:'#'}  >
                                <div className="moduleItemIcon">
                                    <img src={item.icon} />
                                </div>
                                <div className="moduleItemBody">
                                    <p className="title">
                                        {item.title}
                                    </p>
                                    <p className="more">
                                        {item?.more}
                                    </p>
                                    <div className="desc">
                                        {item.desc}
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </LittleLayout>
        </Scoped>
    )
}

const Scoped = styled.div`
p{
    color: black;
}
.settings-body{

}
.settings-item{
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    align-items: flex-start;
    height: 100%;
    min-height: 104px;
    padding: 28px 24px;
    border-radius: 8px;
    background-color: #fff;
    &:hover{
        background-color:#f0f7ff;
        box-shadow: 0 0 32px rgba(0, 0, 0, 0.12);
    }
    .moduleItemIcon{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f8fc;
    }
    .moduleItemBody{
        margin-left: 24px;
        .title{
            margin-bottom: 6px;
            color: #242833;
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
        }
        .desc{
            color: #7a8499;
            font-size: 14px;
            font-weight: normal;
            line-height: 20px;
        }
        .more{
            font-size: 14px;
            font-weight:400;
        }
    }
}

`