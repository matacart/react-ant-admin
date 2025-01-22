import { Card, Skeleton } from "antd";
import { useState } from "react";
import styled from "styled-components";

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round' | 'default';

export default function skeletonCard(){

    const [active, setActive] = useState(false);
    const [block, setBlock] = useState(false);
    const [size, setSize] = useState<SizeType>('default');
    const [buttonShape, setButtonShape] = useState<ButtonShapeType>('default');

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <Skeleton.Button className="skeleton-title" active={active} size={size} shape={buttonShape} block={block} />
                        </div>
                    </div>
                    {/* 商店基本资料 */}
                    <div className='mc-layout-main'>
                        <Card style={{height:"600px",width:"100%"}} title={<Skeleton.Button className="skeleton-card-title" active={active} size={size} shape={buttonShape} block={block} />}>
                        </Card>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                .skeleton-title{
                    width: 200px;
                    height: 30px;
                }
            }
        }
        &-main {
            .skeleton-card-title{
                width: 200px;
                height: 16px;
            }
        }
    }
}
`