
import * as types from './mutation-types'
import { shuffle } from 'common/js/randomList'
import { playMode } from 'common/js/config'
import {saveSearch,deleSearch,clearSearch} from 'common/js/cache'
export const selectPlay = function ({commit, state}, {list, index}) {
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYINGLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYINGLIST, list)
  }
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const randomPlay=function({commit},{list}){
  commit(types.SET_MODE,playMode.random)
  let randomList = shuffle(list)
  commit(types.SET_PLAYINGLIST, randomList)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)


}
function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export const saveSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,deleSearch(query))
}

export const clearSearchHistory = function({commit}){
  commit(types.SET_SEARCH_HISTORY,clearSearch())
}
