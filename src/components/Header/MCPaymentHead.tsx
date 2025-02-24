import { Avatar, Button, Flex, Input, theme } from "antd";
import styled from "styled-components";
import { Ping, Question, SelectLang } from "../RightContent";
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, BulbOutlined } from "@ant-design/icons";
import { QuitIcon } from "../Icons/Icons";


// const { token } = theme.useToken();

function MCPaymentHead(){


    useEffect(()=>{
    },[])
    return(
        <Scoped>
            <Flex align="center">
                <div className="mc-header-left-content color-242833 font-20 font-w-600">MataCart Payments</div>
            </Flex>
            <div className="color-356DFF cursor-pointer">
                <Button className="back-btn">
                    <QuitIcon />
                    返回店铺
                </Button>
            </div>
        </Scoped>
    )
}

export default MCPaymentHead;

const Scoped = styled.div`
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    /* .mc-header-left-content{
        margin-left: 8px;
    } */
    .back-btn{
        height: 36px;
    }
`