import { FoldIcon, PositionIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { Button, Card, Divider, Dropdown, Flex, Form, Input, List, MenuProps, Tabs, TabsProps } from "antd"
import { useState } from "react";
import styled from "styled-components"




function ManagementGroupCard() {


    const [isExpansionDetails,setIsExpansionDetails] = useState(false)

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div>添加分组</div>
          ),
        },
        {
          key: '2',
          label: (
            <div>重命名分组</div>
          ),
        },
        {
          key: '3',
          label: (
            <div>删除分组</div>
          ),
        },
    ];
    

    const operations = <Dropdown menu={{ items }} trigger={["click"]}>
        <Button style={{height:"36px"}}>管理分组<UnfoldIcon className="font-20" /></Button>
    </Dropdown>

    const GroupTemplate = (
        <div className="group-template-box">
            <Flex justify="space-between">
                <Flex align="center">
                    <div className="position-box">
                        <PositionIcon className="font-20 color-356DFF" />
                    </div>
                    <div>发货地址</div>
                </Flex>
                <div>
                    <Button>添加</Button>
                </div>
            </Flex>
            {/*  */}
            <Flex className="color-474F5E" style={{margin:"12px 0"}}>
                <div style={{marginRight:"8px"}}>全部地点(排除其他分组的发货地址)</div>
                {!isExpansionDetails && <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(true)} ><span className="color-356DFF">查看详情</span><UnfoldIcon className="font-20" /></Flex>} 
            </Flex>
            {/*  */}
            {isExpansionDetails && <>
                <List style={{margin:"12px 0"}}>

                </List>
                <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(false)}><span className="color-356DFF">隐藏详情</span><FoldIcon className="font-20" /></Flex>
            </>}
            <Divider />
            {/* 收货 */}
            <>
                <Flex align="center">
                    <div className="position-box">
                        <PositionIcon className="font-20 color-356DFF" />
                    </div>
                    <div>收货地址</div>
                </Flex>
                <Flex vertical align="center" style={{padding:"20px 0"}}>
                    <div className="color-474F5E">暂无数据</div>
                    <div style={{marginTop:"12px"}}>
                        <Button type="primary" style={{height:"36px"}}>添加国家/地区</Button>
                    </div>
                </Flex>
            </>
            <Divider />
            {/* 收货地址(根据邮编) */}
            <Flex justify="space-between">
                <Flex align="center">
                    <div className="position-box">
                        <PositionIcon className="font-20 color-356DFF" />
                    </div>
                    <div>收货地址(根据邮编)</div>
                </Flex>
                <div>
                    <Button>添加区域</Button>
                </div>
            </Flex>
        </div>
    )

    const TabsItems: TabsProps['items'] = [
        {
          key: '1',
          label: <div>默认分组</div>,
          children: GroupTemplate,
        }
    ];
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations} items={TabsItems} onChange={()=>{}} />
            </Card>
        </Scoped>
    )
}

export default ManagementGroupCard

const Scoped = styled.div`
    .card{
        padding-top: 20px;
        .group-template-box{
            .position-box{
                margin-right: 8px;
                padding: 6px;
                width: fit-content;
                display: flex;
                border-radius: 2px;
                justify-content: center;
                align-items: center;
                background-color: #f0f7ff;
            }
            
        }
    }
`