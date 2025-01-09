import { addPurchaseOrders } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";


interface supplierListType {
    value:string,
    label:string
}

interface warehouseAddressListType {
    value:string,
    label:string
}


class purchaseOrderStore{
    constructor() {
        makeAutoObservable(this)
    }

    tagsStatus = ""

    setTagsStatus = (tagsStatus:string) => {
        this.tagsStatus = tagsStatus
    }

    tagsSupplier = ""

    setTagsSupplier = (tagsSupplier:string) => {
        this.tagsSupplier = tagsSupplier
    }

    tagsPlaceOfReceipt =""

    setTagsPlaceOfReceipt = (tagsPlaceOfReceipt:string) => {
        this.tagsPlaceOfReceipt = tagsPlaceOfReceipt
    }
    

    // 采购单列表
    purchaseOrder:any = {
        // 订单号
        order_number:"",
        supplierId:"",
        supplierName:"",
        warehouseId:"",
        warehouseName:"",
        currency:"",
        currencyId:"",
        paymentTermsId:"",
        paymentTerms:"",
        firstName:"",
        lastName:"",
        shipping_company:"",
        address:"",
        detailedAddress:"",
        district:"",
        country:"",
        countryId:"",
        state:"",
        stateId:"",
        city:"",
        cityId:"",
        orders_status_id:"0",
        order_tax:"",
        orderTotal:"",
        remark:"",
        comments:"",
        send_email:"0",
        status:"1",


        shippings:[]
    }


    // 运输商
    shipments = [
        {
           
            courier:"",
            HWB:"",
            time:"",
            remark:"",
        }
    ]

    setShipments(values:any){
        this.shipments = values
    }

    // id = 0,

    // 提交
    purchaseOrderSubmit = () => {
        let newShipments = this.shipments.map((item:any)=>{
            console.log()
            return {
                shipping_company:item.courier,
                tracking_number:item.HWB,
                estimated_delivery_date:item.time.year()+"-"+((item.time.month()+1)>9?(item.time.month()+1):"0"+(item.time.month()+1))+"-"+(item.time.date()>9?item.time.date():"0"+item.time.date()),
                remark:item.remark,
            }
        })
        this.purchaseOrder.shippings = newShipments
        console.log(this.purchaseOrder);
        addPurchaseOrders(this.purchaseOrder).then(res=>{
            console.log(res);
        })
    }

}

export default new purchaseOrderStore();