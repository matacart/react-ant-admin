import LittleLayout from "@/components/Layout/LittleLayout";
import { Link } from "@umijs/max";
import { Col, Row } from "antd";
import styled from "styled-components";

const settingArray = [
    {
        icon: '/icons/set.svg',
        title: '基础设置',
        desc: '设置并更新你的商店信息',
        url: '/settings/base',
    }, {
        icon: '/icons/set/pay.svg',
        title: '收款',
        desc: '管理商店的支付服务',
    }, {
        icon: '/icons/set/send.svg',
        title: '发货与配送',
        desc: '管理你向客户发送商品的物流方式',
    }, {
        icon: '/icons/set/place.svg',
        title: '仓库地点',
        desc: '管理仓库的地点信息',
        url:"/settings/location",
    }, {
        icon: '/icons/set/tax.svg',
        title: '税费',
        desc: '商店购物税费相关设定',
    }, {
        icon: '/icons/set/lang.svg',
        title: '语言',
        desc: '管理客户可以在商店中使用的语言',
        more: '当前商店语言：简体中文',
        url:"/settings/lang",
    },{
        icon: '/icons/set/account.svg',
        title: '客户账户',
        desc: '管理网店客户的登录注册方式',
    },{
        icon: '/icons/set/authority.svg',
        title: '管理员和权限',
        desc: '管理你的员工，以及员工可查看的内容或可执行的操作',
    },{
        icon: '/icons/set/file.svg',
        title: '文件库',
        desc: '管理你上传的所有文件素材',
        url:"/settings/fileManage",
    },{
        icon: '/icons/set/notice.svg',
        title: '通知',
        desc: '编辑你的邮件通知模板',
    },{
        icon: '/icons/set/domain.svg',
        title: '域名',
        desc: '管理商店域名',
    },{
        icon: '/icons/set/settle.svg',
        title: '结账',
        desc: '自定义你的网点结账流程',
    },{
        icon: '/icons/set/package.svg',
        title: '套餐',
        desc: '管理你的店铺套餐，并查看订单',
        url: '/settings/package'
    },{
        icon: '/icons/set/rules.svg',
        title: '规则',
        desc: '管理你店铺的规则页面',
    },{
        icon: '/icons/set/operation.svg',
        title: '操作日志',
        desc: '展示员工在店内的操作记录',
    },{
        icon: '/icons/set/metafields.svg',
        title: '元字段',
        desc: '利用原字段扩展你的店铺',
    },{
        icon: '/icons/set/gift-card.svg',
        title: '礼品卡',
        desc: '设置礼品卡的有效时间',
    },{
        icon: '/icons/set/brand.svg',
        title: '品牌',
        desc: '管理你的品牌资产',
    },{
        icon: '/icons/set/markets.svg',
        title: '市场',
        desc: '管理你的国际市场',
    },{
        icon: '/icons/set/merchantSetup.svg',
        title: '商户设置',
        desc: '管理你的商户信息',
    }
]






export default function Settings() {
    return (
        <Scoped>
            <LittleLayout title="设置">
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