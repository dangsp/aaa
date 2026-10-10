import request from '@/utils/request'

export default {
  getOrderList: (data) => {
    return request({
      url: 'api/order/list',
      method: 'get',
      data
    })
  },
  getOrderInfo: (data) => {
    return request({
      url: 'api/order/info',
      method: 'get',
      data
    })
  },
  //获取二维码
  userQrcode: (data) => {
    return request({
      url: 'api/User/qrcode',
      method: 'post',
      data
    })
  },
  //我的团队
  myTeam: (data) => {
    return request({
      url: 'api/User/myTeam',
      method: 'post',
      data
    })
  },  //我的团队详情
  myTeamInfo: (data) => {
    return request({
      url: 'api/User/myTeamInfo',
      method: 'post',
      data
    })
  },
  //银行列表
  bankList: (data) => {
    return request({
      url: 'api/User/bankList',
      method: 'get',
      data
    })
  },
  //取消订单
  cancelOrder: (data) => {
    return request({
      url: 'api/order/cancel',
      method: 'get',
      data
    })
  },
  //修改银行卡号
  userBank: (data) => {
    return request({
      url: 'api/User/bank',
      method: 'post',
      data
    })
  },
}
