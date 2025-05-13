
// 自定义 Hook：对数组进行分组 -- 根据obj.group
export const useGroupArray = (arr:any,group:string) => {
    return arr.reduce((acc:any, obj:any) => {
      const key = obj[group] || 'others'; // 空值归为 others
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
};

// 基础版（推荐常规使用）
export const useSleep = () => {
  return (ms: number) => new Promise<void>(resolve => 
    setTimeout(resolve, ms)
  );
};



