

var rule = {
  title:'一起看',
  host:'http://www.cpldq.com',
  url:'/cptype/fyclass-fypage.html',
  searchUrl:'',
  searchable:0,
  quickSearch:0,
  filterable:1,
  filter:'',
  filter_url:'',
  headers:{
      'User-Agent':'MOBILE_UA',
  },
  timeout:5000,
  class_parse:'.sb_login_alert_box&&li;a&&Text;a&&href;/(\\d+)\.html',
  cate_exclude:'',
  play_parse:true,
  lazy:$js.toString(()=>{
    input = {parse:1,url:input,js:''};
  }),
  double:true,
  推荐:'.main&&.bgte1130;ul&&.sb-film-one;*;*;*;*',
  一级:'.sb-area-index&&ul&&.qcontainer;i&&Text;.lazy&&data-original;.other&&Text;a&&href',
  二级:{
    title:'.name&&Text;.ct&&dd&&Text',
    img:'.lazy&&data-original',
    desc:'.ct&&dd:eq(1)&&Text;.ct&&dd:eq(2)&&Text;.ct&&dt:eq(2)&&Text;.ct&&dt&&Text;',
    content:'div.ee&&Text',
    tabs:'.playfrom&&li',
    lists:'.playlist:eq(#id)&&ul&&li:not(:contains(дрр滈凊))',
    tab_text:'i&&Text',
    list_text:'body&&Text',
    list_url:'a&&href'
  },
  搜索:'列表;标题;图片;描述;链接;详情',
}