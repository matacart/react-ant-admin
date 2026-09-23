import PrimaryButton from "@/components/Button/PrimaryButton";
import order, { AfterSaleOrderType } from "@/store/order/order";
import { useIntl } from "@umijs/max";
import { App, Flex, Modal, Timeline } from "antd";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { queryCouriers } from "@/services/y2/apiLogistics";
import dayjs from 'dayjs';

function AfterSalesTrackingQuery({afterSaleOrder}:{afterSaleOrder:AfterSaleOrderType}){
    
    const intl = useIntl();
    
    const { message } = App.useApp();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [traces,setTraces] = useState<any[]>([]);


    const submit = () => {
        setOpen(false);
    }

    const cancel = () => {
        setOpen(false);
    };

    const init = ()=>{
        setOpen(true);
        setLoading(true);
        queryCouriers({
            languages_id:order?.languages,
            orderSeq:order?.orderInfo?.orderSeq,
            expressCode:afterSaleOrder?.orderRefund?.expressCode,
            expressCompanyCode:afterSaleOrder?.orderRefund?.expressCompanyCode,
        }).then(res=>{
            if(res.code != 0){
                message.error(res?.msg || "查询物流轨迹失败");
                return;
            }
            const Items = (res?.data?.traces || []).map((item:any,index:number)=>({
                children: <>
                    <div className="color-62708D">{item?.location || ""} {item?.acceptStation || ""}</div>
                    <div className="color-7A8499">{dayjs(item?.acceptTime).format("YYYY-MM-DD HH:mm:ss") || ""}</div>
                </>,
                key: index,
            }));
            setTraces(Items);
        }).catch(()=>{
            console.log("请求失败");
        }).finally(()=>{
            setLoading(false);
        })
    }

    return(
        <>
            <span className="color-356DFF cursor-pointer" onClick={()=>init()}>{afterSaleOrder?.orderRefund?.expressCode}</span>
            <Modal open={open} loading={loading}  title="跟踪信息" centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify='end' align='center'>
                            <Flex gap={12}>
                                <PrimaryButton text={"确认"} onClick={submit} />
                            </Flex>
                        </Flex>
                    </>
                )}
            >   
                <div style={{minHeight:"120px",paddingTop:"12px"}}>
                    {traces.length == 0 ? <div>没有物流轨迹！</div> : <div style={{maxHeight:"calc(100vh - 240px)",overflowY:"auto"}}>
                        <div className="color-242833 font-w-500" style={{marginBottom:"12px"}}>物流轨迹</div>
                        {/* 物流轨迹 */}
                        <Timeline items={traces} />
                    </div>}
                </div>
            </Modal>
        </>
    )
}

export default observer(AfterSalesTrackingQuery);
