import settingsInfo from "@/store/settings/settle/settingsInfo";
import { history } from "@umijs/max";
import { Card, Checkbox, Col } from "antd";
import { observer } from "mobx-react-lite";

const AdditionalInformation = () => {
    return(
        <Card style={{minHeight:"100%"}}>
            <Col span={24}>
                <Checkbox 
                    checked={settingsInfo.config?.showAddedInput == "1" ? true : false} 
                    onChange={(e) =>{
                        settingsInfo.setConfig({
                            ...settingsInfo.config,
                            showAddedInput:e.target.checked ? "1" : "0",
                        })
                    }}
                >在结账时显示附加信息输入框</Checkbox>
            </Col>
            <div className="color-356DFF cursor-pointer" style={{marginLeft:"24px",marginTop:"12px"}} onClick={()=>{
                history.push("/settings/additional/country")
            }}>编辑适用国家列表</div>
        </Card>
    );
}

export default observer(AdditionalInformation);
