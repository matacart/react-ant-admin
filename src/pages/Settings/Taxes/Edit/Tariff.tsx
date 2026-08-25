import MyInput from "@/components/Input/MyInput";
import MyTextArea from "@/components/Input/MyTextArea";
import NumberInput from "@/components/Input/NumberInput";
import taxes from "@/store/settings/taxes/taxes";
import { Card, Checkbox, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

function Tariff(){
    return <MyCard>
        <div>
            <Checkbox checked={taxes.tariffTax?.enableDutyTaxes || false} onChange={(e)=>taxes.setTariffTax({...taxes.tariffTax,enableDutyTaxes:e.target.checked})} >
                <div>在结账时收取关税</div>
                <div className="font-12 color-62708D">收取税费时，请确保您的承运商支持完税 (DDP)</div>
            </Checkbox>
            {taxes.tariffTax?.enableDutyTaxes && <Row gutter={12} style={{marginTop:12}}>
                <Col span={6}>
                    <MyInput style={{height:36}} placeholder="关税名称" value={taxes.tariffTax?.taxesName || ""} onChange={(e:any)=>taxes.setTariffTax({...taxes.tariffTax,taxesName:e.target.value})} />
                </Col>
                <Col span={6}>
                    <NumberInput 
                        controls={false}
                        value={Number(taxes.tariffTax?.taxesRate || 0)}
                        onChange={(value:number)=>taxes.setTariffTax({...taxes.tariffTax,taxesRate:Number(value || 0)})}
                        style={{width:"100%",height:36}}
                        min={0}
                        max={100}
                        suffix="%"
                    />
                </Col>
            </Row>}
        </div>
        <div style={{marginTop:16}}>
            <Checkbox checked={taxes.tariffTax?.taxesRateDescSwitch || false} onChange={(e)=>taxes.setTariffTax({...taxes.tariffTax,taxesRateDescSwitch:e.target.checked})} >在结账时允许消费者查看关税说明</Checkbox>
            {taxes.tariffTax?.taxesRateDescSwitch && <MyTextArea value={taxes.tariffTax?.taxesDesc || ""} onChange={(e:any)=>taxes.setTariffTax({...taxes.tariffTax,taxesDesc:e.target.value})} placeholder="请输入关税规则说明" style={{marginTop:12,resize: 'none'}} />}
        </div>
    </MyCard>
}

export default observer(Tariff)


const MyCard = styled(Card)`
    .ant-card-body{
        padding:20px;
        .ant-checkbox{
            align-self:flex-start;
            position:relative;
            top:2px;
        }
    }
`