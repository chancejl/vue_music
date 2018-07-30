
import { playMode } from 'common/js/config'
import {loadSearch} from 'common/js/cache'
export default {
  singer: {},
  playing: false,
  fullScreen: false,
  playingList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {a: 1},
  topList: {},
  playHistory:[],
  userD: false,
  searchHistory:loadSearch()
}
