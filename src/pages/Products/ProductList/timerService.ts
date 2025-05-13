// src/services/timerService.ts
import { getTaskStatus } from "@/services/y2/api";

let timerId: NodeJS.Timeout | null = null;

export function startPolling(taskId: string, callback: (status: any) => void) {
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(() => {
        getTaskStatus(taskId).then((req) => {
            callback(req.data);
        }).catch((err) => {
            console.error("Error fetching task status:", err);
        });
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