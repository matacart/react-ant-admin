import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Divider,Flex,Form,MenuProps,message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import TradingRecords from './TradingRecords';
import { deleteProduct, getProductDetail, upDateProduct, upDateProductStatus } from '@/services/y2/api';
import React from 'react';
import MultipleStylesEdit from './MultipleStylesEdit';
import ProductStyleListEdit from './ProductStyleListEdit';
import { styled } from 'styled-components';
import { observer } from 'mobx-react-lite';
import cookie from 'react-cookies';
import { history,useParams,useNavigate } from '@umijs/max';
import copy from 'copy-to-clipboard';
import dayjs from "dayjs";
import product from '@/store/product/product';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import DangerButton from '@/components/Button/DangerButton';
import DefaultButton from '@/components/Button/DefaultButton';
import ButtonIcon from '@/components/Button/ButtonSvg';
import { LeftIcon, RightIcon } from '@/components/Icons/Icons';
import ButtonDropdownSecondary from '@/components/Dropdown/ButtonDropdownSecondary';
import Overlay from '@/components/Overlay/Overlay';
import LangSelect from '@/components/Select/LangSelect';
import ProductSettingsCard from '../Product/ProductSettingsCard';
import Subnumber from '../Product/Subnumber';
import CodTemplateCard from '../Product/CodTemplateCard';
import ThemeTemplateCard from '../Product/ThemeTemplateCard';
import ProductData from '../Product/ProductData';
import ProductImg from '../Product/ProductImg';
import PriceOrTransaction from '../Product/PriceOrTransaction';
import Relevance from '../Product/Relevance';
import Recommendation from '../Product/Recommendation';
import Winnow from '../Product/Winnow';
import PlatformHosting from '../Product/PlatformHosting';
import ProtectionInformation from '../Product/ProtectionInformation';
import ThirdPartyInfoCard from '../Product/ThirdPartyInfoCard';
import StockCard from '../Product/StockCard';
import SEOCard from '../Product/SEOCard';


// 信息
interface ProductDetail {
    title:string;
    content: string;
    content1: string;
    // 商品图片/视频
    // selectedImgList: UploadFile[];
    // price:valueType;
    // originPrice:valueType;
    // specialprice:valueType;
    // sku:string;
    // ISBN:string;
    // quantity:number;
    // inventoryTracking:boolean;
    // continueSell:boolean;
    // status:string;
    // weight:string;
    // tag:string;
}

