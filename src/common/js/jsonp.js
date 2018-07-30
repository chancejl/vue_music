/**
 * Created by 96004 on 2017/7/11.
 */
import pureJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    pureJsonp(url, option, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function param (data) {
  var str = ``
  for (let k in data) {
    str += `&${k}=${data[k]}`
  }
  return str.substring(1)
}
