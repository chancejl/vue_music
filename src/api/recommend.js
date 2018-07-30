
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommond () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiss () {
  const url = '/api/getDiss'
  const data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return res.data
  })
}
export function getDissList (disstid) {
  const url = '/api/getDissList'
  const data = Object.assign({}, commonParams, {
    g_tk: 1394118960,
    platform: 'yqq',
    needNewCode: 1,
    new_format: 1,
    pic: 500,
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    nosign: 1
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return res.data
  })
}

