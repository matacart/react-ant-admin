import { addProduct, addTags, getProductDetail, submitRenewalProduct } from "@/services/y2/api";
import { message, SelectProps, UploadFile } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";

// 引入mobx
// https://blog.csdn.net/qq_53123067/article/details/129707090?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171694792616800197099744%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171694792616800197099744&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-129707090-null-null.142^v100^pc_search_result_base9&utm_term=mobx&spm=1018.2226.3001.4187

// interface ImageItem {
//   url?: string;
// }

 class oldStore {

  constructor() {
    makeAutoObservable(this)
  }
  
  // 产品id
  @observable productId = "";

  nextProductId = ""

  setNextProductId = (value:string) => {
    this.nextProductId = value;
  }

  prevProductId = ""

  setPrevProductId = (value: string) => {
    this.prevProductId = value;
  }
  @action setProductId = (productId: string) => {
    this.productId = productId;
    
  }
  // 
  productInfo = {}
  setProductInfo = (res: object) => {
    this.productInfo = res;
  }

  // 旧属性  兼容旧系统
  @observable categorys = [];
  @observable checked = 0;
  @observable create_time = '';
  @observable domain_id = 0;
  @observable employee_id = 0;
  @observable employee_realname = '';
  @observable languages_name = "";
  @observable update_time = "";
  @observable specialprice = "";
  @observable start_time = "";
  @observable end_time = "";
  @observable stock_status_id = "";
  @observable subtract = 0;
  @observable is_best = 0;
  @observable is_new = 0
  @observable is_hot = 0
  @observable sort = 0;
  @observable is_share = 0;
  @observable is_sys = 0;
  @observable inquiry_status = 0;
  @observable ad_waf_status = "0";
  @observable ad_product_id = "0";
  @observable ad_product_url = "";
  @observable divided_status = 0;
  @observable divided_country = "0";
  @observable divided_url = "0";
  @observable group_id = "0";
  @observable minimum = "0";
  @observable sales_count = "";
  @observable product_video = "";
  // @observable imgTempList:any = [];
  // @action setImgTempList = (res: any) => {
  //   this.imgTempList = res;
  // }
  // 商品信息
  @observable model = "";
  @action setModel = (model: string) => {
    this.model = model;
  }
  
  @observable language = '2';
  @action setLanguage = (language: string) => {
    this.language = language;
  }
  // 商品图片/视频  
  @observable selectedImgList: UploadFile[] = [];
  // -- 封面
  @observable additionalImage:UploadFile[] = [];

  @observable temp = new Map();
  // 商品标题 
  @observable title = '';
  @action setTitle = (title: string) => {
    this.title = title;
  }
  // 商品描述
  @observable content = '';
  @action setContent = (content: string) => {
    this.content = content
  }
  // 商品摘要
  @observable content1 = '';
  @action setContent1 = (value: string) => {
    this.content1 = value
  }
  // @action setContent1 = (content1: string) => {
  //   this.content = content1
  // }
  // 操作选中的图片数组
  @action getSelectedImgList = () => {
    return this.selectedImgList;
  }
  @action addSelectedImgList = (img: any) => {
    this.selectedImgList.push(img);
  }
  @action deleteSelectedImgList = (img: any) => {
    let index = this.selectedImgList.indexOf(img);
    this.selectedImgList.splice(index, 1);
  }
  @action setSelectedImgList = (imgList: any) => {
    this.selectedImgList = imgList;
  }
  @action getCountOfSelectedImgList = (img: any) => {
    let index = this.selectedImgList.indexOf(img);
    return index > -1 ? index + 1 : 0;
  }
  @action isIncludeSelectedImgList = (img: any) => {
    return this.selectedImgList.indexOf(img) > -1;
  }
  // 价格/交易
  // 售价
  @observable price: number|undefined = 1000;
  // 原价
  @observable originPrice: number|undefined = 0;
  // 成本价
  @observable costPrice: number|undefined = 1000;
  // 需要收取税费
  @observable needTax: boolean = false;  //0

  @action setPrice = (value: number|undefined) => {
    this.price = value;
  }
  @action setOriginPrice = (value: number|undefined) => {
    this.originPrice = value;
  }
  @action setCostPrice = (value: number|undefined) => {
    this.costPrice = value;
  }
  // 税费
  @action setNeedTax = (value: boolean) => {
    this.needTax = value;
  }
  // 库存
  // SKU
  @observable SKU: string = '';
  // 条码
  @observable ISBN: string = '';
  // 库存数量
  @observable inventory: number = 0;
  // 库存追踪
  @observable inventoryTracking: boolean = false;

  // 缺货后继续销售
  @observable continueSell: Boolean = false;

  @action setSKU = (value: string) => {
    this.SKU = value;
  }
  @action setISBN = (value: string) => {
    this.ISBN = value;
  };

  @action setInventory = (value: number) => {
    this.inventory = value;
  }
  
  @action setInventoryTracking = (value: boolean) => {
    this.inventoryTracking = value;
  }

  @action setContinueSell = (value: boolean) => {
    this.continueSell = value;
  }

  // 海关信息
  // 发货国家/地区
  @observable notion: string = '';
  // HS(协调制度)代码
  @observable HSCode: string = '';

  @action setNotion = (value: string) => {
    this.notion = value;
  }
  @action setHSCode = (value: string) => {
    this.HSCode = value;
  }

  // 多款式
  @observable multipleStyles: boolean = false;
  // 设置 multipleStyles  
  @action setMultipleStyles(value: boolean) {
    this.multipleStyles = value;
  }

  // 商品设置
  // 上架商品 -- status
  @observable productStatus = "";
  // SPU
  @observable SPU: string = '';
  // 重量
  @observable weight: string = '';
  // 商品厂商
  @observable manufactuer: string = '';
  // 标签
  @observable tags = '';
  // 商品类型
  @observable productType = '';
  // 商品类型
  @observable productCategories = '';
  
  // 重量单位
  @observable weightClassId = "1";

  // 品库
  partsWarehouse = "0"

  setPartsWarehouse(value: string) {
    this.partsWarehouse = value;
  }
  // 设置 onPutProduct  
  @action setProductStatus(value: string) {
    this.productStatus = value;
  }
  // 发货
  @observable isShipping = true;
  @action setIsShipping(value: boolean) {
    this.isShipping = value;
  }
  // 设置 SPU  
  @action setSPU(value: string) {
    this.SPU = value;
  }

  // 设置 weight  
  @action setWeight(value: string) {
    this.weight = value;
  }
  @action setWeightClassId(value: string) {
    this.weightClassId = value;
  }


  // 设置 manufactuer  
  @action setManufactuer(value: string) {
    this.manufactuer = value;
    // console.log(value)
  }

  // 设置 tag 
  @action setTags(value: string) {
    this.tags = value;
  }

  // 设置 productType（这里假设你可以传入任何类型的数组）  
  @action setProductType(value: string) {
    this.productType = value;
  }
  @action setProductCategories(value: string) {
    this.productCategories = value;
  }


  // seo设置
  @observable metaTitle = "";
  @observable metaKeyword = "";
  @observable metaDescription = "";
  @observable productUrl = "";


  @action setMetaTitle(value: string) {
    this.metaTitle = value;
  }

  @action setMetaKeyword(value: string) {
    this.metaKeyword = value;
  }
  @action setMetaDescription(value: string) {
    this.metaDescription = value;
  }
  @action setProductUrl(value: string) {
    this.productUrl = value;
  }
  
  // 联盟托管
  allianceStatus = "0"
  setAllianceStatus(value:string){
    this.allianceStatus = value
  }
  // 商品托管
  hostedStatus = "0"
  setHostedStatus(value:string){
    this.hostedStatus = value
  }


  // 更新产品
  updateProduct(){
    addTags(this.language,this.tags).then(res=>{
      console.log(res);
    })
    return submitRenewalProduct(this)
  }

  // 初始化
  productInit(data:any){
    this.setTitle(data.title)
    this.setContent(data.content)
    this.setContent1(data.content1)
    this.setModel(data.model)
    this.setPrice(data.price)
    this.setOriginPrice(data.originPrice)
    this.setISBN(data.barcode)
    this.setSKU(data.sku)
    this.setInventory(data.quantity)
    this.costPrice=data.cost_price
    this.SPU=data.SPU
    this.weight=data.weight
    this.manufactuer=data.manufactuer
    // this.tags=data.tag
    this.productType=data.product_type
    // 图片  
    this.setSelectedImgList(JSON.parse(data.additional_image))
    JSON.parse(data.additional_image).forEach((value:any,index:any) => {
        this.temp.set(index.toString(),value)
    });
    // 税费
    this.setNeedTax(data.needTax == 0 ? false : true)
    // 
    this.setInventoryTracking(data.inventoryTracking == 0 ? false : true)
    this.setContinueSell(data.continueSell == 0 ? false : true)
    this.setProductStatus(data.status)
    // 
    this.setProductStatus(data.status)
    this.setHSCode(data.hs_code)
    this.setNotion(data.shipping_country_id)
    this.setLanguage(data.languages_id)
    // 
    this.setProductId(data.id);
    this.setNextProductId(data.nextProductId);
    this.setPrevProductId(data.prevProductId);
    this.setProductType(data.platform_category_id);
    this.setProductCategories(data.categoryIds)
    this.setIsShipping(data.shipping == "0" ? false : true)
    this.setTags(data.tag)
    this.setWeightClassId(data.weight_class_id)
    this.setMetaTitle(data.meta_title)
    this.setMetaKeyword(data.meta_keyword)
    this.setMetaDescription(data.meta_description)
    this.setProductUrl(data.product_url)

    this.setAllianceStatus(data.alliance_status)
    this.setHostedStatus(data.hosted_status)

    // 旧属性
    // this.additional_image = data.additional_image
    this.categorys = data.categorys
    this.checked = data.checked
    this.create_time = data.create_time
    this.domain_id = data.domain_id
    this.employee_id = data.employee_id
    this.employee_realname = data.employee_realname
    this.languages_name = data.languages_name
    this.update_time = data.update_time
    this.specialprice = data.specialprice
    this.start_time = data.start_time
    this.end_time = data.end_time
    
    this.stock_status_id = data.stock_status_id
    this.subtract = data.subtract
    this.is_best = data.is_best
    this.is_new = data.is_new
    this.is_hot = data.is_hot
    this.sort = data.sort
    this.is_share = data.is_share
    this.is_sys = data.is_sys
    this.inquiry_status = data.inquiry_status
    this.ad_waf_status = data.ad_waf_status
    this.ad_product_id = data.ad_product_id
    this.ad_product_url=data.ad_product_url
    this.divided_status=data.divided_status
    this.divided_country=data.divided_country
    this.divided_url=data.divided_url
    this.group_id=data.group_id
    this.minimum=data.minimum
    this.product_video = data.product_video
  }


  // 重置商品
  reset(){
    this.productId = '';
    this.nextProductId = '';
    this.prevProductId = '';
    this.model = '';
    this.title = '';
    this.content = '';
    this.content1 = '';
    this.selectedImgList = [];
    this.price = 1000;
    this.originPrice = 0;
    this.costPrice = 0;
    this.needTax = false;
    this.SKU = '';
    this.ISBN = '';
    this.inventory = 0;
    this.inventoryTracking = false;
    this.continueSell = false;
    this.notion = '';
    this.HSCode = '';
    this.multipleStyles = false;
    this.productStatus = "";
    this.SPU = '';
    this.weight = '';
    this.weightClassId = "";
    this.manufactuer = '';
    this.productType = '';
    this.productUrl = "";
    this.metaTitle = "";
    this.metaKeyword = "";
    this.metaDescription = "";
// 
    this.allianceStatus = "";
    this.hostedStatus = "";

    this.temp.clear();
  }

  // @action submitAddProduct() {
  //   return addProduct()
  // }
  // 加载初始数据
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new oldStore();
