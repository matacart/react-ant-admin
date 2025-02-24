import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, Tag } from "antd";
import styled from "styled-components";
import cookie from 'react-cookies';
import { InfoCircleFilled } from "@ant-design/icons";

export default function TopicConfiguration() {
  return(
    <Scoped>
        <Card>
            <div className="color-242833">主题配置</div>
            <div className="font-12 color-474F5E">自定义结账流程和新客户账户的主题与应用</div>
            {/* 提示标签 */}
            <Tag
                className='tag'
                closable
            >
                <div className="text-box">
                    <InfoCircleFilled className="color-356DFF" />
                    <span style={{marginLeft:"8px"}}>检测到存在默认初始化的地点数据，请先前往地点设置更新</span>
                    <a className="color-356DFF">地点设置</a>
                </div>
            </Tag>
            <Button className="custom-btn">自定义结账</Button>
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
    .tag{
        width: 100%;
        font-size: 14px;
        margin-top:12px;
        padding: 8px 16px;
        background-color: #E2F0FF;
        .text-box{
            display: inline-block;
            width: 99%;
        }
    }
    .custom-btn{
        margin-top: 20px;
    }
`