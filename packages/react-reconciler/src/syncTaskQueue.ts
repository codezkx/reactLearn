let syncQueue: ((...args: any) => void)[] | null = null;
let isFlushingSyncQueue = false;

// 存储 任务的回调函数
export function scheduleSyncCallback(callback: (...args: any) => void) {
	if (!syncQueue) {
		syncQueue = [callback];
	} else {
		syncQueue.push(callback);
	}
}

// 执行对应的 任务回调
export function flushSyncCallbacks() {
	if (!isFlushingSyncQueue && syncQueue) {
		isFlushingSyncQueue = true;
		try {
			syncQueue.forEach((callback) => callback());
		} catch (e) {
			console.error('TODO flushSyncCallbacks报错', e);
		} finally {
			isFlushingSyncQueue = false;
		}
	}
}
