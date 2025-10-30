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


/**
 * 自定义hook，用于创建和管理多个AbortController
 * 可以在组件卸载时自动取消所有未完成的请求
 */
export const useAbortController = () => {
  const abortControllersRef = useRef<AbortController[]>([]);

  // 创建新的AbortController
  const createAbortController = () => {
    const abortController = new AbortController();
    abortControllersRef.current.push(abortController);
    return abortController.signal;
  };

  // 获取所有signals
  const getAllSignals = () => {
    return abortControllersRef.current.map(controller => controller.signal);
  };

  // 手动取消特定请求
  const abort = (signal?: AbortSignal) => {
    if (signal) {
      // 终止特定请求
      const controller = abortControllersRef.current.find(
        ctrl => ctrl.signal === signal
      );
      if (controller) {
        controller.abort();
      }
    } else {
      // 终止所有请求
      abortControllersRef.current.forEach(controller => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      });
    }
  };

  // 组件卸载时自动取消所有请求
  useEffect(() => {
    return () => {
      abortControllersRef.current.forEach(controller => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      });
    };
  }, []);

  return {
    createAbortController,
    getAllSignals,
    abort,
  };
};

// /**
//  * 自定义hook，用于创建和管理AbortController
//  * 可以在组件卸载时自动取消未完成的请求
//  */
// export const useAbortController = () => {
//   const abortControllerRef = useRef<AbortController | null>(null);

//   // 创建新的AbortController
//   const createAbortController = () => {
//     // 如果已存在，先取消之前的请求
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
    
//     // 创建新的控制器
//     abortControllerRef.current = new AbortController();
//     return abortControllerRef.current.signal;
//   };

//   // 获取当前的signal
//   const getSignal = () => {
//     return abortControllerRef.current?.signal;
//   };

//   // 手动取消请求
//   const abort = () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//   };

//   // 组件卸载时自动取消请求
//   useEffect(() => {
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, []);

//   return {
//     createAbortController,
//     getSignal,
//     abort,
//   };
// };



