import { Col, Flex, Grid, Row } from "antd";
import Left from "../Left/Left";
import styled from "styled-components";
import { useEffect } from "react";
import home from "../data/InstalledSections/home.json"
export default function Home(){

    useEffect(()=>{
        console.log(home.data)
    },[])

    return(
        <Scoped>
            <div className="left">
                <Left />
            </div>
            <div className="center">
                <div className="viewBox">
                    {/* head */}
                    {home.data.map(item=>{
                        if(item.type=="SECTION" && item.config?.type=="announcement-bar"){
                            console.log(item.config)
                            return item.config.settingsData.block_order.map(block=>{
                                return(
                                    <div style={{paddingTop:"10px",paddingBottom:"10px",backgroundColor:"#000",color:"#FFF",textAlign:"center"}}>{item.config.settingsData.blocks[block].settings.notice_link_text.value}</div>
                                )
                            })
                        }
                    })}
                    <div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div>Right</div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    display: flex;
    .left{
        width: 372px;
    }
    .center{
        flex: 1;
        box-sizing: border-box;
        .viewBox{
            margin: 16px;
            /* width: 100%; */
        }
    }
    .right{
        width: 320px;
    }
`