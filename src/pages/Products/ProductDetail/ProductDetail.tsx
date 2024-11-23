import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider,message, Modal, Popconfirm, Select,SelectProps, Spin, UploadFile } from 'antd';
// 引入
import { useEffect, useState } from 'react';
import ProductDataEdit from './ProductDataEdit';
import ProductImgEdit from './ProductImgEdit';
import ProductSettingsEdit from './ProductSettingsEdit';
import SEOEdit from './SEOEdit';
import ThirdPartyInfoEdit from './ThirdPartyInfoEdit';
import ThemeTemplateEdit from './ThemeTemplateEdit';
import TradingRecords from './TradingRecords';
import { deleteProduct, getProductDetail,submitRenewalProduct, upDateProductStatus } from '@/services/y2/api';
import React from 'react';
import CustomsDeclarationEdit from './CustomsDeclarationEdit';
import StockEdit from './StockEdit';
import { history } from '@umijs/max';
import oldStore from '@/store/oldStore';
import MultipleStylesEdit from './MultipleStylesEdit';
import ProductStyleListEdit from './ProductStyleListEdit';
import { styled } from 'styled-components';
import PriceOrTransactionCardEdit from './PriceOrTransactionCardEdit';
import ProductStyleList from '../ProductAdd/ProductStyleList';
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

// 删除
function productDel(id:any){
    console.log(id)
    return deleteProduct(id).then(res=>{
        if(res.code==0)message.success('删除成功');
        else message.error('noooo');
        history.push('/products/index')
    })
}


