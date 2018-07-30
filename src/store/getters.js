
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playingList = state => state.playingList
export const currentIndex = state => state.currentIndex
export const mode = state => state.mode
// export const currentIndex = state =>state.currentIndex
export const currentSong = state => {
  return state.playingList[state.currentIndex] || {}
}
export const disc = state => state.disc
export const topList = state => state.topList
export const playHistory = state => state.playHistory
export const userD = state => state.userD
export const searchHistory = state => state.searchHistory
