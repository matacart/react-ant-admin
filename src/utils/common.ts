import cookie from 'react-cookies';
import currencyList from "@/../public/json/currency.json";
import { getCountryList } from "@/services/y2/apiAppstore";

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

// 货币精度格式化 --- 显示金额
export function currencyPrecision(amount: number) {
  const defaultCurrency = cookie.load("domain")?.default_currency;
  const defaultCurrencyObj = currencyList.find((item: any) => item.currency_code === defaultCurrency);
  if(defaultCurrencyObj){
    const decimals = Math.log10(defaultCurrencyObj.amount_rule);
    return (amount/defaultCurrencyObj.amount_rule).toFixed(decimals);
  }else{
    return (amount/100).toFixed(2);
  }
}

// 货币精度
export function getPrecision() {
  const defaultCurrency = cookie.load("domain")?.default_currency;
  const defaultCurrencyObj = currencyList.find((item: any) => item.currency_code === defaultCurrency);
  let decimals = defaultCurrencyObj ? Math.log10(defaultCurrencyObj.amount_rule) : 2;
  let amountRule = defaultCurrencyObj ? defaultCurrencyObj.amount_rule : 100;
  return {decimals,amountRule};
}

// 根据币种 价格 格式化 --- 显示金额
export function getCurrencyAmount(currencyCode: string,amount:number) {
  const localStorageCurrencyList = JSON.parse(localStorage.getItem("MC_DATA_CURRENCIES") || "[]");
  const currencyObj = localStorageCurrencyList.find((item: any) => item.code === currencyCode);
  const symbolLeft = currencyObj.symbol_left || "";
  const defaultCurrencyObj = currencyList.find((item: any) => item.currency_code === currencyCode);
  if(defaultCurrencyObj){
    const decimals = Math.log10(defaultCurrencyObj.amount_rule);
    return symbolLeft + (amount/defaultCurrencyObj.amount_rule).toFixed(decimals);
  }else{
    return symbolLeft + (amount/100).toFixed(2);
  }

}

// 根据币种获取币种符号
export function getCurrencySymbol(currencyCode: string) {
  const localStorageCurrencyList = JSON.parse(localStorage.getItem("MC_DATA_CURRENCIES") || "[]");
  const currencyObj = localStorageCurrencyList.find((item: any) => item.code === currencyCode);
  return currencyObj?.symbol_left || "";
}

