import MyButton from "@/components/Button/MyButton";
import { Flex } from "antd";
import styled from "styled-components";
import cookie from 'react-cookies';

function Header() {

  const storeInfo = cookie.load("domain") || {};


  return <Scoped>
    <Flex align="center" gap={8}>
      <img src="/img/logo/stock_logo.png" alt="logo" style={{ width: 32, height: 32 }} />
      <h1 className="title">智能库存管理</h1>
    </Flex>
    <Flex gap={12} align="center">
      <MyButton className="right-btn" text="门店补货清单" />
      <MyButton className="right-btn" text="任务清单" />
      <span>{storeInfo?.store_name || ""}</span>
    </Flex>
  </Scoped>;
}

const Scoped = styled.div`
    background-color: #f2f5ff;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
      font-size: 18px;
      margin: 0px;
    }
    .right-btn{
      border: 0px;
    }
`;

export default Header;