function ProductDetail() {
    // 获取商品详情
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    const product_i:any = history.location.state;
    // 提示
    const [modal, contextHolder] = Modal.useModal();
    const [style, setStyleId] = useState([]);

    // 商品存档
    const [productStatus,setProductStatus] = useState("");

    const [onFile,setOnFile] = useState(false);
    
    // 
    const [isLoading,setIsLoading] = useState(false);

    
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
    const fetchProductDetail = async () => {
        try {
            const response = await getProductDetail(product_i.productId, product_i.languages_id); // 参数
            if (response.data) {
                // console.log(response.data)
                setProductDetail(response.data);
                // oldStore.setProductInfo(response.data)
                oldStore.title=response.data.title
                oldStore.content=response.data.content
                oldStore.content1=response.data.content1
                oldStore.price=response.data.price
                oldStore.originPrice=response.data.originPrice
                oldStore.costPrice=response.data.cost_price
                oldStore.setISBN(response.data.barcode)
                oldStore.setSKU(response.data.sku)
                oldStore.inventory=response.data.quantity
                oldStore.SPU=response.data.SPU
                oldStore.weight=response.data.weight
                oldStore.manufactuer=response.data.manufactuer
                oldStore.tag=response.data.tag
                oldStore.productType=response.data.product_type
                // 图片  
                oldStore.setSelectedImgList(JSON.parse(response.data.additional_image))
                JSON.parse(response.data.additional_image).forEach((value:any,index:any) => {
                    oldStore.temp.set(index,value)
                });
                // 税费
                oldStore.setNeedTax(response.data.needTax == 0 ? false : true)
                // 
                oldStore.setInventoryTracking(response.data.inventoryTracking == 0 ? false : true)
                oldStore.setContinueSell(response.data.continueSell == 0 ? false : true)
                oldStore.setProductStatus(response.data.status)
                // 
                setProductStatus(response.data.status)
                oldStore.setHSCode(response.data.hs_code)
                oldStore.setNotion(response.data.shipping_country_id)
                oldStore.setLanguage(response.data.languages_id)
                // 
                oldStore.setProductId(response.data.id);
                // 旧属性
                oldStore.additional_image = response.data.additional_image
                oldStore.categorys = response.data.categorys
                oldStore.checked = response.data.checked
                oldStore.create_time = response.data.create_time
                oldStore.domain_id = response.data.domain_id
                oldStore.employee_id = response.data.employee_id
                oldStore.employee_realname = response.data.employee_realname
                oldStore.languages_name = response.data.languages_name
                oldStore.model = response.data.model
                oldStore.update_time = response.data.update_time
                oldStore.specialprice = response.data.specialprice
                oldStore.start_time = response.data.start_time
                oldStore.end_time = response.data.end_time
                oldStore.weight_class_id = response.data.weight_class_id
                oldStore.stock_status_id = response.data.stock_status_id
                oldStore.subtract = response.data.subtract
                oldStore.shipping = response.data.shipping
                oldStore.is_best = response.data.is_best
                oldStore.is_new = response.data.is_new
                oldStore.is_hot = response.data.is_hot
                oldStore.sort = response.data.sort
                oldStore.is_share = response.data.is_share
                oldStore.is_sys = response.data.is_sys
                oldStore.inquiry_status = response.data.inquiry_status
                oldStore.ad_waf_status = response.data.ad_waf_status
                oldStore.ad_product_id = response.data.ad_product_id
                oldStore.ad_product_url=response.data.ad_product_url
                oldStore.divided_status=response.data.divided_status
                oldStore.divided_country=response.data.divided_country
                oldStore.divided_url=response.data.divided_url
                oldStore.group_id=response.data.group_id
                oldStore.meta_title=response.data.meta_title
                oldStore.meta_keyword=response.data.meta_keyword
                oldStore.meta_description=response.data.meta_description
                oldStore.minimum=response.data.minimum
                oldStore.product_video = response.data.product_video
                // @observable ad_product_id = "0";
                // @observable ad_product_url = "";
                // @observable divided_status = 0;
                // @observable divided_country = "0";
                // @observable divided_url = "0";
                // @observable group_id = "0";
                // @observable meta_title = null;
                // @observable meta_keyword = null;
                // @observable meta_description = "";
                // @observable minimum = "0";
                oldStore.costPrice=response.data[0].costPrice
                oldStore.content1=response.data[0].content1
            } else {
            console.error('Invalid data format:', response);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };
  
    // 在组件加载时调用 fetchProductDetail
    useEffect(() => {
        oldStore.reset();
        fetchProductDetail();
    }, []);
    // 实现 onSecondInputChange 函数
    const handleSecondInputChange = (value: any) => {
        setStyleId(value);
        // 需要有多款式的时候才显示
    };
    
    const updateData = (status:string)=>{
        setProductStatus(status)
    }
    return (
        <div>
            {/* 弹窗 */}
            <Modal centered title={productStatus == "2"?"取消商品存档":"将商品存档"} open={onFile} onOk={onFileOk} onCancel={()=>{setOnFile(false)}}>
                {productStatus == "2"?<p>取消存档后商品将变为下架状态，您可以进行上架售卖</p>:<p>存档后销售渠道不再展示此商品，可通过商品管理进行查看</p>}
            </Modal>
        { productDetail && 
        <StyledDiv>
        <div className='mc-layout-wrap'>
        <div className="mc-layout">
            <div className="mc-header">
            <div className="mc-header-left">
                <div className="mc-header-left-secondary" onClick={() => {
                history.push('/products/index')
                }}>
                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                </div>
                <div className="mc-header-left-content">{productDetail?.title}</div>
                    </div>
                    <div className='mc-header-right'>
                        <Select className='selector' defaultValue="分享" />
                    </div>
                </div>
            <Spin spinning={isLoading}>
                <div className='mc-layout-main'> 
                    <div className='mc-layout-content'>
                        <ProductDataEdit/>
                        {/* <ProductDataEdit productData={{title:productDetail?.title,content:productDetail?.content,content1:productDetail?.content1}} /> */}
                        <ProductImgEdit/>
                        {/* 价格 */}
                        <PriceOrTransactionCardEdit />
                        <StockEdit />
                        <CustomsDeclarationEdit />
                        <MultipleStylesEdit onSecondInputChange={handleSecondInputChange} />
                        {/* {style.length>0 && <ProductStyleList styleId={styleId} />}  */}
                    </div>
                    <div className='mc-layout-extra'>
                        <ProductSettingsEdit productStatus={productStatus} upProductStatus={updateData} />
                        <TradingRecords/>
                        <SEOEdit/>
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
                    }}>将商品存档</Button>:<Button style={{marginLeft:"-880px"}} onClick={()=>{
                        setOnFile(true);
                    }}>将商品取消存档</Button>}
                    <Button type='primary' onClick={() => {
                        setIsLoading(true)
                        oldStore.setSelectedImgList(Array.from(oldStore.temp.values()))
                        console.log(oldStore)
                        oldStore.updateProduct().then(res => {
                            if (res.code === 0) message.success('修改内容已更新');
                            // history.push('/products/index')
                            setIsLoading(false);
                        });
                    }}>更新</Button>
                </div>
            </Spin> 
                </div>
        </div>
        </StyledDiv>
        }
        </div>
    )
}

export default ProductDetail;

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
                    width: 70px;
                    > .selector {
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