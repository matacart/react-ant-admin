import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";
import { Card, Input, Row, Select } from "antd";
import styled from "styled-components";



const { TextArea } = Input;
function RemarkCard() {
    return(
        <Scoped>
            <Card bordered={false} title="备注">
                <TextArea rows={4} onChange={(value)=>{
                    // console.log(value.target.value);
                    purchaseOrderStore.purchaseOrder.remark = value.target.value;
                }} placeholder="maxLength is 6" maxLength={6} />
            </Card>
        </Scoped>
    )
}

export default RemarkCard;

const Scoped = styled.div`
    width: 100%;
    margin-top: 20px;
`