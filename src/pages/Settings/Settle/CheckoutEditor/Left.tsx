import { EditorApplyIcon, EditorConfigurationIcon } from "@/components/Icons/Icons"
import { Flex, Tooltip } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { useIntl } from "@umijs/max"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import ColorsCard from "./ColorsCard"
import CheckoutCard from "./CheckoutCard"
import NewCustomerCenterCard from "./NewCustomerCenterCard"

// 需要国际化的选项
export function createOptions1(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.top"}),
            value: "top",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.center"}),
            value: "center",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.bottom"}),
            value: "bottom",
        },
    ];
}
export function createOptions2(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.small"}),
            value: "small",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.medium"}),
            value: "medium",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.large"}),
            value: "large",
        },
    ];
}
export function createOptions3(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.left"}),
            value: "left",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.center"}),
            value: "center",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.right"}),
            value: "right",
        },
    ];
}
export function createOptions4(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.natural"}),
            value: "natural",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.high"}),
            value: "high",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.low"}),
            value: "low",
        },
    ];
}
export function createOptions5(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.content"}),
            value: "content",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.summation"}),
            value: "summation",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.all"}),
            value: "all",
        },
    ];
}
export function createOptions6(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.white"}),
            value: "white",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.transparent"}),
            value: "transparent",
        },
    ];
}
export function createOptions7(intl: any) {
    return [
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.close"}),
            value: "close",
        },
        {
            label: intl.formatMessage({id: "settings.settle.checkoutEditor.options.open"}),
            value: "open",
        },
    ];
}



function Left(){

    const intl = useIntl();

    const [activeToolBar,setActiveToolBar] = useState(1);

    const [isSkeleton,setIsSkeleton] = useState(true);

    useEffect(()=>{
        setIsSkeleton(false);
    },[]);

    return(
        <Scoped>
            {isSkeleton?<></>:<Flex className="left-warp">
                <Flex className="toolBar-toolMenu" vertical align="center" gap={10}>
                    <div onClick={() => setActiveToolBar(1)} className={activeToolBar == 1?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                        <EditorConfigurationIcon />
                    </div>
                    <div onClick={() => setActiveToolBar(2)} className={activeToolBar == 2?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                        <EditorApplyIcon />
                    </div>
                </Flex>
                {/* 设计容器 */}
                <div className="design-designContainer">
                    {(checkoutEditor.activeItem.key == "1-1" || checkoutEditor.activeItem.key == "1-2") && <CheckoutCard />}
                    {(checkoutEditor.activeItem.key == "2-1" || checkoutEditor.activeItem.key == "2-2") && <NewCustomerCenterCard />}
                    {/* 通用设置 */}
                    <div className="header">
                        <h3>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.globalSettings"})}</h3>
                        <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.globalSettingsDesc"})}</div>
                    </div>
                    <div className="content">
                        {checkoutEditor.config.styleSystem?.colors?.global && <ColorsCard />}
                        {/* {checkoutEditor.config.styleSystem?.typography && <TypographyCard />} */}
                    </div>
                </div>
            </Flex>}
        </Scoped>
    )
}

const Scoped = styled.div`
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    width: 350px;
    .left-warp{
        display: flex;
        height: 100%;
        font-size: 14px;
        .toolBar-toolMenu{
            background-color: #fff;
            border-right: 1px solid rgba(5, 5, 5, 0.06);
            padding-top: 10px;
            width: 50px;
            .toolBar-themeIcon{
                font-size: 20px;
                cursor: pointer;
            }
            .toolBar-activeIcon{
                color: #356DFF;
            }
        }
        .design-designContainer{
            flex: 1;
            padding: 12px;
            height: 100%;
            overflow: auto;
            .header{
                margin-bottom: 12px;
                h3{
                    margin-bottom: 4px;
                }
            }
            .content{
                margin-bottom: 16px;
            }
        }

    }
`

export default observer(Left)