const SEC = 1000
const TIMEOUT = 10 * SEC
const setTime = (limit = TIMEOUT) => time => time >= limit

// 获取页面加载时间
const getLoadTime = ({startTime, responseEnd}) => responseEnd - startTime
const getName = ({name}) => name

// 获取超时的资源名
const getTimeoutRes = (limit = TIMEOUT) => {
	const isTimeout = setTime()
	const resourceTimes = performance.getEntriesByType('resource')
	console.log('resourceTimes', resourceTimes)
	return resourceTimes.filter(item => isTimeout(getLoadTime(item))).map(getName)
}
const logPackage = () => {
	const [{domComplete}] = performance.getEntriesByType('navigation')
	const timeoutRes = getTimeoutRes(10000)
	console.log('页面加载时间', domComplete)
	console.log('超时资源', timeoutRes)
}
export const pMonitor = {
	initPm: () => {
		const oldOnload = window.onload
		window.onload = e => {
			if (oldOnload && typeof oldOnload === 'function') {
				oldOnload(e)
			}
			if (window.requestIdleCallback) {
				window.requestIdleCallback(logPackage)
			} else {
				setTimeout(logPackage)
			}
		}
	}
}