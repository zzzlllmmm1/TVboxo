var rule = {
author: '小可乐/2408/第一版',
title: 'rarbt',
类型: '影视',
host: 'https://www.rarbt.fun',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/vod/showfyfilter.html',
filter_url: '{{fl.actor}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.director}}{{fl.douban}}{{fl.downer}}/id/{{fl.cateId}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
detailUrl: '',
searchUrl: '/vod/search/page/fypage/wd/**.html',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫&短剧',
class_url: 'movie&Series&variety&cartoon&duanju',
filter_def: {
movie: {cateId: 'movie'},
Series: {cateId: 'Series'},
variety: {cateId: 'variety'},
cartoon: {cateId: 'cartoon'},
duanju: {cateId: 'duanju'}
},

play_parse: true,
lazy: `js:
if (/magnet/.test(input)) {
    input = { jx: 0, parse: 1, url: input };
} else {
    let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
    let kurl = unescape(kcode.url);
    if (/\\.(m3u8|mp4)/.test(kurl)) {
        input = { jx: 0, parse: 0, url: kurl }
    } else {
        input = { jx: 0, parse: 1, url: kurl }
    }
}
`,

limit: 9,
double: false,
推荐: '*',
一级: '.module-item:has(.badges);img&&alt;img&&data-original;.module-item-note&&Text;a&&href',
二级: `js: 
let khtml = request(input);
VOD = {};
VOD.vod_id = input;
VOD.vod_name = pdfh(khtml, 'h1&&Text');
VOD.vod_pic = pdfh(khtml, 'img.ls-is-cached&&data-original');
VOD.type_name = pdfh(khtml, '.module-info-tag-link:eq(2)&&Text');
VOD.vod_remarks = pdfh(khtml, '.module-info-item:eq(-1)&&Text');
VOD.vod_year = pdfh(khtml, '.module-info-tag-link:eq(0)&&Text');
VOD.vod_area = pdfh(khtml, '.module-info-tag-link:eq(1)&&Text');
VOD.vod_director = pdfh(khtml, '.module-info-item-content:eq(0)&&Text');
VOD.vod_actor = pdfh(khtml, '.module-info-item-content:eq(2)&&Text');
VOD.vod_content = pdfh(khtml, '.show-desc&&Text');

let ktabs = [];
let zx_tabs = pdfa(khtml,'.tab-item span');
if (zx_tabs.length !== 0) { zx_tabs.map((it) => { return ktabs.push('在线-' + pdfh(it, 'body&&Text')) }) };
let xz_tabs = pdfa(khtml,'#playSwiper&&.downtab-item');
if (xz_tabs.length !== 0) { xz_tabs.map((it) => { return ktabs.push('磁力-' + pdfh(it, 'body--small&&Text')) }) };
VOD.vod_play_from = ktabs.join('$$$');

let klists = [];
let zx_plists = pdfa(khtml, '.module-play-list');
let xz_plists = pdfa(khtml, '.module-row-one');
let i = 0;
let j = 0;
ktabs.forEach((tab) => {
    if (/在线/.test(tab)) {
        let zx_plist = pdfa(zx_plists[i], 'a').map((it) => { return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input) });
        i++;
        zx_plist = zx_plist.join('#');
        klists.push(zx_plist)
    } else if (/磁力/.test(tab) ) {
        let xz_plist = pdfa(xz_plists[j], 'a.btn-down').map((it) => { return pdfh(it, 'a&&title') + '$' + pdfh(it, 'a&&href') });
        j++;
        xz_plist = xz_plist.join('#');
        klists.push(xz_plist)        
    }
});
VOD.vod_play_url = klists.join('$$$')
`,
搜索: '.module-card-item-poster;*;*;*;*',

filter: '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'
}