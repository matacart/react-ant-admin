import { domainSelect } from "@/services/y2/api";
import { DownOutlined, EllipsisOutlined, LoadingOutlined, SearchOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Flex, Input, message, Popover, Select, Spin, Tag, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useIntl } from '@umijs/max';
import cookie from 'react-cookies';
import SuccessTag from "../Tag/SuccessTag";
import DefaultTag from "../Tag/DefaultTag";
import { useNavigate } from "react-router-dom";
// 定义一个函数来高亮搜索词  
function highlightSearchTerm(text: string, term: string) {
    // 使用正则表达式来匹配搜索词，并替换为带有<mark>标签的文本
    // console.log(term)
    return text.replace(term,()=> `<span class="mark">'${term}'</span>`);
}

let domainList: any[] = [];


// 店铺搜索 
async function getFilterResultArray(term: string) {
    return domainList.filter(item => (
        item.id?.toLocaleLowerCase().includes(term.toLocaleLowerCase()) || 
        item.domainName?.toLocaleLowerCase().includes(term) || 
        item.secondDomain?.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )).map((item)=>{
            let i={...item};
            if(item.id?.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
                    i.id=i.id?.replace(term,`<span class="mark">${term}</span>`)
            }
            return i;
        })
}

// 店铺下拉组件 开发者：@qiuliw 2024-6-16
/*
    已完
    1. 店铺选择
    2. 店铺搜索
    3. 搜索高亮
    4. 多语言

    待
    1. 虚拟列表
    2. 搜索防抖
**/

interface storeType{
    id:string;
    store_name:string;
    domain_name:string;
    second_domain:string;
    timezone:string;
    default_currency:string;
    default_lang:string;
    status:number;
}

