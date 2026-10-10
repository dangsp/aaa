import request from '@/utils/request'

export default {

  //修改收货地址
  userAddress: (data) => {
    return request({
      url: 'api/User/address',
      method: 'post',
      data
    })
  }, //退出登录
  userLogout: (data) => {
    return request({
      url: 'api/Login/logout',
      method: 'get',
      data
    })
  },
  getUserInfo: (data) => {
    return request({
      url: 'api/user/get/info',
      method: 'post',
      data
    })
  },
  getMsgContent: (data) => {
    return request({
      url: 'api/user/msg/content',
      method: 'post',
      data
    })
  },
  getMsgStatus: (data) => {
    return request({
      url: 'api/msg/status',
      method: 'post',
      data
    })
  },
  getIsLottery: (data) => {
    return request({
      url: 'api/get/isLottery',
      method: 'post',
      data
    })
  },
  getSetIsLottery: (data) => {
    return request({
      url: 'api/set/lottery',
      method: 'post',
      data
    })
  },
  getMylottery : (data) => {
    return request({
      url: 'api/my/lottery',
      method: 'post',
      data
    })
  },
}

