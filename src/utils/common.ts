import { getCountryList, getStoreInfo } from "@/services/y2/api";
import { message } from 'antd';
import cookie from 'react-cookies';
import currencyList from "@/../public/json/currency.json";


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

// 获取币种符号
export function getSymbolLeft() {
  let symbolLeft = "";
  const defaultCurrency = cookie.load("domain")?.default_currency;
  const currencies = JSON.parse(localStorage.getItem("MC_DATA_CURRENCIES") || '[]');
  // 查找默认币种
  const defaultCurrencyObj = currencies.find((item: any) => item.code === defaultCurrency);
  if(defaultCurrencyObj){
    symbolLeft = defaultCurrencyObj.symbol_left
  }else{
    message.error("未找到店铺币种")
  }
  return symbolLeft;
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