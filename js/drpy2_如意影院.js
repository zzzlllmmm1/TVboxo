var rule = {
author: '小可乐/2411/第一版',
title: '如意影院',
类型: '影视',
host: 'https://www.jspxxh.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/show/fyfilter.html',
filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}{{fl.actor}}{{fl.director}}',
detailUrl: '',
searchUrl: '/search/**----------fypage---.html',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

limit: 9,
double: false,
class_name: '电影&剧集&综艺&动漫&热榜',
class_url: '1&2&3&4&hot',
filter_def: {
1: {cateId: '1'},
2: {cateId: '2'},
3: {cateId: '3'},
4: {cateId: '4'},
hot: {cateId: 'hot'}
},

play_parse: true,
lazy: `js:
let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
let kurl = kcode.url;
if (/\\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl }
} else {
    input = { jx: 0, parse: 1, url: input }
}
`,

推荐: '*',
一级: '.col8;img&&alt;img&&data-original;p&&Text;a&&href',
二级: {
title: 'h1&&Text;.tag&&Text',
img: '.shoutu-media-hd&&img&&data-original',
desc: '.data--span:eq(-1)&&Text;.tag&&a:eq(-3)&&Text;.tag&&a:eq(-2)&&Text;.data--span:eq(0)&&Text;.data--span:eq(1)&&Text',
content: '.panel-bd--div:eq(-1)&&Text',
tabs: 'h3:contains(云)',
tab_text: 'body&&Text',
lists: '.shoutu-playlist:eq(#id)&&a',
list_text: 'body&&Text',
list_url: 'a&&href'
},
搜索: '*',

filter: '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'
}