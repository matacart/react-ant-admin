import { globalSearch } from "@/services/y2/api";
import { SearchOutlined } from "@ant-design/icons";
import { history, useIntl } from "@umijs/max";
import { ConfigProvider, Flex, Input, Select, Spin } from "antd";
import { debounce, DebouncedFunc } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ExportIcon } from "../Icons/Icons";

function SearchAll(){

    const intl = useIntl();

    const searchBoxRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState<any[]>([]);

    const [searchValue, setSearchValue] = useState<string>("");

    // 使用 lodash debounce 创建防抖函数
    const debouncedSearch: DebouncedFunc<(value: string) => void> = useMemo(() => {
        return debounce(async (value: string) => {
            // 在这里执行搜索逻辑
            if (!value.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            const res = await globalSearch(value.trim());
            if(res?.code == "SUCCESS"){
                setResults(res.data.searchResultList)
            }else{
                setResults([]);
            }
            setLoading(false);
        }, 500);
    },[]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedSearch(value); // 调用防抖函数
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
                setOpen(false);
                setSearchValue("");
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
                        <Spin spinning={loading}>
                            {searchValue?<>
                                <Flex vertical>
                                    <div style={{marginBottom:"12px",padding:"0 6px"}} className="font-12 color-7A8499">商店搜索结果</div>
                                    <div className="item-list font-12">
                                        {results.map((item,index)=>{
                                            return <Flex key={index} className="item" gap={8} align="center" onClick={()=>history.push(item?.path)}>
                                                <img style={{width:"24px"}} src="https://cdn.myshopline.cn/sl/admin/ec-admin-search/20250910122700748/imgs/Product.6b086.svg" />
                                                <span className="font-12">{item.pageInfo.title}</span>
                                            </Flex>
                                        })}
                                        <Flex onClick={()=>window.open("https://apps.matacart.com/")} className="item divider color-474F5E" align="center" gap={8}>
                                            <ExportIcon className="font-16" />
                                            在应用市场搜索
                                        </Flex>
                                        <Flex onClick={()=>window.open("http://help.handingyun.cn/")} className="item color-474F5E" align="center" gap={8}>
                                            <ExportIcon className="font-16" />
                                            在帮助中心搜索
                                        </Flex>
                                    </div>
                                </Flex>
                            </>:<>
                                <div style={{marginBottom:"12px",padding:"0px 6px"}} className="font-12 color-7A8499">最近搜索</div>
                                <Flex className="empty" vertical align="center">
                                    <img style={{width:"160px"}} src="/img/blank/empty.search.svg" />
                                    <span className="color-7A8499">暂无搜索历史记录,输入搜索内容查找相关信息</span>
                                </Flex>
                            </>}
                        </Spin>
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
            line-height: normal;
            width: 100%;
            text-align: left;
            .empty{
                padding: 0 6px;
                margin-bottom: 24px;
            }
            .item-list{
                margin-bottom: 12px;
                .divider{
                    border-top: 1px solid #E4E7EA;
                }
                .item{
                    padding: 6px;
                }
            }
        }
    }
`