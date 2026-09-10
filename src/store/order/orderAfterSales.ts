import { makeAutoObservable } from "mobx";
import { OrderInfoType, OrdersPackageType } from "./order";


class OrderAfterSales{

    constructor() {
      makeAutoObservable(this)
    }

    // 订单信息
    orderInfo:OrderInfoType = {
      bizOrderStatus:100,
      bizPayStatus:0,
      bizDeliveryStatus:0,
      orderSeq: "",
      appOrderSeq: "",
      ordersPackageList:[],
      orderRemarks: [],
      receiverInfo:null,
      payBillInfo:null,
      buyerInfo:null,
      tags:[]
    }

    setOrderInfo(value:OrderInfoType){
      this.orderInfo = value
    }

    // 发货单列表
    ordersPackageList:OrdersPackageType[] = []
    setOrdersPackageList(value:OrdersPackageType[]){
      this.ordersPackageList = value
    }


    // // 发货产品
    // shippedProductGroup:ShippedProductsGroup[] = []
    // setShippedProductGroup(value:ShippedProductsGroup[]){
    //     this.shippedProductGroup = value
    // }

    // // 用与更新退货原因
    // updateReturnReason(groupIndex: number, productId: string, reason: string) {
    //     const product = this.shippedProductGroup[groupIndex].product.find(p => p.id === productId);
    //     if (product) product.returnReason = reason;
    // }

    // // 退货信息
    // returnGoodsInfo:any = {
    //     returnedGoodsNum:0
    // }
    // setReturnGoodsInfo(value:any){
    //     this.returnGoodsInfo = value
    // }

    // 清空状态
    reset(){
       
    }
}

export default new OrderAfterSales();
