import { request } from '@umijs/max';
import axios from 'axios'; // 引入 axios 库





export async function createOrUpdateCustomer(page: any, limit: any) {
    return request(`/api/ApiStore/customers_list?page=${page}&limit=${limit}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }