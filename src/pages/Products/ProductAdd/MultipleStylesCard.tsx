import AttributesModal from "@/components/Modal/AttributesModal";
import { addProduct, addStyle, addStyleContent, addStyleName, getProductStyleList, getProductStyleValueList } from "@/services/y2/api";
import newStore from "@/store/newStore";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Checkbox, Button, AutoComplete, Input, Tag, Select, Modal, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const { Option } = Select;
const options = [
  {
    value: "Color",
    label: "Color",
  },
  {
    value: "Size",
    label: "Size",
  },
  {
    value: "Material",
    label: "Material",
  },
  {
    value: "Style",
    label: "Style",
  },
];

interface MultipleStylesEditProps {
  onSecondInputChange?: (value: string) => void;
}

export default function MultipleStylesEdit(props: MultipleStylesEditProps) {
  const [checked, setChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState([{ id: 1,attributes:""}]);
  const [values, setValues] = useState<string[]>([]);
  const [tags, setTags] = useState<any[][]>([]); // 用于存储每个规格组的标签
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // 原始数据
  const [info,setInfo] = useState<any>([]);
  // 表格数据
  const [tagData,setTagData] = useState<any>([]);
  // 表格行
  const [flag,setFlag] = useState();

  const [styleDate,setStyleDate] = useState<any>([]);

  const [attributesModal, setAttributesModal] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // 控制模态框的显示状态

  // 自定义标签
  const tagRender = (props:any,index:any) => {
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
          console.log(info[index])
          setFlag(index)
          console.log(tags)
        }}
        onClose={onClose}
        style={{color:"#000",padding: '3px 10px'}}
      >
        <span style={{cursor:"pointer",fontSize:"14px"}}>{label}</span>
      </Tag>
    );
  };
  const editTagData = (value:any,i:number)=>{
    let newInfo:any = [...info]
    newInfo[i] = value
    setInfo(newInfo)
    newStore.setAttributes(newInfo.flat())
    let temp:any = []
    // 重新赋值
    value.forEach((e:any)=>{
      if(e.status !== "9"){
        temp.push((e.id == null || e.id == "") ?e.option_values_name:e.id)
      }
    })
    let newTags = [...tags];
    newTags[i] = temp
    setTags(newTags)
  }
  
  // 收集所有输入值后调用父组件提供的回调函数
  useEffect(() => {
    const allTagsFlat = tags.flat();
    const styleId = allTagsFlat.join(',');
    props.onSecondInputChange?.(styleDate);
    
    const optionMap = {};
    // 遍历数组
    newStore.attributes.forEach(item => {
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
    let index = 0;
    for(let item in optionMap){
      // value ---- id
      tempTags.push(optionMap[item].map(proxyObj => Reflect.get(proxyObj, 'id')))
      // 款式
      tempList.push(
        {id: index+1,attributes:item}
      )
      tempInfo.push(optionMap[item])
      index++;
    }
    setValues(Array.from(tempList,(item:any)=>{return item.attributes}))
    setSpecifications(tempList)
    // 值
    setTags(tempTags)
    // 原始数据
    setInfo(tempInfo)
  }, [styleDate]);

  // 添加款式
  const addProductStyle = ()=>{
    // if(values2.length>0){
    //   values2.forEach((v,index)=>{
    //     tags[index].forEach(async e=>{
    //       let styleNameId = 0;
    //       // 创建款式名称
    //       await addStyleName(oldStore.language,v).then(res=>{
    //         if(res.code==0){
    //             styleNameId = res.id
    //         }
    //       });
    //       // 创建款式内容
    //       if(styleNameId!==0){
    //         await addStyleContent(oldStore.language,e,styleNameId).then(async res=>{
    //           let styleContentId = 0;
    //           if(res.code==0){
    //               styleContentId = res.id
    //           }else{
    //             // 查询所有款式
    //             await getProductStyleValueList().then(r=>{
    //               r.data.forEach((style:any)=>{
    //                 if(style.option_values_name == e && style.option_id == styleNameId){
    //                   styleContentId = style.id
    //                 }
    //               })
    //             })
    //           }
    //           // 通过产品id关联
    //           await addStyle(styleNameId,styleContentId,oldStore.productId).then((res:any)=>{
    //             // console.log(res)
    //             if(res.code==0){
    //               message.success('产品款式添加成功');
    //             }else{
    //               message.error('产品款式失败');
    //             }
    //           })
    //           // // 通过模型查找款式列表
    //           await getProductStyleList(oldStore.model,oldStore.language).then((res:any)=>{
    //             // console.log(res)
    //             if(res.code==0){
    //               setStyleDate(res.data)
    //             }else{
    //               console.log("获取款式列表失败")
    //             }
    //           })
    //         })
    //       }
    //     })
    //   })
    // }
  }
   // 删除
  function handleTagRemove(value: any,index:number){
    // 先根据id删除 ，后根据option_values_name删除
    info[index] = Array.from(info[index],(v:any)=>{
      if(v.id == null || v.id == ""){
        if(v.option_values_name == value.value){
        }else{
          return v
        }
      }else{
        if(v.id == value.value){
          console.log(11111)
          v.status = "9"
        }
        return v
      }
    }).filter(e => e !== undefined)
    // console.log(info[index])
    newStore.setAttributes(info.flat())
    const newTags = [...tags];
    newTags[index] = newTags[index].filter(t => t !== value.value);
    setTags(newTags);
  } 
  // 处理回车键事件
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    // if (e.key === 'Enter') {
    //   const newTags = [...tags];
    //   const currentTags = newTags[index] || [];
    //   const newValue = values[index].trim();

    //   if (newValue !== '') {
    //     newTags[index] = [...currentTags, newValue];
    //     setTags(newTags);
    //     const newValues = [...values];
    //     newValues[index] = ''; // 清空输入框
    //     setValues(newValues);

    //     // 收集所有输入值后调用父组件提供的回调函数
    //     const allTagsFlat = newTags.flat();
    //     // props.onSecondInputChange?.(allTagsFlat.join('.'));

    //     // 确保光标在输入框末尾
    //     const inputRef = inputRefs.current[index];
    //     if (inputRef) {
    //       inputRef.setSelectionRange(newValue.length, newValue.length);
    //     }
    //   }
    // }
  }

  // 添加 useRef 来保存输入框的引用
  // const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // inputRefs.current = Array(values.length).fill(null);
  // 处理标签选择或输入变化 -- 新增
  async function handleTagChange(value: any,index:number) {
    info[index].push({
      option_name:values[index],
      option_values_name:value.value
    })
    newStore.setAttributes(info.flat())

    let newTags = [...tags];
    newTags[index] = [...newTags[index],value.value]
    setTags(newTags)
    // console.log(tags[index])
    // 更新所有标签的扁平化列表，并通知父组件
    // const allTagsFlat = newTags.flat();
    // const styleId = allTagsFlat.join(',');
    // props.onSecondInputChange?.(styleId);
  }
  
  // 为编辑图标添加点击事件处理器
  const handleEditClick = () => {
    setIsEditModalVisible(true);
    console.log(newStore.attributes)
  };
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
  // 处理复选框变化
  function handleCheckboxChange(e: { target: { checked: boolean; }; }) {
    setChecked(e.target.checked);
    if(e.target.checked && specifications.length == 0){
      addSpecification()
    }
  }

  // 处理第一个搜索框的选择变化
  function handleChange(value: string, index: number) {
    const newValues = [...values];
    newValues[index] = value;
    

    setValues(newValues);
    info[index].forEach(element => {
      element.option_name = value
    });
    newStore.setAttributes(info.flat())
    

    console.log(`selected ${value}`);
    console.log(newValues)
    // 检查是否有重复值
    const hasDuplicate = new Set(newValues).size !== newValues.length;
    if (hasDuplicate) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [index]: '属性/款式不能重复'
      }));
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[index];
        return newErrors;
      });
    }

    // 更新其他逻辑...
  }
  // 处理搜索框的搜索事件
  function handleSearch(searchText: string, index: number) {
    // const newValues = [...values];
    // newValues[index] = searchText;
    // setValues(newValues);
  }
  // 删除整个规格组
  function handleRemove(index: number) {
    info[index].forEach((element:any) => {
      element.status = "9"
    })
    newStore.setAttributes(info.flat())

    const newSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecifications);
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);

    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    // 判断
    if(newSpecifications.length === 0){
      setChecked(false)
    }
  }

  // 添加新的规格组 -- attributes属性
  async function addSpecification(){
    const newId = specifications.length + 1;
    setSpecifications([...specifications, { id: newId,attributes:''}]);
    setValues([...values, ""]);
    setTags([...tags, []]); // 添加一个新的空数组作为新的标签集合
    // console.log([...specifications, { id: newId,attributes:''}])
    console.log([...values, ""])
    console.log([...tags, []])
    info.push([])
    // // 更新输入框引用
    // inputRefs.current = [...inputRefs.current, null];
  }
  return (
    <Scoped>
      <Card title="多款式">
        <Checkbox checked={checked} onChange={handleCheckboxChange}>
          此商品有多个款式
        </Checkbox>
        {checked && (
          <>
          {specifications.map((spec, index) => (
          <div key={spec.id} className="select-input icon-container">
            <AutoComplete
              placeholder="请输入属性"
              style={{ width: "160px", height: "44px" }}
              options={options.map(opt => ({ value: opt.value, label: opt.label }))}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().includes(inputValue.toUpperCase())
              }
              onChange={(value) => handleChange(value, index)}
              defaultValue={spec.attributes}
              // defaultValue={oldStore.attributes.length == 0 ?"":oldStore.attributes[spec.id-1].option_name}
            />
              {errors[index] && (
              <div className="error-message">
                {errors[index]}
              </div>
            )}
            <div className="custom-input">
              <Select
                mode="tags"
                allowClear
                open={false}
                labelInValue
                style={{ width: "100%", height: "100%" }}
                placeholder={tags[index]?.length > 0 ? "" : "请输入款式值"}
                value={tags[index]}
                tagRender={(props)=>tagRender(props,index)}
                // onChange={(value) => handleTagChange(value, index)}
                onSelect={(value) => handleTagChange(value,index)}
                onDeselect={(value) => handleTagRemove(value, index)}
                onSearch={(searchText) => handleSearch(searchText, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="input-text-area"
              >
                {info[index]?.map((option) => (
                  <Option value={option.id == undefined?option.option_values_name:option.id}>
                    {(option.attribute_image == null || option.attribute_image == "")?'':<div style={{marginRight: '6px',width:"16px",display:"inline-block",position:"relative",top:"-1px"}}>
                      <img style={{width:"100%",height:"100%", objectFit:"contain"}} src={option.attribute_image} />
                    </div>}
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
            <span className="edit-icon btn-icon__1h8Qx edit__3TiEz" style={{cursor: "pointer"}} onClick={handleEditClick}>
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
          ))}
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
          {/* <Button
              type="primary"
              className="add-specification-button"
              onClick={addProductStyle}
          >
            添加款式
          </Button> */}
        </>
        )}
        {/* 模态框 */}
        <Modal
          title="规格编辑"
          visible={isEditModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              确定
            </Button>,
          ]}
        >
          <p>客户可在选择商品规格时看到已上传的图片</p>
          <p>支持上传.jpg、.png、.gif格式的图片；最大限制4M；建议尺寸：96px * 96px</p>
          <table>
            <thead>
              <tr>
                <th>规格名称</th>
                <th>规格图片</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Modal>
        {/* 属性框 */}
        <AttributesModal tagData={tagData} flag={flag} editTagData={editTagData} attributes={attributesModal} setAttributes={setAttributesModal} />
      </Card>
    </Scoped>
  );
}


// 定义样式
const Scoped = styled.div`
  .ant-card-body {
    padding: 20px;
  }
  .ant-select-arrow{
    display: none;
  }
  .select-input {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 25px;
  position: relative; /* 添加相对定位 */
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
    left: 190px; /* 第一个输入框的宽度 */
    top: 44px; /* 第二个输入框的顶部位置 */
  }
  .edit-icon {
    margin-right: 10px;
    background-color: #fff;
  }`





