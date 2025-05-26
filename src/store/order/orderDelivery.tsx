import { makeAutoObservable } from "mobx";

interface deliveryType{
    shippingNo:string;
    shippingId:string;
    shippingName:string;
    shippingUrl:string;
    customerNotified:string;
}

interface deliveryProductListType{
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

interface deliveryAddressType{
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

class orderDelivery{

    constructor() {
        makeAutoObservable(this)
    }

    // 配送信息
    delivery:deliveryType = {
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
    deliveryAddress:deliveryAddressType = {
    }

    setDeliveryAddress(value:deliveryAddressType){
        this.deliveryAddress = value
    }

    // 发货产品
    deliveryProductList:deliveryProductListType[] = []
    setDeliveryProductList(value:deliveryProductListType[]){
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

export default new orderDelivery();