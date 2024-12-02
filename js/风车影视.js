var rule = {
title: '风车影视',
host: 'https://www.chzzxx.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,
homeUrl: '/',
url: '/fc_fyfilter_fypage.html',
filter_url: '{{fl.cateId}}/{{fl.class}}___{{fl.by}}',
detailUrl: '',
searchUrl: '/s/**/fypage.html',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 
class_name: '动漫&电视剧&电影&综艺',
class_url: 'anime&tv&film&variety',
filter_def: {
anime: {cateId: 'anime'},
tv: {cateId: 'tv'},
film: {cateId: 'film'},
variety: {cateId: 'variety'}
},
proxy_rule: '',  
sniffer: 0,
isVideo: '',
play_parse: true,
parse_url: '',
lazy: '',
limit: 9,
double: false,
推荐: '*;*;*;*;*',
//列表;标题;图片;描述;链接;详情(可不写)
一级: '.hl-vod-list li;a&&title;a&&data-original;.hl-pic-text&&Text;a&&href',
二级: {
//名称;类型
"title": "h2&&Text;.hl-col-xs-12:eq(6)&&Text",
//图片
"img": "img&&data-original",
//主要描述;年份;地区;演员;导演
"desc": "",
//简介
"content": ".hl-col-xs-12:eq(13)&&Text",
//线路数组
"tabs": ".hl-plays-from&&a",
//播放数组 选集列表
"lists": ".hl-plays-list:eq(#id)&&a",
//选集链接
"list_url": "a&&href"
},
//列表;标题;图片;描述;链接;详情(可不写)
搜索: '*'
}