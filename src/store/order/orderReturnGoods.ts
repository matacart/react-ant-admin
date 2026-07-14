import { makeAutoObservable } from "mobx";

interface OrderInfoType{
    customer_lastname: string;
    customer_firstname: string;
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
    product: any[];
    shipment: any;
}

class OrderReturnGoods{

    constructor() {
        makeAutoObservable(this)
    }

    // 订单信息
    orderInfo:OrderInfoType = {
        customer_lastname: "",
        customer_firstname: "",
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

    // 用与更新退货原因
    updateReturnReason(groupIndex: number, productId: string, reason: string) {
        const product = this.shippedProductGroup[groupIndex].product.find(p => p.id === productId);
        if (product) product.returnReason = reason;
    }

    // 退货信息
    returnGoodsInfo:any = {
        returnedGoodsNum:0
    }
    setReturnGoodsInfo(value:any){
        this.returnGoodsInfo = value
    }

    // 清空状态
    reset(){
       
    }
}

export default new OrderReturnGoods();
