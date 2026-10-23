import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';
import { CountryType, MarketsInfoType } from "./marketsInfo";


interface PriceRule {
    baseCurrency: string;
    storeCurrency: string;
    useLocalCurrency: boolean;
    downAdjust:boolean;
    enableManualExchangeRate:boolean;
    manualExchangeRate:number;
    autoExchangeRate:number;
    autoExchangeUpdateTime:number;
    priceAdjustRate:number;
}

export interface ProductSku {
    skuId: string;
    productId: string;
    previewCurrency: string;
    previewCountryCode:string;
    originalPrice:number;
    price:number;
    originalPresentmentPrice:number;
    presentmentPrice:number;
}


export interface Product {
    productId: string;
    title: string;
    baseCurrency: string;
    excluded: boolean;
    single: boolean;
    originalPriceMin: number;
    originalPriceMax: number;
    priceMin: number;
    priceMax: number;
    shelves: boolean;
    skuList:ProductSku[];
    previewCountryCode:string;
    previewCurrency: string;
    originalPresentmentPrice:number;
    presentmentPrice:number;
    imageList:string[];

    skuId?:string;
}


interface CustomPrice {
    price: number;
    priceType: string;
}


export interface ProductPriceExchange {
    productId: string;
    customPriceList: CustomPrice[];
}

interface SkuPrice {
    skuId: string;
    customPriceList: CustomPrice[];
}

export interface SkuPriceExchange {
    productId: string;
    skuPriceList: SkuPrice[];
}

export interface MarketDetail {
    homeMarket: string;
    countryList:CountryType[],
}


class ProductAndPricing{
    constructor() {
        makeAutoObservable(this)
    }

    marketDetail:MarketsInfoType = {
        marketId: "",
        marketName: "",
        homeMarket: false,
        active: false,
        storeCurrency: "",
        domainLanguage: {
            mainDomain: "",
            marketLanguageList: [] 
        },
        deliveryStatistic: {
            deliveryPlanNum: 0
        },
        priceRuleInfo: {
            baseCurrency: "",
            autoExchangeRate: 0,
            autoExchangeUpdateTime: ""
        },
        countryList: [],
        urlPreview: []
    };
    
    setMarketDetail(detail:MarketsInfoType){
        this.marketDetail = detail;
    }

    priceRule:PriceRule = {
        baseCurrency: "",
        storeCurrency: "",
        useLocalCurrency: false,
        downAdjust: false,
        priceAdjustRate: 0,
        enableManualExchangeRate: false,
        manualExchangeRate: 0,
        autoExchangeRate: 0,
        autoExchangeUpdateTime: 0
    };

    setPriceRule(rule:PriceRule){
        this.priceRule = rule;
    }

    excludedNum:number = 0;
    setExcludedNum(count:number){
        this.excludedNum = count;
    }
    includedNum:number = 0;
    setIncludedNum(count:number){
        this.includedNum = count;
    }
    count:number = 0;
    setCount(count:number){
        this.count = count;
    }

    // 价格地区
    countryCode:string = "";
    setCountryCode(code:string){
        this.countryCode = code;
    }
    
