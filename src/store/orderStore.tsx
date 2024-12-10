import { action, makeObservable, observable } from "mobx";
import { addOrders } from "@/services/y2/order";

class OrderStore {
  @observable orders: Order[] = [];

  constructor() {
    makeObservable(this);
  }

  @action createOrder = async (order: any) => {
    try {
      // 发送 POST 请求创建订单
      const response = await addOrders(order);
      if (response && response.success) {
        // 如果创建成功，将新订单添加到 orders 数组中
        this.orders.push(response.data);
      } else {
        console.error('Failed to create order:', response);
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      // 可以在这里添加更详细的错误处理逻辑
    }
  };
}

export default new OrderStore();
