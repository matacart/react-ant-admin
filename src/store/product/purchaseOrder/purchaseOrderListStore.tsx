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


class purchaseOrderListStore{
    constructor() {
        makeAutoObservable(this)
    }

    // 筛选
    tagsOrderNumber = ""
    setTagsOrderNumber = (tagsOrderNumber:string) => {
        this.tagsOrderNumber = tagsOrderNumber
    }

    tagsStatus = ""
    tagsStatusValues = ""
    setTagsStatus = (tagsStatus:string) => {
        this.tagsStatus = tagsStatus
    }
    setTagsStatusValues = (tagsStatusValues:string) => {
        this.tagsStatusValues = tagsStatusValues
    }

    tagsSupplier = ""
    tagsSupplierValues = ""
    setTagsSupplier = (tagsSupplier:string) => {
        this.tagsSupplier = tagsSupplier
    }
    setTagsSupplierValues = (tagsSupplierValues:string) => {
        this.tagsSupplierValues = tagsSupplierValues
    }

    tagsPlaceOfReceipt = ""
    tagsPlaceOfReceiptValues = ""

    setTagsPlaceOfReceipt = (tagsPlaceOfReceipt:string) => {
        this.tagsPlaceOfReceipt = tagsPlaceOfReceipt
    }
    setTagsPlaceOfReceiptValues = (tagsPlaceOfReceiptValues:string) => {
        this.tagsPlaceOfReceiptValues = tagsPlaceOfReceiptValues
    }

    // 清空状态
    reset(){
        this.tagsOrderNumber = ""
        this.tagsStatus = ""
        this.tagsStatusValues = ""
        this.tagsSupplier = ""
        this.tagsSupplierValues = ""
        this.tagsPlaceOfReceipt = ""
        this.tagsPlaceOfReceiptValues = ""
    }

}

export default new purchaseOrderListStore();