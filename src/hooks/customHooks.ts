import { useEffect, useRef } from "react";

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

// 基础版（推荐常规使用）睡眠
export const useSleep = () => {
  return (ms: number) => new Promise<void>(resolve => 
    setTimeout(resolve, ms)
  );
};

// 单击元素之外触发
export default function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}



