import { Button, ConfigProvider, Divider, Flex, Popover, Select } from 'antd';
import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import DefaultInputNumber from '../Input/DefaultInputNumber';
import productList from '@/store/product/productList';
import { getPrecision } from '@/utils/common';
import MyButton from '../Button/MyButton';
import { useSymbolLeft } from '@/hooks/customHooks';


export default function PriceRangeSelector({min,setMin,max,setMax}:any) {

    const inputRef = useRef<HTMLButtonElement | null>(null)

    const [popoverOpen, setPopoverOpen] = useState(false);

    const symbolLeft = useSymbolLeft();
    
    const {decimals,amountRule} = getPrecision();

    const onSubmit = () => {
        if(min && max){
            max>min?productList.setCondition({
                ...productList.condition,
                startPrice:min,
                endPrice:max
            }):productList.setCondition({
                ...productList.condition,
                startPrice:max,
                endPrice:min
            })
        }
        setPopoverOpen(false)
    }

    const content = (
        <PopoverContent>
            <Flex className='top' align='center'>
                <DefaultInputNumber 
                    className="input" 
                    placeholder='最小值'
                    min={0}
                    value={min?min/amountRule:null}
                    prefix={symbolLeft}
                    precision={decimals}
                    onChange={(value:number)=>{
                        value?setMin(Math.round(value*amountRule)):setMin(null)
                    }}
                />
                <div className='divider-warp'><Divider className='divider'></Divider></div>
                <DefaultInputNumber 
                    className="input"
                    placeholder='最大值'
                    prefix={symbolLeft}
                    precision={decimals}
                    min={0}
                    value={max?max/amountRule:null}
                    onChange={(value:number)=>{
                        value?setMax(Math.round(value*amountRule)):setMax(null)
                    }}
                />
            </Flex>
            <Flex className='bottom' justify='flex-end'>
                <MyButton text="确认" type="primary" className='btn font-12' onClick={onSubmit} />
            </Flex>
        </PopoverContent>
    );



    return (
        <Scoped>
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },
                    components: {
                        Select: {
                            // defaultActiveBg:"#f7f8fb",
                            borderRadius:4,
                        },
                        Button: {
                            // defaultActiveBg:"#f7f8fb",
                            borderRadius:4,
                        },
                    },
                }}
            >   
                <Popover
                    arrow={false}
                    placement="bottomLeft"
                    content={content}
                    title={false}
                    trigger="click"
                    // 卡片内容区域样式
                    styles={{ 
                        body: {
                            padding:0,width:436
                        } 
                    }}
                    open={popoverOpen}
                    // 状态同步
                    onOpenChange={(open)=>{
                        setPopoverOpen(open)
                    }}
                >
                    <Button ref={inputRef} style={{width:140}} onClick={()=>setPopoverOpen(true)}>
                        <Flex justify='space-between' align='center' style={{width:"100%"}}>
                            <div className='color-474F5E'>价格区间</div>
                            <img src="/icons/Suffix1.svg" />
                        </Flex>
                    </Button>
                </Popover>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`

`


const PopoverContent = styled.div`
    .top{
        border-bottom: 1px solid #eaedf5;
        width: 100%;
        padding: 20px;
        height: 76px;
        .input{
            flex: 1;
            width: 100%;
            height: 36px;
            line-height: 36px;
        }
        .divider-warp{
            margin: 0 8px;
            .divider{
                width: 12px;
                background-color: #d7dbe7;
            }
        }
    }
    .bottom{
        padding: 10px 20px;
        .btn{
            width: 46px;
            height: 28px;
        }
    }

`



