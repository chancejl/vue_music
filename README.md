# Vue-music
猫咪音乐
# demo 展示
播放器首页：
![image](https://github.com/chancejl/vue_music/blob/master/cat-main.PNG)

播放器列表：热门推荐，歌手列表
![image](https://github.com/chancejl/vue_music/blob/master/cat-list.PNG)
![image](https://github.com/chancejl/vue_music/blob/master/music-singer.PNG)

播放器搜索：
![image](https://github.com/chancejl/vue_music/blob/master/music-search.PNG)


## 问题解决

### 搜索栏的优化
> 在搜索歌曲活着歌手时，我们会发现只要input框有变化就会发送请求，这样会浪费宽带，并且频繁的请求对于前端优化不友好
所有我在源头进行了截流，其实就是添加了定时器，在一段时间内没有变化失去请求数据达到结构的返回。
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

### 图片挂载问题
> 设置了图片的样式和slider的宽度以后 图片的大小没有变化还是很大  

- 在slider组件中,在mounted这个钩子函数中执行setSliderWidth这个函数设置轮播总长度和给slider-item添加class
- 在recommond组件中我获取数据是在created这个钩子中获取,本来是认为在created获取可以保证后面挂载的正常进行,因为在创建时就有元素，但是其实获取数据是需要时间的，其实在进行mounted这一步的时,数据可能还没右,所以slider里面并没有元素,即使数据获取回来后,mouted已经结束,所以样式未添加上
- 解决 在slider标签增加 v-if="recommondData.length"，当recommondData有数据后再进行挂载



