import { action, makeAutoObservable } from "mobx";

interface ProductType {
  product_video: string;
  meta_description: string;
  meta_title: string;
  meta_keyword: string;
  product_url: string;
  nextProductId: string;
  prevProductId: string;
  partsWarehouse: string;
  categoryIds: string;
  shipping: number;
  status: string;
  ad_waf_status: string;
  template_id: string | undefined;
  diversion: any[];
  is_share: number;
  is_sys: number;
  hosted_status: number;
  alliance_status: number;
  is_new: number;
  is_best: number;
  is_hot: number;
  is_home: number;
  is_bind: number;
  weight_class_id: number;
  platform_category_id: string;
  productCategories: string;
  tag: string;
  languages_id: string;
  manufactuer: string;
  weight: number;
  spu: string;
  continueSell: number;
  inventoryTracking: number;
  sales_count: string;
  minimum: string;
  quantity: string;
  sku: string;
  barcode: string;
  model: string;
  inquiry_status: number;
  needTax: number | undefined;
  id: string;
  title: string;
  end_time: string | undefined;
  start_time: string | undefined;
  cost_price: string;
  price: string;
  specialprice: string;
  origin_price:string;
  product_image: string;
  additional_image: string[];
  content: string;
  content1: string;
}

class Product{
    
    constructor() {
      makeAutoObservable(this)
    }

    // 初始化产品数据结构
    getInitProduct() {
      return {
        id: "",
        title: "",
        content1: "",
        content: "",
        end_time: "",
        start_time: "",
        cost_price: "1000",
        specialprice: "1000",
        origin_price: "",
        price: "1000",
        product_image: "",
        additional_image: [],
        needTax: 0,
        model: "",
        inquiry_status: 0,
        quantity: "1000",
        sku: "",
        barcode: "",
        inventoryTracking: 0,
        sales_count: "1000",
        minimum: "1",
        continueSell: 0,
        tag: "",
        weight: 0,
        languages_id: "2",
        manufactuer: "",
        spu: "",
        weight_class_id: 1,
        platform_category_id: "",
        productCategories: "",
        is_home: 0,
        is_bind: 1,
        status: "1",
        ad_waf_status: "",
        template_id: "0",
        diversion: [],
        is_share: 0,
        is_sys: 0,
        hosted_status: 0,
        alliance_status: 0,
        is_new: 0,
        is_best: 0,
        is_hot: 0,
        shipping: 0,
        categoryIds: "",
        partsWarehouse: "",
        meta_description: "",
        meta_title: "",
        meta_keyword: "",
        product_url: "",
        nextProductId: "",
        prevProductId: "",
        product_video: ""
      } as ProductType;
    }

    // 产品
    productInfo:ProductType = this.getInitProduct();

    setProductInfo(res:ProductType){
      this.productInfo = res;
    }

    // 属性
    attributes:any = []

    setAttributes(res: any) {
      this.attributes = res
    }
   
    // 状态为9的属性  --- 要删除的属性
    tempAttributes = []
    setTempAttributes(res: any) {
      this.tempAttributes = res
    }

    // 变体
    variants: any = []
    setVariants(res: any) {
      this.variants = res
    }
    // 状态为9的变体  --- 要删除的变体
    tempVariants = []

    setTempVariants(res:any){
      this.tempVariants = res
    }

    // 重置状态
    reset() {
      this.productInfo = {...this.getInitProduct()};
      this.attributes = [];
      this.tempAttributes = [];
      this.variants = [];
      this.tempVariants = [];
    }
    
}

export default new Product();