var rule = {
author: '小可乐/240527/第一版',
title: '爱看农民',
host: 'https://m.emsdn.cn',
hostJs: `print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src = jsp.pdfh(html,"body&&a:eq(0)&&href")||jsp.pdfh(html,"body&&a:eq(0)&&Text");if(!src.startsWith('http')){src='https://'+src};print("抓到主页:"+src);HOST=src`,
headers: {'User-Agent': 'PC_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/vod-list-id-fyfilter.html',
filter_url: '{{fl.cateId}}-pg-fypage-order--by-{{fl.by or "time"}}-class-0-year-{{fl.year}}-letter-{{fl.letter}}-area-{{fl.area}}-lang-',
detailUrl: '',
searchUrl: '/vod-search-pg-fypage-wd-**.html',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫&短剧',
class_url: '1&2&3&4&26',
filter_def: {
1: {cateId: '1'},
2: {cateId: '2'},
3: {cateId: '3'},
4: {cateId: '4'},
26: {cateId: '26'}
},

tab_rename: {
'播放列表1：（默认）': '默认',
'播放列表1：（云播①）': '云播①',
'播放列表1：（云播③）': '云播③',
'播放列表2：（百度网盘）': '百度网盘'
},
proxy_rule: '',  
sniffer: 0,
isVideo: '',
play_parse: true,
parse_url: '',
lazy: '',

limit: 9,
double: false,
//列表;(true双层列表);标题;图片;描述;链接;详情(可不写)
推荐: 'ul.list_06:has(li) li;*;*;*;*',
//列表;标题;图片;描述;链接;详情(可不写)
一级: 'ul.list_01 li;a:eq(0)&&title;img&&src;font&&Text;a:eq(0)&&href',
二级: {
//名称;类型
"title": ".fen&&h1&&Text;.d_z_y:eq(2)&&font&&Text",
//图片
"img": ".lef:eq(-1)&&img&&src",
//主要描述;年份;地区;演员;导演
"desc": ".d_z_y:eq(-3)&&Text;.d_z_y:eq(-2)&&font&&Text;;.d_z_y:eq(1)&&font&&Text;.d_z_y:eq(0)&&font&&Text",
//简介
"content": ".jjie&&Text",
//线路数组
"tabs": "h2 span",
//线路标题
"tab_text": "body&&Text",
//播放数组  选集列表
"lists": ".soyurl:eq(#id)&&a",
//选集标题
"list_text": "body&&Text",
//选集链接
"list_url": "a&&href"
},
//列表;标题;图片;描述;链接;详情(可不写)
搜索: '*',

filter: 'H4sIAAAAAAAAA+2YW08TQRTH3/sx9rkPMy0tLW/c7/c7hIeKm0hETKCaEEKiFoQWATXSChYviaUlgpRgiBShX6Y7pd/CrZw959QHQ4K8zVvP79+dmf90dv9nu+AypFEz7lowHprzRo0xGQqbrfcNtzETemTadfH43Pq4ZtdPQ9NPbDC+YMzY2FrOlCKZMrYLaSy6AccyhYtkMboCio+UeNKKpknxo1JcPVaRZVKqSUm/sc7OSQmgop6/Vs/ipARpnmi6YjQp6KLV94VclEm0bhWJqRc7TKLlWamVikVIe30Ti27csNCsGaLtspJZ61Xu39tFQ39Nl7ZfAoXC0Up72+rnEWhQ4HWbWXV26Vx3XeCeXW5YHy5AgwLH/LRPGhS4A4mUSh6ABgVqJ1m6DgrU4lkr9tna/eLIWOOs+wdqN3WVyhdyO87cHKGr9ayV23NcXReOdrV2TCuAgla3xVe3xTV7KWotb2+tMyzWOHIqX9w8LEa3ncGxdr5RyC8VLxIq7vwYVOMsy6fW94gzxXVRcUbmzdAsnRGVOC0lftzwjHiEpwrYn4+Me4l7OfcQ93AuiUvOBXHBuAwil0HOA8QDnFcTr+bcT9zPuY+4j3PyK7lfSX4l9yvJr+R+JfmV3K8kv5L7FeRXcL+C/AruV5Bfwf0K8iu4X0F+BfcryK/gfgX5FdyvIL+C+xXkV3C/gvzaHyvO5bQZDpvsZFqHCXW0fsOTWQugFkkdkDok9UDqkTQAaUDSCKQRSROQJiTNQJqRtABpQdIKpBVJG5A2JO1A2pF0AOlA0gmkE0kXkC4k3UC6kfQA6UHSC6QXSR+QPiT9QPqRDAAZQDIIZBDJEJAhJMNAhpGMABlBMgpkFMkYkLHKU3Fvnj2rNt5auc0bngh6sNlFeMoeAJ+huZzKvgPlwVR4jp6/R0vWqpOBc5OPZ83yYlwTbpfhuW1fQneHnQmFXNruDZwQJ8kO1nKEnmQdycv8pMopSVfR7akO0uVwJcmnuwLdFeiuQHcFuivQXYHuCu6uK/DyrkDHrI5ZHbM6ZnXM6pg1dMz+x5ituu3LN91NViyjfn1j78qBvyT253pQv0brfNf5rvNd57vOd53vd/jnul+/R+uc1Tmrc1bnrKFzVufsXeSsa/E37iRyfV8nAAA='
}