import { Card } from "antd";
import styled from "styled-components";
import DefaultButton from "@/components/Button/DefaultButton";
import { history } from "@umijs/max";

export default function TopicConfiguration() {
  return(
    <Scoped>
        <Card>
            <div className="color-242833 font-w-600">主题配置</div>
            <div className="font-12 color-474F5E">自定义结账页面流程的主题与应用</div>
            {/* 提示标签 */}
            {/* <Tag
                className='tag'
                closable
            >
                <div className="text-box">
                    <InfoCircleFilled className="color-356DFF" />
                    <span style={{marginLeft:"8px"}}>检测到存在默认初始化的地点数据，请先前往地点设置更新</span>
                    <a className="color-356DFF">地点设置</a>
                </div>
            </Tag> */}
            <DefaultButton text="自定义结账" className="custom-btn" style={{marginTop:"12px"}} onClick={()=>history.push("/settings/settle/checkout-editor")} />
        </Card>
    </Scoped>
    
  );
}

const Scoped = styled.div`
    .divider{
        margin: 20px 0;
    }
`