    productList:Product[] = [];
    setProductList(list:Product[]){
        this.productList = list;
    }
    // 更新的产品价格列表
    productPriceExchangeList:ProductPriceExchange[] = [];
    // 更新SKU价格列表
    skuPriceExchangeList:SkuPriceExchange[] = [];
    // updateSkuPriceExchangeList(sku:ProductSku,price: number,priceType:string){
    //     // 1. 找 Product 节点
    //     const productIndex = this.skuPriceExchangeList.findIndex(item => item.productId === sku.productId);
    //     let skuPriceExchange;
    //     if (productIndex > -1) {
    //         skuPriceExchange = this.skuPriceExchangeList[productIndex];
    //     } else {
    //         skuPriceExchange = { productId: sku.productId, skuPriceList: [] };
    //     }
    //     // 2. 找 SKU 节点
    //     const skuIndex = skuPriceExchange.skuPriceList.findIndex(item => item.skuId === sku.skuId);
    //     let skuPrice;
    //     if (skuIndex > -1) {
    //         skuPrice = skuPriceExchange.skuPriceList[skuIndex];
    //     } else {
    //         skuPrice = { skuId: sku.skuId, customPriceList: [] };
    //     }
    //     // 3. 找 Price 节点并更新
    //     const priceIndex = skuPrice.customPriceList.findIndex(item => item.priceType === priceType);
    //     if (priceIndex > -1) {
    //         skuPrice.customPriceList[priceIndex].price = price;
    //     } else {
    //         skuPrice.customPriceList.push({ priceType: priceType, price });
    //     }
    //     // 4. 【关键】层层回写数据，保持 MobX 的响应性
    //     if (skuIndex === -1) {
    //         skuPriceExchange.skuPriceList.push(skuPrice);
    //     }
    //     if (productIndex === -1) {
    //         this.skuPriceExchangeList.push(skuPriceExchange);
    //     }
    // }
    // 更新产品价格列表
    updateProductPriceExchangeList(product:Product,price: number,priceType:string){
        // 1. 找 Product 节点
        const productIndex = this.productPriceExchangeList.findIndex(item => item.productId === product.productId);
        let productPriceExchange;
        if (productIndex > -1) {
            productPriceExchange = this.productPriceExchangeList[productIndex];
        } else {
            productPriceExchange = { productId: product.productId, customPriceList: [] };
        }
        // 2. 找 Price 节点并更新
        const priceIndex = productPriceExchange.customPriceList.findIndex(item => item.priceType === priceType);
        if (priceIndex > -1) {
            productPriceExchange.customPriceList[priceIndex].price = price;
        } else {
            productPriceExchange.customPriceList.push({ priceType: priceType, price });
        }
        // 3. 【关键】层层回写数据，保持 MobX 的响应性
        if (productIndex === -1) {
            this.productPriceExchangeList.push(productPriceExchange);
        }
    }
    updateSkuPriceExchangeList(skuList: ProductSku[], price: number, priceType: string) {
        // 0. 循环外建 Product 索引，避免每个 sku 都 findIndex 一遍
        const productIndexMap = new Map<string, number>();
        this.skuPriceExchangeList.forEach((item, index) => {
            productIndexMap.set(item.productId, index);
        });
        // 每个 product 一个 SKU 索引缓存，同一 product 的 sku 复用
        const skuIndexMapMap = new Map<string, Map<string, number>>();
        skuList.forEach((sku) => {
            const productId = sku.productId;

            // 1. 找 Product 节点
            const productIndex = productIndexMap.get(productId);
            let skuPriceExchange: SkuPriceExchange;
            if (productIndex !== undefined) {
                skuPriceExchange = this.skuPriceExchangeList[productIndex];
            } else {
                skuPriceExchange = { productId, skuPriceList: [] };
            }

            // 2. 找 SKU 节点（按 product 维度缓存索引）
            let skuIndexMap = skuIndexMapMap.get(productId);
            if (!skuIndexMap) {
                skuIndexMap = new Map<string, number>();
                skuPriceExchange.skuPriceList.forEach((item, index) => {
                    skuIndexMap!.set(item.skuId, index);
                });
                skuIndexMapMap.set(productId, skuIndexMap);
            }

            const skuIndex = skuIndexMap.get(sku.skuId);
            let skuPrice: SkuPrice;
            if (skuIndex !== undefined) {
                skuPrice = skuPriceExchange.skuPriceList[skuIndex];
            } else {
                skuPrice = { skuId: sku.skuId, customPriceList: [] };
            }

            // 3. 找 Price 节点并更新
            const priceIndex = skuPrice.customPriceList.findIndex(
                (item) => item.priceType === priceType
            );
            if (priceIndex > -1) {
                skuPrice.customPriceList[priceIndex].price = price;
            } else {
                skuPrice.customPriceList.push({ priceType, price });
            }

            // 4. 层层回写数据，保持 MobX 的响应性
            if (skuIndex === undefined) {
                skuPriceExchange.skuPriceList.push(skuPrice);
                skuIndexMap.set(sku.skuId, skuPriceExchange.skuPriceList.length - 1);
            }
            if (productIndex === undefined) {
                this.skuPriceExchangeList.push(skuPriceExchange);
                productIndexMap.set(productId, this.skuPriceExchangeList.length - 1);
            }
        });
    }

    // 刷新表格
    tableKey = 0;
    refreshTable(){
        this.tableKey++;
        this.productPriceExchangeList = [];
        this.skuPriceExchangeList = [];
    }

    reset(){
        this.tableKey = 0;
        this.productPriceExchangeList = [];
        this.skuPriceExchangeList = [];
        this.countryCode = "";
    }

}

export default new ProductAndPricing();
