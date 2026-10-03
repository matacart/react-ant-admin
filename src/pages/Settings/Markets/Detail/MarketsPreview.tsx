import DefaultButton from "@/components/Button/DefaultButton";
import marketsInfo from "@/store/settings/markets/marketsInfo";
import { Flex, Popover } from "antd";
import { useRef } from "react";
import styled from "styled-components";

function MarketsPreview() {

    const ref = useRef<HTMLDivElement>(null);

    return (
        <Scoped ref={ref}>
            <Popover arrow={false} trigger={['click']} styles={{body:{padding: '6px 0px 8px 0px'}}} placement="bottomRight" getPopupContainer={()=>ref.current!} content={<div className="preview-content">
                {marketsInfo.marketsInfo.urlPreview.map(item=>(
                    <Flex className="item" vertical>
                        <div className="font-12 color-62708D item-title">{item.iso}</div>
                        <Flex className="item-content cursor-pointer font-12" onClick={()=>window.open(item.url)}>
                            <span>{item.url}</span>
                        </Flex>
                    </Flex>
                ))}
            </div>}>
                <DefaultButton text="预览" />
            </Popover>
        </Scoped>
    )
}


const Scoped = styled.div`
    .preview-content{
        max-height: 350px;
        overflow: auto;
        .item {
            width: 300px;
            border-bottom: 1px solid #EEF1F6;
            .item-title{
                padding: 6px 12px 0px 12px;
            }
            .item-content{
                padding: 8px 12px;
                span{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                }
                &:hover{
                    background-color: #f7f8fb;
                }
            }
        }
    }
`

export default MarketsPreview;