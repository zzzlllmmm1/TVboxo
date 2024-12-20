var rule = {
  title: '农民影视',
  host: 'https://www.nongmintv.cc/',
  class_name: '电影&电视剧&综艺&动漫',
  class_url: 'ys&tv&zy&dm',
  searchUrl: '/s/',
  searchable: 2,
  quickSearch: 0,
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  url: '/fyclass/fypage.html',
  filterable: 0,
  filter_url: '',
  filter: {},
  filter_def: {},
  detailUrl: '/index.php/vod/detail/id/fyid.html',
  play_parse: true,
  lazy: "js:\n  let html = request(input);\n  let hconf = html.match(/r player_.*?=(.*?)</)[1];\n  let json = JSON5.parse(hconf);\n  let url = json.url;\n  if (json.encrypt == '1') {\n    url = unescape(url);\n  } else if (json.encrypt == '2') {\n    url = unescape(base64Decode(url));\n  }\n  if (/\\.(m3u8|mp4|m4a|mp3)/.test(url)) {\n    input = {\n      parse: 0,\n      jx: 0,\n      url: url,\n    };\n  } else {\n    input = url && url.startsWith('http') && tellIsJx(url) ? {parse:0,jx:1,url:url}:input;\n  }",
  limit: 6,
  推荐: '.newlist li;img&&alt;img&&data-src;a&&label:eq(0)&&Text;a&&href',
  一级: '.newlist li;img&&alt;img&&data-src;a&&label:eq(0)&&Text;a&&href',
  二级: {
    title: 'h1&&Text',
    img: 'img&&src',
    desc: '.info&&Text;.info&&dd:eq(5)&&Text;.info&&dd:eq(4)&&Text;.info&&dd:eq(2)&&Text;.info&&dd:eq(1)&&Text',
    content: '.js&&Text',
    tabs: '#v_lab&&label',
    tab_text: 'body&&Text',
    lists: '.vurls:eq(#id) li',
  },
  搜索: '*',
}