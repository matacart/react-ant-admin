import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';



export interface TaxCountry {
    country_id:string,
    country_name:string,
    status:boolean,
}

export interface TaxDisplayConfig {
    is_enabled:boolean,
}

export interface Pagination {
    current:number,
    pageSize:number,
    total:number,
}



class TaxesList {
    constructor() {
      makeAutoObservable(this)
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 搜索关键词
    keyWord = ''
    setKeyWord(value:string){
        this.keyWord = value
    }

    // 含税价
    taxDisplayConfig:TaxDisplayConfig = {
        is_enabled:false,
    }
    setTaxDisplayConfig(value:TaxDisplayConfig){
        this.taxDisplayConfig = value
    }

    // 分页
    pagination:Pagination = {
        current: 1,
        pageSize: 10,
        total: 0,
    }
    setPagination(value:Pagination){
        this.pagination = value
    }

    // 收税地区/国家列表
    taxCountryList:TaxCountry[] = []
    setTaxCountryList(res:TaxCountry[]){
        this.taxCountryList = res
    }


    reset(){
        // 重置更新状态
        this.languagesId = cookie.load("shop_lang") || '2'
        this.pagination = {
            current: 1,
            pageSize: 10,
            total: 0,
        }
        this.taxCountryList = []
        this.taxDisplayConfig = {
            is_enabled:false,
        }
        this.keyWord = ''
    }

}

export default new TaxesList();
