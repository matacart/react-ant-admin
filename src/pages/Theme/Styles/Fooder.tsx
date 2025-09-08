import MyButton from "@/components/Button/MyButton";
import { ExportIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { SmileOutlined } from "@ant-design/icons";
import { Dropdown, Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const content = (
    <div className="dropdown-option-list">
        <>
            <a>
                <div className="dropdown-option" data-value="Default">
                    <div className="mall-footer-style-color"></div>
                    <div className="title">简约 - 流行服装</div>
                </div>
            </a>
            <a>
                <div className="dropdown-option" data-value="Default">
                    <div className="mall-footer-style-color"></div>
                    <div className="title">简约 - 流行服装</div>
                </div>
            </a>
            <a>
                <div className="dropdown-option" data-value="Default">
                    <div className="mall-footer-style-color"></div>
                    <div className="title">简约 - 流行服装</div>
                </div>
            </a>
        </>
        
    </div>
)

function Fooder({show}){

    // 添加状态控制 dropdown 的显示
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // 添加 ref 获取 style-dropdown 元素
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 添加点击外部区域隐藏 dropdown 的逻辑
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };

        // 只有当 dropdown 显示时才监听点击事件
        if (dropdownVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        // 清理事件监听器
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownVisible]);


    return (
        <Scoped show={show}>
            <div className="fooder">
                <Flex justify="space-between">
                    <Flex align="center" gap={24}>
                        <div className="font-24 font-w-600">Arise Pro</div>
                        <div className="style-dropdown" ref={dropdownRef}>
                            <div className="style-select" style={dropdownVisible?{border:"1px solid #356dff"}:{}} onClick={() => setDropdownVisible(!dropdownVisible)}>
                                <Flex className="style-select-warp" align="center" gap={8}>
                                    <div className="style-select-color"></div>
                                    <div className="style-select-title">食物 - 食品饮料</div>
                                    <UnfoldIcon className={`font-20 color-474F5E unfold-icon ${dropdownVisible ? 'unfolded' : ''}`} />
                                </Flex>
                            </div>
                            {/* 添加条件渲染 */}
                            {dropdownVisible && content}
                        </div>
                    </Flex>
                    <Flex gap={24}>
                        <MyButton icon={<ExportIcon />} style={{ height: "42px",fontWeight:"600" }} text={"预览模板"} />
                        <MyButton type="primary" style={{ height: "42px",fontWeight:"600" }} text={"添加模板"} />
                    </Flex>
                </Flex>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div<{show?:boolean}>`
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #f7f8fb;
    border-bottom: 1px solid #d7dbe7;
    border-top: 1px solid #d7dbe7;

    /* 添加过渡动画避免闪烁 */
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    /* 当 show 为 true 时显示 */
    ${props => props.show && `
        transform: translateY(0);
    `}

    .fooder{
        margin: auto;
        max-width: 1280px;
        padding: 12px 40px;
        bottom: 0;
        position: sticky;
        /* transition: all .2s; */
        .style-select{
            &:hover{
                border: 1px solid #356dff;
            }

            align-items: center;
            background: #fff;
            border: 1px solid #d7dbe7;
            border-radius: 30px;
            display: flex;
            gap: 8px;
            padding: 8px 10px 8px 12px;
            transition: all .1s ease;
            cursor: pointer;
           
            &-color{
                background: #FF0F00;
                border-radius: 50%;
                height: 24px;
                width: 24px;
            }
        }

        .style-dropdown{
            position: relative;
            .dropdown-option-list {
                min-width: 100%;
                background: #fff;
                position: absolute;
                top: unset;
                bottom: calc(100% + 2px);
                border: 1px solid #d7dbe7;
                box-shadow: 0 4px 12px 0 #0000000d;
                height: auto;
                padding: 8px 0;
                a{
                    color: #474F5E;
                }
                .dropdown-option {
                    align-items: center;
                    align-self: stretch;
                    display: flex;
                    flex-wrap: nowrap;
                    gap: 8px;
                    padding: 8px 20px 8px 12px;
                    word-break: keep-all;

                    &:hover{
                        background: #f0f7ff;
                    }

                    .mall-footer-style-color{
                        background: #B19460;
                        border-radius: 50%;
                        height: 24px;
                        width: 24px;
                    }
                    .title{
                        font-size: 14px;
                    }
                
                }

            }
        }

        /* 添加图标旋转动画 */
        .unfold-icon {
            transition: transform 0.3s ease;
            &.unfolded {
                transform: rotate(180deg);
            }
        }
    }


    

`

export default Fooder;