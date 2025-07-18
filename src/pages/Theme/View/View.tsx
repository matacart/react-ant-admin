import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import index from "../Template/Modern1/index.json";
import { Flex } from "antd";
import MyInput from "@/components/Input/MyInput";
import { FillLockIcon, FillUserIcon, MenuIcon } from "@/components/Icons/Icons";
import Main from "./Main";
import styled from "styled-components";

function View(){

    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get("themeId")
    const page = searchParams.get("page")

    const data = index.data

    useEffect(()=>{
        console.log(data)
    },[])

    return (
        <Scoped className="view">
            {/* announcement-bar */}
            <div className="announcement-bar-list">
                {data[0].config?.settingsData.block_order.map((blockOrder:string,index)=>{
                    const announcement = data[0].config.settingsData.blocks[blockOrder] 
                    return(
                        <div className="announcement-bar" style={{backgroundColor:"#000000",color:"#FFFFFF",textAlign:"center",padding:"6px 0",fontSize:"12px"}}>
                            {announcement.settings.notice_link_text.value}
                        </div>
                    )
                })}
            </div>
            {/* header */}
            <div className="header-bar">
                <div style={{padding:"6px 0"}}>
                    <Flex style={{padding:"0 30px"}} align="center">
                        <div style={{flex:1,flexShrink:"0"}}>
                            <Flex>
                                <MenuIcon className="font-28" />
                            </Flex>
                        </div>
                        <div style={{fontSize:"28px",fontWeight:"500"}}>服饰</div>
                        <Flex style={{flex:1,flexShrink:"0"}} justify="flex-end">
                            <div style={{padding:"20px 20px 20px 0px"}}>
                                <MyInput style={{width:"280px",height:"38px"}} placeholder="Enter here and click search" />
                            </div>
                            <Flex gap={8}>
                                <FillUserIcon className="font-28" />
                                <FillLockIcon className="font-28" />
                            </Flex>
                        </Flex>
                    </Flex>
                </div>
            </div>
            {/* main */}
            <Main />
            {/* footer */}
            <div className="footer">
                <div className="container">
                    <div className="top">
                        <div className="footer-block">
                            <div className="title">
                                Menu title
                            </div>
                            <div className="content">
                                <div>Search</div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-block--newsletter" style={{margin:"40px 0",height:"1px"}}>
                    </div>
                    <Flex className="bottom" gap={8}>
                        <div>© 2025</div>
                        <div>服饰</div>
                    </Flex>
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    .footer{
        background-color:rgb(0, 0, 0);
        color:#FFFFFF;
        .container{
            width: 100%;
            max-width: calc(60px + 1760px);
            margin: auto;
            padding: 20px 30px;
            .top{
                display: flex;
                .footer-block{
                    margin-top: 20px;
                    width: 33.3%;
                    text-align: center;
                    .title{
                        font-size: 16px;
                    }
                    .content{
                        div{
                            margin-top: 14px;
                            font-size: 14px;
                        }
                    }
                }
            }
            .bottom{
                font-size: 12px;
            }
        }
    }

`

export default View