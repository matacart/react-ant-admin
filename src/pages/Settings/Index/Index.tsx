import LittleLayout from "@/components/Layout/LittleLayout";
import { Col, Row } from "antd";
import styled from "styled-components";
import { useIntl } from '@umijs/max';
import { Link } from "react-router-dom";
export default function Index() {

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
            title: intl.formatMessage({ id: 'settings.index.payments' }),
            desc: intl.formatMessage({ id: 'settings.index.paymentsDesc' }),
            url:"/settings/payments",
        }, {
            icon: '/icons/set/send.svg',
            title: intl.formatMessage({ id: 'settings.index.shippingAndDelivery' }),
            desc: intl.formatMessage({ id: 'settings.index.shippingAndDeliveryDesc' }),
            url:"/settings/delivery",
        }, {
            icon: '/icons/set/place.svg',
            title: intl.formatMessage({ id: 'settings.index.location' }),
            desc: intl.formatMessage({ id: 'settings.index.locationDesc' }),
            url:"/settings/location",
        }, {
            icon: '/icons/set/tax.svg',
            title: intl.formatMessage({ id: 'settings.index.taxesAndFees' }),
            desc: intl.formatMessage({ id: 'settings.index.taxesAndFeesDesc' }),
            url:"/settings/taxes",
        }, {
            icon: '/icons/set/lang.svg',
            title: intl.formatMessage({ id: 'settings.index.language' }),
            desc: intl.formatMessage({ id: 'settings.index.languageDesc' }),
            // more: intl.formatMessage({ id: 'settings.index.currentLanguage' })+lang(cookie.load("default_lang")),
            url:"/settings/lang",
        },{
            icon: '/icons/set/account.svg',
            title: intl.formatMessage({ id: 'settings.index.customerAccount' }),
            desc: intl.formatMessage({ id: 'settings.index.customerAccountDesc' }),
            url:"/settings/customer"
        },{
            icon: '/icons/set/authority.svg',
            title: intl.formatMessage({ id: 'settings.index.administratorAndPermissions' }),
            desc: intl.formatMessage({ id: 'settings.index.administratorAndPermissionsDesc' }),
            url:"/settings/adminpermission"
        },{
            icon: '/icons/set/file.svg',
            title: intl.formatMessage({ id: 'settings.index.fileLibrary' }),
            desc: intl.formatMessage({ id: 'settings.index.fileLibraryDesc' }),
            url:"/settings/fileManage",
        },{
            icon: '/icons/set/notice.svg',
            title: intl.formatMessage({ id: 'settings.index.notifications' }),
            desc: intl.formatMessage({ id: 'settings.index.notificationsDesc' }),
            url:"/settings/notice"
        },{
            icon: '/icons/set/domain.svg',
            title: intl.formatMessage({ id: 'settings.index.domain' }),
            desc: intl.formatMessage({ id: 'settings.index.domainDesc' }),
            url:"/settings/domain"
        },{
            icon: '/icons/set/settle.svg',
            title: intl.formatMessage({ id: 'settings.index.checkoutSettings' }),
            desc: intl.formatMessage({ id: 'settings.index.checkoutSettingsDesc' }),
            url:"/settings/settle"
        },{
            icon: '/icons/set/package.svg',
            title: intl.formatMessage({ id: 'settings.index.plan' }),
            desc: intl.formatMessage({ id: 'settings.index.planDesc' }),
            url: '/settings/package'
        },{
            icon: '/icons/set/rules.svg',
            title: intl.formatMessage({ id: 'settings.index.termsAndPolicies' }),
            desc: intl.formatMessage({ id: 'settings.index.termsAndPoliciesDesc' }),
            url:"/settings/rules"
        },{
            icon: '/icons/set/operation.svg',
            title: intl.formatMessage({ id: 'settings.index.operationLog' }),
            desc: intl.formatMessage({ id: 'settings.index.operationLogDesc' }),
            url:"/settings/operationLog"
        },{
            icon: '/icons/set/metafields.svg',
            title: intl.formatMessage({ id: 'settings.index.metafields' }),
            desc: intl.formatMessage({ id: 'settings.index.metafieldsDesc' }),
            url:"/settings/metafields"
        },{
            icon: '/icons/set/gift-card.svg',
            title: intl.formatMessage({ id: 'settings.index.giftCard' }),
            desc: intl.formatMessage({ id: 'settings.index.giftCardDesc' }),
            url:"/settings/giftCards"
        },{
            icon: '/icons/set/brand.svg',
            title: intl.formatMessage({ id: 'settings.index.brand' }),
            desc: intl.formatMessage({ id: 'settings.index.brandDesc' }),
            url:"/settings/brand"
        },{
            icon: '/icons/set/markets.svg',
            title: intl.formatMessage({ id: 'settings.index.markets' }),
            desc: intl.formatMessage({ id: 'settings.index.marketsDesc' }),
            url:"/settings/markets"
        },{
            icon: '/icons/set/merchantSetup.svg',
            title: intl.formatMessage({ id: 'settings.index.merchantSettings' }),
            desc: intl.formatMessage({ id: 'settings.index.merchantSettingsDesc' }),
        }
    ]

    return (
        <Scoped>
            <LittleLayout title={intl.formatMessage({ id: "settings.index.title" })}>
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