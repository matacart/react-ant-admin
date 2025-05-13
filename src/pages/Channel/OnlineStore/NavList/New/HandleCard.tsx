import { ExportOutlined } from "@ant-design/icons";
import { Card, Input, Select } from "antd";
import styled from "styled-components";


export default function HandleCard() {
    return (
        <Scoped>
            <Card>
                <div className="title">
                    Handle
                </div>
                <p className="font-12 color-7A8499">
                    handle 用于引用菜单导航中的菜单。例如，菜单标题为“Main menu”，其默认 handle 为 main-menu。
                </p>
                <div style={{marginBottom:"12px"}}>
                    <a>了解更多 <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a>
                </div>
                <div>
                    <Input placeholder="请输入" />
                </div>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
.title{
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px
}
`