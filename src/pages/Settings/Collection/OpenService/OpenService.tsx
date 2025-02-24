import { ArrowLeftOutlined, BulbOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import styled from "styled-components";
import OpeningConditionCard from "./OpeningConditionCard";
import { history } from "@umijs/max";
import PaymentServiceProviderCard from "./PaymentServiceProviderCard";

// const Header:React.FC = ()=>(
//     <div className="">
//         123
//     </div>
// )

function OpenService(){
    return (
        <div>
            <Header>
                <Flex align="center">
                    <div onClick={()=>{
                        history.push("/settings/payments")
                    }} className="mc-header-left-secondary">
                        <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                    </div>
                    <div className="mc-header-left-content color-242833 font-16 font-w-600">开通服务</div>
                </Flex>
                <div className="color-356DFF cursor-pointer" onClick={()=>window.open("https://help.handingyun.cn/")}>
                    <BulbOutlined />
                    <span style={{marginLeft:"8px"}}>帮助中心</span>
                </div>
            </Header>
            <Content>
                <OpeningConditionCard />
                <PaymentServiceProviderCard />
            </Content>
        </div>
    )
}

export default OpenService;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    padding: 0 24px;
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    /* pointer-events: none; */
    .mc-header-left-secondary {
        height: 32px;
        width: 32px;
        border: #d7dbe7 1px solid;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-content: center;
        &:hover{
            background-color:  #eaf0ff;
            cursor: pointer;
        }
        &-icon {
            font-size: 18px;
        }
    }
    .mc-header-left-content{
        margin-left: 8px;
    }
`

const Content = styled.div`
    position: relative;
    top: 60px;
    max-width: 1200px;
    min-width: 440px;
    margin: 0 auto;
    padding-bottom: 24px;
`