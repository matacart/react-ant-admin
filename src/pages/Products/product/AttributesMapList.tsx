import {addProductOptionValues, getOptionType, getProductOptionSelect, getProductStyleList, getProductStyleValueList } from "@/services/y2/api";
import product, { attributeType } from "@/store/product/product";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { App, Card, Checkbox, Tooltip, AutoCompleteProps, Flex } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AttributesModal from "./AttributesModal";
import MySelect from "@/components/Select/MySelect";
import MyButton from "@/components/Button/MyButton";
import AttributesTagModal from "./AttributesTagModal";
import { toJS } from "mobx";
import { DeleteIcon } from "@/components/Icons/Icons";

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

    // 3. 过滤出原始数据中存在的选项用于补充
    const newOptions = options.map((option:any) => {
      const newAttributes = product.attributes.find((item:any) => item.option_values_id == option.option_values_id)
      if(newAttributes){
        // 将属性状态设置为9
        product.setAttributes(product.attributes.map((item:any) => item.option_values_id == option.option_values_id ? {...item,status:"9"} : item))
        return toJS(newAttributes)
      }
      return option
    })

    const optionValue = Array.from(optionValueSet); // 原始数据中的选项值数组
    result.push({
      label,
      value: optId,
      options:newOptions,
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

function AttributesMapList() {
    
    const { message, modal } = App.useApp();

    // 属性类型
    const [attributesOptionType,setAttributesOptionType] = useState([]);

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

    const [values, setValues] = useState<string[]>([]);

    // 关联变体
    const relevanceVariant = () => {
      if(product.productInfo.has_variant == "1"){
        product.setProductInfo({
          ...product.productInfo,
          has_variant:"0"
        })
        return;
      }
      const myModal = modal.confirm({
          title: '确认展开多款式?',
          icon: <ExclamationCircleFilled />,
          centered:true,
          content: '展开多款式后，操作属性，关联SKU也将同步操作，这可能对款式列表关联的数据造成影响',
          onOk() {
            product.setProductInfo({
              ...product.productInfo,
              has_variant:"1"
            })
            myModal.destroy();
          },
          onCancel() {
            myModal.destroy();
          },
      });
    };
  
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
            setAttributesMap(attributesMap);
            product.setAttributesMap(attributesMap);
        }
        fetchData();
    }, []);
    // 获取所有属性
    useEffect(()=>{
      getProductOptionSelect(product.productInfo.languages_id).then(res=>{
          res?.data && setOptionList(res.data)
      })
      getOptionType().then(res=>{
        setAttributesOptionType(res.data.map((item:any)=>({
            label:item.product_option_type_name,
            value:item.product_option_type_id
        })))
      })
    },[])

    const firstRef = useRef(true);
    useEffect(()=>{
      if(firstRef.current){
        firstRef.current = false
        return;
      }
      // 提交时 有则替换修改 无则将状态改为9
      product.setAttributesMap([...attributesMap])
    },[attributesMap])

    // 添加 useRef 来保存输入框的引用
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    inputRefs.current = Array(values.length).fill(null);
    // 删除整个规格组
    function handleRemove(attributes:any) {
      setAttributesMap(attributesMap.filter((item:any)=>item.value != attributes.value))
    }
    // 添加新的规格组
    function handleAdd(){
      if(attributesMap.some(item=>item.value == "")){
        message.error("请勿添加多个无效款式")
        return;
      }
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

  return (
    <Scoped>
      <Card title="多款式" extra={<div onClick={relevanceVariant} style={{textAlign:"right",cursor:"pointer"}}>此商品有多个款式
        <Checkbox style={{marginLeft:"10px"}} checked={product.productInfo.has_variant == "1"}>
        </Checkbox>
      </div>}>
        {(
            <>
            {attributesMap.map((attributes, index) => {
                return (
                    <Flex key={index} align="center" gap={12} style={{marginBottom:"20px"}}>
                        <AttributesModal optionsList={optionList} attributesOptionType={attributesOptionType} setOptionList={setOptionList} attributes={attributes} attributesMap={attributesMap} setAttributesMap={setAttributesMap} />
                        <MySelect 
                            mode="tags"
                            style={{height:"42px",flex:"1"}} 
                            classNames={{
                              root: 'my-select'
                            }}
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
                                // 在删除时要把对应的options重置
                                let newOptions = [];
                                if(value.length < attributes.optionValue.length){
                                  newOptions = attributes.options.map((item:any)=>value.includes(item.option_values_id)?item:{
                                    option_values_id:item.option_values_id,
                                    option_values_name:item.option_values_name
                                  });
                                }
                                // 如果在 attributes.options 中存在 value 对应的 option_values_id 则更新 optionValue
                                // 同时把该项的options对应的数据更新
                                if(areAllIdsPresent(value,attributes.options)){
                                    const newAttributesMap = [
                                      ...attributesMap.map((item:any)=>{
                                        if(item.value === attributes.value){
                                            return {
                                              ...item,
                                              options:newOptions.length > 0?newOptions:item.options,
                                              optionValue:value
                                            }
                                        }
                                        return item
                                      })
                                    ]
                                    console.log(newAttributesMap)
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
                        <AttributesTagModal attributes={attributes} attributesMap={attributesMap} setAttributesMap={setAttributesMap}  />
                        <span style={{cursor: "pointer"}} onClick={() => handleRemove(attributes)}>
                            <Tooltip title="删除">
                              <DeleteIcon className="font-20 color-F86140" />
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
  .add-specification-button{
    height: 36px;
  }
  .my-select{

  }
`