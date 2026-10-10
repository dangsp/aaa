import axios from 'axios'
import store from '@/store'
import {getToken} from '@/utils/auth'
// import Qs from 'qs'
import {router} from "@/router";
import {Toast, Dialog} from 'vant';
import {i18n} from '@/lang';
console.log(window.webConfig);

let baseURL = window.webConfig.production;

if (process.env.NODE_ENV == "development") {
  baseURL =window.webConfig.development
  // baseURL = process.env.API_ROOT;
} else {
    baseURL = window.webConfig.production;
}

const service = axios.create({
    baseURL,
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {

        let token = getToken();
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)
export default (({url = "", method = "post", data = {}}) => {
    let type = method.toUpperCase();
    let httpUrl = `${url}`;
    if (type == 'GET') {
        return new Promise((resolve, reject) => {
            service.get(httpUrl, {params: data})
                .then(response => {
                    let result = response.data;
                    // 400001 => '登录超时，请重新登录',
                    //   400002 => '用户不存在或已被禁用',
                    //   400003 => '您的账号已在其他地方登陆，请重新登录',
                    //   400004 => '用户未登录',
                    if (result.code == 300) {
                        store.dispatch('FedLogOut').then(() => {
                          Toast(i18n.t('loginErr'))
                            // if (result.code != 400002) {
                            // location.reload() // 为了重新实例化vue-router对象 避免bug
                            router.push('/login')
                            // } else {
                            //   Toast(result.msg)
                            // }
                        })
                      
                        reject();
                    } else {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                    Toast(i18n.t('error'));
                });
        });
    } else if (type == 'POST') {

        return new Promise((resolve, reject) => {
            service.post(httpUrl, data)
                .then(response => {
                    let result = response.data;
                    if (result.code == 300) {
                        // store.dispatch('FedLogOut').then(() => {
                        //   Toast(i18n.t('loginErr'))
                        //     // if (result.code != 400002) {
                        //     location.reload() // 为了重新实例化vue-router对象 避免bug
                        //     // } else {
                        //     //   Toast(result.msg)
                        //     // }
                        // })
                        router.push('/login')

                        reject();
                    } else {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                    Toast(i18n.t('error'));
                });
        });
    }
})

