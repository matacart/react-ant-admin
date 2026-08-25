import { makeAutoObservable } from "mobx";


interface TaxZone {
  label:string,
  value:string,
}

interface TaxZoneConfig{
  id:string
}

interface TaxType {
    id:string,
    type:string,
    enableDutyTaxes:boolean,
    countryCode:string,
    taxesName:string,
    taxesExtCode:string,
    taxesRate:number,
    taxesRateDescSwitch?:boolean,
    subTaxesConfigDTOList:TaxZoneConfig[],
    taxesDescSwitch?:boolean,
    taxesDesc:string,
}


class Taxes {
    constructor() {
      makeAutoObservable(this)
    }

    // 区域列表
    zoneList:TaxZone[] = []
    setZoneList(res:TaxZone[]){
      this.zoneList = res
    }

    // 税率信息
    taxInfo:any = {}
    setTaxInfo(res:any){
      this.taxInfo = res
    }

    taxValue:TaxType = {
      id: "",
      countryCode: "",
      type: "",
      enableDutyTaxes: false,
      taxesName: "",
      taxesExtCode: "",
      taxesRate: 0,
      taxesRateDescSwitch: false,
      taxesDesc: "",
      subTaxesConfigDTOList: []
    }

    // 全境税率
    overallTax:TaxType = this.taxValue
    setOverallTax(res:TaxType){
      this.overallTax = res
    }

    // 关税税率
    tariffTax:TaxType = this.taxValue
    setTariffTax(res:TaxType){
      this.tariffTax = res
    }

    // 自定义税率
    customTax:TaxType[] = []
    setCustomTax(res:TaxType[]){
      this.customTax = res
    }


    // 删除的自定义税率索引
    deleteList:string[] = []
    setDeleteList(value:string[]){
      this.deleteList = value;
    }

    reset(){
      this.zoneList = []
      this.overallTax = this.taxValue
      this.tariffTax = this.taxValue
      this.customTax = []
      this.deleteList = []
    }
}

export default new Taxes();
