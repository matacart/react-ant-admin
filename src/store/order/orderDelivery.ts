import { makeAutoObservable } from "mobx";

interface DeliveryType{
    shippingNo:string;
    shippingId:string;
    shippingName:string;
    shippingUrl:string;
    customerNotified:string;
}

interface DeliveryProductListType{
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

interface DeliveryAddressType{
    delivery_telephone: string;
    delivery_city_id: string;
    delivery_address_format_id: string;
    delivery_country_code_3: string;
    delivery_country_code_2: string;
    delivery_address_id: string;
    order_id: string;
    delivery_firstname: string;
    delivery_lastname: string;
    delivery_state_id: string;
    delivery_country_id: string;
    shipping_method: string;
    customer_telephone: string;
    delivery_country: string;
    delivery_postcode: string;
    delivery_state: string;
    delivery_city: string;
    delivery_street_address: string;
    delivery_suburb: string;
    delivery_company: string;
    delivery_name: string;

}

class OrderDelivery{

    constructor() {
        makeAutoObservable(this)
    }

    // 配送信息
    delivery:DeliveryType = {
        shippingId: "0",
        shippingNo: "",
        customerNotified: "0",
        shippingName: "",
        shippingUrl: ""
    }

    setDelivery(value:any){
        this.delivery = value
    }

    // 收货地址
    deliveryAddress:DeliveryAddressType = {
        delivery_telephone: "",
        delivery_city_id: "",
        delivery_address_format_id: "",
        delivery_country_code_3: "",
        delivery_country_code_2: "",
        delivery_address_id: "",
        order_id: "",
        delivery_firstname: "",
        delivery_lastname: "",
        delivery_state_id: "",
        delivery_country_id: "",
        shipping_method: "",
        customer_telephone: "",
        delivery_country: "",
        delivery_postcode: "",
        delivery_state: "",
        delivery_city: "",
        delivery_street_address: "",
        delivery_suburb: "",
        delivery_company: "",
        delivery_name: ""
    }

    setDeliveryAddress(value:DeliveryAddressType){
        this.deliveryAddress = value
    }

    // 发货产品
    deliveryProductList:DeliveryProductListType[] = []
    setDeliveryProductList(value:DeliveryProductListType[]){
        this.deliveryProductList = value
    }

    // 清空状态
    reset(){
        this.delivery = {
            shippingId: "0",
            shippingNo: "",
            customerNotified: "0",
            shippingName: "",
            shippingUrl: ""
        }
    }
}

export default new OrderDelivery();