
export function addClass (el, classN) {
  if (hasClass(el, classN)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(classN)
  el.className = newClass.join(' ')
}
export function hasClass (el, classN) {
  let reg = new RegExp('(^|\\s)' + classN + '(\\s|$)')
  return reg.test(el.className)
}

 export function getData(el,name,val){
  const prefix='data-'
   name=prefix+name
   if(val){
    return el.setAttribute(name,val)
   }else{
    return el.getAttribute(name)
   }
 }
