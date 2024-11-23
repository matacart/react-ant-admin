import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Form, Input, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import newStore from '@/store/newStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import CustomsDeclaration from './CustomsDeclaration';
import MultipleStylesCard from './MultipleStylesCard';
import PriceOrTransactionCard from './PriceOrTransactionCard';
import ProductDataCard from './ProductDataCard';
import ProductImgCard from './ProductImgCard';
import ProductSettingsCard from './ProductSettingsCard';
import ProductStyleList from './ProductStyleList';
import SEOCard from './SEOCard';
import StockCard from './StockCard';
import ThemeTemplateCard from './ThemeTemplateCard';
import ThirdPartyInfoCard from './ThirdPartyInfoCard';
import { addProduct, addStyle, addStyleContent, addStyleName, addTags, getProductStyleList, getProductStyleValueList, updateProductStyle } from '@/services/y2/api';



// const createStyled = (productId:string)=>{
//     setInterval(()=>{
//         // 通过产品id添加款式
//         console.log(newStore.styleName)
//         if(newStore.styleName.length>0){
//             newStore.styleName.forEach((e,i) => {
//                 newStore.styleValue[i].forEach(async styleValue=>{
//                     let styleNameId = 0;
//                     let styleContentId = 0;
//                     // 创建款式名称
//                     await addStyleName(newStore.language,e).then(res=>{
//                         console.log(res)
//                         if(res.code==0){
//                             // 创建成功
//                             // 创建款式内容
//                             // 通过产品id关联
//                             styleNameId = res.id
//                         }else{
//                             // message.error('noooo');
//                         }
//                     });
//                     // 创建款式内容
//                     await addStyleContent(newStore.language,styleValue,styleNameId).then(async res=>{
//                         console.log(res)
//                         if(res.code==0){
//                             styleContentId = res.id
//                         }else{
//                             // 款式存在 -- 查询所有款式获取款式内容id
//                             // message.error('noooo');
//                             await getProductStyleValueList().then(styleData=>{
//                                 styleData.data.forEach((style:any)=>{
//                                     if(style.option_values_name == styleValue && style.option_id == styleNameId){
//                                         styleContentId = style.id
//                                     }
//                                 })
//                             })
//                         }
//                     })
//                     // 通过产品id关联
//                     await addStyle(styleNameId,styleContentId,productId).then((res:any)=>{
//                         console.log(res)
//                         if(res.code==0){
//                             console.log("产品款式添加成功")
//                             newStore.setStyleName([]);
//                         }else if(res.code==201){
//                             // 款式产品已存在
//                             newStore.setStyleName([]);
//                         }
//                     })
//                 })
//             });
//         }
//         // 给产品添加款式成功，通过模型获取到所有的产品款式，将内容添加进去
//         if(newStore.styleName.length == 0){
//             // // 通过模型查找款式列表
//             getProductStyleList(newStore.model,newStore.language).then((res:any)=>{
//                 // console.log(res)
//                 if(res.code==0){
//                     console.log(res.data)
//                     // 通过for循环将所有数据提交
//                     res.data.forEach((res:any)=>{
//                         updateProductStyle(res.id,"200","100").then(result=>{
//                             if(result.code == 0){
//                                 // success
                                
//                             }
//                         })
//                     })
//                 }else{
//                   console.log("获取款式列表失败")
//                 }
//             })
//         }
//     },10000)
// }
// 表单项商品数据类型
interface DataType {
    key: React.Key;
    imgUrl?: string;
    product_image?: string;
    title?: string;
    content?: string;
    price?: number;
    costPrice?: number;
    ISBN?: string;
    inventory?: number;
    HSCode?:string;
    notion?: string;
    model?: string;
    state?: boolean;
    tag?: string;
    productid:string;
    languages_id:string
}

interface LocationState {
    copyProduct:DataType;
    copyProductImage?: boolean;
    copyProductInventory?: boolean;
    radioValue?:number;
    // 可以根据实际需求添加其他字段
}

