import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'

// 默认配置
axios.defaults.baseURL = '/';
axios.defaults.timeout = 5000                  // 响应时间
//设置默认请求头
axios.defaults.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',         // 设置传输类型(json,form表单)
    "token": sessionStorage.getItem('token') || ''     // token
}

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

// 请求拦截过滤重复请求
axios.interceptors.request.use(config => {
    // 发起请求时，取消当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    return config
}, error => {
    return Promise.reject(error)
})

// "响应" 拦截器即异常处理 
axios.interceptors.response.use(response => {
    return response;
}, err => {
    // 请求的错误判断,根据不同的错误码不同消息提醒
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '错误请求'
                break;
            case 500: err.message = '服务器端出错'
                break;
            default: err.message = `连接错误${err.response.status}`
        }
    } else {
        err.message = '连接服务器失败'
    }
    message.error(err.message)         // 错误提示,记得引入  message
    return Promise.resolve(err.response)
})

// 封装请求方式
let http = {
    // get请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                params: qs.stringify(param),    // 序列化
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).then(err => {
                reject(err)
            })
        })
    },

    //post请求
    post(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: JSON.stringify(param),           //json方式提交
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).then(err => {
                reject(err)
            })
        })
    },
}

export default http