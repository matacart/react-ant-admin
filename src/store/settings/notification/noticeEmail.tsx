import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface settingType{
    id:string;
    label:string;
    type:string;
    placeholder?:string;
    limit?:number;
    min?:number;
    max?:number;
    step?:number;
    default?:any;
    hide_scene?:string[];
}

export interface schemaType{
    name:string;
    settings:settingType[];
}


export interface SectionType{
    disabled:boolean;
    sectionId:string;
    type:string;
    schema:schemaType;
    settingsData:any;
}

export interface SectionsType {
    [key:string]:SectionType;
}


export interface SettingsType {
    settingsData:any;
    schema:any;
}

class noticeEmail {
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

    // 模板编码
    templateCode = "";
    setTemplateCode(value:string){
      this.templateCode = value;
    }


    // 模板sections
    sections:SectionsType = {};
    setSections(value:SectionsType){
        this.sections = value;
    }

    // 组件排序
    order:string[] = [];
    setOrder(value:string[]){
        this.order = value;
    }

    // sections排序
    dynamicOrder:string[] = [];
    setDynamicOrder(value:string[]){
        this.dynamicOrder = value;
    }

    // 全局设置
    settings:SettingsType = {
        settingsData:{},
        schema:[]
    };
    setSettings(value:SettingsType){
        this.settings = value;
    }

    // 动态源
    templateConfig:any = {};
    setTemplateConfig(value:any){
        this.templateConfig = value;
    }

    // 当前的sectionID
    activeSectionID:string = '';
    setActiveSectionID(value:string){
        this.activeSectionID = value;
    }

    // 操作历史
    operationHistory:any[] = [];
    redoHistory:any[] = [];

    reset(){
        this.languagesId = cookie.load("shop_lang") || '2';
        this.useLanguagesId = localStorage.getItem("USE_LANG") || '2';
        this.device = 'pc';
        this.oseId = "";
        this.activeSectionID = "";
        this.templateCode = "";
        this.sections = {};
        this.order = [];
        this.dynamicOrder = [];
        this.settings = {
            settingsData:{},
            schema:[]
        };
        this.templateConfig = {};
    }

}

export default new noticeEmail();