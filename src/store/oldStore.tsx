import { addProduct, getProductDetail } from "@/services/y2/api";
import { message, SelectProps, UploadFile } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { action, makeObservable, observable } from "mobx";

// 引入mobx
// https://blog.csdn.net/qq_53123067/article/details/129707090?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171694792616800197099744%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171694792616800197099744&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-129707090-null-null.142^v100^pc_search_result_base9&utm_term=mobx&spm=1018.2226.3001.4187

// interface ImageItem {
//   url?: string;
// }

 class newStore {

  
  // 产品id
  @observable productId = "";
  @action setProductId = (productId: string) => {
    this.productId = productId;
  }
  


  // 旧属性  兼容旧系统
  @observable additional_image = '';
  @observable categorys = [];
  @observable checked = 0;
  @observable create_time = '';
  @observable domain_id = 0;
  @observable employee_id = 0;
  @observable employee_realname = '';
  @observable languages_name = "";
  @observable model = "";
  @observable update_time = "";
  @observable specialprice = "";
  @observable start_time = "";
  @observable end_time = "";
  @observable weight_class_id = "";
  @observable languages_id = "";
  @observable stock_status_id = "";
  @observable subtract = 0;
  @observable shipping = 0;
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
  @observable meta_title = null;
  @observable meta_keyword = null;
  @observable meta_description = "";
  @observable minimum = "0";
  @observable sales_count = "";
  @observable product_video = "";
  // @observable imgTempList:any = [];
  // @action setImgTempList = (res: any) => {
  //   this.imgTempList = res;
  // }
  // 商品信息

  // 商品标题 
  @observable title = '';
  // 商品摘要
  @observable content = '';
  // 商品描述
  @observable content1 = '';
  // 商品标题 
  @observable language = '2';
  // 商品图片/视频  
  @observable selectedImgList: UploadFile[] = [];
  // -- 封面
  @observable additionalImage:UploadFile[] = [];
  @action setTitle = (title: string) => {
    this.title = title;
  }
  @action setContent = (content: string) => {
    this.content = content
  }
  @action setContent1 = (content1: string) => {
    this.content = content1
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
  @observable price: valueType = 0;
  // 原价
  @observable originPrice: valueType = 0;
  // 成本价
  @observable costPrice: valueType = 0;
  // 需要收取税费
  @observable needTax: boolean = false;  //0

  @action setPrice = (value: valueType) => {
    this.price = value;
  }
  @action setOriginPrice = (value: valueType) => {
    this.originPrice = value;
  }
  @action setCostPrice = (value: valueType) => {
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
  @observable onPutProduct: boolean = false;
  // SPU
  @observable SPU: string = '';
  // 重量
  @observable weight: string = '';
  // 商品厂商
  @observable manufactuer: string = '';
  // 标签
  @observable tag = '';
  // 商品类型
  @observable productType = '';


  // 设置 onPutProduct  
  @action setOnPutProduct(value: boolean) {
    this.onPutProduct = value;
  }

  // 设置 SPU  
  @action setSPU(value: string) {
    this.SPU = value;
  }

  // 设置 weight  
  @action setWeight(value: string) {
    this.weight = value;
    // console.log(value)
  }

  // 设置 manufactuer  
  @action setManufactuer(value: string) {
    this.manufactuer = value;
    // console.log(value)
  }

  // 设置 tag 
  @action setTag(value: string) {
    this.tag = value;
  }

  // 设置 productType（这里假设你可以传入任何类型的数组）  
  @action setProductType(value: string) {
    this.productType = value;
  }

  // @action submitAddProduct() {
  //   return addProduct()
  // }
  // 加载初始数据
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new newStore();



