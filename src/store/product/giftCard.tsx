import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

interface CustomerType {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
}

interface giftCardInfoType {
    id: string;
    cardCode:string;
    amount:string;
    currency:string;
    expiryDays:string;
}

class giftCard{
    
    constructor() {
        makeAutoObservable(this)
    }

    // 初始化数据
    getInitProduct() {
        return {
            id:"",
            cardCode:"",
            amount:"",
            currency:cookie.load('domain')?.default_currency || 'USD',
            expiryDays:""
        };
    }

    giftCardInfo:giftCardInfoType = this.getInitProduct();

    customer: CustomerType | null = null
    setCustomer(customer: CustomerType | null){
        this.customer = customer
    }

    symbolLeft = cookie.load('symbolLeft') || 'US$';

    // 重置
    reset(){
        this.giftCardInfo = this.getInitProduct();
        this.customer = null;
        this.symbolLeft = cookie.load('symbolLeft') || 'US$';
    }
}

export default new giftCard()