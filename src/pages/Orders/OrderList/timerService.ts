// src/services/timerService.ts

import { batchShipmentStatus } from "@/services/y2/apiShipment";

let timerId: NodeJS.Timeout | null = null;

export function startPolling(taskId:string, languages_id:string, callback: (status: any) => void) {
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(() => {
        batchShipmentStatus({
            languages_id:languages_id,
            task_id:taskId,
        }).then((req) => {
            callback(req.data);
        }).catch(()=>{});
    }, 3000); // 每秒轮询一次
}

export function stopPolling() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

export function clearTimerId() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    // productList.setTimerId(null);
}