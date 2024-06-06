import { valueType } from "antd/es/statistic/utils";
import { action, makeObservable, observable } from "mobx";

// 引入mobx
// https://blog.csdn.net/qq_53123067/article/details/129707090?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171694792616800197099744%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171694792616800197099744&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-129707090-null-null.142^v100^pc_search_result_base9&utm_term=mobx&spm=1018.2226.3001.4187

class newStore {
  // constructor(){
    // 参数1：target 把谁变成响应式(可观察)；参数2：指定哪些属性或方法变成可观察
    // makeObservable(this,{ // 设置观察模式

      // title:observable, // 设置管理状态的数据
      // resume: observable,
      // desc: observable,
      // selectedImg: observable,

    // })
  // }


  // 商品信息

  // 商品标题 
  @observable title = '';
  // 商品摘要
  @observable resume = '';
  // 商品描述
  @observable desc = '';
  // 商品图片/视频
  @observable selectedImgList :any[] =  [];
  
  // 操作选中的图片数组
  @action getSelectedImgList = ()=>{
    return this.selectedImgList;
  }
  @action addSelectedImgList = (img:any)=>{
    this.selectedImgList.push(img);
  }
  @action deleteSelectedImgList = (img:any)=>{
    let index =this.selectedImgList.indexOf(img);
    this.selectedImgList.splice(index,1);
  }
  @action setSelectedImgList = (imgList:any)=>{
    this.selectedImgList=imgList;
  }
  @action getCountOfSelectedImgList = (img:any)=>{
    let index = this.selectedImgList.indexOf(img);
    return index >-1?index+1:0;
  }
  @action isIncludeSelectedImgList = (img:any)=>{
    return this.selectedImgList.indexOf(img)>-1;
  }


  // 价格/交易

  // 售价
  @observable price:valueType = 0;
  // 原价
  @observable originPrice:valueType = 0;
  // 成本价
  @observable costPrice:valueType = 0;
  // 需要收取税费
  @observable needTax:boolean = false;

  @action setPrice = (value:valueType)=>{
    this.price=value;
  }
  @action setOriginPrice = (value:valueType)=>{
    this.originPrice=value;
  }
  @action setCostPrice = (value:valueType)=>{
    this.costPrice=value;
  }
  @action setNeedTax = (value:boolean)=>{
    this.needTax=value;
  }

  // 库存

  // SKU
  @observable SKU:string = '';
  // 条码
  @observable ISBN:string = '';
  // 库存数量
  @observable inventory:number = 0;
  // 缺货后继续销售
  // @observable continueSell:






    // 库存追踪
  @observable inventoryTracking:boolean = false; 


  @action setInventoryTracking = (value:boolean)=>{
    this.inventoryTracking=value;
  }
}






















// eslint-disable-next-line import/no-anonymous-default-export
export default new newStore()



