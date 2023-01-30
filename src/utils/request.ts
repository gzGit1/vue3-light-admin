import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus'
import { getToken } from './auth';
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/' : window.urlconfig.apiUrl || '/',
    timeout: 200000, // request timeout
    validateStatus: function (status) {
        return status >= 200; // default
    },
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something before request is sent
        if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken();
            config['refresh_token'] = false;
        }
        if (!config.params) {
            delete config.params
        }
        if (
            config.headers["Content-Type"] === "application/x-www-form-urlencoded"
        ) {
            if (
                config.method === "post" ||
                config.method === "put" ||
                config.method === "delete"
            ) {
                config.data = qs.stringify(config.data);
            }
        }
        //登录接口固定Authorization
        if (config.url.includes('oauth/token')) {
            config.headers.Authorization = "Bearer YW5kcm9pZDphbmRyb2lk";
            return config;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(async (response: AxiosResponse) => {
    const res = response.data
    const headers = response.headers
    let headersInfo = headers['content-type']
    if (headersInfo == 'application/vnd.ms-excel;charset=UTF-8') {
        return response;
    }
    if (res.code === 401) {
    } else if (res.code != 200) {
        return Promise.reject(new Error(res.msg || 'Error'))
    } else {
        return res;
    }

}, async (error) => {
    if (error && error.response) {
        const errMsg = error.message;
        if (errMsg.includes("Network Error")) {
            ElMessage({ type:'warning', message: "网络异常，请稍后尝试" });
        } else if (errMsg.includes("timeout")) {
            ElMessage({ type:'warning', message: "请求超时，请稍后尝试" });
        } else {
            let errmsg;
            switch (error.response.code) {
                case 400:
                    errmsg = "请求错误";
                    break;
                case 401:
                    errmsg = "未授权，请登录";
                    break;
                case 403:
                    errmsg = "拒绝访问";
                    break;
                case 404:
                    errmsg = `404 找不到请求的资源: ${error.response.config.url.slice(
                        error.response.config.url.lastIndexOf("/") + 1
                    )}`;
                    break;
                case 408:
                    errmsg = "请求超时";
                    break;
                case 500:
                    errmsg = `500 服务器内部错误 [${errMsg}]`;
                    break;
                case 501:
                    errmsg = "服务未实现";
                    break;
                case 502:
                    errmsg = "网关错误";
                    break;
                case 503:
                    errmsg = "服务不可用";
                    break;
                case 504:
                    errmsg = "网关超时";
                    break;
                case 505:
                    errmsg = "HTTP版本不受支持";
                    break;
                case 530:
                    errmsg = "登录超时，请重新登录";
                    break;
                default:
                    errmsg = `请求出错 [${errMsg}]`;
                    break;
            }
            ElMessage({ type:'warning', message: errmsg });
        }
    }

    return Promise.reject(error)
})


export default service;