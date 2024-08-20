import { action, makeObservable, observable } from "mobx";
import { addOrders } from "@/services/y2/order";

class OrderStore {
  @observable orders: any[] = [];

  constructor() {
    makeObservable(this);
  }

  @action createOrder = async () => {
    // 创建一个新的空订单
    const newOrder = {
      id: this.orders.length + 1,
      products: [],
      discount: 0,
      shippingFee: 0,
      tax: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      // 发送 POST 请求创建订单
      const response = await addOrders(newOrder);
      if (response && response.success) {
        // 如果创建成功，将新订单添加到 orders 数组中
        this.orders.push(response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
}

export default new OrderStore();