import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider,message, Modal, Popconfirm, Select,SelectProps, Spin, UploadFile } from 'antd';
import styled from 'styled-components';
// 引入
import { useState } from 'react';
import ProductDataEdit from './ProductDataEdit';
import ProductImgEdit from './ProductImgEdit';
import ProductStyleListEdit2 from './ProductStyleListEdit2';
// import ProductSettingsEdit from './ProductSettingsEdit';
import ProductSettingsEdit from './ProductSettingsEdit';
import SEOEdit from './SEOEdit';
import ThirdPartyInfoEdit from './ThirdPartyInfoEdit';
import ThemeTemplateEdit from './ThemeTemplateEdit';
import TradingRecords from './TradingRecords';
import { deleteProduct, getProductDetail,submitRenewalProduct } from '@/services/y2/api';
import React from 'react';
import CustomsDeclarationEdit from './CustomsDeclarationEdit';
import StockEdit from './StockEdit';
import { history } from '@umijs/max';
import oldStore from '@/store/oldStore';
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

// 
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
    const confirm = () => {
        modal.confirm({
            title: "确定删除吗？",
            icon: <ExclamationCircleOutlined />,
            content: '删除后将不能找回请谨慎操作！',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                productDel(oldStore.id)
            }
        });
    };

  
    const fetchProductDetail = async () => {
        try {
            console.log(product_i.productId)
            console.log(product_i.languages_id)
            const response = await getProductDetail(product_i.productId, product_i.languages_id); // 参数
            if (response.data) {
                console.log(response.data)
                setProductDetail(response.data);
                console.log(response.data)
                oldStore.title=response.data.model
                oldStore.content=response.data.content
                oldStore.content1=response.data.content1
                oldStore.price=response.data.price
                oldStore.originPrice=response.data.originPrice
                oldStore.costPrice=response.data.costPrice
                oldStore.setISBN(response.data.ISBN)
                oldStore.setSKU(response.data.sku)
                oldStore.inventory=response.data.quantity
                oldStore.SPU=response.data.SPU
                oldStore.weight=response.data.weight
                oldStore.manufactuer=response.data.manufactuer
                oldStore.tag=response.data.tag
                oldStore.productType=response.data.product_type
                // oldStore.setSelectedImgList(
                oldStore.setSelectedImgList(response.data.additional_image)
                // 税费
                oldStore.setNeedTax(response.data.needTax == 0 ? false : true)
                // 
                oldStore.setInventoryTracking(response.data.inventoryTracking == 0 ? false : true)
                oldStore.setContinueSell(response.data.continueSell == 0 ? false : true)
                oldStore.setOnPutProduct(response.data.status === 0 ? false : true)
                oldStore.setHSCode(response.data.HSCode)
                oldStore.setNotion(response.data.notion)
                // 
                // 旧属性
                oldStore.additional_image = response.data.additional_image
                oldStore.categorys = response.data.categorys
                oldStore.checked = response.data.checked
                oldStore.create_time = response.data.create_time
                oldStore.domain_id = response.data.domain_id
                oldStore.employee_id = response.data.employee_id
                oldStore.employee_realname = response.data.employee_realname
                oldStore.id = response.data.id
                oldStore.languages_name = response.data.languages_name
                oldStore.model = response.data.model
                oldStore.update_time = response.data.update_time
                oldStore.specialprice = response.data.specialprice
                oldStore.start_time = response.data.start_time
                oldStore.end_time = response.data.end_time
                oldStore.weight_class_id = response.data.weight_class_id
                oldStore.languages_id = response.data.languages_id
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
                // oldStore.costPrice=response.data[0].costPrice
                // oldStore.content1=response.data[0].content1
                console.log(oldStore)
            } else {
            console.error('Invalid data format:', response);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };
  
    // 在组件加载时调用 fetchProductDetail
    React.useEffect(() => {
      fetchProductDetail();
      
    }, []);
    
    // 实现 onSecondInputChange 函数
    const handleSecondInputChange = (value: string) => {
        // setStyleId(value);
        // 需要有多款式的时候才显示
    };

  
    return (
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
                    {/*  */}
                    {/* <Spin> */}
                        <div className='mc-layout-main'> 
                            <div className='mc-layout-content'>
                                {productDetail && <ProductDataEdit/>}
                                {/* <ProductDataEdit productData={{title:productDetail?.title,content:productDetail?.content,content1:productDetail?.content1}} /> */}
                                {productDetail && <ProductImgEdit/>}
                                {/* 价格 */}
                                {productDetail && <ProductStyleListEdit2 productDetail={productDetail}/>}
                                {productDetail &&<StockEdit></StockEdit>}
                                {productDetail && <CustomsDeclarationEdit />}
                                {/* <MultipleStylesEdit onSecondInputChange={handleSecondInputChange} /> */}
                                {/* {styleId && <ProductStyleListEdit styleId={styleId} />} */}
                            </div>
                            <div className='mc-layout-extra'>
                                {productDetail && <ProductSettingsEdit/>}
                            
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
                            <Button style={{marginLeft:-900}}>将商品存档</Button>
                            <Button type='primary' onClick={() => {
                            //     let temp:any = [];
                            //     oldStore.imgTempList.forEach((r:any)=>{
                            //     console.log(r)
                            //     if(r.url){
                            //         temp.push(r.url)
                            //     }
                            //     if(r.thumbUrl){
                            //         console.log(r.thumbUrl.split(",")[1])
                            //         console.log(atob(r.thumbUrl.split(",")[1]))
                            //     }
                            //    })
                            //    oldStore.setSelectedImgList(temp)
                                console.log(oldStore)
                                submitRenewalProduct(oldStore).then(res => {
                                // if (res.code === 0) message.success('okkk');
                                // else message.error('noooo');
                                // history.push('/products/index')
                                console.log(res)
                                });
                            }}>更新</Button>
                        </div>
                    {/* </Spin> */}
                </div>
            </div>
        </StyledDiv>
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