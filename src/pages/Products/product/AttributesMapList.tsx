import {addProductOptionValues, addStyleName, getProductOptionSelect, getProductStyleList, getProductStyleValueList } from "@/services/y2/api";
import product, { attributeType } from "@/store/product/product";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { App, Card, Checkbox, Button, AutoComplete, Input, Tag, Select, Modal, Tooltip, SelectProps, AutoCompleteProps, Flex } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AttributesModal from "./AttributesModal";
import MySelect from "@/components/Select/MySelect";
import DefaultButton from "@/components/Button/DefaultButton";
import MyButton from "@/components/Button/MyButton";

/**
 * 将原始属性数组转换为 { label, value, options, optionValue }
 * 其中 optionValue 取自 option_values_name
 * options 从外部接口异步获取（示例使用 Promise）
 */
/**
 * 将原始属性数组按 option_id 分组，并异步补充外部 options
 * @param {Array} attributes - 原始一维数组（包含 option_id, option_name, option_values_name）
 * @param {Function} fetchOptions - 外部接口函数，接收 option_id，返回 Promise<Array> 该属性的所有可选值
 * @returns {Promise<Array>} 转换后的数组，每个元素为 { label, value, options, optionValue }
 */
async function transformAttributes(attributes:attributeType[], fetchOptions:any) {
  const groupMap = new Map(); // key: option_id, value: { label, optionValueSet: Set }

  // 1. 按 option_id 分组，收集原始 option_values_name（去重）
  for (const item of attributes) {
    const optId = item.option_id;
    const label = item.option_name;
    const optVal = item.option_values_id;
    if (!groupMap.has(optId)) {
      groupMap.set(optId, { label, optionValueSet: new Set() });
    }
    groupMap.get(optId).optionValueSet.add(optVal);
  }

  // 2. 并行请求每个属性对应的外部 options
  const result = [];
  for (const [optId, { label, optionValueSet }] of groupMap.entries()) {
    const options = await fetchOptions(optId);   // 从外部接口获取完整选项列表
    const optionValue = Array.from(optionValueSet); // 原始数据中的选项值数组
    result.push({
      label,
      value: optId,
      options,
      optionValue
    });
  }
  return result;
}

/**
 * 判断数组中所有值是否都在指定列表的 option_values_id 中
 * @param {Array} idsToCheck - 需要检查的ID数组，例如 ['1365783864972', '1366725612651', '123']
 * @param {Array} dataList - 对象列表，每个对象需包含 option_values_id 属性
 * @returns {boolean} - 只有全部存在时返回 true，否则 false
 */
function areAllIdsPresent(idsToCheck:string[], dataList:any[]) {
  // 提取所有 option_values_id 并存入 Set（提高查找效率）
  const existingIds = new Set(dataList.map(item => item.option_values_id));
  // 检查每个待查 ID 是否都在 Set 中
  return idsToCheck.every(id => existingIds.has(id));
}

// 添加款式选项
function addOptionValue(id:string,language:string,optionId:string,optionValuesName:string){
    return 
}

