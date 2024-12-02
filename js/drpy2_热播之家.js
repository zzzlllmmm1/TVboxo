var rule = {
author: '小可乐/240601/第一版',
title: '热播之家',
host: 'https://rebozj.pro',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/show/fyfilter.html',
filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}----fypage---{{fl.year}}',
detailUrl: '',
searchUrl: '/type/id.html?wd=**&page=fypage',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫&纪录',
class_url: '1&2&5&4&3',
filter_def: {
1: {cateId: '1'},
2: {cateId: '2'},
5: {cateId: '5'},
4: {cateId: '4'},
3: {cateId: '3'}
},

tab_remove: ['夸克4K'],
play_parse: true,
parse_url: 'https://rebozj.pro/m3u8/f-player/?url=',
lazy: `js:
var kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
var kurl =kcode.url;
kurl = unescape(kurl);
if (/m3u8|mp4/.test(kurl)) {
input = { jx: 0, parse: 0, url: kurl };
} else {
input = { jx: 0, parse: 1, url: rule.parse_url+kurl }
}
`,

limit: 9,
double: false,
//列表;(true双层列表);标题;图片;描述;链接;详情(可不写)
推荐: '*',
//列表;标题;图片;描述;链接;详情(可不写)
一级: 'a.lazyload;a&&title;a&&data-original;.text-right:eq(-1)&&Text;a&&href',
二级: {
//名称;类型
"title": "h1&&Text;.data:eq(1)&&Text",
//图片
"img": ".pic&&img&&data-original",
//主要描述;年份;地区;演员;导演
"desc": ".data:eq(0)&&Text;.data:eq(4)&&Text;.data:eq(2)&&Text;.data:eq(-2)&&Text;.data:eq(5)&&Text",
//简介
"content": ".detail-content&&Text",
//线路数组
"tabs": ".nav-tabs&&a",
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
搜索: '*',

filter: 'H4sIAAAAAAAAA+1Z3U4bRxS+92PsNRe7BgzkDfoMUS7c1GqjUioBrYQQEokxsU1im6ixS6D8KBg7AZsFUhJsbF7Gs2u/RdeemXPOOPTIwlQNku/8nc8ze37mzHyzuxyyHOvR49Cy9XNsyXpkPY0uxr77wRqz5qK/xALsn9XF7kaAf4/O/hYYHi9bc4FZJMqdeLlrDoBjrYwpc7rcauz4qZeKiSCT3xGpEjJTwPjJMy+eQGYamdKmuKojMwOM9zznreaRcWx8UKpkTOegd17yz1YtRaiwtfJkZQxjn40uLGDociY+9L7HKqsCZuyak8DMmOYkMDOjOAUglnjae/FOcQqY2dGcBDBn+tRvfNRzSgDjXpz4+U09TgLwc/1NZ+uD9lMCs056TglgXPElcgqY9dDPkwDGVS9FraLHSQBcZl1kzzUnAXDZw/Z7qIMEmmtd77erruIUAF8qR63mvvZFAs119i5aVznFKaC59k0uqJriFMA5X7WTuzBnD8C44g2uIgUgn8+bnXdNnU8JjIUanY9FyTrdccWr2qDr9LDU2VrX+ZEA4jza8r6c6jglwLy63lUT8toD4G8zI7Yb2l8JIAcXb5FTAHKwcYacAjCuUPR2TvQ4CbAeH3CcAuBn8zNyCqAvLvXFNca9dkXtSI+TAMatZYNMiaRe/ohJNf1sxU9tYUEVxj7f9zZugmHQ6hrDPxKXrbruWgWMqi/FovOk6lefWvXGgFUP2+EJZev9JPZxtI9TexjtYWp30O5Qu412m9idGbA7M9Q+jfZpap9C+xS1R9AeofZJtE9SO8br0HgdjNeh8ToYr0PjdTBeh8brYLzdw4fWaTY69yPWqX1aaZdXB+3O7Ubwf70GJCDdgpwC0IHnh8gpAN1SaIjXBaQRk34itASkD5FTgPQ24SQgfUgikYCsdFGN40rvAiOD3y9h/rzMG1HLfpU/r3DZKXxScyw+C/4Ku3yt5rl/KOanZ4sLmMHTNZHUe9/C01/nY93Hhp6MhazwsBooTGvYqpXwwCfLLNhQg62TUBM0z92dDClczN7fn8VhnlCR+5MtnMTgJA13VLASgznyOfnBSRruyOeOdU7ScLKMkzSc1OMk213lDiu9egsRN5MuAF9OSsFBrX2RYNijV65TPU6CgY7e26TFfcmd9UTwf6hxDwwSy12lEJc7Xib9e35YmZR3AyUh/jrQQwGPZMVIVjxMWfENyoPJYeUBriF55/Lr1+1UTR/ouCKlQjDZaZq1II8GS7pCbuMm64x6/aH0OthtjNem8doYr03jtTFem8ZrY7w2jdfGeG0ar43xBj//546bGLbjsGJKkKfL3vWxjvAr4W2wk339aLKRvo4z2an7E+e3uGaYmAANE+OuYWKCNkx9FxPjf9Q0kNDmxDT3bpQTvnd8F8tehjiBvnbjHxc1J8Eglxp/D87WPXIgc28UmSsE95aSuz6xb2GZqxV7zWOuXdxbUfaqU8+KxBf9PAlgztyufwJZlmAQSR6E6+ULGHsXALd/ILZBokgAvsQr7YNV7YsEEEMuI6rQhxIMcu0y+7ev0+KJduoc6t4DMM7dFMULPU4C8PN410uDnxLAnOd1by2p55QAuEzZz+mNWYF7u5Jx11KuVlzuRpechyt8Rpecb+OSM25IriF0S7vqisZbnW0JwDPmGxy3+9/1G9ztZyx7doEEML63cqck9230v/yWx7zckoLNUG99utJQlPwuO9pJRzvpaCcdcCcNrfwDQcGyTFQjAAA='
}