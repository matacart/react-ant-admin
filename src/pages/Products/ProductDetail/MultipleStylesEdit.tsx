import AttributesModal from "@/components/Modal/AttributesModal";
import ProductStyleModal from "@/components/Modal/ProductStyleModal";
import {addProductOptionValues, addStyleName, getProductOptionSelect, getProductStyleList, getProductStyleValueList } from "@/services/y2/api";
import product from "@/store/product/product";
import productStore from "@/store/productStore";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Card, Checkbox, Button, AutoComplete, Input, Tag, Select, Modal, message, Tooltip, SelectProps, Table, TableProps, Space, Divider, AutoCompleteProps } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// interface MultipleStylesEditProps {
//   onSecondInputChange?: (value: string) => void;
// }

type TagRender = SelectProps['tagRender'];

const { Option } = Select;

const { confirm } = Modal;

function MultipleStylesEdit(props:any) {
  const [specifications, setSpecifications] = useState([]);
  const [values, setValues] = useState<string[]>([]);
  const [tags, setTags] = useState<any[][]>([]); // 用于存储每个规格组的标签
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [options,setOptions] = useState([
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
    },
  ]);

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

  // 原始数据
  const [info,setInfo] = useState<any>([]);
  const [infoCopy,setInfoCopy] = useState<any>([]);
  // 表格数据
  const [tagData,setTagData] = useState<any>([]);
  // 表格行
  const [flag,setFlag] = useState<number>();
  const [styleDate,setStyleDate] = useState<any>([]);
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
        // color={value}
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

    // // setInfoCopy(newInfo)
    // product.setAttributes(newInfo.flat())
    // let temp:any = []
    // // 重新赋值
    // value.forEach((e:any)=>{
    //   if(e.status !== "9"){
    //     temp.push((e.id == null || e.id == "") ?e.option_values_name:e.id)
    //   }
    // })
    // let newTags = [...tags];
    // newTags[i] = temp
    // setTags(newTags)
    // // 更新所有标签的扁平化列表，并通知父组件
    // // 数据分流  ---- 修改
    // let tagsId:any = [...newTags];
    // let tagsValues:any = [...newTags];
    // newTags.forEach((res,index) => {
    //   if(res.length>0){
    //     res.forEach(e => {
    //       Array.from(newInfo.flat(),(x:any)=>{
    //         if(x.id == e){
    //           tagsValues[index] = tagsValues[index].map(value => {
    //             if (value == e) {
    //               return x.option_values_name; // 将3替换为'three'
    //             }
    //             return value; // 其他值保持不变
    //           })
    //         }
    //       })
    //     })
    //   }
    // });
    // console.log(newTags)
    // props.setStyle(tagsValues)
    // console.log(tagsValues)
  }
  // 收集所有输入值后调用父组件提供的回调函数
  useEffect(() => {
    const fetchData = async () => {
    const optionMap = {};
      // 遍历数组
      product.attributes.forEach(item => {
        // 获取当前的 option_name
        const optionName = item.option_name;
        // 如果 optionIdMap 中还没有这个 option_name，则创建一个空数组
        if (!optionMap[optionName]) {
          optionMap[optionName] = [];
        }
        // 将当前的 option_values_name 添加到对应 option_name 的数组中
        optionMap[optionName].push(item);
      });
      let tempList:any = [];
      let tempTags:any = [];
      let tempInfo:any = [];
      let tempValues:any = [];
      let index = 0;
      for(let item in optionMap){
        // value ---- id
        tempTags.push(optionMap[item].map(proxyObj => Reflect.get(proxyObj, 'option_values_id')))
        tempValues.push(optionMap[item].map(proxyObj => Reflect.get(proxyObj, 'option_values_name')))
        // 款式
        // console.log(item)
        await getProductStyleValueList(optionMap[item][0].option_id,product.productInfo.languages_id).then(res=>{
          // console.log(res.data)
          tempList.push(
            {id: index+1,attributes:item,flag:true,optionId:optionMap[item][0].option_id,optionValueList:res.data}
          )
          // 仅过滤旧属性
          // optionMap[item].forEach(element => {
          //   res.data.some(i => i.option_values_id == element.option_values_id)
          // });
        })
        // console.log(optionMap[item])
        tempInfo.push(optionMap[item])
        index++;
      }
      setValues(Array.from(tempList,(item:any)=>{return item.attributes}))
      setSpecifications(tempList)
      // 值
      setTags(tempTags)
      // 原始数据
      setInfo(tempInfo)
    }
    fetchData();
  }, []);
  // 方案修改补充
  const [optionList,setOptionList] = useState<AutoCompleteProps['options']>([])
  useEffect(()=>{
    // 属性 --- 获取所有属性
    getProductOptionSelect("2").then(res=>{
      let newOptionList:any = [];
      res.data.forEach((item:any)=>{
        newOptionList.push({
          label:item.option_name,
          value:item.option_id
        })
      })
      setOptionList(newOptionList)
    })
    // console.log(product.attributes)
  },[])
  // 处理回车键事件  ---待
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'Enter') {
      const newTags = [...tags];
      const currentTags = newTags[index] || [];
      const newValue = values[index].trim();
    }
  }

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

  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // 控制模态框的显示状态
  // 模态框确认按钮点击事件处理器
  const handleOk = () => {
    setIsEditModalVisible(false);
  };

  // 模态框取消按钮点击事件处理器
  const handleCancel = () => {
    setIsEditModalVisible(false);
  };
  // 新增处理复选框变化的函数
  function handleHideOptionCheckboxChange(e: { target: { checked: boolean; }; }) {
    console.log('复选框状态:', e.target.checked);
    // 这里可以添加更多的逻辑来处理复选框的变化
  }

  // 删除整个规格组
  function handleRemove(index: number) {
    info[index].forEach((element:any) => {
      if(element.id){
        product.tempAttributes.push({...element,status:"9"})
      }
    })
    // 直接删除
    info.splice(index,1)

    if(props.onVariant){
      // 删除所有属性时--删除所有变体
      if(info.length == 0){
        product.variants.forEach(element => {
          element.status = "9"
          product.tempVariants.push(element)
        });
        product.setVariants([])
      }
      props.setStyle([...info])
    }
    product.setAttributes(info.flat())
    const newSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecifications);
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  }
  // 添加新的规格组 -- attributes属性
  async function addSpecification(){
    const newId = specifications.length + 1;
    setSpecifications([...specifications, { id: newId,attributes:'',optionId:"",flag:false,optionValueList:[]}]);
    setValues([...values, ""]);
    setTags([...tags, []]); // 添加一个新的空数组作为新的标签集合
    info.push([])
    // // 更新输入框引用
  }
  // 是否有相同的属性
  function hasSameAttributes(arr) {
    const seenAttributes = new Set();
    for (const item of arr) {
      if (seenAttributes.has(item.attributes)) {
        return true; // 找到了相同的 attributes
      }
      seenAttributes.add(item.attributes);
    }
    return false; // 没有找到相同的 attributes
  }

  // 
  const inputRef = useRef(null);

  return (
    <Scoped>
      {/* <span onClick={isVariant}>展开变体</span> */}
      {/*  */}
      {/* props.setOnVariant(!props.onVariant) */}
      <Card title="多款式" extra={<div onClick={()=>{
        !props.onVariant?showVariantConfirm():props.setOnVariant(!props.onVariant)
      }} style={{textAlign:"right",cursor:"pointer"}}>此商品有多个款式
        <Checkbox style={{marginLeft:"10px"}} checked={props.onVariant}>
        </Checkbox>
      </div>}>
        {/* <Checkbox checked={checked} onChange={handleCheckboxChange}>
          此商品有多个款式
        </Checkbox> */}
        {(
          <>
          {specifications.map((spec, index) => {
            // 监听
            let optionContent:string
            return (
              <div key={spec.id} className="select-input icon-container">
              {/* shu */}
              <AutoComplete
                optionFilterProp="label"
                placeholder="请输入属性"
                value={spec.attributes}
                defaultValue={spec.attributes}
                style={{ width: "180px", height: "44px"}}
                // options={optionValueList.map(opt => ({ value: opt.label, label:opt.label  }))}
                options={optionList.map(opt => ({ value: opt.label, label:opt.label  }))}
                onChange={(value,option)=>{
                  // -----------    
                  let newSpecifications = [...specifications]
                  newSpecifications[index].attributes = value
                  newSpecifications[index].flag = false
                  setSpecifications(newSpecifications)
                }}
                onFocus={(e) => {
                  optionContent = e.target.value
                }}
                // 选中
                onSelect={(e)=>{
                  if(hasSameAttributes(specifications)){
                    let newErrors = { ...errors }
                    newErrors[index] = '属性/款式不能重复'
                    setErrors(newErrors)
                    return
                  }else{
                    let newErrors = { ...errors }
                    newErrors[index] = ''
                    setErrors(newErrors)
                  }
                  // 失去焦点时判断 --- 同时清空原数据
                  if(specifications[index].attributes !== optionContent){
                    let newTags = [...tags];
                    newTags[index] = []
                    setTags(newTags)
                    let newInfo = [...info]
                    newInfo[index] = []
                    setInfo(newInfo)
                  }
                  let list = optionList.filter(item=>item.label == e)
                  let newSpecifications = [...specifications]
                    newSpecifications[index].optionId = list[0].value
                    newSpecifications[index].attributes = e
                    getProductStyleValueList(list[0].value,product.productInfo.languages_id).then(res=>{
                      newSpecifications[index].optionValueList = res.data
                      newSpecifications[index].flag = true
                      setSpecifications(newSpecifications)
                      // 处理用户先输入款式
                      const newValues = [...values];
                      newValues[index] = e
                      setValues(newValues)
                      info[index].forEach(element => {
                        element.option_id = list[0].value
                        element.option_name = e
                      });
                      product.setAttributes(info.flat())
                  })
                }}
                onBlur={(e) => {
                  if(hasSameAttributes(specifications)){
                    let newErrors = { ...errors }
                    newErrors[index] = '属性/款式不能重复'
                    setErrors(newErrors)
                    return
                  }else{
                    let newErrors = { ...errors }
                    newErrors[index] = ''
                    setErrors(newErrors)
                  }
                  // 过滤空值
                  if(e.target.value == "") {
                    let newSpecifications = [...specifications]
                    newSpecifications[index].optionId = ""
                    newSpecifications[index].attributes = e.target.value
                    newSpecifications[index].optionValueList = []
                    setSpecifications(newSpecifications)
                    return 
                  }
                  // 
                  let list = optionList.filter(item=>item.label == e.target.value)
                  if(list.length>0){
                    let newSpecifications = [...specifications]
                    newSpecifications[index].optionId = list[0].value
                    newSpecifications[index].attributes = e.target.value
                    getProductStyleValueList(list[0].value,product.productInfo.languages_id).then(res=>{
                      newSpecifications[index].optionValueList = res.data
                      newSpecifications[index].flag = true
                      setSpecifications(newSpecifications)
                      // 处理用户先输入款式
                      const newValues = [...values];
                      newValues[index] = e.target.value
                      setValues(newValues)
                      info[index].forEach(element => {
                        element.option_id = list[0].value
                        element.option_name = e.target.value
                      });
                      product.setAttributes(info.flat())
                    })
                  }else{
                    // // 判断值是否重复
                    // if(specifications.some(item=>item.attributes == optionContent)){
                    //   return console.log("重复")
                    // }
                    // 失去焦点时判断 --- 同时清空原数据
                    if(specifications[index].attributes !== optionContent){
                      let newTags = [...tags];
                      newTags[index] = []
                      setTags(newTags)
                      let newInfo = [...info]
                      newInfo[index] = []
                      setInfo(newInfo)
                    }
                    // 创建
                    addStyleName("",product.productInfo.languages_id,e.target.value,"1").then(res=>{
                      if(res.code == 0){
                        let newSpecifications = [...specifications]
                        newSpecifications[index].optionId = res.id
                        newSpecifications[index].attributes = e.target.value
                        newSpecifications[index].optionValueList = []
                        newSpecifications[index].flag = true
                        setSpecifications(newSpecifications)
                        // 处理用户先输入款式
                        const newValues = [...values];
                        newValues[index] = e.target.value;
                        setValues(newValues)
                        info[index].forEach(element => {
                          element.option_id = res.id
                          element.option_name = e.target.value
                        });
                        product.setAttributes(info.flat())
                      }else{
                        message.error("添加失败")
                      }
                    })
                  }
                }}
              />
              {spec.flag && <ProductStyleModal inputRef={inputRef} optionList={optionList} setOptionList={setOptionList} spec={spec} specifications={specifications} setSpecifications={setSpecifications} />}
              {errors[index] && (
                <div className="error-message">
                  {errors[index]}
                </div>
              )}
              <div className="custom-input">
                <Select
                  loading={true}
                  mode="tags"
                  // disabled={!spec.flag}
                  // open={false}
                  className="input-text-area"
                  // allowClear={false}
                  style={{ width: "100%", height: "100%" }}
                  placeholder={tags[index]?.length > 0 ? "" : "请输入款式值,可输入多个"}
                  value={tags[index]}
                  tagRender={(props)=>tagRender(props,index,spec)}
                  onChange={(value,option) => handleTagChange(value,option,index)}
                  // onDeselect={(value) => handleTagRemove(value, index)}
                  // onSearch={(searchText) => handleSearch(searchText, index)}
                  // onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {/* {info[index]?.map((option:any) => (
                    <Option value={option.id == undefined?option.option_values_name:option.id}>
                      {(option.attribute_image == null || option.attribute_image == "")?'':<div style={{marginRight: '6px',width:"16px",display:"inline-block",position:"relative",top:"-1px"}}>
                        <img style={{width:"100%",height:"100%", objectFit:"contain"}} src={option.attribute_image} />
                      </div>}
                      {option.option_values_name}
                    </Option>
                  ))} */}
                  {spec.optionValueList?.map((option:any) => (
                    <Option value={option.option_values_id} label={option.option_values_name}>
                      {/* {(option.attribute_image == null || option.attribute_image == "")?'':<div style={{marginRight: '6px',width:"16px",display:"inline-block",position:"relative",top:"-1px"}}>
                        <img style={{width:"100%",height:"100%", objectFit:"contain"}} src={option.attribute_image} />
                      </div>} */}
                      {option.option_values_name}
                    </Option>
                  ))}
                </Select>
              </div>
            {/* {index === 0 && ( // 只在第一个规格组中显示复选框
              <div className="hide-option-checkbox">
                <Checkbox onChange={(e) => handleHideOptionCheckboxChange(e)}>购买时隐藏此选项</Checkbox>
              </div>
            )} */}
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
            <span className="delete-icon btn-icon__1h8Qx delete__3TiEz" style={{cursor: "pointer"}} onClick={() => handleRemove(index)}>
              <Tooltip title="删除">
                <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconDelete" font-size="20">
                  <path d="M18 4.25h-4.325a3.751 3.751 0 0 0-7.35 0H2v1.5h1.305l.947 12.308A.75.75 0 0 0 5 18.75h10a.75.75 0 0 0 .748-.692l.947-12.308H18v-1.5Zm-2.81 1.5-.884 11.5H5.694L4.81 5.75h10.38Zm-5.19-3c.98 0 1.813.626 2.122 1.5H7.878A2.25 2.25 0 0 1 10 2.75Z" fill="#F86140"></path>
                </svg>
              </Tooltip>
            </span>
          </div>
            );
          }
          )}
          {specifications.length < 5 && ( // 限制最多添加四个规格组
            <span style={{marginRight: "20px"}}>
            <Button
              className="add-specification-button"
              onClick={()=>{
                addSpecification()
              }}
            >
              <PlusOutlined />添加商品规格
            </Button>
            </span>
          )}
        </>
        )}
        {/* 属性 */}
        <AttributesModal tagData={tagData} flag={flag} editTagData={editTagData} attributes={attributesModal} setAttributes={setAttributesModal} />
        {/* 多款式 */}
      </Card>
      {/*  */}
    </Scoped>
  );
}


