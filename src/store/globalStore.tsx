import { action, observable } from "mobx";

class globalStore {
    
    // 店铺
    @observable shop = [];
    // 款式内容
    @action setShop(shop: any) {
        this.shop = shop
    }
}

export default new globalStore();