import { ArrowLeftOutlined } from '@ant-design/icons'
import { Flex, Form, Input, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import MultipleStylesCard from './MultipleStylesCard';
import ProductStyleList from './ProductStyleList';
import SEOCard from './SEOCard';
import StockCard from './StockCard';
import ThemeTemplateCard from './ThemeTemplateCard';
import Winnow from './Winnow';
import PlatformHosting from './PlatformHosting';
import Subnumber from './Subnumber';
import Recommendation from './Recommendation';
import Relevance from './Relevance';
import product from '@/store/product/product';
import PrimaryButton from '@/components/Button/PrimaryButton';
import ProtectionInformation from './ProtectionInformation';
import ThirdPartyInfoCard from './ThirdPartyInfoCard';
import { addTags, upDateProduct } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import Overlay from '@/components/Overlay/Overlay';
import ProductData from '../product/ProductData';
import ProductImg from '../product/ProductImg';
import PriceOrTransaction from '../product/PriceOrTransaction';
import LangSelect from '@/components/Select/LangSelect';
import ProductSettingsCard from '../product/ProductSettingsCard';

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

    // 变体---控制变体组合
    const [onVariant,setOnVariant] = useState(false);
    const [style, setStyle] = useState([]);

    const [isSkeleton,setIsSkeleton] = useState(true)
    const [loading,setLoading] = useState(false) 
    const [isOverlay,setIsOverlay] = useState(false)

    const [form] = Form.useForm();

    // 新增一个ref用于标记是否是初始渲染
    const initialRender = useRef(true);

    // 复制信息
    // let productInfo = history.location.state as LocationState;
    // if(productInfo){
    //     // 复制图片
    //     if(productInfo.copyProductImage){
    //         newStore.setSelectedImgList(JSON.parse(productInfo.copyProduct.product_image as string))
    //         // 存储给map
    //         JSON.parse(productInfo.copyProduct.product_image as string).forEach((value:any,index:any) => {
    //             newStore.temp.set(index,value)
    //         });
    //     }
    //     // 库存
    //     if(productInfo.copyProductInventory){
    //         newStore.setInventory(productInfo.copyProduct.inventory)
    //     }
    //     if(productInfo.radioValue == 1){
    //         newStore.setOnPutProduct(true)
    //     }else{
    //         newStore.setOnPutProduct(false);
    //     }
    //     // 
    //     newStore.setTitle('[Copy]'+productInfo.copyProduct.title)
    //     newStore.setContent(productInfo.copyProduct.content)
    //     newStore.setPrice(productInfo.copyProduct.price)
    //     newStore.setCostPrice(productInfo.copyProduct.costPrice)
    //     newStore.setModel(productInfo.copyProduct.model+"-1")
    //     // 新增 11-19
    //     newStore.setHSCode(productInfo.copyProduct.HSCode)
    //     newStore.setISBN(productInfo.copyProduct.ISBN)
    //     newStore.setNotion(productInfo.copyProduct.notion)
    // }

    // 选择语言
    const setLang = (lang:string)=>{
        product.setProductInfo({
            ...product.productInfo,
            languages_id:lang
        })
    }

    // 表单验证
    const formValidation = ()=>{
        return form.validateFields().then(res=>{
            return true
        }).catch(e=>{
            if (e.errorFields.length > 0) {
                form.scrollToField(e.errorFields[0].name[0],{ block:"center" });
            }
            return false
        })
    }

    // 验证通过 -- 创建商品
    const onFinish = async () => {
        if(await formValidation()){
            setLoading(true)
            try {
                product.productInfo.tag !== "" && addTags(product.productInfo.languages_id,product.productInfo.tag).then(res=>{
                })
                await upDateProduct({
                    ...product.productInfo,
                    product_image:product.productInfo.additional_image[0] || "",
                    additional_image:JSON.stringify(product.productInfo.additional_image.slice(1) || []),
                    diversion:JSON.stringify([product.productInfo.diversion || {}]),
                    attributes:JSON.stringify([...product.attributes,...product.tempAttributes]),
                    variants:JSON.stringify([...product.variants,...product.tempVariants])
                })
                message.success('创建成功')
            }catch(err){
            }finally{
                setLoading(false)
                history.push('/products/index')
            }
        }   
    };


    useEffect(()=>{
        // 清空状态
        const init = async () => {
            await product.reset(); // 如果 reset 是异步操作
            // 随机初始化型号
            const randomModal = "m"+new Date().getTime()
            await product.setProductInfo({
                ...product.productInfo,
                model:randomModal
            })

            // 预加载Tinymce
            setIsSkeleton(false)
        };
        init();
    },[])

    // 监听product.productInfo 变化 --- 
    useEffect(()=>{
        if(initialRender.current) {
            initialRender.current = false;
            return;
        }
        if(!isSkeleton && !initialRender.current){
            setIsOverlay(true)
        }
    },[product.productInfo])

    // 离开提示
    window.onbeforeunload = () => {
        // 弹出提示框
        return '您确定要离开页面吗？'
    }

    // 预加载PTinymce ，让ProductDataCard 子组件使用PTinymce时，没有空白延迟

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
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
                        <Flex className='mc-header-right' align='center' gap={12}>
                            <LangSelect lang={product.productInfo.languages_id} setLang={setLang} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <ProductData form={form} />
                            <ProductImg />
                            <PriceOrTransaction />
                            <StockCard form={form} />
                            <MultipleStylesCard style = {style} setStyle={setStyle} onVariant={onVariant} setOnVariant={setOnVariant} />
                            {onVariant && <ProductStyleList style = {style} setStyle={setStyle} />}
                        </div>
                        <div className='mc-layout-extra'>
                            <Relevance />
                            <ProductSettingsCard/>
                            <Recommendation />
                            <SEOCard/>
                            <Winnow />
                            <PlatformHosting />
                            <Subnumber />
                            <ProtectionInformation />
                            <ThirdPartyInfoCard/>
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton text="创建" loading={loading} onClick={onFinish} />
                    </div>
                </div>
                {/* 编辑提示 */}
                {isOverlay && <Overlay status={loading} okText='创建' onExit={()=>{
                    history.push('/products/index')
                }} onSubmit={onFinish} />}
            </div>}
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