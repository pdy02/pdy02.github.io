/* 
一个模糊搜索组件
基于jq，还算好看，使用简单，有点有趣
用法非常简单，你甚至不需要引入css
使用方法：引入然后new一下,在标签上写placeholder和name就和在input上写这两个属性的性质一样。是你需要的效果
<div id="search" placeholder="请搜索" name="searchSelect"></div>
const search = new searchSelect('#search',[{id:1,value:'许嵩'},{id:2,value:'周杰伦'},{id:3,value:'林俊杰'}])
类似这样子，第一个值是元素名，第二个是一个模糊搜索用的数组，它还有第三个参数是个回调函数，这个是一个选填项目，
这个回调函数会在触发input事件被执行
所以这个回调你想写异步搜索也许有用
const search = new searchSelect('#search',[],function(){
$..ajax........
})
update方法,用于更新下拉列表的数据，使用方法
 search.update([{id:1,value:'乌鸦'},{id:2,value:'冰柜'}])
search方法,一般配合回调函数用及update方法做异步请求用，
传入true会一直显示搜索中的字样,如果关掉它可以传入false，调用update也一样会清空搜索状态
search.search(true)
disabled方法，实现disabled效果，传入true开启传入false关闭
search.disabled(true)
empty方法，帮你清空所有内容
search.empty()
assignment方法,你也许有类似编辑页需要直接给搜索框赋值的操作，可以这样做
search.assignment({id:3,value:'苏格拉没有底'})
会帮你选中下拉框中对应的值，没有就帮你加上且自动选中
你也可以直接传个id
search.assignment(1)
这样做会帮你选中对应id的下拉框但是无法实现找不到就自动添加
大清都亡了所以抛弃ie
*/
(function(){
  $('head').append(`
  <style>
  .searchSelect_box {
    position: relative;
  }
  .searchSelect_box>.searchSelect {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    transition: all .2s ease-in-out;
    position: relative;
    width: 100%;
    padding:5px;
  }
  .searchSelect_box>.searchSelect:focus {
    border-color: #57a3f3 !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgb(45 140 240 / 20%) !important;
  }
  .searchSelect_box>.drawer {
    width: 100%;
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      margin: 5px 0;
      padding: 5px 0;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
      position: absolute;
      z-index: 900;
      left: 0;
      top: 30px;
      display:none;
  }
  .searchSelect_box>.drawer>li {
    margin: 0;
      line-height: normal;
      padding: 7px 16px;
      clear: both;
      color: #515a6e;
      font-size: 14px!important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      transition: background .2s ease-in-out;
      overflow:hidden; 
      text-overflow:ellipsis; 
      white-space:nowrap; 
  }
  .searchSelect_box>.drawer>.none {
    padding: 0 16px;
    text-align: center;
    color: #ccc;
  }
  .searchSelect_box>.drawer>li:hover {
    background-color: rgba(0, 0, 0, .1);
  }
  .searchSelect_box>.drawer>.active {
    color: #57a3f3;
  }
  /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
 .searchSelect_box>.drawer::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #fff;
}
/*定义滚动条轨道
  内阴影+圆角*/
.searchSelect_box>.drawer::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    background-color: #fff;
}
/*定义滑块
  内阴影+圆角*/
.searchSelect_box>.drawer::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: #ccc;
}
  </style>
  `)
})()
class searchSelect {
  constructor(dom,list,fn) {
    this.list = []
    this.dom = dom
    this.params = {}
    this.loading = false
	this.fn = fn
    if(list instanceof Array) {
      this.list = list
    }
    $(this.dom).addClass('searchSelect_box')
    let name = $(this.dom).attr('name');
    let placeholder= $(this.dom).attr('placeholder')
    $(this.dom).append('<input placeholder="'+(placeholder||'')+'" type="text" name="'+(name||'')+'" class="searchSelect">')
    $(this.dom).append('<ul class="drawer"></ul>')
    this.getList()
    let that = this
    $(this.dom).children('.searchSelect').on('input',function(){
      let val = $(that.dom).children('.searchSelect').val().trim()
      $(that.dom).children('.searchSelect').val(val)
      if(!(val === $(that.dom).children('.drawer').find('.active').text())) {
        $(that.dom).children('.searchSelect').attr('data-id','')
        $(that.dom).children('.drawer').find('.active').removeClass('active')
        that.params = {}
        fn && fn($(this).val())
      }
      $(that.dom).children('.drawer').stop(true,true).fadeIn()
      if(!that.loading) {
        that.getList(val)
      }
      // that.list.filter((item)=>item.value.inc)
      
    })
    $(this.dom).children('.searchSelect').on('focus',function(){
      $(that.dom).children('.drawer').stop(true,true).fadeIn()
    })
    $(this.dom).children('.searchSelect').on('blur',function(){
      setTimeout(()=>{
        if(!($(that.dom).children('.searchSelect').attr('data-id'))) {
          $(that.dom).children('.searchSelect').val('')
        }
        $(that.dom).children('.drawer').stop(true,true).fadeOut()
      },100)
    })
  }
  // 模糊搜索方法
  getList(str) {
    // let list = arr || JSON.parse(JSON.stringify(this.list))
    if(this.list.length<1) {
      $(this.dom).children('.drawer').html('<li class="none">暂无其他数据</li>')
      return this
    }
    let domlist = str?this.list.filter(item => item.value.includes(str)):JSON.parse(JSON.stringify(this.list))
      if(domlist.length<1){
        $(this.dom).children('.drawer').html('<li class="none">暂无其他数据</li>')
        return this
      }
    let listDom = ''
    $(this.dom).children('.drawer').html('')
    domlist.forEach(item => {
      let isActive = $(this.dom).children('.searchSelect').attr('data-id')==item.id
      listDom+='<li class="item '+(isActive?'active':'')+' " data-id="'+item.id+'">'+item.value+'</li>'
      if(isActive) {
        $(this.dom).children('.searchSelect').val(item.value)
      }
    })
    $(this.dom).children('.drawer').append(listDom)
    let dom = this.dom
    let that = this
    $(this.dom).children('.drawer').children('.item').on('click',function(){
      if($(this).hasClass('active')) return
      $(dom).children('.searchSelect').attr('data-id',$(this).attr('data-id'))
      $(dom).children('.searchSelect').val($(this).text())
      that.params.id = $(this).attr('data-id')
      that.params.value = $(this).text()
      $(this).addClass('active').siblings().removeClass('active')
      setTimeout(()=>{
        $(dom).children('.drawer').stop(true,true).fadeOut()
        that.getList($(this).text())
      },300)
    })
    return this
  }
  // 更新数据 传入一个数组，更新下拉框内容
  update(list) {
    if(!(list instanceof Array)) {
      console.error('请传入一个数组！')
      return this
    }
    this.list = list
    this.getList($(this.dom).children('.searchSelect').val())
    this.loading=false
    return this
  }
  // 搜索方法 ，传入true会显示搜索中的loading，一般在input的钩子中触发ajax请求模糊搜索数据可用
  search(bol) {
    bol && $(this.dom).children('.drawer').html('<li class="none">正在搜索....</li>')
    bol && (this.loading=true)
    !bol && this.getList()
    !bol && (this.loading=false)
    return this
  }
  // 清空所有内容的方法
  empty() {
    $(this.dom).children('.drawer').html('<li class="none">暂无其他数据</li>')
    $(this.dom).children('.searchSelect').val('')
    return this
  }
  isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
 }
