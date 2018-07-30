
import jsonp from 'jsonp';
import axios from 'axios'
import { commonParams,options } from './config'
export function getHotTag () {
  const url = '/api/getHotTag'
  const data = Object.assign({}, commonParams)
  return axios.get(url, {
    params: data
  }).then(res=>{
    return res.data
  })
}
export function getSearch(query, page,perpage) {
  const url = '/api/getSearch'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida:1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return axios.get(url, {
    params:data
  }).then(res=>{
    return res.data
  })
}
