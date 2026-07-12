import { RightIcon } from "@/components/Icons/Icons";
import { Flex } from "antd";
import styled from "styled-components";

function CountCard() {
  return (
    <Scoped>
      <div className="count-card-title">待办</div>
      <Flex justify="space-between" gap={20}>
        <Flex className="count-card-item" align="center">
          <div>
            <Flex align="center" gap={8}>
                <img src="/img/commons/home.png" alt="home" />
                <div className="text color-7A8499">添加预警提醒</div>
            </Flex>
            <div className="font-28 font-w-500" style={{marginTop:"12px"}}>当前未开启</div>
          </div>
          <div className="font-14 color-356DFF cursor-pointer">去开通</div>
        </Flex>
        <Flex className="count-card-item" align="center">
          <div>
            <Flex align="center" gap={8}>
                <img src="/img/commons/order.png" alt="order" />
                <div className="text color-7A8499">添加预警提醒</div>
            </Flex>
            <div className="font-28 font-w-500" style={{marginTop:"12px"}}>当前未开启</div>
          </div>
          <Flex className="icon-box cursor-pointer">
            <RightIcon />
          </Flex>
        </Flex>
        <Flex className="count-card-item" align="center">
          <div>
            <Flex align="center" gap={8}>
                <img src="/img/commons/taking.png" alt="taking" />
                <div className="text color-7A8499">添加预警提醒</div>
            </Flex>
            <div className="font-28 font-w-500" style={{marginTop:"12px"}}>当前未开启</div>
          </div>
          <Flex className="icon-box cursor-pointer">
            <RightIcon />
          </Flex>
        </Flex>
      </Flex>
    </Scoped>
  )
}
export default CountCard;


const Scoped = styled.div`
    .count-card-title{
        margin:20px 0;
    }
    .count-card-item{
        flex:1;
        justify-content: space-between;
        padding:16px;
        background: linear-gradient(240.87deg, rgba(247, 248, 251, .75), rgba(247, 248, 251, .375) 98.92%);
        border: 1px solid #eaedf1;

        .icon-box{
            align-items: center;
            justify-content: center;
            background: #eef1f7;
            border-radius: 100%;
            cursor: pointer;
            height: 30px;
            width: 30px;
        }

        .text{
            border-bottom: 1px dashed #b8becc;
        }
        img{
            width: 30px;
            height: 30px;
        }
    }

`