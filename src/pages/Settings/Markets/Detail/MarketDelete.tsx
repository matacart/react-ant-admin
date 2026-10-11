import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import { deleteMarket } from "@/services/y2/apiSaleMarket";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { history } from "@umijs/max";
import { App, Flex, Modal } from "antd";
import { useState } from "react";

function MarketDelete({marketId,langId}:{marketId:string,langId:string}) {

    const [open, setOpen] = useState(false);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    const cancel = () => {
        setOpen(false);
    };

    const submit = ()=>{
        setLoading(true);
        deleteMarket({
            languages_id:langId,
            marketId:marketId,
        }).then((res)=>{
            message.success("成功");
            history.push("/settings/markets");
        }).catch(()=>{
        }).finally(()=>{
            setOpen(false);
            setLoading(false);
        })
    };

    return (
        <>
            <DangerButton text="删除市场" onClick={()=>setOpen(true)} />
            <Modal
                title={false}
                open={open}
                centered
                width={420}
                onCancel={cancel}
                footer={()=>(
                    <Flex justify="flex-end" style={{marginTop:"24px"}} gap={12}>
                        <DefaultButton loading={loading} text="取消" onClick={cancel} />
                        <DangerButton loading={loading} text="删除" onClick={submit} />
                    </Flex>
                )}
            >
                <Flex align="center" gap={16}>
                    <ExclamationCircleFilled className="font-24" style={{ color: "#F86140" }} />
                    <div className="font-w-600 font-16">确认删除市场吗？</div>
                </Flex>
                <div className="color-242833 font-14" style={{marginLeft:"40px",marginTop:"12px"}}>此市场中的客户将无法结账，并且此市场的所有相应设置都将被永久删除。现有订单不会受到影响。</div>
            </Modal>
        </>
    )
}

export default MarketDelete;