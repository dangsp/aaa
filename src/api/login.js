import request from '@/utils/request'

export default {
  //登录
  login: (data) => {
    return request({
      url: 'api/Login/login',
      method: 'post',
      data
    })
  },  //发送验证码

  sendMailCode: (data) => {
    return request({
      url: 'api/Login/sendMailCode',
      method: 'post',
      data
    })
  },
  //注册
  register: (data) => {
    return request({
      url: 'api/Register/register',
      method: 'post',
      data
    })
  },
  //忘记密码
  retrievePassword: (data) => {
    return request({
      url: 'api/Login/retrievePassword',
      method: 'post',
      data
    })
  },
  //修改登录密码
  userPassword: (data) => {
    return request({
      url: 'api/User/password',
      method: 'post',
      data
    })
  },//修改支付密码
  userPayPassword: (data) => {
    return request({
      url: 'api/User/payPassword',
      method: 'post',
      data
    })
  },
  //设置支付密码
  setPayPassword: (data) => {
    return request({
      url: 'api/User/setPayPassword',
      method: 'post',
      data
    })
  },

}
