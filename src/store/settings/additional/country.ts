import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

interface ConditionType {
  country_code:string,
  keyword:string,
  required:string,
  status:string,
}

class Country{
  constructor() {
    makeAutoObservable(this)
  }

  // 店铺语言
  languagesId = cookie.load("shop_lang") || '2'
  setLanguagesId(value:string){
    this.languagesId = value;
  }

  condition:ConditionType = {
    country_code:"",
    keyword:"",
    required: "-1",
    status: "-1",
  }

  setCondition = (value: ConditionType) => {
    this.condition = value;
  }
    
}

export default new Country();
