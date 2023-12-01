import request, { baseURL } from '../util/request';

/**
 * 获取订单列表
 */
export function getOrderList(page, limit, token) {
    return request({
        url: baseURL.adminApi + '/ApiStore/order_list',
        method: 'get',
        params: { page, limit, access_token: token },
    });
}
