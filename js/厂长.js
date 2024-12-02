var rule={
    title:'厂长资源',
    host:'https://www.czzy.site',
	hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});HOST = jsp.pdfh(html,"h3&&li&&a&&href");log(HOST);',
    url:'/fyclassfyfilter',
    filter_url:'{{fl.cateId}}{{fl.class}}{{fl.area}}/page/fypage',
    filter: {   "movie_bt":[
            {"key":"area","name":"分类","value":[{"v":"","n":"全部"},{"v":"/movie_bt_series/zhanchangtuijian","n":"站长推荐"},{"v":"/movie_bt_series/dyy","n":"电影"},{"v":"/movie_bt_series/dianshiju","n":"电视剧"},{"v":"/movie_bt_series/dohua","n":"动画"},{"v":"/movie_bt_series/guochanju","n":"国产剧"},{"v":"/movie_bt_series/mj","n":"美剧"},{"v":"/movie_bt_series/rj","n":"日剧"},{"v":"/movie_bt_series/hj","n":"韩剧"},{"v":"/movie_bt_series/hwj","n":"海外剧"},{"v":"/movie_bt_series/huayudianying","n":"华语电影"},{"v":"/movie_bt_series/meiguodianying","n":"欧美电影"},{"v":"/movie_bt_series/ribendianying","n":"日本电影"},{"v":"/movie_bt_series/hanguodianying","n":"韩国电影"},{"v":"/movie_bt_series/yindudianying","n":"印度电影"},{"v":"/movie_bt_series/eluosidianying","n":"俄罗斯电影"},{"v":"/movie_bt_series/huiyuanzhuanqu","n":"会员专区"}]},
            {"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"传记","v":"/movie_bt_tags/chuanji"},{"n":"儿童","v":"/movie_bt_tags/etet"},{"n":"冒险","v":"/movie_bt_tags/maoxian"},{"n":"动作","v":"/movie_bt_tags/dozuo"},{"n":"动画","v":"/movie_bt_tags/dhh"},{"n":"历史","v":"/movie_bt_tags/lishi"},{"n":"古装","v":"/movie_bt_tags/guzhuang"},{"n":"喜剧","v":"/movie_bt_tags/xiju"},{"n":"奇幻","v":"/movie_bt_tags/qihuan"},{"n":"家庭","v":"/movie_bt_tags/jiating"},{"n":"战争","v":"/movie_bt_tags/zhanzhen"},{"n":"歌舞","v":"/movie_bt_tags/gw"},{"n":"武侠","v":"/movie_bt_tags/wuxia"},{"n":"灾难","v":"/movie_bt_tags/zainan"},{"n":"爱情","v":"/movie_bt_tags/aiqing"},{"n":"犯罪","v":"/movie_bt_tags/fanzui"},{"n":"科幻","v":"/movie_bt_tags/kh"},{"n":"纪录片","v":"/movie_bt_tags/jlpp"},{"n":"西部","v":"/movie_bt_tags/xb"},{"n":"运动","v":"/movie_bt_tags/yd"},{"n":"音乐","v":"/movie_bt_tags/yy"}]}  ]},
            
    searchUrl:'http://test.210985.xyz/czzysearch.php?wd=**',
    headers:{   'User-Agent': 'MOBILE_UA',   'Cookie': 'esc_search_captcha=1'  },
    class_name:'全部&豆瓣电影Top250&高分影视&最新电影&热映中',
    class_url:'movie_bt&dbtop250&gaofenyingshi&zuixindianying&benyueremen',
	 play_parse:true,

    lazy:`js:
        pdfh = jsp.pdfh;
        var html = request(input);
        var ohtml = pdfh(html, '.videoplay&&Html');
        var url = pdfh(ohtml, "body&&iframe&&src");
        if (/Cloud/.test(url)) {
            var ifrwy = request(url);
            let code = ifrwy.match(/var url = '(.*?)'/)[1].split('').reverse().join('');
            let temp = '';
            for (let i = 0x0; i < code.length; i = i + 0x2) {
                temp += String.fromCharCode(parseInt(code[i] + code[i + 0x1], 0x10))
            }
            input = {
                jx: 0,
                url: temp.substring(0x0, (temp.length - 0x7) / 0x2) + temp.substring((temp.length - 0x7) / 0x2 + 0x7),
                parse: 0
            }
        } else if (/decrypted/.test(ohtml)) {
            var phtml = pdfh(ohtml, "body&&script:not([src])&&Html");
            eval(getCryptoJS());
            var scrpt = phtml.match(/var.*?\\)\\);/g)[0];
            var data = [];
            eval(scrpt.replace(/md5/g, 'CryptoJS').replace('eval', 'data = '));
            input = {
                jx: 0,
                url: data.match(/url:.*?[\\'\\"](.*?)[\\'\\"]/)[1],
                parse: 0
            }
        } else {
            input
        }
	`,
    推荐:'.bt_img;ul&&li;*;*;*;*',
    double:true,
    一级:'.bt_img&&ul&&li;h3.dytit&&Text;img.lazy&&data-original;.jidi&&Text;a&&href',
    二级:{
        "title": "h1&&Text;.moviedteail_list li&&a&&Text",
        "img": "div.dyimg img&&src",
        "desc": ".moviedteail_list li:eq(3) a&&Text;.moviedteail_list li:eq(2) a&&Text;.moviedteail_list li:eq(1) a&&Text;.moviedteail_list li:eq(7)&&Text;.moviedteail_list li:eq(5)&&Text",
        "content": ".yp_context&&Text",
        "tabs": ".mi_paly_box span",
        "lists": ".paly_list_btn:eq(#id) a"
    },
    搜索:'.search_list&&ul&&li;*;*;*;*',
}
