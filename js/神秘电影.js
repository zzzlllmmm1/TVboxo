var rule ={
            title: '神秘电影',
            host: 'https://nbmw.sm259.vip/',
            url: 'https://nbmw.sm259.vip/list/fyclass/fypage.html',
            searchUrl: 'https://nbmw.sm259.vip/so/**/fypage.html#',
           // class_parse: '.nav a;script&&Text;a&&href;.*/(.*?).html',
  class_name:'国产&日本&韩国&欧美&三级&动漫',
  class_url:'1&2&3&4&5&6',
  
                      searchable: 2,
            quickSearch: 0,
            filterable: 0,
            编码:'GBK',
            headers: {
                'User-Agent': 'MOBILE_UA',
            },
            play_parse: true,
                      lazy: `js:
let kcode=jsp.pdfh(request(input).match(/<iframe(.*?)</iframe>/)[1]);
let kurl=kcode.match(/url=(.*?)\"/)[1];
if (/m3u8|mp4/.test(kurl)) {
input = { jx: 0, parse: 0, url: kurl }
} else {
input = { jx: 0, parse: 1, url: rule.parse_url+kurl }
}`, 
            limit: 6,
            推荐: '*',
            double: true,
            一级: '.main&&.vodbox;img script&&Text;img&&.lazyload&&data-src;.pic_text&&Text;a&&href',
            二级: '*',
            搜索: '*',
        }