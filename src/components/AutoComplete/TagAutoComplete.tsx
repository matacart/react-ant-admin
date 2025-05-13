import { AutoComplete, AutoCompleteProps, Button, ConfigProvider, Flex, Input, Select } from "antd";
import styled from "styled-components";
import { AddIcon, SearchIcon, UnfoldIcon } from "../Icons/Icons";
import { useRef, useState } from "react";

interface MyAutoCompleteProps extends Omit<AutoCompleteProps, 'dropdownRender'> {
    onClick?: (value:any) => void; // 可选的 onClick 属性
}
export default function TagAutoComplete({onClick,options,...props}:MyAutoCompleteProps){
    
    const Ref = useRef(null)

    const [tagText,setTagText] = useState("")

    // 数据匹配
    const [hasMatches, setHasMatches] = useState(true);

    // toLowerCase()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // // 匹配逻辑：输入内容是否存在于 options
        const inputValue = value.trim().toLowerCase();
        const hasMatch = options?.some(option => (option.label || "").toString().includes(inputValue)) ?? false;
        setHasMatches(hasMatch);
    };

    const handleAddClick = () => {
        if (Ref.current && onClick) {
            setHasMatches(true);
            (Ref.current as any).blur();
            onClick(tagText);
            setTagText("")
        }
    };

    const handAddSelect = (value:any)=>{
        if (Ref.current && onClick) {
            setHasMatches(true);
            (Ref.current as any).blur();
            onClick(value);
            setTagText("")
        }
    }

    return (
        <Scoped>
            {/* 回退 */}
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },

                    components: {
                        Input: {
                            borderRadius:4,
                        },
                    },
                }}
            >
                {/*  */}
                <AutoComplete {...props} options={options} 
                    value={tagText}
                    onChange={(value) => setTagText(value)}  // 新增onChange
                    onSelect={handAddSelect}
                    ref={Ref}
                    notFoundContent={!hasMatches && "暂无标签"}
                    dropdownRender={(menu) => {
                    return (
                        <div style={{overflow: 'auto', maxHeight: 300,margin:"8px 0"}}>
                            {hasMatches?(
                                <div >
                                    <div className="color-474F5E font-12 cursor-not-allowed" style={{marginBottom:"4px",padding:"6px 12px"}}>常用标签</div>
                                    {menu}
                                </div>
                            ) : (tagText?<Flex className="color-356DFF cursor-pointer" align="center" gap={4} style={{padding:"6px 12px"}} onClick={handleAddClick}>
                                <AddIcon className="font-12" />
                                <div className="font-12 color-474F5E">添加"{tagText}"</div>
                            </Flex>:<div style={{padding:"6px 12px"}}>
                                <div className="color-474F5E font-12 cursor-not-allowed" style={{marginBottom:"12px"}}>常用标签</div>
                                <div className="color-B8BECC">暂无标签</div>
                            </div>)}
                        </div>
                    )
                }}>
                    {/*  */}
                    <Input className="input" onChange={handleInputChange} />
                </AutoComplete>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    .input{
        height: 36px;
    }
    
`