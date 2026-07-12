import { makeAutoObservable } from "mobx";
import cookie from 'react-cookies';

export interface CheckoutConfig{
    loginType:string;
    contactInfoType:string;
    enableSubscription:string;
    acceptSmsSubscription:string;
    localDeliveryPhoneRequired:string;
    pickupPhoneRequired:string;
    acceptSubscriptionByOtherContactType:string;
    autoHideMarkOrder:string;
    autoSendOrderItemType:string;
    whenCanUsePromoCode:string;
    maxDiscountCodeCount:string;
    showAddedInput:string;
}

export interface ProductDetailSettleButtonConfigType{
    system:boolean;
    spbConfigs:any[];
}

export interface CartSettleButtonConfig{
    spbConfigs:any[];
}

export interface CartSettleButtonConfig{
    spbConfigs:any[];
}

export interface CheckoutSettleButtonConfig{
    spbConfigs:any[];
}

export interface CheckoutTemplateConfig{
    id:string;
    profile_name:string;
    profile_id:string;
    create_time:string;
}

export interface CheckoutFormConfig{
    nameType:string;
    companyType:string;
    address2Type:string;
    postCodeCheck:string;
    phoneType:string;
    orderRemarkType:string;
    receiveAddressAsBillAddress:string;
    autoFillAddress:string;
}

export interface TipConfigInfo{
    showTip:boolean;
    hasTipShowConfig:boolean;
    showTipOptions:boolean;
    tipOptionInfoList:any[];
}

export interface TipShowConfigInfo{
    title:string;
    describe:string;
    customGuide:string;
    customButtonDesc:string;
    thanksDesc:string;
}

export interface StockLockConfig{
    enableLockStockInOrderCreate:string;
}

export interface PaymentSecurityConfig{
    paymentSecurityEnable:string;
    paymentSecurityDesc:string;
    paymentSecurityImageType:string;
    paymentSecurityPcImages:string[];
    paymentSecurityMobileImages:string[];
}
export interface AfterSaleGuaranteeConfig{
    afterSaleGuaranteeEnable:string;
    afterSaleGuaranteeDesc:string;
}


class settingsInfo {
    constructor() {
      makeAutoObservable(this)
    }

    // 店铺语言
    languagesId = cookie.load("shop_lang") || '2'
    setLanguagesId(value:string){
        this.languagesId = value;
    }

    // 结账流程配置
    checkoutConfigLive:CheckoutTemplateConfig | null = null;
    setCheckoutConfigLive(value:CheckoutTemplateConfig | null){
        this.checkoutConfigLive = value
    }

    checkoutConfigDraft:CheckoutTemplateConfig[] | null = null;
    setCheckoutConfigDraft(value:CheckoutTemplateConfig[] | null){
        this.checkoutConfigDraft = value
    }

    config:CheckoutConfig = {
        loginType:"LOGIN_OR_GUEST",
        contactInfoType:"EMAIL_ONLY",
        enableSubscription:"0",
        acceptSmsSubscription:"0",
        localDeliveryPhoneRequired:"0",
        pickupPhoneRequired:"0",
        acceptSubscriptionByOtherContactType:"0",
        autoHideMarkOrder:"0",
        autoSendOrderItemType:"ONLY_GIFT_CARD",
        whenCanUsePromoCode:"ONLY_SETTLE",
        maxDiscountCodeCount:"1",
        showAddedInput:"0",
    }
    setConfig(value:CheckoutConfig){
        this.config = value
    }

    productDetailSettleButtonConfig:ProductDetailSettleButtonConfigType = {
        system:false,
        spbConfigs:[]
    };
    setProductDetailSettleButtonConfig(value:ProductDetailSettleButtonConfigType){
        this.productDetailSettleButtonConfig = value
    }
    cartSettleButtonConfig:CartSettleButtonConfig = {
        spbConfigs: []
    };
    setCartSettleButtonConfig(value:CartSettleButtonConfig){
        this.cartSettleButtonConfig = value
    }
    checkoutSettleButtonConfig:CheckoutSettleButtonConfig = {
        spbConfigs: []
    };
    setCheckoutSettleButtonConfig(value:CheckoutSettleButtonConfig){
        this.checkoutSettleButtonConfig = value
    }

