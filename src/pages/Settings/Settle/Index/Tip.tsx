import DefaultInput from "@/components/Input/DefaultInput";
import DefaultInputNumber from "@/components/Input/DefaultInputNumber";
import DefaultSelect from "@/components/Select/DefaultSelect";
import settingsInfo, { TipShowConfigInfo } from "@/store/settings/settle/settingsInfo";
import { Card, Checkbox, Col, Flex } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import styled from "styled-components";


const Tip = () => {
    // 小费选项列表
    const list = [
        {
            label:"选项1",
            value:0,
        },
        {
            label:"选项2",
            value:0,
        },
        {
            label:"选项3",
            value:0,
        }
    ]
    // 小费选项改变
    const handleChange = (value:number,index:number) => {
        const newTipOptionInfoList = toJS(settingsInfo.tipConfigInfo.tipOptionInfoList)
        if(newTipOptionInfoList[index]){
            newTipOptionInfoList[index] = {
                ...newTipOptionInfoList[index],
                rate:value,
            }
        }else{
            newTipOptionInfoList[index] = {
                rate:value,
                selected:false,
            }
        }
        settingsInfo.setTipConfigInfo({
            ...settingsInfo.tipConfigInfo,
            tipOptionInfoList:newTipOptionInfoList,
        })
    }

    const formList = [
        {
            key:"title",
            label:"小费选项标题",
            name:"title",
        },
        {
            key:"describe",
            label:"小费选项详情描述",
            name:"description",
        },
        {
            key:"customGuide",
            label:"自定义小费 输入框引导语",
            name:"customTipGuide",
        },
        {
            key:"customButtonDesc",
            label:"自定义小费 按钮文案",
            name:"customTipButton",
        },
        {
            key:"thanksDesc",
            label:"感谢语",
            name:"thankYou",
        },
    ]

    return(
        <Scoped>
            <Card className="my-card">
                <Flex gap={12} vertical>
                    <Col span={24}>
                        <Checkbox checked={settingsInfo.tipConfigInfo?.showTip || false} onChange={(e) =>{
                            settingsInfo.setTipConfigInfo({
                                ...settingsInfo.tipConfigInfo,
                                showTip:e.target.checked,
                            })
                        }}>在结账时显示小费选项</Checkbox>
                        {settingsInfo.tipConfigInfo?.showTip && <div className="tip-show-addition">
                            <div className="tip-show-addition-title">按需配置选项：</div>
                            <Flex gap={8}>
                                {list.map((item,index) => (
                                    <div key={item.label}>
                                        <div style={{marginBottom:"8px"}}>{item.label}</div>
                                        <DefaultInputNumber
                                            style={{width:"100%"}}
                                            value={settingsInfo.tipConfigInfo.tipOptionInfoList[index]?.rate || 0}
                                            min={0}
                                            max={100}
                                            formatter={(value:number) => `${value}%`}
                                            parser={(value:string) => value?.replace('%', '') as unknown as number}
                                            onChange={(value:number) => handleChange(value,index)}
                                        />
                                    </div>
                                ))}
                            </Flex>
                        </div>}
                    </Col>
                    {settingsInfo.tipConfigInfo?.showTip && <Col span={24}>
                        <Checkbox checked={settingsInfo.tipConfigInfo.showTipOptions} onChange={(e) =>{
                            settingsInfo.setTipConfigInfo({
                                ...settingsInfo.tipConfigInfo,
                                showTipOptions:e.target.checked,
                            })
                        }}>默认展示小费选项</Checkbox>
                        {settingsInfo.tipConfigInfo.showTipOptions && <div className="tip-show-addition">
                            <DefaultSelect 
                                style={{height:"36px",width:"100%",maxWidth:"240px"}} 
                                options={[
                                    {
                                        label: "默认不勾选",
                                        value: -1
                                    },
                                    {
                                        label: "默认选项1",
                                        value: 0,
                                        disabled:settingsInfo.tipConfigInfo.tipOptionInfoList?.[0] ? false : true,
                                    },
                                    {
                                        label: "默认选项2",
                                        value: 1,
                                        disabled:settingsInfo.tipConfigInfo.tipOptionInfoList?.[1] ? false : true,
                                    },
                                    {
                                        label: "默认选项3",
                                        value: 2,
                                        disabled:settingsInfo.tipConfigInfo.tipOptionInfoList?.[2] ? false : true,
                                    }
                                ]}
                                value={settingsInfo.tipConfigInfo.tipOptionInfoList.findIndex(item => item.selected) ?? -1}
                                onChange={(value) =>{
                                    const newTipOptionInfoList = toJS(settingsInfo.tipConfigInfo.tipOptionInfoList);
                                    newTipOptionInfoList.forEach(item => {
                                        item.selected = false;
                                    })
                                    if(newTipOptionInfoList[value]){
                                        newTipOptionInfoList[value].selected = true;
                                    }
                                    settingsInfo.setTipConfigInfo({
                                        ...settingsInfo.tipConfigInfo,
                                        tipOptionInfoList:newTipOptionInfoList,
                                    })
                                }}
                            />
                        </div>}
                    </Col>}
                    {settingsInfo.tipConfigInfo?.showTip && <Col span={24}>
                        <Checkbox checked={settingsInfo.tipConfigInfo.hasTipShowConfig} onChange={(e) =>{
                            settingsInfo.setTipConfigInfo({
                                ...settingsInfo.tipConfigInfo,
                                hasTipShowConfig:e.target.checked,
                            })
                        }}>自定义小费展示信息</Checkbox>
                        <div className="font-12 color-888888" style={{marginLeft:"24px"}}>您可自定义客户结算选择小费时展示的标题、内容或按钮文案。</div>
                        {settingsInfo.tipConfigInfo.hasTipShowConfig && <Flex className="tip-show-addition" gap={12} vertical>
                            {formList.map((item,index) => (
                                <div key={item.key} className="tip-show-addition-item">
                                    <div className="tip-show-addition-title font-w-500">{item.label}</div>
                                    <DefaultInput
                                        style={{width:"100%",height:"36px"}}
                                        value={settingsInfo.tipShowConfigInfo[item.key as keyof TipShowConfigInfo] ?? ""}
                                        onChange={(e:any) =>{
                                            settingsInfo.setTipShowConfigInfo({
                                                ...settingsInfo.tipShowConfigInfo,
                                                [item.key as keyof TipShowConfigInfo]:e.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            ))}
                        </Flex>}
                    </Col>}
                </Flex>
            </Card>
        </Scoped>
    );
}

export default observer(Tip)

const Scoped = styled.div`


    .tip-show-addition{
        margin-left: 24px;
        margin-top: 12px;
        .tip-show-addition-item{
            max-width: 320px;
        }
        .tip-show-addition-title{
            margin-bottom: 8px;
        }
        .ant-input-number-input{
            height: 35px;
        }
    }
`