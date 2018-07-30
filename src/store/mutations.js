
import * as types from './mutation-types'
export const mutations = {
  [types.SET_SINGER](state, data) {
    state.singer = data
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYINGLIST](state, list) {
    state.playingList = list
  },
  [types.SET_MODE](state, num) {
    state.mode = num
  },
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, data) {
    state.disc = data
  },
  [types.SET_TOPLIST](state, data) {
    state.topList = data
  },
  [types.SET_PLAY_HISTORY](state,data) {
    state.playHistory.unshift(data)
  },
  [types.SET_USER](state,data) {
    state.userD=data
  },
  [types.SET_SEARCH_HISTORY](state,history){
    state.searchHistory = history
  }
}
