 
function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let b = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = b
  }
  return _arr
}
//截留函数
export function debounce(func,delay){
  let timer

  return function(...args){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
