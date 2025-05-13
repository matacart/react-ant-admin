import { makeAutoObservable } from "mobx";

class OrderList{
    constructor() {
        makeAutoObservable(this)
    }

    languages = "2"

    setLanguages(res:string){
        this.languages = res
    }

    // 选中项id
    orderIds = []

    setOrderIds(res:any){
        this.orderIds = res
    }

    // 当前页面id
    currentPageOrderIds = []
    setCurrentPageOrderIds(res:any){
        this.currentPageOrderIds = res
    }

    // 导出状态
    exportTask = {
        status:"",
        isBackstage:false,
    }
    setExportTask = (value: any) => {
        this.exportTask = value;
    }

    // 订单状态
    tagsStatusList = [
        {id:0,title:"",value:"",label:""},
    ]

    setTagsStatusList(res:any){
        this.tagsStatusList = res
    }


    // 条件
    condition = {
        
    }

    setCondition(res:any){
        this.condition = res
    }

    // 店铺币种
    useMarketCurrency = 0
    setUseMarketCurrency(value:number){
        this.useMarketCurrency = value
    }
    // 自定义导出字段
    code = []
    setCode(res:any){
        this.code = res
    }
    

    // 清空状态
    reset(){
        // this.tagsOrderNumber = ""
        // this.tagsStatus = ""
        // this.tagsStatusValues = ""
        // this.tagsSupplier = ""
        // this.tagsSupplierValues = ""
        // this.tagsPlaceOfReceipt = ""
        // this.tagsPlaceOfReceiptValues = ""
        this.tagsStatusList = []
    }

}

export default new OrderList();