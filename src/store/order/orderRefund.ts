import { makeAutoObservable } from "mobx";

interface OrderInfoType{
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

interface ProductType{
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

interface ShippedProductsGroup{
    shipment: any;
    product: any;
}

interface RemainingProductsGroup{
    shipment: any;
    product: any;
}

interface ReturnInProductsGroup{
    return: any;
    product: any;
}

class OrderRefund{

    constructor() {
        makeAutoObservable(this)
    }

    orderInfo:OrderInfoType = {
        tags: [],
        customer_id_number: "",
        payment_start_date: undefined,
        payment_term: "",
        languages_id: "",
        is_same_delivery: "",
        delivery_telephone: "",
        delivery_country: "",
        delivery_postcode: "",
        delivery_state: "",
        delivery_city: "",
        delivery_street_address: "",
        delivery_suburb: "",
        delivery_company: "",
        delivery_firstname: "",
        delivery_lastname: "",
        billing_name: "",
        delivery_name: "",
        order_id: "",
        customer_id: "",
        customer_telephone: "",
        customer_email_address: "",
        payment_method: "",
        shipping_status: "",
        payment_status: "",
        order_sn: ""
    }
    setOrderInfo(value:OrderInfoType){
        this.orderInfo = value
    }

    // 发货产品
    shippedProductGroup:ShippedProductsGroup[] = []
    setShippedProductGroup(value:ShippedProductsGroup[]){
        this.shippedProductGroup = value
    }

    // 未发货产品
    remainingProductGroup:RemainingProductsGroup[] = []
    setRemainingProductGroup(value:RemainingProductsGroup[]){
      this.remainingProductGroup = value
    }

    // 退货商品
    returnedProductGroup:ReturnInProductsGroup[] = []
    setReturnedProductGroup(value:ReturnInProductsGroup[]){
        this.returnedProductGroup = value
    }

    // 备注
    remarks:string = ''
    setRemarks(value:string){
        this.remarks = value
    }

    // 退款金额
    refundAmount:number = 0
    setRefundAmount(value:number){
        this.refundAmount = value
    }
    // 退款产品
    refundProducts:any[] = []
    setRefundProducts(value:any[]){
        this.refundProducts = value
    }

    // 清空状态
    reset(){
       this.remarks = ""
       this.refundAmount = 0
       this.refundProducts = []
    }
}

export default new OrderRefund();