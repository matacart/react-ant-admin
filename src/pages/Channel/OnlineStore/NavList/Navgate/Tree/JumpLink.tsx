import { ConfigProvider, Flex, Form, FormInstance, message, Select, Spin } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from 'lodash';
import { EditorFeaturedCollectionIcon, EditorFeaturedProductIcon, EditorRichTextIcon, LeftIcon } from "@/components/Icons/Icons";
import { getLinkList } from "@/services/y2/api";


export const optionsData = [
    {
        title:"首页",
        value:"1",
        nodeType:"1",
        icon:<EditorRichTextIcon className="font-18" />
    },
    {
        title:"搜索页",
        value:"2",
        nodeType:"8",
        icon:<EditorRichTextIcon className="font-18" />
    },
    {
        title:"商品分类",
        value:"3",
        icon:<EditorFeaturedCollectionIcon className="font-18" />
    },
    {
        title:"商品",
        value:"4",
        icon:<EditorFeaturedProductIcon className="font-18" />
    },
    {
        title:"自定义页面",
        value:"5",
        icon:<EditorRichTextIcon className="font-18" />
    },
    {
        title:"政策",
        value:"6",
        icon:<EditorRichTextIcon className="font-18" />
    },
    {
        title:"博客集合",
        value:"7",
        icon:<EditorRichTextIcon className="font-18" />
    },
    {
        title:"博客",
        value:"8",
        icon:<EditorRichTextIcon className="font-18" />
    },
    {
        title:"无链接",
        value:"9",
        nodeType:"0"
    },
]

