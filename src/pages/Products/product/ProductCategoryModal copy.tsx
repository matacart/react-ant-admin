import { getCategorySelect } from "@/services/y2/api";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, MenuProps, Modal, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import "./index.scss"
import { set } from "lodash";



export default function ProductCategoryModal(prop:any) {

    // 标签管理弹窗
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    // 所有标签
    const [tagCount, setTagCount] = useState<string[]>([]);
    // 清理标签
    const [tags, setTags] = useState<any[]>([]);

    const [selectedTags, setSelectedTags] = React.useState<any[]>([]);
    const [searchTags, setSearchTags] = useState<any[]>([]);
    const [cleanInputText, setCleanInputText] = useState('');

    const [treeData,setTreeData] = useState<any[]>([]);



    const handleTagClose = (removedTag:any)=>{
        setTags(tags.filter(tag => tag.id !== removedTag.id));
        setSelectedTags(selectedTags.filter((t) => t.id !== removedTag.id));
    }
    // 
    const handleChange = (tag: any, checked: boolean) => {
        console.log(tag)
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t.id !== tag.id);
        console.log(nextSelectedTags)
        setSelectedTags(nextSelectedTags);
        if(checked){
            setTags([...tags,tag])
        }else{
            setTags(tags.filter((t)=>t.id!==tag.id))
        }
    };

    // 搜索标签
    const handleSearchTags = (e:any)=>{
        console.log(e.target.value);
        let newTags:string[] = [];
        tagCount.forEach(res=>{
            if(res.includes(e.target.value)){
                newTags.push(res)
            }
        })
        setSearchTags(newTags);
        setCleanInputText(e.target.value)
    }
    // 
    const handleTagReset = () => {
        setTags(prop.tags);
        setSelectedTags(prop.tags);
        setSearchTags(tagCount);
    };

    // 状态更新
    const handleOk = () => {
        // 清空tags
        // setTags([]);
        setIsCategoryOpen(false);
        prop.upDateCategoryTags(tags);
    };

    const [value, setValue] = useState<string[]>();

    const onChange = (newValue: any,newLaber:any) => {
        setTags(Array.from(newLaber,(e,index)=>{
            return { name:e,id:newValue[index] }
        }))
        setValue(newValue);
        // newStore.setEditStatus(true)
    };

    // 
    useEffect(()=>{
        setTags(prop.tags)
        // getCategorySelect().then(res=>{
        //     // let tempList:any = [];
        //     // if(res.code == 0){
        //     //     res.data.forEach((element:any) => {
        //     //         tempList.push({
        //     //             id:element.id,
        //     //             name:element.category_name
        //     //         })
        //     //     });
        //     // }
        //     // setSearchTags(tempList);
        //     // setTagCount(tempList);
        //     // // 修改
        //     // setSelectedTags(prop.tags)
        //     setTreeData(buildTree(res.data))
        // })
        setValue(Array.from(prop.tags,(res:any)=>{
            return res.id
        }))
    },[prop.tags])
    return(
        <>  
            <a onClick={()=>{setIsCategoryOpen(true)}}>选择</a>
            {/* 清理所有标签 */}
            <Modal width="620px" destroyOnClose title="选择商品分类" centered open={isCategoryOpen} onOk={handleOk} okText="更新" onCancel={()=>{
                setIsCategoryOpen(false);
                handleTagReset();
            }}
            >
                <Scoped>
                    <div className="column">已应用的分类</div>
                    <div>
                        <Flex gap="4px 0" wrap>
                            {tags.map((tag) => (
                                <Tag
                                    color="processing"
                                    style={{color:"#000",padding:"2px 6px"}}
                                    key={tag.id}
                                    bordered={false}
                                    closable
                                    onClose={() => handleTagClose(tag)}
                                    >
                                    {tag.name}
                                </Tag>
                            ))}
                        </Flex>
                    </div>
                    <div style={{color:"#7A8499"}}>{tags.length == 0?"暂无已选分类":""}</div>
                    <div className="column2" style={{display:'flex',justifyContent:'space-between'}}>
                        <div>所有分类</div>
                    </div>
                    <div className="column3">选择商品所属分类。智能分类将按规则自动匹配，无法手动选择</div>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={value}
                        placeholder="选择分类"
                        dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
                        listHeight={200}
                        allowClear
                        multiple
                        onChange={onChange}
                        treeData={treeData}
                    />
                </Scoped>
            </Modal>
        </>
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