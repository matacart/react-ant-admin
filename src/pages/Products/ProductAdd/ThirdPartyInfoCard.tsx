import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import styled from "styled-components";


export default function ThirdPartyInfoCard() {

    return (
        <Scoped>
            <Card>
                <div className="title">
                    绑定第三方商品
                    <Tooltip title="客户可以从商品详情页访问已绑定的第三方商品链接">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined />
                        </span>
                    </Tooltip>
                </div>
                <div className="content">
                    <div>
                        <div className="between">
                            <div className="item-name">亚马逊</div>
                            <a>编辑</a>
                        </div>
                        <div className="twoLineUrl">未绑定</div>
                    </div>
                    <div>
                        <div className="between">
                            <div className="item-name">乐天</div>
                            <a>编辑</a>
                        </div>
                        <div className="twoLineUrl">未绑定</div>
                    </div>
                    <div>
                        <div className="between">
                            <div className="item-name">雅虎</div>
                            <a>编辑</a>
                        </div>
                        <div className="twoLineUrl">未绑定</div>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
.between{
    display:flex;
    justify-content: space-between;
}
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px
}
.content{
    display:flex;
    flex-direction: column;
    gap: 15px;
}
a{
    font-weight: 400;
}
.item-name{
    color: #242833;
    margin-bottom: 8px;
}
.twoLineUrl{
    color: #7a8499;
}

`