function AttributesMapList(props:any) {
    
    const { message,modal } = App.useApp();

    // 属性选项
    const [optionList,setOptionList] = useState<AutoCompleteProps['options']>([
        {
            value: "1",
            label: "Color",
        },
        {
            value: "2",
            label: "Size",
        },
        {
            value: "3",
            label: "Material",
        },
        {
            value: "4",
            label: "Style",
        }
    ])
    // 属性集合
    const [attributesMap, setAttributesMap] = useState<any[]>([]);
    // 原始数据
    const [info,setInfo] = useState<any>([]);

    const [tags, setTags] = useState<any[][]>([]); // 用于存储每个规格组的标签

    const [values, setValues] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // 确认关联变体
    const showVariantConfirm = () => {
        confirm({
        title: '确认展开多款式?',
        icon: <ExclamationCircleFilled />,
        centered:true,
        content: '展开多款式后，操作属性，关联SKU也将同步操作，这可能对款式列表关联的数据造成影响',
        onOk() {
            props.setOnVariant(true)
        },
        onCancel() {
            props.setOnVariant(false)
        },
        });
    };
  
    // 表格数据
    const [tagData,setTagData] = useState<any>([]);
    // 表格行
    const [flag,setFlag] = useState<number>();
    const [attributesModal, setAttributesModal] = useState(false);

    // 自定义标签
    const tagRender = (props:any,index:any,spec:any) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
        };
        return (
        <Tag
            color="#DCEDFF"
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClick={()=>{
            setAttributesModal(true)
            setTagData(info[index])
            setFlag(index)
            }}
            onClose={onClose}
            style={{color:"#000",padding: '3px 10px'}}
        >
            <span style={{cursor:"pointer",fontSize:"14px"}}>{label}</span>
        </Tag>
        );
    };
    // 修改
    const editTagData = (data:any,i:number)=>{
        let newSpecifications = [...specifications]
        data.forEach((selectData:any)=>{
        newSpecifications[i].optionValueList.forEach(countData => {
            if(selectData.option_values_id == countData.option_values_id){
            // 更新
            countData.option_values_name = selectData.option_values_name
            // if(selectData.option_values_name !== countData.option_values_name){
            //   console.log(countData.option_values_name)
            //   console.log(selectData.option_values_name)
            //   addProductOptionValues(selectData.option_values_id,product.language,selectData.option_id,selectData.option_values_name).then(res=>{
            //     if(res.code==0){
            //       countData.option_values_name = selectData.option_values_name
            //       setSpecifications(newSpecifications)
            //       // console.log(newSpecifications[i].optionValueList)
            //       // 数据
            //       // message.success('产品款式值更新成功');
            //     }else{
            //       message.error('产品款式值更新失败----');
            //     }
            //   })
            // }
            }
        });
        })
        // console.log(newSpecifications)
        setSpecifications(newSpecifications)
        let newInfo:any = [...info]
        newInfo[i] = data
        setInfo(newInfo)
        product.setAttributes(newInfo.flat())
        props.onVariant && props.setStyle(newInfo)
    }

    // 修改属性
    const setAttributes = (key:any,value:any)=>{
        (attributesMap.map(item=>item.value == key?{
            ...item,
            optionValue:[],
            value:value
        }:item))
    }

    // 获取所有款式的选项
    const fetchOptions = (optionId: string) => {
        return getProductStyleValueList(optionId,product.productInfo.languages_id).then(res=>{
        return res?.data || []
        })
    }
    // 收集所有输入值后调用父组件提供的回调函数
    useEffect(() => {
        const fetchData = async () => {
            const attributesMap = await transformAttributes(product.attributes,fetchOptions);
            console.log(attributesMap)
            setAttributesMap(attributesMap)
        }
        fetchData();
    }, []);
    // 获取所有属性
    useEffect(()=>{
        getProductOptionSelect(product.productInfo.languages_id).then(res=>{
            res?.data && setOptionList(res.data)
        })
    },[])


    useEffect(()=>{
        console.log(attributesMap)
    },[attributesMap])
 
  // 添加 useRef 来保存输入框的引用
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  inputRefs.current = Array(values.length).fill(null);
  // 处理标签选择或输入变化 -- 新增 -- 减
  async function handleTagChange(value: any,option:any,index:number) {
    // 增
    if((tags[index].length??=0)<value.length){
      if(specifications[index].optionId == undefined || specifications[index].optionId == "") return message.error("请先输入属性")
      let newOption;
      option[option.length-1].value == undefined?newOption= specifications[index].optionValueList.filter(item=>item.option_values_name == value[value.length-1]):newOption=specifications[index].optionValueList.filter(item=>item.option_values_id == value[value.length-1])
      let newTags = [...tags]; 
      // 存在---
      try{
        if(newOption.length>0){
          // 输入
          let valueId:string;
          for(let item in specifications[index].optionValueList){
            if(specifications[index].optionValueList[item].option_values_name == value[value.length-1]){
              valueId = specifications[index].optionValueList[item].option_values_id
              break;
            }
          }
          if(tags[index].some(item=> item == valueId)){
            message.error("请勿重复输入")
            return
          }
          newTags[index] = [...newTags[index],newOption[0].option_values_id]
          setTags(newTags)
          info[index].push({
            option_name:specifications[index].attributes,
            option_values_name:option[option.length-1].label,
            option_values_id:newOption[0].option_values_id,
            option_id:specifications[index].optionId
          })
          product.setAttributes(info.flat())
          props.onVariant && props.setStyle([...info])
          // 
        }else{
          // 创建---
          addProductOptionValues("",product.productInfo.languages_id,specifications[index].optionId,value[value.length-1]).then(res=>{
            // console.log(res)
            if(res.code == 0){
              newTags[index] = [...newTags[index],res.id]
              let newSpecifications = [...specifications]
              newSpecifications[index].optionValueList.push({
                option_values_id:res.id,
                option_values_name:value[value.length-1]
              })
              setSpecifications(newSpecifications)
              setTags(newTags)
              // console.log(option)
              // console.log(option[option.length-1].label)
              info[index].push({
                option_name:specifications[index].attributes,
                option_values_name:value[value.length-1],
                option_values_id:res.id,
                option_id:specifications[index].optionId
              })
              product.setAttributes(info.flat())
              props.onVariant && props.setStyle([...info])
            }else{
              message.error("添加失败")
            }
          })
        }
      }catch(e){
        console.log(e)
      }
      // 
    }else{
      // 减
      let newTags = [...tags];
      let optionValueId = tags[index].filter(element => !value.includes(element))
      // console.log(optionValueId[0])
      let newInfo = [...info]
      newInfo[index] = info[index].filter(element => {
        if(element.option_values_id === optionValueId[0]){
          console.log(element.id)
          if((element.id??="")!==""){
            product.tempAttributes.push({...element,status:"9"})
          }
          return false
        }
        return true
      })
      product.setAttributes(newInfo.flat())
      newTags[index] = value
      setTags(newTags)
      setInfo(newInfo)
      props.onVariant && props.setStyle([...newInfo])
    }
    
  }

    // 删除整个规格组
    function handleRemove(attributes:any) {
        setAttributesMap(attributesMap.filter((item:any)=>item.value != attributes.value))
    }
    // 添加新的规格组
    function handleAdd(){
        setAttributesMap([
            ...attributesMap,
            {
                label:"",
                value:"",
                options:[],
                optionValue:[]
            }
        ])
    }
    // 检查是否有相同的属性
    function hasSameAttributes(arr) {
        console.log("arr",arr)
        const seenAttributes = new Set();
        for (const item of arr) {
        if (seenAttributes.has(item.attributes)) {
            return true; // 找到了相同的 attributes
        }
        seenAttributes.add(item.attributes);
        }
        return false; // 没有找到相同的 attributes
    }

  return (
    <Scoped>
      <Card title="多款式" extra={<div onClick={()=>{
        !props.onVariant?showVariantConfirm():props.setOnVariant(!props.onVariant)
      }} style={{textAlign:"right",cursor:"pointer"}}>此商品有多个款式
        <Checkbox style={{marginLeft:"10px"}} checked={props.onVariant}>
        </Checkbox>
      </div>}>
        {(
            <>
            {attributesMap.map((attributes, index) => {
                return (
                    <Flex key={index} align="center" gap={12} style={{marginBottom:"20px"}}>
                        <AttributesModal optionsList={optionList} setOptionList={setOptionList} attributes={attributes} attributesMap={attributesMap} setAttributesMap={setAttributesMap} />
                        <MySelect 
                            mode="tags"
                            style={{height:"42px",flex:"1"}} 
                            options={attributes.options.map((item:any)=>{
                                return {
                                    label:item.option_values_name,
                                    value:item.option_values_id
                                }
                            })}
                            value={attributes.optionValue}
                            onChange={async (value:any)=>{
                                if(value.length == 0){
                                    return
                                }
                                // 如果在 attributes.options 中存在 value 对应的 option_values_id 则更新 optionValue
                                if(areAllIdsPresent(value,attributes.options)){
                                    const newAttributesMap = [...attributesMap.map((item:any)=>{
                                        if(item.value === attributes.value){
                                            return {...item,optionValue:value}
                                        }
                                        return item
                                    })]
                                    setAttributesMap(newAttributesMap)
                                }else{
                                    // 创建 新的 option_values_id 并更新 attributes.options
                                    const newTag = value.filter((v:string) => !attributes.optionValue.includes(v));
                                    const res = await addProductOptionValues("",product.productInfo.id,product.productInfo.languages_id,newTag[0])
                                    // 更新成功后，刷新 attributesMap
                                    if(res?.code == 0 && res?.id){
                                        const newAttributesMap = [...attributesMap.map((item:any)=>{
                                            if(item.value === attributes.value){
                                                return {
                                                    ...item,
                                                    options:[
                                                        ...item.options,
                                                        {
                                                            option_values_id:res?.id.toString(),
                                                            option_values_name:newTag[0]
                                                        }
                                                    ],                                    
                                                    optionValue:value.map((v:string)=>v == newTag[0]?res?.id.toString():v)
                                                }
                                            }
                                            return item
                                        })]
                                        setAttributesMap(newAttributesMap)
                                    }
                                }
                            }}
                        />
                        {/* 添加图标 */}
                        <span className="edit-icon btn-icon__1h8Qx edit__3TiEz" style={{cursor: "pointer"}} onClick={()=>{
                            setAttributesModal(true)
                            setTagData(info[index])
                            setFlag(index)
                        }}>
                            <Tooltip title="编辑">
                            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconEdit" font-size="20">
                                <path d="M13.551 2.47a.75.75 0 0 0-1.06 0l-9.9 9.9a.75.75 0 0 0-.22.53v4.242c0 .414.336.75.75.75h4.243a.75.75 0 0 0 .53-.22l9.9-9.899a.75.75 0 0 0 0-1.06L13.551 2.47Zm-9.68 10.74 9.15-9.15 3.182 3.183-9.15 9.15H3.873V13.21Zm13.807 4.682a.1.1 0 0 0 .1-.1v-1.3a.1.1 0 0 0-.1-.1h-6.8a.1.1 0 0 0-.1.1v1.3a.1.1 0 0 0 .1.1h6.8Z" fill="#474F5E"></path>
                            </svg>
                            </Tooltip>
                        </span>
                        <span className="delete-icon btn-icon__1h8Qx delete__3TiEz" style={{cursor: "pointer"}} onClick={() => handleRemove(attributes)}>
                            <Tooltip title="删除">
                            <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconDelete" font-size="20">
                                <path d="M18 4.25h-4.325a3.751 3.751 0 0 0-7.35 0H2v1.5h1.305l.947 12.308A.75.75 0 0 0 5 18.75h10a.75.75 0 0 0 .748-.692l.947-12.308H18v-1.5Zm-2.81 1.5-.884 11.5H5.694L4.81 5.75h10.38Zm-5.19-3c.98 0 1.813.626 2.122 1.5H7.878A2.25 2.25 0 0 1 10 2.75Z" fill="#F86140"></path>
                            </svg>
                            </Tooltip>
                        </span>
                    </Flex>
                );
            })}
            {attributesMap.length < 5 && ( // 限制最多添加四个规格组
                <span style={{marginRight: "20px"}}>
                    <MyButton
                        className="add-specification-button"
                        onClick={handleAdd} text={<><PlusOutlined />添加商品规格</>}                    >
                    </MyButton>
                </span>
            )}
            </>
        )}
      </Card>
    </Scoped>
  );
}


export default observer(AttributesMapList);

// 定义样式
const Scoped = styled.div`
  .ant-select-selection-search-input{
    height: 100%;
  }
`