//  disabled选项
 disabled(bol) {
   bol && $(this.dom).children('.searchSelect').prop('disabled',true)
   !bol && $(this.dom).children('.searchSelect').prop('disabled',false)
   return this
 }
 // 你也许需要强行赋值，用它
 assignment(obj) {
   if(obj instanceof Object && obj.id) {
     for(let i=0;i<this.list.length;i++) {
       if(this.list[i].id == obj.id) {
        $(this.dom).children('.drawer').html('<li class="item active" data-id="'+obj.id+'">'+obj.value+'</li>')
         $(this.dom).children('.searchSelect').val(obj.value)
         $(this.dom).children('.searchSelect').attr('data-id',obj).id
		 this.fn()
         return this
       }
     }
     this.list.push(obj)
     $(this.dom).children('.drawer').html('<li class="item active" data-id="'+obj.id+'">'+obj.value+'</li>')
     $(this.dom).children('.searchSelect').val(obj.value)
     $(this.dom).children('.searchSelect').attr('data-id',obj.id)
     this.params.id = obj.id
     this.params.value = obj.value
   } else if(typeof obj==='string'||typeof obj==='number'){
    this.list.forEach(item => {
      if(item.id == obj) {
        $(this.dom+' .item[data-id="'+obj+'"]').addClass('active')
        $(this.dom).children('.searchSelect').val($(this.dom+' .item[data-id="'+obj+'"]').text())
        $(this.dom).children('.searchSelect').attr('data-id',obj)
        this.params.id = item.id
        this.params.value = $(this.dom+' .item[data-id="'+obj+'"]').text()
      }
    })
   }
   this.fn()
   return this
 }
}