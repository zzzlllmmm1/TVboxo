var rule = {
author: '小可乐/2408/第一版',
title: '旺旺影视',
类型: '影视',
//host: 'https://www.wwgz.cn',
host: 'https://www.nmdvd.com',
hostJs: 'HOST = pdfh(request(HOST), "b:eq(0)&&Text"); !HOST.startsWith("http") ? HOST = "https://"+HOST : HOST',
headers: {'User-Agent': 'PC_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/vod-list-id-fyfilter.html',
filter_url: '{{fl.cateId}}-pg-fypage-order--by-{{fl.by}}-class-0-year-{{fl.year}}-letter-{{fl.letter}}-area-{{fl.area}}-lang-',
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

play_parse: true,
lazy: `js: input = { jx: 0, parse: 1, url: input }`,

limit: 9,
double: false,
推荐: 'li:has(.titl);*;*;*;*',
一级: 'a.b_a;img&&alt;img&&src;font&&Text;a&&href',
二级: {
title: '.fen&&h1&&Text;.d_z_y--span:eq(2)&&Text',
img: '.lef:eq(-1)&&img&&src',
desc: '.d_z_y:eq(-3)&&Text;.d_z_y--span:eq(-2)--span:eq(-1)&&Text;;.d_z_y--span:eq(1)&&Text;.d_z_y--span:eq(0)&&Text',
content: '.jjie&&Text',
tabs: `js:
TABS = [];
pdfa(html, 'h2 span').map((it) => { TABS.push(pdfh(it, 'body&&Text').match(/（(.*?)）/)[1]) });`,
lists: '.soyurl:eq(#id)&&a',
list_text: 'body&&Text',
list_url: 'a&&href'
},
搜索: '*',

filter: 'H4sIAAAAAAAAA+2YW08TQRTH3/sx9rkmMy0trW/c7/c7hIeKm0hETKCaEEKiFoQWATXSChYviaUlgpRgiBSBL9PZ0m/hVs6ec+qDISGSaOZtz+/Pzs5/mJ3/2c66DGncHnHNGvfNGeO2MRYKm013DbcxGXpg2nXh4ES9X7brx6GJRzYYmTUmbawWMsVIpoTtQhpzbsCxTP40WYguguIjJZ5U0TQpflQKSwdWZIGUSlLSr9TxCSkBVKynL60ncVKC9Jxoumw0Keimpbf5XJRJNG8rErOebTKJpqdSi2WTkPb8RufcuGChKTNEy6WSWfUi9+floqE/p4sbz4FC4WjF7Q3r+z5oUOB9a1nr+My577LANTtbVe9OQYMCx/ywQxoUuAKJlJXcBQ0K1A6zdB8UqMWzKvZRbX1yZKzxqTu71lbqInWez206z+YIXa1kVW7bcXVZONrF8gHNAAqa3Tqf3TrX7KlYy+f20jrDYo0jp84La3uF6IYzONbOX+TP5wunCSvu/DOoxqcsHKmvEecRl0XZHpkxQ1O0R6zEUTHx7Yp7xCM8FcB+XTLuJe7l3EPcw7kkLjkXxAXjMohcBjkPEA9wXkm8knM/cT/nPuI+zsmv5H4l+ZXcryS/kvuV5Fdyv5L8Su5XkF/B/QryK7hfQX4F9yvIr+B+BfkV3K8gv4L7FeRXcL+C/AruV5Bfwf0K8mtflu3LCTMcNtnOVHsJa3/lijuzCkAVkmog1UhqgNQgqQVSi6QOSB2SeiD1SBqANCBpBNKIpAlIE5JmIM1IWoC0IGkF0oqkDUgbknYg7Ug6gHQg6QTSiaQLSBeSbiDdSHqA9CDpBdKLpA9IH5J+IP1IBoAMIBkEMohkCMgQkmEgw0jELeclKF2V7ZU7M+wEW32tcmtX3Cd03NlFeNweAE/WXM7KvgHl3nh4mk7l/Xm15CTj9NjDKbM0Gdeo22V4rtut0DtjJ0U+l7Y7BifaSbLjthSsh1lH8jI/qVJ20l300lq76VLkkuTTvYLuFXSvoHsF3SvoXkH3CjfdK3h5r6DDV4evDl8dvjp8dfgaOnz/evhWXPdDnd4xFctYP76w7+rAbxL7eT6oP7l16uvU16mvU1+nvk79G/953q+/uXX6/q/pq09nfTr/s6eza+4nESi9Ye0lAAA='
}