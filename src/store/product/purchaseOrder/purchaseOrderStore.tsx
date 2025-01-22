import idID from "@/locales/id-ID";
import { addPurchaseOrders, delPurchaseOrders } from "@/services/y2/api";
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

    // 采购单创建
    purchaseOrder:any = {
        // 订单号
        orderNumber:"",
        supplierId:"",
        supplierName:"",
        warehouseId:"",
        warehouseName:"",
        // 币种
        currency:"",
        currencyRate:"",
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
        ordersStatusId:"0",
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
    // 提交
    purchaseOrderSubmit = () => {
        let newShipments = this.shipments.map((item:any)=>{
            // 时间戳秒为单位
            let time = item.time.valueOf()/1000
            return {
                shipping_company:item.courier,
                tracking_number:item.HWB,
                estimated_delivery_date:time,
                remark:item.remark,
                status:"1"
            }
        })
        this.purchaseOrder.shippings = newShipments
        // 生成订单号 当前时间+随机数*1
        let currentTime = new Date()
        const year = currentTime.getFullYear(); // 获取当前年份，如2025
        const month = currentTime.getMonth() + 1; // 获取当前月份（0 - 11表示1 - 12月，所以要加1），如1
        const day = currentTime.getDate(); // 获取当前日，如13
        const hours = currentTime.getHours(); // 获取当前小时数，范围是0 - 23
        const minutes = currentTime.getMinutes(); // 获取当前分钟数，范围是0 - 59
        const seconds = currentTime.getSeconds(); // 获取当前秒数，范围是0 - 59
        this.purchaseOrder.orderNumber = "PO"+year+(month>9?month:"0"+month)+(day>9?day:"0"+day)+(hours>9?hours:"0"+hours)+(minutes>9?minutes:"0"+minutes)+(seconds>9?seconds:"0"+seconds)+Math.floor(Math.random()*10)
        
        addPurchaseOrders(this.purchaseOrder).then(res=>{
            console.log(res);
        })
    }

}

export default new purchaseOrderStore();