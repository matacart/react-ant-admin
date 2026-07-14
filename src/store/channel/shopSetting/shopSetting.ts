import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';


export interface TemplateInstance{
    id:string;
    template_id:string;
    template_name:string;
    template_version:string;
    os_version:string;
    status:string;
    update_time:string;
    languages_id:string;
    template_version_id:string;
    install_time:string;
    active_version?:string;
    active_version_id?:string;
}

export interface TemplateMall{
    id:string;
    template_name:string;
    template_version:string;
    os_version:string;
    need_buy:string;
    status:string;
    
  
}
  
interface TemplateInstanceListType{
    pageNum:number;
    pageSize:string;
    total:string;
    list:TemplateInstance[];
}


class Shopsetting {

    constructor() {
        makeAutoObservable(this)
    }

    // 语言
    languagesId = cookie.load("shop_lang") || '2';
    setLanguagesId(value:string) {
        this.languagesId = value;
    }

    // 模板商城列表
    templateMallList:TemplateMall[] = []

    setTemplateMallList(value:TemplateMall[]) {
        this.templateMallList = value;
    }

    // 已添加模板
    templateInstanceList:TemplateInstance[] = []

    setTemplateInstanceList(value:TemplateInstance[]){
        this.templateInstanceList = value
    }

    // 已发布模板
    templateInstanceUsing:TemplateInstance | null = null

    setTemplateInstanceUsing(value:TemplateInstance | null){
        this.templateInstanceUsing = value;
    }
}

export default new Shopsetting();
