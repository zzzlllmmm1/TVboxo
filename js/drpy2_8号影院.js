var rule = {
author: '小可乐/240518/第一版',
title: '8号影院',
host: 'http://www.bahaoys.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/frim/fyfilter-fypage.html[/frim/fyfilter.html]',
filter_url: '{{fl.cateId}}',
detailUrl: '',
searchUrl: '/search.php?page=fypage&searchword=**&searchtype=',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫',
class_url: '1&2&3&4',
filter: {
"1":[
{"key":"cateId","name":"分类","value":[{"n":"全部","v":"1"},{"n":"动作片","v":"5"},{"n":"爱情片","v":"6"},{"n":"科幻片","v":"7"},{"n":"恐怖片","v":"8"},{"n":"喜剧片","v":"10"},{"n":"剧情片","v":"12"},{"n":"在线直播","v":"28"}]}
],        
"2":[
{"key":"cateId","name":"分类","value":[{"n":"全部","v":"2"},{"n":"国产剧","v":"13"},{"n":"港台剧","v":"14"},{"n":"欧美剧","v":"15"},{"n":"日韩剧","v":"16"}]}
]
},
filter_def: {
1: {cateId:'1'},
2: {cateId:'2'},
3: {cateId:'3'},
4: {cateId:'4'}
},

proxy_rule: '',  
sniffer: 0,
isVideo: '',
play_parse: true,
lazy: `js:
let html=request(input);
let kcode=pdfh(html,'body&&script:eq(2)&&Text');
let kurl=kcode.match(/decode\\("(.*?)"/)[1];
let input=base64Decode(kurl)
`,

limit: 9,
double: false,
//列表;(true双层列表);标题;图片;描述;链接;详情(可不写)
推荐: '*;*;*;*;*',
//列表;标题;图片;描述;链接;详情(可不写)
一级: '.stui-vodlist li;a&&title;a&&data-original;.text-right&&Text;a&&href',
二级: {
//名称;类型
"title": "h1&&Text;.data:eq(3)&&a:eq(0)&&Text",
//图片
"img": ".v-thumb&&data-original",
//主要描述;年份;地区;演员;导演
"desc": ".data:eq(0)&&Text;.data:eq(3)&&a:eq(2)&&Text;.data:eq(3)&&a:eq(1)&&Text;.data--span:eq(2)&&Text;.data--span:eq(1)&&Text",
//简介
"content": ".detail-content&&Text",
//线路数组
"tabs": ".bottom-line:has(span)&&h3",
//线路标题
"tab_text": "body&&Text",
//播放数组 选集列表
"lists": ".stui-content__playlist:eq(#id)&&a",
//选集标题
"list_text": "body&&Text",
//选集链接
"list_url": "a&&href"
},
//列表;标题;图片;描述;链接;详情(可不写)
搜索: '.stui-vodlist__media:eq(0)&&.v-thumb;*;*;*;*'
}