import { request } from "@umijs/max";

export async function getPurchaseList() {
    return request("/api/ApiResource/purchase_list", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data:{
      }
    });
}