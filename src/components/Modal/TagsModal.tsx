import { removeTags, selectTags } from "@/services/y2/api";
import { useToken } from "@ant-design/pro-components";
import { Dropdown, Flex, MenuProps, message, Modal, Popover, Select, Space, Spin, Tag } from "antd";
import React, { useCallback, useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MyInput from "../Input/MyInput";
import DefaultButton from "../Button/DefaultButton";
import PrimaryButton from "../Button/PrimaryButton";
import MyButton from "../Button/MyButton";
import { LoadingOutlined } from "@ant-design/icons";



export default function TagsModal(prop:any){

    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
        padding: "6px 0",
    };

    // 标签管理弹窗
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [openCleanTags, setOpenCleanTags] = useState(false);

    // 加载状态
    const [isLoading,setIsLoading] = useState(false);

    // 
    const [delLogin,setDelLogin] = useState(false);


    const [orderField,setOrderField] = useState("update_time");
    const [orderDirection,setOrderDirection] = useState("desc");

    // 应用标签
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a onClick={()=>{
                setOrderField("update_time");
                setOrderDirection("desc");
            }}>
            更新时间(从近到远)
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={()=>{
                setOrderField("use_cnt");
                setOrderDirection("desc");
            }}>
            标签引用(多到少)
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a onClick={()=>{
                setOrderField("tag");
                setOrderDirection("asc");
            }}>
             标签名称(A-Z)
            </a>
          ),
        },
    ];

    const [cleanOrderField,setCleanOrderField] = useState("update_time");
    const [cleanOrderDirection,setCleanOrderDirection] = useState("desc");
    const cleanItems: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <a onClick={()=>{
                setCleanOrderField("update_time");
                setCleanOrderDirection("desc");
            }}>
            更新时间(从近到远)
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={()=>{
                setCleanOrderField("use_cnt");
                setCleanOrderDirection("desc");
            }}>
            标签引用(多到少)
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a onClick={()=>{
                setCleanOrderField("tag");
                setCleanOrderDirection("asc");
            }}>
             标签名称(A-Z)
            </a>
          ),
        },
    ];


    // 标签 -- 应用标签
    const [tags, setTags] = useState<any[]>([]);

    // 所有标签
    const [tagList, setTagList] = useState<string[]>([]);

    // 搜索值
    const [tagContent, setTagContent] = useState("");

    const [cleanTagContent, setCleanTagContent] = useState("");

    // 清理标签
    const [cleanTags, setCleanTags] = useState<string[]>([]);
    // 清理标签--所有标签
    const [cleanTagList, setCleanTagList] = useState<any[]>([]);
    // 操作标签
    const handleChange = (tag: any, checked: boolean) => {
        // 选中标签
        if(checked){
            setTags([...tags,{
                ...tag,
                checked:checked
            }])
        }else{
            setTags(tags.filter((t) => t.label !== tag.label))
        }
        // 所有标签
        const newTagList = tagList.map((tl:any)=>{
            if(tl.label == tag.label){
                return {
                    ...tl,
                    checked:checked
                }
            }
            return tl
        })
        setTagList(newTagList)
    };

    // 保存标签
    const handleOk = () => {
        setIsTagsOpen(false);
        setOrderField("update_time");
        setOrderDirection("desc");
        setTagContent("");
        prop.updatetag(tags);
    };

    // 取消标签
    const handleTagClose = (removedTag:any)=>{
        setTags(tags.filter(tag => tag !== removedTag));
        const newTagList = tagList.map((tl:any)=>{
            if(tl.label == removedTag.label){
                return {
                    ...tl,
                    checked:false
                }
            }
            return tl
        })
        setTagList(newTagList)
    }

    // 取消标签
    const handleCleanTagClose = (removedTag:any)=>{
        setTags(tags.filter(tag => tag !== removedTag));
        const newTagList = cleanTagList.map((tl:any)=>{
            if(tl.label == removedTag.label){
                return {
                    ...tl,
                    checked:false
                }
            }
            return tl
        })
        setCleanTagList(newTagList)
    }

    // 关闭弹窗
    const handleCancel = () => {
        setIsTagsOpen(false);
        setOrderField("update_time");
        setOrderDirection("desc");
        setTagContent("");
    };

    // 操作标签 清理
    const handleCleanChange = (tag: any, checked: boolean) => {
        if(checked){
            setCleanTags([...cleanTags,{
                ...tag,
                checked:checked
            }])
        }else{
            setCleanTags(cleanTags.filter((t:any) => t.label !== tag.label))
        }
        // 所有标签
        const newTagList = cleanTagList.map((tl:any)=>{
            if(tl.label == tag.label){
                return {
                    ...tl,
                    checked:checked
                }
            }
            return tl
        })
        setCleanTagList(newTagList)
    };

    // 清理标签弹窗
    const openCleanShop = ()=>{
        setIsTagsOpen(false);
        setOpenCleanTags(true);
        setTagContent("");
        handleCleanSearchTags("",cleanOrderDirection,cleanOrderField);
    }
    // 删除标签
    const handleRemoveTags = ()=>{
        // 删除标签
        setDelLogin(true);
        removeTags({
            languages_id:prop.language,
            tag:cleanTags.map((item:any)=> item.label).join(",")
        }).then(res=>{
            if(res.code == 0){
                // 删除标签
                message.success("success");
                const newCleanTagList = cleanTagList.filter(cTag=> !cleanTags.some((item:any)=> item.label == cTag.label ));
                setCleanTagList(newCleanTagList)
                setCleanTags([])
            }else{
                message.error(res.msg);
            }
        }).finally(()=>{
            setDelLogin(false);
        })
    }
    // 返回上一层
    const handleBackTags = ()=>{
        setOpenCleanTags(false);
        setIsTagsOpen(true);
        // 重新
        handleSearchTags("",orderDirection,orderField);
        setTags(prop.tags);

        setCleanOrderField("update_time");
        setCleanOrderDirection("desc");
        setCleanTagContent("");
        setCleanTags([]);
    }
    // 搜索标签
    const handleSearchTags = (name:string,orderDirection?:string,orderField?:string)=>{
        setIsLoading(true);
        selectTags({
            languages_id:prop.language,
            tagName:name,
            order_field:orderField,
            order_direction:orderDirection,
        }).then(res=>{
            if(res.code == 0 || res.code == 201){
                const newTagsList = res.data?.map((element:any) => {
                    return {
                        label: element.tag,
                        value: element.id,
                        checked: prop.tags.some((item:any)=>item.label == element.tag)
                    }
                });
                setTagList(newTagsList);
            }
        }).catch((err)=>{
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    // 防抖搜索函数
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const debounceSearch = useMemo(() => {
        return (name: string, delay: number = 300) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            searchTimeoutRef.current = setTimeout(() => {
                handleSearchTags(name, orderDirection, orderField);
            }, delay);
        };
    }, [handleSearchTags]);


    const isInitialRender = useRef(true); // 标记是否为首次渲染
    // 当排序字段或方向变化时，重新执行搜索
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false; // 标记已完成首次渲染
            return;
        }
        debounceSearch(tagContent);
    }, [orderField, orderDirection]);

    // 搜索标签 -- 清除
    const handleCleanSearchTags = (name:string,orderDirection?:string,orderField?:string)=>{
        setIsLoading(true);
        selectTags({
            languages_id:prop.language,
            tagName:name,
            order_field:orderField,
            order_direction:orderDirection,
        }).then(res=>{
            if(res.code == 0 || res.code == 201){
                const newTagsList = res.data.map((element:any) => {
                    return {
                        label: element.tag,
                        value: element.id,
                        checked: false
                    }
                });
                setCleanTagList(newTagsList);
            }
        }).catch((err)=>{
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    // 防抖搜索函数
    const cleanSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const debounceCleanSearch = useMemo(() => {
        return (name: string, delay: number = 300) => {
            if (cleanSearchTimeoutRef.current) {
                clearTimeout(cleanSearchTimeoutRef.current);
            }
            cleanSearchTimeoutRef.current = setTimeout(() => {
                handleCleanSearchTags(name, cleanOrderDirection, cleanOrderField);
            }, delay);
        };
    }, [handleSearchTags]);

    // 当排序字段或方向变化时，重新执行搜索
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false; // 标记已完成首次渲染
            return;
        }
        debounceCleanSearch(cleanTagContent);
    }, [cleanOrderField, cleanOrderDirection]);


    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (cleanSearchTimeoutRef.current) {
                clearTimeout(cleanSearchTimeoutRef.current);
            }
        };
    }, []);
    
    return(
            <div>
                <a onClick={()=>{
                    handleSearchTags(tagContent,orderDirection,orderField);
                    setTags([...prop.tags]);
                    setIsTagsOpen(true);
                }}>查看所有标签</a>
                <Modal width="620px" title="查看所有标签" centered open={isTagsOpen}
                    onCancel={handleCancel}
                    footer={(_, { OkBtn, CancelBtn }) => (
                        <Flex justify="end">
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={handleCancel} />
                                <PrimaryButton text={"保存"} onClick={handleOk} />
                            </Flex>
                        </Flex>
                    )}
                >
                    <Spin spinning={isLoading} size="large" indicator={<LoadingOutlined spin />}>
                        <Scoped>
                            <div className="column">已应用的标签（{tags.length}/250）</div>
                            <Flex gap="4px 0" wrap>
                                {tags.map((tag,index) => (
                                    <Tag
                                        color="processing"
                                        style={{color:"#000",padding:"2px 6px"}}
                                        key={tag.label+'-'+index} // 使用唯一标识符作为 key
                                        bordered={false}
                                        closable
                                        onClose={() => handleTagClose(tag)}
                                        >
                                        {tag.label}
                                    </Tag>
                                ))}
                            </Flex>
                            <div style={{color:"#7A8499"}}>{tags.length == 0?"暂无已选标签":""}</div>
                            <div className="column2" style={{display:'flex',justifyContent:'space-between'}}>
                                <div>所有标签</div>
                                <div className="cleanShop" onClick={openCleanShop}>清理店铺标签</div>
                            </div>
                            <div className="column3">从以下列表中选择标签进行添加，最多可同时添加250个标签</div>
                            <div className="column4">
                                <MyInput placeholder="搜索标签名称或添加标签（例如：复古/夏季）" onChange={(e)=>{
                                    setTagContent(e.target.value);
                                    debounceSearch(e.target.value);
                                }} value={tagContent} />
                                <div style={{marginLeft:"20px"}}>
                                <Dropdown trigger={['click']} menu={{ items,defaultSelectedKeys: ['1'],selectable: true, }} placement="bottomRight"
                                    popupRender={(menu) => (
                                        <div style={contentStyle}>
                                            <div style={{ padding:"12px 8px 4px 8px",fontSize:"12px",color:"#7A8499" }}>选择排序方式</div>
                                            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                        </div>
                                    )}
                                >
                                    <DefaultButton text="排序" />
                                </Dropdown>
                                </div>
                            </div>
                            {tagList.length > 0 ? <Flex gap="4px 0" wrap>
                                {tagList.map((tag:any,index) => (
                                    <Tag.CheckableTag
                                        className={tag.checked?"":"color-F7F8FB"}
                                        key={tag.label+"-"+index}
                                        checked={tag.checked}
                                        onChange={(checked) => handleChange(tag, checked)}
                                    >
                                        {tag.label}
                                    </Tag.CheckableTag>
                                ))}
                            </Flex>:<div className="color-7A8499">未搜索到匹配的标签</div>}
                            <div style={{height:"48px"}}></div>
                        </Scoped>
                    </Spin>
                </Modal>
                {/* 清理所有标签 */}
                <Modal destroyOnHidden width="620px" title="清理店铺标签" centered open={openCleanTags} onOk={()=>{setOpenCleanTags(false)}} onCancel={()=>{
                    setOpenCleanTags(false);
                    setCleanOrderField("update_time");
                    setCleanOrderDirection("desc");
                    setCleanTagContent("");
                    setCleanTags([]);
                }}
                    footer={()=>(
                        <Flex justify="end" gap={12}>
                            <DefaultButton onClick={handleBackTags} text="返回上一层" />
                            <MyButton loading={delLogin} danger type="primary" style={{height:"36px"}} disabled={cleanTags.length == 0} onClick={handleRemoveTags} text="删除" />
                        </Flex>
                    )}
                >
                    <Spin spinning={isLoading} size="large" indicator={<LoadingOutlined spin />}>
                        <Scoped>
                            <div className="column">已选择的标签（{cleanTags.length}/100）</div>
                            <Flex gap="4px 0" wrap>
                                {cleanTags.map((tag:any, index) => (
                                    <Tag
                                        color="processing"
                                        style={{color:"#000",padding:"2px 6px"}}
                                        key={tag.label+"-"+index}
                                        bordered={false}
                                        closable
                                        onClose={() => handleCleanTagClose(tag)}
                                        >
                                        {tag.label}
                                    </Tag>
                                ))}
                            </Flex>
                            <div style={{color:"#7A8499"}}>{cleanTags.length == 0?"暂无已选标签":""}</div>
                            <div className="column2" style={{display:'flex',justifyContent:'space-between'}}>
                                <div>店铺全部标签</div>
                            </div>
                            <div className="column3">你可以删除不常用标签，届时相关商品将自动剔除该标签（单次操作只能删除最多100个标签）</div>
                            <div className="column4">
                                <MyInput placeholder="搜索标签名称" onChange={(e)=>{
                                    setCleanTagContent(e.target.value);
                                    debounceCleanSearch(e.target.value);
                                }} value={cleanTagContent}  />
                                <div style={{marginLeft:"20px"}} >
                                <Dropdown trigger={['click']} menu={{ items:cleanItems,defaultSelectedKeys: ['1'],selectable: true, }} placement="bottomRight"
                                popupRender={(menu) => (
                                    <div style={contentStyle}>
                                        <div style={{ padding:"16px 8px 6px 8px",fontSize:"12px",color:"#7A8499" }}>选择排序方式</div>
                                        {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                    </div>
                                )}
                                >
                                    <DefaultButton text="排序" />
                                </Dropdown>
                                </div>
                            </div>
                            {cleanTagList.length === 0?<div style={{fontSize:"12px",color:"#7A8499"}}>未搜索到匹配的标签</div>:<Flex gap="4px 0" wrap>
                                {cleanTagList.map((tag:any,index:number) => (
                                    <Tag.CheckableTag
                                        key={tag.label+"-"+index}
                                        checked={tag.checked}
                                        onChange={(checked) => handleCleanChange(tag, checked)}
                                    >
                                        {tag.label}
                                    </Tag.CheckableTag>
                                ))}
                            </Flex> }
                            <div style={{height:"48px"}}></div>
                        </Scoped>
                    </Spin>
                </Modal>
            </div>
    )
}

const Scoped = styled.div`
    .column{
        margin-bottom: 20px;
    }
    .column2{
        margin-top: 20px;
        .cleanShop{
            color: #356DFF;
            cursor: pointer;
        }
    }
    .column3{
        font-size: 12px;
        color: #7A8499;
        margin-bottom: 12px;
    }
    .column4{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

`