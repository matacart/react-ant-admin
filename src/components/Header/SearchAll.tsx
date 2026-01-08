import { globalSearch } from "@/services/y2/api";
import { SearchOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { ConfigProvider, Flex, Input, Select, Spin } from "antd";
import { debounce, DebouncedFunc } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

function SearchAll(){

    const intl = useIntl();

    const searchBoxRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    // 使用 lodash debounce 创建防抖函数
    const debouncedSearch: DebouncedFunc<(value: string) => void> = useMemo(() => {
        return debounce((value: string) => {
            // 在这里执行搜索逻辑
            if (!value.trim()) {
                return;
            }
            globalSearch(value.trim()).then(res=>{
                console.log(res);
            });

        }, 500);
    },[]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedSearch(value); // 调用防抖函数
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <Scoped>
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        borderRadius:4
                    },
                }}
            >   
                {open?<div ref={searchBoxRef} className="search-box">
                    <Input
                        autoFocus
                        prefix={<SearchOutlined />}
                        placeholder={intl.formatMessage({id: 'components.header.search'})}
                        onChange={handleSearchChange}
                    />
                    <div className="conent-box">
                        <div style={{marginBottom:"12px"}} className="font-12 color-7A8499">最近搜索</div>
                        <Flex className="empty" vertical align="center">
                            <img style={{width:"160px"}} src="/img/blank/empty.search.svg" />
                            <span className="color-7A8499">暂无搜索历史记录,输入搜索内容查找相关信息</span>
                        </Flex>
                    </div>
                </div>:<Input
                    className="input"
                    prefix={<SearchOutlined />} 
                    placeholder={intl.formatMessage({id: 'components.header.search'})}
                    onFocus={()=>{setOpen(true)}}
                />}
            </ConfigProvider>
        </Scoped>
        
    )
}

export default SearchAll;

const Scoped = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .input{
        max-width: 600px;
        min-width: 100px;
    }
    .search-box{
        max-width: 600px;
        min-width: 100px;
        width: 100%;
        position: absolute;
        z-index: 999999;
        top: 0;
        padding: 0 12px;
        background: #fff;
        -webkit-box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
        box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        .conent-box{
            padding: 0 12px;
            line-height: normal;
            width: 100%;
            text-align: left;
            .empty{
                margin-bottom: 24px;
            }
        }
    }
`