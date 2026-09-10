import { useIntl } from "@umijs/max";
import { Card, Flex } from "antd";
import styled from "styled-components";
import MerchantNotes from "../Modal/MerchantNotes";
import order from "@/store/order/order";
import { observer } from "mobx-react-lite";
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from "react";

function OrdersNotesCard() {
    const intl = useIntl();

    const [showIndex, setShowIndex] = useState<number | null>(null);
    const [overflowIds, setOverflowIds] = useState<Set<number>>(new Set());
    const textRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const showMore = (id:string)=>{
        setShowIndex(Number(id))
    }

    useEffect(() => {
        const newOverflowIds = new Set<number>();
        Object.entries(textRefs.current).forEach(([id, el]) => {
            if (el && el.scrollHeight > el.clientHeight + 1) {
                newOverflowIds.add(Number(id));
            }
        });
        setOverflowIds(newOverflowIds);
    }, [order.orderInfo.orderRemarks]);

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" style={{ marginBottom: '20px' }}>
                    <div className="font-16 color-242833 font-w-600">{intl.formatMessage({ id:'order.orderDetail.notes'})}</div>
                    <MerchantNotes />
                </Flex>
                {order.orderInfo.orderRemarks.length>0 ? <Flex gap={8} vertical>
                    {order.orderInfo.orderRemarks.map((item:any)=>{
                        const isOverflow = overflowIds.has(item.id);
                        const isExpanded = showIndex === item.id;
                        return(
                            <div key={item.id}>
                                <div
                                    ref={el => { textRefs.current[item.id] = el; }}
                                    className={isExpanded ? "font-14 color-242833 font-w-500 word-break-all" : "text-warp font-14 color-242833 font-w-500"}
                                >{item.remark}</div>
                                <Flex className="font-12 color-62708D font-w-500" justify="space-between">
                                    <div>{dayjs(item.updateTime*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                                    {isOverflow && (isExpanded
                                        ? <div className="cursor-pointer" onClick={()=>setShowIndex(null)}>收起</div>
                                        : <div className="cursor-pointer" onClick={()=>showMore(item.id)}>展开</div>
                                    )}
                                </Flex>
                            </div>
                        )
                    })}
                </Flex>:<div style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id:'order.orderDetail.empitynotes'})}</div>}
            </Card>
        </Scoped>
    )
}


export default observer(OrdersNotesCard)

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
        .word-break-all{
            word-break: break-all;
        }
        .text-warp{
            display: -webkit-box;          
            -webkit-line-clamp: 2;        
            -webkit-box-orient: vertical; 
            overflow: hidden;             
            text-overflow: ellipsis;      
            word-break: break-all;       
        }
    }
`