import { makeAutoObservable } from "mobx";


interface CustomerType {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
}

class giftCard{
    
    constructor() {
        makeAutoObservable(this)
    }

    customer: CustomerType | null = null
    setCustomer(customer: CustomerType | null){
        this.customer = customer
    }

    // 重置
    reset(){
        this.customer = null
    }
}

export default new giftCard()