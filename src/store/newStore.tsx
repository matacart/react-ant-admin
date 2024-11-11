import { addProduct } from "@/services/y2/api";
import { message, SelectProps, UploadFile } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { action, makeObservable, observable } from "mobx";

// 引入mobx
// https://blog.csdn.net/qq_53123067/article/details/129707090?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171694792616800197099744%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171694792616800197099744&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-129707090-null-null.142^v100^pc_search_result_base9&utm_term=mobx&spm=1018.2226.3001.4187

 class newStore {
  // 模型唯一
  @observable model = '';
  // 语言
  @observable language = '2';
  // 商品标题 
  @observable title = '';
  // 商品摘要
  @observable content = '';
  // 商品描述
  @observable content1 = '';

  @observable temp = new Map();

  // 商品图片/视频
  @observable selectedImgList: UploadFile[] = [];

  @action setTitle = (title: string) => {
    this.title = title;
  }

  @action setModel = (model: string) => {
    this.model = model;
  }
  @action setLanguage = (language: string) => {
    this.language = language;
  }

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
  @observable needTax: boolean = false;

  @action setPrice = (value: valueType) => {
    this.price = value;
  }
  @action setOriginPrice = (value: valueType) => {
    this.originPrice = value;
  }
  @action setCostPrice = (value: valueType) => {
    this.costPrice = value;
  }
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
  @observable onPutProduct: boolean = true;
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

  @action submitAddProduct() {
    return addProduct()
  }


  // 重置状态
  reset(){
    this.title = '';
    this.content = '';
    this.content1 = '';
    this.selectedImgList = [];
    this.price = 0;
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
    this.onPutProduct = true;
    this.SPU = '';
    this.weight = '';
    this.manufactuer = '';
    this.tag = '';
    this.productType = '';
    this.temp.clear();
  }

}

export default new newStore();

// eslint-disable-next-line import/no-anonymous-default-export
// export default new newStore(import { model_1 } from 'C:/Users/Administrator/Desktop/react-ant-admin-main/src/.umi-production/plugin-initialState/@@initialState';



