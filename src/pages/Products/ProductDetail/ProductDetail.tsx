import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider,message, Select,SelectProps, UploadFile } from 'antd';
import styled from 'styled-components';
import { history } from '@umijs/max';
import newStore from '@/store/newStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import ProductDataEdit from './ProductDataEdit';
import ProductImgEdit from './ProductImgEdit';
import MultipleStylesEdit from './MultipleStylesEdit';
import ProductStyleListEdit2 from './ProductStyleListEdit2';
import ProductSettingsEdit from './ProductSettingsEdit';
import SEOEdit from './SEOEdit';
import ThirdPartyInfoEdit from './ThirdPartyInfoEdit';
import ThemeTemplateEdit from './ThemeTemplateEdit';
import TradingRecords from './TradingRecords';
import { getProductDetail,submitRenewalProduct } from '@/services/y2/api';
// import ProductDataCard from './ProductDataEdit';

import React from 'react';
import CustomsDeclarationEdit from './CustomsDeclarationEdit';
import StockEdit from './StockEdit';
import { valueType } from 'antd/es/statistic/utils';





// 更新状态
interface  ProductDetail {
    title:string;

    content1:string;

    content:string;
    // 商品图片/视频
    selectedImgList: UploadFile[];
    price:valueType;
    
    originPrice:valueType;
    specialprice:valueType;

    sku:string;
    ISBN:string;
    quantity:number;
    inventoryTracking:boolean;
    continueSell:boolean;
    status:string;

    weight:string;
    tag:string;
}




function newStores(res:ProductDetail){
    console.log("--------------")
    console.log(res)

    newStore.setTitle(res.title);

    newStore.resume = res.content1;
    newStore.desc = res.content;
    newStore.setPrice(res.price);
    // newStore.setOriginPrice(res.originPrice);
    newStore.setCostPrice(res.specialprice);
    newStore.setSKU(res.sku)
    newStore.setInventory(res.quantity)

    // console.log(typeof(res.status))

    newStore.setOnPutProduct(res.status == "1"?true:false)
    newStore.setWeight(res.weight)
    // 单位
    // weight_class_id  1
    // 标签
    newStore.setTag(res.tag)
    // 类型

}




function ProductDetail() {
    // const location = useLocation
    const [styleId, setStyleId] = useState('111');
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    // 
    const product_i:any = history.location.state;
    const fetchProductDetail = async () => {
        try {
            const response = await getProductDetail(product_i.productId, product_i.languages_id); // 参数
            if (response.data) {
                newStores(response.data)
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
        setStyleId(value);
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
                    <div className='mc-layout-main'> 
                        <div className='mc-layout-content'>
                            {/* {productDetail && <ProductDataEdit productDetail={productDetail} />} */}
                            <ProductDataEdit/>
                            <ProductImgEdit/>
                            {/* 价格 */}
                            <ProductStyleListEdit2/>
                            <StockEdit></StockEdit>
                            <CustomsDeclarationEdit></CustomsDeclarationEdit>
                            <MultipleStylesEdit onSecondInputChange={handleSecondInputChange} />
                            {/* {styleId && <ProductStyleListEdit styleId={styleId} />} */}
                        </div>
                        <div className='mc-layout-extra'>
                           <ProductSettingsEdit/>
                           <TradingRecords/>
                           <SEOEdit/>
                           <ThirdPartyInfoEdit/>
                           <ThemeTemplateEdit/>
                        </div>
                    </div>
                    <Divider />
                    <div className='mc-footer'>
                        <Button>删除该商品</Button>
                        <Button style={{marginLeft:-900}}>将商品存档</Button>
                        <Button type='primary' onClick={() => {
                            submitRenewalProduct().then(res => {
                                console.log(newStore)

                                // if (res.code === 0) message.success('okkk');
                                // else message.error('noooo');
                                // history.push('/products/index')
                            });
                        }}>更新</Button>
                    </div>
                </div>
            </div>
        </StyledDiv>
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