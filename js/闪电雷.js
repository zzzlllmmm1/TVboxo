var rule = {
   title: '闪电雷',
   编码: 'gb2312',
   host: 'http://36.56.71.96:18008',
   url: '/www/List.asp?classid=fyclass&searchword=&page=fypage',
   tab_rename: {
      '道长在线': '闪电雷'
   },
   class_name: '电影&电视&综艺&动漫&音乐',
   class_url: '5000&10&8&6&12',
   searchUrl: '/www/List.asp?classid=30&searchword=**&page=fypage',
   headers: {
      'User-Agent': 'IOS_UA',
   },
   play_parse: true,
   lazy: $js.toString(() => {
      var html = 'http://36.56.71.96:18008/PlayMov.asp?ClassId=' + input.split(",")[2] + '&video=2&exe=0&down=0&movNo=' + input.split(",")[3] + '&vgver=undefined&ClientIP=36.56.71.96'
      var url = request(html).match(/push\('(.*?)'/)[1]
      input = {
         header: rule.headers,
         jx: 0,
         url: url,
         parse: 0
      };
   }),
   推荐: 'ul:eq(4)&&strong;img&&alt;img&&src;span:eq(1)&&Text;a&&href',
   一级: 'ul:eq(5)&&strong;img&&alt;img&&src;span:eq(1)&&Text;a&&href',
   二级: {
      title: "ul:eq(2)&&li:eq(0)&&Text",
      img: "img:eq(1)&&src",
      desc: ";;;;",
      content: ";",
      tabs: "",
      lists: 'body&&a[onclick^="senfe"]',
      list_url: 'a&&onclick',
      list_text: 'a&&Text'
   },
   搜索: '*',
}