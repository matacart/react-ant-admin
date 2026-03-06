import { BellOutlined } from "@ant-design/icons";
import { Badge, Flex, Popover, Tooltip } from "antd";
import { history } from '@umijs/max';
import { useEffect, useState } from "react";
import { getNewUserMessage, getUserMessage } from "@/services/y2/api";
import { useAbortController } from "@/hooks/customHooks";
import styled from "styled-components";

function MessageCenter(){

    const [messageCount, setMessageCount] = useState(0);

    const [messages, setMessages] = useState([]);

    const { createAbortController } = useAbortController();

    useEffect(() => {
        const signal = createAbortController();
        // getNewUserMessage(signal).then(res => {
        //     res.code == 0 && setMessageCount(res.data?.newmsg || 0);
        // });
        // 获取未读消息
        // getUserMessage({
        //     page: 1, 
        //     limit: 10, 
        //     msg_type: "all",
        //     is_read: "unread"
        // }).then(res => {
        //     res.code == 0 && setMessages(res?.data || [])
        // });
    }, []);

    return(
        <>
            <Popover placement="bottom" title={
                <Title align="center">未读消息 ({messageCount}) </Title>
            } 
            content={<>
                <Content>
                    {messages.map((item:any, index) => (
                        <div className="content" key={index}>{item?.title}</div>
                    ))}
                </Content>
                {/*  */}
                <Flex style={{fontSize: '12px',marginTop: '8px'}} gap={12}>
                    <div className="cursor-pointer color-356DFF" onClick={() => history.push("/inner-msg/index")}>查看更多</div>
                    <div className="cursor-pointer color-356DFF" onClick={() => history.push("/inner-msg/index")}>消息管理</div>
                </Flex>
            </>}>
                <Flex>
                    <Badge count={messageCount}>
                        <BellOutlined style={{
                            fontSize: '16px',
                            display: 'flex',
                            padding:'8px'
                        }}
                        onClick={() => history.push("/inner-msg/index")}
                        />
                    </Badge>
                </Flex>
            </Popover>
        </>
    )
};

export default MessageCenter;

const Title = styled(Flex)`
    font-size: 14px;
    font-weight: bold;
`;

const Content = styled.div`
    max-height: 200px;
    max-width: 220px;
    font-size: 12px;
    overflow-y: auto;
    overflow-x: hidden;
    .content{
        overflow-wrap: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
