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