function ProductDetail() {

    const navigate = useNavigate(); // 使用 useNavigate 钩子
    const {productId,languageId} = useParams();

    // 域名信息
    const domainCookie = cookie.load("domain");

    // 预览域名
    const previewDomain = '.'+(JSON.parse(localStorage.getItem("MC_DATA_PLATFORM_INFO") || '{}')?.preview_domain || '');

    const [languagesId,setLanguagesId] = useState<string>(languageId??"2");

    // 分享链接
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/share_channel/?type=reshare&link=https%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%3Futm_source%3DFacebook%26utm_medium%3Dproduct-links%26utm_content%3Dweb&app_id=966242223397117&source_surface=external_reshare&display&hashtag"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareFacebook.97f9a.svg"/><span style={{marginLeft:"8px"}}>Facebook</span></div>
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://twitter.com/share?text="+product.productInfo.title.trim()+"%26url%3Dhttps%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%26utm_source%3DTwitter%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareTwitter.f35cb.svg"/><span style={{marginLeft:"8px"}}>Twitter</span></div>
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://social-plugins.line.me/lineit/share?url=https%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%26utm_source%3DLine%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareLine.8cbc7.svg"/><span style={{marginLeft:"8px"}}>Line</span></div>
                </a>
            ),
        },
        {
            key: '4',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://api.whatsapp.com/send/?text=https%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%26utm_source%3DWhatsapp%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareWhatsapp.60743.svg"/><span style={{marginLeft:"8px"}}>Whatsapp</span></div>
              </a>
            ),
        },
        {
            key: '5',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=https%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%26utm_source%3DTumblr%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareTumblr.b0ed6.svg"/><span style={{marginLeft:"8px"}}>Tumblr</span></div>
              </a>
            ),
        },
        {
            key: '6',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://pinterest.com/pin/create/button/?url=https%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"&media=undefined&description="+product.productInfo.title+"&utm_source%3DPinterest%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/SharePinterest.e96e2.svg"/><span style={{marginLeft:"8px"}}>Pinterest</span></div>
                </a>
            ),
        },
        {
            key: '7',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://www.reddit.com/submit?url=https%3A%2F%2F"+domainCookie?.domain_name+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%3Futm_source%3DReddit%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareReddit.d1395.svg"/><span style={{marginLeft:"8px"}}>Reddit</span></div>
              </a>
            ),
        },
        {
            key: '8',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/shareArticle?url=https%3A%2F%2F"+domainCookie?.primaryDomain+"%2F"+product.productInfo.title.replace(new RegExp(" ","gm"),"-")+`-p`+product.productInfo.id+`.html`+"%3Futm_source%3DLinkedin%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareLinkedin.4a174.svg"/><span style={{marginLeft:"8px"}}>Linkedin</span></div>
              </a>
            ),
        },
    ];
    const [productTitle,setProductTitle] = useState(""); //标题

    const [form] = Form.useForm();
    // 新增一个ref用于标记是否是初始渲染
    const initialRender = useRef(true);
    // 提示
    const [isOverlay,setIsOverlay] = useState(false)
    const [isSkeleton,setIsSkeleton] = useState(true)
    const [loading,setLoading] = useState(false)
    // const [saveLoading,setSaveLoading] = useState(false);
    const params = new URL(location.href).searchParams

    const [modal, contextHolder] = Modal.useModal();
    
    const [style, setStyle] = useState([]);
    // 变体---控制变体组合
    const [onVariant,setOnVariant] = useState(false);
    // 删除
    function productDel(id:any){
        return deleteProduct(id).then(res=>{
            if(res.code==0){
                message.success('删除成功');
                navigate('/products/index');
            }else{
                message.error('noooo');
            }
            
        })
    }
    // 设置产品状态
    function setProductStatus(status:string){
        upDateProductStatus(product.productInfo.id,status).then(res=>{
            message.success("成功")
            product.setProductInfo({
                ...product.productInfo,
                status:status
            })
        }).catch(err=>{
            message.error("失败")
        }).finally(()=>{
            
        })
    }
    // 存档弹窗
    const onFile = () => {
        modal.confirm({
            title: "将商品存档",
            centered:true,
            icon: <></>,
            content: '存档后销售渠道不再展示此商品，可通过商品管理进行查看',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                setProductStatus("2")
            }
        });
    };
    // 取消存档弹窗
    const noONFile = () => {
        modal.confirm({
            title: "取消商品存档",
            centered:true,
            icon: <></>,
            content: '取消存档后商品将变为下架状态，您可以进行上架售卖',
            okText: '确定',
            cancelText: '取消',
            onOk(){
                setProductStatus("0")
            }
        });
    };

    // 删除弹窗
    const delProduct = () => {
        modal.confirm({
            title: "确定删除吗？",
            centered:true,
            icon: <ExclamationCircleOutlined />,
            content: '删除后将不能找回请谨慎操作！',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                productDel(product.productInfo.id)
            }
        });
    };

    // 上一个商品
    const prevProduct=(id:string)=>{
        if(id==="" || id===null){
            message.error("这是第一个商品")
        }else{
            history.push(`/products/edit/${id}/${product.productInfo.languages_id}`)
        }
    }
    // 下一个商品
    const nextProduct=(id:string)=>{
        if(id==="" || id===null){
            message.error("这是最后一个商品")
        }else{
            history.push(`/products/edit/${id}/${product.productInfo.languages_id}`)
        }
    }

    // 获取商品详情
    const fetchProductDetail = async (id:string,langId:string) => {
        setIsSkeleton(true)
        getProductDetail(id,langId).then(res=>{
            // 格式
            if(res.data && JSON.stringify(res.data) != "[]"){
                setProductTitle(res.data.title)
                // 格式过滤 --- 有效的json格式
                let newAdditonalImage = []
                try {
                    newAdditonalImage = (JSON.parse(res.data.additional_image || "[]") instanceof Array)?JSON.parse(res.data.additional_image || "[]"):[]
                } catch (error) {
                    console.log(error)
                    newAdditonalImage = []
                }
                if(res.data.product_image == ""){
                    product.setProductInfo({
                        ...res.data,
                        start_time:(res.data.start_time == "0" || res.data.start_time == "") ? "" : dayjs(res.data.start_time*1000).format("YYYY-MM-DD HH:mm:ss"),
                        end_time:(res.data.end_time == "0" || res.data.end_time == "")?"":dayjs(res.data.end_time*1000).format("YYYY-MM-DD HH:mm:ss"),
                        additional_image:[...newAdditonalImage]
                    })
                }else{
                    console.log(res.data)
                    product.setProductInfo({
                        ...res.data,
                        start_time:(res.data.start_time == "0" || res.data.start_time == "")?"":dayjs(res.data.start_time*1000).format("YYYY-MM-DD HH:mm:ss"),
                        end_time:(res.data.end_time == "0" || res.data.end_time == "")?"":dayjs(res.data.end_time*1000).format("YYYY-MM-DD HH:mm:ss"),
                        additional_image:[res.data.product_image,...newAdditonalImage]
                    })
                }
                // 属性
                product.setAttributes(res.data.attributes || [])
                // 变体
                product.setVariants(res.data.variants || [])
            }
        }).catch(()=>{
        }).finally(async ()=>{
            // await sleep(2000)
            setIsSkeleton(false)
        })
    };

    // 表单验证
    const formValidation = ()=>{
        return form.validateFields().then(res=>{
            return true
        }).catch(e=>{
            if (e.errorFields.length > 0) {
                form.scrollToField(e.errorFields[0].name[0],{ block:"center" });
            }
            console.log(e)
            return false
        })
    }

    // 更新产品
    const onFinish = async ()=>{
        if(await formValidation()){
            setLoading(true)
            try {
                await upDateProduct({
                    ...product.productInfo,
                    product_image:product.productInfo.additional_image[0] || "",
                    additional_image:JSON.stringify(product.productInfo.additional_image.slice(1) || []),
                    diversion:JSON.stringify([product.productInfo.diversion || {}]),
                    attributes:JSON.stringify([...product.attributes,...product.tempAttributes]),
                    variants:JSON.stringify([...product.variants,...product.tempVariants])
                })
                message.success('修改成功')
                setProductTitle(product.productInfo.title)
            }catch(err){
            }finally{
                setIsOverlay(false)
                setLoading(false)
            }
        }
    }
    // 在组件加载时调用 fetchProductDetail
    useEffect(() => {
        fetchProductDetail(productId || "",languagesId);
    },[productId,languagesId]);


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
    
    
    return (
        <div>
            {isSkeleton?<SkeletonCard />:<Scoped>
                {/* 弹窗 */}
                <div className='mc-layout-wrap'>
                    <div className="mc-layout">
                        <div className="mc-header">
                            <div className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={() => {
                                    navigate('/products/index')
                                }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div className="mc-header-left-content">{productTitle}</div>
                            </div>
                            <Flex className='mc-header-right' align='center' gap={8}>
                                <LangSelect lang={languagesId} setLang={(value:string)=>setLanguagesId(value)} />
                                <ButtonIcon icon={<LeftIcon className='font-20' />} onClick={()=>{
                                    prevProduct(product.productInfo.prevProductId)
                                }} />
                                {/* 下一个 */}
                                <ButtonIcon icon={<RightIcon className='font-20' />} onClick={()=>{
                                    nextProduct(product.productInfo.nextProductId)
                                }} />
                                <div style={{borderRight:"1px solid #d7dbe7",height:"36px"}}></div>
                                <DefaultButton text={"复制"} onClick={()=>{
                                    if(cookie.load("domain").domain_primary && cookie.load("domain").domain_primary!==""){
                                        window.open(`https://${cookie.load("domain").domain_primary}/products/${product.productInfo.handle.replace(new RegExp(" ","gm"),"-")}`)
                                        message.success('复制成功')
                                    }else if(cookie.load("domain").handle){
                                        window.open(`https://${cookie.load("domain").handle}${previewDomain}/products/${product.productInfo.handle.replace(new RegExp(" ","gm"),"-")}`)
                                        message.success('复制成功')
                                    }else{
                                        message.error("店铺缺少handle")
                                    }
                                }} />
                                <DefaultButton text={"预览"} onClick={()=>{
                                    if(cookie.load("domain").domain_primary && cookie.load("domain").domain_primary!==""){
                                        window.open(`https://${cookie.load("domain").domain_primary}/products/${product.productInfo.handle.replace(new RegExp(" ","gm"),"-")}`)
                                    }else if(cookie.load("domain").handle){
                                        window.open(`https://${cookie.load("domain").handle}${previewDomain}/products/${product.productInfo.handle.replace(new RegExp(" ","gm"),"-")}`)
                                    }else{
                                        message.error("店铺缺少handle")
                                    }
                                }} />
                                <ButtonDropdownSecondary text='分享' menu={{items:items}} trigger={['click']} />
                            </Flex>
                        </div>
                            <div className='mc-layout-main'>
                                <div className='mc-layout-content'>
                                    <ProductData form={form} />
                                    <ProductImg />
                                    <PriceOrTransaction />
                                    <StockCard form={form} />
                                    <MultipleStylesEdit onVariant={onVariant} setOnVariant={setOnVariant} style={style} setStyle={setStyle} />
                                    {onVariant && <ProductStyleListEdit style = {style} setStyle={setStyle} />}
                                </div>
                                <div className='mc-layout-extra'>
                                    <Relevance />
                                    <ProductSettingsCard />
                                    <TradingRecords />
                                    <Recommendation />
                                    <SEOCard />
                                    <Winnow />
                                    <PlatformHosting />
                                    <Subnumber />
                                    <ProtectionInformation />
                                    <ThirdPartyInfoCard />
                                    <CodTemplateCard />
                                    <ThemeTemplateCard />
                                </div>
                            </div>
                            <Divider />
                            <div className='mc-footer'>
                                <Flex gap={12}>
                                    <DangerButton text='将商品删除' onClick={delProduct} />
                                    {contextHolder}
                                    {product.productInfo.status !== "2"?
                                    <DefaultButton text='将商品存档' onClick={onFile} />
                                    :<DefaultButton text='将商品取消存档' onClick={noONFile} />}
                                </Flex>
                                <PrimaryButton loading={loading} text='更新' onClick={onFinish} />
                            </div>
                    </div>
                </div>
                {/* 编辑提示 */}
                {isOverlay && <Overlay status={loading} okText="更新" onExit={()=>{
                    history.push('/products/index')
                }} onSubmit={onFinish} />}
            </Scoped>}
        </div>
    )
}

export default observer(ProductDetail);

const Scoped = styled.div`
    .mc-layout-wrap {
        display: flex;
        justify-content: center;
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            .mc-header {
                color: rgb(36, 40, 51);
                font-size: 30px;
                height: 42px;
                font-weight: bold;
                margin: 8px 0px 24px;

                display: flex;
                justify-content: space-between;
                align-items: center;

                &-left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    &-secondary {
                        height: 32px;
                        width: 32px;
                        border: 1px solid #d7dbe7;
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover {
                            background-color: #eaf0ff;
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
                    height: 100%;
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
                gap: 20px;
            }

            &-extra {
                flex: 1;
                min-width: 285px;
                display: flex;
                flex-direction: column;
                gap: 20px;

                .ant-card {
                    background-color: #f7f8fb;
                }
            }

            .mc-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                
          
            }
        }
    }
    a {
        font-weight: 400;
    }
`;