export default observer(MultipleStylesEdit);

// 定义样式
const Scoped = styled.div`
  .customCheckbox{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }

  .ant-card-body {
    padding: 20px;
  }
  .ant-select-arrow{
    display: none;
  }
  .select-input {
    display: flex;
    align-items: center;
    /* gap: 8px; */
    margin-top: 25px;
    position: relative; /* 添加相对定位 */
  }
  .select-input:first-child{
    margin-top: 10px;
  }
.error-message {
  position: absolute;
  bottom: -24px; /* 调整距离 */
  left: 0;
  color: red;
}

  .input-text-area {
    display: inline-block;
    width: 100%;
    padding-left: 6px;
    padding-right: 8px; /* 添加右侧内边距 */
  }

  .ant-select-selection--single,
  .ant-autocomplete {
    width: 100%;
  }

  .ant-select-selection__rendered {
    line-height: normal;
  }

  .add-specification-button {
    background-color: #FFFFFF;
    color: #474F5E;
    padding: 7px 15px;
    margin-top: 25px;
    font-size: 14px;
    width: 140px;
    height: 36px;
    border: 1px solid #ccc;
  }

  .custom-input {
    width: calc(100% - 88px); 
    height: 44px;
    
  }
  .ant-tag-close-icon{
      color: #000 !important;
  }

  .ant-input {
    padding-right: 8px; 
  }

  .icon-container {
    position: relative;
  }

  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .hide-option-checkbox {
    position: absolute;
    left: 190px; //第一个输入框的宽度
    top: 44px; /* 第二个输入框的顶部位置 */
  }
  .edit-icon {
    margin-right: 10px;
    background-color: #fff;
  }`