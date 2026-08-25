import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { UnfoldIcon } from "@/components/Icons/Icons";
import MyTextArea from "@/components/Input/MyTextArea";
import { setAbandonedOrderRemark } from "@/services/y2/ApiAbandonedOrder";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";
import { App, Badge, Button, Card, Flex, message, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";


function Remark() {

  const {message} = App.useApp();

  const [open,setOpen] = useState<boolean>(false);

  const [loading,setLoading] = useState<boolean>(false);

  const [value,setValue] = useState<string>("");

  const [expand,setExpand] = useState<boolean>(false);

  useEffect(()=>{
    setValue(abandonedOrder.abandonedOrderData?.sellerRemark || "");
  },[])

  const submit = ()=>{
    setLoading(true);
    setAbandonedOrderRemark({
      languages_id:abandonedOrder.languages,
      abandonedOrderSeq:abandonedOrder.abandonedOrderData?.abandonedOrderSeq || "",
      remark:value,
    }).then(res=>{
      message.success("修改成功");
      const newAbandonedOrderData = {
        ...abandonedOrder.abandonedOrderData,
        sellerRemark:value
      }
      abandonedOrder.setAbandonedOrderData(newAbandonedOrderData)
      setOpen(false);
    }).catch(()=>{
    }).finally(()=>{
      setLoading(false);
    })
  }

  const cancel = ()=>{
    setValue(abandonedOrder.abandonedOrderData?.sellerRemark || "");
    setOpen(false);
  }

  return (
    <MyCard>
      <Flex justify="space-between">
        <span className='title font-16 font-w-600 color-242833'>备注</span>
        <span style={{color:"#1677ff",cursor:"pointer"}} onClick={()=>setOpen(true)}>编辑</span>
      </Flex>
      {abandonedOrder.abandonedOrderData?.sellerRemark ? <>
        <div className={expand?"expand":"no-expand"}>{abandonedOrder.abandonedOrderData?.sellerRemark}</div>
        <Flex className="color-62708D cursor-pointer" style={{marginTop:"6px"}} onClick={()=>setExpand(!expand)}>
          {expand?<span className="font-12">折叠</span>:<span className="font-12">展开</span>}
          <UnfoldIcon className={expand?"rotate":""} />
        </Flex>
      </>:<div>暂无备注</div>}
      {/* 编辑备注弹窗 */}
      <Modal 
        title="备注"
        width={620}
        open={open}
        centered
        onCancel={cancel}
        footer={()=>(
          <Flex justify="flex-end" gap={12}>
            <DefaultButton text="取消" onClick={cancel} />
            <PrimaryButton text="确认" loading={loading} onClick={submit} />
          </Flex>
        )}
      >
        <div style={{margin:"20px 0 32px"}}>
          <MyTextArea 
            rows={4} 
            maxLength={1000} 
            style={{ resize: 'none' }} 
            showCount 
            placeholder="请输入备注"
            value={value}
            onChange={(e:any)=>setValue(e.target.value)}
          />
        </div>
      </Modal>
    </MyCard>
  )
}

const MyCard = styled(Card)`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
  .search-input-warp{
    margin:20px 0;
  }
  .rotate{
    transform: rotate(180deg);
  }
  .expand{
  }
  .no-expand{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`

export default observer(Remark);