import { Button, ConfigProvider, Divider, Dropdown, Flex, Popover, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import cookie from 'react-cookies';
import NumberInput from '../Input/NumberInput';
import PrimaryButton from '../Button/PrimaryButton';
import MyButton from '../Button/MyButton';
import productList from '@/store/product/productList';


export default function PriceRangeSelector({min,setMin,max,setMax}:any) {

    const inputRef = useRef<HTMLButtonElement | null>(null)

    const [popoverOpen, setPopoverOpen] = useState(false);

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
                <NumberInput 
                    className="input" 
                    placeholder='最小值'
                    min={0}
                    value={min}
                    prefix={cookie.load("symbolLeft")}
                    // defaultValue={0}
                    // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                    onChange={(value:number)=>{
                        setMin(value)
                    }}
                />
                <div className='divider-warp'><Divider className='divider'></Divider></div>
                <NumberInput 
                    className="input"
                    placeholder='最大值'
                    prefix={cookie.load("symbolLeft")}
                    min={0}
                    value={max}
                    onChange={(value:number)=>{
                        setMax(value)
                    }}
                    // defaultValue={0}
                    // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                    // onChange={onChange}
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
                    overlayInnerStyle={{padding:0,width:436}}
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



