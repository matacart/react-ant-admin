import { getCurrencies, getCurrenciesList, getDomain, getDomainList, getTimeZoneList } from "@/services/y2/api";
import { DownOutlined, LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Popover, Select, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { result, set } from 'lodash';
import { useIntl } from '@umijs/max';
import cookie from 'react-cookies';
import { history } from 'umi';
import SuccessTag from "../Tag/SuccessTag";
import DefaultTag from "../Tag/DefaultTag";
import globalStore from "@/store/globalStore";

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
export default function SelectDomain() {
    const [domainListCurrent, setDomainListCurrent] = useState<any>([])
    const [defaultDomain, setDefaultDomain] = useState('')
    // 店铺列表popover是否展开
    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [searching, setSearching] = useState(false)
    const intl = useIntl();// 多语言

    const getDomainCurrent = (id:string)=>{
        getCurrencies(id).then(res=>{
            // console.log(res)
        })
    }
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

    // 货币符号
    const setCurrencys = (defaultCurrency:string)=>{
        (defaultCurrency == "" || defaultCurrency == undefined) ? cookie.save('symbolLeft', '', { path: '/' }) : getCurrenciesList().then(res=>{
            cookie.save('symbolLeft', res.data.filter(item=>item.code == defaultCurrency)[0].symbol_left, { path: '/' });
        })
    }

    // 时区
    const setTimeZone = (timeZone:string)=>{
        getTimeZoneList().then(res=>{
            cookie.save('timeZone', JSON.stringify(res.filter(item=>item.time_zone_name == timeZone)[0]), { path: '/' });
        })
    }

    // 默认语言
    const setLanguage = (defaultLang:string)=>{
        cookie.save('default_lang', defaultLang, { path: '/' });
    }

    
    const changeDomain = (item: any) => {
        if(!window.location.hostname.startsWith("localhost")){
            const newUrl = replaceSubdomain(window.location.href,item.secondDomain,window.location.hostname.slice(0,window.location.hostname.indexOf(".")))
            window.open(newUrl)
        }
        setIsActive(false);
    }
    useEffect(() => {

        // 平台大类
        // globalStore.getPlatformCategory();
        // getDomain("140285").then((res) => {
        //     console.log(res)
        // });
        domainList = [];
        // 判断会话中是否存在店铺数据
        if(sessionStorage["domain"] && JSON.parse(sessionStorage["domain"]).length !== 0){
            setDomainListCurrent(JSON.parse(sessionStorage["domain"]));
            setDefaultDomain(cookie.load("domain")?.storeName);
            getDomainCurrent(cookie.load("domain")?.id);
            setCurrencys(cookie.load("domain")?.defaultCurrency);
            setTimeZone(cookie.load("domain")?.timeZone);
            setLanguage(cookie.load("domain")?.defaultLang);
            domainList = JSON.parse(sessionStorage["domain"])
        }else{
            getDomainList().then((res) => {
                let flag:any = [];
                res?.data?.forEach((item: any, index: any) => {
                    domainList.push({
                        id: item.id,
                        domainName: item.domain_name,
                        storeName: item.store_name,
                        secondDomain: item.second_domain.toLowerCase(),
                        defaultCurrency: item.default_currency,
                        timeZone:item.timezone,
                        status: item.status,
                        defaultLang: item.default_lang,
                    })
                    if(item.second_domain == window.location.hostname.slice(0,window.location.hostname.indexOf("."))){
                        flag.push({
                            id: item.id,
                            domainName: item.domain_name,
                            storeName: item.store_name,
                            secondDomain: item.second_domain.toLowerCase(),
                            defaultCurrency: item.default_currency,
                            timeZone:item.timezone,
                            status: item.status,
                            defaultLang: item.default_lang,
                        })
                    }
                })
                setDomainListCurrent(domainList);
                // 缓存店铺数据
                sessionStorage["domain"] = JSON.stringify(domainList);
                if(flag.length == 0){
                    cookie.save('domain', JSON.stringify(domainList[0]), { path: '/' });
                    cookie.save('default_lang', domainList[0].defaultLang, { path: '/' });
                    setCurrencys(res.data[0]?.default_currency)
                    setTimeZone(cookie.load("domain")?.timeZone);
                    setDefaultDomain(res.data[0]?.store_name);
                    getDomainCurrent(res.data[0]?.id);
                }else{
                    cookie.save('domain', JSON.stringify(flag[0]), { path: '/' });
                    cookie.save('default_lang', flag[0].defaultLang, { path: '/' });
                    setCurrencys(res.data[0]?.default_currency)
                    setTimeZone(cookie.load("domain")?.timeZone);
                    setDefaultDomain(flag[0].storeName);
                    getDomainCurrent(flag[0].id);
                }
            }).catch((error) => {
                message.error('未获取到店铺列表，请检查网络')
            })
        }
    }, [])

    const content = (
        <ContentWrap>
            <div className="popover_header">
                <div className="popover_input">
                    <Input size="large" suffix={<SearchOutlined />}
                        // 店铺搜索
                        onChange={(e) => {
                            let term = e.target.value
                            setSearchTerm(term);
                            if (!domainList) return;
                            if (term == '') {
                                setDomainListCurrent([...domainList]);
                                return;
                            };
                            // map 没return时 返回 undefine
                            // let resultArray = domainList.map(item=>{
                            //     if(item.id.includes(term)){
                            //         return item;
                            //     }
                            // })
                            setSearching(true);
                            getFilterResultArray(term)
                                .then(resultArray => setDomainListCurrent(resultArray))
                                .finally(() => setTimeout(() => { setSearching(false) }, 100)) // 可以优化速度

                        }}
                        placeholder={intl.formatMessage({
                            id: 'menu.search.stores'
                        })} />
                </div>
            </div>
            {/* 加载动画 */}
            {searching && <div style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                height: "290px"
            }}
            >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 80, height: 80, top: 50 }} spin />} />
            </div>}

            {/* 店铺项 */}
            {!searching && <div className="popover_content">{
                domainListCurrent.length>0 ? (domainListCurrent.map((item: any, index: any) => {
                    return (
                        <div className="popover_item" key={index} onClick={() => {
                            changeDomain(item)
                        }}>
                            <img src='/img/storeLogo.png' className="storeLogo" />
                            <div className="storeInfo">
                                <div className="storeName">
                                    <div className="shopTitle" dangerouslySetInnerHTML={{
                                        __html: item?.storeName
                                    }}>
                                    </div>

                                    {item?.status == 1 && <SuccessTag text={intl.formatMessage({id:"menu.stores.running"})} />}
                                    {item?.status == 0 && <DefaultTag text={intl.formatMessage({id:"menu.stores.default"})} />}
                                    {/* <Tag className="tag tag-success" style={{
                                        display: 'flex',
                                        alignContent: 'center'
                                    }}>
                                        <span className="tag-right">
                                            <span className={"tag-dot " + ((item?.status == 1) ? 'tag-dot-success ' : 'tag-dot-error')} />
                                        </span>
                                        {(item?.status == 1) ?intl.formatMessage({id:"menu.stores.running"}): intl.formatMessage({id:"menu.stores.stop"})}
                                    </Tag> */}

                                </div>
                                <div className="shopInfo">
                                    {item?.id}
                                </div>
                                <div className="email">
                                    {item?.domainName}
                                </div>
                            </div>
                        </div>
                    )
                })):<div>{intl.formatMessage({
                    id:'menu.search.none'
                })} </div>
            }
            </div>}
            <div className="popover_footer">
                <Button onClick={()=>{
                    history.push('/stores/list')
                }} type="primary" size='large' block>
                {intl.formatMessage({
                    id:'menu.stores.manage'
                })} 
                </Button>
            </div>
        </ContentWrap>
    )

    return (
        <Scoped>
            <Popover content={content} className="title"
                onOpenChange={(open) => {
                    setIsActive(open);
                }}
                open={isActive}
                trigger="click">
                <div>
                    <h4>{defaultDomain}</h4>
                    <DownOutlined style={{
                        transition: 'all 0.3s ease',
                        color: (isActive ? 'green' : ''),
                    }} />
                </div>
            </Popover>
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
    max-height:418px;
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
