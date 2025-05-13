import { makeAutoObservable } from "mobx";

interface productinfo {
    id: string;
    orders_id: string;
    product_id: string;
    productModel: string;
    productImage: string;
    productName: string;
    productNum: string;
    product_prid: string;
    productOption: null | any;
}

interface order {
    customer_email_address: ReactNode;
    customer_telephone: ReactNode;
    delivery_street_address: ReactNode;
    delivery_city: ReactNode;
    delivery_country_code_2: ReactNode;
    delivery_postcode: ReactNode;
    historys: any;
    id: string; // 订单ID
    date_purchased: string; // 订单日期
    orders_status_id: string; // 订单状态
    delivery_status_id: string; // 发货状态
    payment_status_id: string; // 支付状态
    orders_name: string;
    orders_price: string;
    orders_total: string;
    orders_num: string;
    shipping_cost: string;
    delivery_name: string;
    delivery_time:string;
    email: string;
    tel: string;
    country: string;
    province: string;
    city: string;
    address: string;
    postcode: string;
    productinfo: productinfo[]; // 添加 productinfo 字段
    customer_name:string;
    customer_firstname:string;
}

class orderStore{
    constructor() {
        makeAutoObservable(this)
    }

    oldOrder:order = {
        id: "",
        date_purchased: "",
        orders_status_id: "",
        delivery_status_id: "",
        payment_status_id: "",
        orders_name: "",
        orders_price: "",
        orders_total: "",
        orders_num: "",
        shipping_cost: "",
        delivery_name: "",
        email: "",
        tel: "",
        country: "",
        province: "",
        city: "",
        address: "",
        postcode: "",
        productinfo: [],
        customer_name: "",
        customer_firstname: "",
        delivery_time: "",
        customer_email_address: undefined,
        customer_telephone: undefined,
        delivery_street_address: undefined,
        delivery_city: undefined,
        delivery_country_code_2: undefined,
        delivery_postcode: undefined,
        historys: undefined
    }

    setOldOrder(res:order){
        this.oldOrder = res
    }

}

export default new orderStore()