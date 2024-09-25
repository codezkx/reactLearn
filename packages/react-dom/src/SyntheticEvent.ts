import { Container } from 'hostConfig';

const validEventTypeList = ['click'];

export const elementPropsKey = '__props';

interface SyntheticEvent extends Event {
	__stopPropagation: boolean;
}

type EventCallback = (e: SyntheticEvent) => void;

interface Paths {
	capture: EventCallback[];
	bubble: EventCallback[];
}

export interface DOMElement extends Element {
	[elementPropsKey]: {
		[key: string]: any;
	};
}

export function updateFiberProps(node: DOMElement, props: any) {
	node[elementPropsKey] = props;
}

export function initEvent(container: Container, eventType: string) {
	if (!validEventTypeList.includes(eventType)) {
		console.error('当前不支持', eventType, '事件');
		return;
	}
	if (__DEV__) {
		console.log('初始化事件：', eventType);
	}
	container.addEventListener(eventType, (e) => {
		dispatchEvent(container, eventType, e);
	});
}

export function dispatchEvent(
	container: Container,
	eventType: string,
	e: Event
) {
	const targetElement = e.target;
	// 1、收集沿途的事件
	if (targetElement === null) {
		console.error('事件不存在target', e);
		return;
	}
	const { capture, bubble } = collectPaths(
		targetElement as DOMElement,
		container,
		eventType
	);
	// 2、构造合成事件
	const se = createSyntheticEvent(e);
	if (__DEV__) {
		console.log('模拟事件捕获阶段：', eventType);
	}
	// 3、遍历 capture
	triggerEventFlow(capture, se);
	// 4、遍历 bubble
	if (!se.__stopPropagation) {
		if (__DEV__) {
			console.log('模拟事件冒泡阶段：', eventType);
		}
		triggerEventFlow(bubble, se);
	}
}

export function collectPaths(
	targetElement: DOMElement,
	container: Container,
	eventType: string
) {
	const paths: Paths = {
		capture: [],
		bubble: []
	};

	while (targetElement && targetElement !== container) {
		// 收集
		const elementProps = targetElement[elementPropsKey];
		if (elementProps) {
			const callbackNameList = getEventCallbackNameFromtEventType(eventType);
			if (callbackNameList) {
				callbackNameList.forEach((callbackName, i) => {
					const eventCallback = elementProps[callbackName];
					if (eventCallback) {
						// 捕获
						if (i === 0) {
							paths.capture.unshift(eventCallback);
						} else {
							paths.bubble.push(eventCallback);
						}
					}
				});
			} else {
				console.warn(`未实现对应的事件`, eventType);
			}
		}
		targetElement = targetElement.parentNode as DOMElement;
	}
	return paths;
}

// 支持哪些事件类型
function getEventCallbackNameFromtEventType(
	eventType: string
): string[] | undefined {
	return {
		click: ['onClickCapture', 'onClick']
	}[eventType];
}

// 创建合成事件的 Event 对象
function createSyntheticEvent(e: Event) {
	const syntheticEvent = e as SyntheticEvent;
	// 在event原生event对象上添加, 判断是否阻止冒泡属性
	syntheticEvent.__stopPropagation = false;
	const originStopPropagation = e.stopPropagation.bind(e);

	syntheticEvent.stopPropagation = () => {
		syntheticEvent.__stopPropagation = true;
		if (originStopPropagation) {
			originStopPropagation();
		}
	};
	return syntheticEvent;
}

// 触发对应事件处理程序
function triggerEventFlow(paths: EventCallback[], se: SyntheticEvent) {
	for (let i = 0, len = paths.length; i < len; i++) {
		const callback = paths[i];
		if (callback) {
			callback.call(null, se);
		}
		if (se.__stopPropagation) {
			break;
		}
	}
}
