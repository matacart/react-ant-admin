import { Button, Checkbox, ConfigProvider, Divider, Dropdown, Flex, Popover, Select } from 'antd';
import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';

export default function TagSelector() {

    const [isFocus,setIsFocus] = useState(false);

    const inputRef = useRef<any>(null)

    const [tagType,setTagType] = useState(0)
    // 状态
    const [options,setOptions] = useState([
        { value: '0', label: '无标签商品',checked:false },
    ])

    return (
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
                },
            }}
        >
            <Select
                placeholder={<div className='color-474F5E font-14'>商品标签</div>}
                showSearch
                popupMatchSelectWidth={false}
                ref={inputRef}
                open={isFocus}
                suffixIcon={isFocus?<img src="/icons/Search1.svg" />:<img src="/icons/Suffix1.svg" />}
                style={{
                    minWidth: 140,
                    height:36,
                    lineHeight:36,
                    fontSize:14
                }}
                value={"商品标签"}
                dropdownStyle={{padding:"6px 0px"}}
                dropdownRender={(menu) => (
                    <Scoped>
                        <div className='color-7A8499 font-12' style={{padding:"4px 8px"}}>具有</div>
                        <div className='inner-select-box'>
                            <Select onMouseDown={(e)=>e.stopPropagation()} style={{width:256}} defaultValue={0} options={[
                                {
                                    value:0,
                                    label:"具有任意标签"
                                },
                                {
                                    value:1,
                                    label:"具有全部标签"
                                },
                            ]} onChange={(value)=>{
                                setTagType(value)
                            }} 
                            />
                        </div>
                        {/* 任意标签 */}
                       <div className='any-tag-list'>
                            {
                                options.map((item,index)=>{
                                    return (
                                        <Checkbox disabled={tagType == 1 && item.label=="无标签商品"} checked={item.checked} className="item" style={{padding:"8px 12px",width:"100%"}} onChange={(e)=>{
                                            let newOption = [...options]
                                            newOption[index].checked = e.target.checked
                                            // e.target.checked?checkedList.push(item):checkedList.splice(checkedList.indexOf(item),1)
                                            // setCheckedStatus(checkedList)
                                            setOptions(newOption)
                                        }}>{item.label}</Checkbox>
                                    )
                                })
                            }
                        </div>
                        
                        {/* 全部标签 */}
                        <div style={{width:"100%",borderBottom:"1px solid #eaedf5"}}></div>
                        <div style={{textAlign:"right",padding:"10px"}}>
                            <Button onClick={()=>setIsFocus(false)} type="primary">
                            确认
                            </Button>
                        </div>
                    </Scoped>
                )}
                // 展开下拉菜单的回调 -- 可以控制下拉菜单的展示与隐藏
                onDropdownVisibleChange={(open)=>{
                    open?setIsFocus(true):setIsFocus(false)
                }}
                onSelect={()=>{

                }}
            ></Select>
        </ConfigProvider>
    )
}

const Scoped = styled.div`
    .inner-select-box{
        padding:8px 12px;
        border-bottom: 1px solid #eaedf5;
    }
    .any-tag-list{
        padding: 8px 0;
    }
`

{/* <ConfigProvider
theme={{
    // 2. 组合使用暗色算法与紧凑算法
    // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    components: {
        Select: {
            // optionPadding: '0px 0px',
            // showArrowPaddingInlineEnd: '0px',
        }
    },
}}>
<Select
    size="large"
    placeholder='标签'
    mode="multiple"
    style={{
        minWidth: 140,
        height:36
    }}
    open={openTagsList}
    dropdownStyle={{padding:"0px"}}
    dropdownRender={(menu) => (
        <>
        {menu}
            <div style={{width:"100%",height:"1px",backgroundColor:"#d7dbe7"}}></div>
            <div style={{textAlign:"right",padding:"10px"}}>
                <Button onMouseDown={()=>{
                    setOpenTagsList(false)
                    setTags(str.slice(1))
                }} type="primary">
                确认
                </Button>
            </div>
            
        </>
    )}
    options={options}
    onChange={handleTagChange}
    onFocus={()=>{setOpenTagsList(true)}}
    onBlur={()=>{setOpenTagsList(false)}}
></Select>
</ConfigProvider> */}

const PopoverContent = styled.div`
    .top{
        border-bottom: 1px solid #eaedf5;
        display: flex;
        width: 100%;
        padding: 20px;
        height: 76px;
        justify-content: center;
        align-content: center;
        .input{
            flex: 1;
            width: 100%;
            height: 36px;
            line-height: 36px;
        }
        .line{
            position: relative;
            top: 20px;
            background-color: #d7dbe7;
            margin: 0 12px;
            display: inline-block;
            width: 12px;
            height: 1px;
            -ms-flex-negative: 0;
            flex-shrink: 0;
        }
    }
    .bottom{
        display: flex;
        height: 50px;
        justify-content: right;
        padding: 10px 24px;
    }

`



