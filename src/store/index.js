import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import VuexPersist from 'vuex-persist'

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage //可选，sessionStorage/indexDB
});

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    errorLog,
    tagsView,
    user
  },
  getters,
  plugins: [vuexLocal.plugin]
})
