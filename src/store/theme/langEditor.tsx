import { makeAutoObservable } from "mobx";

interface JsonEntity {
  [key: string]: any;
}

class langEditor {
    constructor() {
      makeAutoObservable(this)
    }

    // 模式
    mode = "auto";
    setMode(value:string){
      this.mode = value;
    }

    // 语言
    lang = "en";
    setLang(value:string){
      this.lang = value;
    }

    // 默认数据
    defaultJsonEntity:JsonEntity = {};
    setDefaultJsonEntity(value:any){
      this.defaultJsonEntity = value;
    }

    jsonEntity:JsonEntity = {};
    setJsonEntity(value:any){
      this.jsonEntity = value;
    }


    // 状态重置
    reset(){
      this.mode = "auto";
      this.lang = "en";
    }
}

export default new langEditor();