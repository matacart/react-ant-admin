import { ArrowLeftOutlined, ExclamationCircleOutlined, FacebookFilled, LeftOutlined, RightOutlined, YahooFilled } from '@ant-design/icons';
import { Button, Divider,Dropdown,MenuProps,message, Modal, Popconfirm, Select,SelectProps, Spin, UploadFile } from 'antd';
// 引入
import { useEffect, useState } from 'react';
import ProductDataEdit from './ProductDataEdit';
import ProductImgEdit from './ProductImgEdit';
import ProductSettingsEdit from './ProductSettingsEdit';
import ThirdPartyInfoEdit from './ThirdPartyInfoEdit';
import ThemeTemplateEdit from './ThemeTemplateEdit';
import TradingRecords from './TradingRecords';
import { deleteProduct, getPlatformCategorySelect, getProductDetail, upDateProductStatus } from '@/services/y2/api';
import React from 'react';
import CustomsDeclarationEdit from './CustomsDeclarationEdit';
import StockEdit from './StockEdit';
import oldStore from '@/store/oldStore';
import MultipleStylesEdit from './MultipleStylesEdit';
import ProductStyleListEdit from './ProductStyleListEdit';
import { styled } from 'styled-components';
import PriceOrTransactionCardEdit from './PriceOrTransactionCardEdit';
import ProductStyleList from '../ProductAdd/ProductStyleList';
import ProductSeoEdit from './ProductSeoEdit';
import { observer } from 'mobx-react-lite';
import Winnow from './Winnow';
import PlatformHosting from './PlatformHosting';
import Subnumber from './Subnumber';
import { useLocation, useNavigate } from 'umi'
import cookie from 'react-cookies';
import { history } from '@umijs/max';
import ProtectionInformationEdit from './ProtectionInformationEdit';
import RecommendationEdit from './RecommendationEdit';
import RelevanceEdit from './RelevanceEdit';
import copy from 'copy-to-clipboard';
// import { history } from '@umijs/max';


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
    // 获取商品详情
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

    const navigate = useNavigate(); // 使用 useNavigate 钩子
    // const product:any = useLocation().state
    const params = new URL(location.href).searchParams
    let productId = params.get("productId")
    let languageId = params.get("languagesId")
    // 提示
    const [modal, contextHolder] = Modal.useModal();
    const [style, setStyle] = useState([]);
    // 商品存档
    const [productStatus,setProductStatus] = useState("");

    const [onFile,setOnFile] = useState(false);
    
    const [isLoading,setIsLoading] = useState(false);
    const [saveLoading,setSaveLoading] = useState(false);

    const [language,setLanguage] = useState("");

    // 分享链接
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/share_channel/?type=reshare&link=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%3Futm_source%3DFacebook%26utm_medium%3Dproduct-links%26utm_content%3Dweb&app_id=966242223397117&source_surface=external_reshare&display&hashtag"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareFacebook.97f9a.svg"/><span style={{marginLeft:"8px"}}>Facebook</span></div>
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://twitter.com/share?text="+oldStore.title.trim()+"%26url%3Dhttps%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%26utm_source%3DTwitter%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareTwitter.f35cb.svg"/><span style={{marginLeft:"8px"}}>Twitter</span></div>
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://social-plugins.line.me/lineit/share?url=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%26utm_source%3DLine%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareLine.8cbc7.svg"/><span style={{marginLeft:"8px"}}>Line</span></div>
                </a>
            ),
        },
        {
            key: '4',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://api.whatsapp.com/send/?text=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%26utm_source%3DWhatsapp%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareWhatsapp.60743.svg"/><span style={{marginLeft:"8px"}}>Whatsapp</span></div>
              </a>
            ),
        },
        {
            key: '5',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%26utm_source%3DTumblr%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareTumblr.b0ed6.svg"/><span style={{marginLeft:"8px"}}>Tumblr</span></div>
              </a>
            ),
        },
        {
            key: '6',
            label: (
                <a target="_blank" rel="noopener noreferrer" href={"https://pinterest.com/pin/create/button/?url=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"&media=undefined&description="+oldStore.title+"&utm_source%3DPinterest%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                    <div style={{display:"flex",alignItems:"center"}}><img src="/icons/SharePinterest.e96e2.svg"/><span style={{marginLeft:"8px"}}>Pinterest</span></div>
                </a>
            ),
        },
        {
            key: '7',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://www.reddit.com/submit?url=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%3Futm_source%3DReddit%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareReddit.d1395.svg"/><span style={{marginLeft:"8px"}}>Reddit</span></div>
              </a>
            ),
        },
        {
            key: '8',
            label: (
              <a target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/shareArticle?url=https%3A%2F%2F"+cookie.load("domain").domainName+"%2F"+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`+"%3Futm_source%3DLinkedin%26utm_medium%3Dproduct-links%26utm_content%3Dweb"}>
                <div style={{display:"flex",alignItems:"center"}}><img src="/icons/ShareLinkedin.4a174.svg"/><span style={{marginLeft:"8px"}}>Linkedin</span></div>
              </a>
            ),
        },
    ];

    // 变体---控制变体组合
    const [onVariant,setOnVariant] = useState(false);

    // 删除
    function productDel(id:any){
        return deleteProduct(id).then(res=>{
            if(res.code==0)message.success('删除成功');
            else message.error('noooo');
            navigate('/products/index')
        })
    }
    
    const onFileOk = () => {
        setOnFile(false);
        console.log(oldStore)
        if(productStatus == "2"){
            setProductStatus('0');
            oldStore.setProductStatus('0');
            upDateProductStatus(oldStore.productId, '0').then(res=>{
                if(res.code == 0){
                    message.success('取消存档成功');
                }else{
                    message.error('取消存档失败');
                }
            })
        }else{
            setProductStatus('2');
            oldStore.setProductStatus('2');
            upDateProductStatus(oldStore.productId, '2').then(res=>{
                if(res.code == 0){
                    message.success('存档成功');
                }else{
                    message.error('存档失败');
                }
            })
        }
    };

    const confirm = () => {
        modal.confirm({
            title: "确定删除吗？",
            centered:true,
            icon: <ExclamationCircleOutlined />,
            content: '删除后将不能找回请谨慎操作！',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                productDel(oldStore.productId)
            }
        });
    };
    const fetchProductDetail = async (language?:string) => {
        setIsLoading(true)
        try {
            const lang = language !== "" ? language : languageId;
            const response = await getProductDetail(productId == null?"":productId,lang ?? ''); // 参数
            setProductDetail(response.data);
            if(response.data){
                setProductDetail(response.data);
                oldStore.productInit(response.data);
            } else {
                console.error('Invalid data format:', response);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
        setIsLoading(false)
    };
    // 在组件加载时调用 fetchProductDetail
    useEffect(() => {
        fetchProductDetail();

        // console.log(product)
    },[productId]);
    // 实现 onSecondInputChange 函数
    // const handleSecondInputChange = (value: any) => {
    //     setStyle(value);
    //     console.log(value)
    //     // 需要有多款式的时候才显示
    // };

    // 更新商品状态 -- 存档
    const updateData = (status:string)=>{
        setProductStatus(status)
    }

    const prevProduct=(id:string)=>{
        if(id==="" || id===null){
            message.error("这是第一个商品")
        }else{
            // navigate('/products/productId/edit?',language:oldStore.language}})
            history.push(`/products/productId/edit?productId=`+id+`&languagesId=`+oldStore.language)
        }
    }
    const nextProduct=(id:string)=>{
        // setIsLoading(true)
        if(id==="" || id===null){
            message.error("这是最后一个商品")
        }else{
            // navigate('/products/productId/edit',{state:{productId:id,language:oldStore.language}})
            history.push(`/products/productId/edit?productId=`+id+`&languagesId=`+oldStore.language)
        }
    }
    return (
        <div>
            {/* 弹窗 */}
            <Modal centered title={productStatus == "2"?"取消商品存档":"将商品存档"} open={onFile} onOk={onFileOk} onCancel={()=>{setOnFile(false)}}>
                {productStatus == "2"?<p>取消存档后商品将变为下架状态，您可以进行上架售卖</p>:<p>存档后销售渠道不再展示此商品，可通过商品管理进行查看</p>}
            </Modal>
            { productDetail && <StyledDiv>
                <Spin spinning={isLoading}>
                    <div className='mc-layout-wrap'>
                        <div className="mc-layout">
                            <div className="mc-header">
                                <div className="mc-header-left">
                                    <div className="mc-header-left-secondary" onClick={() => {
                                        navigate('/products/index')
                                    }}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                    </div>
                                    <div className="mc-header-left-content">{oldStore.title}</div>
                                </div>
                                <div className='mc-header-right'>
                                    <Button size="large" onClick={()=>{
                                        prevProduct(oldStore.prevProductId)
                                    }} autoInsertSpace={false}>
                                        <LeftOutlined />
                                    </Button>
                                    <Button size="large" onClick={()=>{
                                        nextProduct(oldStore.nextProductId)
                                    }} autoInsertSpace={false}>
                                        <RightOutlined />
                                    </Button>
                                    {/* 分 */}
                                    <div style={{borderRight:"1px solid #d7dbe7",height:"36px",marginRight:'8px'}}></div>
                                    <Button onClick={()=>{
                                        copy(`https://`+cookie.load("domain").domainName+`/`+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`)
                                        message.success('复制成功')
                                    }} size="large" autoInsertSpace={false}>
                                        复制
                                    </Button>
                                    <Button onClick={()=>{
                                        window.open(`https://`+cookie.load("domain").domainName+`/`+oldStore.title.replace(new RegExp(" ","gm"),"-")+`-p`+oldStore.productId+`.html`)
                                    }} size="large" autoInsertSpace={false}>
                                        预览
                                    </Button>
                                    <Dropdown menu={{ items }} placement="bottom">
                                        <Button>分享</Button>
                                    </Dropdown>
                                </div>
                            </div>
                                <div className='mc-layout-main'>
                                    <div className='mc-layout-content'>
                                        <ProductDataEdit setLanguage={setLanguage} />
                                        {/* <ProductDataEdit productData={{title:productDetail?.title,content:productDetail?.content,content1:productDetail?.content1}} /> */}
                                        <ProductImgEdit/>
                                        {/* 价格 */}
                                        <PriceOrTransactionCardEdit />
                                        <StockEdit />
                                        <CustomsDeclarationEdit />
                                        <MultipleStylesEdit onVariant={onVariant} setOnVariant={setOnVariant} style = {style} setStyle={setStyle} />
                                        {onVariant && <ProductStyleListEdit style = {style} setStyle={setStyle} />}
                                    </div>
                                    <div className='mc-layout-extra'>
                                        <ProductSettingsEdit productStatus={productStatus} upProductStatus={updateData} />
                                        <TradingRecords/>
                                        <RelevanceEdit />
                                        {/* <InquiryEdit /> */}
                                        <RecommendationEdit />
                                        <ProductSeoEdit/>
                                        <Winnow />
                                        <PlatformHosting />
                                        <Subnumber />
                                        <ProtectionInformationEdit />
                                        <ThirdPartyInfoEdit/>
                                        <ThemeTemplateEdit/>
                                    </div>
                                </div>
                                <Divider />
                                <div className='mc-footer'>
                                    <Button type="primary" danger onClick={confirm}>将商品删除</Button>
                                    {contextHolder}
                                    {productStatus !== "2"?<Button style={{marginLeft:"-900px"}} onClick={()=>{
                                        setOnFile(true);
                                    }}>将商品存档</Button>:<Button loading={saveLoading} style={{marginLeft:"-880px"}} onClick={()=>{
                                        setOnFile(true);
                                    }}>将商品取消存档</Button>}
                                    <Button type='primary' onClick={async () => {
                                        // console.log(Array.from(oldStore.attributes))
                                        await oldStore.setSelectedImgList(Array.from(oldStore.temp.values()))
                                        // console.log(oldStore)
                                        // console.log(JSON.stringify([...oldStore.variants,...oldStore.removeVariantData]))
                                        setIsLoading(true)
                                        if(oldStore.partsWarehouse == "0"){
                                            oldStore.updateProduct().then(async res => {
                                                if (res.code === 0) message.success('修改内容已更新');
                                                // await globalStore.sleep(2000)
                                                // history.push('/products/index')
                                                
                                                setIsLoading(false);
                                            });
                                        }else{
                                            message.error('抱歉！非品库管理员，平台产品不可编辑！');
                                            setIsLoading(false);
                                        }
                                    }}>更新</Button>
                                </div>
                        </div>
                    </div>
                </Spin> 
            </StyledDiv>
            }
        </div>
    )
}

export default observer(ProductDetail);

const StyledDiv = styled.div`
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
                    display: flex;
                    align-items: center;
                    /* width: 70px; */
                    > .selector {
                        height: 36px;
                    }
                    Button{
                        height: 36px;
                        margin-right: 8px;
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

    /* .b{
        display: flex;
        height: 100px;
    } */

    a {
        font-weight: 400;
    }
`;




function setStyleId(value: any) {
    throw new Error('Function not implemented.');
}
// function newStores(res:ProductDetail){
//     console.log("--------------")
//     console.log(res)
//     oldStore.setTitle(res.title);

//     oldStore.resume = res.content1;
//     oldStore.desc = res.content;
//     oldStore.setPrice(res.price);
//     // newStore.setOriginPrice(res.originPrice);
//     oldStore.setCostPrice(res.specialprice);
//     oldStore.setSKU(res.sku)
//     oldStore.setInventory(res.quantity)

//     // console.log(typeof(res.status))

//     oldStore.setOnPutProduct(res.status == "1"?true:false)
//     oldStore.setWeight(res.weight)
//     // 单位
//     // weight_class_id  1
//     // 标签
//     oldStore.setTag(res.tag)
//     // 类型

//     console.log(oldStore)

// }