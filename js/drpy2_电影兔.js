var rule = {
author: '小可乐/2408/第一版',
title: '电影兔',
类型: '影视',
host: 'https://www.dianyingtu.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/fyclassfyfilter/page/fypage[/fyclassfyfilter]',
filter_url: '{{fl.class}}{{fl.area}}{{fl.year}}{{fl.sub}}{{fl.by}}',
detailUrl: '',
searchUrl: '/search/**/page/fypage',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫&纪录&微电影&豆瓣',
class_url: 'dianying&dianshiju&zongyi&dongman&jilupian&weidianying&haopian',
filter_def: {},

play_parse: true,
lazy: `js: input = { jx: 0, parse: 1, url: input }`,

limit: 9,
double: false,
推荐: '*',
一级: '.movie-item;img&&alt;img&&_src;span&&Text;a&&href',
二级: `js:
let khtml = request(input);
let kdetail = pdfh(khtml, '.movie-info');
VOD = {};
VOD.vod_id = input;
VOD.vod_name = pdfh(kdetail, 'h1&&Text');
VOD.vod_pic = pdfh(kdetail, 'img&&_src');
VOD.type_name = pdfh(kdetail, '.tags_line--label:eq(0)&&Text');
VOD.vod_remarks = pdfh(kdetail, '.count_row&&Text');
VOD.vod_year = pdfh(kdetail, '.tags_line--label:eq(2)&&Text');
VOD.vod_area = pdfh(kdetail, '.tags_line--label:eq(1)&&Text');
VOD.vod_director = pdfh(kdetail, '.director_line--label&&Text');
VOD.vod_actor = pdfh(kdetail, '.performer_line--label&&Text');
VOD.vod_content = pdfh(khtml, '.content&&Text');

let ktabs = [];
let i = 1;
pdfa(khtml, '.tab-list&&a').map((it) => { 
    ktabs.push('👶线路' + i + '-' + pdfh(it, 'body&&Text'));
    i++
});
VOD.vod_play_from = ktabs.join('$$$');

let kplists = [];
let htmls = pdfa(khtml, '.pr-item-name a').map((it) => { return request(pd(it, 'a&&href', input), {headers: {'User-Agent': 'MOBILE_UA'}} ) });
htmls.forEach((ht) => {
    if (ht) {
        let plist = pdfa(ht, '.episodes-list:eq(0)&&a').map((it) => { return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input) });
        plist = plist.join('#');
        kplists.push(plist)
    } else {
        kplists.push('')
    }
});
VOD.vod_play_url = kplists.join('$$$')
`,
搜索: '.item;h5&&Text;*;p&&Text;*',

filter: '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'
}