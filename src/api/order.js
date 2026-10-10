import request from "@/utils/request";

export default {
  //系统派单
  orderDispatch: (data) => {
    return request({
      url: "api/order/dispatch",
      method: "get",
      data,
    });
  },
  //提交订单
  orderSubmit: (data) => {
    return request({
      url: "api/order/submit",
      method: "post",
      data,
    });
  }, //支付订单
  orderPay: (data) => {
    return request({
      url: "api/order/pay",
      method: "post",
      data,
    });
  },
  //订单列表
  orderList: (data) => {
    return request({
      url: "api/order/list",
      method: "get",
      data,
    });
  },
  //订单详情
  orderInfo: (data) => {
    return request({
      url: "api/order/info",
      method: "post",
      data,
    });
  },
  //取消订单
  orderCancel: (data) => {
    return request({
      url: "api/order/cancel",
      method: "post",
      data,
    });
  },
  // 倒计时
  countdown: (data) => {
    return request({
      url: "/api/time/end",
      method: "get",
      data,
    });
  },
};
