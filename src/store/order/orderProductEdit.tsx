import { set } from "lodash";
import { makeAutoObservable } from "mobx";

interface orderInfoType{
    tags: string[];
    customer_id_number: string;
    payment_start_date: string | undefined;
    payment_term: string;
    languages_id: string;
    is_same_delivery: string;
    delivery_telephone: string;
    delivery_country: string;
    delivery_postcode: string;
    delivery_state: string;
    delivery_city: string;
    delivery_street_address: string;
    delivery_suburb: string;
    delivery_company: string;
    delivery_firstname: string;
    delivery_lastname: string;
    billing_name: string;
    delivery_name: string;
    order_id: string;
    customer_id: string;
    customer_telephone: string;
    customer_email_address: string;
    payment_method: string;
    shipping_status: string;
    payment_status: string;
    order_sn: string;
}

interface productType{
    product_price: number;
    quantity_shipped: number;
    num: number;
    id: string;
    quantity: number;
    remaining_quantity: number;
    attributes: any;
    product_name: string;
    product_image: string;
    productId: string;
    ordersProductId:string,
    quantityShipped:number,
}

interface shippedProductsGroup{
    shipment: any;
    product: any;
}

interface remainingProductsGroup{
    remaining: any;
    product: any;
}

class orderRefund{

    constructor() {
        makeAutoObservable(this)
    }

    orderInfo:orderInfoType = {}
    setOrderInfo(value:orderInfoType){
        this.orderInfo = value
    }

    // 发货产品
    shippedProductGroup:shippedProductsGroup[] = []
    setShippedProductGroup(value:shippedProductsGroup[]){
        this.shippedProductGroup = value
    }

    // 未发货产品
    remainingProductGroup:remainingProductsGroup[] = []
    setRemainingProductGroup(value:remainingProductsGroup[]){
      this.remainingProductGroup = value
    }

    // 删除产品id
    deleteProductIds:string[] = []
    setDeleteProductIds(value:string[]){
        this.deleteProductIds = value
    }

    // 账单通知
    billNotification = 0
    setBillNotification(value:number){
        this.billNotification = value
    }
    // 清空状态
    reset(){
        this.deleteProductIds = []
        this.billNotification = 0
    }
}

export default new orderRefund();