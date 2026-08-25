import taxesList from "@/store/settings/taxes/taxesList";
import { Card, Checkbox } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

function TaxCollectionMethod() {

    const handleChange = (e:any) => {
        console.log(e.target.checked)
        taxesList.setTaxDisplayConfig({
            is_enabled:e.target.checked,
        })
    }

    return (
        <Scoped>
            <Card>
                <div>
                    <Checkbox checked={taxesList.taxDisplayConfig.is_enabled} onChange={handleChange}><span className="color-242833 font-16 font-w-600">所有价格均含税</span></Checkbox>
                    <div className="color-474F5E font-14" style={{marginTop:"12px"}}>产品价格将包含消费税与关税，对运费收取的税款将包含在运输价格中。</div>
                </div>
            </Card>
        </Scoped>
    )
}

export default observer(TaxCollectionMethod)

const Scoped = styled.div`
    margin-bottom: 20px;
`
