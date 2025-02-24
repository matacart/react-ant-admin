import DefaultTag from "@/components/Tag/DefaultTag";
import { Button, Card, Divider, Dropdown, Flex, List, MenuProps, Modal, Typography } from "antd"
import styled from "styled-components"
import { history } from "@umijs/max"
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import collection from "@/store/settings/collection";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const { Text, Link } = Typography;

function ManualCollection() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div onClick={()=>history.push('/settings/payments/edit')} style={{width:50,textOverflow:"ellipsis",whiteSpace:"nowrap",overflowX:"hidden"}}>手动收款方式</div>
          ),
        },
    ];
    useEffect(()=>{
        collection.manualCollection.forEach(item=>{
            if(item.title !== "货到付款"){
                items.push({
                    key: item.id,
                    label: (
                      <div onClick={()=>history.push('/settings/payments/edit/'+item.id)} style={{width:50,textOverflow:"ellipsis",whiteSpace:"nowrap",overflowX:"hidden"}}>{item.title}</div>
                    ),
                })
            }
        })
        console.log(collection.manualCollection)
    },[])

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">手动收款方式</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="desc color-474F5E font-14">如果客户通过此方式付款，您需要手动将订单标记为已付款。 <Text underline className="color-7A8499 cursor-pointer" onClick={() => setIsModalOpen(true)}>查看示例</Text></div>
                {/* <Flex align="center" className="color-356DFF">启用</Flex> */}
                {/* <Flex align="center" className="color-356DFF">启用</Flex> */}
                {/* <List.Item className="payment-item" onClick={()=>history.push('/settings/payments/edit/COD')}>
                    <Flex align="center">
                        <div style={{marginRight:"8px"}}>{"货到付款"}</div>
                        <DefaultTag text="未启用" />
                    </Flex>
                    <RightOutlined />
                </List.Item> */}
                
                {collection.manualCollection.length!==0 && <List className="payment-list">
                    {collection.manualCollection.map(item=>(
                        item?.status == 1 && <List.Item className="payment-item" onClick={()=>history.push('/settings/payments/edit/'+item.id)}>
                            <Flex align="center">
                                <div style={{marginRight:"8px"}}>{item.title}</div>
                            </Flex>
                            <RightOutlined />
                        </List.Item>
                    ))}
                </List>
                }
                <Dropdown className="submit-btn" trigger={['click']} menu={{ items }}>
                    <Button style={{height:36}} onClick={(e) => e.preventDefault()}>
                        添加<DownOutlined />
                    </Button>
                </Dropdown>
            </Card>

            {/* 示例 */}
            <ScopedModal title="示例" width={620} getContainer={false} centered open={isModalOpen} onCancel={()=>setIsModalOpen(false)} 
                footer={[
                    <Button key="submit" type="primary" loading={false} onClick={()=>setIsModalOpen(false)}>
                        我知道了
                    </Button>
                ]}>
                <div className="img-box">
                    <img src={"https://cdn.myshopline.cn/sl/admin/ec2-admin-payment/20250211112125682/imgs/customize.e245d.png"} alt="" />
                </div>
            </ScopedModal>
        </Scoped>
        // className="submit-btn"
    )
}

export default observer(ManualCollection)

const Scoped = styled.div`
    .desc{
        margin-top: 4px;
    }
    .submit-btn{
        margin-top: 16px;
        /* width:80px !important;
        white-space:nowrap;
        word-break:break-all;
        overflow:hidden; */
        /* textOverflow:ellipsis; */
    }
    .payment-list{
        margin-top: 20px;
        border: 1px solid #eef1f6;
        border-radius: 6px;
        .payment-item{
            display: flex;
            justify-content: space-between;
            padding:20px 24px;
        }
        .payment-item:hover{
            background-color: #f0f7ff;
            cursor: pointer;
        }
    }
    
`

const ScopedModal = styled(Modal)`
    .ant-modal-content{
        padding: 20px 0;
    }
    .ant-modal-title{
        padding: 0 24px;
    }
    .ant-modal-footer{
        padding: 0 24px;
    }
    .img-box{
        margin: 0;
        padding: 24px;
        background: #f0f3f9;
        overflow: auto;
    }
`