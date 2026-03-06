import PrimaryButton from "@/components/Button/PrimaryButton"
import { FaceBookIcon, TickIcon, UserNoIcon } from "@/components/Icons/Icons"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Flex, Steps, StepsProps, Tooltip } from "antd"
import styled from "styled-components"

function FanPageCard() {

    const styleIcon = {
        width: '24px',
        height: '24px',
        border: '1px solid #B8BECC',
        borderRadius: '24px',
        backgroundColor: '#fff',
        borderColor: '#B8BECC',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const items = [
        {
            icon:<div style={styleIcon}>1</div>,
            status:"wait",
            title: <div className="color-474F5E font-w-500">连接账号</div>,
            description: <div className="font-12">点击【开始连接】按钮，连接你的Facebook账号</div>
        },
        {
            icon:<div style={styleIcon}>2</div>,
            status:"wait",
            title: <div className="color-474F5E font-w-500">选择主页</div>,
            description: <div className="font-12">选择需要管理的粉丝主页</div>
        },
        {
            icon:<div style={styleIcon}>3</div>,
            status:"wait",
            title: <div className="color-474F5E font-w-500">获取授权</div>,
            description: <div className="font-12">勾选授权全部权限</div>
        },
        {
            icon:<div style={styleIcon}>
                <TickIcon />
            </div>,
            status:"wait",
            title: <div className="color-474F5E font-w-500">连接成功</div>,
        },
    ];


    return (
        <MyCard>
            <div className="font-16 font-w-500 title">
                <Flex align="flex-start" gap={12}>
                    <FaceBookIcon className="font-24" />
                    <div className="title-warp">
                        <div className="title-warp-name">Facebook粉丝主页账号</div>
                        <div className="font-12 color-7A8499">
                            已添加0个，剩余可添加5个
                            <Tooltip title="您可添加的粉丝页数量由您购买的套餐和粉丝页商品共同决定（至多10个）。若需要增加数量，可升级套餐或购买粉丝主页">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                            <span className="title-warp-link">购买粉丝主页</span>
                        </div>
                    </div>
                </Flex>
            </div>
            {/*  */}
            <Flex gap={12} justify="space-between" className="userBox">
                <Flex align="center" gap={12}>
                    <UserNoIcon />
                    <div className="color-474F5E">未连接</div>
                </Flex>
                <PrimaryButton text="开始连接" />
            </Flex>
            {/* setup */}
            <div className="setup-warp color-7A8499">
                <div style={{marginBottom:"12px"}}>连接步骤</div>
                <div style={{ flex: 1 }}>
                    <Steps direction="vertical" items={items as StepsProps['items']} size="small" current={0} />
                </div>
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
        &-warp{
            &-name{
                margin-bottom: 6px;
            }
            &-link{
                color: #356DFF;
                cursor: pointer;
                margin-left: 20px;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
    .userBox{
        margin: 20px 0;
    }
    .setup-warp{
        .icon{
            width: 24px;
            height: 24px;
        }
    }
`

export default FanPageCard