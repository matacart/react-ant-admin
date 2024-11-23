import { removeTags, selectTags, selectTagsSort } from "@/services/y2/api";
import { useToken } from "@ant-design/pro-components";
import { AutoComplete, AutoCompleteProps, Button, Divider, Dropdown, Flex, Input, MenuProps, message, Modal, Popover, Select, Space, Spin, Tag } from "antd";
import { includes } from "lodash";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";



export default function TagsModal(prop:any){



    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        boxShadow: 'none',
    };

    // 标签管理弹窗
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [openCleanTags, setOpenCleanTags] = useState(false);
    const showTags = () => {
        setIsTagsOpen(true);
    };

    // 状态更新
    const handleOk = () => {
        // 清空tags
        // setTags([]);
        setIsTagsOpen(false);
        prop.updatetag(tags);
    };

    const handleCancel = () => {
        setIsTagsOpen(false);
        handleReset();
    };

    // 加载状态
    const [isLoading,setIsLoading] = useState(false);

    // 应用标签
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <div onClick={()=>{
                setIsLoading(true)
                selectTagsSort(prop.language,"update_time","desc").then(res=>{
                    console.log(res);
                    if(res.code == 0){
                        let temp = Array.from(res.data,(item:any)=>{
                            return item.tag
                        })
                        setTagList(temp)
                        setSearchTags(temp.filter((v:any)=>searchTags.includes(v)))
                    }
                })
                setIsLoading(false)
            }}>
            更新时间(从近到远)
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={()=>{
                selectTagsSort(prop.language,"use_cnt","desc").then(res=>{
                    console.log(res);
                    if(res.code == 0){
                        let temp = Array.from(res.data,(item:any)=>{
                            return item.tag
                        })
                        setTagList(temp)
                        setSearchTags(temp.filter((v:any)=>searchTags.includes(v)))
                    }
                })
            }}>
            标签引用(多到少)
            </div>
          ),
        },
        {
          key: '3',
          label: (
            <div onClick={()=>{
                selectTagsSort(prop.language,"tag","asc").then(res=>{
                    console.log(res);
                    if(res.code == 0){
                        let temp = Array.from(res.data,(item:any)=>{
                            return item.tag
                        })
                        setTagList(temp)
                        setSearchTags(temp.filter((v:any)=>searchTags.includes(v)))
                    }
                })
            }}>
             标签名称(A-Z)
            </div>
          ),
        },
    ];

    // 标签 -- 应用标签
    const [tags, setTags] = useState<string[]>([]);
    // 所有标签
    const [tagCount, setTagCount] = useState<string[]>([]);
    const [tagList, setTagList] = useState<string[]>([]);

    const [tagContent, setTagContent] = useState("");
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    // 操作标签
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
        // console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
        if(checked){
            setTags([...tags,tag])
        }else{
            setTags(tags.filter((t)=>t!==tag))
        }
    };

    // 重置
    const handleReset = () => {
        setTags(prop.tags);
        setSelectedTags(tagCount.filter((v:any)=>prop.tags.includes(v)));
        setSearchTags(tagCount);
    };
    
    const handleOnTag = (e:any)=>{
        if(tags.includes(e.target.value)){
            message.error("标签已存在")
        }else{
            setTagContent("")
            setTags([...tags,e.target.value])
        }

        // 
        if(tagCount.includes(e.target.value)){
            setSelectedTags([...selectedTags,e.target.value])
        }

    }
    const handleTagClose = (removedTag:any)=>{
        setTags(tags.filter(tag => tag !== removedTag));

        console.log(tags)
        console.log(removedTag)
        setSelectedTags(selectedTags.filter((t) => t !== removedTag));
    }




    // 清理标签
    const [cleanTags, setCleanTags] = useState<string[]>([]);
    const [cleanSelectedTags, setCleanSelectedTags] = React.useState<string[]>([]);
    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [cleanInputText, setCleanInputText] = useState('');


    const handleCleanReset = () => {
        setCleanTags([]);
        setCleanSelectedTags([]);
        setSearchTags(tagCount);
    };
    // 
    const handleCleanChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
        ? [...cleanSelectedTags, tag]
        : cleanSelectedTags.filter((t) => t !== tag);
        setCleanSelectedTags(nextSelectedTags);
        if(checked){
            setCleanTags([...cleanTags,tag])
        }else{
            setCleanTags(cleanTags.filter((t)=>t!==tag))
        }
    };
    const handleCleanTagClose = (removedTag:any)=>{
        setCleanTags(cleanTags.filter(tag => tag !== removedTag));
        setCleanSelectedTags(cleanSelectedTags.filter((t) => t !== removedTag));
    }


    const openCleanShop = ()=>{
        setIsTagsOpen(false);
        setOpenCleanTags(true);
        handleReset();
    }
    // 二层
    const handleRemoveTags = ()=>{
        setOpenCleanTags(false);
        handleCleanReset();
        // 删除标签
        cleanTags.forEach((tag)=>{
            removeTags(prop.language,tag)
        })
        prop.updatetag(tags);
        //
    }
    // 返回上一层
    const handleBackTags = ()=>{
        setOpenCleanTags(false);
        setIsTagsOpen(true);
        handleCleanReset();
    }
    // 搜索标签
    const handleSearchTags = (e:any)=>{
        let newTags:string[] = [];
        tagCount.forEach(res=>{
            if(res.includes(e.target.value)){
                newTags.push(res)
            }
        })
        setSearchTags(newTags);
        setCleanInputText(e.target.value)
    }

    

    useEffect(()=>{
        setTags(prop.tags)
        // 获取标签
        selectTags(prop.language).then(res=>{
            let tempList:any = [];
            // console.log(res)
            if(res.code == 0){
                res.data.forEach((element:any) => {
                    tempList.push(element.tag)
                });
            }
            setTagCount(tempList);
            setSearchTags(tempList);
            setTagList(tempList);
            setSelectedTags(tempList.filter((v:any)=>prop.tags.includes(v)))
        })
    },[prop.tags])
    return(
            <div>
                <a onClick={()=>{
                    setIsTagsOpen(true);
                }}>查看所有标签</a>
                <Spin spinning={isLoading}>
                    <Modal width="620px" destroyOnClose title="查看所有标签" centered open={isTagsOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Scoped>
                            <div className="column">已应用的标签（{tags.length}/250）</div>
                            <div>
                                <Flex gap="4px 0" wrap>
                                    {tags.map((tag) => (
                                        <Tag
                                            color="processing"
                                            style={{color:"#000",padding:"2px 6px"}}
                                            key={tag} // 使用唯一标识符作为 key
                                            bordered={false}
                                            closable
                                            onClose={() => handleTagClose(tag)}
                                            >
                                            {tag}
                                        </Tag>
                                    ))}
                                </Flex>
                            </div>
                            <div style={{color:"#7A8499"}}>{tags.length == 0?"暂无已选标签":""}</div>
                            <div className="column2" style={{display:'flex',justifyContent:'space-between'}}>
                                <div>所有标签</div>
                                <div className="cleanShop" onClick={openCleanShop}>清理店铺标签</div>
                            </div>
                            <div className="column3">从以下列表中选择标签进行添加，最多可同时添加250个标签</div>
                            <div className="column4">
                                <Input placeholder="搜索标签名称或添加标签（例如：复古/夏季）" onChange={(e)=>{setTagContent(e.target.value)}} value={tagContent} onPressEnter={handleOnTag} />
                                <div style={{marginLeft:"20px"}}>
                                <Dropdown trigger={['click']} menu={{ items,defaultSelectedKeys: ['1'],selectable: true, }} placement="bottomRight"
                                dropdownRender={(menu) => (
                                    <div style={contentStyle}>
                                        <div style={{ padding:"16px 8px 6px 8px",fontSize:"12px",color:"#7A8499" }}>选择排序方式</div>
                                        {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                    </div>
                                )}
                                >
                                    <Button>排序</Button>
                                </Dropdown>
                                </div>
                            </div>
                            <div>
                                <Flex gap="4px 0" wrap>
                                {tagList.map<React.ReactNode>((tag) => (
                                    <Tag.CheckableTag
                                    key={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={(checked) => handleChange(tag, checked)}
                                    >
                                    {tag}
                                    </Tag.CheckableTag>
                                ))}
                                </Flex>
                            </div>
                            <div style={{height:"48px"}}></div>
                        </Scoped>
                    </Modal>
                    {/* 清理所有标签 */}
                    <Modal width="620px" destroyOnClose title="清理店铺标签" centered open={openCleanTags} onOk={()=>{setOpenCleanTags(false)}} onCancel={()=>{
                        setOpenCleanTags(false);
                        handleCleanReset();
                    }}
                        footer={()=>(
                            <>
                                <Button onClick={handleBackTags}>返回上一层</Button>
                                <Button danger type="primary" disabled={cleanTags.length == 0} onClick={handleRemoveTags}>删除</Button>
                            </>
                        )}
                    >
                        <Scoped>
                            <div className="column">已选择的标签（{cleanTags.length}/100）</div>
                            <div>
                                <Flex gap="4px 0" wrap>
                                    {cleanTags.map((tag, index) => (
                                        <Tag
                                            color="processing"
                                            style={{color:"#000",padding:"2px 6px"}}
                                            key={tag}
                                            bordered={false}
                                            closable
                                            onClose={() => handleCleanTagClose(tag)}
                                            >
                                            {tag}
                                        </Tag>
                                    ))}
                                </Flex>
                            </div>
                            <div style={{color:"#7A8499"}}>{cleanTags.length == 0?"暂无已选标签":""}</div>
                            <div className="column2" style={{display:'flex',justifyContent:'space-between'}}>
                                <div>店铺全部标签</div>
                            </div>
                            <div className="column3">你可以删除不常用标签，届时相关商品将自动剔除该标签（单次操作只能删除最多100个标签）</div>
                            <div className="column4">
                                <Input placeholder="搜索标签名称" onChange={handleSearchTags} />
                                <div style={{marginLeft:"20px"}}>
                                <Dropdown trigger={['click']} menu={{ items,defaultSelectedKeys: ['1'],selectable: true, }} placement="bottomRight"
                                dropdownRender={(menu) => (
                                    <div style={contentStyle}>
                                        <div style={{ padding:"16px 8px 6px 8px",fontSize:"12px",color:"#7A8499" }}>选择排序方式</div>
                                        {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                                    </div>
                                )}
                                >
                                    <Button>排序</Button>
                                </Dropdown>
                                </div>
                            </div>
                            <div>
                                {searchTags.length === 0?<div style={{fontSize:"12px",color:"#7A8499"}}>未搜索到匹配的标签</div>:<Flex gap="4px 0" wrap>
                                    {searchTags.map<React.ReactNode>((tag) => (
                                        <Tag.CheckableTag
                                            key={tag}
                                            checked={cleanSelectedTags.includes(tag)}
                                            onChange={(checked) => handleCleanChange(tag, checked)}
                                            >
                                        {tag}
                                        </Tag.CheckableTag>
                                    ))}
                                </Flex> }
                            </div>
                            <div style={{height:"48px"}}></div>
                        </Scoped>
                    </Modal>
                </Spin>
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