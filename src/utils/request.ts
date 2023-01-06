import axios from 'axios';
import errorCode from './errorCode';
import { message, notification } from "ant-design-vue";
import { transformParams } from '@/utils/global'
import CacheUtils from '@/utils/cache';
// axios官方文档：https://axios-http.com/
// 参考若依： https://gitee.com/y_project/RuoYi


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 指定请求超时的毫秒数。
    timeout: 20000,

});

// 添加请求拦截
service.interceptors.request.use((config) => {
    // 更改get请求参数
    if(config.method === 'get' && config.params){
        let url = config.url + '?' + transformParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    // 前端防表单重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const reuqestObject = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime(),
        }
        const sessionObj = CacheUtils.getSessionJson('sessionObj')
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
            CacheUtils.setSessionJson('sessionObj', reuqestObject)
        } else {
            const s_url = sessionObj.url;
            const s_data = sessionObj.data;
            const s_time = sessionObj.time;
            const interval = 1000; 
            // reuqestObject.time - s_time < interval 请求时间小于间隔时间视为重复提交
            if (s_data === reuqestObject.data && reuqestObject.time - s_time < interval && s_url === reuqestObject.url) {
                const repeatError = errorCode['repeatError'];
                message.error(repeatError,2)
                return Promise.reject(new Error(repeatError))
            } else {
                CacheUtils.setSessionJson('sessionObj', reuqestObject)
            }
        }
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    });

// 添加响应拦截

service.interceptors.response.use(
    (response) => {
        // 设置默认成功状态码
        const code = response.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || response.data.msg || errorCode['default'] ;
        if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
            // 直接返回二进制数据
            return response.data;
        }
        // 处理错误信息
        if(code === 500){
            message.error(msg)
            return Promise.reject(new Error(msg))
        }else if(code !== 200){
            notification['error']({
                message: msg,
            })
            return Promise.reject('error')
        }else if(code === 404){
            message.error(msg)
            return Promise.reject(new Error(msg))
        }else {
            return response.data
        }
    },
    (error) => {
        let message = error
        if(message === 'Network Error'){
            message = "后端接口连接异常";
        }else if (message.includes("timeout")) {
            message = "请求超时";
        }else if (message.includes("Request failed with status code")) {
            message = "请求失败";
        }
        message.error(message,3);
        return Promise.reject(error);
    });

export default service;


