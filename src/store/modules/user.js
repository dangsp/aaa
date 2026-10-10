import {loginByMobile, logout} from '@/api/login'
import {getUserInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {Toast} from 'vant';

const user = {
  state: {
    userInfo: {},
    token: getToken(),
    lang: "cn",
    user: '',
    status: '',
    uid: '',
    sid: '',
    gid: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_SID: (state, sid) => {
      state.sid = sid
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token);
    },
    SET_LANG: (state, lang) => {
      state.lang = lang;
      sessionStorage.setItem("lang", lang)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.userInfo.nickname = name
    },
    SET_AVATAR: (state, avatar) => {
      state.userInfo.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    //手机号码登录
    // LoginByMobile({commit, state}, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     loginByMobile(userInfo).then(response => {
    //       const data = response;
    //       if (data.code != 0) {
    //         Toast(data.msg);
    //         return;
    //       }
    //       commit('SET_TOKEN', data.data.token)
    //       setToken(data.data.token)
    //       user.actions.GetUserInfo({commit}).then(res => {
    //         resolve(res)
    //       }).catch(err => {
    //         reject(err)
    //       })
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 获取用户信息
    // GetUserInfo({commit, state}, query) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(query).then(response => {
    //       const data = response;
    //       if (data.code != 0) {
    //         Toast(data.msg);
    //         return;
    //       }
    //       commit('SET_USERINFO', data.data[0]);
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {})
        commit('SET_ROLES', [])
        removeToken()
      })
    },
    // clearCache({commit}, state) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_LANG', "cn");
    //     user.actions.GetUserInfo({commit, state}).then(res => {
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_USERINFO', {})
        commit('SET_LANG', "cn")
        removeToken();
        resolve()
      })
    },
  }
}

export default user
