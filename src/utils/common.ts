import { getCountryList } from "@/services/y2/api";

// 清除当前域名下的cookie
export function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    if(name !== "access_token"){
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}

// 存储国家列表
export async function setLocalStorageCountryList() {
  try {
    const res = await getCountryList();
    if(res.code == 0){
      localStorage.setItem("MC_DATA_COUNTRY", JSON.stringify(res.data || []));
      return res.data || [];
    }
  } catch (error) {
    console.log(error);
  }
}