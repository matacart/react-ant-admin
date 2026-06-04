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

  cod_languages_id: string;
  cod_currency: string;
  cod_is_711_enabled: number;
  cod_is_family_enabled: number;

  cod_fb_pix_id:string;
  cod_gg_pix_id:string;
  cod_tk_pix_id:string;

  is_share: string;
  is_sys: string;
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
  inventory_policy: string;
  inventory_management:string;
  subtract:string;
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
  specialprice: string;
  price: string;
  original_price:string;
  cost_price: string;
  product_image: string;
  additional_image: string[];
  content: string;
  content1: string;
  handle:string;
}


export interface attributeType {
    id: string;
    option_id: string;
    option_name: string;
    option_values_name: string;
    option_values_id: string;
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
        product_image: "",
        additional_image: [],
        specialprice: "1000",
        end_time: "",
        start_time: "",
        price: "1000",
        original_price: "1000",
        cost_price: "1000",
        needTax: 0,
        inquiry_status: 0,
        model: "",
        barcode: "",
        sku: "",
        quantity: "1000",
        minimum: "1",
        sales_count: "1000",
        inventory_management: "0",
        inventory_policy: "deny",
        subtract:"0",
        // 
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
        cod_languages_id:"",
        cod_currency:"",
        cod_is_711_enabled:0,
        cod_is_family_enabled:0,
        cod_fb_pix_id:"",
        cod_gg_pix_id:"",
        cod_tk_pix_id:"",

        is_share: "0",
        is_sys: "0",
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
        product_video: "",
        handle:"",
      };
    }

    // 产品
    productInfo:ProductType = this.getInitProduct();

    setProductInfo(res:ProductType){
      this.productInfo = res;
    }

    // 第三方数据
    diversion:any={}
    setDiversion(res:any){
      this.diversion = res
    }


    // 属性
    attributes:attributeType[] = []
    setAttributes(res: attributeType[]) {
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
      this.diversion = {};
      this.attributes = [];
      this.tempAttributes = [];
      this.variants = [];
      this.tempVariants = [];
    }
    
}

export default new Product();