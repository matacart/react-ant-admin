import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";
import { Card, Input, Row, Select } from "antd";
import styled from "styled-components";
import purchaseOrderEdit from "@/store/product/purchaseOrder/purchaseOrderEditStore";
import { observer } from "mobx-react-lite";



const { TextArea } = Input;
function RemarkCard() {
    return(
        <Scoped>
            <Card bordered={false} title="备注">
                <TextArea rows={4} value={purchaseOrderEdit.remark} onChange={(value)=>{
                    purchaseOrderEdit.setRemark(value.target.value)
                }} placeholder="maxLength is 6" maxLength={6} />
            </Card>
        </Scoped>
    )
}

export default observer(RemarkCard);

const Scoped = styled.div`
    width: 100%;
    margin-top: 20px;
`