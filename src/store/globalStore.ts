import { cancelFavoriteCourier, getShippingCourier, setFavoriteCourier } from "@/services/y2/apiLogistics";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import cookie from 'react-cookies';

// 全局状态
class GlobalStore {

    constructor() {
        makeAutoObservable(this)
    }
    
    // 刷新头部
    headRefresh = false;
    setHeadRefresh(value:boolean){
        this.headRefresh = value;
    }

    // ---- 物流服务商缓存 ----
    shippingCourierList: any[] = [];
    shippingCourierLoading = false;
    shippingCourierLoaded = false;
    async getShippingCourierList(): Promise<void> {
        if (this.shippingCourierLoading) return;  // ① 正在请求 → 拦
        if (this.shippingCourierLoaded) return;   // ② 已加载过 → 拦
        this.shippingCourierLoading = true;        // ③ 标记「开始请求」
        try {
            const res = await getShippingCourier();
            runInAction(() => {
                if (res.code === 0) {
                    this.shippingCourierList = res.data ?? [];
                    this.shippingCourierLoaded = true;   // ④ 标记「加载成功」
                }
            });
        } finally {
            runInAction(() => {
                this.shippingCourierLoading = false;   // ⑤ 请求结束（无论成败）
            });
        }
    }

    async toggleFavorite(courierId: string) {
        const target = this.shippingCourierList.find((i) => i.courierId === courierId);
        if (!target) return;
        const isFav = target.favorite;
        try {
            const res = isFav ? await cancelFavoriteCourier({ courierId }) : await setFavoriteCourier({ courierId });
            if (res.code === 0) {
                runInAction(() => {
                    this.shippingCourierList = this.shippingCourierList.map((item) =>
                        item.courierId === courierId ? { ...item, favorite: !item.favorite }: item
                    );
                });
            }
        } catch {
            // 失败不改状态
        }
    }


    // platformCategory = []
    // getPlatformCategory(){
    //     getPlatformCategorySelect("1").then((res:any) => {
    //         this.platformCategory = res.data
    //         // console.log(res)
    //     })
    // }
    // categorylist = [];
    // setCategoryList(category:any) {
    //     this.categorylist = category;
    // }
    // 转树形结构
    buildTree(data:any, parentId = '0') {
        return data.filter((item:any) => item.pid === parentId).map((item:any) => ({
            ...item,
            value: item.id,
            title:item.category_name,
            children: this.buildTree(data, item.id),
        }));
    }
}

export default new GlobalStore();
