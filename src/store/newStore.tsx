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

 // ################# 状态 ################## 

  // 商品信息

  // 商品标题 
  @observable title = '123';
  // 商品摘要
  @observable resume = '';
  // 商品描述
  @observable desc = '';
  
  // 商品图片/视频

  @observable selectedImgList :any[] =  [];

  // // 商品图片/视频 - className
  // @observable selectedImgListImgClass : any[] = [];

  //############### 操作状态的方法 #####################

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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new newStore()



