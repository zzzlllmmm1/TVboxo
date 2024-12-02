//无搜
var rule={
            title: '爱果影院',
            host: 'https://aiguo.cc/',
            url: 'https://aiguo.cc/fyclassfypage.html',
            searchUrl: '',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {//网站的请求头,完整支持所有的,常带ua和cookies
                'User-Agent': 'MOBILE_UA', // "Cookie": "searchneed=ok"
            },
            class_parse: '.ewave-header__menu li;a&&Text;a&&href;.*/(.*?).html',
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: 'ul.ewave-vodlist.clearfix;li;.lazyload&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: '.ewave-vodlist li;.lazyload&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
            二级: {
                "title": ".ewave-vodlist__thumb&&Text",
                "img": ".myui-content__thumb .lazyload&&data-original",
                "desc": ".ewave-content__detail p:eq(0)&&Text;.ewave-content__detail p:eq(1)&&Text;.ewave-content__detail p:eq(2)&&Text",
                "content": "#desc",
                "tabs": ".nav.nav-tabs&&li a",
                "lists": ".ewave-content__playlist:eq(#id) a"
            },
            搜索: '',
        }