function AddNewProduct(){
    const [styleId, setStyleId] = useState('');
    let productInfo = history.location.state as LocationState;
    if(productInfo){
        // 复制图片
        if(productInfo.copyProductImage){
            newStore.setSelectedImgList(JSON.parse(productInfo.copyProduct.product_image as string))
            // 存储给map
            JSON.parse(productInfo.copyProduct.product_image as string).forEach((value:any,index:any) => {
                newStore.temp.set(index,value)
            });
        }
        // 库存
        if(productInfo.copyProductInventory){
            newStore.setInventory(productInfo.copyProduct.inventory)
        }
        if(productInfo.radioValue == 1){
            newStore.setOnPutProduct(true)
        }else{
            newStore.setOnPutProduct(false);
        }
        // 
        newStore.setTitle('[Copy]'+productInfo.copyProduct.title)
        newStore.setContent(productInfo.copyProduct.content)
        newStore.setPrice(productInfo.copyProduct.price)
        newStore.setCostPrice(productInfo.copyProduct.costPrice)
        newStore.setModel(productInfo.copyProduct.model)
        // 新增 11-19
        newStore.setHSCode(productInfo.copyProduct.HSCode)
        newStore.setISBN(productInfo.copyProduct.ISBN)
        newStore.setNotion(productInfo.copyProduct.notion)
    }
    console.log(productInfo)
    // 复制
    useEffect(()=>{
        
    },[])
    // 实现 onSecondInputChange 函数
    const handleSecondInputChange = (value: string) => {
        setStyleId(value);
        // 初始化参数
    };
    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/products/index')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">添加商品</div>
                        </div>
                        <div className='mc-header-right'>
                            <Select className='selector' defaultValue="更多" />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <ProductDataCard />
                            <ProductImgCard />
                            <PriceOrTransactionCard />
                            <StockCard/>
                            <CustomsDeclaration/>
                            <MultipleStylesCard onSecondInputChange={handleSecondInputChange} />
                            {styleId && <ProductStyleList styleId={styleId} />}
                        </div>
                        <div className='mc-layout-extra'>
                            <ProductSettingsCard/>
                            <SEOCard/>
                            <ThirdPartyInfoCard/>
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <Button type='primary' onClick={()=>{
                            newStore.setSelectedImgList(Array.from(newStore.temp.values()))
                            // console.log(newStore)
                            // 获取商品id
                            // console.log(newStore.styleName)
                            // console.log(newStore.styleValue)
                            // 通过产品id添加款式
                            // if(newStore.styleName.length>0){
                            //     newStore.styleName.forEach((e,i) => {
                            //         newStore.styleValue[i].forEach(async res=>{
                            //             let styleNameId = 0;
                            //             // 创建款式名称
                            //             await addStyleName(newStore.language,e).then(res=>{
                            //                 console.log(res)
                            //                 if(res.code==0){
                            //                     // 创建成功
                            //                     // 创建款式内容
                            //                     // 通过产品id关联
                            //                     styleNameId = res.id
                            //                 }else{
                            //                     message.error('noooo');
                            //                 }
                            //             });
                            //             // 创建款式内容
                            //             let styleContentId = 0;
                            //             await addStyleContent(newStore.language,res,styleNameId).then(res=>{
                            //                 console.log(res)
                            //                 if(res.code==0){
                            //                     styleContentId = res.id
                            //                 }else{
                            //                     message.error('noooo');
                            //                 }
                            //             })
                            //             let productId = 1363020924714;
                            //             // 通过产品id关联
                            //             await addStyle(styleNameId,styleContentId,productId).then((res:any)=>{
                            //                 console.log(res)
                            //                 if(res.code==0){
                            //                     console.log("产品款式添加成功")
                            //                 }else{
                            //                     message.error('noooo');
                            //                 }
                            //             })
                            //         })
                            //         // console.log(newStore.styleValue[i].join(","))
                            //         // 创建成功
                            //     });
                            // }
                            // // 通过模型查找 -- 获取对应的商品款式id -- 
                            // // model: 12332222111
                            // let model = 12332222111
                            // // languages_id
                            // getProductStyleList(newStore.model,newStore.language).then(res=>{
                            //     console.log(res)
                            // })
                            // 通过模型id获取
                            newStore.submitAddProduct().then(res=>{
                                // message.success('创建成功')
                                // history.push('/products/index')
                                if(res.code==0){
                                    message.success('创建成功')
                                    // newStore.reset()
                                    history.push('/products/index')
                                    // 返回产品id 根据产品id在本地自动请求款式直到成功
                                }else{
                                    message.error('noooo');
                                }
                            });
                        }}>创建</Button>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(AddNewProduct);

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
    
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;

            display: flex;
            justify-content: space-between;
            align-content: center;
    
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
    
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
    
                &-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
    
            &-right {
                display: flex;
                align-items: center;
                width: 70px;
                > .selector{
                    height: 36px;
                }
            }
        }

        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }

        &-content {
            flex: 9;
            min-width: 510px;

            display: flex;
            flex-direction: column;
            gap:20px

        }

        &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;

            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        }
        .mc-footer{
            display:flex;
            flex-direction: row-reverse;
        }
    }
}
a{
  font-weight: 400
}
`