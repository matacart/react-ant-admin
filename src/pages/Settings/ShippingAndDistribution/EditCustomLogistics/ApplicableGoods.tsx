import { Button, Card, Divider, Flex, Form, Input, List, Modal, Select, Space } from "antd"
import styled from "styled-components"
import { useState } from "react";
import { FoldIcon, UnfoldIcon } from "@/components/Icons/Icons";


const { Search } = Input;
function ApplicableGoods() {

    const [isExpansionDetails, setIsExpansionDetails] = useState(false);
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <div className="color-242833 font-16 font-w-600">适用商品</div>
                <Flex>
                    <div style={{marginRight:"8px"}}>共 0 件商品，不包含在其他自定义商品分组中的所有商品</div>
                    <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(!isExpansionDetails)} >
                        {isExpansionDetails?<><span className="color-356DFF">隐藏详情</span><FoldIcon className="font-20 color-356DFF" /></>:<><span className="color-356DFF">查看详情</span><UnfoldIcon className="font-20 color-356DFF" /></>}
                    </Flex>
                </Flex>
                {isExpansionDetails?<List>
                    
                </List>:null}
                
            </Card>
        </Scoped>
    )
}

export default ApplicableGoods

const Scoped = styled.div`
    .content-box{
        margin-bottom: 12px;
    }
`