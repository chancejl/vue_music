
import  Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import {mutations} from './mutations';
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createLogger()]
})
export default store;