export default function SelectDomain() {

    const intl = useIntl();// 多语言
    const mRef = useRef(null);
    const navigate = useNavigate();

    // 店铺列表
    const [storeList, setStoreList] = useState<storeType[]>([]);
    // 店铺
    const [store, setStore] = useState<storeType | null>();

    const [page,setPage] = useState(1);

    // 关键字
    const [keyword, setKeyword] = useState('');

    const [loadingMore, setLoadingMore] = useState(false); // 是否正在加载更多

    const [loading,setLoading] = useState(false);

    // 店铺列表popover是否展开
    const [isActive, setIsActive] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

    const scrollRef = useRef<HTMLDivElement>(null); // 添加滚动容器的引用
     // 添加一个状态来控制是否应该忽略滚动事件
     const [ignoreScrollEvents, setIgnoreScrollEvents] = useState(false);

    // 添加一个ref来存储防抖定时器ID
    const loadMoreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 替换域名
    function replaceSubdomain(url:string,newSubdomain:string,oldSubdomain:string) {
        try {
          // 创建一个新的URL对象
          const urlObj = new URL(url);
          
          // 获取主机名（包括子域名）
          const hostname = urlObj.hostname;
          
          // 使用replace方法替换子域名
          // 注意：这里使用正则表达式来确保只替换完整的子域名部分
          // 假设子域名和主域名之间只有一个点分隔
          const newHostname = hostname.replace(new RegExp(`^${oldSubdomain}\\.`), `${newSubdomain}.`);
          
          // 如果替换成功（即新的主机名与旧的不同），则更新URL对象的主机名
          if (newHostname !== hostname) {
            // 由于URL对象的hostname属性是只读的，我们需要创建一个新的URL对象
            // 这里通过重新设置协议、主机名、端口（如果有）、以及路径名来构建新URL
            const newUrlObj = new URL(urlObj.protocol + '//' + newHostname +
              (urlObj.port ? ':' + urlObj.port : '') + urlObj.pathname + urlObj.search + urlObj.hash);
            
            // 返回新的URL字符串
            return newUrlObj.toString();
          }
          
          // 如果替换失败（即没有找到要替换的子域名），则返回原始URL
          return url;
        } catch (error) {
          // 如果URL无效，抛出错误或返回null/undefined等
          console.error('Invalid URL:', error);
          return null;
        }
    }
    // 默认货币符号 -- 店铺
    const setCurrencys = (store:storeType | null)=>{
        const currencies = JSON.parse(localStorage.getItem('MC_DATA_CURRENCIES') || '[]');
        let currency = null;
        if(store?.default_currency && currencies.length > 0){
            currency = currencies.filter((item:any)=>item.code == store.default_currency)[0].symbol_left;
        }else{
            currency = 'US$'
        }
        cookie.save('symbolLeft', currency, { path: '/' })
    }
    // 默认时区对象
    const setTimeZone = (store:storeType | null)=>{
        const timeZones = JSON.parse(localStorage.getItem('MC_DATA_TIME_ZONEZ') || '[]');
        let timeZone = null;
        const defaultTimeZone = {
            country_id: "12",
            dst_offset: null,
            id: "90",
            is_dst: "0",
            status: "1",
            time_zone_label: "UTC+08:00",
            time_zone_name: "Asia/Shanghai",
            utc_offset: "8",
        };
        if(store?.timezone && timeZones.length > 0 ){
            timeZone = timeZones.filter((item:any)=>item.time_zone_name == store.timezone)[0];
            // 检测时区是否有效
            if(!timeZone){
                timeZone = defaultTimeZone
            }
        }else{
            timeZone = defaultTimeZone
        }
        cookie.save('timeZone', JSON.stringify(timeZone), { path: '/' });
    }

    // 店铺语言
    const setLanguage = (store:storeType | null)=>{
        // 根据code 查找对应的id
        const languages = JSON.parse(sessionStorage['languages'] || '[]');
        const languagesId = languages.filter((item:any)=>item.code == store?.default_lang)[0]?.id ?? "2";
        cookie.save('shop_lang', languagesId, { path: '/' });
    }

    // 加载更多数据的函数
    const loadMore = () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        domainSelect({
            data: {
                keyword: keyword,
                page: nextPage,
                limit: 10
            }
        }).then((res: any) => {
            if (res.code == 0) {
                if (res.data.length > 0) {
                    setStoreList(prev => [...prev, ...res.data]);
                    setPage(nextPage);
                } else {
                    setHasMore(false); // 没有更多数据了
                }
            }
        }).catch(() => {
            message.error('加载更多失败');
        }).finally(() => {
            setLoadingMore(false);
        });
    };

    // 防抖版本的loadMore函数
    const debouncedLoadMore = () => {
        // 清除之前的定时器
        if (loadMoreTimeoutRef.current) {
            clearTimeout(loadMoreTimeoutRef.current);
        }
        // 设置新的定时器
        loadMoreTimeoutRef.current = setTimeout(() => {
            loadMore();
        }, 300);
    };

     // 滚动事件处理函数
     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        // 如果应该忽略滚动事件，则直接返回
        if (ignoreScrollEvents) return;

        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        // 当滚动到底部时加载更多
        if (scrollHeight - scrollTop <= clientHeight + 10) {
            // loadMore();
            debouncedLoadMore();
        }
    };
    
    // 选择店铺
    const changeDomain = (item:storeType) => {
        if(!window.location.hostname.startsWith("localhost")){
            const newUrl = replaceSubdomain(window.location.href,item.second_domain,window.location.hostname.slice(0,window.location.hostname.indexOf(".")))
            window.open(newUrl)
        }
        setIsActive(false);
    }

    // 获取店铺信息
    const initStore = async ()=>{
        let store:storeType | null = null;
        // 获取店铺信息 cookie是否存在店铺数据
        if(cookie.load("domain") && cookie.load("domain") !== 'undefined'){
            store = cookie.load("domain")
        }else{
            // 获取当前域名
            const domain = window.location.hostname.slice(0,window.location.hostname.indexOf("."))
            if(window.location.hostname.startsWith("localhost") || domain == 'admin'){
                // 域名location
                await domainSelect().then((res:any)=>{
                    if(res?.data?.length > 0){
                        store = res.data[0];
                        cookie.save('domain', res.data[0], { path: '/' });
                    }
                })
            }else{
                // 域名
                await domainSelect({
                    data:{
                        keyword: domain
                    }
                }).then((res:any)=>{
                    if(res?.data?.length > 0){
                        store = res.data.filter((item:any)=>item.second_domain == domain)[0];
                        cookie.save('domain', res.data.filter((item:any)=>item.second_domain == domain)[0], { path: '/' });
                    }
                })
            }
        }
        setTimeZone(store);
        setCurrencys(store);
        setLanguage(store);
        setStore(store);
    }
    
    useEffect(() => {
        initStore();
        // 清理防抖定时器
        return () => {
            if (loadMoreTimeoutRef.current) {
                clearTimeout(loadMoreTimeoutRef.current);
            }
        };
    }, []);

    const content = (
        <ContentWrap>
            <div className="popover_header">
                <div className="popover_input">
                    <Input value={keyword} size="large" suffix={<SearchOutlined />}
                        // 店铺搜索
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }}
                        onBlur={(e) => {
                            setLoading(true);
                            domainSelect({
                                data:{
                                    keyword:e.target.value,
                                    page:1,
                                    limit:10,
                                }
                            }).then((res:any)=>{
                                if(res.code == 0){
                                    // 重置无限滚动相关状态
                                    setPage(1);
                                    setHasMore(true);
                                    setLoadingMore(false);
                                    // 设置忽略滚动事件标志
                                    setIgnoreScrollEvents(true);
                                    // 重置滚动条位置
                                    if (scrollRef.current) {
                                        scrollRef.current.scrollTop = 0;
                                    }
                                    // 延迟重置忽略滚动事件标志
                                    setTimeout(() => {
                                        setIgnoreScrollEvents(false);
                                    }, 100);
                                    // 
                                    setStoreList(res.data);
                                }
                            }).catch(() => {
                                message.error('失败')
                            }).finally(() => {
                                setLoading(false)
                            })
                        }}
                        placeholder={intl.formatMessage({
                            id: 'menu.search.stores'
                        })} />
                </div>
            </div>
            {/* 店铺项 */}
            <Spin spinning={loading}>
                {<div ref={scrollRef} className="popover_content" onScroll={handleScroll}>{
                    storeList.length > 0 ? (storeList.map((item: any, index: any) => {
                        return (
                            <div className="popover_item" key={index} onClick={() => {
                                changeDomain(item)
                            }}>
                                <img src='/img/storeLogo.png' className="storeLogo" />
                                <div className="storeInfo">
                                    <div className="storeName">
                                        <div className="shopTitle" dangerouslySetInnerHTML={{
                                            __html: item?.store_name
                                        }}>
                                        </div>
                                        {item?.status == 1 && <SuccessTag text={intl.formatMessage({id:"menu.stores.running"})} />}
                                        {item?.status == 0 && <DefaultTag text={intl.formatMessage({id:"menu.stores.default"})} />}
                                    </div>
                                    <div className="shopInfo">
                                        {item?.id}
                                    </div>
                                    <div className="email">
                                        {item?.domain_name}
                                    </div>
                                </div>
                            </div>
                        )
                    })):<Flex align="center" justify="center"
                        style={{
                            minHeight: "60px",
                        }}
                    >
                        {intl.formatMessage({id:'menu.search.none'})}
                    </Flex>
                }
                </div>}
                {loadingMore && (
                    <Flex align="center" justify="center" style={{ padding: '10px' }}>
                        <Spin />
                    </Flex>
                )}
            </Spin>
            <div className="popover_footer">
                <Button onClick={()=>{
                    navigate('/stores/list')
                }} type="primary" size='large' block>
                {intl.formatMessage({
                    id:'menu.stores.manage'
                })} 
                </Button>
            </div>
        </ContentWrap>
    )

    return (
        <Scoped ref={mRef}>
            <div className="item">
                <Popover content={content} className="title"
                    onOpenChange={(open) => {
                        setIsActive(open);
                        // 获取店铺列表
                        storeList.length == 0 && domainSelect({
                            data:{
                                page:page,
                                limit:10 
                            }
                        }).then((res:any) => {
                            if(res.code == 0){
                                setStoreList(res.data);
                            }
                        }).catch(error => {
                            message.error('请求失败');
                        })
                    }}
                    open={isActive}
                    getPopupContainer={() => mRef.current!}
                    trigger="click">
                    <div style={{padding:"8px"}}>
                        <h4>{store?.store_name}</h4>
                        <DownOutlined style={{
                            transition: 'all 0.3s ease',
                            color: (isActive ? 'green' : ''),
                        }} />
                    </div>
                </Popover>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    .title{
        display: flex;
        align-content: center;
        transition: all 0.3s ease;
        color: #242833;
        h4{
            max-width: 200px;
            margin: 0;
            margin-right: 10px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
        }
        .isActive{
            transform: rotate(180deg);
        }

    }
`
const ContentWrap = styled.div`
    width: 420px;
    max-height:448px;
    padding:0;
    .popover_header{
        padding: 5px 10px 18px 10px;
        border-bottom: 1px solid #eef1f7;
    }
    .popover_content{
        max-height: 290px;
        overflow-y: scroll;
        overflow-x: hidden;
        .popover_item{
            padding: 18px 10px;
            border-bottom: 1px solid #eef1f7;
            display:flex;
            &:hover{
                background-color: #f7f7f7;
                cursor:pointer;
            }
            .storeLogo{
                width: 60px;
                height: 60px;
                margin-right: 12px;
                border-radius: 3px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
            .storeInfo{
                flex:1;
                overflow:hidden;
                .storeName{
                    display:flex;
                    width:100%;
                    align-items:center;
                    justify-content:space-between;
                    .shopTitle{
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 22px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .tag{
                        border-radius: 9999px;
                        font-weight:400;
                        .tag-right{
                            display: flex;
                            flex-wrap: wrap;
                            align-content: center ;
                            .tag-dot{
                                display:inline-block;
                                border-radius: 50%;
                                margin-right: 5px;
                                height: 4px;
                                width: 4px;
                            }
                            .tag-dot-error{
                                background-color: #f86140;
                            }
                            .tag-dot-success{
                                background-color: #35c08e;
                            }
                        }
                    }
                    .tag-success{
                        background-color: #d6fae7;
                        border: 1px solid rgba(53,192,142,.2);
                    }
                    .tag-error{
                        background-color: #ffebe7;
                        border: 1px solid rgba(248,97,64,.2);
                    }

                }
                .shopInfo{
                    margin-top: 2px;
                    color: #7a8499;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .email{
                    color: #7a8499;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                }
            }
        }
    }

    .popover_footer{
        padding: 18px 10px 5px 10px;
    }

    .mark{
        color: #008db1;
        font-weight: 600;
    }
`
