import { HelpIcon, LeftIcon, PreviewIcon, RemitIcon, TiledIcon } from "@/components/Icons/Icons";
import MySelect from "@/components/Select/MySelect";
import codeEditor from "@/store/theme/codeEditor";
import { Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ItemType{
    icon: React.ReactNode,
    title: string,
    onClick: () => void
}

function Header(){

    const navigate = useNavigate();

    const itemList = [
        {
            icon: <TiledIcon className="font-20" />,
            title: '查看模板编辑器',
            onClick: () => {}
        },
        {
            icon: <HelpIcon className="font-20" />,
            title: '模板定制协助',
            onClick: () => {}
        },
        {
            icon: <RemitIcon className="font-20" />,
            title: '下载代码文件',
            onClick: () => {}
        },
        {
            icon: <PreviewIcon className="font-20" />,
            title: '预览',
            onClick: () => {}
        }
    ]

    return (
        <Scoped className="header">
            <Flex className='back cursor-pointer' align="center" justify="center" onClick={()=>navigate(`/website/shopSetting`)}>
                <LeftIcon className='font-20' />
            </Flex>
            <Flex className='title' align="flex-end" gap={14}>
                <div className="color-242833 font-20 font-w-600">编辑 {codeEditor.templateInfo?.name} 的模板代码</div>
                <div className="color-7A8499 font-14 font-w-600">模板ID: {codeEditor.templateInfo?.id}</div>
            </Flex>
            <Flex className="title-bar" justify="flex-end" gap={8}>
                <Flex align="center">
                    <div>模式：</div>
                    <MySelect 
                        defaultValue={codeEditor.mode} 
                        options={[
                            { value: 'auto', label: '智能模式' },
                            { value: 'original', label: '开发模式' },
                            { value: 'mapping', label: '用户模式' },
                        ]} style={{height:"32px",width:"120px"}} 
                        onChange={(value:any) => codeEditor.setMode(value)} 
                    />
                </Flex>
                {itemList.map((item:ItemType,index:number)=>(
                    <Flex key={index} className="item color-474F5E" align="center" gap={8}>
                        {item.icon}
                        <div className="font-14 color-474F5E">{item.title}</div>
                    </Flex>
                ))}
            </Flex>
        </Scoped>
    );
}

const Scoped = styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 60px;
    .back{
        width: 36px;
        height: 36px;
        margin-right: 12px;
        border: 1px solid #b8becc;
        border-radius: 4px;
        cursor: pointer;
    }

    .title-bar{
        flex: 1;
        .item{
            cursor: pointer;
        }
    }

`;


export default Header;

