import { delPurchaseOrders, getPurchase } from "@/services/y2/api";
import { makeAutoObservable } from "mobx";
import dayjs from 'dayjs';


// 采购单详情
class purchaseOrderStoreEdit{
    constructor() {
        makeAutoObservable(this)
    }

    id = ""
    orderNumber = ""
    supplierId = ""
    setSupplierId = (id:string) => {
        this.supplierId = id
    }
    supplierName = ""
    setSupplierName = (name:string) => {
        this.supplierName = name
    }
    warehouseId = ""
    setWarehouseId = (id:string) => {
        this.warehouseId = id
    }
    warehouseName = ""
    setWarehouseName = (name:string) => {
        this.warehouseName = name
    }
    currency = ""
    setCurrency = (currency:string) => {
        this.currency = currency
    }
    ordersStatusId = ""
    setOrdersStatusId = (id:string) => {
        this.ordersStatusId = id
    }
    paymentTermsId = ""
    setPaymentTermsId = (id:string) => {
        this.paymentTermsId = id
    }
    paymentTerms = ""
    setPaymentTerms = (paymentTerms:string) => {
        this.paymentTerms = paymentTerms
    }
    remark = ""
    setRemark = (remark:string) => {
        this.remark = remark
    }

    // 运输信息
    shipments = []

    // 获取采购单
    getPurchaseOrder = (id:string) => {
        getPurchase(id).then(res=>{
            if(res.code == 0){
                console.log(res.data)
                this.id = res.data.id
                this.orderNumber = res.data.order_number
                this.supplierId = res.data.supplier_id
                this.supplierName = res.data.supplier_name
                this.warehouseId = res.data.warehouse_id
                this.warehouseName = res.data.warehouse_name
                this.currency = res.data.currency
                this.ordersStatusId = res.data.orders_status_id
                this.paymentTermsId = res.data.payment_terms_id
                this.paymentTerms = res.data.payment_terms
                this.remark = res.data.remark

                let newShipments:any = []
                res.data.shipments?.forEach(item=>{
                    newShipments.push({
                        time:dayjs.unix(item.estimated_delivery_date),
                        courier:item.shipping_company,
                        HWB:item.tracking_number,
                        remark:item.remark
                    })
                })
                this.shipments = newShipments
            }
        })
    }

    // 删除采购单
    deletePurchaseOrder = async () => {
        return await delPurchaseOrders(this.id).then(res=>{
            return res
        })
    }

}

export default new purchaseOrderStoreEdit();