    // 库存锁定配置
    stockLockConfig:StockLockConfig = {
        enableLockStockInOrderCreate:"0",
    };
    setStockLockConfig(value:StockLockConfig){
        this.stockLockConfig = value
    }

    // 支付安全配置
    paymentSecurity:PaymentSecurityConfig = {
        paymentSecurityEnable:"0",
        paymentSecurityDesc:"",
        paymentSecurityImageType:"0",
        paymentSecurityPcImages:[],
        paymentSecurityMobileImages:[],
    };
    setPaymentSecurity(value:PaymentSecurityConfig){
        this.paymentSecurity = value
    }
    // 售后保障配置
    afterSaleGuarantee:AfterSaleGuaranteeConfig = {
        afterSaleGuaranteeEnable:"0",
        afterSaleGuaranteeDesc:"",
    };
    setAfterSaleGuarantee(value:AfterSaleGuaranteeConfig){
        this.afterSaleGuarantee = value
    }

    // 结账表单配置
    checkoutFormConfig:CheckoutFormConfig = {
        nameType:"FULL",
        companyType:"HIDE",
        address2Type:"HIDE",
        postCodeCheck:"0",
        phoneType:"REQUIRED",
        orderRemarkType:"HIDE",
        receiveAddressAsBillAddress:"1",
        autoFillAddress:"1",
    };
    setCheckoutFormConfig(value:CheckoutFormConfig){
        this.checkoutFormConfig = value
    }

    // 小费配置 
    tipConfigInfo:TipConfigInfo = {
        showTip:false,
        hasTipShowConfig:false,
        showTipOptions:false,
        tipOptionInfoList:[]
    }
    setTipConfigInfo(value:TipConfigInfo){
        this.tipConfigInfo = value
    }
    // 小费信息
    tipShowConfigInfo:TipShowConfigInfo = {
        title: "",
        describe: "",
        customGuide: "",
        customButtonDesc: "",
        thanksDesc: ""
    }
    setTipShowConfigInfo(value:TipShowConfigInfo){
        this.tipShowConfigInfo = value
    }


    reset(){
        // 重置更新状态
        this.languagesId = cookie.load("shop_lang") || '2'
        this.checkoutConfigLive = null
        this.checkoutConfigDraft = null
        this.config = {
            loginType:"LOGIN_OR_GUEST",
            contactInfoType:"EMAIL_ONLY",
            enableSubscription:"0",
            acceptSmsSubscription:"0",
            localDeliveryPhoneRequired:"0",
            pickupPhoneRequired:"0",
            acceptSubscriptionByOtherContactType:"0",
            autoHideMarkOrder:"0",
            autoSendOrderItemType:"ONLY_GIFT_CARD",
            whenCanUsePromoCode:"ONLY_SETTLE",
            maxDiscountCodeCount:"1",
            showAddedInput:"0",
        }
        this.productDetailSettleButtonConfig = {
            system:false,
            spbConfigs:[]
        };
        this.cartSettleButtonConfig = {
            spbConfigs:[]
        };
        this.checkoutSettleButtonConfig = {
            spbConfigs:[]
        };
        this.stockLockConfig = {
            enableLockStockInOrderCreate:"0",
        };
        this.paymentSecurity = {
            paymentSecurityEnable:"0",
            paymentSecurityDesc:"",
            paymentSecurityImageType:"0",
            paymentSecurityPcImages:[],
            paymentSecurityMobileImages:[],
        };
        this.afterSaleGuarantee = {
            afterSaleGuaranteeEnable:"0",
            afterSaleGuaranteeDesc:"",
        };
        this.checkoutFormConfig = {
            nameType:"FULL",
            companyType:"HIDE",
            address2Type:"HIDE",
            postCodeCheck:"0",
            phoneType:"REQUIRED",
            orderRemarkType:"HIDE",
            receiveAddressAsBillAddress:"1",
            autoFillAddress:"1",
        };
        this.tipConfigInfo = {
            showTip:false,
            hasTipShowConfig:false,
            showTipOptions:false,
            tipOptionInfoList:[]
        }
        this.tipShowConfigInfo = {
            title: "",
            describe: "",
            customGuide: "",
            customButtonDesc: "",
            thanksDesc: ""
        }
    }

}

export default new settingsInfo();
