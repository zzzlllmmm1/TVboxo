// 地址发布页 https://cz01.vip
var rule = {
   title: '厂长资源',
   host: 'https://cz01.vip',
   hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});HOST = html.match(/推荐访问<a href="(.*)"/)[1];print("厂长跳转地址 =====> " + HOST)',
   url: '/fyclassfyfilter',
   filter_url: '{{fl.year}}{{fl.cateId}}{{fl.class}}{{fl.area}}/page/fypage',
   filter: 'H4sIAAAAAAAAA4VW207iQBh+FdJrEhQ36u6rbIwZpNIitEqpAsbEEwjoKhrFXTVqolg8oKKrGzm+TKctV77CzkCh08rAnc73/d9//ssyExYXeXbaF2V+uH4uM3NsHP3BgAgLGDcjgDCL/4XplF6uoodFEJLZDnMRA4zbxQhtRrLY2igyK24T8HRlpyU2wrOSxx+P98j64RuslzHZRWPzQJA4PijjIEwTQ0nBjDLIhcjJwIooW9QPq4juonoJyOIMBwTLCzytqxVlsJdw0MqjsWtyaR4iwa60dlwYrMtZuq2L2yG63JIl/PYPXucR/7OWhsl3tZr/rGUG+ZFBXMb1jfNCwKrWr13jqdRrDL1mYZZHZbPszSAeFFQMq6+0cvA+VvjiG5VGO3sYPhSoVX1c42Kd1onIKdbYxmZueje2y6Q91fss6Jf365HNmO7b36/mz7ByM9wzG5JFiXe6Vpubev1Yyz8NFwgiU+AHTgWYvdS2m/Ba6SpM4QzaF4CJsyDSOwAM/PirVq+s/UfrL+DnztK7sVumnT5+9Y54v5lvHizjaT8Q6JgTHSNRrxP1kuioEx0l0REnOkKgo98dKHog0EknOkmiE050gkTHneg4WUwXMxMCkkTcU3RM4fm2/Z6SZ9RtdrLrA3W7dmk8PvcAq8VREJA8M2iphSBv0eFmU78vdKL6wmajbJSgpg5af25pymEgxtDYEPSMom0kKcpBeQHPl0XOFtX6GU3bLyZk0UbWavd0ctgWRue69w/Dz3GdS9Ch7qbg3gtNN8Sj7wyhu3dtXNHSC8gJXGgywdyOtqrQtKOiEIjZC5I/w5e9v3wMf+8samELflRp0gs8joTM8vEdVkq0vvAgaotDW8tpq3ma+JzsIwLR1h/0/D6NG5PxUSHYG0kj80KJA0+HxJLkrLZ+Qg0Ds0Vb2OnfaiVDEU+g70OCY4kh0Uo7RvqcJh9YIpk3auOSxlyS0Q4QtdbXGq2TBi0MwAvkpOrpcnth+ksD3tyYnnb2Sa/fUbRnUYYyUWz9oqRntqgrM0/qKvsDxmmOI0Qrd7B+1NbtP0yheVLYKDTJk+UcD58lbDRzaG1pzLifEG1dvKofOUoA6Jckuq5TK/8BES5a47wKAAA=',
   // searchUrl: '/xsseanmch?q=**&p=fypage',
   searchUrl: 'http://czzy.210985.xyz/czzy_search8.php?wd=**',
   headers: {
      'User-Agent': 'PC_UA'
   },
   class_name: '全部&热映中&Top250&高分影视&最新电影',
   class_url: 'movie_bt&benyueremen&dbtop250&gaofenyingshi&zuixindianying',
   play_parse: true,
   lazy: `js:
        pdfh = jsp.pdfh;
        var html = request(input);
        var ohtml = pdfh(html, '.videoplay&&Html');
        var url = pdfh(ohtml, "body&&iframe&&src");
        if (url) {
            var _obj={};
            eval(pdfh(request(url),'body&&script&&Html')+'\\n_obj.player=player;_obj.rand=rand');
            function js_decrypt(str, tokenkey, tokeniv) {
                eval(getCryptoJS());
                var key = CryptoJS.enc.Utf8.parse(tokenkey);
                var iv = CryptoJS.enc.Utf8.parse(tokeniv);
                return CryptoJS.AES.decrypt(str, key, {iv: iv,padding: CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
            };
            let config = JSON.parse(js_decrypt(_obj.player,'VFBTzdujpR9FWBhe', _obj.rand));
            input = {
                 header: rule.headers,
                 jx: 0,
                 url: config.url,
                 parse: 0
            };
        }else if (/decrypted/.test(ohtml)) {
            var phtml = pdfh(ohtml, "body&&script:not([src])&&Html");
            eval(getCryptoJS());
            var script = phtml.match(/var.*?\\)\\);/g)[0];
            var data = [];
            eval(script.replace(/md5/g, 'CryptoJS').replace('eval', 'data = '));
            input = {
                header: rule.headers,
                jx: 0,
                url: data.match(/url:.*?['"](.*?)['"]/)[1],
                parse: 0
            }} `,
   推荐: '.bt_img;ul&&li;*;*;*;*',
   double: true,
   一级: '.bt_img&&ul&&li;h3.dytit&&Text;img.lazy&&data-original;.jidi&&Text;a&&href',
   二级: {
      "title": "h1&&Text;.moviedteail_list li&&a&&Text",
      "img": "div.dyimg img&&src",
      "desc": ".moviedteail_list li:eq(3) a&&Text;.moviedteail_list li:eq(2) a&&Text;.moviedteail_list li:eq(1) a&&Text;.moviedteail_list li:eq(7)&&Text;.moviedteail_list li:eq(5)&&Text",
      "content": ".yp_context&&Text",
      "tabs": ".mi_paly_box span",
      "lists": ".paly_list_btn:eq(#id) a"
   },
   搜索: $js.toString(() => {
      var html = request(input);
      var d = [];
      if (html.indexOf('|') > 0) {
         let episodes = html.split('$$$');
         episodes.forEach(function(ep) {
            let tp = ep.split('|');
            d.push({
               title: tp[1],
               img: tp[2],
               desc: tp[3],
               url: HOST + '/movie/' + tp[0] + '.html'
            })
         })
         setResult(d);
      }
   }),
}