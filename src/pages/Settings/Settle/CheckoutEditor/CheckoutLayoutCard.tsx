import MyCard from "@/components/Card/MyCard";
import { RightIcon } from "@/components/Icons/Icons";
import { setCheckoutEditorConfig } from "@/services/y2/apiCheckout";
import checkoutEditor from "@/store/settings/settle/checkoutEditor";
import { useIntl } from "@umijs/max";
import { Flex, Popover } from "antd";
import _ from "lodash";
import { toJS } from "mobx";
import styled, { createGlobalStyle } from "styled-components";

// 定义样式，只在 Popover content 内部生效
const PopoverContentStyle = createGlobalStyle`
    .popover-item {
        padding: 12px 16px;
        background: #F7F8FB;
        border-radius: 4px;
    }

    .active{
        border: 1px solid #356DFF;
    }
    .popover-item:hover {
        cursor: pointer;
    }
`;

function CheckoutLayoutCard() {
    
    const intl = useIntl();

    const content = (
        <Flex gap={12} vertical>
            <PopoverContentStyle /> {/* 在 content 中引入样式 */}
            <div className={checkoutEditor.config.checkout?.stepType == "1" ? "active popover-item" : "popover-item"} onClick={()=>{
                const newConfig = toJS(checkoutEditor.config);
                _.set(newConfig, "checkout.stepType", "1");
                setCheckoutEditorConfig({
                    languages_id:checkoutEditor.languagesId,
                    profile_id:checkoutEditor.profileId,
                    config:JSON.stringify(newConfig),
                    is_preview:"0",
                }).then((res)=>{
                    if(res.code == "0"){
                        // 添加操作到历史记录
                        checkoutEditor.addToOperationHistory({
                            type: "templateUpdate",
                            undoData: checkoutEditor.config,
                            redoData: newConfig,
                            timestamp: Date.now(),
                        });
                        checkoutEditor.setConfig(newConfig);
                    }else{
                        console.log("更新失败");
                    }
                })
            }}>
                <Flex align="center" gap={20}>
                    <img style={{width: "80px"}} src={"/images/settings/onePage.png"} alt="" />
                    <div>
                        <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.onePageCheckout"})}</div>
                        <Flex wrap style={{width: "180px"}} className="font-12 color-7A8499">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.onePageCheckoutDesc2"})}</Flex>
                    </div>
                </Flex>
            </div>
            <div className={checkoutEditor.config.checkout?.stepType == "3" ? "active popover-item" : "popover-item"} onClick={()=>{
                const newConfig = toJS(checkoutEditor.config);
                _.set(newConfig, "checkout.stepType", "3");
                setCheckoutEditorConfig({
                    languages_id:checkoutEditor.languagesId,
                    profile_id:checkoutEditor.profileId,
                    config:JSON.stringify(newConfig),
                    is_preview:"0",
                }).then((res)=>{
                    if(res.code == "0"){
                        // 添加操作到历史记录
                        checkoutEditor.addToOperationHistory({
                            type: "templateUpdate",
                            undoData: checkoutEditor.config,
                            redoData: newConfig,
                            timestamp: Date.now(),
                        });
                        checkoutEditor.setConfig(newConfig);
                    }else{
                        console.log("更新失败");
                    }
                })
            }}>
                <Flex align="center" gap={20}>
                    <img style={{width: "80px"}} src={"/images/settings/threePage.png"} alt="" />
                    <div>
                        <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.threePageCheckout"})}</div>
                        <Flex wrap style={{width: "180px"}} className="font-12 color-7A8499">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.threePageCheckoutDesc2"})}</Flex>
                    </div>
                </Flex>
            </div>
        </Flex>
    );



    return (
        <Scoped
            styles={{
                body: {
                    padding: '16px',
                }
            }}
        >
            <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.checkoutLayout"})}</div>
            <div className="font-12 color-7A8499 desc">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.checkoutLayoutDesc"})}</div>
            <Popover content={content} title={false} placement="right" trigger="click">
                <Flex className="checkout-layout" justify="space-between">
                    {checkoutEditor.config.checkout?.stepType == "1" ? <Flex gap={12} flex="1">
                        <img src={"/images/settings/empty_layout_page.jpg"} alt="" />
                        <div>
                            <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.onePageCheckout"})}</div>
                            <div className="font-12 color-7A8499">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.onePageCheckoutDesc1"})}</div>
                        </div>
                    </Flex>:<Flex gap={12} flex="1">
                        <img src={"/images/settings/three_layout_page.png"} alt="" />
                        <div>
                            <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.threePageCheckout"})}</div>
                            <div className="font-12 color-7A8499">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.threePageCheckoutDesc1"})}</div>
                        </div>
                    </Flex>}
                    <Flex>
                        <RightIcon />
                    </Flex>
                </Flex>
            </Popover>
        </Scoped>
    )
}


const Scoped = styled(MyCard)`
    .desc{
        margin: 8px 0px;
    }
    .checkout-layout{
        cursor: pointer;
        padding: 12px;
        background: #f7f8fb;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
    }
`

export default CheckoutLayoutCard;