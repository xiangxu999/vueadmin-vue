import Vue from 'vue'

let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading(targetdq) {
    loading = Vue.prototype.$loading({
        lock: true,
        background: 'rgba(255,255,255,.4)',
        target: document.querySelector(targetdq) // 设置加载动画区域
    })
}

function endLoading() {
    loading.close()
}

export function showFullScreenLoading(targetdq) {
    if (needLoadingRequestCount === 0) {
        startLoading(targetdq)
    }
    needLoadingRequestCount++
}

export function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

export default {
    showFullScreenLoading,
    hideFullScreenLoading
}