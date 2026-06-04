import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface configType{
    personalizations:any;
    checkout:any;
    styleSystem:any;
}


class checkoutEditor {
    constructor() {
      makeAutoObservable(this)
    }

    // 后台语言
    useLanguagesId = localStorage.getItem("USE_LANG") || '2';
    setUseLanguagesId(value:string){
        this.useLanguagesId = value;
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 设备
    device:'pc'|'mobile' = 'pc';
    setDevice(value:'pc'|'mobile'){
      this.device = value;
    }

    // 临时编号
    oseId = "";
    setOseId(value:string){
      this.oseId = value;
    }

    // 最后保存时间戳
    lastSavedAt = 0;
    setLastSavedAt(value: number) {
        this.lastSavedAt = value;
    }

    // 模板配置
    config:configType = {
        personalizations: undefined,
        checkout: undefined,
        styleSystem: undefined
    };
    setConfig(value:configType){
        this.config = value;
    }


    // 操作历史
    operationHistory:any[] = [];
    redoHistory:any[] = [];

    reset(){
        this.languagesId = cookie.load("shop_lang") || '2';
        this.useLanguagesId = localStorage.getItem("USE_LANG") || '2';
        this.device = 'pc';
        this.oseId = "";
        this.lastSavedAt = 0;
        this.config = {
            personalizations: undefined,
            checkout: undefined,
            styleSystem: undefined
        };
    }

}

export default new checkoutEditor();