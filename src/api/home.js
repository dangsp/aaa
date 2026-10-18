import request from "@/utils/request";

export default {
  login: (data) => {
    return request({
      url: "/api/login",
      method: "post",
      data,
    });
  },
  bannerList: (data) => {
    return request({
      url: "/api/car/index",
      method: "post",
      data,
    });
  },
  filmList: (data) => {
    return request({
      url: "/api/film/index",
      method: "post",
      data,
    });
  },
  channelList: (data) => {
    return request({
      url: "/api/v1/channel/list",
      method: "post",
      data,
    });
  },
  register: (data) => {
    return request({
      url: "/api/register",
      method: "post",
      data,
    });
  },
  withdrawOrder: (data) => {
    return request({
      url: "/api/v1/withdraw/order/list",
      method: "post",
      data,
    });
  },
  userSatisfy: (data) => {
    return request({
      url: "/api/user/satisfy",
      method: "post",
      data,
    });
  },
  userIndex: (data) => {
    return request({
      url: "/api/user/index",
      method: "post",
      data,
    });
  },
  getBalance: (data) => {
    return request({
      url: "/api/user/balance",
      method: "post",
      data,
    });
  },
  getDetails: (data) => {
    return request({
      url: "/api/film/details",
      method: "post",
      data,
    });
  },
  orderBuy: (data) => {
    return request({
      url: "/api/order/buy",
      method: "post",
      data,
    });
  },
  orderLog: (data) => {
    return request({
      url: "/api/order/log",
      method: "post",
      data,
    });
  },
  userPull: (data) => {
    return request({
      url: "/api/user/pull",
      method: "post",
      data,
    });
  },
  userInfo: (data) => {
    return request({
      url: "/api/user/get/info",
      method: "post",
      data,
    });
  },
  setInfo: (data) => {
    return request({
      url: "/api/user/set/info",
      method: "post",
      data,
    });
  },
  configList: (data) => {
    return request({
      url: "/api/config/index",
      method: "post",
      data,
    });
  },
  googleLogin: (data) => {
    return request({
      url: "/api/google/login",
      method: "post",
      data,
    });
  },
  googleCode: (data) => {
    return request({
      url: "/api/google/code",
      method: "post",
      data,
    });
  },
  configWeb: (data) => {
    return request({
      url: "/api/config/web",
      method: "post",
      data,
    });
  },
  getFootConfig: (data) => {
    return request({
      url: "/api/get/config",
      method: "post",
      data,
    });
  },
  getQrcode: (data) => {
    return request({
      url: "/api/get/qrcode",
      method: "post",
      data,
    });
  },
  depositList: (data) => {
    return request({
      url: "/api/deposit/config/index",
      method: "post",
      data,
    });
  },
  satisfy: (data) => {
    return request({
      url: "/api/user/satisfy",
      method: "post",
      data,
    });
  },
  getBalance: (data) => {
    return request({
      url: "/api/user/balance",
      method: "post",
      data,
    });
  },
  homeToast: () => {
    return request({
      url: "/api/deposit/msg",
      method: "post",
    });
  },
  homeToastEdit: (data) => {
    return request({
      url: "api/deposit/edit",
      method: "post",
      data,
    });
  },
};
