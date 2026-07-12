import settingsInfo from "@/store/settings/settle/settingsInfo";
import { ExportOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col } from "antd";
import { observer } from "mobx-react-lite";

const CommodityInventoryDisposal = () => {
    return(
        <Card style={{minHeight:"100%"}}>
            <Col span={24}>
                <Checkbox checked={settingsInfo?.stockLockConfig?.enableLockStockInOrderCreate == "1" ? true : false} onChange={(e)=>{
                    settingsInfo.setStockLockConfig({
                        ...settingsInfo.stockLockConfig,
                        enableLockStockInOrderCreate: e.target.checked ? "1" : "0",
                    })
                }}>支付时锁定库存<a style={{marginLeft:"2px"}}>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></Checkbox>
            </Col>
            <div className="font-12 color-888888" style={{marginLeft:"24px"}}>套装商品不支持库存锁定</div>
        </Card>
    );
}

export default observer(CommodityInventoryDisposal)