export default function({form,secondData}:{form:FormInstance<any>,secondData?:any}){

    const [open,setOpen] = useState(false);

    const selectRef = useRef<any>(null);

    const [loading,setLoading] = useState(false);

    // 在组件顶部获取表单值
    const formUrlValue = Form.useWatch('url', form);

    const formNodeType = Form.useWatch('nodeType', form);

    const [currentPage, setCurrentPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);
    
    const [searchValue, setSearchValue] = useState('https://');

    // 搜索关键字
    const [keyWord, setKeyWord] = useState<string>("");

    const [options,setOptions] = useState<any[]>();

    const newOptions = optionsData.map(item=>{
        return {
            value: item.value,
            label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
            {item?.icon && item.icon}
            <div>{item.title}</div>
            </Flex>
        }
    })

    const debouncedSearch = useCallback(debounce((value:string) => {
        // 商品分类搜索
        setLoading(true);
        setHasMore(true);
        getNavlistSecondData({
            nodeType:formNodeType,
            pageNum:"1",
            pageSize:"10",
            keyword:value,
        }).then(res => {
            const nondeBack = {
                value: "back",
                label: <Flex align="center" justify="space-between" style={{padding:"4px 0px"}} gap={6}>
                    <Flex>
                        <LeftIcon className="font-18" />
                        <div>返回</div>
                    </Flex>
                    <Flex className="font-12 color-474F5E">{res?.count || 0}个选项</Flex>
                </Flex>
            };
            if(res?.options.length > 0){
                setOptions([nondeBack, ...res?.options]);
            }else{
                setOptions([]);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, 300), [formNodeType,keyWord]); // 依赖 nodeType 确保使用最新值

    // 搜索链接
    const handleSearch = async (value: string) => {
        if(formNodeType == "3"){
            await setCurrentPage(1);
            await setKeyWord(value);
            debouncedSearch(value);
        } else {
            setSearchValue("https://"+value);
        }
    };
    // 获取二级导航
    const getNavlistSecond = async (res:{
        nodeType:string;
        pageNum?:string;
        pageSize?:string;
        keyWord?:string;
    })=>{
        setLoading(true);
        const navlistSecondData = await getNavlistSecondData(res);
        navlistSecondData?.lastPage ? setHasMore(false) : setHasMore(true);
        const newOptions = navlistSecondData?.options;
        const total = navlistSecondData?.count;
        const nondeBack = {
            value: "back",
            label: <Flex align="center" justify="space-between" style={{padding:"4px 0px"}} gap={6}>
                <Flex>
                    <LeftIcon className="font-18" />
                    <div>返回</div>
                </Flex>
                <Flex className="font-12 color-474F5E">{total || 0}个选项</Flex>
            </Flex>
        }
        // 如果是第一页，替换选项；如果是加载更多，追加选项
        if(res.pageNum == "1" || res.pageNum == undefined) {
            setOptions([nondeBack, ...newOptions]);
        } else {
            setOptions(prev => {
                // 过滤掉已经存在的选项，避免重复
                const filteredNewOptions = newOptions.filter((newOption: any) => !prev?.some((existingOption: any) => existingOption.value === newOption.value));
                return [...(prev || []), ...filteredNewOptions];
            });
        }
        setLoading(false);
    }
    // 滚动事件
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if(formNodeType == "3" || formNodeType == "2" || formNodeType == "4" || formNodeType == "10" || formNodeType == "11"){
            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
            if (scrollHeight - scrollTop <= clientHeight + 10) {
                // 滚动到底部时触发加载更多
                loadMoreData();
            }
        }
    };
    // 加载更多数据的函数
    const loadMoreData = () => {
        if (loading || !hasMore) {
            console.log("正在加载或没有更多数据");
            return;
        }
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getNavlistSecond({
            nodeType:formNodeType,
            pageNum:nextPage.toString(),
            pageSize:"10",
            keyWord:keyWord,
        });
    };

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(()=>{
        secondData ? setOptions([...secondData]) : setOptions(newOptions);
    },[secondData])

    useMemo(()=>{
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        setOptions([
            {
            value: searchValue,
            label: <Flex align="center" style={{color:"#000"}} gap={6}>
                {<img style={{height:"18px"}} src={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkgNUgzdjEyaDEydi02TTEwIDEwbDctN20wIDBoLTVtNSAwdjUiIHN0cm9rZT0iIzQ3NEY1RSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4="} />}
                <div>{searchValue}</div>
            </Flex>
            }
        ])
    },[searchValue])

    return (
        <>
            <Form.Item name="url" label="跳转链接" required={false} rules={[
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        // 检查是否是预设的选项之一
                        if (formNodeType !== "5") {
                            return Promise.resolve();
                        }
                        // 非空值，检查格式
                        const urlPattern = /^https:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/;
                        if (urlPattern.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('请输入正确的链接格式，例如：https://example.com'));
                    },
                })
            ]}>
                <ConfigProvider
                    theme={{
                        token: {
                        /* 这里是你的全局 token */
                            borderRadius:4,
                            paddingXXS:0,
                            // paddingSM:12
                        },
                    }}
                    >
                    <Select
                        ref={selectRef}
                        showSearch
                        open={open}
                        value={formUrlValue === "" ? undefined : formUrlValue}  // 使用本地状态作为值
                        options={options?.map(item =>({
                            value: item.value, // 实际提交的值
                            label: item.label  // 显示的文本
                        }))}
                        style={{
                            height:"36px"
                        }}
                        styles={{
                            popup: {
                                root: {
                                    padding:"6px 0px"
                                }
                            }
                        }}
                        placeholder="请输入选择或输入链接"
                        filterOption={false}  // 禁用过滤功能
                        allowClear
                        popupRender={(menu) => (
                            <div>
                                {loading && currentPage === 1 ? (
                                    <Flex align="center" justify="center" gap={12} style={{ height:"120px", padding: "8px 12px" }}>
                                        <Spin />
                                        加载中...
                                    </Flex>
                                ) : (
                                    <>
                                        {menu}
                                        {loading && currentPage > 1 && (
                                            <Flex align="center" justify="center" gap={12} style={{ padding: "4px 12px" }}>
                                                <Spin size="small" />
                                                <div className="font-14 color-7A8499">加载更多...</div>
                                            </Flex>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        onPopupScroll={handleScroll}
                        onSelect={(value)=>{
                            if(value == "back"){
                                // 先设置为 null，触发更新
                                form.setFieldsValue({ url: null });
                                form.setFieldsValue({ nodeType: "5" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setOptions(newOptions)
                            }else if(value == "1"){
                                form.setFieldsValue({ url:"1", nodeType: "1" });
                            }else if(value == "2"){
                                form.setFieldsValue({ url:"2", nodeType: "8" });
                            }else if(value == "3"){
                                // 先设置为 null，触发更新
                                form.setFieldsValue({ url: null,nodeType: "3" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setCurrentPage(1);
                                setHasMore(true);
                                getNavlistSecond({
                                    nodeType:"3",
                                    pageNum:"1",
                                    pageSize:"10"
                                });
                            }else if(value == "4"){
                                form.setFieldsValue({ url: null,nodeType: "10" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setCurrentPage(1);
                                setHasMore(true);
                                getNavlistSecond({
                                    nodeType:"10",
                                    pageNum:"1",
                                    pageSize:"10"
                                });
                            }else if(value == "5"){
                                form.setFieldsValue({ url: null,nodeType: "2" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setCurrentPage(1);
                                setHasMore(true);
                                getNavlistSecond({
                                    nodeType:"2",
                                    pageNum:"1",
                                    pageSize:"10"
                                });
                            }else if(value == "6"){
                                form.setFieldsValue({ url: null,nodeType: "12" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setCurrentPage(1);
                                setHasMore(true);
                                getNavlistSecond({
                                    nodeType:"12",
                                });
                            }else if(value == "7"){
                                form.setFieldsValue({ url: null,nodeType: "11" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setCurrentPage(1);
                                setHasMore(true);
                                getNavlistSecond({
                                    nodeType:"11",
                                    pageNum:"1",
                                    pageSize:"10"
                                });
                            }else if(value == "8"){
                                form.setFieldsValue({ url: null,nodeType: "4" });
                                // 然后设置为空字符串
                                setTimeout(() => {
                                    form.setFieldsValue({ url: "" });
                                }, 0);
                                setCurrentPage(1);
                                setHasMore(true);
                                getNavlistSecond({
                                    nodeType:"4",
                                    pageNum:"1",
                                    pageSize:"10"
                                });
                            }else if(value == "9"){
                                form.setFieldsValue({ url:"9",nodeType: "0" });
                            }else{
                                if(value.startsWith("http")){  // 如果是自定义链接
                                    form.setFieldsValue({ url: value, nodeType: "5" });
                                }else{
                                    // 其它
                                    form.setFieldsValue({ url: value });
                                }
                                selectRef.current.blur();
                            }
                        }}
                        onFocus={()=>setOpen(true)}
                        onBlur={(e:any) => {
                            setOpen(false)
                        }}
                        onSearch={handleSearch}
                        onClear={()=>{
                            form.setFieldsValue({ nodeType:"5",url: "" });
                            setOptions(newOptions)
                        }}
                    />
                </ConfigProvider>
            </Form.Item>
            <Form.Item name="nodeType" noStyle initialValue={"5"}></Form.Item>
        </>
    );
};

export async function getNavlistSecondData(param:any){
    const navlistSecondData = await getLinkList({...param}).then(res=>{
        if(res.code == 0){
            let newOptions = [];
            if(param.nodeType == "2"){
                newOptions = res.data.list.map((item:any)=>{
                    return {
                        value: JSON.stringify({
                            id:item.id,
                            pageType:item.pageType
                        }),
                        label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                            <EditorRichTextIcon className="font-18" />
                            <div>{item.name?.default}</div>
                        </Flex>
                    }
                })
            }
            if(param.nodeType == "3"){
                newOptions = res.data.list.map((item:any)=>{
                    return {
                        value: item.sortationId,
                        label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                            <EditorFeaturedProductIcon className="font-18" />
                            <div>{item.sortationName}</div>
                        </Flex>
                    }
                })
            }
            if(param.nodeType == "4"){
                newOptions = res.data.list.map((item:any)=>{
                    return {
                        value: JSON.stringify({
                            id:item.id,
                            collectionId:item.collectionId
                        }),
                        label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                            <EditorFeaturedProductIcon className="font-18" />
                            <div>{item?.title}</div>
                        </Flex>
                    }
                })
            }
            if(param.nodeType == "10"){
                newOptions = res.data.list.map((item:any)=>{
                    return {
                        value: item.id,
                        label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                            <EditorFeaturedProductIcon className="font-18" />
                            <div>{item?.name.default}</div>
                        </Flex>
                    }
                })
            }
            if(param.nodeType == "11"){
                newOptions = res.data.list.map((item:any)=>{
                    return {
                        value: item.id,
                        label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                            <EditorRichTextIcon className="font-18" />
                            <div>{item.title}</div>
                        </Flex>
                    }
                })
            }
            if(param.nodeType == "12"){
                newOptions = res.data.list.map((item:any)=>{
                    return {
                        value: JSON.stringify({
                            id:item.id,
                            pageType:item.pageType
                        }),
                        label: <Flex align="center" style={{padding:"4px 0px"}} gap={6}>
                            <EditorFeaturedProductIcon className="font-18" />
                            <div>{item.name?.default}</div>
                        </Flex>
                    }
                })
            }
            return {
                lastPage:res.data.lastPage,
                options: newOptions,
                count:res.data.total
            };
        }
    }).catch(()=>{
        return {
            lastPage:false,
            options:[],
            count:0
        };
    })
    return navlistSecondData;
}

// 获取链接对象
export function getPageLink(nodeType:string,value:string){
    console.log(value)
    switch (nodeType) {
        case "1":
            return JSON.stringify({
                id:"home"
            });
        case "0":
        case "7":
        case "8":
        case "9":
            return "";
        case "2":
        case "3":
        case "4":
        case "5":
        case "10":
        case "11":
        case "12":
        default:
            return value
    }
}