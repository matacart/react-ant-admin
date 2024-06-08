import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export default function LittleLayout({ back, title, children, more }: {
    back?: boolean | false
    title: string
    children: any;
    more?: any;
}) {

    return (
        <Scoped>
            <div className="layout-header">
                <span className="header-left">
                    {back && (
                        <Button className="back-btn" icon={<ArrowLeftOutlined />}
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                        </Button>
                    )}
                    <span className="title">
                        {title}
                    </span>
                </span>
                <span className="header-right">
                    {more}
                </span>
            </div>
            <div className="body">
                {children}
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
max-width:1220px;
min-width:550px;
margin:0 auto;
overflow: hidden;
.layout-header{
    color: #242833;
    font-size: 38px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.23;
    line-height: 32px;
    align-items: center;
    display: flex;
    margin: 24px 0;
    justify-content:space-between;
    &-left{
        display: flex;
        align-items:center;
    }
    &-right{
        display: flex;
        align-items: center;
    }
    .back-btn{
        margin-right: 10px;
    }
}
.body{

}
`