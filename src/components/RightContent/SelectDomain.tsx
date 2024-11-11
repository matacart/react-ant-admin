import { getDomainList } from "@/services/y2/api";
import { DownOutlined, LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input, message, Popover, Select, Spin, Tag } from "antd";
import Search from "antd/lib/input/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { result } from 'lodash';
import { useIntl } from '@umijs/max';


// 定义一个函数来高亮搜索词  
function highlightSearchTerm(text: string, term: string) {
    // 使用正则表达式来匹配搜索词，并替换为带有<mark>标签的文本
    console.log(term)
    return text.replace(term,()=> `<span class="mark">'${term}'</span>`);
}

const domainList: any[] = [];


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
    
    const changeDomain = (item: any) => {
        setDefaultDomain(item.id)
        setIsActive(false);
    }


    useEffect(() => {
        getDomainList().then((res) => {
            console.log(res)
            res?.data?.forEach((item: any, index: any) => {
                domainList.push({
                    id: item.id,
                    domainName: item.domain_name,
                    secondDomain: item.second_domain,
                    status: item.status,
                })
            })
            setDomainListCurrent(domainList);
            setDefaultDomain(res.data[0]?.id);
        }).catch((error) => {
            message.error('未获取到店铺列表，请检查网络')
        })
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
                                        __html: item?.id
                                    }}>
                                        
                                    </div>
                                    <Tag className="tag tag-success" style={{
                                        display: 'flex',
                                        alignContent: 'center'
                                    }}>
                                        <span className="tag-right">
                                            <span className={"tag-dot " + ((item?.status == 1) ? 'tag-dot-success ' : 'tag-dot-error')} />
                                        </span>
                                        {(item?.status == 1) ?intl.formatMessage({id:"menu.stores.running"}): intl.formatMessage({id:"menu.stores.stop"})}
                                    </Tag>

                                </div>
                                <div className="shopInfo">
                                    {item?.domainName}
                                </div>
                                <div className="email">
                                    {item?.secondDomain}
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
                <Button type="primary" size='large' block>
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
