import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { history } from "@umijs/max";
import { Flex } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

// 

interface dataType{
    name:string,
    title:string,
    description:string,
    footer:ReactNode,
    icon:string,
}

function IndexCard(data:dataType) {
  return (
    <Scoped>
        <div className="head">
            <Flex gap={12} align="center">
                <div className="icon"><img src="/icons/meta.svg" /></div>
                {data.name}
            </Flex>
        </div>
        <Flex className="main">
            <div className="left">
                <div className="font-w-500" style={{marginBottom:"20px"}}>{data.title}</div>
                <div className="font-w-400 font-14" style={{marginBottom:"32px"}}>{data.description}</div>
                {data.footer}
                {/* <Flex gap={12}>
                    <DefaultButton text={"了解详情"} />
                    {data.link2 && <PrimaryButton text={"前往设置"} onClick={()=>history.push(data.link2)} />}
                </Flex> */}
            </div>
            <div className="right">
                <img src={data.icon} />
            </div>
        </Flex>
    </Scoped>
  );
}


export default IndexCard;


const Scoped = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    margin-bottom: 20px;
    border-radius: 6px;
    background: #fff;
    color: #242833;
    /* border: 1px solid #d7dbe7; */
    overflow: hidden;
    .head{
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 18px 24px;
        border-bottom: 1px solid #eef1f6;
    }
    .main{
        padding: 0 0 0 32px;
        align-items: center;
        .left{
            flex: 1; /* 占据剩余空间 */
            padding: 20px 0;
            overflow: hidden;
        }
        .right{
            width: 380px;
            img{
                width: 100%;
                /* height: 100%; */
                object-fit: cover;
            }
        }
    }
`
