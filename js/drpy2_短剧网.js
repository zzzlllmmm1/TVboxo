var rule = {
author: '小可乐/240523/第一版',
title: '短剧网',
host: 'http://www.duanjutv.cc',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/vodtype/fyclass-fypage.html',
filter_url: '',
detailUrl: '',
searchUrl: '/vodsearch/**----------fypage---.html',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '抖音短剧&快手短剧&视频号短剧&热播短剧',
class_url: '20&21&22&23',
filter_def: {},

proxy_rule: '',  
sniffer: 0,
isVideo: '',
play_parse: true,
parse_url: '',
lazy: '',

limit: 9,
double: false,
//列表;(true双层列表);标题;图片;描述;链接;详情(可不写)
推荐: '*;*;*;*;*',
//列表;标题;图片;描述;链接;详情(可不写)
一级: '.stui-vodlist:has(li) li;a&&title;img&&src;.text-right&&Text;a&&href',
二级: {
//名称;类型
"title": ".stui-content__detail&&h3&&Text;.data:eq(2)&&a:eq(0)&&Text",
//图片
"img": ".v-thumb&&img&&src",
//主要描述;年份;地区;演员;导演
"desc": ".v-thumb&&.text-right&&Text;.data:eq(2)&&a:eq(-1)&&Text;.data:eq(2)&&a:eq(-2)&&Text;.data--span:eq(0)&&Text;.data--span:eq(1)&&Text",
//简介
"content": ".detail-content&&Text",
//线路数组
"tabs": ".bottom-line:has(span) h3",
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
搜索: '.stui-vodlist__media&&.thumb;*;*;*;*',

filter: {}
}