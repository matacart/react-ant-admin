import { EditorApplyIcon, EditorComponentIcon, EditorConfigurationIcon } from "@/components/Icons/Icons"
import { Card, Flex, Popover, Tooltip } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { useIntl } from "@umijs/max"
import MyCard from "@/components/Card/MyCard"
import CheckoutLayoutCard from "./CheckoutLayoutCard"
import TypographyCard from "./TypographyCard"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import ColorsCard from "./ColorsCard"


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
                    <Tooltip title={intl.formatMessage({id:'theme.design.left.toolBarGlobalSettings'})} placement="right">
                        <div onClick={() => setActiveToolBar(1)} className={activeToolBar == 1?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                            <EditorConfigurationIcon />
                        </div>
                    </Tooltip>
                    <Tooltip title={intl.formatMessage({id:'theme.design.left.toolBarAppEmbeds'})} placement="right">
                        <div onClick={() => setActiveToolBar(2)} className={activeToolBar == 2?"toolBar-themeIcon toolBar-activeIcon":"toolBar-themeIcon"}>
                            <EditorApplyIcon />
                        </div>
                    </Tooltip>
                </Flex>
                {/* 设计容器 */}
                <div className="design-designContainer">
                    <div className="header">
                        <h3>主题设置</h3>
                        <div>适用于结账流程的主题设置。</div>
                    </div>·
                    <div className="content">
                        <CheckoutLayoutCard />
                    </div>
                    {/* 通用设置 */}
                    <div className="header">
                        <h3>全局设置</h3>
                    </div>
                    <div className="content">
                        {Object.keys(checkoutEditor.config.styleSystem).map((key,index) => {
                            switch(key){
                                case 'colors':
                                    return <ColorsCard key={key} />
                                case 'typography':
                                    return <TypographyCard key={key} />
                            }
                        })}
                    </div>
                </div>
            </Flex>}
        </Scoped>
    )
}

const Scoped = styled.div`
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    width: 340px;
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