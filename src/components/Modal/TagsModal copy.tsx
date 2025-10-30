import { removeTags, selectTags, selectTagsSort } from "@/services/y2/api";
import { useToken } from "@ant-design/pro-components";
import { Dropdown, Flex, Input, MenuProps, message, Modal, Popover, Select, Space, Spin, Tag } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MyInput from "../Input/MyInput";
import DefaultButton from "../Button/DefaultButton";
import PrimaryButton from "../Button/PrimaryButton";
import MyButton from "../Button/MyButton";



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


     // 加载状态
     const [isLoading,setIsLoading] = useState(false);
    // const showTags = () => {
    //     setIsTagsOpen(true);
    // };

    

   

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
    const [tags, setTags] = useState<any[]>([]);

    // 标签数量
    // const [tagCount, setTagCount] = useState<string[]>([]);
    
    // 所有标签
    const [tagList, setTagList] = useState<string[]>([]);

    const [tagContent, setTagContent] = useState("");


    // 清理标签
    const [cleanTags, setCleanTags] = useState<string[]>([]);
    // 清理标签--所有标签
    const [cleanTagList, setCleanTagList] = useState<any[]>([]);
    // const [searchTags, setSearchTags] = useState<string[]>([]);
    // const [cleanInputText, setCleanInputText] = useState('');

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
        prop.updatetag(tags);
    };

    // 取消
    const handleCancel = () => {
        setIsTagsOpen(false);
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

    // 取消 清理
    // const handleCleanTagClose = (removedTag:any)=>{
    //     setCleanTags(cleanTags.filter(tag => tag !== removedTag));
    //     setCleanSelectedTags(cleanSelectedTags.filter((t) => t !== removedTag));
    // }

    // 重置
    // const handleReset = () => {
    //     setTags(prop.tags);
    //     setSelectedTags(tagCount.filter((v:any)=>prop.tags.includes(v)));
    //     setSearchTags(tagCount);
    // };
    
    // const handleOnTag = (e:any)=>{
    //     if(tags.includes(e.target.value)){
    //         message.error("标签已存在")
    //     }else{
    //         setTagContent("")
    //         setTags([...tags,e.target.value])
    //     }

    //     // 
    //     if(tagCount.includes(e.target.value)){
    //         setSelectedTags([...selectedTags,e.target.value])
    //     }

    // }

    // const handleTagClose = (removedTag:any)=>{
    //     setTags(tags.filter(tag => tag !== removedTag));
    //     setSelectedTags(selectedTags.filter((t) => t !== removedTag));
    // }




    


    // const handleCleanReset = () => {
    //     setCleanTags([]);
    //     setCleanSelectedTags([]);
    //     setSearchTags(tagCount);
    // };
    // 
   
    

    // 清理标签弹窗
    const openCleanShop = ()=>{
        setIsTagsOpen(false);
        setOpenCleanTags(true);
        handleCleanSearchTags("");
    }
    // 删除标签
    const handleRemoveTags = ()=>{
        // 删除标签
        const newCleanTagList = cleanTagList.filter(cTag=> !cleanTags.some((item:any)=> item.label == cTag.label ));
        setCleanTagList(newCleanTagList)
        setCleanTags([])
       
        


    }
    // 返回上一层
    const handleBackTags = ()=>{
        setOpenCleanTags(false);
        setIsTagsOpen(true);
        // 重新
        handleSearchTags("");
        setTags(prop.tags);
    }
    // 搜索标签
    const handleSearchTags = (name:string)=>{
        selectTags({
            languages_id:prop.language,
            tagName:name
        }).then(res=>{
            if(res.code == 0){
                const newTagsList = res.data.map((element:any) => {
                    return {
                        label: element.tag,
                        value: element.id,
                        checked: prop.tags.some((item:any)=>item.label == element.tag)
                    }
                });
                setTagList(newTagsList);
            }
            // setTagCount(tempList);
            // setSearchTags(tempList);
            
            // setSelectedTags(tempList.filter((v:any)=>prop.tags.includes(v)))
            // console.log(tempList.filter((v:any)=>prop.tags.includes(v)))
        }).catch((err)=>{
        })

        // let newTags:string[] = [];

        // if(res.code == 0){

        // }
        // const tagCount.forEach(res=>{
        //     if(res.includes(e.target.value)){
        //         newTags.push(res)
        //     }
        // })
        // setSearchTags(newTags);
        // setCleanInputText(e.target.value)
    }

    // 搜索标签 -- 清除
    const handleCleanSearchTags = (name:string)=>{
        selectTags({
            languages_id:prop.language,
            tagName:name
        }).then(res=>{
            if(res.code == 0){
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
        })
    }


    // useEffect(()=>{
    //     setTags(prop.tags)
    //     // // 获取标签
    //     selectTags({
    //         languages_id:prop.language,
    //         tagName:''
    //     }).then(res=>{
    //         if(res.code == 0){
    //             const newTagsList = res.data.map((element:any) => {
    //                 return {
    //                     label: element.tag,
    //                     value: element.id,
    //                     checked: prop.tags.some((item:any)=>item.label == element.tag)
    //                 }
    //             });
    //             setTagList(newTagsList);
    //         }
    //         // setTagCount(tempList);
    //         // setSearchTags(tempList);
            
    //         // setSelectedTags(tempList.filter((v:any)=>prop.tags.includes(v)))
    //         // console.log(tempList.filter((v:any)=>prop.tags.includes(v)))
    //     }).catch((err)=>{
    //     })
    // },[prop.tags])

    
    return(
            <div>
                <a onClick={()=>{
                    handleSearchTags("");
                    setTags(prop.tags);
                    setIsTagsOpen(true);
                }}>查看所有标签</a>
                <Spin spinning={isLoading}>
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
                        <Scoped>
                            <div className="column">已应用的标签（{tags.length}/250）</div>
                            <Flex gap="4px 0" wrap>
                                {tags.map((tag,index) => (
                                    <Tag
                                        color="processing"
                                        style={{color:"#000",padding:"2px 6px"}}
                                        key={index} // 使用唯一标识符作为 key
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
                            {/* onPressEnter={handleOnTag} */}
                                <MyInput placeholder="搜索标签名称或添加标签（例如：复古/夏季）" onChange={(e)=>{setTagContent(e.target.value)}} value={tagContent} />
                                <div style={{marginLeft:"20px"}}>
                                <Dropdown trigger={['click']} menu={{ items,defaultSelectedKeys: ['1'],selectable: true, }} placement="bottomRight"
                                dropdownRender={(menu) => (
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
                            <Flex gap="4px 0" wrap>
                            {tagList.map((tag:any,index) => (
                                <Tag.CheckableTag
                                    className={tag.checked?"":"color-F7F8FB"}
                                    key={index}
                                    checked={tag.checked}
                                    onChange={(checked) => handleChange(tag, checked)}
                                >
                                    {tag.label}
                                </Tag.CheckableTag>
                            ))}
                            </Flex>
                            <div style={{height:"48px"}}></div>
                        </Scoped>
                    </Modal>
                    {/* 清理所有标签 */}
                    <Modal width="620px" destroyOnClose title="清理店铺标签" centered open={openCleanTags} onOk={()=>{setOpenCleanTags(false)}} onCancel={()=>{
                        setOpenCleanTags(false);
                    }}
                        footer={()=>(
                            <Flex justify="end" gap={12}>
                                <DefaultButton onClick={handleBackTags} text="返回上一层" />
                                <MyButton danger type="primary" style={{height:"36px"}} disabled={cleanTags.length == 0} onClick={handleRemoveTags} text="删除" />
                            </Flex>
                        )}
                    >
                        <Scoped>
                            <div className="column">已选择的标签（{cleanTags.length}/100）</div>
                            <div>
                                <Flex gap="4px 0" wrap>
                                    {cleanTags.map((tag:any, index) => (
                                        <Tag
                                            color="processing"
                                            style={{color:"#000",padding:"2px 6px"}}
                                            key={index}
                                            bordered={false}
                                            closable
                                            // onClose={() => handleCleanTagClose(tag)}
                                            >
                                            {tag.label}
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
                            {/* onChange={handleSearchTags} */}
                                <MyInput placeholder="搜索标签名称" />
                                <div style={{marginLeft:"20px"}}>
                                <Dropdown trigger={['click']} menu={{ items,defaultSelectedKeys: ['1'],selectable: true, }} placement="bottomRight"
                                dropdownRender={(menu) => (
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
                            <div>
                                {cleanTagList.length === 0?<div style={{fontSize:"12px",color:"#7A8499"}}>未搜索到匹配的标签</div>:<Flex gap="4px 0" wrap>
                                    {cleanTagList.map((tag:any,index:number) => (
                                        <Tag.CheckableTag
                                            key={index}
                                            checked={tag.checked}
                                            onChange={(checked) => handleCleanChange(tag, checked)}
                                        >
                                            {tag.label}
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